// GENERATED FILE -- do not edit.
//
// Written by scripts/generate-catalogue.mjs, read straight out of the game files for
// Aghanim's Labyrinth III: Crisis of Infinite Dimensions (Steam workshop item 2483181385).
// Re-run `npm run catalogue:generate` after a game update; the diff is the changelog.

/**
 * A relic's value doesn't scale with level like an artifact's -- it rolls within a range, and
 * the range widens by rarity tier. `min[0]`/`max[0]` is tier 1, and so on.
 */
export type RelicRoll = {
  key: string
  min: number[]
  max: number[]
}

export type Relic = {
  slug: string
  gameId: string
  name: string
  description: string
  /** An extra clause some relics gain at higher tiers. */
  special?: string
  /** Attribute relics are flat stat sticks; main-effect relics change how something works. */
  isAttribute: boolean
  /** Drop weight within the relic pool. */
  weight: number
  /**
   * Art, or null. Only main-effect relics have their own icon; the attribute ones are drawn
   * from a generic sprite in game, so there's nothing to extract for them.
   */
  icon: string | null
  /** The texture name inside the VPK, used by the icon extractor to match files up. */
  iconName: string | null
  rolls: RelicRoll[]
}

export const RELICS: Relic[] = [
  {
    slug: "main-effect-acidic-slime",
    gameId: "core_main_effect_acidic_slime",
    name: "Acidic Slime",
    description: "Every [[value]]8[[/]] seconds, capture enemies within [[value]]800[[/]], dissolving up to [[value]]4[[/]] buffs or debuffs. Each [[value]]1[[/]] dissolves deals magic damage equal to [[value]]100–180%[[/]] of all Attributes.",
    special: "Debuff Status can be counted as [[value]]2[[/]] states.",
    isAttribute: false,
    weight: 100,
    iconName: "acidic_slime",
    icon: "/relics/main-effect-acidic-slime.png",
    rolls: [
      {
        key: "attribute_index",
        min: [
          100,
        ],
        max: [
          180,
        ],
      },
    ],
  },
  {
    slug: "main-effect-advanced-purification",
    gameId: "core_main_effect_advanced_purification",
    name: "Advanced Purification",
    description: "Gain [[value]]2[[/]] Advanced Purification Potions. Purification Potions are [[value]]30–100%[[/]] more effective in healing and damage.",
    special: "Gain [[value]]1[[/]] Advanced Purification Potions every [[value]]2[[/]] Stages.",
    isAttribute: false,
    weight: 100,
    iconName: "advanced_purification",
    icon: "/relics/main-effect-advanced-purification.png",
    rolls: [
      {
        key: "value",
        min: [
          30,
        ],
        max: [
          100,
        ],
      },
    ],
  },
  {
    slug: "main-effect-advanced-ravage",
    gameId: "core_main_effect_advanced_ravage",
    name: "Advanced Ravage",
    description: "Gain [[value]]2[[/]] Advanced Ravage Potions. Ravage Potions you use are [[value]]30–100%[[/]] more effective.",
    special: "Gain [[value]]1[[/]] Ravage Potions every [[value]]2[[/]] Rounds.",
    isAttribute: false,
    weight: 100,
    iconName: "advanced_ravage",
    icon: "/relics/main-effect-advanced-ravage.png",
    rolls: [
      {
        key: "value",
        min: [
          30,
        ],
        max: [
          100,
        ],
      },
    ],
  },
  {
    slug: "main-effect-aegis",
    gameId: "core_main_effect_aegis",
    name: "Aegis of the Immortal",
    description: "Maximum HP Rune +[[value]]0–3[[/]], restores [[value]]1[[/]] HP for every [[value]]3–6[[/]] Stage completed.",
    special: "Restores [[value]]1[[/]] HP Runes upon entering a new Act.",
    isAttribute: false,
    weight: 100,
    iconName: "aegis",
    icon: "/relics/main-effect-aegis.png",
    rolls: [
      {
        key: "bonus_count",
        min: [
          0,
          0,
          0,
          0,
        ],
        max: [
          2,
          2,
          3,
          3,
        ],
      },
      {
        key: "wave",
        min: [
          6,
          6,
          6,
          6,
        ],
        max: [
          5,
          4,
          4,
          3,
        ],
      },
    ],
  },
  {
    slug: "main-effect-affinity",
    gameId: "core_main_effect_affinity",
    name: "Affinity",
    description: "Allied heroes (excluding you) leveling up grants [[value]]0.6–1.7[[/]] to all Attributes.",
    special: "Also applies to self.",
    isAttribute: false,
    weight: 100,
    iconName: "affinity",
    icon: "/relics/main-effect-affinity.png",
    rolls: [
      {
        key: "value",
        min: [
          0.6,
          0.7,
          0.8,
          0.9,
        ],
        max: [
          1,
          1.3,
          1.4,
          1.7,
        ],
      },
    ],
  },
  {
    slug: "main-effect-agi-man",
    gameId: "core_main_effect_agi_man",
    name: "Agility Marksman",
    description: "At the start of each round, permanently convert [[value]]20%[[/]] of your current base Strength and base Intelligence into base Agility with an extra conversion rate of [[value]]0–30%[[/]], gaining a minimum of [[value]]5[[/]]. This effect cannot be reversed.",
    special: "When calculating effects such as damage, healing, or shields, your Agility calculation result +[[value]]17%[[/]] (+)",
    isAttribute: false,
    weight: 100,
    iconName: "agi_man",
    icon: "/relics/main-effect-agi-man.png",
    rolls: [],
  },
  {
    slug: "main-effect-aka",
    gameId: "core_main_effect_aka",
    name: "Aka",
    description: "Repels enemies within [[value]]400[[/]] range. Applies a repelling force of [[value]]80–140[[/]] units per second.",
    isAttribute: false,
    weight: 0,
    iconName: "one_shot_kill",
    icon: "/relics/main-effect-aka.png",
    rolls: [
      {
        key: "value",
        min: [
          80,
        ],
        max: [
          140,
        ],
      },
    ],
  },
  {
    slug: "main-effect-bottle-1",
    gameId: "core_main_effect_bottle_1",
    name: "Arcane Bottle",
    description: "Bottle maximum charges increased by [[value]]1–5[[/]]. Activating the bottle immediately restores the same amount of charges.",
    special: "Bottle no longer has a maximum charge limit.",
    isAttribute: false,
    weight: 100,
    iconName: "bottle_1",
    icon: "/relics/main-effect-bottle-1.png",
    rolls: [
      {
        key: "value",
        min: [
          1,
          1,
          2,
          2,
        ],
        max: [
          3,
          4,
          4,
          5,
        ],
      },
    ],
  },
  {
    slug: "main-effect-boshman",
    gameId: "core_main_effect_boshman",
    name: "Blabber Guy",
    description: "Every [[value]]5[[/]] seconds, you produce a fart, dealing magic damage to enemies within [[value]]500[[/]] range. Damage = ([[value]]25–45%[[/]] of the damage you have taken during this period).",
    special: "+[[value]]300[[/]] blast radius.",
    isAttribute: false,
    weight: 100,
    iconName: "boshman",
    icon: "/relics/main-effect-boshman.png",
    rolls: [
      {
        key: "value",
        min: [
          25,
        ],
        max: [
          45,
        ],
      },
    ],
  },
  {
    slug: "main-effect-blasting",
    gameId: "core_main_effect_blasting",
    name: "Blasting",
    description: "[[value]]3[[/]] seconds after death, trigger an explosion at the location, dealing pure damage to enemies within [[value]]300–700[[/]] equal to [[value]]200–320[[/]] + [[value]]15–40%[[/]] of your Max HP.",
    special: "When casting an Ability, has a chance to trigger a Blast explosion effect based on the ability's cooldown length. Explosion triggered this way deals only [[value]]50%[[/]] of its full power.",
    isAttribute: false,
    weight: 100,
    iconName: "blasting",
    icon: "/relics/main-effect-blasting.png",
    rolls: [
      {
        key: "radius",
        min: [
          300,
        ],
        max: [
          700,
        ],
      },
      {
        key: "base",
        min: [
          200,
        ],
        max: [
          320,
        ],
      },
      {
        key: "pct",
        min: [
          15,
        ],
        max: [
          40,
        ],
      },
    ],
  },
  {
    slug: "main-effect-blood-attack",
    gameId: "core_main_effect_blood_attack",
    name: "Blood Strike",
    description: "Deals bonus damage equal to ([[value]]4–70[[/]] + [[value]]0.4–7%[[/]] of your max HP). If your max HP is higher than [[value]]20000–70000[[/]], then this bonus is increased by [[value]]80%[[/]].",
    special: "All attack bonus damage +[[value]]20%[[/]] (+)",
    isAttribute: false,
    weight: 100,
    iconName: "blood_attack",
    icon: "/relics/main-effect-blood-attack.png",
    rolls: [
      {
        key: "value",
        min: [
          4,
          6,
          8,
          10,
        ],
        max: [
          25,
          40,
          55,
          70,
        ],
      },
      {
        key: "value2",
        min: [
          0.4,
          0.6,
          0.8,
          1,
        ],
        max: [
          2.5,
          4,
          5.5,
          7,
        ],
      },
      {
        key: "need",
        min: [
          70000,
        ],
        max: [
          20000,
        ],
      },
    ],
  },
  {
    slug: "main-effect-coexist-ring",
    gameId: "core_main_effect_coexist_ring",
    name: "Coexisting States",
    description: "At the start of each Stage, active Day and Night bonuses for [[value]]30–180[[/]] seconds.",
    special: "Grants Water Terrain Bonus.",
    isAttribute: false,
    weight: 100,
    iconName: "coexist_ring",
    icon: "/relics/main-effect-coexist-ring.png",
    rolls: [
      {
        key: "value",
        min: [
          30,
          50,
          70,
          90,
        ],
        max: [
          60,
          100,
          140,
          180,
        ],
      },
    ],
  },
  {
    slug: "main-effect-complex",
    gameId: "core_main_effect_complex",
    name: "Complex",
    description: "Each secondary Attribute grants [[value]]0.2–0.3[[/]] Base Attack Damage. Does not affect Universal Heroes.",
    special: "Grants [[value]]10[[/]] to all Attributes.",
    isAttribute: false,
    weight: 100,
    iconName: "complex",
    icon: "/relics/main-effect-complex.png",
    rolls: [
      {
        key: "value",
        min: [
          0.2,
        ],
        max: [
          0.3,
        ],
      },
    ],
  },
  {
    slug: "main-effect-controlled-whip",
    gameId: "core_main_effect_controlled_whip",
    name: "Control Whip",
    description: "Every [[value]]10[[/]] Strength increases summoned unit HP by [[value]]0.4–1%[[/]]. Every [[value]]10[[/]] Agility increases summoned unit Attack Damage by [[value]]0.3–0.8%[[/]]. Every [[value]]10[[/]] Intelligence provides a [[value]]30%[[/]] bonus effect to the other twoAttributes. (Additional Attributes are not counted.)",
    special: "Summoned unit gains [[value]]1%[[/]] per second Max HP Regeneration.",
    isAttribute: false,
    weight: 100,
    iconName: "controlled_whip",
    icon: "/relics/main-effect-controlled-whip.png",
    rolls: [
      {
        key: "bonus_health",
        min: [
          0.4,
        ],
        max: [
          1,
        ],
      },
      {
        key: "bonus_atk",
        min: [
          0.3,
        ],
        max: [
          0.8,
        ],
      },
    ],
  },
  {
    slug: "main-effect-eliminated",
    gameId: "core_main_effect_eliminated",
    name: "Culler",
    description: "Deal [[value]]25–55%[[/]] bonus damage to enemies with HP above [[value]]80%[[/]].",
    special: "[[value]]20%[[/]] of the bonus effect is converted into bonus final damage.",
    isAttribute: false,
    weight: 100,
    iconName: "eliminated",
    icon: "/relics/main-effect-eliminated.png",
    rolls: [
      {
        key: "bonus_damage",
        min: [
          25,
        ],
        max: [
          55,
        ],
      },
    ],
  },
  {
    slug: "main-effect-dawn-shelter",
    gameId: "core_main_effect_dawn_shelter",
    name: "Dawn Shelter",
    description: "Gain a shield equal to [[value]]4–8%[[/]] of Max HP against all damage every [[value]]15[[/]] seconds. During daytime, the shield value is multiplied by [[value]]200%[[/]].",
    special: "Shield generation interval reduced by [[value]]5[[/]] seconds.",
    isAttribute: false,
    weight: 100,
    iconName: "dawn_shelter",
    icon: "/relics/main-effect-dawn-shelter.png",
    rolls: [
      {
        key: "health_pct",
        min: [
          4,
        ],
        max: [
          8,
        ],
      },
    ],
  },
  {
    slug: "main-effect-death-overdraft",
    gameId: "core_main_effect_death_overdraft",
    name: "Death Overdraft",
    description: "Gain [[value]]2–4%[[/]] Spell Amp on death. Max: [[value]]18–100%[[/]].",
    special: "+[[value]]1[[/]] to current/Max HP Runes",
    isAttribute: false,
    weight: 100,
    iconName: "death_overdraft",
    icon: "/relics/main-effect-death-overdraft.png",
    rolls: [
      {
        key: "value",
        min: [
          2,
        ],
        max: [
          4,
        ],
      },
      {
        key: "max",
        min: [
          18,
          22,
          26,
          30,
        ],
        max: [
          55,
          70,
          85,
          100,
        ],
      },
    ],
  },
  {
    slug: "main-effect-devil-mask",
    gameId: "core_main_effect_devil_mask",
    name: "Devil Mask",
    description: "At the start of the Stage gain [[value]]1[[/]] random Common Shard upgrades (lasts until Stage ends). [[value]]10–35%[[/]] chance to permanently retain the upgrade. Max retained: [[value]]3[[/]].",
    special: "Maximum permanent retention increased to [[value]]5[[/]].",
    isAttribute: false,
    weight: 100,
    iconName: "devil_mask",
    icon: "/relics/main-effect-devil-mask.png",
    rolls: [
      {
        key: "value",
        min: [
          30,
          50,
          70,
          90,
        ],
        max: [
          60,
          100,
          140,
          180,
        ],
      },
      {
        key: "chance",
        min: [
          10,
          14,
          18,
          22,
        ],
        max: [
          20,
          25,
          30,
          35,
        ],
      },
    ],
  },
  {
    slug: "main-effect-fat-boy",
    gameId: "core_main_effect_fat_boy",
    name: "Dragon Coin",
    description: "At the start of each Stage, if your gold is below [[value]]200–650[[/]], it is immediately increased to [[value]]200–650[[/]].",
    special: "+[[value]]200[[/]] target gold.",
    isAttribute: false,
    weight: 100,
    iconName: "fat_boy",
    icon: "/relics/main-effect-fat-boy.png",
    rolls: [
      {
        key: "value",
        min: [
          200,
          250,
          300,
          350,
        ],
        max: [
          400,
          500,
          600,
          650,
        ],
      },
    ],
  },
  {
    slug: "main-effect-responsibility",
    gameId: "core_main_effect_responsibility",
    name: "Dutybound",
    description: "For each dead ally, all Attributes are increased by [[value]]7–10%[[/]].",
    special: "For each dead ally, all Attributes gain an additional bonus of [[value]]10[[/]].",
    isAttribute: false,
    weight: 100,
    iconName: "responsibility",
    icon: "/relics/main-effect-responsibility.png",
    rolls: [
      {
        key: "value",
        min: [
          7,
        ],
        max: [
          10,
        ],
      },
    ],
  },
  {
    slug: "main-effect-incarnation-of-ash",
    gameId: "core_main_effect_incarnation_of_ash",
    name: "Ember Incarnate",
    description: "Attacks have a [[value]]15%[[/]] chance to spawn a spirit at the target’s location. The spirit attacks enemies within [[value]]600[[/]] every [[value]]0.5[[/]] seconds and has a [[value]]20–35%[[/]] chance to disappear after each attack. Cooldown: [[value]]4[[/]] seconds.",
    special: "+[[value]]500[[/]] search radius.",
    isAttribute: false,
    weight: 100,
    iconName: "incarnation_of_ash",
    icon: "/relics/main-effect-incarnation-of-ash.png",
    rolls: [
      {
        key: "value",
        min: [
          35,
          33,
          31,
          30,
        ],
        max: [
          25,
          23,
          21,
          20,
        ],
      },
    ],
  },
  {
    slug: "main-effect-ember",
    gameId: "core_main_effect_ember",
    name: "Embers",
    description: "Converts your current HP Runes into Embers. Each Ember increases Max HP by [[value]]5–10%[[/]]. Upon death, [[value]]1[[/]] stacks are lost.",
    special: "Always retain at least [[value]]1[[/]] Ember stacks.",
    isAttribute: false,
    weight: 100,
    iconName: "ember",
    icon: "/relics/main-effect-ember.png",
    rolls: [
      {
        key: "pct",
        min: [
          5,
        ],
        max: [
          10,
        ],
      },
    ],
  },
  {
    slug: "main-effect-bottle-3",
    gameId: "core_main_effect_bottle_3",
    name: "Endless Bottle",
    description: "The Bottle restores [[value]]3[[/]] charges every [[value]]1–5[[/]] Stages.",
    special: "Restores Bottle charges every [[value]]65[[/]] seconds.",
    isAttribute: false,
    weight: 100,
    iconName: "bottle_3",
    icon: "/relics/main-effect-bottle-3.png",
    rolls: [
      {
        key: "value",
        min: [
          5,
          4,
          4,
          3,
        ],
        max: [
          2,
          2,
          1,
          1,
        ],
      },
    ],
  },
  {
    slug: "main-effect-poisonous-enchantment",
    gameId: "core_main_effect_poisonous_enchantment",
    name: "Envenomed Arrow",
    description: "Attacks apply [[color:#98f698]]Poison[[/]] equal to ([[value]]3–10[[/]] × Depth + [[value]]8–22%[[/]]Agility).",
    special: "Activate [[color:#98f698]]Poison[[/]] every [[value]]5[[/]] attacks.Activation Ratio: [[value]]4%[[/]]Activation Damage: [[value]]1500%[[/]]",
    isAttribute: false,
    weight: 100,
    iconName: "poisonous_enchantment",
    icon: "/relics/main-effect-poisonous-enchantment.png",
    rolls: [
      {
        key: "agi_pct",
        min: [
          8,
        ],
        max: [
          22,
        ],
      },
      {
        key: "deep",
        min: [
          3,
        ],
        max: [
          10,
        ],
      },
    ],
  },
  {
    slug: "main-effect-equilibrium",
    gameId: "core_main_effect_equilibrium",
    name: "Equilibrium",
    description: "When casting a spell with cooldown longer than [[value]]2[[/]] seconds, has a [[value]]25%[[/]] chance to restore Mana equal to [[value]]20–35[[/]] + [[value]]1.5–4%[[/]] of max MP.",
    special: "+[[value]]15%[[/]] trigger chance.",
    isAttribute: false,
    weight: 100,
    iconName: "equilibrium",
    icon: "/relics/main-effect-equilibrium.png",
    rolls: [
      {
        key: "base",
        min: [
          20,
        ],
        max: [
          35,
        ],
      },
      {
        key: "pct",
        min: [
          1.5,
        ],
        max: [
          4,
        ],
      },
    ],
  },
  {
    slug: "main-effect-one-shot-kill",
    gameId: "core_main_effect_one_shot_kill",
    name: "Fatal Kill",
    description: "The first Critical trike triggered against an enemies gains [[value]]40–120%[[/]] bonus damage.",
    special: "[[value]]30%[[/]] is converted into final critical strike damage bonus.",
    isAttribute: false,
    weight: 100,
    iconName: "one_shot_kill",
    icon: "/relics/main-effect-one-shot-kill.png",
    rolls: [
      {
        key: "value",
        min: [
          40,
        ],
        max: [
          120,
        ],
      },
      {
        key: "value2",
        min: [
          300,
        ],
        max: [
          600,
        ],
      },
    ],
  },
  {
    slug: "main-effect-one-shot-kill-old",
    gameId: "core_main_effect_one_shot_kill_old",
    name: "Fatal Kill(Legacy)",
    description: "When your trigger critical strike, if the target’s Health is below [[value]]20%[[/]], the final damage of that instance is increased by [[value]]70–150%[[/]].",
    special: "+[[value]]10%[[/]] HP Threshold.",
    isAttribute: false,
    weight: 0,
    iconName: "one_shot_kill",
    icon: "/relics/main-effect-one-shot-kill-old.png",
    rolls: [
      {
        key: "value",
        min: [
          70,
        ],
        max: [
          150,
        ],
      },
    ],
  },
  {
    slug: "main-effect-aghanim-1",
    gameId: "core_main_effect_aghanim_1",
    name: "Fate Rewrite · I",
    description: "Free refreshes for Legendary Specter Shards +[[value]]1–2[[/]].",
    special: "Also grants [[value]]2[[/]] free refreshes for Common Scepter Shards.",
    isAttribute: false,
    weight: 100,
    iconName: "aghanim_1",
    icon: "/relics/main-effect-aghanim-1.png",
    rolls: [
      {
        key: "value",
        min: [
          1,
        ],
        max: [
          2,
        ],
      },
    ],
  },
  {
    slug: "main-effect-aghanim-2",
    gameId: "core_main_effect_aghanim_2",
    name: "Fate Rewrite · II",
    description: "Free refreshes for Common Specter Shards +[[value]]1–5[[/]].",
    special: "Also grants [[value]]1[[/]] free refreshes for Common Scepter Shards.",
    isAttribute: false,
    weight: 100,
    iconName: "aghanim_2",
    icon: "/relics/main-effect-aghanim-2.png",
    rolls: [
      {
        key: "value",
        min: [
          1,
          1,
          2,
          2,
        ],
        max: [
          3,
          4,
          4,
          5,
        ],
      },
    ],
  },
  {
    slug: "main-effect-aghanim-3",
    gameId: "core_main_effect_aghanim_3",
    name: "Fate Skew",
    description: "Provides [[value]]1–3[[/]] Common Shard Stats bans.",
    isAttribute: false,
    weight: 0,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          1,
          1,
          1,
          1,
        ],
        max: [
          2,
          2,
          2,
          3,
        ],
      },
    ],
  },
  {
    slug: "main-effect-double-hit",
    gameId: "core_main_effect_double_hit",
    name: "Geminate Attack",
    description: "Your next attack will strike an additional [[value]]1[[/]] times after a short delay, dealing [[value]]40–300%[[/]] damage and ignoring evasion. Cooldown: [[value]]1.5[[/]] seconds.",
    special: "[[value]]33%[[/]] chance to increase combo count by [[value]]1[[/]].",
    isAttribute: false,
    weight: 100,
    iconName: "double_hit",
    icon: "/relics/main-effect-double-hit.png",
    rolls: [
      {
        key: "value",
        min: [
          40,
          60,
          80,
          100,
        ],
        max: [
          180,
          220,
          260,
          300,
        ],
      },
    ],
  },
  {
    slug: "main-effect-ghost-form",
    gameId: "core_main_effect_ghost_form",
    name: "Ghost Form",
    description: "Once per Stage, persist for [[value]]5–9[[/]] seconds upon death.",
    special: "Does not cause death when the effect ends.",
    isAttribute: false,
    weight: 100,
    iconName: "ghost_form",
    icon: "/relics/main-effect-ghost-form.png",
    rolls: [
      {
        key: "duration",
        min: [
          5,
        ],
        max: [
          9,
        ],
      },
    ],
  },
  {
    slug: "main-effect-glass-cannon",
    gameId: "core_main_effect_glass_cannon",
    name: "Glass Cannon",
    description: "Damage you take is increased by [[value]]30–60%[[/]], but your final damage is increased by [[value]]15–35%[[/]].",
    special: "+[[value]]10%[[/]] Bonus Final Damage.",
    isAttribute: false,
    weight: 100,
    iconName: "glass_cannon",
    icon: "/relics/main-effect-glass-cannon.png",
    rolls: [
      {
        key: "value",
        min: [
          60,
          55,
          50,
          50,
        ],
        max: [
          40,
          40,
          35,
          30,
        ],
      },
      {
        key: "value2",
        min: [
          15,
          18,
          21,
          25,
        ],
        max: [
          25,
          29,
          33,
          35,
        ],
      },
    ],
  },
  {
    slug: "main-effect-gold-copy",
    gameId: "core_main_effect_gold_copy",
    name: "Gold Replica",
    description: "At the start of the Stage, gain [[value]]2–6[[/]] % interest bonus.",
    special: "Gain [[value]]1000[[/]] gold on activation.",
    isAttribute: false,
    weight: 100,
    iconName: "gold_copy",
    icon: "/relics/main-effect-gold-copy.png",
    rolls: [
      {
        key: "base",
        min: [
          2,
        ],
        max: [
          6,
        ],
      },
      {
        key: "bonus",
        min: [
          0.1,
        ],
        max: [
          0.4,
        ],
      },
    ],
  },
  {
    slug: "main-effect-grow",
    gameId: "core_main_effect_grow",
    name: "Grow",
    description: "After each Act, your model size increases by [[value]]10–15%[[/]]. All Attributes increased by [[value]]8–20%[[/]] of current base value.",
    special: "[[value]]25[[/]] % of this effect uses total Attributes instead of base Attributes. (Bonus Attributes are not included.)",
    isAttribute: false,
    weight: 100,
    iconName: "tiny_core",
    icon: "/relics/main-effect-grow.png",
    rolls: [
      {
        key: "model_scale",
        min: [
          10,
        ],
        max: [
          15,
        ],
      },
      {
        key: "attribute",
        min: [
          8,
        ],
        max: [
          20,
        ],
      },
    ],
  },
  {
    slug: "main-effect-hunting-time",
    gameId: "core_main_effect_hunting_time",
    name: "Hunting Time",
    description: "Attack speed and Movement speed increased by [[value]]2–25%[[/]], with an additional bonus of [[value]]50%[[/]] during nighttime.",
    special: "+[[value]]70[[/]] Max Attack Speed.",
    isAttribute: false,
    weight: 100,
    iconName: "hunting_time",
    icon: "/relics/main-effect-hunting-time.png",
    rolls: [
      {
        key: "pct",
        min: [
          2,
          3,
          4,
          5,
        ],
        max: [
          10,
          15,
          20,
          25,
        ],
      },
    ],
  },
  {
    slug: "main-effect-int-man",
    gameId: "core_main_effect_int_man",
    name: "Intelligence Mage",
    description: "At the start of each round, permanently convert [[value]]20%[[/]] of your current base Strength and base Agility into base Intelligence with an extra conversion rate of [[value]]0–30%[[/]], gaining a minimum of [[value]]5[[/]]. This effect cannot be reversed.",
    special: "When calculating effects such as damage, healing, or shields, your Intelligence calculation result +[[value]]17%[[/]] (+)",
    isAttribute: false,
    weight: 100,
    iconName: "int_man",
    icon: "/relics/main-effect-int-man.png",
    rolls: [],
  },
  {
    slug: "main-effect-tough-guy",
    gameId: "core_main_effect_tough_guy",
    name: "Ironclad",
    description: "Casting a spell grants a shield equal to [[value]]50–140%[[/]] Strength, blocking all damage for [[value]]12[[/]] seconds. Cap: [[value]]50–100%[[/]] of Max HP.",
    special: "Shield no longer expires.",
    isAttribute: false,
    weight: 100,
    iconName: "tough_guy",
    icon: "/relics/main-effect-tough-guy.png",
    rolls: [
      {
        key: "str_to_block",
        min: [
          50,
        ],
        max: [
          140,
        ],
      },
      {
        key: "max_block",
        min: [
          50,
        ],
        max: [
          100,
        ],
      },
    ],
  },
  {
    slug: "main-effect-living-blood",
    gameId: "core_main_effect_living_blood",
    name: "Living Blood",
    description: "+[[value]]0.5–1[[/]]% health regen per second while health is above [[value]]80%[[/]], up to [[value]]80[[/]]%. Decays by [[value]]300%[[/]] per second when below the threshold.",
    special: "Max value increased by [[value]]20%[[/]].",
    isAttribute: false,
    weight: 100,
    iconName: "living_blood",
    icon: "/relics/main-effect-living-blood.png",
    rolls: [
      {
        key: "pct",
        min: [
          0.5,
        ],
        max: [
          1,
        ],
      },
    ],
  },
  {
    slug: "main-effect-water",
    gameId: "core_main_effect_water",
    name: "Living Water",
    description: "Converts current HP Runes into Living Water. Each stack increases max MP by [[value]]5–10%[[/]]. Loses [[value]]1[[/]] stacks upon each death.",
    special: "Grants at least [[value]]1[[/]] stacks of Living Water.",
    isAttribute: false,
    weight: 100,
    iconName: "water",
    icon: "/relics/main-effect-water.png",
    rolls: [
      {
        key: "pct",
        min: [
          5,
        ],
        max: [
          10,
        ],
      },
    ],
  },
  {
    slug: "main-effect-lone-wolf",
    gameId: "core_main_effect_lone_wolf",
    name: "Lone Wolf",
    description: "When there are no other allied units within [[value]]850–1500[[/]] range, all Attributes are increased by [[value]]8–15%[[/]].",
    special: "While active, grants an additional [[value]]15%[[/]] final damage bonus.",
    isAttribute: false,
    weight: 100,
    iconName: "lone_wolf",
    icon: "/relics/main-effect-lone-wolf.png",
    rolls: [
      {
        key: "radius",
        min: [
          1500,
          1400,
          1300,
          1200,
        ],
        max: [
          1000,
          950,
          900,
          850,
        ],
      },
      {
        key: "bonus_all",
        min: [
          8,
        ],
        max: [
          15,
        ],
      },
      {
        key: "damage_reduction",
        min: [
          12,
        ],
        max: [
          20,
        ],
      },
    ],
  },
  {
    slug: "main-effect-lucky-potion",
    gameId: "core_main_effect_lucky_potion",
    name: "Lucky Potion",
    description: "Upon using the Bottle, the target gains [[value]]10–33[[/]] Luck Bonus for [[value]]90[[/]] seconds.",
    special: "Grants [[value]]15[[/]] Bonus Luck.",
    isAttribute: false,
    weight: 100,
    iconName: "lucky_potion",
    icon: "/relics/main-effect-lucky-potion.png",
    rolls: [
      {
        key: "bonus",
        min: [
          10,
          14,
          18,
          22,
        ],
        max: [
          18,
          23,
          28,
          33,
        ],
      },
    ],
  },
  {
    slug: "main-effect-deconstruct-magical",
    gameId: "core_main_effect_deconstruct_magical",
    name: "Magical Deconstruction",
    description: "Magic Damage penetrates [[value]]2–8[[/]]+[[value]]8–15%[[/]] of the target's Magic Armor.",
    special: "If Magic Armor is negative when calculating, Vulnerability effect +[[value]]10%[[/]](+)",
    isAttribute: false,
    weight: 100,
    iconName: "deconstruct_magical",
    icon: "/relics/main-effect-deconstruct-magical.png",
    rolls: [
      {
        key: "base",
        min: [
          2,
        ],
        max: [
          8,
        ],
      },
      {
        key: "pct",
        min: [
          8,
        ],
        max: [
          15,
        ],
      },
    ],
  },
  {
    slug: "main-effect-mana-attack",
    gameId: "core_main_effect_mana_attack",
    name: "Mana Strike",
    description: "+[[value]]3–40%[[/]] Orb-type Damage (+). While your current mana is above [[value]]25%[[/]], gain Attack Speed, reaching [[value]]5–50[[/]] at [[value]]80%[[/]] mana.",
    special: "Attacks deal [[value]]60[[/]] + [[value]]100%[[/]] of your Primary Attribute as Orb-type Magical Damage.",
    isAttribute: false,
    weight: 100,
    iconName: "mana_attack",
    icon: "/relics/main-effect-mana-attack.png",
    rolls: [
      {
        key: "bonus_orb_pct",
        min: [
          3,
          4,
          5,
          5,
        ],
        max: [
          15,
          20,
          30,
          40,
        ],
      },
      {
        key: "attack_speed",
        min: [
          5,
          6,
          8,
          10,
        ],
        max: [
          25,
          30,
          40,
          50,
        ],
      },
    ],
  },
  {
    slug: "main-effect-bottle-2",
    gameId: "core_main_effect_bottle_2",
    name: "Moonwell Bottle",
    description: "Bottle restoration effect increased by [[value]]40–100%[[/]].",
    special: "+[[value]]3[[/]] seconds Bottle duration.",
    isAttribute: false,
    weight: 100,
    iconName: "bottle_2",
    icon: "/relics/main-effect-bottle-2.png",
    rolls: [
      {
        key: "value",
        min: [
          40,
        ],
        max: [
          100,
        ],
      },
    ],
  },
  {
    slug: "main-effect-drunk",
    gameId: "core_main_effect_drunk",
    name: "Mourning Ritual",
    description: "Gain [[value]]20–30%[[/]] damage reduction. Mitigated damage is dealt over the next [[value]]6[[/]] seconds. Killing an enemy reduces remaining pending damage by [[value]]8–15%[[/]].",
    special: "+[[value]]3[[/]] seconds delay time.",
    isAttribute: false,
    weight: 100,
    iconName: "drunk",
    icon: "/relics/main-effect-drunk.png",
    rolls: [
      {
        key: "pct",
        min: [
          20,
        ],
        max: [
          30,
        ],
      },
      {
        key: "reduction",
        min: [
          8,
        ],
        max: [
          15,
        ],
      },
    ],
  },
  {
    slug: "main-effect-mystery-potion",
    gameId: "core_main_effect_mystery_potion",
    name: "Mystic Potion",
    description: "Upon using the Bottle, the target gains [[value]]15%[[/]] Spell Amp for [[value]]15–70[[/]] seconds.",
    special: "Extends duration by [[value]]30[[/]] seconds.",
    isAttribute: false,
    weight: 100,
    iconName: "mystery_potion",
    icon: "/relics/main-effect-mystery-potion.png",
    rolls: [
      {
        key: "value",
        min: [
          15,
          20,
          25,
          35,
        ],
        max: [
          30,
          40,
          50,
          70,
        ],
      },
    ],
  },
  {
    slug: "main-effect-nature-bless",
    gameId: "core_main_effect_nature_bless",
    name: "Nature‘s Boon",
    description: "Heals all allied heroes every [[value]]10[[/]] seconds. Healing = [[value]]15–20[[/]] + [[value]]100–200%[[/]] of your Health Regeneration.",
    special: "Interval reduced by [[value]]4[[/]] seconds.",
    isAttribute: false,
    weight: 100,
    iconName: "nature_bless",
    icon: "/relics/main-effect-nature-bless.png",
    rolls: [
      {
        key: "base",
        min: [
          15,
        ],
        max: [
          20,
        ],
      },
      {
        key: "index",
        min: [
          7,
        ],
        max: [
          10,
        ],
      },
      {
        key: "pct",
        min: [
          100,
        ],
        max: [
          200,
        ],
      },
    ],
  },
  {
    slug: "main-effect-necrosis",
    gameId: "core_main_effect_necrosis",
    name: "Necrosis",
    description: "Damage you deal also reduces the target’s Health Regeneration by [[value]]20–35%[[/]] for [[value]]3[[/]] seconds.",
    isAttribute: false,
    weight: 0,
    iconName: "necrosis",
    icon: "/relics/main-effect-necrosis.png",
    rolls: [
      {
        key: "value",
        min: [
          20,
        ],
        max: [
          35,
        ],
      },
    ],
  },
  {
    slug: "main-effect-new-fresh",
    gameId: "core_main_effect_new_fresh",
    name: "New Refresher Orb",
    description: "Your Refresher Orb starts with a cooldown of [[value]]70–140[[/]] seconds. Each subsequent use increases the cooldown by [[value]]10[[/]] seconds until it returns to its original value.",
    isAttribute: false,
    weight: 0,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          140,
          135,
          130,
          125,
        ],
        max: [
          100,
          90,
          80,
          70,
        ],
      },
    ],
  },
  {
    slug: "main-effect-night-stalker",
    gameId: "core_main_effect_night_stalker",
    name: "Night Stalker",
    description: "Killing an enemy restores [[value]]1.5–4%[[/]] of HP and MP. During nighttime, the effect is increased to [[value]]200%[[/]].",
    special: "Nighttime kills also grant [[value]]0.5%[[/]] Bonus Max HP until the Round ends.",
    isAttribute: false,
    weight: 100,
    iconName: "night_stalker",
    icon: "/relics/main-effect-night-stalker.png",
    rolls: [
      {
        key: "regen_pct",
        min: [
          1.5,
        ],
        max: [
          4,
        ],
      },
    ],
  },
  {
    slug: "main-effect-nirvana",
    gameId: "core_main_effect_nirvana",
    name: "Nirvana",
    description: "When taking lethal damage, fully restore Health and become unable to act for [[value]]7–14[[/]] seconds. If you survive, fully heal again and reset all Ability cooldowns. Triggers [[value]]1[[/]] times per Act.",
    isAttribute: false,
    weight: 0,
    iconName: "nirvana",
    icon: "/relics/main-effect-nirvana.png",
    rolls: [
      {
        key: "duration",
        min: [
          14,
          13,
          12,
          11,
        ],
        max: [
          10,
          9,
          8,
          7,
        ],
      },
    ],
  },
  {
    slug: "main-effect-nothingness",
    gameId: "core_main_effect_nothingness",
    name: "Nothl Realm Revelation",
    description: "When any allied hero takes lethal damage, they gain a Shallow Grave effect for [[value]]3–5[[/]] seconds, preventing death. Cooldown: [[value]]120[[/]].",
    special: "When triggered on yourself, duration is increased by [[value]]2[[/]] seconds.",
    isAttribute: false,
    weight: 100,
    iconName: "nothingness",
    icon: "/relics/main-effect-nothingness.png",
    rolls: [
      {
        key: "duration",
        min: [
          3,
        ],
        max: [
          5,
        ],
      },
    ],
  },
  {
    slug: "main-effect-ocen-guard",
    gameId: "core_main_effect_ocen_guard",
    name: "Ocean Guard",
    description: "While in water terrain: Grants [[value]]15–25%[[/]] Status Resistance and [[value]]15–25%[[/]] Health and Mana Regeneration.",
    special: "No longer has activation conditions.",
    isAttribute: false,
    weight: 100,
    iconName: "ocen_guard",
    icon: "/relics/main-effect-ocen-guard.png",
    rolls: [
      {
        key: "res",
        min: [
          15,
        ],
        max: [
          25,
        ],
      },
      {
        key: "regen_amp",
        min: [
          15,
        ],
        max: [
          25,
        ],
      },
    ],
  },
  {
    slug: "main-effect-deconstruct",
    gameId: "core_main_effect_deconstruct",
    name: "Physical Deconstruction",
    description: "Physical Damage penetrates [[value]]2–8[[/]]+[[value]]8–15%[[/]] of the target's Armor.",
    special: "If armor is negative when calculating, Vulnerability effect +[[value]]10%[[/]](+)",
    isAttribute: false,
    weight: 100,
    iconName: "deconstruct",
    icon: "/relics/main-effect-deconstruct.png",
    rolls: [
      {
        key: "base",
        min: [
          2,
        ],
        max: [
          8,
        ],
      },
      {
        key: "pct",
        min: [
          8,
        ],
        max: [
          15,
        ],
      },
    ],
  },
  {
    slug: "main-effect-new-player-default1",
    gameId: "core_main_effect_new_player_default1",
    name: "Pioneer",
    description: "No Relic in this slot. Gold rewarded instead.",
    isAttribute: false,
    weight: 0,
    iconName: "new_player_default1",
    icon: "/relics/main-effect-new-player-default1.png",
    rolls: [],
  },
  {
    slug: "main-effect-new-player-default2",
    gameId: "core_main_effect_new_player_default2",
    name: "Pioneer",
    description: "No Relic in this slot. Gold rewarded instead.",
    isAttribute: false,
    weight: 0,
    iconName: "new_player_default2",
    icon: "/relics/main-effect-new-player-default2.png",
    rolls: [],
  },
  {
    slug: "main-effect-new-player-default3",
    gameId: "core_main_effect_new_player_default3",
    name: "Pioneer",
    description: "No Relic in this slot. Gold rewarded instead.",
    isAttribute: false,
    weight: 0,
    iconName: "new_player_default3",
    icon: "/relics/main-effect-new-player-default3.png",
    rolls: [],
  },
  {
    slug: "main-effect-new-player-default4",
    gameId: "core_main_effect_new_player_default4",
    name: "Pioneer",
    description: "No Relic in this slot. Gold rewarded instead.",
    isAttribute: false,
    weight: 0,
    iconName: "new_player_default4",
    icon: "/relics/main-effect-new-player-default4.png",
    rolls: [],
  },
  {
    slug: "main-effect-new-player-default5",
    gameId: "core_main_effect_new_player_default5",
    name: "Pioneer",
    description: "No Relic in this slot. Gold rewarded instead.",
    isAttribute: false,
    weight: 0,
    iconName: "new_player_default5",
    icon: "/relics/main-effect-new-player-default5.png",
    rolls: [],
  },
  {
    slug: "main-effect-new-player-default6",
    gameId: "core_main_effect_new_player_default6",
    name: "Pioneer",
    description: "No Relic in this slot. Gold rewarded instead.",
    isAttribute: false,
    weight: 0,
    iconName: "new_player_default6",
    icon: "/relics/main-effect-new-player-default6.png",
    rolls: [],
  },
  {
    slug: "main-effect-primordial-codex",
    gameId: "core_main_effect_primordial_codex",
    name: "Primordial Codex",
    description: "Healing you provide has a [[value]]20%[[/]] chance to repeat once after a short delay, with the repeated effect at [[value]]8–23%[[/]] effectiveness.",
    special: "Guaranteed to trigger once every [[value]]6[[/]] seconds.",
    isAttribute: false,
    weight: 100,
    iconName: "primordial_codex",
    icon: "/relics/main-effect-primordial-codex.png",
    rolls: [
      {
        key: "pct",
        min: [
          8,
        ],
        max: [
          23,
        ],
      },
    ],
  },
  {
    slug: "main-effect-marionette",
    gameId: "core_main_effect_marionette",
    name: "Puppet Strings",
    description: "Summoned unit Attack Speed increased by [[value]]10–75[[/]].",
    special: "Summoned unit Attack Speed increased by [[value]]40%[[/]] for the first [[value]]3[[/]] seconds after being summoned.",
    isAttribute: false,
    weight: 100,
    iconName: "marionette",
    icon: "/relics/main-effect-marionette.png",
    rolls: [],
  },
  {
    slug: "main-effect-raging-combo",
    gameId: "core_main_effect_raging_combo",
    name: "Raging Combo",
    description: "Gain [[value]]200[[/]] Attack Speed for next [[value]]6[[/]] attacks. Each attack deals Bonus Damage equal to [[value]]20–40%[[/]] of your Attack Damage. Cooldown: [[value]]12–20[[/]] seconds after all charges used.",
    special: "+[[value]]3[[/]] Attacks",
    isAttribute: false,
    weight: 100,
    iconName: "raging_combo",
    icon: "/relics/main-effect-raging-combo.png",
    rolls: [
      {
        key: "value",
        min: [
          20,
        ],
        max: [
          40,
        ],
      },
      {
        key: "cooldown",
        min: [
          20,
          19,
          18,
          17,
        ],
        max: [
          15,
          14,
          13,
          12,
        ],
      },
    ],
  },
  {
    slug: "main-effect-thick",
    gameId: "core_main_effect_thick",
    name: "Rawhide",
    description: "Permanently increases HP by [[value]]40–90[[/]]+[[value]]0.5–1.2%[[/]] per Round.",
    special: "Applies retroactively.",
    isAttribute: false,
    weight: 100,
    iconName: "thick",
    icon: "/relics/main-effect-thick.png",
    rolls: [
      {
        key: "value",
        min: [
          40,
        ],
        max: [
          90,
        ],
      },
      {
        key: "value2",
        min: [
          0.5,
        ],
        max: [
          1.2,
        ],
      },
    ],
  },
  {
    slug: "main-effect-lantern-of-death",
    gameId: "core_main_effect_lantern_of_death",
    name: "Reaper‘s Lantern",
    description: "Cannot perform Regular attacks. Releases up to [[value]]7[[/]] souls every [[value]]4[[/]] seconds that attack nearby enemies, each dealing [[value]]100–200[[/]]% damage. Range: [[value]]35%[[/]] of your bonus attack distance + [[value]]200–650[[/]]. Release interval scales with Attack Speed.",
    special: "Insufficient targets allow attacking the same target. Max: [[value]]2[[/]].",
    isAttribute: false,
    weight: 100,
    iconName: "lantern_of_death",
    icon: "/relics/main-effect-lantern-of-death.png",
    rolls: [
      {
        key: "damage_pct",
        min: [
          100,
          110,
          120,
          130,
        ],
        max: [
          140,
          160,
          180,
          200,
        ],
      },
      {
        key: "bonus_radius",
        min: [
          200,
          230,
          260,
          290,
        ],
        max: [
          350,
          450,
          550,
          650,
        ],
      },
    ],
  },
  {
    slug: "main-effect-reaper-scythe",
    gameId: "core_main_effect_reaper_scythe",
    name: "Reaper's Scythe",
    description: "Ability damage dealt has a [[value]]18%[[/]] chance to apply Reaper's Scythe. After a [[value]]1.5[[/]] second delay, deals magic damage to the target. Base damage is [[value]]25–70[[/]]. Each point of missing HP increases damage by [[value]]0.2–0.5[[/]], up to a maximum bonus of [[value]]330–1000%[[/]] of Primary Attributes. This effect has a [[value]]8[[/]] seconds cooldown per target.",
    special: "Killing any enemy immediately refreshes the cooldown of all Reaper's Scythes.",
    isAttribute: false,
    weight: 100,
    iconName: "reaper_scythe",
    icon: "/relics/main-effect-reaper-scythe.png",
    rolls: [
      {
        key: "base_damage",
        min: [
          25,
        ],
        max: [
          70,
        ],
      },
      {
        key: "damage",
        min: [
          0.2,
        ],
        max: [
          0.5,
        ],
      },
      {
        key: "attribute_pct",
        min: [
          330,
        ],
        max: [
          1000,
        ],
      },
    ],
  },
  {
    slug: "main-effect-dragon-egg",
    gameId: "core_main_effect_dragon_egg",
    name: "Rebirth Hatchling",
    description: "Emits heat, dealing magic damage per second equal to [[value]]1–2%[[/]] of your Max Health to enemies within [[value]]200–350[[/]] range.",
    special: "Bonus Base Damage = [[value]]10[[/]] + [[value]]3[[/]] × [[color:#19dcff]][Labyrinth Depth][[/]].",
    isAttribute: false,
    weight: 100,
    iconName: "dragon_egg",
    icon: "/relics/main-effect-dragon-egg.png",
    rolls: [
      {
        key: "radius",
        min: [
          200,
        ],
        max: [
          350,
        ],
      },
      {
        key: "damage_pct",
        min: [
          1,
        ],
        max: [
          2,
        ],
      },
    ],
  },
  {
    slug: "main-effect-resurrection",
    gameId: "core_main_effect_resurrection",
    name: "Reviving Flame",
    description: "Infuses the Bottle with energy. On use: target gains +[[value]]4–7[[/]] to all Attributes for [[value]]100[[/]] seconds. Stacks independently.",
    special: "Duration x [[value]]2[[/]].",
    isAttribute: false,
    weight: 100,
    iconName: "bottle_5",
    icon: "/relics/main-effect-resurrection.png",
    rolls: [
      {
        key: "value",
        min: [
          4,
        ],
        max: [
          7,
        ],
      },
    ],
  },
  {
    slug: "main-effect-duel",
    gameId: "core_main_effect_duel",
    name: "Runner-up",
    description: "Upon completing a Stage without dying during it, gain [[value]]5–13[[/]] Bonus Base Attack Damage.",
    special: "Immediately gain the bonuses from [[value]]2[[/]] Stages.",
    isAttribute: false,
    weight: 100,
    iconName: "duel",
    icon: "/relics/main-effect-duel.png",
    rolls: [
      {
        key: "value",
        min: [
          5,
        ],
        max: [
          13,
        ],
      },
    ],
  },
  {
    slug: "main-effect-sacrificial-wheel",
    gameId: "core_main_effect_sacrificial_wheel",
    name: "Sacrificial Wheel",
    description: "While health is above [[value]]40%[[/]], takes [[value]]5%[[/]] of max health as damage per second (ignores shields).Gains [[value]]0.2–4%[[/]] health regen amplification per [[value]]6%[[/]] health lost, stacking up to [[value]]0.3–3%[[/]] at [[value]]95%[[/]] health lost.",
    special: "When calculating lost health percentage, the result is increased by [[value]]18%[[/]] (+).",
    isAttribute: false,
    weight: 100,
    iconName: "sacrificial_wheel",
    icon: "/relics/main-effect-sacrificial-wheel.png",
    rolls: [],
  },
  {
    slug: "main-effect-heart-start",
    gameId: "core_main_effect_heart_start",
    name: "Sadist",
    description: "Kills grant stacking effect: [[value]]0.3–3[[/]] Health Regeneration and Mana Regeneration per second. Bonus is multiplied by [[value]]2.5[[/]] against bosses. Lasts until the end of the Stage.",
    special: "Bonus gained from leaders lasts until the next Act.",
    isAttribute: false,
    weight: 100,
    iconName: "heart_start",
    icon: "/relics/main-effect-heart-start.png",
    rolls: [],
  },
  {
    slug: "main-effect-sealed-bottle",
    gameId: "core_main_effect_sealed_bottle",
    name: "Sealed Bottle",
    description: "Bottle cannot be actively used. Provides passive restoration at [[value]]2–10%[[/]] effectiveness. Triggers a use every [[value]]23–80[[/]] seconds, activating other bonuses.",
    special: "This Relic no longer disables the active use of the Bottle.",
    isAttribute: false,
    weight: 100,
    iconName: "sealed_bottle",
    icon: "/relics/main-effect-sealed-bottle.png",
    rolls: [
      {
        key: "value",
        min: [
          2,
          2.5,
          3,
          3.5,
        ],
        max: [
          6,
          7,
          8,
          10,
        ],
      },
      {
        key: "duration",
        min: [
          80,
          75,
          70,
          65,
        ],
        max: [
          40,
          35,
          30,
          23,
        ],
      },
    ],
  },
  {
    slug: "main-effect-secret",
    gameId: "core_main_effect_secret",
    name: "Secrecy",
    description: "Backstab attacks deal additional damage equal to [[value]]20–80%[[/]] of your Agility. Every [[value]]5[[/]] seconds, your next [[value]]1–7[[/]] attacks are guaranteed to be backstabs.",
    special: "Interval reduced by [[value]]2[[/]] seconds.",
    isAttribute: false,
    weight: 100,
    iconName: "secret",
    icon: "/relics/main-effect-secret.png",
    rolls: [
      {
        key: "pct",
        min: [
          20,
        ],
        max: [
          80,
        ],
      },
      {
        key: "count",
        min: [
          1,
          1,
          2,
          2,
        ],
        max: [
          4,
          5,
          6,
          7,
        ],
      },
    ],
  },
  {
    slug: "main-effect-seed-of-nature",
    gameId: "core_main_effect_seed_of_nature",
    name: "Seed of Nature",
    description: "When Health falls below [[value]]30%[[/]], taking damage triggers Seed of Nature: negate damage, root and disarm all enemies within a [[value]]800[[/]] radius for [[value]]4–7[[/]] seconds. Self invulnerability for same duration. Cooldown: [[value]]2[[/]] Stages.",
    special: "Cooldown: [[value]]1[[/]] Stages.",
    isAttribute: false,
    weight: 100,
    iconName: "seed_of_nature",
    icon: "/relics/main-effect-seed-of-nature.png",
    rolls: [
      {
        key: "value",
        min: [
          4,
        ],
        max: [
          7,
        ],
      },
    ],
  },
  {
    slug: "main-effect-silence-curse",
    gameId: "core_main_effect_silence_curse",
    name: "Silencing Curse",
    description: "Primary attributes increased by [[value]]4–30[[/]]%. Each cast increases this bonus by [[value]]3[[/]]% during this round, up to a maximum of [[value]]14–60[[/]]%, but also Silences self for [[value]]2.5[[/]] seconds, reduced by cooldown reduction.",
    special: "Inherit [[value]]50%[[/]] bonus to the next round, and will not be silenced after reaching full bonus.",
    isAttribute: false,
    weight: 100,
    iconName: "silence_curse",
    icon: "/relics/main-effect-silence-curse.png",
    rolls: [
      {
        key: "int_pct",
        min: [
          4,
          6,
          8,
          10,
        ],
        max: [
          15,
          20,
          25,
          30,
        ],
      },
      {
        key: "max_bonus",
        min: [
          14,
          16,
          18,
          20,
        ],
        max: [
          30,
          40,
          50,
          60,
        ],
      },
    ],
  },
  {
    slug: "main-effect-soul-return",
    gameId: "core_main_effect_soul_return",
    name: "Soul Return",
    description: "When a summon dies or expires, heals self for [[value]]60[[/]] + [[value]]5%[[/]] HP and grants [[value]]1.5–4%[[/]] Summon Amp. This effect stacks independently for [[value]]20[[/]] seconds, and can stack up to [[value]]6–22%[[/]].",
    special: "Also restores [[value]]5%[[/]] Mana.",
    isAttribute: false,
    weight: 100,
    iconName: "soul_return",
    icon: "/relics/main-effect-soul-return.png",
    rolls: [
      {
        key: "summon_amp",
        min: [
          1.5,
        ],
        max: [
          4,
        ],
      },
      {
        key: "summon_max",
        min: [
          6,
        ],
        max: [
          22,
        ],
      },
    ],
  },
  {
    slug: "main-effect-str-man",
    gameId: "core_main_effect_str_man",
    name: "Strength Warrior",
    description: "At the start of each round, permanently convert [[value]]20%[[/]] of your current base Agility and base Intelligence into base Strength with an extra conversion rate of [[value]]0–30%[[/]], gaining a minimum of [[value]]5[[/]]. This effect cannot be reversed.",
    special: "When calculating effects such as damage, healing, or shields, your Strength calculation result +[[value]]17%[[/]] (+)",
    isAttribute: false,
    weight: 100,
    iconName: "str_man",
    icon: "/relics/main-effect-str-man.png",
    rolls: [],
  },
  {
    slug: "main-effect-thick-shell",
    gameId: "core_main_effect_thick_shell",
    name: "Thick Carapace",
    description: "Armor increased by [[value]]2–30[[/]]+[[value]]2–30%[[/]]. Every [[value]]2[[/]] armor also provides [[value]]0.1–1.5[[/]] damage block, blocking up to [[value]]45[[/]]% of incoming damage.",
    special: "Maximum block rate increased by [[value]]30%[[/]] (+)",
    isAttribute: false,
    weight: 100,
    iconName: "thick_shell",
    icon: "/relics/main-effect-thick-shell.png",
    rolls: [
      {
        key: "base",
        min: [
          2,
          3,
          4,
          5,
        ],
        max: [
          8,
          16,
          24,
          30,
        ],
      },
      {
        key: "pct",
        min: [
          2,
          3,
          4,
          5,
        ],
        max: [
          8,
          16,
          24,
          30,
        ],
      },
      {
        key: "block",
        min: [
          0.1,
          0.1,
          0.1,
          0.1,
        ],
        max: [
          0.6,
          0.9,
          1.2,
          1.5,
        ],
      },
    ],
  },
  {
    slug: "main-effect-thirsty",
    gameId: "core_main_effect_thirsty",
    name: "Thirst",
    description: "Grants [[value]]2–30%[[/]] Lifesteal from all damage sources. While Health is above [[value]]50%[[/]], dealing damage consumes [[value]]4%[[/]] of Max Health to amplify final damage by [[value]]3–25%[[/]]. This effect has a minimum interval of [[value]]0.2[[/]] seconds.",
    special: "-[[value]]15%[[/]] Lifesteal Decay against normal enemies.",
    isAttribute: false,
    weight: 100,
    iconName: "thirsty",
    icon: "/relics/main-effect-thirsty.png",
    rolls: [
      {
        key: "value",
        min: [
          2,
          3,
          4,
          5,
        ],
        max: [
          12,
          18,
          24,
          30,
        ],
      },
      {
        key: "damage",
        min: [
          3,
          3,
          3,
          3,
        ],
        max: [
          10,
          15,
          20,
          25,
        ],
      },
    ],
  },
  {
    slug: "main-effect-blood-of-the-troll",
    gameId: "core_main_effect_blood_of_the_troll",
    name: "Troll Blood",
    description: "If you take no damage for [[value]]5[[/]] seconds and are not at full Health, gain [[value]]0.4–6%[[/]] Health Regeneration per second.",
    special: "Grants [[value]]50%[[/]] effect even when restoration conditions are not met.",
    isAttribute: false,
    weight: 100,
    iconName: "blood_of_the_troll",
    icon: "/relics/main-effect-blood-of-the-troll.png",
    rolls: [
      {
        key: "value",
        min: [
          0.4,
          0.6,
          0.8,
          1,
        ],
        max: [
          3,
          4,
          5,
          6,
        ],
      },
    ],
  },
  {
    slug: "main-effect-unity",
    gameId: "core_main_effect_unity",
    name: "Unity Prevails",
    description: "Upon entering Act III, immediately level up by [[value]]1–6[[/]] levels.",
    special: "Gain +[[value]]4[[/]] to all attributes for every [[value]]1[[/]] unspent ability points.",
    isAttribute: false,
    weight: 100,
    iconName: "unity",
    icon: "/relics/main-effect-unity.png",
    rolls: [
      {
        key: "value",
        min: [
          1,
          1,
          1,
          1,
        ],
        max: [
          3,
          4,
          5,
          6,
        ],
      },
    ],
  },
  {
    slug: "main-effect-gullet-of-greed",
    gameId: "core_main_effect_gullet_of_greed",
    name: "Unsatiated Gullet",
    description: "Continuously digests one enemy within a [[value]]1300[[/]] radius, dealing magic damage equal to [[value]]20–50%[[/]] of your Health Regeneration per second. While digesting, you gain [[value]]2%[[/]] Health Regeneration AMP per second, up to [[value]]30%[[/]].",
    special: "Digests [[value]]1[[/]] additional targets.",
    isAttribute: false,
    weight: 0,
    iconName: "gullet_of_greed",
    icon: "/relics/main-effect-gullet-of-greed.png",
    rolls: [
      {
        key: "pct",
        min: [
          20,
        ],
        max: [
          50,
        ],
      },
    ],
  },
  {
    slug: "main-effect-stranger-things",
    gameId: "core_main_effect_stranger_things",
    name: "Untouchable Presence",
    description: "Reduces the movement speed of enemies within [[value]]500[[/]] range based on their proximity to you, slowing them by up to ([[value]]11–60[[/]] + [[value]]5–16%[[/]]). Additionally, damage you take from them is reduced by up to [[value]]4–25%[[/]].",
    special: "The slow effect no longer decays, and enemies affected by it take [[value]]10%[[/]] bonus damage.",
    isAttribute: false,
    weight: 100,
    iconName: "stranger_things",
    icon: "/relics/main-effect-stranger-things.png",
    rolls: [
      {
        key: "value",
        min: [
          11,
          14,
          17,
          20,
        ],
        max: [
          30,
          40,
          50,
          60,
        ],
      },
      {
        key: "pct",
        min: [
          5,
          6,
          7,
          8,
        ],
        max: [
          10,
          12,
          14,
          16,
        ],
      },
      {
        key: "incoming_pct",
        min: [
          4,
          6,
          8,
          10,
        ],
        max: [
          13,
          17,
          21,
          25,
        ],
      },
    ],
  },
  {
    slug: "main-effect-void-codex",
    gameId: "core_main_effect_void_codex",
    name: "Void Codex",
    description: "Casting has a [[value]]25%[[/]] chance to reduce other Abilities' cooldown by [[value]]5–15%[[/]]. Does not affect Ultimates.",
    special: "Has [[value]]20%[[/]] effect on Ultimates.",
    isAttribute: false,
    weight: 100,
    iconName: "void_codex",
    icon: "/relics/main-effect-void-codex.png",
    rolls: [
      {
        key: "cooldown",
        min: [
          5,
        ],
        max: [
          15,
        ],
      },
    ],
  },
  {
    slug: "main-effect-bottle-4",
    gameId: "core_main_effect_bottle_4",
    name: "Widespread Bottle",
    description: "The Bottle additionally affects the nearest other allied hero within [[value]]200–700[[/]] range of the target.",
    special: "Removes the application range limit, allowing the Bottle to be used globally. Unlocks the ability to use the Bottle on other units in Endless Mode.",
    isAttribute: false,
    weight: 100,
    iconName: "bottle_4",
    icon: "/relics/main-effect-bottle-4.png",
    rolls: [
      {
        key: "value",
        min: [
          200,
        ],
        max: [
          700,
        ],
      },
    ],
  },
  {
    slug: "attribute-spell-damage",
    gameId: "core_attribute_spell_damage",
    name: "Arcane",
    description: "+[[value]]5–15%[[/]] Spell Amplification",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          5,
        ],
        max: [
          15,
        ],
      },
    ],
  },
  {
    slug: "attribute-life-steal",
    gameId: "core_attribute_life_steal",
    name: "Bloodline",
    description: "+[[value]]8–12%[[/]] Lifesteal",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          8,
        ],
        max: [
          12,
        ],
      },
    ],
  },
  {
    slug: "attribute-cast-range",
    gameId: "core_attribute_cast_range",
    name: "Boundless",
    description: "+[[value]]75–180[[/]] Cast Range",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          75,
        ],
        max: [
          180,
        ],
      },
    ],
  },
  {
    slug: "attribute-agi",
    gameId: "core_attribute_agi",
    name: "Celerity",
    description: "+[[value]]4–12[[/]] Agility",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          4,
        ],
        max: [
          12,
        ],
      },
    ],
  },
  {
    slug: "attribute-buff-duration",
    gameId: "core_attribute_buff_duration",
    name: "Continuance",
    description: "+[[value]]8–16%[[/]] Buff Duration",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          8,
        ],
        max: [
          16,
        ],
      },
    ],
  },
  {
    slug: "attribute-luck",
    gameId: "core_attribute_luck",
    name: "Destiny",
    description: "+[[value]]10–20[[/]] Luck",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          10,
        ],
        max: [
          20,
        ],
      },
    ],
  },
  {
    slug: "attribute-attack-speed",
    gameId: "core_attribute_attack_speed",
    name: "Dexterity",
    description: "+[[value]]15–40[[/]] Attack Speed",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          15,
        ],
        max: [
          40,
        ],
      },
    ],
  },
  {
    slug: "attribute-cast-point",
    gameId: "core_attribute_cast_point",
    name: "Divine Chant",
    description: "+[[value]]1–16%[[/]] Cast Speed",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          1,
          1,
          1,
          1,
        ],
        max: [
          8,
          10,
          12,
          16,
        ],
      },
    ],
  },
  {
    slug: "attribute-summon-amp",
    gameId: "core_attribute_summon_amp",
    name: "Dominion",
    description: "+[[value]]5–10%[[/]] Summon AMP",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          5,
        ],
        max: [
          10,
        ],
      },
    ],
  },
  {
    slug: "attribute-debuff-duration",
    gameId: "core_attribute_debuff_duration",
    name: "Eternity",
    description: "+[[value]]8–16%[[/]] Debuff Duration",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          8,
        ],
        max: [
          16,
        ],
      },
    ],
  },
  {
    slug: "attribute-all-attribute-per-level",
    gameId: "core_attribute_all_attribute_per_level",
    name: "Evolution",
    description: "+[[value]]0.3–1[[/]] All Attributes per Level",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          0.3,
        ],
        max: [
          1,
        ],
      },
    ],
  },
  {
    slug: "attribute-atk",
    gameId: "core_attribute_atk",
    name: "Fangs",
    description: "+[[value]]10–25[[/]] Basic Attack Damage",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          10,
        ],
        max: [
          25,
        ],
      },
    ],
  },
  {
    slug: "attribute-range-attack-range",
    gameId: "core_attribute_range_attack_range",
    name: "Far Shot",
    description: "+[[value]]50–125[[/]] Ranged Attack Range",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          50,
        ],
        max: [
          125,
        ],
      },
    ],
  },
  {
    slug: "attribute-move-speed",
    gameId: "core_attribute_move_speed",
    name: "Fleetfooted",
    description: "+[[value]]15–40[[/]] Movement Speed",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          15,
        ],
        max: [
          40,
        ],
      },
    ],
  },
  {
    slug: "attribute-bonus-gold",
    gameId: "core_attribute_bonus_gold",
    name: "Greed",
    description: "+[[value]]5–12%[[/]] Stage Gold Rewards",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          5,
        ],
        max: [
          12,
        ],
      },
    ],
  },
  {
    slug: "attribute-armor",
    gameId: "core_attribute_armor",
    name: "Hardness",
    description: "+[[value]]2–8[[/]] Armor",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          2,
        ],
        max: [
          8,
        ],
      },
    ],
  },
  {
    slug: "attribute-int",
    gameId: "core_attribute_int",
    name: "Insight",
    description: "+[[value]]4–12[[/]] Intelligence",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          4,
        ],
        max: [
          12,
        ],
      },
    ],
  },
  {
    slug: "attribute-melee-attack-range",
    gameId: "core_attribute_melee_attack_range",
    name: "Long Reach",
    description: "+[[value]]25–80[[/]] Melee Attack Range",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          25,
        ],
        max: [
          80,
        ],
      },
    ],
  },
  {
    slug: "attribute-bonus-mana",
    gameId: "core_attribute_bonus_mana",
    name: "Mana",
    description: "+[[value]]80–240[[/]] Max MP",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          80,
        ],
        max: [
          240,
        ],
      },
    ],
  },
  {
    slug: "attribute-bonus-mana-regen-con",
    gameId: "core_attribute_bonus_mana_regen_con",
    name: "Meditation",
    description: "+[[value]]2–6[[/]] Mana Regeneration",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          2,
        ],
        max: [
          6,
        ],
      },
    ],
  },
  {
    slug: "attribute-bonus-mana-regen-amp",
    gameId: "core_attribute_bonus_mana_regen_amp",
    name: "Meditation Ω",
    description: "+[[value]]5–15%[[/]] Mana Regeneration",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          5,
        ],
        max: [
          15,
        ],
      },
    ],
  },
  {
    slug: "attribute-str",
    gameId: "core_attribute_str",
    name: "Might",
    description: "+[[value]]4–12[[/]] Strength",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          4,
        ],
        max: [
          12,
        ],
      },
    ],
  },
  {
    slug: "attribute-heal-amp",
    gameId: "core_attribute_heal_amp",
    name: "Rejuvenation",
    description: "+[[value]]5–10%[[/]] Healing Effect",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          5,
        ],
        max: [
          10,
        ],
      },
    ],
  },
  {
    slug: "attribute-magical-res",
    gameId: "core_attribute_magical_res",
    name: "Spell Resistance",
    description: "+[[value]]6–15[[/]] Magic Armor",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          6,
        ],
        max: [
          15,
        ],
      },
    ],
  },
  {
    slug: "attribute-default1",
    gameId: "core_attribute_default1",
    name: "Starting Gold",
    description: "Gold + [[value]]500[[/]]",
    isAttribute: true,
    weight: 0,
    iconName: null,
    icon: null,
    rolls: [],
  },
  {
    slug: "attribute-default2",
    gameId: "core_attribute_default2",
    name: "Starting Gold",
    description: "Gold + [[value]]1000[[/]]",
    isAttribute: true,
    weight: 0,
    iconName: null,
    icon: null,
    rolls: [],
  },
  {
    slug: "attribute-default3",
    gameId: "core_attribute_default3",
    name: "Starting Gold",
    description: "Gold + [[value]]2000[[/]]",
    isAttribute: true,
    weight: 0,
    iconName: null,
    icon: null,
    rolls: [],
  },
  {
    slug: "attribute-bonus-health-regen",
    gameId: "core_attribute_bonus_health_regen",
    name: "Vigor",
    description: "+[[value]]4–12[[/]] Health Regeneration",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          4,
        ],
        max: [
          12,
        ],
      },
    ],
  },
  {
    slug: "attribute-bonus-health-regen-amp",
    gameId: "core_attribute_bonus_health_regen_amp",
    name: "Vigor Ω",
    description: "+[[value]]5–15%[[/]] Health Regeneration",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          5,
        ],
        max: [
          15,
        ],
      },
    ],
  },
  {
    slug: "attribute-bonus-health",
    gameId: "core_attribute_bonus_health",
    name: "Vitality",
    description: "+[[value]]100–300[[/]] Max HP",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          100,
        ],
        max: [
          300,
        ],
      },
    ],
  },
  {
    slug: "attribute-aoe-radius-pct",
    gameId: "core_attribute_aoe_radius_pct",
    name: "Widespread",
    description: "+[[value]]5–10%[[/]] AoE",
    isAttribute: true,
    weight: 100,
    iconName: null,
    icon: null,
    rolls: [
      {
        key: "value",
        min: [
          5,
        ],
        max: [
          10,
        ],
      },
    ],
  },
]
