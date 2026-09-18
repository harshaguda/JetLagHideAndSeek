import { useEffect } from "react";

import type { CityPresetKey } from "@/lib/cityPresets";
import { applyCityPreset, selectedCity } from "@/lib/context";

/**
 * Applies the city a `/Barcelona`-style URL names. Renders nothing.
 *
 * Arriving at a city's own URL while already on that city is a no-op --
 * applyCityPreset clears the questions, and re-opening a bookmark should not
 * throw away the game in progress.
 */
export const CityFromUrl = ({ city }: { city: CityPresetKey }) => {
    useEffect(() => {
        if (selectedCity.get() === city) return;

        applyCityPreset(city);
    }, [city]);

    return null;
};
