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
