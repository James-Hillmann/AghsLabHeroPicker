// The shape of a ranking and its attached build. Not 'server-only': the board, the hover
// card and the editor all run in the browser and share these types.

import { type Author } from './authors'
import { type TierId } from './tiers'

/**
 * The optional build a person pins to a hero. Everything is a slug/id into the catalogues:
 * `keyShards` index a hero's legendary shards, `relics`/`artifacts` index the relic/artifact
 * catalogues. Rendered by resolving to the real (rich-text) descriptions.
 */
export type Build = {
  keyShards: string[]
  relics: string[]
  artifacts: string[]
  notes: string
}

export const EMPTY_BUILD: Build = { keyShards: [], relics: [], artifacts: [], notes: '' }

export type Ranking = {
  heroSlug: string
  author: Author
  /** null = in the unassigned tray for that author. */
  tier: TierId | null
  position: number
  build: Build
  /** ISO timestamp of the last change to this ranking. */
  updatedAt: string
  /** Game patch version this ranking was last set under; null if set before tracking. */
  patchVersion: string | null
}

/** Coerce whatever came out of the jsonb column into a well-formed Build. */
export function toBuild(raw: unknown): Build {
  if (!raw || typeof raw !== 'object') return { ...EMPTY_BUILD }
  const value = raw as Record<string, unknown>
  const list = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  return {
    keyShards: list(value.keyShards),
    relics: list(value.relics),
    artifacts: list(value.artifacts),
    notes: typeof value.notes === 'string' ? value.notes : '',
  }
}

export function isBuildEmpty(build: Build): boolean {
  return (
    build.keyShards.length === 0 &&
    build.relics.length === 0 &&
    build.artifacts.length === 0 &&
    build.notes.trim() === ''
  )
}

/** Rankings for one author, keyed by hero slug -- what a board needs. */
export type RankingsByHero = Record<string, Ranking>

export function indexByHero(rankings: Ranking[], author: Author): RankingsByHero {
  const out: RankingsByHero = {}
  for (const ranking of rankings) {
    if (ranking.author === author) out[ranking.heroSlug] = ranking
  }
  return out
}
