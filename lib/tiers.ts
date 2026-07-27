// The tier ladder. Deliberately plain-language and fixed -- four rungs plus an unassigned
// tray -- because the whole point is a quick "how did this hero feel" verdict, not a
// finely graded S/A/B/C list. Not 'server-only': the drag board and the randomizer filters
// both run in the browser and need these.

export const TIERS = [
  { id: 'best', label: 'Best', blurb: 'Broken. Pick it every time.', color: '#e7c15a' },
  { id: 'does_well', label: 'Does Well', blurb: 'Reliably good.', color: '#7fc06a' },
  { id: 'has_potential', label: 'Has Potential', blurb: 'Flashes of promise.', color: '#7dd3fc' },
  { id: 'dogshit', label: 'Absolute Dogshit', blurb: 'Never again.', color: '#d0574a' },
] as const

export type TierId = (typeof TIERS)[number]['id']

export const TIER_IDS = TIERS.map((tier) => tier.id) as TierId[]

const TIER_BY_ID = Object.fromEntries(TIERS.map((tier) => [tier.id, tier])) as Record<
  TierId,
  (typeof TIERS)[number]
>

export function tier(id: TierId) {
  return TIER_BY_ID[id]
}

export function isTierId(value: unknown): value is TierId {
  return typeof value === 'string' && (TIER_IDS as string[]).includes(value)
}
