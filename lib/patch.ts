// The latest game patch's hero changes, adapted from arakunido's unofficial changelog
// (https://arakunido.com/dota2/aghslab3/changelog). Update this file when a new patch lands:
// bump PATCH_VERSION / PATCH_DATE and replace PATCH_HEROES. A hero listed here shows an "updated"
// badge on the board until that person re-ranks it (which stamps a newer updated_at than the patch).
//
// Not 'server-only': the badge and its hover popover render in the browser.

import { ABILITIES } from './abilities.generated'

export type ChangeKind = 'ADDED' | 'CHANGED' | 'REMOVED' | 'REWORKED'
export type Change = { kind: ChangeKind; text: string }
export type AbilitySection = { ability: string; changes: Change[] }
export type HeroPatch = { sections: AbilitySection[] }

export const PATCH_VERSION = '1.03E'
/** Patch release date (31.07.2026). Rankings older than this are "stale" for the changed heroes. */
export const PATCH_DATE = '2026-07-31'

const C = (kind: ChangeKind, text: string): Change => ({ kind, text })

export const PATCH_HEROES: Record<string, HeroPatch> = {
  crystal_maiden: {
    sections: [
      {
        ability: 'Blueheart Floe',
        changes: [
          C('ADDED', 'Every 2 seconds, restore 2%/3%/4%/5% of missing Mana.'),
          C('CHANGED', 'Mana Regen Amplification: 25%/50%/75%/100% → 30% (all levels).'),
        ],
      },
      {
        ability: 'Arcane Aura',
        changes: [
          C('CHANGED', 'Mana Regen: 10/14/18/22 → 6/12/18/24, plus Bonus Mana Regen added: 12/16/20/24%.'),
          C('CHANGED', 'Close-range Mana Regen: 2% → 200%.'),
          C('CHANGED', 'Shard [Arcane Barrier] barrier size: 150% → 200% of remaining Mana.'),
          C('CHANGED', 'Shard [Arcane Frost] (renamed from Arcane Insight): every 2 Mana restores, triggers a Crystal Nova on the nearest enemy — faster during Freezing Field.'),
          C('CHANGED', 'Shard [Arcane Overload] reworked: 600% Mana restore → +300% Mana Regen and +100% shield conversion. Lockout: 15 → 20s.'),
        ],
      },
      {
        ability: 'Crystal Nova',
        changes: [
          C('CHANGED', 'Damage: 90/130/170/210 → 180/250/320/390. Mana-cost-to-bonus-damage: 130/150/170/190% → 220/250/280/310%.'),
          C('CHANGED', 'No right-click cast (merged into base cast). Consumes max Mana instead of current; flat cost removed; cast point removed; cooldown standardized to 6s.'),
          C('CHANGED', 'No longer slows attack speed. MS slow: 20/30/40/50% → 30/40/50/60%. Slow duration: 5 → 3s. Vision: 6 → 3s.'),
          C('CHANGED', 'Shard [Biting Cold] magic armor reduction per stack: 15 → 20. Duration removed.'),
          C('CHANGED', 'Shard [Lingering Chill] adds slow duration (40% of Frostbite). Second explosion: 130% → 100%. Delay: 2 → 1.5s.'),
        ],
      },
      {
        ability: 'Frostbite',
        changes: [
          C('CHANGED', 'DPS: 110/140/170/200 → 100/150/200/250. Cooldown/charge time standardized to 6s. Consumes 10% max Mana → 160/185/210/235% bonus DPS.'),
          C('ADDED', 'Damage vs Leaders/Bosses +150%; duration vs normal enemies +150%.'),
          C('CHANGED', 'Shard [Glacial Drill] reworked: gains Frostbite charge stacks instead of regen; recasting on a Frostbitten target deals +70% of total damage dealt.'),
          C('CHANGED', 'Shard [Rapid Cooling] damage conversion: 100% → 50%. Mana-restore requirement: 100% → 5%. Cooldown reduction: 0.4 → 1.5s.'),
          C('REMOVED', 'Shard [Chain Frost] removed.'),
          C('REMOVED', 'Shard [Frozen Nova] removed.'),
          C('ADDED', 'Shard [Frozen Expanse] added: boosts Frostbite damage and makes its active an area cast.'),
        ],
      },
      {
        ability: 'Freezing Field',
        changes: [
          C('CHANGED', 'Explosion damage: 150/180/210 → 50/80/110. Int-scaled damage removed. Consumes 25% max Mana → 30/35/40% bonus explosion damage.'),
          C('CHANGED', 'Field radius no longer scales with cast-range/AoE. Explosion radius: 320 → 250; more concentrated.'),
          C('CHANGED', 'Shard [Absolute Zero] retrigger interval: 50% → 30%, from actual cooldown.'),
          C('CHANGED', 'Shard [Avalanche of Jotunheim] (renamed, moved from Crystal Nova): hurls an avalanche at the nearest enemy for a multiple of the explosion damage.'),
          C('CHANGED', 'Shard [Snow Blast] (renamed from Blizzard Storm): can trigger Crystal Nova shard effects and its Mana-to-damage conversion for free. Interval: 0.4 → 0.6s.'),
        ],
      },
    ],
  },

  slardar: {
    sections: [
      { ability: 'Corrosive Haze', changes: [C('CHANGED', 'Armor reduction: 10/15/20 → 20/26/32.')] },
      {
        ability: 'Bash of the Deep',
        changes: [
          C('CHANGED', 'Base bonus damage: 100/200/300/400 → 100/180/260/340.'),
          C('CHANGED', 'Bonus attack damage: 50/65/80/105% → 60/100/140/180%.'),
        ],
      },
      {
        ability: 'Slithereen Crush',
        changes: [
          C('CHANGED', 'Damage is now Strength damage.'),
          C('CHANGED', 'Damage: 75/150/225/300 → 110/170/230/290.'),
          C('CHANGED', 'Bonus damage added: 250/360/470/580%.'),
        ],
      },
    ],
  },

  undying: {
    sections: [
      {
        ability: 'Soul Rip',
        changes: [
          C('CHANGED', 'Now has base damage.'),
          C('CHANGED', 'Charge restore time: 12/10/8/6 → 13/12.5/12/11.5.'),
          C('CHANGED', 'Cooldown: 12/10/8/6 → 13/12.5/12/11.5.'),
          C('CHANGED', 'Damage/heal per unit: 2.5/3/3.5/4 → 40/65/85/110, plus 4/5.5/7/8.5% added.'),
          C('CHANGED', 'Max units: 6/7/8/9 → 5/6/7/8.'),
          C('CHANGED', 'Tombstone heal: 5/10/15/15 → 10/15/20/25.'),
        ],
      },
      {
        ability: 'Tombstone',
        changes: [
          C('CHANGED', 'Damage pct: 250 → 400.'),
          C('CHANGED', 'Effect radius: 200 → 250.'),
          C('CHANGED', 'Max count: 12 → 8.'),
          C('CHANGED', 'Zombie attack damage: 30/40/50/60 → 20/30/40/50, plus bonus 15/20/25/30% → 20/25/30/35%.'),
        ],
      },
    ],
  },

  batrider: {
    sections: [
      {
        ability: 'Firefly',
        changes: [C('CHANGED', 'Shard [Rise as the Phoenix Knight] renamed from [Become the Phoenix Rider].')],
      },
    ],
  },

  marci: {
    sections: [
      {
        ability: 'Dispose',
        changes: [
          C('CHANGED', 'All-Attributes damage: 70/80/90/100% → 115/170/225/280%.'),
          C('CHANGED', 'Impact damage: 60/110/160/210 → 120/190/260/330.'),
          C('CHANGED', 'Grab Radius upgrade: 40 → 60, now capped at 2 uses. Its damage upgrade: 50/6% → 80/60%.'),
        ],
      },
      {
        ability: 'Rebound',
        changes: [
          C('CHANGED', 'Bonus damage: 50/70/90/110% → 145/210/275/340%.'),
          C('CHANGED', 'Impact damage: 50/100/150/200 → 150/230/310/390.'),
          C('CHANGED', 'Now All-Attributes-scaled (Attack Damage upgrade 15% → 75%).'),
          C('CHANGED', 'Radius upgrade capped at 2 uses; value 80 → 60.'),
          C('REMOVED', 'Acceleration/Stun Duration upgrade removed.'),
        ],
      },
      { ability: 'Bodyguard', changes: [C('REMOVED', 'Cast Range upgrade removed (was +200).')] },
      {
        ability: 'Unleash',
        changes: [
          C('CHANGED', 'All-Attributes damage: 25/35/50% → 60/85/110%.'),
          C('CHANGED', 'Pulse damage: 30/70/100 → 70/100/130.'),
          C('CHANGED', 'Pulse Radius + Strikes per Fury upgrades merged, capped at 3 uses. Pulse Radius per use: 200 → 80.'),
        ],
      },
    ],
  },

  tidehunter: {
    sections: [
      {
        ability: 'Anchor Smash',
        changes: [
          C('CHANGED', 'Bonus attack damage: 40/80/120/160% → 50/100/150/200%.'),
          C('CHANGED', 'Attack damage: 100/115/130/145% → 100/120/140/160%.'),
        ],
      },
      {
        ability: 'Gush',
        changes: [
          C('CHANGED', 'Mana cost: 100 → 70.'),
          C('CHANGED', 'Damage: 110/170/230/300 → 90/140/190/240.'),
          C('CHANGED', 'Armor reduction: 4/6/8/10 → 6/8/10/12.'),
          C('CHANGED', 'Bonus damage: 300/350/400/450% → 210/300/390/480%.'),
        ],
      },
      {
        ability: 'Ravage',
        changes: [
          C('CHANGED', 'Bonus damage: 36/48/60% → 30/37/44%.'),
          C('CHANGED', 'Damage: 300/600/900 → 310/440/570.'),
        ],
      },
    ],
  },

  ursa: {
    sections: [
      {
        ability: 'Earthshock',
        changes: [
          C('CHANGED', 'Damage is now Agility-scaled; cooldown decreased.'),
          C('CHANGED', 'Charge restore time / cooldown: 15/13/11/9 → 10.5/10/9.5/9.'),
          C('CHANGED', 'Bonus damage: 150/190/230/270% → 300/420/540/660%, plus 120/190/260/330 added.'),
          C('CHANGED', 'Radius: 385 → 450.'),
        ],
      },
      {
        ability: 'Fury Swipes',
        changes: [
          C('CHANGED', 'Damage-per-stack upgrades merged: 10 flat + 0.6% bonus damage per stack (was 0.8% alone).'),
        ],
      },
      {
        ability: 'Overpower',
        changes: [
          C('CHANGED', 'Attacks: 3/4/5/6 → 6/7/8/9.'),
          C('CHANGED', 'Cast point decreased.'),
          C('CHANGED', 'Attack Count + Bonus Attack Speed upgrades merged (2 attacks + 100% AS), capped at 4 uses.'),
        ],
      },
    ],
  },
}

export function patchForHero(slug: string): HeroPatch | undefined {
  return PATCH_HEROES[slug]
}

/**
 * The Valve icon name for a changed ability, looked up from the ability catalogue by hero + name
 * so the popover can show the same art as the rest of the app. null when the ability has no icon
 * (e.g. a mod innate). Cached since the popover asks repeatedly.
 */
const iconCache = new Map<string, string | null>()
export function abilityIconName(heroSlug: string, abilityName: string): string | null {
  const key = `${heroSlug}|${abilityName}`
  const cached = iconCache.get(key)
  if (cached !== undefined) return cached
  const ability = ABILITIES.find((a) => a.hero === heroSlug && a.name === abilityName)
  const icon = ability?.iconName ?? null
  iconCache.set(key, icon)
  return icon
}

/**
 * True when a ranking hasn't been touched under the current patch (or doesn't exist yet), so the
 * changed hero still needs a fresh look. Each ranking stores the patch version it was last set
 * under; re-ranking stamps the current version and clears the badge. Version-based rather than
 * date-based so it can't be fooled by clock skew between the patch date and "now".
 */
export function isStaleForPatch(rankedUnderPatch: string | null | undefined): boolean {
  return rankedUnderPatch !== PATCH_VERSION
}
