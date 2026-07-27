// Relics: the run upgrades you pick up inside a Labyrinth run. Data is generated from the
// game files -- see ARTIFACTS.md -- so everything here is behaviour.
//
// Unlike artifacts, relics have no era and don't level. A relic rolls a value inside a range
// when you take it, and the range widens by rarity tier, which is why the page shows bands
// rather than a level slider.

import { RELICS, type Relic, type RelicRoll } from './relics.generated'

export { RELICS }
export type { Relic, RelicRoll }

/**
 * The two kinds of relic, and the split the page groups by. Attribute relics are flat stat
 * sticks; main-effect relics change how something works.
 */
export const RELIC_GROUPS = ['effect', 'attribute'] as const

export type RelicGroup = (typeof RELIC_GROUPS)[number]

export const RELIC_GROUP_NAME: Record<RelicGroup, string> = {
  effect: 'Main Effects',
  attribute: 'Attributes',
}

export const RELIC_GROUP_COLOR: Record<RelicGroup, string> = {
  effect: '#7dd3fc',
  attribute: '#c9a86a',
}

export function groupOf(relic: Relic): RelicGroup {
  return relic.isAttribute ? 'attribute' : 'effect'
}

export function getRelics(): Relic[] {
  return RELICS
}

export function getRelic(slug: string): Relic | undefined {
  return RELICS.find((relic) => relic.slug === slug)
}

export function relicsByGroup(relics: Relic[] = RELICS): Record<RelicGroup, Relic[]> {
  return Object.fromEntries(
    RELIC_GROUPS.map((group) => [group, relics.filter((relic) => groupOf(relic) === group)]),
  ) as Record<RelicGroup, Relic[]>
}

/**
 * "1–3" for a tier, or "2" when the range has no spread. Tiers are zero-indexed here and
 * one-indexed in the UI.
 *
 * The bounds are ordered numerically rather than taken as given. The game's _min/_max are
 * worst-to-best *quality*, and for a cooldown or a duration the better roll is the smaller
 * number -- so those arrive with _min above _max and would otherwise render as "20–15".
 */
export function formatRoll(roll: RelicRoll, tier: number): string {
  const a = roll.min[tier]
  const b = roll.max[tier]
  if (a === undefined || b === undefined) return '—'
  if (a === b) return String(a)
  return `${Math.min(a, b)}–${Math.max(a, b)}`
}

/** How many rarity tiers a relic's rolls describe. Usually 4, but the data decides. */
export function tierCount(relic: Relic): number {
  return relic.rolls.reduce((most, roll) => Math.max(most, roll.min.length), 0)
}

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

/** Same ranking as artifacts and heroes: a prefix beats a mid-word hit. */
export function scoreRelic(relic: Relic, query: string): number | null {
  const q = normalise(query)
  if (!q) return 0

  const name = normalise(relic.name)

  if (name === q) return 0
  if (name.startsWith(q)) return 1
  if (relic.name.split(/\s+/).some((word) => normalise(word).startsWith(q))) return 2
  if (name.includes(q)) return 3
  // Relics are described by what they do more than what they're called, so the description
  // is searchable too -- "bottle" should find the bottle relics whatever they're named.
  if (normalise(relic.description).includes(q)) return 4
  return null
}

export function searchRelics(relics: Relic[], query: string): Relic[] {
  return relics
    .map((relic, index) => ({ relic, index, score: scoreRelic(relic, query) }))
    .filter((entry): entry is { relic: Relic; index: number; score: number } => entry.score !== null)
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((entry) => entry.relic)
}
