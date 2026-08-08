#!/usr/bin/env node
/**
 * scripts/drift.mjs — the drift metric.
 *
 * Per site: lines under src/site-local/** as a percentage of that site's
 * total source lines (src/**). "Source lines" = lines in code files
 * (.astro, .ts, .mjs, .js, .css); binary assets and the generated .astro/
 * types directory are excluded.
 *
 * Exits 1 if any site exceeds the 10% budget, so CI never lets the number
 * be a surprise.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const CODE = /\.(astro|ts|mjs|js|css)$/;
const BUDGET = 0.1;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry === '.astro' || entry === 'node_modules') continue;
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (CODE.test(entry)) out.push(full);
  }
  return out;
}

function lineCount(files) {
  return files.reduce((sum, f) => {
    try {
      return sum + readFileSync(f, 'utf8').split('\n').length;
    } catch {
      return sum;
    }
  }, 0);
}

const sites = ['senyum-sehat', 'baja-nusantara', 'kopi-tiga'];
const rows = [];
let over = false;

for (const site of sites) {
  const srcDir = join(root, 'sites', site, 'src');
  const all = walk(srcDir);
  const local = all.filter((f) => f.split(sep).includes('site-local'));
  const totalLines = lineCount(all);
  const localLines = lineCount(local);
  const pct = totalLines > 0 ? (localLines / totalLines) * 100 : 0;
  rows.push({ site, totalLines, localLines, pct });
  if (pct / 100 > BUDGET) over = true;
}

console.log('DRIFT METRIC — site-local lines vs total src lines (budget < 10%)');
console.log('site            total   site-local   drift%');
for (const r of rows) {
  console.log(
    `${r.site.padEnd(15)} ${String(r.totalLines).padStart(6)} ${String(r.localLines).padStart(11)} ${r.pct.toFixed(1).padStart(8)}${r.pct / 100 > BUDGET ? '  OVER BUDGET' : ''}`,
  );
}
if (over) {
  console.error('\nFAIL: drift exceeds 10% — see FRICTION.md / FINDINGS.md for the honest reading.');
  process.exit(1);
}
console.log('\nPASS: all sites within the 10% drift budget.');
