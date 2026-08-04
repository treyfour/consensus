#!/usr/bin/env node
/**
 * Design-system guard.
 *
 * The CDL tokens are extracted from the real Consensus product. The whole point
 * of the prototype is that it reads as *theirs*, and the fastest way to lose that
 * is a component quietly inventing #f3f4f6 at 1am. A document can't stop that;
 * a failing build can.
 *
 * Fails on: raw hex / rgb() / hsl() colours, hard-coded font families, and
 * Tailwind arbitrary values carrying a literal colour.
 * Ignores: the token files themselves (they ARE the values).
 */
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";

const ALLOWLIST = new Set([
  "app/cdl-tokens.css", // the extracted source of truth
  "app/globals.css", // maps tokens → utilities; declares the font stack once
]);

const RULES = [
  {
    name: "raw-hex",
    re: /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
    hint: "use a --cdl-* token (or a bg-*/text-* utility)",
  },
  {
    name: "raw-rgb-hsl",
    re: /\b(?:rgba?|hsla?)\(/g,
    hint: "use a --cdl-* colour token",
  },
  {
    name: "raw-font-family",
    re: /font-family\s*:/g,
    hint: "font stacks live in globals.css only",
  },
  {
    name: "arbitrary-colour",
    re: /\[(?:#|rgb|hsl)[^\]]*\]/g,
    hint: "no arbitrary colour values in class names",
  },
];

const files = globSync("{app,components,lib}/**/*.{ts,tsx,css}", {
  exclude: (p) => p.includes("node_modules"),
});

let failures = 0;

for (const file of files) {
  const rel = file.replace(/\\/g, "/");
  if (ALLOWLIST.has(rel)) continue;

  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.includes("guard-ok")) return; // deliberate, documented escape hatch
    for (const rule of RULES) {
      rule.re.lastIndex = 0;
      const hits = line.match(rule.re);
      if (!hits) continue;
      failures++;
      console.error(
        `${rel}:${i + 1}  ${rule.name}  ${hits.join(", ")}\n    → ${rule.hint}`
      );
    }
  });
}

if (failures) {
  console.error(
    `\n✗ design guard: ${failures} raw value${failures === 1 ? "" : "s"} escaped into components.`
  );
  process.exit(1);
}

console.log(`✓ design guard: ${files.length} files clean.`);
