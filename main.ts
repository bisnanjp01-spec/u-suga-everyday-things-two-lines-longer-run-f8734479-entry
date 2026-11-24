// Everyday Things, Two Lines, Longer Run
// make.fun bounty u-suga-everyday-things-two-lines-longer-run-f8734479
//
// The program writes one text to /output/entry.txt: two lines for a
// 10-year-old. Line 1 explains a traffic jam through a single vivid
// analogy; line 2 says in one sentence what that analogy maps and
// what it leaves out. The gate needs 1-400 UTF-8 characters, so the
// program checks its own output before it writes it.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Line 1: one everyday thing, one vivid sentence, one analogy.
// Why elephants through a garden gate: both halves are things a
// 10-year-old can picture at once (a huge grey animal, a small
// garden opening), and the squeeze between them is the traffic
// jam itself — too many big bodies, too small a gap, no way past.
const LINE_1 =
  "A traffic jam is a parade of elephants trying to squeeze through a garden gate, one huge grey body at a time.";

// Line 2: one sentence on what the analogy maps and what it leaves out.
// It names the mapping (the slow squeeze) and two honest limits:
// elephants can leave and no one leads the parade, drivers cannot.
const LINE_2 =
  "It maps the slow squeeze of too many big cars into too small a gap, but it leaves out that elephants can turn around and walk away while drivers are stuck in line, and that no elephant is actually in charge of the parade.";

const OUTPUT_PATH = "/output/entry.txt";

function countSentences(line: string): number {
  return line.split(/[.!?]+/).filter((part) => part.trim().length > 0).length;
}

function buildEntry(): string {
  const lines = [LINE_1, LINE_2];
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (countSentences(line) !== 1) {
      throw new Error(`each line must be exactly one sentence: ${line}`);
    }
  }
  const text = lines.join("\n") + "\n";
  if (text.length < 1 || text.length > 400) {
    throw new Error(`entry must be 1-400 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  return text;
}

const entry = buildEntry();
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, entry, "utf8");
for (const [i, line] of entry.trimEnd().split("\n").entries()) {
  console.log(`line ${i + 1} (${line.length} chars): ${line}`);
}
console.log(`wrote ${OUTPUT_PATH} (${entry.length} characters, 2 lines)`);
