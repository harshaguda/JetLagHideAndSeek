import * as L from "leaflet";

/**
 * Tells Leaflet where its default marker images live, instead of letting it
 * guess.
 *
 * Left alone, Leaflet reads the `background-image` of
 * `.leaflet-default-icon-path` out of its own stylesheet and strips
 * `marker-icon.png` off the end to get a directory. In a production build Vite
 * inlines that image as a base64 data URI, so there is nothing to strip: the
 * entire data URI becomes the prefix, every default marker resolves to a
 * nonsense URL, and the map shows broken images with the marker's alt text
 * instead of pins. It never reproduces in dev, where the stylesheet still
 * points at a real file on disk.
 *
 * The images this points at are the copies in `public/`, which are served
 * beside the app at its base path.
 */
const base = import.meta.env.BASE_URL || "/";

L.Icon.Default.imagePath = base.endsWith("/") ? base : `${base}/`;
