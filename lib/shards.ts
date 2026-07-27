// Each hero's Legendary Shards, derived from the game's ability data.
//
// In Aghs Labyrinth the gold "Legendary Shard" upgrades are the game's *epics* -- named,
// described upgrades that change how one ability behaves (Zeus's "Alternating Current",
// "Ionizing Radiation", ...). The flat blue stat bumps are `shards` in the data and are not
// what a player means by "legendary shards", so they're left out here.
//
// Not 'server-only': the build editor and hover card render these in the browser.

import { ABILITIES } from './abilities.generated'

export type LegendaryShard = {
  /** Stable id (the epic's game id) -- what a build stores. */
  id: string
  name: string
  /** Rich text with the game's highlight markers; render through <RichText>. */
  description: string
  /** Valve ability texture name, for the CDN icon. */
  iconName: string | null
  /** The ability this shard upgrades, for grouping/labelling. */
  ability: string
}

const CACHE = new Map<string, LegendaryShard[]>()

/**
 * A hero's legendary shards, in ability order then in-pool order, deduped by game id (an epic
 * can be listed under more than one ability via `alsoAffects`).
 */
export function legendaryShardsForHero(heroSlug: string): LegendaryShard[] {
  const cached = CACHE.get(heroSlug)
  if (cached) return cached

  const shards: LegendaryShard[] = []
  const seen = new Set<string>()

  for (const ability of ABILITIES) {
    if (ability.hero !== heroSlug) continue
    for (const epic of ability.epics) {
      if (seen.has(epic.gameId)) continue
      seen.add(epic.gameId)
      shards.push({
        id: epic.gameId,
        name: epic.name,
        description: epic.description,
        iconName: epic.iconName,
        ability: ability.name,
      })
    }
  }

  CACHE.set(heroSlug, shards)
  return shards
}

/** Look up a handful of shards by id within one hero -- what a saved build stores. */
export function shardsByIds(heroSlug: string, ids: string[]): LegendaryShard[] {
  if (!ids.length) return []
  const all = legendaryShardsForHero(heroSlug)
  const wanted = new Set(ids)
  return all.filter((shard) => wanted.has(shard.id))
}
