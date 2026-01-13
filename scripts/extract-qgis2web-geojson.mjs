import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const layersDir = path.join(repoRoot, "src", "qgis2web", "layers");
const outDir = path.join(repoRoot, "public", "qgis2web", "geojson");

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

    for (const fileName of layerFiles) {
        const fullPath = path.join(layersDir, fileName);
        const js = await fs.readFile(fullPath, "utf8");

        const jsonText = extractFirstJsonObject(js);
        const geojson = JSON.parse(jsonText);

        const outName = fileName.replace(/\.js$/, ".geojson");
        const outPath = path.join(outDir, outName);
        await fs.writeFile(outPath, JSON.stringify(geojson), "utf8");
        written++;
    }

    console.log(`Extracted ${written} GeoJSON file(s) to ${path.relative(repoRoot, outDir)}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
