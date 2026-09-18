import * as turf from "@turf/turf";
import type { Feature } from "geojson";
import _ from "lodash";
import osmtogeojson from "osmtogeojson";
import { toast } from "react-toastify";

import {
    hiderMode,
    mapGeoJSON,
    mapGeoLocation,
    polyGeoJSON,
    trainStations,
} from "@/lib/context";
import {
    fetchCoastline,
    findPlacesInZone,
    findPlacesSpecificInZone,
    LOCATION_FIRST_TAG,
    nearestToQuestion,
    prettifyLocation,
    QuestionSpecificLocation,
} from "@/maps/api";
import {
    arcBufferToPoint,
    connectToSeparateLines,
    groupObjects,
    holedMask,
    modifyMapData,
} from "@/maps/geo-utils";
import type {
    APILocations,
    HomeGameMeasuringQuestions,
    MeasuringQuestion,
} from "@/maps/schema";
import { UNSET_QUESTION_TYPE } from "@/maps/schema";

const highSpeedBase = _.memoize(
    (features: Feature[]) => {
        const grouped = groupObjects(features);

        const neighbored = grouped
            .map((group) => {
                return turf.multiLineString(
                    connectToSeparateLines(
                        group
                            .filter((x) => turf.getType(x) === "LineString")
                            .map((x) => x.geometry.coordinates),
                    ),
                );
            })
            .filter((x) => x.geometry.coordinates.length > 0);

        return turf.combine(
            turf.buffer(
                turf.simplify(turf.featureCollection(neighbored), {
                    tolerance: 0.001,
                }),
                0.001,
            )!,
        ).features[0];
    },
    (features) => `${JSON.stringify(features.map((x) => x.geometry))}`,
);

/**
 * Roughly 110m at the equator, matching the generalisation the high-speed rail
 * question uses. Coastline is never simplified more coarsely than this, however
 * far the question's point is from the sea.
 */
const MAX_COASTLINE_TOLERANCE = 0.001;

export const determineMeasuringBoundary = async (
    question: MeasuringQuestion,
) => {
    // Bail before touching the map data: an unchosen question should reach
    // nothing at all, and mapGeoJSON is legitimately null before the first
    // boundary load.
    if (question.type === UNSET_QUESTION_TYPE) return false;

    const bBox = turf.bbox(mapGeoJSON.get()!);

    switch (question.type) {
        case "highspeed-measure-shinkansen": {
            const features = osmtogeojson(
                await findPlacesInZone(
                    "[highspeed=yes]",
                    "Finding high-speed lines...",
                    "nwr",
                    "geom",
                ),
            ).features;

            return [highSpeedBase(features)];
        }
        case "coastline": {
            const coastline = await fetchCoastline(question.lat, question.lng);
            const point = turf.point([question.lng, question.lat]);

            // Measured against the coastline as lines. The previous code
            // closed it into landmass polygons and used
            // pointToPolygonDistance, which returns a *negative* distance for
            // a point inside the polygon -- i.e. for every point on land. That
            // negative then reached turf.buffer, which returned undefined, and
            // the question died in a swallowed exception.
            const distanceToCoastline = Math.min(
                ...coastline.features.map((feature: Feature) =>
                    turf.pointToLineDistance(point, feature as any, {
                        units: "miles",
                        method: "geodesic",
                    }),
                ),
            );

            // Only coast within the question's own distance of the hiding
            // zone can move the answer, so clip to exactly that. The previous
            // window also padded by the zone's full width on every side, which
            // roughly tripled the coastline carried through.
            const searchArea = bBox
                ? (turf.bbox(
                      turf.buffer(turf.bboxPolygon(bBox), distanceToCoastline, {
                          units: "miles",
                      })!,
                  ) as [number, number, number, number])
                : ([-180, -90, 180, 90] as [number, number, number, number]);

            // Hand back the coastline itself, clipped to the stretch that can
            // matter, and let arcBufferToPoint buffer it out to the question's
            // own distance -- the same treatment every other measuring
            // question gets. Buffering the closed landmass here instead only
            // ever grew seawards, so the region it produced never overlapped
            // the hiding zone and the question silently did nothing.
            const nearbyCoastline = coastline.features
                .map((feature: Feature) => {
                    try {
                        return turf.bboxClip(feature as any, searchArea);
                    } catch {
                        return null; // Not clippable against this window
                    }
                })
                .filter(
                    (feature: any) =>
                        feature && feature.geometry?.coordinates?.length > 0,
                );

            if (nearbyCoastline.length === 0) return false;

            // The band this becomes is `distanceToCoastline` wide, so detail
            // finer than that cannot move its edge -- but every vertex is paid
            // for in the geodesic buffer downstream, and OSM coastline runs to
            // thousands of them. Generalising to a fiftieth of the distance
            // keeps the result within a fraction of a percent of the
            // full-detail one while cutting the vertex count by an order of
            // magnitude.
            const simplified = turf.simplify(
                turf.featureCollection(nearbyCoastline as any),
                {
                    tolerance: Math.min(
                        MAX_COASTLINE_TOLERANCE,
                        turf.convertLength(
                            distanceToCoastline,
                            "miles",
                            "degrees",
                        ) / 50,
                    ),
                    highQuality: false,
                },
            );

            // Thicken the lines into a sliver polygon, the way the high-speed
            // rail question above does -- arcBufferToPoint is handed polygons
            // everywhere else in this file. A metre-wide sliver needs no
            // rounded corners, hence steps: 1.
            return [
                turf.combine(turf.buffer(simplified, 0.001, { steps: 1 })!)
                    .features[0],
            ];
        }
        case "airport":
            return [
                turf.combine(
                    turf.featureCollection(
                        _.uniqBy(
                            (
                                await findPlacesInZone(
                                    '["aeroway"="aerodrome"]["iata"]', // Only commercial airports have IATA codes,
                                    "Finding airports...",
                                )
                            ).elements,
                            (feature: any) => feature.tags.iata,
                        ).map((x: any) =>
                            turf.point([
                                x.center ? x.center.lon : x.lon,
                                x.center ? x.center.lat : x.lat,
                            ]),
                        ),
                    ),
                ).features[0],
            ];
        case "city":
            return [
                turf.combine(
                    turf.featureCollection(
                        (
                            await findPlacesInZone(
                                '[place=city]["population"~"^[1-9]+[0-9]{6}$"]', // The regex is faster than (if:number(t["population"])>1000000)
                                "Finding cities...",
                            )
                        ).elements.map((x: any) =>
                            turf.point([
                                x.center ? x.center.lon : x.lon,
                                x.center ? x.center.lat : x.lat,
                            ]),
                        ),
                    ),
                ).features[0],
            ];
        case "aquarium-full":
        case "zoo-full":
        case "theme_park-full":
        case "museum-full":
        case "hospital-full":
        case "cinema-full":
        case "library-full":
        case "golf_course-full":
        case "consulate-full":
        case "park-full": {
            const location = question.type.split("-full")[0] as APILocations;

            const data = await findPlacesInZone(
                `[${LOCATION_FIRST_TAG[location]}=${location}]`,
                `Finding ${prettifyLocation(location, true).toLowerCase()}...`,
                "nwr",
                "center",
                [],
                60,
            );

            if (data.remark && data.remark.startsWith("runtime error")) {
                toast.error(
                    `Error finding ${prettifyLocation(
                        location,
                        true,
                    ).toLowerCase()}. Please enable hiding zone mode and switch to the Large Game variation of this question.`,
                );
                return [turf.multiPolygon([])];
            }

            if (data.elements.length >= 1000) {
                toast.error(
                    `Too many ${prettifyLocation(
                        location,
                        true,
                    ).toLowerCase()} found (${data.elements.length}). Please enable hiding zone mode and switch to the Large Game variation of this question.`,
                );
                return [turf.multiPolygon([])];
            }

            return [
                turf.combine(
                    turf.featureCollection(
                        data.elements.map((x: any) =>
                            turf.point([
                                x.center ? x.center.lon : x.lon,
                                x.center ? x.center.lat : x.lat,
                            ]),
                        ),
                    ),
                ).features[0],
            ];
        }
        case "custom-measure":
            return turf.combine(
                turf.featureCollection((question as any).geo.features),
            ).features;
        case "aquarium":
        case "zoo":
        case "theme_park":
        case "museum":
        case "hospital":
        case "cinema":
        case "library":
        case "golf_course":
        case "consulate":
        case "park":
        case "mcdonalds":
        case "seven11":
        case "rail-measure":
            return false;
    }
};

const bufferedDeterminer = _.memoize(
    async (question: MeasuringQuestion) => {
        const placeData = await determineMeasuringBoundary(question);

        if (placeData === false || placeData === undefined) return false;

        return arcBufferToPoint(
            turf.featureCollection(placeData as any),
            question.lat,
            question.lng,
        );
    },
    (question) =>
        JSON.stringify({
            type: question.type,
            lat: question.lat,
            lng: question.lng,
            entirety: polyGeoJSON.get()
                ? polyGeoJSON.get()
                : mapGeoLocation.get(),
            geo: (question as any).geo,
        }),
);

export const adjustPerMeasuring = async (
    question: MeasuringQuestion,
    mapData: any,
) => {
    if (mapData === null) return;

    const buffer = await bufferedDeterminer(question);

    if (buffer === false) return mapData;

    return modifyMapData(mapData, buffer, question.hiderCloser);
};

export const hiderifyMeasuring = async (question: MeasuringQuestion) => {
    const $hiderMode = hiderMode.get();
    if ($hiderMode === false) {
        return question;
    }

    if (question.type === UNSET_QUESTION_TYPE) {
        return question;
    }

    if (
        [
            "aquarium",
            "zoo",
            "theme_park",
            "museum",
            "hospital",
            "cinema",
            "library",
            "golf_course",
            "consulate",
            "park",
        ].includes(question.type)
    ) {
        const questionNearest = await nearestToQuestion(
            question as HomeGameMeasuringQuestions,
        );
        const hiderNearest = await nearestToQuestion({
            lat: $hiderMode.latitude,
            lng: $hiderMode.longitude,
            hiderCloser: true,
            type: (question as HomeGameMeasuringQuestions).type,
            drag: false,
            color: "black",
            collapsed: false,
        });

        question.hiderCloser =
            questionNearest.properties.distanceToPoint >
            hiderNearest.properties.distanceToPoint;

        return question;
    }

    if (question.type === "rail-measure") {
        const stations = trainStations.get();

        if (stations.length === 0) {
            return question;
        }

        const location = turf.point([question.lng, question.lat]);

        const nearestTrainStation = turf.nearestPoint(
            location,
            turf.featureCollection(stations.map((x) => x.properties.geometry)),
        );

        const distance = turf.distance(location, nearestTrainStation);

        const hider = turf.point([$hiderMode.longitude, $hiderMode.latitude]);

        const hiderNearest = turf.nearestPoint(
            hider,
            turf.featureCollection(stations.map((x) => x.properties.geometry)),
        );

        const hiderDistance = turf.distance(hider, hiderNearest);

        question.hiderCloser = hiderDistance < distance;
    }

    if (question.type === "mcdonalds" || question.type === "seven11") {
        const points = await findPlacesSpecificInZone(
            question.type === "mcdonalds"
                ? QuestionSpecificLocation.McDonalds
                : QuestionSpecificLocation.Seven11,
        );

        const seeker = turf.point([question.lng, question.lat]);
        const nearest = turf.nearestPoint(seeker, points as any);

        const distance = turf.distance(seeker, nearest, {
            units: "miles",
        });

        const hider = turf.point([$hiderMode.longitude, $hiderMode.latitude]);
        const hiderNearest = turf.nearestPoint(hider, points as any);

        const hiderDistance = turf.distance(hider, hiderNearest, {
            units: "miles",
        });

        question.hiderCloser = hiderDistance < distance;
        return question;
    }

    const $mapGeoJSON = mapGeoJSON.get();
    if ($mapGeoJSON === null) return question;

    let feature = null;

    try {
        feature = holedMask((await adjustPerMeasuring(question, $mapGeoJSON))!);
    } catch {
        try {
            feature = await adjustPerMeasuring(question, {
                type: "FeatureCollection",
                features: [holedMask($mapGeoJSON)],
            });
        } catch {
            return question;
        }
    }

    if (feature === null || feature === undefined) return question;

    const hiderPoint = turf.point([$hiderMode.longitude, $hiderMode.latitude]);

    if (turf.booleanPointInPolygon(hiderPoint, feature)) {
        question.hiderCloser = !question.hiderCloser;
    }

    return question;
};

export const measuringPlanningPolygon = async (question: MeasuringQuestion) => {
    try {
        const buffered = await bufferedDeterminer(question);

        if (buffered === false) return false;

        return turf.polygonToLine(buffered);
    } catch {
        return false;
    }
};
