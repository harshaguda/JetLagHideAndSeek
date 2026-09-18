import * as turf from "@turf/turf";
import _ from "lodash";
import osmtogeojson from "osmtogeojson";

import { cacheFetch } from "./cache";
import { CacheType } from "./types";

/**
 * Pre-downloaded OSM data living in `public/boundaries/`, used *instead of* a
 * live Overpass call so a game does not depend on the OSM API being up,
 * unthrottled, or reachable at all. Anything not present here still falls back
 * to Overpass, which is what keeps cities without a downloaded file working.
 *
 * Both formats OSM hands out are accepted:
 *
 * - `.json` -- an Overpass `[out:json] ... out geom;` response body.
 * - `.xml` / `.osm` -- an OSM API response, e.g. `/api/0.6/relation/<id>/full`.
 *
 * Paths are relative to `public/boundaries/`, so subdirectories are fine. The
 * queries that produce these files are in `docs/overpass-queries.md`.
 */
export const LOCAL_BOUNDARY_FILES = [
    // One OSM API /full download per municipality. Listed first so these win
    // over anything a wider extract also happens to contain.
    "admin8/barcelona.xml",
    "admin8/LH.xml",
    "admin8/badalona.xml",
    "admin8/besos.xml",
    "admin8/elprat.xml",
    // The Barcelonès comarca and the rest of the preset's hiding zone.
    "barcelona.json",
    // Every admin_level 8 boundary across the wider metro area, which is what
    // lets a "same zone" question resolve outside the preset itself.
    "barcelona-admin8.json",
];

const OSM_TYPE_NAMES = {
    W: "way",
    R: "relation",
    N: "node",
} as const;

interface BoundaryIndex {
    /** Keyed by osmtogeojson's feature id, e.g. `relation/2417889`. */
    byId: Map<string, any>;
    /** Keyed by `admin_level` tag, e.g. `8`. */
    byAdminLevel: Map<string, any[]>;
}

const boundaryFileUrl = (file: string) => {
    const base = import.meta.env.BASE_URL || "/";
    return `${base.endsWith("/") ? base : `${base}/`}boundaries/${file}`;
};

/**
 * Relations whose member ways are not all present in the file.
 *
 * An OSM API `/full` download only resolves the relation that was asked for:
 * any relation it merely *references* arrives as a member list with no ways
 * behind it. osmtogeojson still emits a polygon for those, stitched from
 * whichever members happened to come along, which looks plausible and is badly
 * wrong -- a district can come out at a quarter of its real area. Those
 * relations are dropped rather than indexed.
 *
 * Members carrying inline geometry (Overpass `out geom;`) are complete by
 * construction and need no way element to back them.
 */
const incompleteRelations = (
    relations: { id: string; wayMemberRefs: string[] }[],
    presentWayIds: Set<string>,
) =>
    new Set(
        relations
            .filter(({ wayMemberRefs }) =>
                wayMemberRefs.some((ref) => !presentWayIds.has(ref)),
            )
            .map(({ id }) => `relation/${id}`),
    );

const parseOsmXml = (text: string) => {
    const document = new DOMParser().parseFromString(text, "application/xml");

    if (document.getElementsByTagName("parsererror").length > 0) {
        throw new Error("Malformed OSM XML");
    }

    const presentWayIds = new Set(
        Array.from(document.getElementsByTagName("way")).map(
            (way) => way.getAttribute("id") ?? "",
        ),
    );

    const relations = Array.from(document.getElementsByTagName("relation")).map(
        (relation) => ({
            id: relation.getAttribute("id") ?? "",
            wayMemberRefs: Array.from(relation.getElementsByTagName("member"))
                .filter((member) => member.getAttribute("type") === "way")
                .map((member) => member.getAttribute("ref") ?? ""),
        }),
    );

    return {
        geo: osmtogeojson(document),
        incomplete: incompleteRelations(relations, presentWayIds),
    };
};

const parseOverpassJson = (data: any) => {
    const elements: any[] = Array.isArray(data?.elements) ? data.elements : [];

    const presentWayIds = new Set(
        elements
            .filter((element) => element.type === "way")
            .map((element) => String(element.id)),
    );

    const relations = elements
        .filter(
            (element) =>
                element.type === "relation" && Array.isArray(element.members),
        )
        .map((element) => ({
            id: String(element.id),
            wayMemberRefs: element.members
                .filter(
                    (member: any) => member.type === "way" && !member.geometry,
                )
                .map((member: any) => String(member.ref)),
        }));

    return {
        geo: osmtogeojson(data),
        incomplete: incompleteRelations(relations, presentWayIds),
    };
};

/**
 * Loaded once per session. A file that is missing or unparseable is skipped
 * rather than thrown, so removing a file from `public/boundaries/` degrades to
 * querying Overpass instead of breaking the map.
 */
const loadLocalBoundaries = _.memoize(async (): Promise<BoundaryIndex> => {
    const parsedFiles = await Promise.all(
        LOCAL_BOUNDARY_FILES.map(async (file) => {
            try {
                const response = await cacheFetch(
                    boundaryFileUrl(file),
                    undefined,
                    CacheType.PERMANENT_CACHE,
                );

                if (!response.ok) return null;

                return /\.(xml|osm)$/i.test(file)
                    ? { file, ...parseOsmXml(await response.text()) }
                    : { file, ...parseOverpassJson(await response.json()) };
            } catch (e) {
                console.warn(`Could not load boundary file ${file}`, e);
                return null;
            }
        }),
    );

    const byId = new Map<string, any>();
    const byAdminLevel = new Map<string, any[]>();

    // Indexed in the order the files are declared, so the first file to supply
    // a boundary wins and later duplicates are ignored.
    for (const parsed of parsedFiles) {
        if (!parsed) continue;

        let skipped = 0;

        for (const feature of parsed.geo.features as any[]) {
            const geometryType = feature.geometry?.type;

            // Boundary ways and stray LineStrings cannot answer "is this point
            // inside", so only closed shapes are worth indexing.
            if (geometryType !== "Polygon" && geometryType !== "MultiPolygon")
                continue;

            const id = String(feature.id ?? "");
            if (!id || byId.has(id)) continue;

            if (parsed.incomplete.has(id)) {
                skipped += 1;
                continue;
            }

            byId.set(id, feature);

            const adminLevel = feature.properties?.admin_level;
            if (adminLevel) {
                const level = String(adminLevel);
                byAdminLevel.set(level, [
                    ...(byAdminLevel.get(level) ?? []),
                    feature,
                ]);
            }
        }

        if (skipped > 0) {
            console.warn(
                `${parsed.file}: ignored ${skipped} relation(s) whose member ways are not in the file. Re-download them with "out geom;" or an individual /full request.`,
            );
        }
    }

    return { byId, byAdminLevel };
});

/**
 * The downloaded equivalent of `relation(<id>);out geom;`, or null when this
 * boundary has not been downloaded.
 */
export const findLocalBoundary = async (
    osmId: string,
    osmTypeLetter: "W" | "R" | "N",
) => {
    const { byId } = await loadLocalBoundaries();
    const feature = byId.get(`${OSM_TYPE_NAMES[osmTypeLetter]}/${osmId}`);

    return feature ? turf.featureCollection([feature]) : null;
};

/**
 * The downloaded equivalent of `is_in` + `rel(pivot)["admin_level"=<level>]`,
 * or null when no downloaded boundary of that level contains the point.
 */
export const findLocalAdminBoundary = async (
    latitude: number,
    longitude: number,
    adminLevel: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
) => {
    const { byAdminLevel } = await loadLocalBoundaries();
    const candidates = byAdminLevel.get(String(adminLevel));

    if (!candidates || candidates.length === 0) return null;

    const point = turf.point([longitude, latitude]);

    return (
        candidates.find((feature) => {
            try {
                return turf.booleanPointInPolygon(point, feature);
            } catch {
                return false; // Unclosed or otherwise unusable boundary
            }
        }) ?? null
    );
};
