import 'server-only'

import { type Author } from './authors'
import { read, sql } from './db'
import { type Build, type Ranking, toBuild } from './rankings'
import { isTierId, type TierId } from './tiers'

type Row = {
  hero_slug: string
  author: string
  tier: string | null
  position: number
  build: unknown
}

function toRanking(row: Row): Ranking {
  return {
    heroSlug: row.hero_slug,
    author: row.author as Author,
    tier: isTierId(row.tier) ? row.tier : null,
    position: Number(row.position) || 0,
    build: toBuild(row.build),
  }
}

/**
 * Every ranking from both people, in one read. The board and the randomizer both want the
 * whole picture, and at ~126 rows max there's no reason to split it. Degrades to [] when the
 * database isn't wired up yet, so the UI renders empty rather than 500ing.
 */
export async function getAllRankings(): Promise<Ranking[]> {
  return read('rankings', [], async () => {
    const q = sql()
    const rows = (await q`
      select hero_slug, author, tier, position, build
      from rankings
      order by position asc
    `) as Row[]
    return rows.map(toRanking)
  })
}

/**
 * Place (or move) a hero in the caller's tier ladder. A null tier drops it back to the tray.
 * Upsert touches only tier/position, so a hero's saved build survives being re-tiered.
 */
export async function setTier(
  author: Author,
  heroSlug: string,
  tier: TierId | null,
  position: number,
): Promise<void> {
  const q = sql()
  await q`
    insert into rankings (hero_slug, author, tier, position)
    values (${heroSlug}, ${author}, ${tier}, ${position})
    on conflict (hero_slug, author)
    do update set tier = excluded.tier, position = excluded.position, updated_at = now()
  `
}

/**
 * Save the build pinned to a hero. Upsert touches only the build column, so it works whether
 * or not the hero is currently tiered.
 */
export async function saveBuild(author: Author, heroSlug: string, build: Build): Promise<void> {
  const q = sql()
  await q`
    insert into rankings (hero_slug, author, build)
    values (${heroSlug}, ${author}, ${JSON.stringify(build)}::jsonb)
    on conflict (hero_slug, author)
    do update set build = excluded.build, updated_at = now()
  `
}
