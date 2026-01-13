import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const layersDir = path.join(repoRoot, "src", "qgis2web", "layers");
const stylesDir = path.join(repoRoot, "src", "qgis2web", "styles");
const outDir = path.join(repoRoot, "public", "qgis2web", "geojson");
const outStyleIndexPath = path.join(repoRoot, "public", "qgis2web", "style-index.json");

const LAYERS_TO_SKIP = new Set(["layers.js"]);

function extractFirstJsonObject(text) {
    const equalsIdx = text.indexOf("=");
    if (equalsIdx === -1) {
        throw new Error("No '=' found (unexpected qgis2web layer format)");
    }

    const firstBrace = text.indexOf("{", equalsIdx);
    if (firstBrace === -1) {
        throw new Error("No '{' found after '='");
    }

    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let i = firstBrace; i < text.length; i++) {
        const ch = text[i];

        if (inString) {
            if (escaped) {
                escaped = false;
                continue;
            }
            if (ch === "\\") {
                escaped = true;
                continue;
            }
            if (ch === '"') {
                inString = false;
            }
            continue;
        }

        if (ch === '"') {
            inString = true;
            continue;
        }

        if (ch === "{") {
            depth++;
        } else if (ch === "}") {
            depth--;
            if (depth === 0) {
                return text.slice(firstBrace, i + 1);
            }
        }
    }

    throw new Error("Unbalanced braces while extracting JSON");
}

function extractStrokeStyleFromQgis2webStyleJs(styleJs) {
    // Typical qgis2web output contains:
    // stroke: new ol.style.Stroke({color: 'rgba(158,70,156,1.0)', ..., width: 4.56})
    const colorMatch = styleJs.match(
        /Stroke\(\{[^}]*?color:\s*['"]([^'"]+)['"][^}]*?\}\)/s,
    );
    const widthMatch = styleJs.match(/width:\s*([0-9]*\.?[0-9]+)/);

    const color = colorMatch?.[1];
    const weight = widthMatch ? Number.parseFloat(widthMatch[1]) : undefined;

    if (!color && !weight) return null;
    return { color, weight };
}

async function main() {
    await fs.mkdir(outDir, { recursive: true });

    const entries = await fs.readdir(layersDir);
    const layerFiles = entries
        .filter((name) => name.endsWith(".js"))
        .filter((name) => !LAYERS_TO_SKIP.has(name));

    if (layerFiles.length === 0) {
        console.error("No qgis2web layer .js files found in", layersDir);
        process.exit(1);
    }

    let written = 0;
    const styleIndex = {};

    for (const fileName of layerFiles) {
        const fullPath = path.join(layersDir, fileName);
        const js = await fs.readFile(fullPath, "utf8");

        const jsonText = extractFirstJsonObject(js);
        const geojson = JSON.parse(jsonText);

        const outName = fileName.replace(/\.js$/, ".geojson");
        const outPath = path.join(outDir, outName);
        await fs.writeFile(outPath, JSON.stringify(geojson), "utf8");
        written++;

        const layerName = fileName.replace(/\.js$/, "");
        const stylePath = path.join(stylesDir, `${layerName}_style.js`);
        try {
            const styleJs = await fs.readFile(stylePath, "utf8");
            const stroke = extractStrokeStyleFromQgis2webStyleJs(styleJs);
            if (stroke) {
                styleIndex[layerName] = stroke;
            }
        } catch {
            // Style file may not exist for every layer; ignore.
        }
    }

    await fs.mkdir(path.dirname(outStyleIndexPath), { recursive: true });
    await fs.writeFile(
        outStyleIndexPath,
        JSON.stringify(styleIndex, null, 2),
        "utf8",
    );

    console.log(
        `Extracted ${written} GeoJSON file(s) to ${path.relative(repoRoot, outDir)}`,
    );
    console.log(
        `Wrote qgis2web style index to ${path.relative(repoRoot, outStyleIndexPath)}`,
    );
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
