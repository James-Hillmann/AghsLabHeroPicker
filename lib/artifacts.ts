// The Archive. Data is generated from the game files -- see ARTIFACTS.md -- so everything
// here is behaviour: presentation constants, lookups, and the search ranking.
//
// The split is the point. lib/artifacts.generated.ts is machine-owned and gets overwritten on
// every regeneration; nothing hand-written lives there. Opinions about artifacts are per-author
// and live in the database (lib/comments.ts), so they can't be clobbered either.

import { ARTIFACTS, ERAS, type Artifact, type ArtifactStat, type Era } from './artifacts.generated'

export { ARTIFACTS, ERAS }
export type { Artifact, ArtifactStat, Era }
export type { ArtifactEffect, ArtifactUpgrade } from './artifacts.generated'

/** The Archive rail's own names, as the game writes them. */
export const ERA_NAME: Record<Era, string> = {
  origin: 'Origin',
  genesis: 'Genesis Era',
  middle: 'Middle Era',
  post: 'Post Era',
}

/** The rail's colours, dimmed a touch to sit inside the ice palette. */
export const ERA_COLOR: Record<Era, string> = {
  origin: '#d98a3f',
  genesis: '#cfe8f5',
  middle: '#6aa9e0',
  post: '#c46ae0',
}

/** The value a stat line shows at a given artifact level. */
export function statValue(stat: ArtifactStat, level: number): number {
  // 30 + 0.3 * 23 lands on 36.900000000000006 in binary floating point, and the game never
  // shows more than two decimals (+3.05 Mana Regeneration).
  return Math.round((stat.base + stat.perLevel * level) * 100) / 100
}

/** "+36.9% Spell AMP" -- the whole line, formatted the way the tooltip writes it. */
export function formatStat(stat: ArtifactStat, level: number): string {
  return `+${statValue(stat, level)}${stat.unit ?? ''} ${stat.name}`
}

export function getArtifacts(): Artifact[] {
  return ARTIFACTS
}

export function getArtifact(slug: string): Artifact | undefined {
  return ARTIFACTS.find((artifact) => artifact.slug === slug)
}

/** Every era, in rail order, even ones with nothing in them. */
export function artifactsByEra(artifacts: Artifact[] = ARTIFACTS): Record<Era, Artifact[]> {
  return Object.fromEntries(
    ERAS.map((era) => [era, artifacts.filter((artifact) => artifact.era === era)]),
  ) as Record<Era, Artifact[]>
}

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

/**
 * How well an artifact answers a query. Lower is better; null means no match. Mirrors
 * scoreHero() in lib/heroes.ts -- a name that *starts* with what you typed beats a mid-word
 * hit, so "eden" surfaces Eden Anvil rather than something that merely contains those letters.
 *
 * Rank 2 matters more than it looks here: a lot of artifact names lead with "The" or a
 * possessive, so the word you actually remember is rarely the first one.
 */
export function scoreArtifact(artifact: Artifact, query: string): number | null {
  const q = normalise(query)
  if (!q) return 0

  const name = normalise(artifact.name)

  if (name === q) return 0
  if (name.startsWith(q)) return 1
  if (artifact.name.split(/\s+/).some((word) => normalise(word).startsWith(q))) return 2
  if (name.includes(q)) return 3
  return null
}

/** Matching artifacts, best first, Archive order preserved within a rank. */
export function searchArtifacts(artifacts: Artifact[], query: string): Artifact[] {
  return artifacts
    .map((artifact, index) => ({ artifact, index, score: scoreArtifact(artifact, query) }))
    .filter(
      (entry): entry is { artifact: Artifact; index: number; score: number } => entry.score !== null,
    )
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((entry) => entry.artifact)
}
