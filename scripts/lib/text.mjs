// The game's text conventions: markup, template placeholders, and the small formatting
// helpers that go with them.
//
// Split out of catalogue.mjs when abilities became a third catalogue. Artifacts, relics and
// abilities describe completely different things, but they all quote the same localization
// file and all resolve templates the same way, so this is the part worth sharing.

export const stripTags = (value) => value.replace(/<[^>]*>/g, '').trim()

const FONT_TAG = /<font\s+color=['"]?(#[0-9a-fA-F]{3,8})['"]?>([\s\S]*?)<\/font>/gi

/**
 * The shared images tooltip text embeds with `<img src='file://{images}/...'>`, mapped to a
 * path stem under public/ and the label that becomes the picture's alt text.
 *
 * Five, across every artifact and relic string in the game -- so naming them beats resolving
 * paths generically. Keys must stay in step with the `textures` maps in lib/game-files.mjs,
 * which is what actually pulls these out of the archive.
 */
const TOOLTIP_ICONS = {
  'interface/aghanims_reward_staff.png': ['tooltip/aghs-shard', 'Scepter Shard'],
  'interface/aghanims_reward_staff_elite.png': ['tooltip/aghs-shard-elite', 'Elite Scepter Shard'],
  'interface/aghanims_reward_staff_legendary.png': [
    'tooltip/aghs-shard-legendary',
    'Legendary Scepter Shard',
  ],
  'interface/crate.png': ['tooltip/crate', 'Chest'],
  'bonus_level/token_level5.png': ['tooltip/neutral-token', 'Neutral Item'],
}

// Both `<img ... />` and `<img ... >` occur in the game's strings; `[^>]*` covers either.
const IMG_TAG = /<img\b[^>]*\bsrc=['"]file:\/\/\{images\}\/([^'"]+)['"][^>]*>/gi

// `<Panel class='ArtifactIcon eden_anvil'/>` -- a description citing another catalogue entry.
// `RelictIcon` is the game's spelling, not a typo here.
const PANEL_ENTRY_ICON = /<Panel\b[^>]*\bclass=['"](ArtifactIcon|RelictIcon)\s+([a-z0-9_]+)['"][^>]*>/gi

const ICON_MARKER = /\[\[icon:[^\]]+\]\][\s\S]*?\[\[\/\]\]/g

/**
 * Turns the two picture markups whose art the site actually has into `[[icon:path]]` markers.
 *
 * The game draws these inline and builds sentences around them -- Eden Anvil's "converted into
 * <shard>" reads as "converted into ." once the tag is stripped -- so dropping them loses
 * meaning, not just decoration. Everything else in a `<Panel class>` is a Panorama CSS sprite
 * with no src to follow; those still fall to `stripTags`, and are only ever decorative
 * reinforcement of text that reads correctly without them.
 *
 * Abilities pass no `iconLabels`, so a `<Panel class='ArtifactIcon …'>` in an ability string
 * reports as a dropped placeholder rather than resolving. None occur today.
 */
function convertIcons(value, refs, problems, where) {
  const withImages = value.replace(IMG_TAG, (_, src) => {
    const icon = TOOLTIP_ICONS[src.toLowerCase()]
    if (!icon) {
      problems.push(`${where}: unknown tooltip image ${src}`)
      return ''
    }
    return `[[icon:${icon[0]}]]${icon[1]}[[/]]`
  })

  return withImages.replace(PANEL_ENTRY_ICON, (_, family, texture) => {
    const entry = refs.iconLabels?.get(`${family}:${texture}`)
    if (!entry) {
      problems.push(`${where}: dropped icon placeholder <Panel class='${family} ${texture}'>`)
      return ''
    }
    const [stem, label] = entry
    return `[[icon:${stem}]]${label}[[/]]`
  })
}

/**
 * Like `stripTags`, but keeps the markup the site actually wants: the inline pictures
 * `convertIcons` handles, and a `<font color>` run such as `HD_Poison`'s `<font
 * color='#98f698'><Panel .../>Poison</font>`. Each run becomes a `[[color:#hex]]text[[/]]`
 * marker for `RichText` to render as a colored span -- anything else inside it is dropped, same
 * as before. Markers use square brackets specifically so they survive the plain-tag strip that
 * follows, and don't collide with the `%key%`/`{key}` placeholder syntax `resolveTemplate`
 * still has to scan for.
 *
 * Order is load-bearing: icons convert first, before any `stripTags` -- including the one
 * inside the `<font>` handler, which would otherwise eat an icon sitting in a colored run.
 *
 * An icon found inside such a run is lifted out in front of it. That began as a workaround for
 * `RichText` matching markers flat, which it no longer does -- it nests now, because abilities
 * produce genuinely nested runs. The lift stays because it's the rendering we have: the picture
 * leads the coloured phrase rather than sitting inside it.
 */
export function convertMarkup(value, refs = {}, problems = [], where = '') {
  const withIcons = convertIcons(value, refs, problems, where)

  const withColors = withIcons.replace(FONT_TAG, (_, color, inner) => {
    const icons = (inner.match(ICON_MARKER) ?? []).join('')
    const text = stripTags(inner.replace(ICON_MARKER, ''))
    return text ? `${icons}[[color:${color}]]${text}[[/]]` : icons
  })

  return stripTags(withColors)
}

export const titleCase = (key) =>
  key
    .replace(/^bonus_/, '')
    .split('_')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ')

export const num = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

/**
 * Resolves a description template against an entry's values.
 *
 *   %chance%%%       -> "[[value]]20[[/]]%"   -- the named value highlighted, %% collapsing
 *                                                 to a literal sign
 *   {main_ability}   -> the artifact's own effect title, as an underlined [[ref]]
 *   {HD_GoldIcon}    -> another localization token, resolved recursively
 *
 * Order matters: `%chance%%%` is `%chance%` followed by `%%`, so named values must be
 * substituted *before* `%%` collapses -- otherwise the value's own closing sign gets eaten
 * and the placeholder no longer matches.
 *
 * Unresolved placeholders are reported rather than silently shipped. A description reading
 * "%lv40_bonus%% for the current Stage" on the live site is the failure worth catching loudly.
 */
export function resolveTemplate(template, values, refs, problems, where, depth = 0) {
  if (!template) return undefined

  // Markup comes off first, except the pictures and <font color> runs convertMarkup keeps as
  // markers. Some tokens only ever appear inside markup -- {images} is a path variable in
  // <img src='file://{images}/...'/> -- so handling markup first means they never reach the
  // resolver to be reported as missing; convertIcons consumes that one a step earlier.
  let text = convertMarkup(template, refs, problems, where)

  // The trailing (%%)? swallows the literal percent sign some templates trail a value with,
  // so "30%" highlights as one unit instead of the number alone.
  text = text.replace(/%([a-z0-9_]+)%(%%)?/gi, (whole, key, pct) => {
    const value = values[key]
    if (value === undefined) {
      problems.push(`${where}: unresolved %${key}%`)
      return whole
    }
    return `[[value]]${value}${pct ? '%' : ''}[[/]]`
  })

  text = text.replace(/\{([a-z0-9_:]+)\}/gi, (whole, key) => {
    const direct = refs[key]
    if (direct !== undefined) return direct

    // Tokens like {HD_GoldIcon} point at other localization entries, which may themselves
    // carry markup or further tokens. Bounded so a self-referential pair can't spin.
    const looked = refs.localization?.get(key)
    if (looked !== undefined) {
      if (depth >= 4) return convertMarkup(looked, refs, problems, where)
      return resolveTemplate(looked, values, refs, problems, where, depth + 1) ?? ''
    }

    // What's left are panorama-side icon placeholders -- the game substitutes a picture, not
    // text, so there's nothing to put here. Dropping reads better than printing the raw token
    // ("Attacks fire {additional_10} into the sky"), but it's still recorded so the count is
    // visible rather than silently swallowed.
    problems.push(`${where}: dropped icon placeholder {${key}}`)
    return ''
  })

  return text.replace(/%%/g, '%').replace(/\s{2,}/g, ' ').trim()
}
