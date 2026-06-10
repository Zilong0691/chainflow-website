import { readFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("/Users/zhaozilong/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = [
  ["editable/svg/00-cover.svg", "output/00-cover.png"],
  ["editable/svg/01-structure.svg", "output/01-structure.png"],
  ["editable/svg/06-process.svg", "output/06-process.png"]
];

mkdirSync(path.join(root, "output"), { recursive: true });

for (const [src, dest] of pages) {
  const svg = readFileSync(path.join(root, src));
  await sharp(svg, { density: 144 })
    .resize(1080, 1440, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, dest));
  console.log(`${dest} rendered`);
}
