import { cp, mkdir, rm } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const dist = new URL("../dist/", import.meta.url);

const staticEntries = [
  "index.html",
  "manifest.webmanifest",
  "service-worker.js",
  "assets",
  "data"
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of staticEntries) {
  await cp(new URL(entry, root), new URL(entry, dist), { recursive: true });
}

console.log("beloved-med static output written to dist.");
