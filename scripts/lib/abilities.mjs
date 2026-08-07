// Hero abilities, and the two upgrade systems that hang off them.
//
// Kept apart from catalogue.mjs because the shapes have nothing in common. An artifact stat is
// a growth formula; an ability's number is written out once per level ("150 190 230 270"). The
// parts that *are* shared -- markup, template resolution -- live in text.mjs.
//
// Three files are joined here:
//
//   hero_abilities.kv        the abilities themselves, and the talents they reference
//   hero_epic_upgrade.kv     epic upgrades, each attached to an ability by name
//   hero_ability_upgrade.kv  shard upgrades, keyed on an ability and a single value
//
// Only the first is localized in full. Epics are mostly localized; shards are not localized at
// all, so their text is derived -- see readShards.

import { readVpk } from './vpk.mjs'
import { parseKv, parseLocalization } from './kv.mjs'
import { findGameVpk, SOURCE_FILES } from './game-files.mjs'
import { num, resolveTemplate, stripTags, titleCase } from './text.mjs'

/**
 * The one hero whose directory the site spells differently. Everything else in the VPK uses
 * Valve's internal name, which is exactly what lib/heroes.ts keys on, so the join is direct.
 */
const HERO_SLUG_ALIASES = { sandking: 'sand_king' }

/**
 * Values the game shows in the tooltip's footer rather than its body. Split out of the general
 * list so the page can render them as a strip, the way the tooltip does.
 *
 * AbilityCastPoint is deliberately absent -- it's animation timing, present on 101 abilities,
 * and means nothing to a reader.
 */
const CAST_KEYS = {
  AbilityCooldown: 'cooldown',
  AbilityManaCost: 'manaCost',
  AbilityCastRange: 'castRange',
  AbilityDuration: 'duration',
  AbilityChannelTime: 'channelTime',
  AbilityCharges: 'charges',
  AbilityChargeRestoreTime: 'chargeRestore',
}

/** Never worth a row of their own: animation timing, and a duplicate the engine reads. */
const SKIP_VALUE_KEYS = new Set(['AbilityCastPoint', 'AbilityCooldown_auto'])

/**
 * Engine-resolved names. A handful of descriptions reference the ability's cast fields by the
 * engine's own spelling rather than the KV's, and the engine substitutes them itself. Mapping
 * them back is the difference between nine broken descriptions and none.
 */
const ENGINE_ALIASES = {
  abilityduration: 'AbilityDuration',
  abilitychanneltime: 'AbilityChannelTime',
  abilitycastpoint: 'AbilityCastPoint',
  abilitycastrange: 'AbilityCastRange',
  abilitycooldown: 'AbilityCooldown',
  abilitymanacost: 'AbilityManaCost',
  abilitydamage: 'AbilityDamage',
  abilitycharges: 'AbilityCharges',
}

/**
 * Placeholders the game names but never defines.
 *
 * Each of these is a defect in the game's own strings, verified one at a time against the KV:
 * the named value exists under no spelling, so there is nothing to substitute. They're dropped
 * rather than shipped raw, and listed individually on purpose -- a *new* unresolved token still
 * fails the build, which is the whole point of the check.
 *
 * Deliberately not "corrected" by guessing at the intended key. `magic_rmagic_armorsist` looks
 * like `magic_armor` with a word spliced through it, and `projectiles_per_stack` is almost
 * certainly the `projectiles_per_stackan` sitting next to it, but substituting a number on that
 * hunch would be inventing data and calling it the game's.
 */
const KNOWN_BAD_TOKENS = new Set([
  'lich_epic_7 epic: unresolved %magic_resist%',
  'winter_wyvern_epic_12 epic: unresolved %magic_rmagic_armorsist%',
  'sand_king_epic_6 epic: unresolved %epic6_stun_duration%',
  'primal_beast_epic_10 epic: unresolved %projectiles_per_stack%',
  'centaur_epic_16 epic: unresolved %bonus_move_speed%',
  'hd_ursa_earthshock description: unresolved %abilityduration%',
])

/**
 * Labels for shard values, which have no localization of their own.
 *
 * A shard names the value it moves, and most of the time the parent ability's own tooltip
 * already has a string for that key. These are the ones it doesn't -- overwhelmingly the two
 * generic keys every cooldown/mana shard uses.
 */
const SHARD_LABELS = {
  hd_cooldown: 'Cooldown',
  hd_mana_cost: 'Mana Cost',
  AbilityCooldown: 'Cooldown',
  AbilityManaCost: 'Mana Cost',
  AbilityCastRange: 'Cast Range',
  AbilityDuration: 'Duration',
  AbilityDamage: 'Damage',
  AbilityCharges: 'Charges',
  AbilityChargeRestoreTime: 'Charge Restore Time',
  damage: 'Damage',
  radius: 'Radius',
  duration: 'Duration',
  range: 'Range',
  chance: 'Chance',
}

/**
 * Shard keys where the shard makes the number smaller.
 *
 * The KV stores a bare magnitude with no sign, so this is inferred, not read: a shard that
 * touches a cooldown reduces it. Worth re-checking against an in-game tooltip after a game
 * update, because nothing in the data would tell us if it changed.
 */
const REDUCED_BY_SHARD = new Set([
  'hd_cooldown',
  'hd_mana_cost',
  'AbilityCooldown',
  'AbilityManaCost',
  'AbilityChargeRestoreTime',
])

/**
 * Shard keys whose number is a percentage rather than a flat amount.
 *
 * These two are the game's generic cooldown/mana shards, applied across every ability, and
 * they carry no localization at all -- not under the ability, not standalone -- so nothing in
 * the files says what the unit is. Two things settle it: the values are far too uniform to be
 * absolute (`hd_cooldown` is only ever 4, 7, 10, 11 or 12 across 233 shards, on abilities whose
 * cooldowns range from 3 seconds to 120), and the in-game tooltip reads "-7%".
 *
 * Everything else is a key the parent ability also uses, so its unit comes from that ability's
 * own tooltip label instead -- read, not assumed.
 */
const PERCENT_SHARD_KEYS = new Set(['hd_cooldown', 'hd_mana_cost'])

/** 'hd_ursa_earthshock' -> 'ursa-earthshock'. */
const toSlug = (gameId) => gameId.replace(/^hd_/, '').replace(/_/g, '-')

/**
 * The URL segment under the hero: 'hd_ursa_earthshock' -> 'earthshock'.
 *
 * Stripped using the VPK's own directory name rather than the site's hero slug, because the
 * two differ where HERO_SLUG_ALIASES applies -- Sand King's six abilities are `hd_sandking_*`
 * while the site calls the hero `sand_king`, so matching on the slug would leave the prefix on.
 *
 * Falls back to the full slug if the id doesn't carry its hero, which keeps the segment unique
 * rather than guessing. No ability currently needs that.
 */
function toPath(gameId, dir) {
  const prefix = `hd_${dir}_`
  return gameId.startsWith(prefix)
    ? gameId.slice(prefix.length).replace(/_/g, '-')
    : toSlug(gameId)
}

/**
 * The texture name, reduced to the leaf the CDN keys on.
 *
 * Forty-odd abilities name their art by panorama path rather than by texture --
 * "abaddon/mistral_fiend_icons/abaddon_death_coil" for a cosmetic variant, "keen/..." for the
 * workshop's own icons. Valve's CDN serves the leaf, so that's what's kept; the workshop's own
 * icons aren't on the CDN under any name and fall through to CatalogueIcon's diamond, which is
 * the same outcome they'd have had as a path.
 */
function iconNameOf(entry) {
  const raw = entry.AbilityTextureName
  if (!raw) return null
  const leaf = raw.split('/').pop()?.trim()
  return leaf || null
}

/**
 * resolveTemplate, with the game's own broken placeholders taken out of the text.
 *
 * An unresolved token normally stays in the string so the failure is loud. For the entries in
 * KNOWN_BAD_TOKENS that loudness has already been spent -- each one has been looked at -- and
 * what's left is a sentence that reads better without "%magic_resist%" sitting in the middle
 * of it. The problem is downgraded to 'dropped' so it still shows in the run's counts.
 */
function resolve(template, values, refs, problems, where) {
  const before = problems.length
  let text = resolveTemplate(template, values, refs, problems, where)

  for (let i = before; i < problems.length; i += 1) {
    if (!KNOWN_BAD_TOKENS.has(problems[i])) continue
    const token = problems[i].match(/%([a-z0-9_]+)%/i)?.[0]
    if (token && text) text = text.replaceAll(token, '').replace(/\s{2,}/g, ' ').trim()
    problems[i] = problems[i].replace('unresolved', 'dropped undefined value')
  }

  return text
}

/** The scalar a value block carries, whether it's a bare string or a block with a `value`. */
function scalarOf(raw) {
  if (typeof raw === 'string') return raw
  if (raw && typeof raw === 'object' && typeof raw.value === 'string') return raw.value
  return undefined
}

/**
 * "150 190 230 270" -> [150, 190, 230, 270].
 *
 * A single number means the value is flat at every level -- the game only writes the array out
 * when it actually grows. Anything non-numeric (a value defined by a template, say) is skipped
 * rather than coerced, so a NaN can never reach the page.
 */
function levelValues(scalar, maxLevel) {
  if (typeof scalar !== 'string') return undefined
  const parts = scalar.trim().split(/\s+/).map(Number)
  if (!parts.length || parts.some((part) => !Number.isFinite(part))) return undefined
  return parts.length === 1 ? parts : parts.slice(0, maxLevel)
}

/**
 * The label for one value line.
 *
 * Ability tooltips spell their labels out literally -- "RADIUS:", "%MOVEMENT SLOW:" -- where an
 * artifact's are `$token` references. So unlike readStats in catalogue.mjs, which passes the
 * localized string through untouched, this drops the trailing colon and re-cases the shout,
 * because "RADIUS:" set beside an artifact's "Spell Amp" reads like a different site.
 */
function valueLabel(raw, key) {
  if (!raw) return titleCase(key)
  const text = stripTags(raw).replace(/^%/, '').replace(/:\s*$/, '').trim()
  if (!text) return titleCase(key)
  // Shout-case is the game's tooltip convention, not a stylistic choice worth keeping.
  if (text === text.toUpperCase()) {
    return text
      .toLowerCase()
      .split(/\s+/)
      .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
      .join(' ')
  }
  return text
}

/**
 * The value block, split into the tooltip's body lines and its footer strip.
 *
 * Talents live inside the value they modify -- `shock_radius` carries
 * `special_bonus_unique_ursa_hd_5: "+400"` -- so they're picked up here and matched to their
 * localized text later, once every ability's values are known.
 */
function readValues(gameId, entry, english, maxLevel) {
  const values = []
  const cast = {}

  for (const [key, raw] of Object.entries(entry.AbilityValues ?? {})) {
    if (SKIP_VALUE_KEYS.has(key)) continue

    const numbers = levelValues(scalarOf(raw), maxLevel)
    if (!numbers) continue

    if (CAST_KEYS[key]) {
      cast[CAST_KEYS[key]] = numbers
      continue
    }

    const localized = english.get(`DOTA_Tooltip_ability_${gameId}_${key}`)
    const block = raw && typeof raw === 'object' ? raw : {}

    const talents = Object.entries(block)
      .filter(([sub]) => sub.startsWith('special_bonus'))
      .map(([id, operand]) => {
        const text = String(operand).trim()
        const op = text.startsWith('=') ? '=' : '+'
        const amount = num(text.replace(/^[+=]/, ''))
        return amount === undefined ? null : { id, op, amount }
      })
      .filter(Boolean)

    values.push({
      key,
      name: valueLabel(localized, key),
      values: numbers,
      ...(localized?.trimStart().startsWith('%') ? { unit: '%' } : {}),
      ...(block.affected_by_aoe_increase === '1' ? { scalesWithAoe: true } : {}),
      ...(block._attack === '1' ? { isAttackDamage: true } : {}),
      ...(talents.length ? { talents } : {}),
    })
  }

  return { values, cast }
}

/**
 * Substitution map for an ability's own description.
 *
 * Cast fields are included under both their KV spelling and the engine's, so a template can
 * reach them either way -- see ENGINE_ALIASES.
 */
function substitutions(entry) {
  const flat = {}

  for (const [key, raw] of Object.entries(entry.AbilityValues ?? {})) {
    const scalar = scalarOf(raw)
    if (scalar === undefined) continue
    // A per-level array reads as a span in prose: "deals 150/190/230/270 damage".
    const parts = scalar.trim().split(/\s+/)
    flat[key] = parts.length > 1 ? parts.join('/') : scalar
  }

  for (const [alias, key] of Object.entries(ENGINE_ALIASES)) {
    if (flat[alias] !== undefined) continue
    if (flat[key] !== undefined) flat[alias] = flat[key]
    else if (typeof entry[key] === 'string') flat[alias] = entry[key]
  }

  return flat
}

/**
 * Talent text, resolved against the ability that references the talent.
 *
 * A talent row in the KV carries no numbers at all -- the operand lives on the ability, in the
 * value the talent modifies. So "+{s:bonus_shock_radius} Earthshock Radius" is resolved with
 * `s:bonus_shock_radius` bound to the +400 found on `shock_radius`.
 */
function readTalents(ability, talentKv, english, problems) {
  const talents = []
  const seen = new Set()

  for (const value of ability.values) {
    for (const talent of value.talents ?? []) {
      if (seen.has(talent.id)) continue
      seen.add(talent.id)

      const template = english.get(`DOTA_Tooltip_ability_${talent.id}`)
      if (!template || !talentKv[talent.id]) continue

      // '+' talents add their operand; '=' talents set a multiplier, and the localized string
      // supplies its own wording, so the bare number is what belongs there.
      const signed = talent.op === '+' ? `+${talent.amount}` : String(talent.amount)
      const refs = { localization: english, [`s:bonus_${value.key}`]: signed }

      const text = resolveTemplate(template, {}, refs, problems, `${ability.gameId} ${talent.id}`)
      if (!text) continue

      talents.push({
        id: talent.id,
        // The game writes "+{s:...}" on some talents and leaves the sign to the value on
        // others, so both spellings occur and one of them doubles up.
        text: text.replace(/\+\s*\+/g, '+'),
      })
    }
  }

  return talents
}

/** Epics, grouped by the ability they attach to. */
function readEpics(epicKv, abilityNames, english, problems) {
  const byAbility = {}
  const orphans = {}

  for (const [gameId, entry] of Object.entries(epicKv)) {
    const name = english.get(`DOTA_Tooltip_ability_${gameId}`)
    if (!name) continue

    const values = substitutions(entry)
    const refs = { localization: english }

    // {attachAbility} and friends name the abilities this epic changes. Wrapped as a [[ref]]
    // so they render underlined, matching how the game links an ability to itself.
    const attached = []
    for (const field of ['attachAbility', 'attachAbility2', 'attachAbility3', 'attachAbility4']) {
      const target = entry[field]
      if (!target) continue
      const targetName = abilityNames.get(target)
      if (targetName) refs[field] = `[[ref]]${targetName}[[/]]`
      attached.push(target)
    }

    const description = english.get(`DOTA_Tooltip_ability_${gameId}_Description`)
    const simple = english.get(`DOTA_Tooltip_ability_${gameId}_Description_Simple`)

    const epic = {
      gameId,
      name: stripTags(name),
      description: resolve(description, values, refs, problems, `${gameId} epic`) ?? '',
      ...(simple
        ? { simple: resolve(simple, values, refs, problems, `${gameId} epic simple`) }
        : {}),
      weight: num(entry.weight) ?? 0,
      iconName: iconNameOf(entry),
      // The abilities beyond the first that this epic also touches.
      alsoAffects: attached.slice(1).filter((id) => abilityNames.has(id)).map(toSlug),
    }

    const parent = attached[0]
    if (parent && abilityNames.has(parent)) {
      ;(byAbility[parent] ??= []).push(epic)
    } else {
      // A handful of epics name no ability. They still belong to a hero, so they're kept and
      // shown against the hero rather than dropped for having nowhere tidy to sit.
      const hero = (entry.hero_name ?? '').replace(/^npc_dota_hero_/, '')
      if (hero) (orphans[hero] ??= []).push(epic)
    }
  }

  return { byAbility, orphans }
}

/**
 * Shards, grouped by the ability they upgrade.
 *
 * These have no localization whatsoever, so every word of their text is derived: the label
 * comes from the parent ability's own tooltip string for that value key; the direction and, for
 * the two generic keys, the percent sign are inferred. See SHARD_LABELS, REDUCED_BY_SHARD and
 * PERCENT_SHARD_KEYS.
 */
function readShards(shardKv, abilityNames, english, epicIds) {
  const byAbility = {}

  for (const [gameId, entry] of Object.entries(shardKv)) {
    const target = entry.ability_name
    if (!target || !abilityNames.has(target)) continue

    const effects = []
    for (const [key, raw] of Object.entries(entry.AbilityValues ?? {})) {
      const amount = num(scalarOf(raw))
      if (amount === undefined || amount === 0) continue

      const localized = english.get(`DOTA_Tooltip_ability_${target}_${key}`)
      // A leading % on the parent ability's label is the game's own marker for a percentage,
      // the same signal readValues uses. The generic hd_* keys have no label to read, so they
      // come from PERCENT_SHARD_KEYS instead.
      const isPercent =
        PERCENT_SHARD_KEYS.has(key) || Boolean(localized?.trimStart().startsWith('%'))

      effects.push({
        name: localized ? valueLabel(localized, key) : (SHARD_LABELS[key] ?? titleCase(key)),
        amount,
        direction: REDUCED_BY_SHARD.has(key) ? 'down' : 'up',
        ...(isPercent ? { unit: '%' } : {}),
      })
    }
    if (!effects.length) continue

    ;(byAbility[target] ??= []).push({
      gameId,
      effects,
      ...(num(entry.CountLimit) !== undefined ? { countLimit: num(entry.CountLimit) } : {}),
      // The epics this shard feeds. Only a couple of shards declare one, and some name an
      // epic the game never localized -- which never became an epic here, so it's dropped
      // rather than left as a reference to nothing.
      powers: ['EffectEpic', 'EffectEpic2']
        .map((field) => entry[field])
        .filter((epicId) => epicId && epicIds.has(epicId)),
      weight: num(entry.weight) ?? 0,
    })
  }

  return byAbility
}

export function buildAbilities() {
  const problems = []
  const vpk = readVpk(findGameVpk())

  try {
    const abilityKv = parseKv(vpk.readPath(SOURCE_FILES.abilities).toString('utf8'))
    const epicKv = parseKv(vpk.readPath(SOURCE_FILES.abilityEpics).toString('utf8'))
    const shardKv = parseKv(vpk.readPath(SOURCE_FILES.abilityShards).toString('utf8'))
    const english = parseLocalization(vpk.readPath(SOURCE_FILES.english).toString('utf8'))

    // hero_abilities.kv holds three kinds of row. Only the ones with a hero script behind them
    // and a name in the localization are abilities -- that predicate drops the talent rows and
    // the game's hidden generic placeholders in one go.
    const isAbility = ([gameId, entry]) =>
      /^skills\/HeroAbility\//i.test(entry?.ScriptFile ?? '') &&
      english.has(`DOTA_Tooltip_ability_${gameId}`)

    const rows = Object.entries(abilityKv).filter(isAbility)

    const abilityNames = new Map(
      rows.map(([gameId]) => [gameId, stripTags(english.get(`DOTA_Tooltip_ability_${gameId}`))]),
    )

    const epics = readEpics(epicKv, abilityNames, english, problems)
    const epicIds = new Set(
      Object.values(epics.byAbility)
        .flat()
        .concat(Object.values(epics.orphans).flat())
        .map((epic) => epic.gameId),
    )
    const shards = readShards(shardKv, abilityNames, english, epicIds)

    const abilities = []
    const heroes = new Set()

    for (const [gameId, entry] of rows) {
      const slug = toSlug(gameId)
      const dir = entry.ScriptFile.split('/')[2]
      const hero = HERO_SLUG_ALIASES[dir] ?? dir
      heroes.add(hero)

      const maxLevel = num(entry.MaxLevel) ?? 1
      const { values, cast } = readValues(gameId, entry, english, maxLevel)

      const substitutionValues = substitutions(entry)
      const refs = { localization: english }

      const description = english.get(`DOTA_Tooltip_ability_${gameId}_Description`)
      const note = english.get(`DOTA_Tooltip_ability_${gameId}_Note0`)
      const flavor = english.get(`DOTA_Tooltip_ability_${gameId}_Lore`)

      const ability = {
        slug,
        path: toPath(gameId, dir),
        gameId,
        name: abilityNames.get(gameId),
        hero,
        // Valve's own texture name. Resolved to a CDN url at render time -- unlike artifacts
        // and relics, ability art is Valve's, not the workshop's, so nothing is extracted.
        iconName: iconNameOf(entry),
        maxLevel,
        isUltimate: /ULTIMATE/.test(entry.AbilityType ?? ''),
        requiredLevel: num(entry.RequiredLevel) ?? 0,
        levelsBetweenUpgrades: num(entry.LevelsBetweenUpgrades) ?? 0,
        description:
          resolve(description, substitutionValues, refs, problems, `${gameId} description`) ??
          '',
        ...(note
          ? { note: resolve(note, substitutionValues, refs, problems, `${gameId} note`) }
          : {}),
        ...(flavor ? { flavor: stripTags(flavor) } : {}),
        values,
        cast,
        talents: [],
        epics: epics.byAbility[gameId] ?? [],
        shards: shards[gameId] ?? [],
      }

      ability.talents = readTalents(ability, abilityKv, english, problems)

      // Values name every talent that touches them, including Dota's own stock talents, which
      // Labyrinth doesn't use and doesn't localize. Those never became a talent above, so the
      // reference is pruned rather than left pointing at nothing the page can show.
      const known = new Set(ability.talents.map((talent) => talent.id))
      for (const value of ability.values) {
        if (!value.talents) continue
        value.talents = value.talents.filter((talent) => known.has(talent.id))
        if (!value.talents.length) delete value.talents
      }

      abilities.push(ability)
    }

    // Epics that name no ability still name a hero, so they're attached to that hero's first
    // ability rather than lost. Done after the main pass, once every ability exists.
    for (const [hero, orphaned] of Object.entries(epics.orphans)) {
      const slug = HERO_SLUG_ALIASES[hero] ?? hero
      const host = abilities.find((ability) => ability.hero === slug)
      if (host) host.epics.push(...orphaned)
    }

    return { abilities, heroes: [...heroes].sort(), problems }
  } finally {
    vpk.close()
  }
}
