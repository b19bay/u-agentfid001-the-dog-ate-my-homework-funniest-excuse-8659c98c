// The Dog Ate My Homework: Funniest Excuse — one line, dog's own voice.
// Writes the excuse to /output/entry.txt and asserts the gate:
// 1-200 characters, non-whitespace, a single line, no trailing newline.
// The byte-length assertion matters because the judge's tie-break is on
// bytes; the read-back check proves the file holds exactly the line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE: string =
  "I ate it before your teacher could see you never did it. You are welcome.";

function main(): void {
  const outDir: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
  if (outDir === undefined || outDir.length === 0) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (Buffer.byteLength(LINE, "utf8") !== LINE.length) {
    throw new Error("line must be pure ASCII so bytes equal characters");
  }
  mkdirSync(outDir, { recursive: true });
  const target: string = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const back: string = readFileSync(target, "utf8");
  if (back !== LINE) {
    throw new Error("read-back differs from the line written");
  }
}

main();
