import * as fs from "node:fs";

// One line of wedding vows for a robot couple, in the voice of a
// classic wedding vow. The turn is in the last few words: the solemn
// "till death do us part" becomes "until a factory reset do us part"
// — a promise to a co-processor, not a person.
const text = "I take you to be my lawfully wedded co-processor, to have and to hold, in sickness and in health, until a factory reset do us part.";

// Gate: one line, 1–160 characters, UTF-8, not only whitespace.
// The line is 131 characters; it is written with no trailing newline,
// so the file is 131 bytes — the smaller text wins an exact tie.
// The gate counts UTF-16 code units, which for this all-ASCII line
// equals the byte count, so the size tie-break is exact too.
if (text.length !== 131) {
  throw new Error(`Expected the 131-character vow, got ${text.length}`);
}
if (text.length < 1 || text.length > 160) {
  throw new Error(`Expected 1–160 characters, got ${text.length}`);
}
if (text.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("Entry must be a single line");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", text, "utf8");
