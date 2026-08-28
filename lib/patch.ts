// The latest game patch's hero changes, adapted from arakunido's unofficial changelog
// (https://arakunido.com/dota2/aghslab3/changelog). Update this file when a new patch lands:
// bump PATCH_VERSION / PATCH_DATE and replace PATCH_HEROES. A hero listed here shows an "updated"
// badge on the board until that person re-ranks it (which stamps a newer updated_at than the patch).
//
// Not 'server-only': the badge and its hover popover render in the browser.

import { ABILITIES } from './abilities.generated'
import { abilityIconUrl, getHeroes } from './heroes'

export type ChangeKind = 'ADDED' | 'CHANGED' | 'REMOVED' | 'REWORKED'
export type Change = { kind: ChangeKind; text: string }
export type AbilitySection = { ability: string; changes: Change[] }
/** `changedIn` = the patch this hero was last changed in (a value from PATCH_SEQUENCE). */
export type HeroPatch = { changedIn: string; sections: AbilitySection[] }

export const PATCH_VERSION = '1.03I'
/** Current patch release date (28.08.2026). */
export const PATCH_DATE = '2026-08-28'

/**
 * The patches we track, oldest → newest. A hero keeps its badge until the person re-ranks it under
 * a patch at least as new as the one it last changed in — so a hero changed in 1.03E they still
 * haven't played keeps showing an (older-patch) badge even after 1.03F lands. When a new patch
 * drops: append it here, bump PATCH_VERSION/PATCH_DATE, keep the still-relevant older heroes, and
 * add/override the newly-changed ones with `changedIn` set to the new version.
 */
export const PATCH_SEQUENCE = ['1.03E', '1.03F', '1.03G', '1.03H', '1.03I'] as const

const C = (kind: ChangeKind, text: string): Change => ({ kind, text })

export const PATCH_HEROES: Record<string, HeroPatch> = {
  crystal_maiden: {
    changedIn: '1.03E',
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
    changedIn: '1.03E',
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
    changedIn: '1.03E',
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
    changedIn: '1.03E',
    sections: [
      {
        ability: 'Firefly',
        changes: [C('CHANGED', 'Shard [Rise as the Phoenix Knight] renamed from [Become the Phoenix Rider].')],
      },
    ],
  },

  marci: {
    changedIn: '1.03E',
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
    changedIn: '1.03E',
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
    changedIn: '1.03E',
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

  centaur: {
    changedIn: '1.03F',
    sections: [
      {
        ability: 'Hoof Stomp',
        changes: [
          C('CHANGED', 'Added base damage; now Strength-scaled. Base damage added: 170/250/330/410.'),
          C('CHANGED', 'Cooldown: 14/13/12/11 → 11s.'),
          C('CHANGED', 'Damage: 15/20/25/30% → 390/540/690/840%.'),
          C('CHANGED', 'Shard [Earth Trample] fixed (spike count no longer decays); Count2: 3 → 6.'),
          C('CHANGED', 'Shard [Centaur Pounce!] Count: 2 → 3; leap distance: 250 → 200.'),
          C('CHANGED', 'Shard [Power Convergence] bonus Str: 40 → 80.'),
        ],
      },
      {
        ability: 'Stampede',
        changes: [
          C('CHANGED', 'Added base damage: 300/450/600.'),
          C('CHANGED', 'Cooldown: 80/70/60 → 50s (all levels).'),
          C('CHANGED', 'Duration: 4/5/6 → 8/9/10s. Hit cooldown: 3.5 → 1.5s.'),
          C('CHANGED', 'Damage: 450/600/750% → 600/800/1000%.'),
          C('CHANGED', 'Trample radius: 105 → 250 (no longer scales with range).'),
          C('CHANGED', 'Duration + Bonus Move Speed upgrades merged; Trample Radius upgrade removed.'),
          C('CHANGED', 'Shard [Galloping Charge] distance: 600 → 400; cooldown reduction: 1.2 → 0.6s; trigger: 35% → 55%.'),
        ],
      },
      {
        ability: 'Talents',
        // Levels read from the VPK's talent tree slots (Ability10–17 pairs = 10/15/20/25).
        changes: [
          C('CHANGED', 'Lv 20: Stampede Cooldown Reduction: -15s → -10s.'),
          C('CHANGED', 'Lv 25: Hoof Stomp Bonus Damage: +6% → +200%.'),
          C('CHANGED', 'Lv 25: Stampede Damage Cooldown: -1s → -0.5s.'),
        ],
      },
    ],
  },

  spirit_breaker: {
    changedIn: '1.03G',
    sections: [
      {
        ability: 'New Hero',
        changes: [C('ADDED', 'Spirit Breaker was added to the game in 1.03F.')],
      },
      {
        ability: 'Charge of Darkness',
        changes: [
          C('CHANGED', 'Mana cost: 20 + 3% → 12 + 2%.'),
          C('CHANGED', 'Slow on hitting an enemy: 10% → 8%.'),
          C('CHANGED', 'Slow on hitting terrain: 200 + 10% → 120 + 6%.'),
          C('CHANGED', 'Shard [Ghost Drift] max kinetic energy stored: 2000 → 4000.'),
        ],
      },
    ],
  },

  huskar: {
    changedIn: '1.03G',
    sections: [
      {
        ability: 'Inner Fire',
        changes: [C('CHANGED', 'Shard [Scorch] repeat power: 50% → 65%.')],
      },
      {
        ability: 'Life Break',
        changes: [
          C('CHANGED', 'Shard [Blazing Train] power: 50% → 65%.'),
          C('CHANGED', 'Shard [Immolation] power: 200% → 250%.'),
        ],
      },
    ],
  },

  void_spirit: {
    changedIn: '1.03G',
    sections: [
      {
        ability: 'Intrinsic Edge',
        changes: [
          C('REWORKED', 'Replaces the previous innate: 20/23/26/30% chance to critically strike for 160% damage; each crit grants a stacking 2% All-Attribute calculation bonus for 15s, up to 99 stacks. Scaled vs Leaders (140%) and Bosses (200%). Old flat Base Attack bonus (15) and Secondary Stat Bonus (25%) removed.'),
        ],
      },
      {
        ability: 'Aether Remnant',
        changes: [
          C('CHANGED', 'Cooldown: 6/5.5/5/4.5 → 6s (all levels). Mana cost: 50/60/70/80 → 45/50/55/60.'),
          C('CHANGED', 'Damage: 80/130/180/230 → 110/170/230/290. Bonus Damage: 80/120/160/200% → 100/150/200/250%.'),
          C('CHANGED', 'Common upgrade Bonus Damage: 40% → 70%. Common upgrade Damage: 50 → 55.'),
          C('REMOVED', 'Pull Duration bonus upgrade removed.'),
          C('CHANGED', 'Shard [Discovered Attack] (renamed from Phantom Strike): the Astral Step it triggers now always crits, and its mark also deals damage.'),
          C('CHANGED', 'Shard [Relative Pin] (renamed from Reversal Force): no longer knocks back; instead slows Movement Speed and reduces Magic Armor. Damage: 100% → 85%.'),
          C('CHANGED', 'Shard [Outpost] (renamed from Planar Sentry): radius 50% → 60%; DPS 20% → 30%; can trigger Shard [Discovered Attack]; max 20 sentries.'),
          C('CHANGED', 'Shard [Piece Coordination] (renamed from Blinking Remnant): now gains charges; Shard [Outpost] responds to it. Damage: 90% → 60%.'),
          C('REMOVED', 'Shard [Deep Projection] removed.'),
        ],
      },
      {
        ability: 'Dissimilate',
        changes: [
          C('CHANGED', 'Mana cost: 120 → 90. No longer benefits from cast-range/AoE bonuses.'),
          C('ADDED', 'Hitting an enemy raises Intrinsic Edge crit chance by 80% for 3s; missing dispels and heals self for 25 instead.'),
          C('CHANGED', 'Shard [Castling] (renamed from Transposition): damage 30% → 50%; benefits from Dissimilate\'s own buffs and grants it bonus final damage; can trigger Shards [Space Advantage] and [Combination].'),
          C('CHANGED', 'Shard [Combination] (renamed from Triple Echo): Aether Remnant damage 100% → 200%; now centers on the burst circle.'),
          C('CHANGED', 'Shard [Space Advantage] (renamed from Void Ring): Resonant Pulse damage 100% → 200%. Radius: 100% → 125%.'),
          C('REMOVED', 'Shard [Expansion] removed.'),
        ],
      },
      {
        ability: 'Resonant Pulse',
        changes: [
          C('CHANGED', 'Mana cost: 80/90/100/110 → 75/80/85/90.'),
          C('CHANGED', 'Base Damage Barrier: 50/75/100/125 → 80/130/180/230. Barrier per hero hit: 35/50/65/80 → 40/60/80/100 (common upgrade 20 → 15).'),
          C('CHANGED', 'Damage: 70/130/190/250 → 100/150/200/250. Bonus Damage: 70/120/170/220% → 100/140/180/220%.'),
          C('CHANGED', 'Now capped in shield instances; exceeding it destroys the oldest shield.'),
          C('CHANGED', 'Shard [Deflection] (renamed from Power of Nothingness): its Astral Step always crits, no longer needs an active cast. Knockback: 300 → 150.'),
          C('CHANGED', 'Shard [Sacrifice] (renamed from Void Burst): shield always explodes, more if broken by damage; explosion scales off Resonant Pulse damage, not remaining shield. Range: 100% → 120%.'),
          C('CHANGED', 'Shard [Gaining a Tempo] (renamed from Star Ring Pulse): detection range 400 → 700; release interval 15 → 8s; cooldown reduction per unit spell cast 0.5 → 1s.'),
        ],
      },
      {
        ability: 'Astral Step',
        changes: [
          C('CHANGED', 'Astral Mark Damage: 200/300/400 → 220/290/360. Astral Mark Bonus Damage: 230/270/310% → 190/250/310%.'),
          C('CHANGED', 'Common upgrade Astral Mark Damage: 90 → 80; Bonus Damage: 45% → 55%.'),
          C('CHANGED', 'Shard [Driving Away] (renamed from Lightspeed Rending): also reduces enemy Magic Armor. Stun: 1 → 1.5s.'),
          C('CHANGED', 'Shard [Accumulation of Advantages] (renamed from Turbulent Void): reworked — each Astral Mark hit permanently increases that target\'s damage taken from Astral Mark, up to a cap (was radius damage).'),
          C('CHANGED', 'Shard [Double Attack] renamed from [Astral Weapon]; Shard [Initiative] renamed from [Planar Conjugation].'),
        ],
      },
      {
        ability: 'Talents',
        // Levels read from the VPK's talent tree slots (Ability10–17 pairs = 10/15/20/25).
        changes: [
          C('CHANGED', 'Lv 10: Aether Remnant Damage: +50/40% → +70/55%.'),
          C('CHANGED', 'Lv 15: "Dissimilate roots for 2s" → "+1 Astral Step Charge".'),
          C('CHANGED', 'Lv 20: "Resonant Pulse grants an all-damage barrier" → "-1s Resonant Pulse Cooldown".'),
          C('CHANGED', 'Lv 20: "+1 Astral Step Charge" → "+70 Aether Remnant Catch Distance".'),
          C('CHANGED', 'Lv 25: "200% Astral Step Critical Strike" → "Dissimilate buff grants 50% Armor and Magic Resistance penetration".'),
          C('CHANGED', 'Lv 25: "+200 Resonant Pulse Radius" → "+7s Intrinsic Edge Buff Duration".'),
        ],
      },
    ],
  },

  skeleton_king: {
    changedIn: '1.03I',
    // Kit read straight from the VPK (arakunido hadn't covered this patch yet).
    sections: [
      {
        ability: 'New Hero',
        changes: [C('ADDED', 'Wraith King was added to the game in 1.03H.')],
      },
      {
        ability: 'Wraithfire Blast',
        changes: [
          C('ADDED', 'Fan-shaped Wraith Shock that stuns and applies Wraith Marks — nearer enemies get more. Marks last indefinitely with no cap, but only so many can be active at once.'),
          C('CHANGED', '1.03I: Radius now scales: 550 → 550/600/650/700.'),
        ],
      },
      {
        ability: 'Bone Guard',
        changes: [C('ADDED', 'Passive: several Bone Guards that respawn where they fell. Guards have Spectral Sword, attack lifesteal, and high magic armor and status resistance.')],
      },
      {
        ability: 'Mortal Strike',
        changes: [C('ADDED', 'Attacks have a chance to crit for greatly increased damage; every so often the next primary attack is a guaranteed crit.')],
      },
      {
        ability: 'Wraith',
        changes: [C('ADDED', 'On fatal damage, becomes a Wraith that cannot die and gains attack and movement speed. Dies when the form ends.')],
      },
      {
        ability: 'Recall',
        changes: [C('ADDED', "Recalls King's Remains to his side for a stack of +20% damage for 10s. Stacks have independent timers, up to 10.")],
      },
      {
        ability: 'Reincarnation',
        changes: [
          C('ADDED', 'If ready with enough mana when Wraith form ends, resurrects after 3s. Active cast enters Wraith form instantly. Nearby enemy deaths reduce the cooldown.'),
          C('CHANGED', '1.03I: no longer usable after the stage ends — will not trigger its cooldown or resurrection.'),
        ],
      },
      {
        ability: 'Talents',
        // Levels from the VPK talent tree slots (Ability10–17 pairs = 10/15/20/25).
        changes: [
          C('ADDED', 'Lv 10: +7% Bone Guard Damage / +35% Mortal Strike Multiplier.'),
          C('ADDED', 'Lv 15: +20% Spectral Sword Detonation Multiplier / +6% Mortal Strike Chance.'),
          C('ADDED', 'Lv 20: -0.6s Spectral Sword Delay / +15% Execution Multiplier.'),
          C('ADDED', 'Lv 25: +100% Bone Guard Status Resistance / +40% Mortal Strike Multiplier (×).'),
        ],
      },
    ],
  },

  death_prophet: {
    changedIn: '1.03I',
    // Read straight from the VPK (arakunido hadn't covered this patch yet).
    sections: [
      {
        ability: 'Crypt Swarm',
        changes: [
          C('CHANGED', 'Damage: 120/180/240/300 → 85/130/175/220. Bonus Magic Damage: 17/20/23/26% → 85/120/155/190%.'),
          C('CHANGED', 'Mana cost: 80/90/100/110 → 65/70/75/80.'),
          C('CHANGED', 'Common upgrade: +70 Damage / +4% Bonus Magic Damage → +55 / +40%.'),
          C('CHANGED', 'Lv 10 talent rescaled to match: +70/+4% → +55/+40%.'),
        ],
      },
      {
        ability: 'Silence',
        changes: [
          C('CHANGED', 'DPS: 35/50/65/80 → 50/70/90/110. Mana DPS: 4/5/6/7% → 35/55/75/95%.'),
          C('CHANGED', 'Common upgrade: +15 DPS / +1% Mana DPS → +20 / +20%.'),
          C('REMOVED', 'Epic [Homebound Souls] disabled (no longer offered).'),
        ],
      },
      {
        ability: 'Spirit Siphon',
        changes: [
          C('CHANGED', 'Damage per second: 10/12/14/16% → 18/21/24/27% (Lv 20 talent: +3% → +4%).'),
          C('CHANGED', 'Common upgrade reworked: +1.5s Haunt Duration → +45 DPS / +4% DPS.'),
        ],
      },
      {
        ability: 'Exorcism',
        changes: [
          C('CHANGED', 'Cooldown: 120 → 80s.'),
          C('CHANGED', 'Spirits: 6/9/12 → 10/11/12 (Lv 25 talent: +6 → +3).'),
          C('CHANGED', 'Spirit damage reworked: 100/200/300 average (40–60 spread) → flat 36/48/60, plus Spirit Bonus Damage 50% → 30/40/50% (Lv 10 talent: +50 / +10% → +15 / +12%).'),
          C('CHANGED', 'Active Bonus Movespeed: 4/8/12% → 20/25/30%.'),
          C('CHANGED', 'Common upgrade: radius/distances +120 → +70, capped at 2 uses (was 4), no longer grants +2 Spirits.'),
        ],
      },
    ],
  },

  nevermore: {
    changedIn: '1.03I',
    sections: [
      {
        ability: 'Requiem of Souls',
        changes: [
          C('CHANGED', 'Lv 20 talent now reads "+30% Damage per Requiem of Souls hit" (was "+30% Requiem of Souls Damage").'),
        ],
      },
    ],
  },
}

export function patchForHero(slug: string): HeroPatch | undefined {
  return PATCH_HEROES[slug]
}

/**
 * Dota's generic innate icon, the same picture the game shows for every innate. The mod's
 * innates use workshop-custom textures that aren't on Valve's CDN, so this stands in for all
 * of them — matching what the game itself renders in the talent/ability strip.
 */
const INNATE_ICON_URL =
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/innate_icon.png'

/** Innates of heroes the stale catalogue predates, which it therefore can't flag itself. */
const KNOWN_INNATES = new Set(['huskar|Blood Magic', 'spirit_breaker|Thousandweight Stride'])

/**
 * The icon URL for a changed ability, looked up from the ability catalogue by hero + name so
 * the popover can show the same art as the rest of the app. Heroes missing from the stale
 * catalogue (added after its last regeneration, e.g. Huskar and Spirit Breaker) fall back to
 * the roster's valveIds in heroes.ts — verified against the VPK's own texture names. Innates
 * get Dota's generic innate icon, as in-game. null for section headers that aren't abilities
 * (e.g. "Talents"). Cached since the popover asks repeatedly.
 */
const iconCache = new Map<string, string | null>()
export function abilityIconSrc(heroSlug: string, abilityName: string): string | null {
  const key = `${heroSlug}|${abilityName}`
  const cached = iconCache.get(key)
  if (cached !== undefined) return cached
  const ability = ABILITIES.find((a) => a.hero === heroSlug && a.name === abilityName)
  const valveId =
    ability?.iconName ??
    getHeroes()
      .find((h) => h.slug === heroSlug)
      ?.abilities?.find((a) => a.name === abilityName)?.valveId
  const src = valveId
    ? abilityIconUrl(valveId)
    : ability?.path.startsWith('innate') || KNOWN_INNATES.has(key)
      ? INNATE_ICON_URL
      : null
  iconCache.set(key, src)
  return src
}

/** Where a patch version sits in the tracked sequence; -1 = never ranked / older than we track. */
function ordinal(version: string | null | undefined): number {
  return version ? (PATCH_SEQUENCE as readonly string[]).indexOf(version) : -1
}

export type PatchBadge = { patch: HeroPatch; current: boolean }

/**
 * The badge to show for a hero given the patch the viewer last ranked it under, or null. It stays
 * while the ranking predates the hero's most recent change (version-based, so clock skew can't fool
 * it). `current` is true when the hero changed in THIS patch, false when it changed in an earlier
 * one the viewer still hasn't re-ranked — the board colours the two differently.
 */
export function patchBadge(
  heroSlug: string,
  rankedUnderPatch: string | null | undefined,
): PatchBadge | null {
  const hp = PATCH_HEROES[heroSlug]
  if (!hp) return null
  if (ordinal(rankedUnderPatch) >= ordinal(hp.changedIn)) return null
  return { patch: hp, current: hp.changedIn === PATCH_VERSION }
}
