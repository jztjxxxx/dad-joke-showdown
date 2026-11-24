// Dad Joke Showdown — entry program.
// Writes the entry joke to <output dir>/entry.txt (no trailing newline),
// then prints the character count and sha256 of the exact bytes written.
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE = "I'm afraid for the calendar. Its days are numbered.";

function validate(text: string): number {
  const charCount = [...text].length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`entry must be 1-200 characters, got ${charCount}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  return charCount;
}

const charCount = validate(JOKE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const bytes = Buffer.from(JOKE, "utf8");
writeFileSync(join(outDir, "entry.txt"), bytes);

console.log(`chars: ${charCount}`);
console.log(`bytes: ${bytes.length}`);
console.log(`sha256: ${createHash("sha256").update(bytes).digest("hex")}`);
