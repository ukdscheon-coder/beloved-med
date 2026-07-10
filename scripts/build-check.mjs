import { access, readFile } from "node:fs/promises";

const required = [
  "index.html",
  "assets/styles.css",
  "assets/app.js",
  "service-worker.js",
  "data/drugs.js",
  "api/recognize.js"
];

for (const file of required) {
  await access(new URL(`../${file}`, import.meta.url));
}

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
if (!html.includes("beloved-med") || !html.includes("assets/app.js")) {
  throw new Error("index.html is missing required beloved-med app wiring.");
}

console.log("beloved-med build check passed.");
