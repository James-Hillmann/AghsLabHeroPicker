// Hero abilities: the kit each hero brings into a run, plus the epic and shard upgrades that
// change how each one behaves. Data is generated from the game files -- see ARTIFACTS.md -- so
// everything here is behaviour.
//
// Unlike an artifact, an ability doesn't scale by a formula: the game writes its numbers out at
// each of its 1-4 levels, which is why the page shows level tabs rather than a slider.
//
// And unlike an artifact or a relic, an ability isn't a catalogue of its own -- it belongs to a
// hero, and lives under one at /heroes/<hero>/<ability>. Hence two identifiers: `slug` is
// globally unique and keys the comment thread, `path` is the short segment under the hero.

import {
  ABILITIES,
  type AbilityCast,
  type AbilityEpic,
  type AbilityShard,
  type AbilityTalent,
  type AbilityValue,
  type HeroAbility,
} from './abilities.generated'
import { abilityIconUrl, ATTRIBUTE_COLOR, getHero, type Attribute } from './heroes'

export { ABILITIES }
export type { AbilityCast, AbilityEpic, AbilityShard, AbilityTalent, AbilityValue, HeroAbility }

/**
 * The heroes the game has abilities for but the roster doesn't list yet.
 *
 * Title-casing the game's directory name gets most of these right; these are the ones it
 * doesn't. Everything else resolves through lib/heroes.ts, which is the only source of hero
 * names the site has -- no game file carries them.
 */
const OFF_ROSTER_NAMES: Record<string, string> = {
  vengefulspirit: 'Vengeful Spirit',
  abyssal_underlord: 'Underlord',
}

/** Neutral accent for a hero with no roster entry, and therefore no attribute. */
const NEUTRAL_ACCENT = '#8aa4b8'

/** By the globally unique slug -- what a comment thread is keyed on. */
export function getAbility(slug: string): HeroAbility | undefined {
  return ABILITIES.find((ability) => ability.slug === slug)
}

/** By the route: /heroes/ursa/earthshock. `path` is only unique within its hero. */
export function getHeroAbility(hero: string, path: string): HeroAbility | undefined {
  return ABILITIES.find((ability) => ability.hero === hero && ability.path === path)
}

/** Where an ability lives. One definition, so links and revalidation can't disagree. */
export function abilityHref(ability: HeroAbility): string {
  return `/heroes/${ability.hero}/${ability.path}`
}

/** True when the hero has a page to link to. Seven heroes have abilities but no roster entry. */
export function heroInRoster(hero: string): boolean {
  return getHero(hero) !== undefined
}

export function heroName(hero: string): string {
  return (
    getHero(hero)?.name ??
    OFF_ROSTER_NAMES[hero] ??
    hero
      .split('_')
      .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
      .join(' ')
  )
}

/**
 * Abilities grouped by hero, in the generated order -- which is already hero, then skill-bar
 * slot -- so a hero's kit reads the way the in-game picker shows it.
 */
export function abilitiesByHero(abilities: HeroAbility[] = ABILITIES): Record<string, HeroAbility[]> {
  const groups: Record<string, HeroAbility[]> = {}
  for (const ability of abilities) (groups[ability.hero] ??= []).push(ability)
  return groups
}

function heroAttribute(hero: string): Attribute | undefined {
  return getHero(hero)?.attribute
}

/**
 * The accent colour for an ability.
 *
 * Abilities carry no era, rarity or group of their own, so unlike artifacts and relics there's
 * no colour in the data. The hero's attribute is the honest stand-in, and it matches the accent
 * the hero's own page already uses.
 */
export function accentFor(ability: HeroAbility): string {
  const attribute = heroAttribute(ability.hero)
  return attribute ? ATTRIBUTE_COLOR[attribute] : NEUTRAL_ACCENT
}

/** Valve's own ability art, from the CDN. Nothing is extracted for abilities -- see ARTIFACTS.md. */
export function abilityIconFor(ability: HeroAbility): string | null {
  return ability.iconName ? abilityIconUrl(ability.iconName) : null
}

/**
 * The value at one level. Levels are 1-indexed, matching the game.
 *
 * A value with a single entry is flat at every level, so it answers for any level asked.
 */
export function valueAtLevel(value: AbilityValue, level: number): number {
  return value.values[Math.min(level, value.values.length) - 1] ?? value.values[0]
}

/** "150 / 190 / 230 / 270", or null when the value doesn't change with level. */
export function formatValueSpan(value: AbilityValue): string | null {
  if (value.values.length < 2) return null
  return value.values.join(' / ')
}

/**
 * "15 / 13 / 11 / 9", or "95" for a flat one. Used for the cast strip.
 *
 * An all-zero row is dropped rather than printed. The game writes `AbilityCharges: 0` on
 * abilities that only gain charges from a talent, and "Charges 0" in the tooltip footer reads
 * as a fact about the ability rather than the absence of one.
 */
export function formatCast(values: number[] | undefined): string | null {
  if (!values?.length) return null
  if (values.every((value) => value === 0)) return null
  return values.length === 1 ? String(values[0]) : values.join(' / ')
}

/** "Cooldown −7%", the way a shard effect reads. */
export function formatShardEffect(effect: AbilityShard['effects'][number]): string {
  const sign = effect.direction === 'down' ? '−' : '+'
  return `${effect.name} ${sign}${effect.amount}${effect.unit ?? ''}`
}
