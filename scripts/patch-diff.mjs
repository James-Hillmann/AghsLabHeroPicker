// Diffs the current game VPK against the committed baseline to find what changed about the heroes.
//
//   1. Download the mod (once per patch, ~1.7 GB, no Steam login):
//        steamcmd +force_install_dir <dir> +login anonymous +workshop_download_item 570 2483181385 +quit
//      (macOS first-run fix: xattr -dr com.apple.quarantine /usr/local/Caskroom/steamcmd/*/MacOS)
//   2. Point this at the .vpk and run:
//        LABYRINTH_VPK=<dir>/steamapps/workshop/content/570/2483181385/2483181385.vpk npm run patch:diff
//   3. It prints the heroes/abilities that changed vs scripts/patch-baseline/abilities.json.
//   4. To roll the baseline forward after a patch, re-run with --update to overwrite the baseline.
//
// Ability-only (no icons/relics/artifacts), so it needs no extra deps -- the readers in scripts/lib
// are pure Node. Balance narrative still comes from arakunido; this tells you *which* heroes moved.

import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { buildAbilities } from './lib/abilities.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASELINE = path.join(ROOT, 'scripts', 'patch-baseline', 'abilities.json')

const { abilities: fresh, heroes } = buildAbilities()

if (process.argv.includes('--update')) {
  const patch = process.argv[process.argv.indexOf('--patch') + 1] || 'unknown'
  writeFileSync(BASELINE, JSON.stringify({ patch, capturedFrom: 'workshop 2483181385', heroCount: heroes.length, abilities: fresh }))
  console.log(`Baseline updated: ${fresh.length} abilities, patch ${patch}`)
  process.exit(0)
}

const base = JSON.parse(readFileSync(BASELINE, 'utf8'))
const freshBy = new Map(fresh.map((a) => [a.slug, a]))
const oldBy = new Map(base.abilities.map((a) => [a.slug, a]))

const key = (a) =>
  JSON.stringify({
    name: a.name, description: a.description, note: a.note, values: a.values,
    cast: a.cast, talents: a.talents, epics: a.epics, shards: a.shards, maxLevel: a.maxLevel,
  })

const byHero = {}
const add = (hero, line) => (byHero[hero] ??= []).push(line)

for (const [slug, a] of freshBy) {
  const o = oldBy.get(slug)
  if (!o) { add(a.hero, `ADDED ability: ${a.name}`); continue }
  if (key(a) !== key(o)) {
    const bits = ['values', 'epics', 'shards', 'cast', 'talents']
      .filter((f) => JSON.stringify(a[f]) !== JSON.stringify(o[f]))
    if (a.description !== o.description) bits.push('description')
    add(a.hero, `CHANGED: ${a.name} [${bits.join(', ') || 'other'}]`)
  }
}
for (const [slug, o] of oldBy) if (!freshBy.has(slug)) add(o.hero, `REMOVED ability: ${o.name}`)

console.log(`Baseline patch: ${base.patch} · ${base.abilities.length} abilities`)
console.log(`Current VPK:    ${fresh.length} abilities, ${heroes.length} heroes`)
const changed = Object.keys(byHero).sort()
console.log(`\n${changed.length} heroes changed:\n`)
for (const h of changed) {
  console.log(`### ${h}`)
  for (const line of byHero[h]) console.log(`  - ${line}`)
}
if (!changed.length) console.log('(no hero ability changes — baseline is current)')
