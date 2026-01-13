import "leaflet/dist/leaflet.css";
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";
import "leaflet-contextmenu";

import { useStore } from "@nanostores/react";
import * as turf from "@turf/turf";
import * as L from "leaflet";
import { useEffect, useMemo } from "react";
import { MapContainer, ScaleControl, TileLayer } from "react-leaflet";
import { toast } from "react-toastify";

import {
    additionalMapGeoLocations,
    addQuestion,
    animateMapMovements,
    autoZoom,
    followMe,
    hiderMode,
    highlightTrainLines,
    isLoading,
    leafletMapContext,
    mapGeoJSON,
    mapGeoLocation,
    planningModeEnabled,
    polyGeoJSON,
    questionFinishedMapData,
    questions,
    showQgis2webLayers,
    thunderforestApiKey,
    triggerLocalRefresh,
} from "@/lib/context";
import { cn } from "@/lib/utils";
import { applyQuestionsToMapGeoData, holedMask } from "@/maps";
import { hiderifyQuestion } from "@/maps";
import { clearCache, determineMapBoundaries } from "@/maps/api";
import { findMatchingPlaces } from "@/maps/questions/matching";

import { DraggableMarkers } from "./DraggableMarkers";
import { LeafletFullScreenButton } from "./LeafletFullScreenButton";
import { MapPrint } from "./MapPrint";
import { PolygonDraw } from "./PolygonDraw";

export const Map = ({ className }: { className?: string }) => {
    useStore(additionalMapGeoLocations);
    const $mapGeoLocation = useStore(mapGeoLocation);
    const $questions = useStore(questions);
    const $highlightTrainLines = useStore(highlightTrainLines);
    const $thunderforestApiKey = useStore(thunderforestApiKey);
    const $hiderMode = useStore(hiderMode);
    const $isLoading = useStore(isLoading);
    const $followMe = useStore(followMe);
    const $showQgis2webLayers = useStore(showQgis2webLayers);
    const map = useStore(leafletMapContext);

    const followMeMarkerRef = useMemo(
        () => ({ current: null as L.Marker | null }),
        [],
    );
    const geoWatchIdRef = useMemo(
        () => ({ current: null as number | null }),
        [],
    );

    const qgis2webOverlayRef = useMemo(
        () => ({ layers: [] as L.Layer[] }),
        [],
    );

    const removeQgis2webOverlays = () => {
        if (!map) return;
        for (const layer of qgis2webOverlayRef.layers) {
            map.removeLayer(layer);
        }
        qgis2webOverlayRef.layers = [];
    };

    const refreshQuestions = async (focus: boolean = false) => {
        if (!map) return;

        if ($isLoading) return;

        isLoading.set(true);

        if ($questions.length === 0) {
            await clearCache();
        }

        let mapGeoData = mapGeoJSON.get();

        if (!mapGeoData) {
            const polyGeoData = polyGeoJSON.get();
            if (polyGeoData) {
                mapGeoData = polyGeoData;
                mapGeoJSON.set(polyGeoData);
            } else {
                await toast.promise(
                    determineMapBoundaries()
                        .then((x) => {
                            mapGeoJSON.set(x);
                            mapGeoData = x;
                        })
                        .catch((error) => console.log(error)),
                    {
                        error: "Error refreshing map data",
                    },
                );
            }
        }

        if ($hiderMode !== false) {
            for (const question of $questions) {
                await hiderifyQuestion(question);
            }

            triggerLocalRefresh.set(Math.random()); // Refresh the question sidebar with new information but not this map
        }

        map.eachLayer((layer: any) => {
            if (layer.questionKey || layer.questionKey === 0) {
                map.removeLayer(layer);
            }
            if (layer.matchingPoiOverlay) {
                map.removeLayer(layer);
            }
            if (layer.qgis2webOverlay) {
                map.removeLayer(layer);
            }
        });

        try {
            mapGeoData = await applyQuestionsToMapGeoData(
                $questions,
                mapGeoData,
                planningModeEnabled.get(),
                (geoJSONObj, question) => {
                    const geoJSONPlane = L.geoJSON(geoJSONObj);
                    // @ts-expect-error This is a check such that only this type of layer is removed
                    geoJSONPlane.questionKey = question.key;
                    geoJSONPlane.addTo(map);
                },
            );

            mapGeoData = {
                type: "FeatureCollection",
                features: [holedMask(mapGeoData!)!],
            };

            map.eachLayer((layer: any) => {
                if (layer.eliminationGeoJSON) {
                    // Hopefully only geoJSON layers
                    map.removeLayer(layer);
                }
            });

            const g = L.geoJSON(mapGeoData);
            // @ts-expect-error This is a check such that only this type of layer is removed
            g.eliminationGeoJSON = true;
            g.addTo(map);

            // Optional: overlay the underlying matching places for certain matching question types.
            for (const q of $questions) {
                if (q.id !== "matching") continue;
                const data = q.data;
                if (!data.showPlaces) continue;
                if (
                    !(
                        data.type === "airport" ||
                        data.type === "major-city" ||
                        data.type === "custom-points" ||
                        data.type.endsWith("-full")
                    )
                ) {
                    continue;
                }

                const points = (await findMatchingPlaces(data as any)) || [];
                if (points.length === 0) continue;

                const seekerPoint = turf.point([data.lng, data.lat]);
                const used = turf.nearestPoint(
                    seekerPoint,
                    turf.featureCollection(points as any) as any,
                );

                const candidatesLayer = L.geoJSON(
                    turf.featureCollection(points as any) as any,
                    {
                        pointToLayer: (_feature, latlng) =>
                            L.circleMarker(latlng, {
                                radius: 4,
                                color: "green",
                                fillColor: "green",
                                fillOpacity: 0.9,
                                weight: 1,
                            }),
                        onEachFeature: (feature: any, layer) => {
                            const name =
                                feature?.properties?.["name:en"] ||
                                feature?.properties?.name;
                            layer.bindPopup(
                                `<b>${name || "Location"}</b><br/>Type: ${data.type}`,
                            );
                        },
                    },
                );
                // @ts-expect-error intentionally mark custom layer
                candidatesLayer.matchingPoiOverlay = true;
                candidatesLayer.addTo(map);

                const usedLayer = L.geoJSON(used as any, {
                    pointToLayer: (_feature, latlng) =>
                        L.circleMarker(latlng, {
                            radius: 7,
                            color: "green",
                            fillColor: "green",
                            fillOpacity: 1,
                            weight: 2,
                        }),
                    onEachFeature: (feature: any, layer) => {
                        const name =
                            feature?.properties?.["name:en"] ||
                            feature?.properties?.name;
                        layer.bindPopup(
                            `<b>Used (nearest):</b> ${name || "Location"}<br/>Type: ${data.type}`,
                        );
                    },
                });
                // @ts-expect-error intentionally mark custom layer
                usedLayer.matchingPoiOverlay = true;
                usedLayer.addTo(map);
            }

            questionFinishedMapData.set(mapGeoData);

            // Optional: show qgis2web-exported layers as overlays.
            removeQgis2webOverlays();
            if ($showQgis2webLayers) {
                const assetBase = (import.meta.env.BASE_URL || "/").endsWith(
                    "/",
                )
                    ? (import.meta.env.BASE_URL || "/")
                    : `${import.meta.env.BASE_URL}/`;
                let styleIndex: Record<
                    string,
                    { color?: string; weight?: number }
                > = {};
                try {
                    const styleRes = await fetch(
                        `${assetBase}qgis2web/style-index.json`,
                    );
                    if (styleRes.ok) {
                        styleIndex = await styleRes.json();
                    }
                } catch {
                    // Ignore missing style index; fall back to feature properties.
                }
                const layerNames = [
                    "L1_1",
                    "L2_2",
                    "L3_3",
                    "L4_4",
                    "L5_5",
                    "L6_6",
                    "L7_7",
                    "L8_8",
                    "L9_9",
                    "L10_10",
                    "L11_11",
                    "L12_12",
                    "StationNames_13",
                ];

                for (const name of layerNames) {
                    try {
                        const res = await fetch(
                            `${assetBase}qgis2web/geojson/${name}.geojson`,
                        );
                        if (!res.ok) continue;
                        const geojson = await res.json();

                        const getFeatureColor = (feature: any) => {
                            const props = feature?.properties;
                            const raw =
                                props?.colour ??
                                props?.color ??
                                props?.stroke ??
                                props?.strokeColor ??
                                styleIndex?.[name]?.color;
                            return raw || "#22c55e";
                        };

                        const getFeatureWeight = (_feature: any) => {
                            return styleIndex?.[name]?.weight ?? 3;
                        };

                        const layer = L.geoJSON(geojson, {
                            style: (feature: any) => {
                                return {
                                    color: getFeatureColor(feature),
                                    weight: getFeatureWeight(feature),
                                    opacity: 0.9,
                                } as any;
                            },
                            pointToLayer: (_feature, latlng) =>
                                L.circleMarker(latlng, {
                                    radius: 4,
                                    color: getFeatureColor(_feature),
                                    fillColor: getFeatureColor(_feature),
                                    fillOpacity: 0.9,
                                    weight: 1,
                                }),
                            onEachFeature: (feature: any, l) => {
                                const nameValue =
                                    feature?.properties?.["name:en"] ||
                                    feature?.properties?.name ||
                                    feature?.properties?.ref ||
                                    feature?.properties?.full_id;
                                if (nameValue) {
                                    l.bindPopup(`<b>${nameValue}</b>`);
                                }
                            },
                        });
                        // @ts-expect-error intentionally mark custom layer
                        layer.qgis2webOverlay = true;
                        layer.addTo(map);
                        qgis2webOverlayRef.layers.push(layer);
                    } catch {
                        // Ignore missing/invalid geojson
                    }
                }
            }

            if (autoZoom.get() && focus) {
                const bbox = turf.bbox(holedMask(mapGeoData) as any);
                const bounds = [
                    [bbox[1], bbox[0]],
                    [bbox[3], bbox[2]],
                ];

                if (animateMapMovements.get()) {
                    map.flyToBounds(bounds as any);
                } else {
                    map.fitBounds(bounds as any);
                }
            }
        } catch (error) {
            console.log(error);

            isLoading.set(false);
            if (document.querySelectorAll(".Toastify__toast").length === 0) {
                return toast.error("No solutions found / error occurred");
            }
        } finally {
            isLoading.set(false);
        }
    };

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={$mapGeoLocation.geometry.coordinates}
                zoom={5}
                className={cn("w-[500px] h-[500px]", className)}
                ref={leafletMapContext.set}
                // @ts-expect-error Typing doesn't update from react-contextmenu
                contextmenu={true}
                contextmenuWidth={140}
                contextmenuItems={[
                    {
                        text: "Add Radius",
                        callback: (e: any) =>
                            addQuestion({
                                id: "radius",
                                data: {
                                    lat: e.latlng.lat,
                                    lng: e.latlng.lng,
                                },
                            }),
                    },
                    {
                        text: "Add Thermometer",
                        callback: (e: any) => {
                            const destination = turf.destination(
                                [e.latlng.lng, e.latlng.lat],
                                5,
                                90,
                                {
                                    units: "miles",
                                },
                            );

                            addQuestion({
                                id: "thermometer",
                                data: {
                                    latA: e.latlng.lat,
                                    lngA: e.latlng.lng,
                                    latB: destination.geometry.coordinates[1],
                                    lngB: destination.geometry.coordinates[0],
                                },
                            });
                        },
                    },
                    {
                        text: "Add Tentacles",
                        callback: (e: any) => {
                            addQuestion({
                                id: "tentacles",
                                data: {
                                    lat: e.latlng.lat,
                                    lng: e.latlng.lng,
                                },
                            });
                        },
                    },
                    {
                        text: "Add Matching",
                        callback: (e: any) => {
                            addQuestion({
                                id: "matching",
                                data: {
                                    lat: e.latlng.lat,
                                    lng: e.latlng.lng,
                                },
                            });
                        },
                    },
                    {
                        text: "Add Measuring",
                        callback: (e: any) => {
                            addQuestion({
                                id: "measuring",
                                data: {
                                    lat: e.latlng.lat,
                                    lng: e.latlng.lng,
                                },
                            });
                        },
                    },
                    {
                        text: "Copy Coordinates",
                        callback: (e: any) => {
                            if (!navigator || !navigator.clipboard) {
                                toast.error(
                                    "Clipboard API not supported in your browser",
                                );
                                return;
                            }

                            const latitude = e.latlng.lat;
                            const longitude = e.latlng.lng;

                            toast.promise(
                                navigator.clipboard.writeText(
                                    `${Math.abs(latitude)}°${latitude > 0 ? "N" : "S"}, ${Math.abs(
                                        longitude,
                                    )}°${longitude > 0 ? "E" : "W"}`,
                                ),
                                {
                                    pending: "Writing to clipboard...",
                                    success: "Coordinates copied!",
                                    error: "An error occurred while copying",
                                },
                                { autoClose: 1000 },
                            );
                        },
                    },
                ]}
            >
                {!($highlightTrainLines && $thunderforestApiKey) && (
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors; &copy; <a href="https://carto.com/attributions">CARTO</a>; &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>; Powered by Esri and Turf.js'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        subdomains="abcd"
                        maxZoom={20} // This technically should be 6, but once the ratelimiting starts this can take over
                        minZoom={2}
                        noWrap
                    />
                )}
                {$highlightTrainLines && $thunderforestApiKey && (
                    <TileLayer
                        url={`https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=${$thunderforestApiKey}`}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors; &copy; <a href="https://carto.com/attributions">CARTO</a>; &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>; Powered by Esri and Turf.js'
                        maxZoom={22}
                        minZoom={2}
                        noWrap
                    />
                )}
                <DraggableMarkers />
                <div className="leaflet-top leaflet-right">
                    <div className="leaflet-control flex-col flex gap-2">
                        <LeafletFullScreenButton />
                    </div>
                </div>
                <PolygonDraw />
                <ScaleControl position="bottomleft" />
                <MapPrint
                    position="topright"
                    sizeModes={["Current", "A4Portrait", "A4Landscape"]}
                    hideControlContainer={false}
                    hideClasses={[
                        "leaflet-full-screen-specific-name",
                        "leaflet-top",
                        "leaflet-control-easyPrint",
                        "leaflet-draw",
                    ]}
                    title="Print"
                />
            </MapContainer>
        ),
        [map, $highlightTrainLines, $thunderforestApiKey],
    );

    useEffect(() => {
        if (!map) return;

        refreshQuestions(true);
    }, [$questions, map, $hiderMode]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (!map) return;
            let layerCount = 0;
            map.eachLayer((layer: any) => {
                if (layer.eliminationGeoJSON) {
                    // Hopefully only geoJSON layers
                    layerCount++;
                }
            });
            if (layerCount > 1) {
                console.log("Too many layers, refreshing...");
                refreshQuestions(false);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [map]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const mainElement: HTMLElement | null =
                document.querySelector("main");

            if (mainElement) {
                if (document.fullscreenElement) {
                    mainElement.classList.add("fullscreen");
                } else {
                    mainElement.classList.remove("fullscreen");
                }
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange,
            );
        };
    }, []);

    useEffect(() => {
        if (!map) return;
        if (!$followMe) {
            if (followMeMarkerRef.current) {
                map.removeLayer(followMeMarkerRef.current);
                followMeMarkerRef.current = null;
            }
            if (geoWatchIdRef.current !== null) {
                navigator.geolocation.clearWatch(geoWatchIdRef.current);
                geoWatchIdRef.current = null;
            }
            return;
        }

        geoWatchIdRef.current = navigator.geolocation.watchPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                if (followMeMarkerRef.current) {
                    followMeMarkerRef.current.setLatLng([lat, lng]);
                } else {
                    const marker = L.marker([lat, lng], {
                        icon: L.divIcon({
                            html: `<div class="text-blue-700 bg-white rounded-full border-2 border-blue-700 shadow w-5 h-5 flex items-center justify-center"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#2A81CB" opacity="0.5"/><circle cx="8" cy="8" r="3" fill="#2A81CB"/></svg></div>`,
                            className: "",
                        }),
                        zIndexOffset: 1000,
                    });
                    marker.addTo(map);
                    followMeMarkerRef.current = marker;
                }
            },
            () => {
                toast.error("Unable to access your location.");
                followMe.set(false);
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 },
        );
        return () => {
            if (followMeMarkerRef.current) {
                map.removeLayer(followMeMarkerRef.current);
                followMeMarkerRef.current = null;
            }
            if (geoWatchIdRef.current !== null) {
                navigator.geolocation.clearWatch(geoWatchIdRef.current);
                geoWatchIdRef.current = null;
            }
        };
    }, [$followMe, map]);

    return displayMap;
};
