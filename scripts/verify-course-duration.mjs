/**
 * Verifies that each module's declared minutes equal the sum of its step
 * minutes, and reports the course total (target: ~120 minutes).
 * Parses the TypeScript course files with regex (no build needed).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "course");
const files = fs.readdirSync(dir).filter((f) => f !== "index.ts" && f.endsWith(".ts"));

let total = 0;
let failed = false;

for (const file of files.sort()) {
  const src = fs.readFileSync(path.join(dir, file), "utf8");
  const moduleMinutes = Number(src.match(/^\s{2}minutes:\s*(\d+),/m)?.[1] ?? 0);
  const stepMinutes = [...src.matchAll(/^\s{6}minutes:\s*(\d+),/gm)].map((m) => Number(m[1]));
  const sum = stepMinutes.reduce((a, b) => a + b, 0);
  const ok = sum === moduleMinutes;
  if (!ok) failed = true;
  total += moduleMinutes;
  console.log(
    `${ok ? "OK " : "FAIL"} ${file.padEnd(16)} module=${String(moduleMinutes).padStart(3)}min steps=${String(sum).padStart(3)}min (${stepMinutes.length} steps)`
  );
}

console.log(`\nCourse total: ${total} minutes (target ~120)`);
if (failed) {
  console.error("Duration mismatch found.");
  process.exit(1);
}
