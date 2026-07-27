'use server'

import { revalidatePath } from 'next/cache'

import { requireSession } from '@/lib/auth-guard'
import { isDatabaseConfigured } from '@/lib/db'
import { getHero } from '@/lib/heroes'
import { type Build } from '@/lib/rankings'
import { saveBuild as dbSaveBuild, setTier as dbSetTier } from '@/lib/rankings-db'
import { isTierId, type TierId } from '@/lib/tiers'

export type ActionResult = { ok: boolean; error?: string }

/** Place or move a hero in the caller's ladder. A null tier drops it into the tray. */
export async function setTier(
  heroSlug: string,
  tier: TierId | null,
  position: number,
): Promise<ActionResult> {
  const author = await requireSession()

  if (!getHero(heroSlug)) return { ok: false, error: 'Unknown hero.' }
  if (tier !== null && !isTierId(tier)) return { ok: false, error: 'Unknown tier.' }
  const pos = Number.isFinite(position) ? position : 0

  // No database yet? Let the UI keep its optimistic state for this session rather than
  // snapping back. Placements just won't survive a reload until the Neon env is set.
  if (!isDatabaseConfigured()) return { ok: true }

  try {
    await dbSetTier(author, heroSlug, tier, pos)
    revalidatePath('/tiers')
    return { ok: true }
  } catch (error) {
    console.error('setTier failed', error)
    return { ok: false, error: "Couldn't save that. Is the database connected?" }
  }
}

const asStringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []

/** Save the optional build pinned to a hero. */
export async function saveBuild(heroSlug: string, raw: unknown): Promise<ActionResult> {
  const author = await requireSession()

  if (!getHero(heroSlug)) return { ok: false, error: 'Unknown hero.' }

  const input = (raw ?? {}) as Record<string, unknown>
  const build: Build = {
    keyShards: asStringList(input.keyShards).slice(0, 20),
    relics: asStringList(input.relics).slice(0, 30),
    artifacts: asStringList(input.artifacts).slice(0, 30),
    notes: typeof input.notes === 'string' ? input.notes.slice(0, 2000) : '',
  }

  if (!isDatabaseConfigured()) return { ok: true }

  try {
    await dbSaveBuild(author, heroSlug, build)
    revalidatePath('/tiers')
    return { ok: true }
  } catch (error) {
    console.error('saveBuild failed', error)
    return { ok: false, error: "Couldn't save that. Is the database connected?" }
  }
}
