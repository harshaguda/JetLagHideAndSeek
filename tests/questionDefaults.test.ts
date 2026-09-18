import { describe, expect, it } from "vitest";

import { determineMatchingBoundary } from "@/maps/questions/matching";
import {
    matchingQuestionSchema,
    questionSchema,
    UNSET_QUESTION_TYPE,
} from "@/maps/schema";

describe("a newly added matching question", () => {
    it("has no type chosen yet", () => {
        const parsed = questionSchema.parse({
            id: "matching",
            data: { lat: 41.3874, lng: 2.1686 },
        });

        expect(parsed.data.type).toBe(UNSET_QUESTION_TYPE);
    });

    it("constrains nothing until a type is chosen, so no API call is made", async () => {
        const parsed = questionSchema.parse({
            id: "matching",
            data: { lat: 41.3874, lng: 2.1686 },
        });

        // false is the established "this question constrains nothing" signal
        // that adjustPerMatching checks before touching the map data.
        await expect(
            determineMatchingBoundary(parsed.data as any),
        ).resolves.toBe(false);
    });

    it("still accepts a real type once chosen", () => {
        const parsed = matchingQuestionSchema.parse({
            lat: 41.3874,
            lng: 2.1686,
            type: "airport",
        });

        expect(parsed.type).toBe("airport");
    });
});

describe("coastline distance", () => {
    it("is positive on land, and fine-grained where a detailed extract exists", async () => {
        const [{ default: fs }, turf, { default: osmtogeojson }] =
            await Promise.all([
                import("node:fs"),
                import("@turf/turf"),
                import("osmtogeojson"),
            ]);

        const detailed = turf.featureCollection(
            osmtogeojson(
                JSON.parse(
                    fs.readFileSync("public/coastline/barcelona.json", "utf8"),
                ),
            ).features.filter(
                (feature: any) => feature.geometry?.type === "LineString",
            ) as any,
        );

        // Barceloneta beach, essentially at the water's edge.
        const point = turf.point([2.1935, 41.3775]);
        const distance = Math.min(
            ...detailed.features.map((feature: any) =>
                turf.pointToLineDistance(point, feature, {
                    units: "meters",
                    method: "geodesic",
                }),
            ),
        );

        // Never negative: measuring against lines rather than closed landmass
        // polygons is what keeps turf.buffer from being handed a negative.
        expect(distance).toBeGreaterThan(0);

        // The 1:50m global file claims 1040m here.
        expect(distance).toBeLessThan(200);
    });
});
