import type { AdditionalMapGeoLocations, OpenStreetMap } from "@/maps/api";

/**
 * Ready-made hiding zones for the cities this tool ships data for. Each preset
 * is a base area plus the neighbouring municipalities that round out its
 * contiguous urban area, so selecting one gives a playable zone without
 * searching for every municipality by hand.
 *
 * Barcelona's base is the Barcelonès comarca (admin_level 7) rather than the
 * city, because that single relation already covers Barcelona, l'Hospitalet de
 * Llobregat, Badalona, Santa Coloma de Gramenet and Sant Adrià de Besòs.
 *
 * The locations are shaped exactly as `geocode` stores them: coordinates are
 * [latitude, longitude] and extents are [maxLat, minLon, minLat, maxLon].
 */
export type CityPresetKey = "helsinki" | "barcelona";

export interface CityPreset {
    label: string;
    base: OpenStreetMap;
    additional: OpenStreetMap[];
}

export const CITY_PRESETS: Record<CityPresetKey, CityPreset> = {
    helsinki: {
        label: "Helsinki",
        base: {
            geometry: {
                coordinates: [60.1699, 24.9384],
                type: "Point",
            },
            type: "Feature",
            properties: {
                osm_type: "R",
                osm_id: 34914,
                extent: [60.297, 24.739, 59.922, 25.254],
                country: "Finland",
                osm_key: "place",
                countrycode: "FI",
                osm_value: "city",
                name: "Helsinki",
                type: "city",
            },
        },
        additional: [
            {
                geometry: {
                    coordinates: [60.2055, 24.6559],
                    type: "Point",
                },
                type: "Feature",
                properties: {
                    osm_type: "R",
                    osm_id: 36097,
                    extent: [60.354, 24.536, 60.1, 24.845],
                    country: "Finland",
                    osm_key: "place",
                    countrycode: "FI",
                    osm_value: "city",
                    state: "Uusimaa",
                    name: "Espoo",
                    type: "city",
                },
            },
            {
                geometry: {
                    coordinates: [60.2934, 25.0378],
                    type: "Point",
                },
                type: "Feature",
                properties: {
                    osm_type: "R",
                    osm_id: 34920,
                    extent: [60.366, 24.747, 60.233, 25.158],
                    country: "Finland",
                    osm_key: "place",
                    countrycode: "FI",
                    osm_value: "city",
                    state: "Uusimaa",
                    name: "Vantaa",
                    type: "city",
                },
            },
            {
                geometry: {
                    coordinates: [60.2111209, 24.7293466],
                    type: "Point",
                },
                type: "Feature",
                properties: {
                    osm_type: "R",
                    osm_id: 37224,
                    extent: [60.225918, 24.6752776, 60.2025488, 24.7509167],
                    country: "Finland",
                    osm_key: "place",
                    countrycode: "FI",
                    osm_value: "city",
                    state: "Uusimaa",
                    name: "Kauniainen",
                    type: "city",
                },
            },
        ],
    },
    barcelona: {
        label: "Barcelona",
        base: {
            geometry: {
                coordinates: [41.4064673, 2.1630638],
                type: "Point",
            },
            type: "Feature",
            properties: {
                osm_type: "R",
                osm_id: 2417889,
                extent: [41.4929167, 2.0524977, 41.3170354, 2.2699776],
                country: "Spain",
                osm_key: "boundary",
                countrycode: "ES",
                osm_value: "administrative",
                state: "Catalonia",
                name: "Barcelonès",
                type: "county",
            },
        },
        additional: [
            {
                geometry: {
                    coordinates: [41.3778094, 2.0886257],
                    type: "Point",
                },
                type: "Feature",
                properties: {
                    osm_type: "R",
                    osm_id: 339972,
                    extent: [41.3943869, 2.0755617, 41.3658912, 2.1033975],
                    country: "Spain",
                    osm_key: "place",
                    countrycode: "ES",
                    osm_value: "town",
                    state: "Catalonia",
                    name: "Esplugues de Llobregat",
                    type: "city",
                },
            },
            {
                geometry: {
                    coordinates: [41.355724, 2.0706225],
                    type: "Point",
                },
                type: "Feature",
                properties: {
                    osm_type: "R",
                    osm_id: 339968,
                    extent: [41.369788, 2.0493708, 41.3413005, 2.0998749],
                    country: "Spain",
                    osm_key: "place",
                    countrycode: "ES",
                    osm_value: "city",
                    state: "Catalonia",
                    name: "Cornellà de Llobregat",
                    type: "city",
                },
            },
            {
                geometry: {
                    coordinates: [41.3305918, 2.0930815],
                    type: "Point",
                },
                type: "Feature",
                properties: {
                    osm_type: "R",
                    osm_id: 345761,
                    extent: [41.3483406, 2.0573318, 41.276588, 2.1676163],
                    country: "Spain",
                    osm_key: "place",
                    countrycode: "ES",
                    osm_value: "town",
                    state: "Catalonia",
                    name: "el Prat de Llobregat",
                    type: "city",
                },
            },
        ],
    },
};

export const CITY_PRESET_OPTIONS = Object.fromEntries(
    Object.entries(CITY_PRESETS).map(([key, preset]) => [key, preset.label]),
) as Record<CityPresetKey, string>;

export const cityPresetLocations = (
    city: CityPresetKey,
): AdditionalMapGeoLocations[] =>
    CITY_PRESETS[city].additional.map((location) => ({
        added: true,
        base: false,
        location,
    }));
