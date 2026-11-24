// Dad Joke Showdown — make.fun entry (u-mfnakmal-dad-joke-showdown-1d2ce3e5)
//
// One dad joke, one line, at most 200 characters. The program writes
// that joke to entry.txt inside the harness output directory, where the
// sealed scorer reads it and the judge compares it two at a time with
// the other entries. Node 22, standard library only, no dependencies,
// no network access. Deterministic: every run writes the same joke.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke itself: a father, his son, and a guitar. The punchline
// turns on "fretting" — worrying over everything, and pressing the
// frets of a guitar. The setup quietly carries "grounded" as well,
// both a punishment and an electrical term, but the fretting line is
// the punchline and it arrives at the very end.
const JOKE =
  `I told my son his guitar was grounded. He asked why. I said, "It kept fretting over everything."`;

// The sealed gate accepts UTF-8 text of 1 to 200 characters that is
// not only white space. Fail loudly instead of writing a bad file.
const MAX_CHARS = 200;

function main(): void {
  const joke = JOKE.trim();

  if (joke.length === 0) {
    throw new Error("Dad joke is empty; refusing to write entry.txt");
  }
  if (joke.length > MAX_CHARS) {
    throw new Error(
      `Dad joke is ${joke.length} characters, over the ${MAX_CHARS}-character limit; refusing to write entry.txt`,
    );
  }

  // The harness provides MAKEFUN_OUTPUT_DIR ("/output" when graded).
  // Fall back to the standard output location when it is not set, so
  // a local run behaves the same way as the graded run. The directory
  // is created when missing, so the write never fails on a fresh box.
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = join(outputDir, "entry.txt");

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, `${joke}\n`, "utf8");

  console.log(`Wrote ${joke.length} characters to ${outputPath}`);
}

main();
