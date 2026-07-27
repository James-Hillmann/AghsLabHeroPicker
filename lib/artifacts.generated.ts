// GENERATED FILE -- do not edit.
//
// Written by scripts/generate-catalogue.mjs, read straight out of the game files for
// Aghanim's Labyrinth III: Crisis of Infinite Dimensions (Steam workshop item 2483181385).
// Re-run `npm run catalogue:generate` after a game update; the diff is the changelog.

export const ERAS = ['origin', 'genesis', 'middle', 'post'] as const

export type Era = (typeof ERAS)[number]

/**
 * One line of the stat block. Values scale with the artifact's level:
 *
 *     value = base + perLevel * level
 *
 * Hat of Moiret reads +36.9% Spell AMP at Lv. 23 because 30 + 0.3 * 23 = 36.9. The game
 * stores growth rather than a displayed number, which is what lets the page show any level.
 */
export type ArtifactStat = {
  name: string
  base: number
  perLevel: number
  unit?: '%'
}

export type ArtifactUpgrade = {
  level: number
  name: string
  description: string
  /** The smaller grey clarification some upgrades carry underneath. */
  note?: string
}

/** A named effect block on an artifact: a title, its text, and an optional clarification. */
export type ArtifactEffect = {
  name: string
  description: string
  /** The smaller grey mechanical detail the tooltip prints underneath. */
  note?: string
}

export type Artifact = {
  slug: string
  /** The game's own id, so a row can be traced back to the KV it came from. */
  gameId: string
  name: string
  era: Era
  icon: string
  /** The texture name inside the VPK, used by the icon extractor to match files up. */
  iconName: string | null
  /** Level cap. Mostly 40, but 50, 60 and 100 all occur -- it is not a constant. */
  maxLevel: number
  /** Required hero level. */
  heroLevel: number
  stats: ArtifactStat[]
  unique?: ArtifactEffect
  /** A second named effect, which only some artifacts define. */
  second?: ArtifactEffect
  upgrades: ArtifactUpgrade[]
  flavor?: string
  /**
   * Drop data. `chance` is this artifact's weight as a percentage of its pool's total,
   * so the numbers within one pool sum to 100.
   */
  drop?: {
    pool: string
    weight: number
    chance: number
    waveFrom?: number
    waveTo?: number
  }
  cost?: { dust: number; platinum?: number }
  requiredDifficulty?: number
  /** Readable acquisition routes, from the game's FromList tags. */
  sources: string[]
}

export const ARTIFACTS: Artifact[] = [
  {
    slug: "ripper",
    gameId: "item_artifact_ripper",
    name: "Advanced Blades Of Attack",
    era: "origin",
    icon: "/artifacts/ripper.png",
    iconName: "ripper",
    maxLevel: 40,
    heroLevel: 1,
    stats: [
      {
        name: "Attack Damage",
        base: 18,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Slice and Dice",
      description: "Melee attacks cleave nearby enemies, dealing [[value]]15%[[/]] damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Bloodthirst",
        description: "+[[value]]8%[[/]] Attack Lifesteal",
      },
      {
        level: 20,
        name: "Weakness Exploit",
        description: "Damage dealt against common enemies increased by [[value]]20%[[/]]",
      },
      {
        level: 40,
        name: "Malice",
        description: "After [[value]]4[[/]] Rounds, remove this Artifact and gain all its bonuses.",
      },
    ],
    flavor: "The infamous weapon once wielded by a notorious murderer. The resentment of its victims clings to the blades, and over time has granted them a faint, malevolent power.",
    cost: {
      dust: 15,
    },
    sources: [
      "Event · 7-Day Login Reward",
    ],
  },
  {
    slug: "necklace-of-true",
    gameId: "item_artifact_necklace_of_true",
    name: "Amulet of Truth",
    era: "origin",
    icon: "/artifacts/necklace-of-true.png",
    iconName: "necklace_of_true",
    maxLevel: 40,
    heroLevel: 3,
    stats: [
      {
        name: "Vision Radius",
        base: 18,
        perLevel: 0.3,
        unit: "%",
      },
    ],
    unique: {
      name: "True Sight",
      description: "Grants True Sight within a [[value]]500[[/]] radius.",
    },
    upgrades: [
      {
        level: 10,
        name: "Dispel",
        description: "Enemies within True Sight range have their Armor reduced by [[value]]5[[/]] and Magic Armor reduced by [[value]]10[[/]].",
      },
      {
        level: 20,
        name: "Recovery",
        description: "Applies a basic dispel to enemies within the [[ref]]True Sight[[/]] radius, each dispelled debuff bring a [[value]]7[[/]] second cooldown before it can be dispelled again on the same target",
      },
      {
        level: 30,
        name: "Extension",
        description: "[[ref]]True Sight[[/]] radius increased by [[value]]10%[[/]] of your vision range",
      },
      {
        level: 40,
        name: "Reversion",
        description: "[[ref]]Recovery[[/]] can be applied to allies",
      },
    ],
    flavor: "A necklace that symbolizes truth before which all falsehoods are revealed and every lie is exposed.",
    drop: {
      pool: "General",
      weight: 1000,
      chance: 3.2906,
      waveFrom: 0,
      waveTo: 6,
    },
    cost: {
      dust: 15,
      platinum: 800,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "star-mirror",
    gameId: "item_artifact_star_mirror",
    name: "Celestial Mirror · Enteleus",
    era: "origin",
    icon: "/artifacts/star-mirror.png",
    iconName: "star_mirror",
    maxLevel: 40,
    heroLevel: 3,
    stats: [
      {
        name: "All Attributes",
        base: 8,
        perLevel: 0.1,
      },
    ],
    unique: {
      name: "Celestial Mirror",
      description: "Stage terrain is always in an explored state.",
    },
    upgrades: [
      {
        level: 10,
        name: "Celestial Shield",
        description: "At the start of each Stage, gain [Stage Depth] × [[value]]200[[/]]",
      },
      {
        level: 20,
        name: "Essence Reflection",
        description: "+[[value]]20%[[/]] chance for double drops from [[icon:tooltip/crate]]Chest[[/]]",
      },
      {
        level: 30,
        name: "Flux Mirror",
        description: "After [[value]]15[[/]] seconds without taking damage, recover [[value]]5%[[/]] %[[ref]]Celestial Shield[[/]] per [[value]]1[[/]] seconds. Caps at [[value]]50%[[/]].",
      },
      {
        level: 40,
        name: "Celestial Revelation",
        description: "Reveal the entire map at the start of each Stage for [[value]]60[[/]] seconds (Stackable)",
      },
    ],
    flavor: "Starlight resonates, compresses, and merges with fragments of sages’ wandering souls and the ever-shifting geometry of the corridor itself, eventually cooling and solidifying into a Celestial Mirror neither metal nor jade.",
    drop: {
      pool: "General",
      weight: 1000,
      chance: 3.2906,
      waveFrom: 0,
      waveTo: 6,
    },
    cost: {
      dust: 15,
      platinum: 800,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "eden-anvil",
    gameId: "item_artifact_eden_anvil",
    name: "Eden Anvil",
    era: "origin",
    icon: "/artifacts/eden-anvil.png",
    iconName: "eden_anvil",
    maxLevel: 40,
    heroLevel: 3,
    stats: [
      {
        name: "Armor",
        base: 6,
        perLevel: 0.1,
      },
    ],
    unique: {
      name: "Forge",
      description: "For each [[value]]5[[/]] [[icon:tooltip/aghs-shard]]Scepter Shard[[/]] Selections, one of the selection is converted into [[icon:tooltip/aghs-shard-elite]]Elite Scepter Shard[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Rare Forge",
        description: "+[[value]]8%[[/]] chance to trigger [[ref]]Forge[[/]]",
      },
      {
        level: 20,
        name: "Mythic Forge",
        description: "Every [[value]]7[[/]] Stages, gain one [[ref]]Ascend[[/]] that converts [[icon:tooltip/aghs-shard]]Scepter Shard[[/]] into [[icon:tooltip/aghs-shard-elite]]Elite Scepter Shard[[/]].",
      },
      {
        level: 30,
        name: "Immortal Forge",
        description: "When [[ref]]Forge[[/]] is triggered, permanently gain [[value]]2[[/]] Armor.",
      },
      {
        level: 40,
        name: "Legendary Forge",
        description: "Upon first retrieval, gain [[value]]1[[/]] [[ref]]Ascend[[/]].",
      },
    ],
    flavor: "A legendary anvil said to be capable of forging something powerful.",
    drop: {
      pool: "General",
      weight: 1000,
      chance: 3.2906,
      waveFrom: 0,
      waveTo: 6,
    },
    cost: {
      dust: 15,
      platinum: 800,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "eye-of-the-pharaoh",
    gameId: "item_artifact_eye_of_the_pharaoh",
    name: "Eye of the Pharaoh",
    era: "origin",
    icon: "/artifacts/eye-of-the-pharaoh.png",
    iconName: "eye_of_the_pharaoh",
    maxLevel: 40,
    heroLevel: 3,
    stats: [
      {
        name: "Round End Gold",
        base: 8,
        perLevel: 0.1,
        unit: "%",
      },
      {
        name: "All Attributes",
        base: 4,
        perLevel: 0.1,
      },
    ],
    unique: {
      name: "Greed Up",
      description: "Each Stage, [[value]]18%[[/]] of the gold from the reward is stored. If at least [[value]]200[[/]]/[[value]]500[[/]] gold is stored each time, this Artifact grants an additional [[value]]1[[/]]/[[value]]2[[/]] all Attributes.",
    },
    upgrades: [
      {
        level: 10,
        name: "Minimum Standard",
        description: "Store at least [[value]]200[[/]] gold each time. If insufficient, the remaining amount is deducted from gold held.",
      },
      {
        level: 20,
        name: "Fair Exchange",
        description: "For every [[value]]1000[[/]] gold stored, gain an Attribute Tome related to Primary Attributes.",
      },
      {
        level: 30,
        name: "Royal Interest",
        description: "Each Stage passed increases stored gold by [[value]]20%[[/]].",
      },
      {
        level: 40,
        name: "Withdraw Fund",
        description: "When purchasing items from visitors at the relay station—[Misfortune Teller], [Immortal Authority], [Astral Alchemist]—priority is given to using the gold accumulated by [[ref]]Greed Up[[/]].",
      },
    ],
    flavor: "They believed this eye could see everything for the king—lies, shadows, and the betrayal lurking beneath the throne. However, with the dynasty's fall, this ring was lost in the endless sea of sand.",
    drop: {
      pool: "General",
      weight: 300,
      chance: 0.9872,
      waveFrom: 0,
      waveTo: 6,
    },
    cost: {
      dust: 15,
      platinum: 1000,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "fungal-kingdom",
    gameId: "item_artifact_fungal_kingdom",
    name: "Fungal Realm",
    era: "origin",
    icon: "/artifacts/fungal-kingdom.png",
    iconName: "fungal_kingdom",
    maxLevel: 40,
    heroLevel: 1,
    stats: [
      {
        name: "Mana",
        base: 100,
        perLevel: 1,
      },
      {
        name: "Mana Regeneration",
        base: 3,
        perLevel: 0.05,
      },
    ],
    unique: {
      name: "Mana Shroom",
      description: "At the end of each stage, harvest points appear.Alt + Left Mouse the status icon to pick the mushrooms.Mushrooms grant permanent attributes. Their quality and quantity are based on the mana cost during the stage. Yield scales with mana spent.",
      note: "Yield scales with mana spent compared to your max mana. Once you eat a certain type of shroom, that shroom type becomes more likely to spawn in future harvests.",
    },
    upgrades: [
      {
        level: 10,
        name: "Ah. Nutrients.",
        description: "This Artifact can be activated to spend [[value]]550[[/]] and increase mushroom yield. Can be used up to [[value]]2[[/]] times per stage.",
      },
      {
        level: 20,
        name: "Ah. Big bite.",
        description: "When Centaur Warrunner is present and equips the Legendary shard [Free Ride], increases shroom yield (and maximum yield).",
      },
      {
        level: 30,
        name: "Good for one is good. Good for all is best.",
        description: "Eating a shroom grants your allies [[value]]33%[[/]] of its bonus.",
      },
      {
        level: 40,
        name: "Verdant Growth",
        description: "After producing [[value]]12[[/]] shrooms, if you are also carrying [[icon:artifacts/seed-of-rebirth]]Seed of Rebirth[[/]], it will count as having completed [[value]]2[[/]] stages of growth. If not, each subsequent stage will instead produce an additional [[value]]1[[/]] shrooms per stage.",
      },
    ],
    flavor: "Most poor souls who get infested turn into inhuman monsters. The fungus can take over the host's brain and control them. But a few lucky ones with special physiques have it different. After being infected, shrooms sprout from their arms — and those are premium nutrients.",
    drop: {
      pool: "General",
      weight: 300,
      chance: 0.9872,
      waveFrom: 0,
      waveTo: 6,
    },
    cost: {
      dust: 15,
      platinum: 1000,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "galaxy-compass",
    gameId: "item_artifact_galaxy_compass",
    name: "Galaxy Compass",
    era: "origin",
    icon: "/artifacts/galaxy-compass.png",
    iconName: "galaxy_compass",
    maxLevel: 50,
    heroLevel: 1,
    stats: [
      {
        name: "All Attributes",
        base: 8,
        perLevel: 0.1,
      },
    ],
    unique: {
      name: "Outcome Focus",
      description: "Artifact XP gained increased by [[value]]20%[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Metric",
        description: "After Act II, [[ref]]Outcome Focus[[/]] effect increased by [[value]]20%[[/]].",
      },
      {
        level: 20,
        name: "Guidance",
        description: "Other Artifacts gain XP even when inactive while this Artifact is equipped.",
      },
      {
        level: 30,
        name: "Null Defiance",
        description: "[[ref]]Metric[[/]] activates after Act 1",
      },
      {
        level: 40,
        name: "Galactic Beacon",
        description: "Every [[value]]60[[/]] seconds, an other equipped Artifact gain [[value]]30[[/]] flat Artifact XP.",
        note: "The Artifact XP gained is a fixed value and is not affected or modified by any effects.",
      },
      {
        level: 50,
        name: "Cosmic Beacon",
        description: "This artifact No longer gains XP when possible. Instead, [[ref]]Galactic Beacon[[/]] grants [[value]]0.5%[[/]] of the missing XP each time, up to a maximum of [[value]]20[[/]].",
      },
    ],
    flavor: "An entire galaxy is contained within the curved glass of this compass, guiding you toward things you have yet to discover.",
    cost: {
      dust: 15,
    },
    sources: [
      "Event · 7-Day Login Reward",
    ],
  },
  {
    slug: "graxxs-strap",
    gameId: "item_artifact_graxxs_strap",
    name: "Graxxs Strap",
    era: "origin",
    icon: "/artifacts/graxxs-strap.png",
    iconName: "graxxs_strap",
    maxLevel: 40,
    heroLevel: 1,
    stats: [
      {
        name: "Strength",
        base: 8,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Arena Champion",
      description: "Gain [[value]]1[[/]] stacks of [[ref]]Arena Champion[[/]] for every [[value]]1[[/]] stages cleared. Each stack grants +[[value]]40[[/]] maximum health and +[[value]]0.6%[[/]] maximum health. Lose [[value]]50%[[/]] of your stacks each time you die.",
    },
    upgrades: [
      {
        level: 10,
        name: "Arena Bout",
        description: "Each stack of [[ref]]Arena Champion[[/]] additionally grants +[[value]]1[[/]] to all attributes",
      },
      {
        level: 20,
        name: "Unyielding",
        description: "Up to [[value]]1[[/]] times, if you can be revived after dying, you will not lose the bonuses from [[ref]]Arena Champion[[/]]",
      },
      {
        level: 30,
        name: "Undisputed Champion",
        description: "During a Stage, if you deal more than [[value]]50%[[/]] of your team's total damage, gain an additional [[value]]2[[/]] stacks of [[ref]]Arena Champion[[/]]",
      },
      {
        level: 40,
        name: "Declaration of Victory",
        description: "This Artifact can be activated. You take [[value]]75%[[/]] additional damage and your final damage is reduced by [[value]]40%[[/]]. For the next [[value]]2[[/]] combat stages, you must contribute more than [[value]]40%[[/]] of your team's total damage without dying. Upon fulfilling these conditions, permanently extract the bonuses currently accumulated by [[ref]]Arena Champion[[/]]",
        note: "After completing [[ref]]Declaration of Victory[[/]], dying will not cause the extracted bonuses to be lost. There is no penalty for failing the declaration",
      },
    ],
    flavor: "This is the great Belt of Omex, the pinnacle of gladiatorial skill and a wellspring of fighting spirit.",
    cost: {
      dust: 15,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · DOTA",
    ],
  },
  {
    slug: "covetous-silver-serpent-ring",
    gameId: "item_artifact_covetous_silver_serpent_ring",
    name: "Greed Ring",
    era: "origin",
    icon: "/artifacts/covetous-silver-serpent-ring.png",
    iconName: "covetous_silver_serpent_ring",
    maxLevel: 40,
    heroLevel: 3,
    stats: [
      {
        name: "Round End Gold",
        base: 20,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "[Curse]Shackles of Greed",
      description: "Upon entering a Stage, if your gold is less than ([[value]]400[[/]] + Hero Level × [[value]]100[[/]]), the base bonus does not take effect.",
      note: "If this Artifact is equipped during a Stage, the judgment triggers immediately.",
    },
    upgrades: [
      {
        level: 10,
        name: "Obsession",
        description: "Gain [[value]]150[[/]] bonus Gold per Stage",
      },
      {
        level: 20,
        name: "Proliferation of Greed",
        description: "After [[ref]][Curse]Shackles of Greed[[/]] triggers, bonus and gold requirement are increased by [[value]]4%[[/]]",
      },
      {
        level: 30,
        name: "Resistance to Greed",
        description: "Once every [[value]]3[[/]] Rounds, when [[ref]][Curse]Shackles of Greed[[/]] triggers, the base bonus will take effect still",
      },
      {
        level: 40,
        name: "Satisfaction of Greed",
        description: "After holding [[value]]10000[[/]] gold, remove this Artifact and gain all of its effects.",
      },
    ],
    flavor: "Snakes are known as creatures of great avarice, devouring prey even larger than themselves by swallowing them whole.If one's shackles are cause for discontent, perhaps it is time for some old-fashioned greed.",
    cost: {
      dust: 15,
    },
    sources: [
      "Drops from Astral Vault · Darkmoon Guidance",
    ],
  },
  {
    slug: "potion-of-planar-in-fusions",
    gameId: "item_artifact_potion_of_planar_in_fusions",
    name: "Harmony Elixir",
    era: "origin",
    icon: "/artifacts/potion-of-planar-in-fusions.png",
    iconName: "potion_of_planar_in_fusions",
    maxLevel: 40,
    heroLevel: 1,
    stats: [
      {
        name: "Bottle Regen AMP",
        base: 15,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Bottle Enchantment",
      description: "[[color:#ffa764]]+[[value]]1[[/]] Bottle max charges[[/]]The Bottle's target gains [[value]]15%[[/]] Spell AMP, stacking independently for [[value]]40[[/]] seconds.",
    },
    upgrades: [
      {
        level: 10,
        name: "Phase",
        description: "[[ref]]Bottle Enchantment[[/]] grants Phase movement and +[[value]]40%[[/]] MS",
      },
      {
        level: 20,
        name: "Harmony",
        description: "The Bottle applies a dispel",
      },
      {
        level: 30,
        name: "Perfect",
        description: "The target can completely negate one instance of damage that exceeds [[value]]20%[[/]] of Max HP.",
      },
      {
        level: 40,
        name: "Flawless",
        description: "When the Bottle has at least [[value]]4[[/]] charges its restoration effect becomes [[value]]135%[[/]].",
      },
    ],
    flavor: "This silvery liquid is meticulously extracted from contact with starlight within black holes, and sounds in the vacuum. When left to rest, it forms a swirling spiral galaxy. Remarkably, the liquid replenishes itself even after some of it is consumed.",
    drop: {
      pool: "General",
      weight: 1000,
      chance: 3.2906,
      waveFrom: 0,
      waveTo: 6,
    },
    cost: {
      dust: 15,
      platinum: 800,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "magnuss-frying-pan",
    gameId: "item_artifact_magnuss_frying_pan",
    name: "Magnus's Frying Pan",
    era: "origin",
    icon: "/artifacts/magnuss-frying-pan.png",
    iconName: "magnuss_frying_pan",
    maxLevel: 40,
    heroLevel: 1,
    stats: [
      {
        name: "Round End Gold",
        base: 10,
        perLevel: 0.1,
        unit: "%",
      },
      {
        name: "Mana Regeneration",
        base: 2,
        perLevel: 0.04,
      },
    ],
    unique: {
      name: "Chef's Toss",
      description: "Mushrooms gathered from [[icon:artifacts/fungal-kingdom]]Fungal Realm[[/]] — Fungal Kingdom — may be stir-fried at the end of each round if left in your inventory, becoming far more potent restorative meals. Adding [Faerie Fire] and [Mango] as seasoning ingredients can create even greater delicacies.",
    },
    upgrades: [
      {
        level: 10,
        name: "My horns become sharper",
        description: "Upon completing a stage, special cooking ingredients may be uncovered. They may be sold immediately or preserved for the next meal.",
      },
      {
        level: 20,
        name: "Sharing is Caring",
        description: "Meals you prepare may also be shared with allied players.",
      },
      {
        level: 30,
        name: "Exclusive Cookware",
        description: "Cooking efficiency is increased while playing Magnus.",
      },
      {
        level: 40,
        name: "Buy Ingredients",
        description: "Artifacts can be unlocked, allowing special ingredients to be purchased from the Interdimensional Bazaar.",
      },
    ],
    flavor: "Centaur Rhinos were once hunted for their prized horns, driven to the brink of extinction by greedy hands. Then came that infamous year. Ever since, no one has dared hunt them again—for fear of ending up as the main course in the Rhino’s stew pot.",
    drop: {
      pool: "General",
      weight: 300,
      chance: 0.9872,
      waveFrom: 0,
      waveTo: 6,
    },
    cost: {
      dust: 15,
      platinum: 1000,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "mystery",
    gameId: "item_artifact_mystery",
    name: "Mystery",
    era: "origin",
    icon: "/artifacts/mystery.png",
    iconName: "mystery",
    maxLevel: 40,
    heroLevel: 1,
    stats: [
      {
        name: "Luck",
        base: 12,
        perLevel: 0.2,
      },
      {
        name: "Mana Regeneration",
        base: 3,
        perLevel: 0.05,
      },
    ],
    unique: {
      name: "Omen",
      description: "Activates after 1 Round. Grants [[value]]1[[/]] [[icon:tooltip/aghs-shard]]Scepter Shard[[/]] Options.",
    },
    upgrades: [
      {
        level: 10,
        name: "Fated Preference",
        description: "+[[value]]50%[[/]] XP Gained from this Artifact",
      },
      {
        level: 20,
        name: "Twist of Fate",
        description: "Grants [[value]]1[[/]] [[icon:tooltip/aghs-shard]]Scepter Shard[[/]] refreshes every [[value]]4[[/]] Stages",
      },
      {
        level: 30,
        name: "Bias",
        description: "+[[value]]50%[[/]] chance for [[icon:tooltip/crate]]Chest[[/]] to drop rare items",
      },
      {
        level: 40,
        name: "Greater Omen",
        description: "[[ref]]Omen[[/]]+[[value]]1[[/]] [[icon:tooltip/aghs-shard-legendary]]Legendary Scepter Shard[[/]] options",
      },
    ],
    flavor: "A candle formed from mysterious matter. As it burns, it reveals a miniature starry sky, within which truth resides.",
    cost: {
      dust: 15,
    },
    sources: [
      "Event · Path of Guidance · Initial Guidance Ultimate Reward",
    ],
  },
  {
    slug: "pale-incarnation",
    gameId: "item_artifact_pale_incarnation",
    name: "Pale Incarnation",
    era: "origin",
    icon: "/artifacts/pale-incarnation.png",
    iconName: "pale_incarnation",
    maxLevel: 40,
    heroLevel: 1,
    stats: [
      {
        name: "Strength",
        base: 8,
        perLevel: 0.1,
      },
    ],
    unique: {
      name: "Lesser Decay",
      description: "Your next attack releases Decay, dealing [[[value]]50[[/]] + [[value]]75%[[/]] of your Strength] damage to enemies within the range. Each trigger grants [[value]]2[[/]] temporary Strength. Stacks independently and lasts [[value]]30[[/]] seconds.",
    },
    upgrades: [],
    flavor: "The right hand of the Immortal, hosting the power of death...Guide death once more. Whether it's the death of the living, or the true death of the already dead.",
    drop: {
      pool: "General",
      weight: 1000,
      chance: 3.2906,
      waveFrom: 0,
      waveTo: 6,
    },
    cost: {
      dust: 15,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "precious-dragon-egg",
    gameId: "item_artifact_precious_dragon_egg",
    name: "Precious Fire Dragon Egg",
    era: "origin",
    icon: "/artifacts/precious-dragon-egg.png",
    iconName: "precious_dragon_egg",
    maxLevel: 100,
    heroLevel: 1,
    stats: [
      {
        name: "All Attributes",
        base: 4,
        perLevel: 0.08,
      },
    ],
    unique: {
      name: "Hatching Dragon Egg",
      description: "After [[value]]2[[/]] Stages, hatch a Young Red Dragon to aid you in combat.",
      note: "The Red Dragon follows you but is uncontrollable. Base Attack Damage:[[value]]40[[/]]. Each point of your all Attributes increases its base attack damage by [[value]]0.5[[/]]. Health: equal to [[value]]100%[[/]] of your Mana. Invulnerable. Resummoned at the start of each stage.",
    },
    second: {
      name: "Scar of the Sky Tyrant",
      description: "This Artifact can be upgraded to the [Prestige] Realm without Awakening.",
      note: "Can be upgraded to level 100.",
    },
    upgrades: [
      {
        level: 10,
        name: "Grow",
        description: "Every [[value]]1[[/]] Stages, additionally inherits [[value]]9%[[/]] Attributes",
      },
      {
        level: 20,
        name: "Juvenile Red Dragon",
        description: "After [[value]]3[[/]] [[ref]]Grow[[/]], attacks deal [[value]]40%[[/]] splash damage within a [[value]]300[[/]] radius",
      },
      {
        level: 30,
        name: "Sky Tyrant",
        description: "After [[value]]5[[/]] [[ref]]Grow[[/]], increases Attack Range by [[value]]400[[/]]",
      },
      {
        level: 40,
        name: "Adult Red Dragon",
        description: "After [[value]]7[[/]] [[ref]]Grow[[/]], every [[value]]6[[/]] attacks unleash a dash strike, dealing magic damage equal to [[value]]300%[[/]] of Attack Damage",
      },
      {
        level: 60,
        name: "Hatched Dragon Egg",
        description: "Starts already hatched",
      },
      {
        level: 80,
        name: "Ancient Might",
        description: "Starts with [[value]]4[[/]] [[ref]]Grow[[/]]",
      },
      {
        level: 100,
        name: "Faint Pulse",
        description: "A warm core pulses faintly, yet this trace of divine power has not awakened into a force that can manifest itself.",
      },
    ],
    flavor: "A dragon egg still in its infancy, radiating a faint warmth. With proper care, it may one day hatch into a true dragon.",
    drop: {
      pool: "General",
      weight: 30,
      chance: 0.0987,
      waveFrom: 0,
    },
    cost: {
      dust: 15,
      platinum: 2000,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "seed-of-rebirth",
    gameId: "item_artifact_seed_of_rebirth",
    name: "Seed of Rebirth",
    era: "origin",
    icon: "/artifacts/seed-of-rebirth.png",
    iconName: "seed_of_rebirth",
    maxLevel: 40,
    heroLevel: 1,
    stats: [
      {
        name: "Health Regeneration",
        base: 8,
        perLevel: 0.1,
      },
    ],
    unique: {
      name: "Rebirth",
      description: "Revives you [[value]]60[[/]] seconds after death. All effects are lost when Rebirth charges are depleted.",
      note: "Deaths in Trap Stages do not trigger this effect.",
    },
    second: {
      name: "Flourish",
      description: "+[[value]]1[[/]] Growth",
    },
    upgrades: [
      {
        level: 10,
        name: "Germinate",
        description: "After [[value]]3[[/]] consecutive Stages without [[ref]]Rebirth[[/]], Health Regeneration granted by this Artifact is increased by [[value]]100%[[/]].",
      },
      {
        level: 20,
        name: "Sapling",
        description: "After [[value]]2[[/]] consecutive Stages without [[ref]]Rebirth[[/]], grants [[value]]1[[/]] permanent growth.",
      },
      {
        level: 30,
        name: "Blossom",
        description: "After [[value]]2[[/]] consecutive Stages without [[ref]]Rebirth[[/]], each new Stage entered thereafter grants [[value]]1[[/]] permanent bonus level(s).",
      },
      {
        level: 40,
        name: "Fruit",
        description: "After [[value]]2[[/]] consecutive stages without [[ref]]Rebirth[[/]], this Artifact is removed. Grants [[value]]1[[/]] current and max HP Runes.Permanently grants all effects except [[ref]]Rebirth[[/]].",
      },
    ],
    flavor: "Some of us die. Others are born anew.",
    cost: {
      dust: 15,
    },
    sources: [
      "Drops from Astral Vault · Visitor from Outerworld",
    ],
  },
  {
    slug: "seekers-pendant",
    gameId: "item_artifact_seekers_pendant",
    name: "Seeker's Pendant",
    era: "origin",
    icon: "/artifacts/seekers-pendant.png",
    iconName: "seekers_pendant",
    maxLevel: 40,
    heroLevel: 1,
    stats: [
      {
        name: "Mana",
        base: 150,
        perLevel: 2,
      },
      {
        name: "Mana Regeneration",
        base: 2,
        perLevel: 0.08,
      },
    ],
    unique: {
      name: "Reserve Mana",
      description: "At the start of each Stage, regain [[value]]100%[[/]] [Stage Depth] + [[value]]300[[/]] points of Reserve Mana, which automatically restores when Mana falls below [[value]]70%[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Transposition",
        description: "After casting a spell, heal for [[value]]25%[[/]] of the Mana consumed.",
      },
      {
        level: 20,
        name: "Efficient Casting",
        description: "-[[value]]10%[[/]] Mana Cost",
      },
      {
        level: 40,
        name: "Fusion",
        description: "While carrying this Artifact, after the Hero levels up [[value]]7[[/]] times, this Artifact is removed and all its bonuses are permanently granted.",
      },
    ],
    flavor: "For young mages who have not yet mastered vast mana, this pendant is the most reliable companion. It quietly absorbs the ambient arcane aura, transforming it into a subtle yet persistent echo that slowly replenishes the wearer's mana. Many renowned archmages once relied on such a humble artifact.",
    drop: {
      pool: "General",
      weight: 1000,
      chance: 3.2906,
      waveFrom: 0,
      waveTo: 6,
    },
    cost: {
      dust: 15,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "the-chain-of-restraint",
    gameId: "item_artifact_the_chain_of_restraint",
    name: "Shackle Collar",
    era: "origin",
    icon: "/artifacts/the-chain-of-restraint.png",
    iconName: "the_chain_of_restraint",
    maxLevel: 40,
    heroLevel: 1,
    stats: [
      {
        name: "All Damage",
        base: 10,
        perLevel: -0.15,
        unit: "%",
      },
    ],
    unique: {
      name: "The Worthless",
      description: "Reduces damage dealt to gain [[value]]20%[[/]] bonus XP.",
    },
    upgrades: [
      {
        level: 10,
        name: "The Defiant",
        description: "Upon Rebirth, gain +[[value]]15%[[/]] this Stage",
      },
      {
        level: 20,
        name: "The Ascended",
        description: "+[[value]]0.8[[/]] Growth",
      },
      {
        level: 30,
        name: "The Breaker",
        description: "Upon first retrieval, its level is increased to [[value]]2[[/]]",
      },
      {
        level: 40,
        name: "The Unbound",
        description: "Can be actively used by spending [[value]]2000[[/]] gold to remove this Artifact and permanently grant +[[value]]20%[[/]] XP gain and +[[value]]0.8[[/]] Growth.",
        note: "Reacquiring this Artifact does not stack the bonuses.",
      },
    ],
    flavor: "The false gods understood the limits of mortal flesh and sought to steal divine power through shortcuts. They forged these chains, forcing their followers to wear them.",
    drop: {
      pool: "General",
      weight: 2000,
      chance: 6.5811,
      waveFrom: 0,
      waveTo: 4,
    },
    cost: {
      dust: 15,
      platinum: 800,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "flying-thief",
    gameId: "item_artifact_flying_thief",
    name: "Winged Pilferer",
    era: "origin",
    icon: "/artifacts/flying-thief.png",
    iconName: "flying_thief",
    maxLevel: 40,
    heroLevel: 3,
    stats: [
      {
        name: "Vision Radius",
        base: 350,
        perLevel: 3,
      },
      {
        name: "Round End Gold",
        base: 10,
        perLevel: 0.1,
        unit: "%",
      },
    ],
    unique: {
      name: "Absolute Initiative",
      description: "The first [[value]]2[[/]] instances of damage an enemy deals to you are evaded. Each evasion steals [[value]]8[[/]] gold, up to [[value]]300[[/]] per Stage.",
      note: "Gain up to [[value]]1750[[/]] gold.",
    },
    upgrades: [
      {
        level: 10,
        name: "Early Warning",
        description: "Damage within [[value]]20%[[/]] vision range: [[value]]10%[[/]] chance to evade and trigger [[ref]]Absolute Initiative[[/]] steal.",
      },
      {
        level: 20,
        name: "Seize",
        description: "Your first instance of damage against an enemy triggers steal effect from [[ref]]Absolute Initiative[[/]]",
      },
      {
        level: 30,
        name: "Grand Larceny",
        description: "Each instance of damage also has a [[value]]7%[[/]] chance to trigger steal effect from [[ref]]Absolute Initiative[[/]].",
      },
      {
        level: 40,
        name: "Momentum",
        description: "[[ref]]Seize[[/]]'s maximum steal attempts increases by [[value]]750[[/]] and the value per Stage increases to [[value]]1000[[/]]. Additionally, damage evasion is no longer limited to this Artifact — any evasion can trigger the effect.",
      },
    ],
    flavor: "A parrot assembled from precision machinery, previously the pet of a bearded pirate. Although a construct, magic has granted it limited intelligence, allowing it to recognize your commands.",
    cost: {
      dust: 15,
    },
    sources: [
      "Drops from Astral Vault · Shadow Sect",
    ],
  },
  {
    slug: "aether-ring",
    gameId: "item_artifact_aether_ring",
    name: "Aether Ring",
    era: "genesis",
    icon: "/artifacts/aether-ring.png",
    iconName: "aether_ring",
    maxLevel: 40,
    heroLevel: 6,
    stats: [
      {
        name: "Damage Reduction",
        base: 8,
        perLevel: 0.1,
        unit: "%",
      },
    ],
    unique: {
      name: "Inner Space",
      description: "Creates [[value]]1[[/]] dedicated slots for Origin Artifact. The non-economic base attributes provided by Artifacts in these slots are increased by [[value]]100%[[/]].",
      note: "If the Ring is unequipped, this ability will be permanently disabled, and all Artifacts in the additional slots will be forcibly unequipped.",
    },
    upgrades: [
      {
        level: 10,
        name: "Initial Attunement",
        description: "+[[value]]50%[[/]] bonus Attributes from [[ref]]Inner Space[[/]]",
      },
      {
        level: 20,
        name: "Initial Expansion",
        description: "Adds [[value]]1[[/]] dedicated Origin Artifact slot to [[ref]]Inner Space[[/]]. Artifacts in this slot gain [[value]]50%[[/]] bonus attributes",
      },
      {
        level: 30,
        name: "Further Attunement",
        description: "Origin Artifact in the slot provided by [[ref]]Initial Expansion[[/]] gains the same attribute amplification as those in the first slot",
      },
      {
        level: 40,
        name: "Inner Attunement",
        description: "Every [[value]]2[[/]] stages cleared, Artifacts in [[ref]]Inner Space[[/]] additionally count as having progressed through [[value]]1[[/]] stages. This effect is reduced for certain Artifacts",
        note: "Affected by this reduction: [[icon:artifacts/eye-of-the-pharaoh]]Eye of the Pharaoh[[/]] Eye of the Pharaoh — Royal Interest",
      },
    ],
    flavor: "Is not creating that which does not exist the ultimate pursuit of every mage?",
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "Available in Pact Vault",
    ],
  },
  {
    slug: "bracers-of-dimensional-traveler",
    gameId: "item_artifact_bracers_of_dimensional_traveler",
    name: "Astral Traveler",
    era: "genesis",
    icon: "/artifacts/bracers-of-dimensional-traveler.png",
    iconName: "bracers_of_dimensional_traveler",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "All Attributes",
        base: 12,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Dimensional Anchor",
      description: "[[value]]1[[/]] times per Stage, negate lethal damage and become invulnerable for [[value]]4[[/]] seconds. During this period, dimensions are locked, and non-boss enemies cannot act.",
    },
    upgrades: [
      {
        level: 10,
        name: "Slow Field",
        description: "After [[ref]]Dimensional Anchor[[/]] ends, reduce enemy Movement Speed by [[value]]60%[[/]] for [[value]]3[[/]] seconds.",
      },
      {
        level: 20,
        name: "Folded Field",
        description: "After [[ref]]Dimensional Anchor[[/]] ends, gain equal to [[value]]30%[[/]] of damage dealt during the duration.",
        note: "Shield value is capped at [[value]]150%[[/]] of your max HP/MP whichever is higher",
      },
      {
        level: 30,
        name: "Dimensional Lock",
        description: "Increases [[ref]]Dimensional Anchor[[/]] duration by [[value]]2[[/]] seconds.",
      },
      {
        level: 40,
        name: "Dimensional Convergence",
        description: "[[ref]]Dimensional Anchor[[/]] can trigger again. [[value]]180[[/]] seconds cooldown.",
      },
    ],
    flavor: "The bracers worn by Aghanim as he traversed different dimensions. The core is a gem forged by layering aether through dimensional power. Even in lightless worlds, it breaks the limits of natural law to emit a faint glow. The field emitted by this artifact protects its contents from erosion by the forces within multidimensional passages.",
    cost: {
      dust: 30,
    },
    sources: [
      "Available in Pact Vault",
    ],
  },
  {
    slug: "kilineiram",
    gameId: "item_artifact_kilineiram",
    name: "Black Blade · Kilineiram",
    era: "genesis",
    icon: "/artifacts/kilineiram.png",
    iconName: "kilineiram",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Attack Damage",
        base: 15,
        perLevel: 0.2,
      },
      {
        name: "Strength",
        base: 10,
        perLevel: 0.1,
      },
      {
        name: "Intelligence",
        base: 10,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Dark Energy",
      description: "Your next melee attack releases a horizontal slash which explodes after [[value]]2[[/]] seconds, dealing damage equal to [[value]]25%[[/]] max MP to enemies within the slashed area.",
    },
    upgrades: [
      {
        level: 10,
        name: "Gravity",
        description: "[[ref]]Dark Energy[[/]] applies a [[value]]60%[[/]] MS slow",
      },
      {
        level: 20,
        name: "Mass Reversion",
        description: "[[ref]]Dark Energy[[/]] restores MP equal to [[value]]30%[[/]] of the highest single-target damage dealt",
      },
      {
        level: 30,
        name: "Phase Change",
        description: "After [[ref]]Mass Reversion[[/]] restores Mana, gain [[value]]50%[[/]] of the restored amount as bonus Max Mana. This effect stacks independently and lasts for [[value]]20[[/]] seconds.",
        note: "Max bonus is [[value]]10000[[/]].",
      },
      {
        level: 40,
        name: "Mass Ray",
        description: "Ranged attacks can also trigger [[ref]]Dark Energy[[/]], converting it into an instant ray, but [[ref]]Gravity[[/]] no longer take effect.",
      },
    ],
    flavor: "Born from a dying star whose remnants became a meteor, it shattered after colliding with an unfortunate elder dragon in the atmosphere. Fragments of the meteor were later reforged into several weapons, capable of channeling the power of their progenitor star, now collapsed into a black hole, to impose overwhelming gravity.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 10,
    },
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "chrono-casket",
    gameId: "item_artifact_chrono_casket",
    name: "Chrono Casket",
    era: "genesis",
    icon: "/artifacts/chrono-casket.png",
    iconName: "chrono_casket",
    maxLevel: 40,
    heroLevel: 6,
    stats: [
      {
        name: "Health",
        base: 240,
        perLevel: 5,
      },
      {
        name: "Mana",
        base: 240,
        perLevel: 5,
      },
    ],
    unique: {
      name: "HP Storage",
      description: "Can store up to [[value]]2[[/]] HP Runes.",
      note: "Removing this Artifact temporarily removes stored HP Runes until the Artifact is obtained again.",
    },
    upgrades: [
      {
        level: 10,
        name: "Imperfect Rewind",
        description: "Active: Convert stored HP into [[value]]400[[/]] gold.",
      },
      {
        level: 20,
        name: "Reversal",
        description: "If you lose at least [[value]]2[[/]] HP Runes due to death in a single Stage, restore [[value]]1[[/]] upon completing the Stage.",
      },
      {
        level: 30,
        name: "Perfect Rewind",
        description: "+[[value]]250[[/]] [[ref]]Imperfect Rewind[[/]] Gold converted",
      },
      {
        level: 40,
        name: "Echoes Rebuilt",
        description: "Generates [[value]]1[[/]] HP Runes every [[value]]3[[/]] Stages",
        note: "HP Runes can still drop on the ground when at maximum capacity.",
      },
    ],
    flavor: "An exquisite gem-crafted ornament engraved with a clock on its surface symbolizing its connection to temporal powers.",
    drop: {
      pool: "General",
      weight: 300,
      chance: 0.9872,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "cold-moon",
    gameId: "item_artifact_cold_moon",
    name: "Cold Moon",
    era: "genesis",
    icon: "/artifacts/cold-moon.png",
    iconName: "cold_moon",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Mana Regeneration",
        base: 5,
        perLevel: 0.1,
      },
      {
        name: "Intelligence",
        base: 20,
        perLevel: 0.25,
      },
    ],
    unique: {
      name: "Moon Phase",
      description: "Spell AMP increases over time, reaching a maximum of [[value]]30%[[/]] after [[value]]15[[/]] seconds. Upon dealing any spell damage, the bonus lingers for [[value]]1.5[[/]] seconds, then resets to 0%.",
    },
    upgrades: [
      {
        level: 10,
        name: "Waning Moon",
        description: "[[ref]]Moon Phase[[/]] return value increased to [[value]]10%[[/]]",
        note: "Spell AMP now returns to [[value]]10%[[/]] instead of 0%",
      },
      {
        level: 20,
        name: "Crescent Moon",
        description: "[[ref]]Moon Phase[[/]] linger duration increased to [[value]]4[[/]] seconds. Each kill during this period extends the duration by an additional [[value]]0.5[[/]] seconds.",
      },
      {
        level: 30,
        name: "Full Moon",
        description: "Allied units within [[value]]500[[/]] gain [[value]]30%[[/]] bonus Mana RegenertionWhen [[ref]]Moon Phase[[/]] returns, release Cold Moon at the optimal point within [[value]]1000[[/]], dealing magic damage to enemies within [[value]]400[[/]]. Damage equals [[value]]60%[[/]] of the highest total damage dealt to a single enemy during this [[ref]]Moon Phase[[/]] linger duration.",
      },
      {
        level: 40,
        name: "New Moon",
        description: "Once per Sage, completing a full [[ref]]Moon Phase[[/]] cycle with full bonuses grants: [[value]]1%[[/]] permanent Spell AMP+[[value]]2%[[/]] maximum [[ref]]Moon Phase[[/]] bonus",
        note: "Removing the Artifact resets accumulated Moon Phase bonuses, but permanent spell AMP bonuses are retained.",
      },
    ],
    flavor: "Formed of ice crystal, veined with silver light. A fragment of a collapsing lunar soul carves the mark of tides within the flow of time.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "cosmic-singularity",
    gameId: "item_artifact_cosmic_singularity",
    name: "Cosmic Singularity",
    era: "genesis",
    icon: "/artifacts/cosmic-singularity.png",
    iconName: "cosmic_singularity",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Cooldown Reduction",
        base: 14,
        perLevel: 0.18,
        unit: "%",
      },
    ],
    unique: {
      name: "Umbral Dome",
      description: "Up to [[value]]2[[/]] times per Stage, create a dome that covers an area with a radius of [[value]]500[[/]] for [[value]]8[[/]] seconds. Allied units within the area cannot be detected by enemies.",
    },
    upgrades: [
      {
        level: 10,
        name: "Slow Field",
        description: "During [[ref]]Umbral Dome[[/]], enemy Movement Speed reduced by [[value]]40%[[/]].",
      },
      {
        level: 20,
        name: "Folded Field",
        description: "+[[value]]200[[/]] [[ref]]Umbral Dome[[/]] range",
      },
      {
        level: 30,
        name: "Agnosticism",
        description: "Increases [[ref]]Umbral Dome[[/]] duration by [[value]]2[[/]] seconds.",
      },
      {
        level: 40,
        name: "Time Dilation Effect",
        description: "During [[ref]]Umbral Dome[[/]], Cooldown Speed increased by [[value]]140%[[/]].",
      },
    ],
    flavor: "A peculiar ring with a miniature black hole housed at its center. When your finger passes through the band, the black hole hovers above your fingertip.",
    cost: {
      dust: 30,
    },
    sources: [
      "Available in Pact Vault",
    ],
  },
  {
    slug: "dung-eaters-grip",
    gameId: "item_artifact_dung_eaters_grip",
    name: "Dung Eater's Grip",
    era: "genesis",
    icon: "/artifacts/dung-eaters-grip.png",
    iconName: "dung_eaters_grip",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Health",
        base: 500,
        perLevel: 8,
      },
    ],
    unique: {
      name: "Cycle",
      description: "Upgrades the relic [[icon:relics/main-effect-boshman]]Blabber Guy[[/]] [Blabber Guy]. Its effects gain a bonus value equal to [[value]]8%[[/]] of your max HP. Additionally, [[icon:relics/main-effect-boshman]]Blabber Guy[[/]]'s damage is converted into [[color:#98f698]]Poison[[/]] equal to [[value]]150%[[/]] of its damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Accelerated Cycle",
        description: "[[icon:relics/main-effect-boshman]]Blabber Guy[[/]]-[[value]]1[[/]]s interval",
      },
      {
        level: 20,
        name: "High-Quality Cycle",
        description: "+[[ref]]Cycle[[/]][[value]]4%[[/]] bonus maximum HP",
      },
      {
        level: 30,
        name: "Foul Stench",
        description: "Each time [[icon:relics/main-effect-boshman]]Blabber Guy[[/]] triggers, it activates [[color:#98f698]]Poison[[/]].Activation Ratio: [[value]]2%[[/]]Activation Damage: [[value]]1500%[[/]]",
      },
      {
        level: 40,
        name: "Another Sip",
        description: "Each trigger of [[icon:relics/main-effect-boshman]]Blabber Guy[[/]] applies a debuff for [[value]]1.1[[/]] seconds, reducing the target's [[color:#98f698]]Poison Decay[[/]] by [[value]]40%[[/]]. Reapplying the debuff refreshes its duration.",
      },
    ],
    flavor: "I ate heartily; it tasted so good.",
    cost: {
      dust: 30,
      platinum: 800,
    },
    sources: [
      "Has a chance to appear for sale in the Daily Selection",
    ],
  },
  {
    slug: "monkey-kings-headband",
    gameId: "item_artifact_monkey_kings_headband",
    name: "Free Mind",
    era: "genesis",
    icon: "/artifacts/monkey-kings-headband.png",
    iconName: "monkey_kings_headband",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "All Attributes",
        base: 20,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Cycle Begins",
      description: "[[color:#fe5b37]]Cannot be equipped after Act 3.[[/]] Grants [[value]]2[[/]] rebirth charges. Each time a rebirth is consumed, all Attribute bonus granted is multiplied by [[value]]0.15[[/]]. If death occurs when rebirth is unavailable, this Artifact is disabled.",
    },
    second: {
      name: "Constraint",
      description: "This Artifact cannot be removed.",
    },
    upgrades: [
      {
        level: 10,
        name: "Cycle Three",
        description: "+[[value]]1[[/]] [[ref]]Cycle Begins[[/]] Rebirths",
      },
      {
        level: 20,
        name: "Eternal Existence",
        description: "[[ref]]Cycle Begins[[/]] rebirth invulnerability duration increased by [[value]]4[[/]] seconds. During this period, gain [[value]]30%[[/]] .",
      },
      {
        level: 30,
        name: "Unified Minds",
        description: "Equipment level requirement of other Artifacts reduced by [[value]]1[[/]]",
      },
      {
        level: 40,
        name: "Cycle Again",
        description: "If the Artifact remains disabled for [[value]]3[[/]] Rounds, dying with no rebirth charges left will automatically remove it.",
      },
    ],
    flavor: "Be he Sage or Buddha, the dawn has yet to be brought, just like the mantra. Through memory and obsession, a new journey to the west can be embarked upon.",
    drop: {
      pool: "General",
      weight: 200,
      chance: 0.6581,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 1500,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "future-vision",
    gameId: "item_artifact_future_vision",
    name: "Future Vision",
    era: "genesis",
    icon: "/artifacts/future-vision.png",
    iconName: "future_vision",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Luck",
        base: 20,
        perLevel: 0.3,
      },
      {
        name: "Mana",
        base: 300,
        perLevel: 5,
      },
    ],
    unique: {
      name: "Temporal Aid",
      description: "+[[value]]2[[/]] Levels worth of .",
    },
    upgrades: [
      {
        level: 10,
        name: "Further Beyond",
        description: "Upon leveling up, there is a [[value]]18%[[/]] chance to increase [[ref]]Temporal Aid[[/]] bonus level by [[value]]1[[/]].",
        note: "Guaranteed to succeed after every [[value]]5[[/]] failures.",
      },
      {
        level: 20,
        name: "Divine Blessing",
        description: "Each time you encounter [[color:#5e4ef0]][Relay Station Visitor - Misfortune Teller][[/]], [[ref]]Temporal Aid[[/]] bonus level is increased by [[value]]1[[/]].",
      },
      {
        level: 30,
        name: "Fatebound Visitor",
        description: "After [[value]]2[[/]] Stages, the Artifact can be actively used in regular combat Stages to summon [Misfortune Teller]Can be used [[value]]1[[/]] times per Act.",
        note: "All players share this usage limit.",
      },
      {
        level: 40,
        name: "Favor of the Oracle",
        description: "After [[value]]2[[/]] Stages, gain a [[value]]50%[[/]] discount at the [Misfortune Teller]",
      },
    ],
    flavor: "Many time-related spells are generally classified as forbidden magic, with only a small few ever being learned. Even so, fools often trigger paradoxes, causing disturbances in the magical field of an entire area.",
    cost: {
      dust: 30,
    },
    sources: [
      "Drops from Astral Vault · Visitor from Beyond",
    ],
  },
  {
    slug: "ghoul-mask",
    gameId: "item_artifact_ghoul_mask",
    name: "Ghoul Mask",
    era: "genesis",
    icon: "/artifacts/ghoul-mask.png",
    iconName: "ghoul_mask",
    maxLevel: 40,
    heroLevel: 6,
    stats: [
      {
        name: "Health",
        base: 300,
        perLevel: 4,
      },
      {
        name: "Health Regeneration",
        base: 15,
        perLevel: 0.15,
        unit: "%",
      },
    ],
    unique: {
      name: "Soul Rip",
      description: "Grants [[value]]13%[[/]] attack lifesteal and [[value]]13%[[/]] spell lifesteal.",
    },
    upgrades: [
      {
        level: 10,
        name: "Devour",
        description: "Each time you steal [[value]]100%[[/]] HP with [[ref]]Soul Rip[[/]], grants [[value]]1%[[/]] maximum HP.",
        note: "Max HP bonus: [[value]]10%[[/]]",
      },
      {
        level: 20,
        name: "Potent Absorption",
        description: "Lifesteal reduction against non-boss enemies reduced by [[value]]18%[[/]]",
      },
      {
        level: 30,
        name: "Evolution",
        description: "Each time [[ref]]Soul Rip[[/]] drains [[value]]120%[[/]] HP, grants permanent [[value]]2[[/]] bonus Attack Damage.",
        note: "Max Bonus: [[value]]300[[/]]",
      },
      {
        level: 40,
        name: "Feast",
        description: "Attacks have bonus lifesteal equal to [[value]]1%[[/]] of the target’s current HP, which is also counted as bonus damage. This bonus cannot exceed [[value]]50%[[/]] of your base Attack Damage.",
        note: "This will be included in [[ref]]Devour[[/]] and [[ref]]Evolution[[/]]",
      },
    ],
    flavor: "Ghouls are generally considered a low-tier undead, but there exist special individuals with extremely powerful strength, such as the formidable Nyx. This life form can infest any living creature and control them, then tear their flesh from within when they become useless, achieving a feast.",
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · Shadow Sect",
    ],
  },
  {
    slug: "god-of-black-sand",
    gameId: "item_artifact_god_of_black_sand",
    name: "God of Black Sand",
    era: "genesis",
    icon: "/artifacts/god-of-black-sand.png",
    iconName: "god_of_black_sand",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Poison Damage",
        base: 10,
        perLevel: 0.1,
        unit: "%",
      },
      {
        name: "Spell Lifesteal",
        base: 6,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Poison Sacrifice",
      description: "Passively gain [[value]]10[[/]] stacks of [[ref]]Poison Sacrifice[[/]] every [[value]]5[[/]] seconds. Stacks are reset at the start of each stage.",
    },
    second: {
      name: "Lost Offering",
      description: "When dealing damage, consumes stacks of [[ref]]Poison Sacrifice[[/]]. After consuming [[value]]5[[/]] stacks, summons [[value]]3[[/]] sacrificial beetles. The beetles are instantly slain by your damage to perform the sacrifice, granting you [[value]]1%[[/]] [[color:#98f698]]Poison Damage[[/]], stacking independently for [[value]]15[[/]] seconds.",
      note: "[[color:#cd00cd]]Poison Sacrifice[[/]] can only be consumed once every [[value]]0.2[[/]] seconds.",
    },
    upgrades: [
      {
        level: 10,
        name: "Sandstorm",
        description: "Every [[value]]5[[/]] seconds, applying stun to an enemy adds [[value]]10[[/]] stacks of [[ref]]Poison Sacrifice[[/]].When consuming [[ref]]Poison Sacrifice[[/]], apply [[color:#98f698]]Poison[[/]] equal to [[value]]5%[[/]] of the target's Max HP.",
      },
      {
        level: 20,
        name: "Harvest Day",
        description: "Restores [[value]]1[[/]] stacks of [[ref]]Poison Sacrifice[[/]] on enemy kill.",
      },
      {
        level: 30,
        name: "Black Sand Envoy",
        description: "Attach [[value]]6[[/]] envoys initially, gaining an additional [[value]]1[[/]] per stage. Every [[value]]4.5[[/]] seconds, they launch a round of attacks that activate [[color:#98f698]]Poison[[/]].Activation Ratio: [[value]]0.75%[[/]]Activation Damage: [[value]]1500%[[/]]",
      },
      {
        level: 40,
        name: "Eternal Festival",
        description: "The artifact can be switched, allowing you to sacrifice beetles through different attacks or abilities. Additionally, each [[ref]]Black Sand Envoy[[/]] grants a [[value]]0.8%[[/]] Max HP bonus.",
      },
    ],
    flavor: "The God of Black Sand craves sacrifices. The lost lure fragile beetles with poison, spilling their blood in ritual slaughter—each drop transformed into the fangs and blessings of the god’s envoys.",
    drop: {
      pool: "General",
      weight: 100,
      chance: 0.3291,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 800,
    },
    requiredDifficulty: 37,
    sources: [
      "May drop in EX+13 worlds or above",
    ],
  },
  {
    slug: "malignant-growth",
    gameId: "item_artifact_malignant_growth",
    name: "Malignant Growth",
    era: "genesis",
    icon: "/artifacts/malignant-growth.png",
    iconName: "malignant_growth",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Poison Damage",
        base: 15,
        perLevel: 0.1,
        unit: "%",
      },
    ],
    unique: {
      name: "Pustule",
      description: "Your next attack applies [[color:#98f698]]Poison[[/]] equal to [[value]]150%[[/]] of your Primary Attribute and adds [[value]]1[[/]] stacks of [[ref]]Pustule[[/]], activating [[color:#98f698]]Poison[[/]] once per second. After each activation, [[ref]]Pustule[[/]] performs a check with a [[value]]80%[[/]] chance to succeed; on failure, it is destroyed. The check's sprimary attributesuccess chance is halved for every [[value]]1[[/]] damage activations by [[ref]]Pustule[[/]].Activation Ratio: [[value]]1%[[/]]Activation Damage: [[value]]500%[[/]]",
    },
    second: {
      name: "Magazine",
      description: "Has [[value]]4[[/]] charges. Each charge recharges independently in [[value]]6[[/]] seconds.",
    },
    upgrades: [
      {
        level: 10,
        name: "Proliferation",
        description: "Each time [[ref]]Pustule[[/]] triggers, [[color:#98f698]]Poison[[/]] increases by [[value]]2[[/]]%, up to a maximum of [[value]]60[[/]]% of your primary attribute.",
      },
      {
        level: 20,
        name: "Spare Magazine",
        description: "+[[value]]1[[/]] [[ref]]Pustule[[/]] Charges",
      },
      {
        level: 30,
        name: "Poison Charges",
        description: "Each time [[color:#98f698]]Poison Damage[[/]] is dealt, the bullet with the longest remaining charge is accelerated by [[value]]0.1[[/]] seconds.",
      },
      {
        level: 40,
        name: "Spore Magazine",
        description: "When a bullet finishes charging, all other charging bullets have their recharge time reduced by [[value]]10%[[/]].",
      },
    ],
    flavor: "A pistol crafted from special biomass. It looks somewhat disgusting, but don’t worry—it won’t harm the wielder.",
    drop: {
      pool: "General",
      weight: 350,
      chance: 1.1517,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 800,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "thousand-lash-bug",
    gameId: "item_artifact_thousand_lash_bug",
    name: "Myriapod",
    era: "genesis",
    icon: "/artifacts/thousand-lash-bug.png",
    iconName: "thousand_lash_bug",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Strength",
        base: 12,
        perLevel: 0.2,
      },
      {
        name: "Intelligence",
        base: 12,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Insect Wielder",
      description: "Minimum Attack Range increased by [[value]]300[[/]].Attacks apply a [[value]]50%[[/]] MS slow for [[value]]0.3[[/]] seconds.",
    },
    upgrades: [
      {
        level: 10,
        name: "Leash",
        description: "Attacks leash the target for [[value]]4[[/]] seconds.",
        note: "Can only leash one target at a time. A target that has been leashed cannot be leashed again for [[value]]30[[/]] seconds.",
      },
      {
        level: 20,
        name: "Acid Gland",
        description: "[[ref]]Leash[[/]] reduces Armor by [[value]]7[[/]]",
        note: "Effect lingers for [[value]]10[[/]] seconds after the leash ends.",
      },
      {
        level: 30,
        name: "Metamorphosis",
        description: "Increases minimum Attack Range by [[value]]100[[/]] per Act completed",
        note: "Removing the Artifact resets this bonus.",
      },
      {
        level: 40,
        name: "Sentient Weapon",
        description: "When not actively attacking enemies, attack enemies within your minimum Attack Range every [[value]]3[[/]] seconds.",
      },
    ],
    flavor: "Grasp its tail as a handle, and it becomes a living whip capable of tearing the horizon apart.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "nirvana-ring",
    gameId: "item_artifact_nirvana_ring",
    name: "Nirvana",
    era: "genesis",
    icon: "/artifacts/nirvana-ring.png",
    iconName: "nirvana_ring",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Health Regeneration",
        base: 20,
        perLevel: 0.2,
        unit: "%",
      },
      {
        name: "Health Regeneration",
        base: 15,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Immolation",
      description: "Activates when HP is above [[value]]95%[[/]], deactivates when below [[value]]70%[[/]].Deals damage per second to enemies within [[value]]400[[/]] equal to [[value]]100%[[/]] of HP Regeneration. While active, consumes [[value]]2%[[/]] HP per second, increasing by [[value]]0.2%[[/]] per second.",
    },
    upgrades: [
      {
        level: 10,
        name: "Revival",
        description: "+[[value]]50%[[/]] rebirth invulnerability duration. Health Regeneration from this Artifact is multiplied by [[value]]2[[/]] during this period.",
      },
      {
        level: 20,
        name: "Eastern Rise",
        description: "After maintaining HP above [[value]]95%[[/]] for [[value]]3[[/]] seconds, gain [[value]]80[[/]]% %[[ref]]Immolation[[/]] range.",
      },
      {
        level: 30,
        name: "Western Fall",
        description: "At low HP, [[ref]]Immolation[[/]] damage to enemies is not disabled, but reduced by [[value]]60%[[/]].",
      },
      {
        level: 40,
        name: "Nirvana",
        description: "Consuming HP Runes to rebirth grants permanent [[value]]4[[/]]",
      },
    ],
    flavor: "A ring forged from the blazing flames born of a phoenix’s nirvana.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "puppeteers-grasp",
    gameId: "item_artifact_puppeteers_grasp",
    name: "Puppet Master's Grasp",
    era: "genesis",
    icon: "/artifacts/puppeteers-grasp.png",
    iconName: "puppeteers_grasp",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Summon Duration",
        base: 15,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Grip Master",
      description: "Summons Attack Speed increased by [[value]]25%[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Delicate Handling",
        description: "If the number of controlled units is less than or equal to [[value]]3[[/]], then [[ref]]Grip Master[[/]] gains an additional [[value]]15%[[/]] bonus effect.",
      },
      {
        level: 20,
        name: "Void Glance",
        description: "Each basic attack from a puppet has a [[value]]20%[[/]] chance to deal [[value]]140%[[/]] critical strike.",
      },
      {
        level: 30,
        name: "Coordinated Strike",
        description: "After a controlled unit attacks, all other controlled units gain a [[value]]0.5%[[/]] bonus attack damage. This effect stacks independently and lasts [[value]]8[[/]] seconds, up to [[value]]100%[[/]].",
        note: "Considered as applied by you",
      },
      {
        level: 40,
        name: "Total Command",
        description: "Can be activated to increase the bonus attack speed of [[ref]]Grip Master[[/]] to [[value]]100%[[/]]. During this time, you are disarmed. Duration: [[value]]10[[/]] seconds. Cooldown: [[value]]25[[/]] seconds.",
      },
    ],
    flavor: "An ordinary puppeteer can only control one unit; it is not an easy task to control a unit using five fingers. Usually, a puppeteer releases magical energy from their fingers to connect to the individual being controlled. The area a single thread can cover is limited. To control a larger individual, or to perform more delicate operations, more detailed information transmission is required, thus more fingers are needed for coordination. However, this is not absolute; at least that master could issue complex commands to an individual using just one finger.",
    drop: {
      pool: "General",
      weight: 350,
      chance: 1.1517,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 800,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "razor",
    gameId: "item_artifact_razor",
    name: "Razor",
    era: "genesis",
    icon: "/artifacts/razor.png",
    iconName: "razor",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Agility",
        base: 25,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Lightning Strike",
      description: "Your next attack deals bonus damage equal to [[value]]200%[[/]] and gains +[[value]]300[[/]] Attack Range. After the attack lands, gain bonus Attack Damage equal to [[value]]20%[[/]] for [[value]]15[[/]] seconds. This effect stacks independently.",
      note: "Max bonus is [[value]]300%[[/]] .",
    },
    upgrades: [
      {
        level: 10,
        name: "Extension",
        description: "+[[value]]150[[/]] [[ref]]Lightning Strike[[/]] Attack Range",
      },
      {
        level: 20,
        name: "Double Strike",
        description: "[[ref]]Lightning Strike[[/]] attacks also perform an additional attack dealing [[value]]40%[[/]] damage.",
      },
      {
        level: 30,
        name: "Stored Energy",
        description: "-[[value]]1[[/]] seconds [[ref]]Lightning Strike[[/]] cooldown",
      },
      {
        level: 40,
        name: "Lightning Whip",
        description: "[[ref]]Lightning Strike[[/]] stores up to [[value]]5[[/]] charges, releasing all effects on attack.",
      },
    ],
    flavor: "A whip that crackles with lightning. In skilled hands, it can deliver five strikes in an instant.",
    drop: {
      pool: "General",
      weight: 350,
      chance: 1.1517,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 800,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "scales-of-sacrifice",
    gameId: "item_artifact_scales_of_sacrifice",
    name: "Scales of Sacrifice",
    era: "genesis",
    icon: "/artifacts/scales-of-sacrifice.png",
    iconName: "scales_of_sacrifice",
    maxLevel: 50,
    heroLevel: 6,
    stats: [
      {
        name: "All Attributes",
        base: 10,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Unequal Exchange",
      description: "After each stage, gain an [[ref]][Exchange][[/]] buff. Press Alt + Left Mouse on the buff to exchange [[value]]6[[/]] all attributes for [[value]]550[[/]]. After every [[value]]1[[/]] stages cleared, [[value]]1[[/]] of the attributes deducted by this exchange are restored, provided you contributed at least [[value]]40%[[/]] of the total damage during that stage. Can be exchanged up to [[value]]3[[/]] times per stage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Regular Customer",
        description: "-[[value]]1[[/]] all-attribute cost for [[ref]]Unequal Exchange[[/]]",
      },
      {
        level: 20,
        name: "Rebate",
        description: "After using all exchanges available during a stage, gain an additional [[value]]300[[/]] when the attributes deducted by that set of exchanges are restored",
      },
      {
        level: 30,
        name: "Dissolution",
        description: "Press Alt + Left Mouse on the Cost Debuff to spend at a [[value]]130%[[/]] ratio and regain the attributes.",
      },
      {
        level: 40,
        name: "Cost Conversion",
        description: "This Artifact can be activated to increase all attributes by [[value]]35%[[/]] for the current stage. At the end of the stage, you are afflicted with a debuff that permanently reduces all attributes by [[value]]10%[[/]]. Press Alt + Left Mouse on the debuff and spend [[value]]3500[[/]] could remove it",
      },
      {
        level: 50,
        name: "Guarantee",
        description: "After activating [[ref]]Cost Conversion[[/]], it can be used up to [[value]]2[[/]] additional times, but each use costs an additional [[value]]1500[[/]]",
      },
    ],
    flavor: "Most exchanges are never truly equal. You may give much and receive little in return—in love as in business.",
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · DOTA",
    ],
  },
  {
    slug: "second-energy-core",
    gameId: "item_artifact_second_energy_core",
    name: "Secondary Core",
    era: "genesis",
    icon: "/artifacts/second-energy-core.png",
    iconName: "second_energy_core",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Mana",
        base: 300,
        perLevel: 6,
      },
      {
        name: "Mana Regeneration",
        base: 6,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Secondary Core",
      description: "Upon each cast, [[value]]30%[[/]] of its mana cost is stored. When the stored amount reaches [[value]]100%[[/]] of maximum mana, an explosion occurs, dealing [[value]]100%[[/]] of the stored amount as damage to enemies within [[value]]800[[/]] range. When current mana falls below [[value]]50%[[/]], mana is restored from the backup reserve.",
    },
    upgrades: [
      {
        level: 10,
        name: "Kinetic Power",
        description: "Grants [[value]]1%[[/]] charges for every [[value]]700[[/]] distance moved.",
      },
      {
        level: 20,
        name: "Solar Charging",
        description: "Grants [[value]]1%[[/]] charges every [[value]]2[[/]] seconds while in Status state.",
      },
      {
        level: 30,
        name: "Charge Expansion",
        description: "Can be toggled to a different effect. When used, the maximum stored amount of [[ref]]Secondary Core[[/]] is increased to [[value]]300%[[/]]. This causes both [[ref]]Kinetic Power[[/]] and [[ref]]Solar Charging[[/]] to also charge based on the expanded capacity.",
      },
      {
        level: 40,
        name: "Concussive Charge",
        description: "After [[ref]]Secondary Core[[/]] explodes, [[value]]35%[[/]] of the highest single-instance damage caused by the explosion is converted into restored charges. However, the amount restored cannot exceed [[value]]75%[[/]] of the original consumed amount.",
      },
    ],
    flavor: "Most living things have a single energy flow. Constructs? They cheat. One core runs the show. Break that core and the unit drops — heartbreak style. However, some upgraded constructs carry a second energy source. When primary dies, they flip to secondary core and stay in the fight.",
    drop: {
      pool: "General",
      weight: 150,
      chance: 0.4936,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 1000,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "selyanas-guard",
    gameId: "item_artifact_selyanas_guard",
    name: "Selyana's Guard",
    era: "genesis",
    icon: "/artifacts/selyanas-guard.png",
    iconName: "selyanas_guard",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Mana",
        base: 300,
        perLevel: 6,
      },
      {
        name: "Intelligence",
        base: 15,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Chosen Ritual",
      description: "Each attack consumes [[value]]40%[[/]] of Mana based on Primary Attribute, converting it into bonus damage. After dealing damage, the consumed Mana is restored over [[value]]5[[/]] seconds as Mana Regeneration, up to a maximum of [[value]]10%[[/]] of the damage dealt.",
    },
    upgrades: [
      {
        level: 10,
        name: "Divine Gift",
        description: "[[ref]]Chosen Ritual[[/]] restores [[value]]105%[[/]] of Mana consumed.",
      },
      {
        level: 20,
        name: "Divine Wings",
        description: "When initiating an attack, grants [[value]]500[[/]] Movement Speed and charge towards the target.",
      },
      {
        level: 30,
        name: "Divine Slash",
        description: "Move at least [[value]]500[[/]] with [[ref]]Divine Wings[[/]]: next attack ignores [[value]]30[[/]] Armor.",
      },
      {
        level: 40,
        name: "Divine Guardian",
        description: "Unlock two different forms. Activate this Artifact to switch between them.1. Divine Favor: [[ref]]Chosen Ritual[[/]] Mana cost increased by [[value]]50%[[/]]. Gain bonus Attack Damage equal to [[value]]100%[[/]] of the Mana Regeneration it provides.Guardian: Gain an all-damage shield every second equal to [[value]]15%[[/]] of your Mana Regeneration, lasting [[value]]10[[/]] seconds. This shield cannot exceed [[value]]200%[[/]] of your Max HP or MP, whichever is higher.",
      },
    ],
    flavor: "Throughout history, the battlefield has been dominated by male heroes. However, Empress Selyana of the Empire defied this norm. During the Tide of Madness, she single-handedly held off attacks from thousands of sub-humans. In an Empire teeming with heroes, the Empress had no need to go to the front lines, yet she still used her strength to protect the Empire's people. Over time, the people bestowed upon their Empress a new title: Guardian of the Empire. — Ninth World: Atlus, Official History.",
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · Imperial Reign",
    ],
  },
  {
    slug: "helm-of-the-seraph-knight",
    gameId: "item_artifact_helm_of_the_seraph_knight",
    name: "Seventh Heaven",
    era: "genesis",
    icon: "/artifacts/helm-of-the-seraph-knight.png",
    iconName: "helm_of_the_seraph_knight",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Armor",
        base: 10,
        perLevel: 0.2,
      },
      {
        name: "Magic Armor",
        base: 10,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Apocalypse",
      description: "At the start of a Stage, gain [[value]]20[[/]] stacks of [[ref]]Apocalypse[[/]]. Dealing damage consumes [[value]]1[[/]] stack(s) to boost final damage by [[value]]30%[[/]]. Restores 1 stack every [[value]]8[[/]] seconds.",
    },
    upgrades: [
      {
        level: 10,
        name: "Divine Gift",
        description: "-[[value]]1[[/]]s [[ref]]Apocalypse[[/]] cooldown",
      },
      {
        level: 20,
        name: "Divine Retribution",
        description: "Damage amplified by [[ref]]Apocalypse[[/]] causes a [[value]]20%[[/]] splash in a [[value]]200[[/]] radius.",
      },
      {
        level: 30,
        name: "Divine Will",
        description: "Restores [[value]]1[[/]] / [[value]]5[[/]] stack(s) of [[ref]]Apocalypse[[/]] upon killing normal/leader enemies.",
      },
      {
        level: 40,
        name: "Sky Crossing",
        description: "Once per day, after clearing Act III with this Artifact, permanently gain [[value]]30[[/]] bonus HP. This effect reaches its maximum after [[value]]30[[/]] stacks.",
      },
    ],
    flavor: "Born from the final fire of the Star-Forging Furnace in the Seventh Heaven. When the Star Chart of Creation dimmed, Archangel Gabriel plucked his own light-wings and forged them into this helmet, bearing the mission of redemption.",
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · Imperial Reign",
    ],
  },
  {
    slug: "slime-forged-core",
    gameId: "item_artifact_slime_forged_core",
    name: "Slime's Forging Core",
    era: "genesis",
    icon: "/artifacts/slime-forged-core.png",
    iconName: "slime_forged_core",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Primary Attribute",
        base: 20,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Water",
      description: "Enhances the ability of the relic [[icon:relics/main-effect-acidic-slime]]Acidic Slime[[/]] [Acidic Slime]. Enemies within its capture range are always considered targets and have [[value]]1[[/]] stacks of a unique debuff, which can only be detected and dispelled by [[icon:relics/main-effect-acidic-slime]]Acidic Slime[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Capture I",
        description: "+[[value]]150[[/]] to [[icon:relics/main-effect-acidic-slime]]Acidic Slime[[/]]’s capture range",
      },
      {
        level: 20,
        name: "Capture II",
        description: "+[[value]]1[[/]] to [[icon:relics/main-effect-acidic-slime]]Acidic Slime[[/]]’s maximum dissolution count",
      },
      {
        level: 30,
        name: "Capture III",
        description: "-[[value]]2[[/]] [[icon:relics/main-effect-acidic-slime]]Acidic Slime[[/]]'s dissolution interval",
      },
      {
        level: 40,
        name: "Two-Faced",
        description: "Artifact can switch modes:Inward Mode: targets and prioritizes allies, removing their debuffs and applying healing.Outward Mode: does not dispel the target’s debuffs.",
      },
    ],
    flavor: "An artificial heart crafted mainly from slime creatures, though it is not intended for use in humans.",
    cost: {
      dust: 30,
      platinum: 800,
    },
    sources: [
      "Has a chance to appear for sale in the Daily Selection",
    ],
  },
  {
    slug: "soul-lantern",
    gameId: "item_artifact_soul_lantern",
    name: "Soul Lantern",
    era: "genesis",
    icon: "/artifacts/soul-lantern.png",
    iconName: "soul_lantern",
    maxLevel: 40,
    heroLevel: 8,
    stats: [
      {
        name: "Attack Damage",
        base: 25,
        perLevel: 0.4,
      },
    ],
    unique: {
      name: "Soul Vessel",
      description: "Killing a Regular/Leader enemy collects [[value]]1[[/]]/[[value]]5[[/]] stacks of souls, each stack grants [[value]]0.5[[/]] Attack Damage.",
      note: "Maximum of [[value]]30[[/]] souls gained per Round.",
    },
    upgrades: [
      {
        level: 10,
        name: "Soul Searchlight",
        description: "At [[value]]20[[/]]/[[value]]80[[/]]/[[value]]200[[/]] stacks, summon a Soul Cluster that automatically seeks out enemies.",
      },
      {
        level: 20,
        name: "Soul Harvest",
        description: "After dealing damage exceeding [[value]]25%[[/]] of a target’s max HP, souls are collected without requiring you to land the killing blow.",
      },
      {
        level: 30,
        name: "Soul Redemption",
        description: "Minimum Soul Searchlight +[[value]]15[[/]] per Stage",
        note: "At the end of each Stage, automatically replenish souls up to [[value]]15[[/]] stacks.",
      },
      {
        level: 40,
        name: "Soul Requisition",
        description: "Removing the Artifact retains [[value]]50%[[/]] of souls",
      },
    ],
    flavor: "The lantern hangs empty, unlit within. Only by drinking souls does it burn, only by devouring life does it shine. The dead become fuel, its edge grows ever colder. As souls gather and shadows deepen, spectral servants arise. When others fade, this lantern may steal their light. On the battlefield, souls are thin; in empty valleys, it harvests by force. The lantern may be cast aside, but the soul brand never fades. Half is offered as sacrifice, bound forever to the mantle of war.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "thousand-leagues-astrologer",
    gameId: "item_artifact_thousand_leagues_astrologer",
    name: "Thousand Leagues Astrologer",
    era: "genesis",
    icon: "/artifacts/thousand-leagues-astrologer.png",
    iconName: "thousand_leagues_astrologer",
    maxLevel: 40,
    heroLevel: 6,
    stats: [
      {
        name: "Luck",
        base: 15,
        perLevel: 0.2,
      },
      {
        name: "Evasion",
        base: 15,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Distant Astrology",
      description: "Gain [[value]]3[[/]] charges at the start of a Stage. Killing a boss or elite enemy restores [[value]]1[[/]] charges.Maximum charges: [[value]]3[[/]].When taking damage exceeding [[value]]15[[/]] % of your maximum HP, consume [[value]]1[[/]] charge(s) to evade that damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Foreseen Motion",
        description: "+[[value]]10%[[/]] chance to not consume charges when [[ref]]Distant Astrology[[/]] triggers",
      },
      {
        level: 20,
        name: "Stellar Rewind",
        description: "When charges are consumed, restore [[value]]15%[[/]] HP and apply a strong dispel",
      },
      {
        level: 30,
        name: "Omniscience",
        description: "For every [[value]]2[[/]] damage instances evaded by [[ref]]Distant Astrology[[/]], gain [[value]]1[[/]] permanent luck, up to [[value]]20[[/]];For every [[value]]10[[/]] luck gained, gain 1 [[ref]]Distant Astrology[[/]] charges.",
      },
      {
        level: 40,
        name: "Divine Ordinance",
        description: "When [[ref]]Distant Astrology[[/]] has no charges, restore 1 charge every [[value]]20[[/]] seconds.",
      },
    ],
    flavor: "The current whereabouts of the Artifact remain unknown, and there has been no sign of the deity choosing a new champion since the Second Chaos Insurgency. Even so, the goddess’s followers believe that somewhere out there, the Thousand Leagues Astrologer is guiding a new Stellar Watcher through the dark, starry night.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 2,
      waveTo: 8,
    },
    cost: {
      dust: 30,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "witch-headcrown",
    gameId: "item_artifact_witch_headcrown",
    name: "Witch Headcrown",
    era: "genesis",
    icon: "/artifacts/witch-headcrown.png",
    iconName: "witch_headcrown",
    maxLevel: 40,
    heroLevel: 6,
    stats: [
      {
        name: "Intelligence",
        base: 25,
        perLevel: 0.3,
      },
      {
        name: "Status Resistance",
        base: 10,
        perLevel: 0.15,
        unit: "%",
      },
    ],
    unique: {
      name: "Maximum Mana Amplification",
      description: "+[[value]]10%[[/]] Spell AMP+[[value]]1%[[/]] per Stage.",
    },
    second: {
      name: "[Curse] Psychic Backlash",
      description: "Removing this Artifact permanently reduces Intelligence by [[value]]50%[[/]] of the bonus granted by this Artifact.",
    },
    upgrades: [
      {
        level: 10,
        name: "Immunity",
        description: "Dispels [[value]]1[[/]] debuffs every [[value]]15[[/]] seconds",
      },
      {
        level: 20,
        name: "Ascension",
        description: "When first equipped, gain random [[value]]1[[/]] [[icon:tooltip/aghs-shard]]Scepter Shard[[/]]",
      },
      {
        level: 30,
        name: "Greater Immunity",
        description: "[[ref]]Immunity[[/]] dispels additional [[value]]1[[/]] debuffs[[ref]]Maximum Mana Amplification[[/]] now lasts only [[value]]2[[/]] Stages",
      },
      {
        level: 40,
        name: "Greater Ascension",
        description: "[[ref]]Ascension[[/]] now grants [[icon:tooltip/aghs-shard-elite]]Elite Scepter Shard[[/]]",
      },
    ],
    flavor: "Seals away the wearer’s ego, allowing them to wield magic beyond their natural limits. However, forcibly removing it inflicts psychic backlash from the amplified mental force — caution is advised when worn.",
    cost: {
      dust: 30,
    },
    sources: [
      "Drops from Astral Vault · Visitor from Outerworld",
    ],
  },
  {
    slug: "manaweave-canopy",
    gameId: "item_artifact_manaweave_canopy",
    name: "Arcane Skyveil",
    era: "middle",
    icon: "/artifacts/manaweave-canopy.png",
    iconName: "manaweave_canopy",
    maxLevel: 40,
    heroLevel: 10,
    stats: [
      {
        name: "Mana",
        base: 500,
        perLevel: 10,
      },
      {
        name: "Mana Regeneration",
        base: 10,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Skyveil Guard",
      description: "When MP is above [[value]]30%[[/]], consume Mana to block [[value]]60%[[/]] damage. Each point of MP blocks [[value]]1.5[[/]] damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Mana Maintenance",
        description: "Every [[value]]5[[/]] seconds, restore [[value]]2%[[/]] of Mana consumed",
      },
      {
        level: 20,
        name: "Dense Field",
        description: "+[[value]]0.5[[/]] damage blocked /MP of [[ref]]Skyveil Guard[[/]]",
      },
      {
        level: 30,
        name: "Precision Control",
        description: "[[ref]]Skyveil Guard[[/]] consumes up to ([[value]]300[[/]] + [[value]]15%[[/]] of Max MP) Mana per use.",
      },
      {
        level: 40,
        name: "Skyveil",
        description: "Can be activated to convert [[value]]50%[[/]] of your Max MP into a separate Mana PoolThe Mana Pool has [[value]]100%[[/]] independent MP Regeneration, and [[ref]]Skyveil Guard[[/]] consumes Mana only from this pool.",
        note: "As expected, all Abilities now affect only the separate Mana Pool, and the [[value]]30%[[/]] restriction no longer applies.",
      },
    ],
    flavor: "Using the supreme techniques of the arcane schools, mana is woven into an absolute shield.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 6,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "azure-star",
    gameId: "item_artifact_azure_star",
    name: "Azure Star",
    era: "middle",
    icon: "/artifacts/azure-star.png",
    iconName: "azure_star",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Mana",
        base: 800,
        perLevel: 10,
      },
    ],
    unique: {
      name: "Azure Reflux",
      description: "+[[value]]1%[[/]] Max Mana Regeneration per second, with [[value]]150%[[/]] effect while in Water Terrain.",
    },
    second: {
      name: "Azure Current",
      description: "When MP is above [[value]]80%[[/]], consumes [[value]]1%[[/]] MP per second to increase Spell Amp, granting [[value]]10%[[/]]/[[value]]30%[[/]]/[[value]]75%[[/]] Spell Amp at [[value]]5[[/]]/[[value]]75[[/]]/[[value]]300[[/]] consumption respectively.",
    },
    upgrades: [
      {
        level: 10,
        name: "Current Growth",
        description: "When MP is above [[value]]95%[[/]], the Mana cost per second for [[ref]]Azure Reflux[[/]] increases to [[value]]2%[[/]]",
      },
      {
        level: 20,
        name: "Ebb and Flow",
        description: "The lower your MP, the higher the Mana Regeneration provided by [[ref]]Azure Reflux[[/]], up to an additional [[value]]50%[[/]]",
      },
      {
        level: 30,
        name: "Current Echo",
        description: "Mana consumed by [[ref]]Azure Reflux[[/]] is converted into [[value]]100%[[/]] damage dealt to enemies within a [[value]]500[[/]] radius",
      },
      {
        level: 40,
        name: "Underflow",
        description: "Can be activated to increase [[ref]]Azure Reflux[[/]] ’s cost by [[value]]300%[[/]] and remove its drain limit. Additionally, [[value]]50%[[/]] of the Mana drained is converted into temporary Max Mana bonus. This effect stacks independently and lasts for [[value]]10[[/]] seconds.",
      },
    ],
    flavor: "The Dark Reef is not merely a prison; its lengthy labyrinth actually has two branches—one leads to the most dangerous cells, the other to the hidden treasury of the ocean empire. Many overconfident thieves come here, unaware that the warden has already prepared cages for them, waiting for them to walk right into the trap.",
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · Imperial Reign",
    ],
  },
  {
    slug: "celestial-expanse",
    gameId: "item_artifact_celestial_expanse",
    name: "Celestial Expanse",
    era: "middle",
    icon: "/artifacts/celestial-expanse.png",
    iconName: "celestial_expanse",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Area of Effect",
        base: 10,
        perLevel: 0.15,
        unit: "%",
      },
      {
        name: "Primary Attribute",
        base: 15,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Enigma",
      description: "Start with [[value]]3[[/]] Gravity Spheres. When a nearby enemy within [[value]]500[[/]] range tries to land an attack, one sphere fires off, shoving them toward the outer rim. That sphere then sinks into the ground and creates a small gravity field, largely slows for [[value]]6[[/]] seconds. Each ready sphere increases your bonus radius by [[value]]30[[/]]. Each active sphere grants you [[value]]6[[/]]% damage reduction.",
    },
    upgrades: [
      {
        level: 10,
        name: "Nested Rings",
        description: "+[[value]]1[[/]] [[ref]]Enigma[[/]] Gravity Spheres",
      },
      {
        level: 20,
        name: "Universal Gravitation",
        description: "The Gravity Sphere pulls along any other enemies it touches on the way, dragging them all to the edge together.",
      },
      {
        level: 30,
        name: "Collapse",
        description: "While the gravity field from [[ref]]Enigma[[/]] is active, if you cast a spell while inside its area, or target a point inside it with an ability, the field collapses. It pulls in all enemies within [[value]]500[[/]] toward the center and stuns them for [[value]]2[[/]] seconds. When the stun ends, they take damage equal to [[value]]30[[/]]% of the damage they received during the stun. After collapsing, the Gravity Sphere resets [[value]]5[[/]] seconds later. During that delay, no field is generated.",
        note: "The bonus damage cannot exceed [[value]]600[[/]]% of your primary attribute. Any damage flagged as life loss, retaliate, or similar is ignored for the calculation.",
      },
      {
        level: 40,
        name: "Binary Star",
        description: "Toggles active effect. While the active is on, [[ref]]Enigma[[/]] uses two Gravity Spheres to pull enemies, and immediately triggers [[ref]]Collapse[[/]] when the push-off is finished. This means you need at least two ready spheres for it to work. Additionally, while active, if your total percentage-based radius bonuses exceed [[value]]60%[[/]], gain +[[value]]10%[[/]] Final Damage Bonus.",
      },
    ],
    flavor: "Gaia's land is just one corner of the world. By human measure, this planet is already huge. Many spend their whole lives without ever leaving home. But the world is vast. Between realms you've got the void and the aether. Star-clouds drifting out there — no one's mapped them all.",
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · DOTA",
    ],
  },
  {
    slug: "judgement-of-the-fallen",
    gameId: "item_artifact_judgement_of_the_fallen",
    name: "Celestial Judgment",
    era: "middle",
    icon: "/artifacts/judgement-of-the-fallen.png",
    iconName: "judgement_of_the_fallen",
    maxLevel: 40,
    heroLevel: 10,
    stats: [
      {
        name: "Strength",
        base: 20,
        perLevel: 0.3,
      },
      {
        name: "Armor",
        base: 10,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Judgement",
      description: "After the same unit attacks you [[value]]6[[/]] times, an echo is triggered centered on that unit, dealing [[[value]]120[[/]] + [[value]]270%[[/]] ] damage to other enemies within [[value]]400[[/]] radius.Each unit has a [[value]]5[[/]] seconds cooldown.",
    },
    upgrades: [
      {
        level: 10,
        name: "Arcane Totem",
        description: "Your attacks generate [[value]]2[[/]] [[ref]]Judgement[[/]] attack count",
      },
      {
        level: 20,
        name: "Arcane Resonance",
        description: "The primary target that triggers [[ref]]Judgement[[/]] also takes [[value]]1[[/]] instances of damage",
      },
      {
        level: 30,
        name: "Echoes Beyond",
        description: "For each target affected by [[ref]]Judgement[[/]], gain [[value]]1%[[/]] bonus Strength, stacking independently for [[value]]30[[/]] seconds, up to [[value]]20[[/]] stacks",
      },
      {
        level: 40,
        name: "Arcane Echo",
        description: "Your spell damage also generates [[value]]2[[/]] [[ref]]Judgement[[/]] attack counts",
      },
    ],
    flavor: "Earthshaker cannot restore life to those who perished in the destruction of his sister earth, but he can wield a fragment born from her demise to mete out justice upon those responsible.",
    cost: {
      dust: 45,
    },
    sources: [
      "Drops from Astral Vault · Visitor from Beyond",
    ],
  },
  {
    slug: "censer-of-bitter-plague",
    gameId: "item_artifact_censer_of_bitter_plague",
    name: "Censer of Bitter Plague",
    era: "middle",
    icon: "/artifacts/censer-of-bitter-plague.png",
    iconName: "censer_of_bitter_plague",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Health Regeneration",
        base: 30,
        perLevel: 0.5,
      },
      {
        name: "Health Regeneration",
        base: 15,
        perLevel: 0.1,
        unit: "%",
      },
    ],
    unique: {
      name: "Agony Recompense",
      description: "After taking cumulative damage equal to [[value]]10%[[/]] of your maximum health, release a slowly spreading [[ref]]Poison Mist[[/]] that affects enemies up to [[value]]800[[/]] units away. Enemies that touch [[ref]]Poison Mist[[/]] are immediately afflicted with [[color:#98f698]]Poison[[/]] equal to [[value]]15%[[/]] of their maximum health. While within its area, they are afflicted with an additional [[value]]3%[[/]] of their maximum health as [[color:#98f698]]Poison[[/]] each second. [[ref]]Poison Mist[[/]] lasts [[value]]3[[/]] seconds.",
      note: "[[ref]]Poison Mist[[/]] can be released once every [[value]]5[[/]]s. Damage taken during the cooldown still accumulates. When triggered, its potency increases based on the accumulated damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Spell Recompense",
        description: "[[value]]50%[[/]] of your spell costs also count toward [[ref]]Agony Recompense[[/]], whether paid with mana or health",
      },
      {
        level: 20,
        name: "Foul Recompense",
        description: "Releasing [[ref]]Poison Mist[[/]] also applies a weak dispel to yourself. If any debuff is dispelled, [[ref]]Poison Mist[[/]] gains [[value]]40%[[/]] potency, plus an additional [[value]]5%[[/]] for each debuff dispelled",
      },
      {
        level: 30,
        name: "Concurrent Recompense",
        description: "[[ref]]Poison Mist[[/]] gains [[value]]10%[[/]] potency for each [[color:#98f698]]Poison Target[[/]] on the battlefield",
      },
      {
        level: 40,
        name: "Origin of Plague",
        description: "An area of [[value]]300[[/]] around you constantly produces the effect of [[ref]]Poison Mist[[/]] at the highest potency it has reached during the current stage",
      },
    ],
    flavor: "Every wound, every brush with death, and every curse dispelled is refined into pestilent miasma.",
    drop: {
      pool: "General",
      weight: 150,
      chance: 0.4936,
      waveFrom: 10,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    requiredDifficulty: 15,
    sources: [
      "May drop in S world or above",
    ],
  },
  {
    slug: "cloudstrider",
    gameId: "item_artifact_cloudstrider",
    name: "Cloudstrider",
    era: "middle",
    icon: "/artifacts/cloudstrider.png",
    iconName: "cloudstrider",
    maxLevel: 40,
    heroLevel: 10,
    stats: [
      {
        name: "Movement Speed",
        base: 120,
        perLevel: 2,
      },
      {
        name: "Evasion",
        base: 15,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Cloudstep",
      description: "Has [[value]]2[[/]] charge(s). When you use a teleport or blink Ability, this Artifact goes on cooldown instead, with a cooldown time equal to [[value]]140%[[/]] of the original.",
    },
    upgrades: [
      {
        level: 10,
        name: "Feather Rush",
        description: "After [[ref]]Cloudstep[[/]], gain [[value]]20%[[/]] bonus MS, stacking independently for [[value]]10[[/]] seconds",
      },
      {
        level: 20,
        name: "Sky Treader",
        description: "-[[value]]25%[[/]][[ref]]Cloudstep[[/]] cooldown time replaced",
      },
      {
        level: 30,
        name: "The Third Wings",
        description: "+[[value]]1[[/]] max [[ref]]Cloudstep[[/]] charges",
      },
      {
        level: 40,
        name: "Sky Walker",
        description: "+[[value]]150[[/]]/[[value]]300[[/]] min/max MS",
      },
    ],
    flavor: "The bodies of humanoid creatures are surprisingly resilient. Even a fall from high ground is unlikely to kill you outright. More often, your ribs snap like branches, puncturing your lungs and leaving you to slowly and painfully suffocate in your own blood. So when you wear these boots… it’s best not to look down.",
    cost: {
      dust: 45,
    },
    sources: [
      "Available in Pact Vault",
    ],
  },
  {
    slug: "constellation-relic",
    gameId: "item_artifact_constellation_relic",
    name: "Constellation Relic",
    era: "middle",
    icon: "/artifacts/constellation-relic.png",
    iconName: "constellation_relic",
    maxLevel: 50,
    heroLevel: 12,
    stats: [
      {
        name: "Health",
        base: 500,
        perLevel: 5,
      },
      {
        name: "Mana",
        base: 500,
        perLevel: 5,
      },
      {
        name: "Luck",
        base: 25,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Celestial Myriad",
      description: "After each Stage, gain [[value]]5[[/]] Luck. Has a [[value]]15%[[/]] chance to obtain a random Ability [[icon:tooltip/aghs-shard]]Scepter Shard[[/]]. If this effect does not trigger, the chance is doubled for the next attempt.",
      note: "Removing the relic will also remove all granted bonuses.",
    },
    upgrades: [
      {
        level: 10,
        name: "Stargazing",
        description: "Whenever you obtain any [[icon:tooltip/aghs-shard]]Scepter Shard[[/]] (including temporary ones), +[[value]]2[[/]] Luck",
      },
      {
        level: 20,
        name: "Celestial Insight",
        description: "Has a [[value]]30%[[/]] chance (Luck × [[value]]15[[/]]) to negate incoming damage",
      },
      {
        level: 30,
        name: "Wheel of Fate",
        description: "Up to [[value]]3[[/]] times per Stage, when taking lethal damage, consume [[value]]20[[/]] Luck to survive and become invulnerable for [[value]]1[[/]]s. Lost Luck is restored at the end of the Stage.",
        note: "Does not trigger if you lack sufficient Luck.",
      },
      {
        level: 40,
        name: "Starpath",
        description: "Each day, after clearing a Stage with this Artifact, it grants additional [[value]]8[[/]] Luck for the day. This bonus decreases by [[value]]1[[/]] each time",
      },
      {
        level: 50,
        name: "Stellar Reforging",
        description: "Can be used actively once. Transforms the effect of the Artifact, converting its Luck bonus into [[value]]60[[/]] to all Attributes.",
      },
    ],
    flavor: "A robe embodying the legacy of legendary pioneers, granting fleeting visions of its power only to those whose sight reaches the farthest horizons. In ages long past, only a handful of true relics existed, their names etched upon the very pinnacle of the Constellation — [Aeili][肥宅快乐浪][四棱][李狗蛋][无色无味]. In later eras, countless imitations emerged. Though lacking the full divine might of the originals, they still bear the honored name of the Constellation Relic.",
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "Rewards from certain limited-time events.",
    ],
  },
  {
    slug: "kiss-of-the-rose",
    gameId: "item_artifact_kiss_of_the_rose",
    name: "Crimson Rose",
    era: "middle",
    icon: "/artifacts/kiss-of-the-rose.png",
    iconName: "kiss_of_the_rose",
    maxLevel: 50,
    heroLevel: 11,
    stats: [
      {
        name: "Attack Damage",
        base: 30,
        perLevel: 0.5,
      },
      {
        name: "Attack Damage",
        base: 40,
        perLevel: 0.8,
      },
    ],
    unique: {
      name: "Kiss of Thorns",
      description: "Critical damage is increased by [[value]]60%[[/]]. Each time you trigger a critical strike, you take backlash damage equal to [[value]]15%[[/]] of that damage, capped at [[value]]10%[[/]] of your Max HP.",
    },
    upgrades: [
      {
        level: 10,
        name: "Kiss of Death",
        description: "+[[value]]20%[[/]] critical damage",
      },
      {
        level: 20,
        name: "Kiss of Blood",
        description: "+[[value]]10%[[/]] critical strike lifesteal",
      },
      {
        level: 30,
        name: "Kiss of Madness",
        description: "After trigger a critical strike, the next [[value]]2[[/]] attacks gain additional [[value]]100[[/]] (an max) Attack Speed",
      },
      {
        level: 50,
        name: "Final Kiss",
        description: "Each attack has a [[value]]30%[[/]] chance to roll [[value]]1[[/]] additional critical strikes, using the highest result as the final critical damage",
        note: "Different critical strike mechanics interact differently. For example, Chaos Strike does not increase critical strike chance, but if it triggers, it rolls twice and uses the higher critical damage. If a critical strike is produced as a secondary effect of another mechanic, this effect will not take effect.",
      },
    ],
    flavor: "Some beautiful things are dangerous by nature. No matter how alluring the surface may be, their hidden defenses cannot be ignored. Often, by the time you realize this, your life has already reached its end.",
    drop: {
      pool: "General",
      weight: 150,
      chance: 0.4936,
      waveFrom: 10,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1500,
    },
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "waning-sea-coral",
    gameId: "item_artifact_waning_sea_coral",
    name: "Fading Surf",
    era: "middle",
    icon: "/artifacts/waning-sea-coral.png",
    iconName: "waning_sea_coral",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Health",
        base: 800,
        perLevel: 8,
      },
      {
        name: "Armor",
        base: 15,
        perLevel: 0.3,
      },
    ],
    unique: {
      name: "Ocean Erosion",
      description: "Gradually reduces armor of enemies within [[value]]900[[/]] range, permanently reducing armor by [[value]]1[[/]] every second, up to a maximum of [[value]]15[[/]]. If the wielder is in Water Terrain, then every [[value]]5[[/]] seconds, the maximum reduction is increased by [[value]]1[[/]] (but up to a maximum of [[value]]27[[/]]). Leave Water Terrain and the extra cap disappears. Already reduced armor stays reduced, but it won't go past the active cap.",
    },
    upgrades: [
      {
        level: 10,
        name: "Current Expansion",
        description: "Ocean Erosion's radius increases by an amount equal to [[value]]100[[/]]% of your own armor.",
      },
      {
        level: 20,
        name: "Depth Warden",
        description: "Grants bonus armor equal to [[value]]50[[/]]% of the total armor reduced by Ocean Erosion. (The closest enemy counts for [[value]]100%[[/]], while all other enemies count for only [[value]]20%[[/]].)",
      },
      {
        level: 30,
        name: "Soaked",
        description: "Enter Water Terrain and the [[ref]]Ocean Erosion[[/]] bonus remains for [[value]]10[[/]] seconds even if briefly leaving.",
      },
      {
        level: 40,
        name: "Great Cleansing",
        description: "Physical damage you deal behaves as though Ocean Erosion has already been running for [[value]]1[[/]] seconds.",
      },
    ],
    flavor: "Many currents meet here, and the heavy stuff gets pulled in too. Dark Reef holds plenty of high-risk criminals and a good pile of treasure. The warden thought no one and nothing could ever slip out. But he didn't count on one slippery convict making off with a chunk of his stash.",
    drop: {
      pool: "Siltbreaker",
      weight: 350,
      chance: 58.3333,
      waveFrom: 10,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    requiredDifficulty: 24,
    sources: [
      "Drops only from the [Prison of the Siltbreaker] in EX worlds or above.",
    ],
  },
  {
    slug: "yotunheim-ring",
    gameId: "item_artifact_yotunheim_ring",
    name: "Frost of Jotunheim",
    era: "middle",
    icon: "/artifacts/yotunheim-ring.png",
    iconName: "yotunheim_ring",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Health",
        base: 500,
        perLevel: 5,
      },
      {
        name: "Armor",
        base: 10,
        perLevel: 0.2,
      },
      {
        name: "Magic Armor",
        base: 15,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Body of Ymir",
      description: "[[value]]30%[[/]] of damage taken is converted into energy. Over the next [[value]]10[[/]]s, [[value]]10%[[/]] of this energy is converted into every [[value]]1[[/]] seconds. The shield lasts [[value]]15[[/]] seconds.",
    },
    upgrades: [
      {
        level: 10,
        name: "Frozen Bloodline",
        description: "While the [[ref]]Body of Ymir[[/]] shield is active, gain additional [[value]]20%[[/]] physical damage reduction",
      },
      {
        level: 20,
        name: "Frost Resistance",
        description: "While the [[ref]]Body of Ymir[[/]] shield is active, gain additional [[value]]60%[[/]] slow resistance",
      },
      {
        level: 30,
        name: "Frozen",
        description: "Once per Stage, when HP falls below [[value]]40%[[/]], you become invulnerable and receive a strong dispel for [[value]]5[[/]] seconds, restoring [[value]]10%[[/]] HP and MP every second. After [[value]]1[[/]] seconds, you can end the effect early with a stop command (S/H).",
      },
      {
        level: 40,
        name: "Embrace of Frost",
        description: "Gains a [[ref]]Body of Ymir[[/]] shield equal to [[value]]50%[[/]] of Armor/Magic Armor (whichever is higher) per second",
      },
    ],
    flavor: "In the beginning lived the giant Ymir. There was no sand, no sea, no cool waves; no earth beneath, no sky above. Only the yawning abyss existed, and no grass grew. Then the sons of Borr raised the land and shaped radiant Midgard. — Poetic Edda, Völuspá, Verses 3–4",
    drop: {
      pool: "FrostGiant",
      weight: 400,
      chance: 100,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    requiredDifficulty: 24,
    sources: [
      "Drops only from the [Frost Giant · Jotunheim] in EX worlds or above",
    ],
  },
  {
    slug: "singularity-glintstone-staff",
    gameId: "item_artifact_singularity_glintstone_staff",
    name: "Glintstone Singularity Staff",
    era: "middle",
    icon: "/artifacts/singularity-glintstone-staff.png",
    iconName: "singularity_glintstone_staff",
    maxLevel: 40,
    heroLevel: 11,
    stats: [
      {
        name: "Intelligence",
        base: 25,
        perLevel: 0.2,
      },
      {
        name: "Mana Regeneration",
        base: 15,
        perLevel: 0.3,
      },
    ],
    unique: {
      name: "Glintstone Sorcery",
      description: "+[[value]]100%[[/]] MP cost and [[value]]45[[/]] min MP costEvery [[value]]3[[/]] casts, lanuch a glintstone beam at a random enemy within [[value]]1000[[/]] range, dealing [[value]]100%[[/]] of the total MP spent across those [[value]]3[[/]] casts as damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Efficient Conversion",
        description: "[[ref]]Glintstone Sorcery[[/]] conversion damage increased to [[value]]140%[[/]].",
      },
      {
        level: 20,
        name: "Mana Fracture",
        description: "+[[value]]15%[[/]] of your max MP to [[ref]]Glintstone Sorcery[[/]]'s damage",
      },
      {
        level: 30,
        name: "Glintstone Surge",
        description: "[[ref]]Glintstone Sorcery[[/]] deals damage withn [[value]]300[[/]] range",
      },
      {
        level: 40,
        name: "Singularity Ascension",
        description: "Can be toggled. While active: Your Abilities consume additional MP equal to [[value]]10%[[/]] of your current MP.You can accumulate [[value]]5[[/]] casts. [[ref]]Glintstone Surge[[/]]'s radius increases to [[value]]500[[/]]. If all casts are the same Abilities, its cooldown is reset when triggered.",
      },
    ],
    flavor: "The distinction between comet and meteor magic always felt rather otiose to me. One produces horizontal beams. Another causes vertical blasts. Both hurt all the same. My colleagues insisted there was more nuance to it, however—so to prove them wrong, I mastered both.— Lusata Zur, wizardly prodigy.",
    cost: {
      dust: 45,
    },
    sources: [
      "Drops from Astral Vault · Darkmoon Guidance",
    ],
  },
  {
    slug: "gravebloom",
    gameId: "item_artifact_gravebloom",
    name: "Gravebloom Coronet",
    era: "middle",
    icon: "/artifacts/gravebloom.png",
    iconName: "gravebloom",
    maxLevel: 40,
    heroLevel: 11,
    stats: [
      {
        name: "All Attributes",
        base: 12,
        perLevel: 0.1,
      },
      {
        name: "Poison Damage",
        base: 8,
        perLevel: 0.08,
        unit: "%",
      },
    ],
    unique: {
      name: "Floral Offering",
      description: "The [[color:#98f698]]Poison[[/]] you apply is reduced by [[value]]30%[[/]], with the reduced stacks absorbed by [[ref]]Floral Offering[[/]] as nourishment. Once the nourishment reaches [[value]]1000%[[/]] of your Primary Attribute, [[ref]]Floral Offering[[/]] gains a level. Each time the requirement doubles thereafter, it gains [[value]]1[[/]] levels",
      note: "[[color:#98f698]]Poison[[/]] applied by [[ref]]Floral Offering[[/]] is not affected by this reduction.",
    },
    second: {
      name: "Bud Level",
      description: "Each second, [[ref]]Floral Offering[[/]] applies [[color:#98f698]]Poison[[/]] based on your Primary Attribute to enemies within its area:Level 1: [[value]]500[[/]] radius, [[value]]100%[[/]] Primary AttributeLevel 2: [[value]]600[[/]] radius, [[value]]120%[[/]] Primary AttributeLevel 3: [[value]]700[[/]] radius, [[value]]150%[[/]] Primary AttributeThereafter: Each level applies an additional [[value]]10%[[/]] of your Primary Attribute as [[color:#98f698]]Poison[[/]]",
    },
    upgrades: [
      {
        level: 10,
        name: "Rotten Soil",
        description: "When an enemy dies with [[color:#98f698]]Poison[[/]] while within the area of [[ref]]Floral Offering[[/]], immediately gain nourishment equal to [[value]]30%[[/]] of its remaining [[color:#98f698]]Poison[[/]]",
        note: "If multiple instances of [[ref]]Floral Offering[[/]] are present, only the nearest one absorbs the nourishment",
      },
      {
        level: 20,
        name: "Violet Heart",
        description: "When [[ref]]Floral Offering[[/]] reaches level [[value]]5[[/]], [[color:#98f698]]Poison Decay[[/]] is slowed by [[value]]20%[[/]] for enemies within its area",
      },
      {
        level: 30,
        name: "Bloom",
        description: "When [[ref]]Floral Offering[[/]] reaches level [[value]]7[[/]], any [[color:#98f698]]Poison[[/]] you apply has a [[value]]20%[[/]] chance to be applied again after [[value]]1[[/]]s",
      },
      {
        level: 40,
        name: "Unfading",
        description: "When the stage resets, [[ref]]Floral Offering[[/]] from [[ref]]Floral Offering[[/]] is no longer cleared and instead loses only [[value]]2[[/]] levels",
      },
    ],
    flavor: "Do not mourn the withering dead. Some flowers bloom eternal only upon their remains.",
    drop: {
      pool: "General",
      weight: 200,
      chance: 0.6581,
      waveFrom: 6,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    requiredDifficulty: 15,
    sources: [
      "May drop in S world or above",
    ],
  },
  {
    slug: "scythe-of-the-grim-shepherd",
    gameId: "item_artifact_scythe_of_the_grim_shepherd",
    name: "Grim Shepherd",
    era: "middle",
    icon: "/artifacts/scythe-of-the-grim-shepherd.png",
    iconName: "scythe_of_the_grim_shepherd",
    maxLevel: 40,
    heroLevel: 10,
    stats: [
      {
        name: "Summon AMP",
        base: 12,
        perLevel: 0.15,
        unit: "%",
      },
      {
        name: "Attack Damage",
        base: 25,
        perLevel: 0.4,
      },
    ],
    unique: {
      name: "Enslave Undead",
      description: "Units you kill are raised as undead. Every [[value]]8[[/]] seconds, they unleash a [[value]]350[[/]] radius area attack, dealing [[value]]100%[[/]] damage.Lasts [[value]]15[[/]] seconds. Maximum enslaved units: [[value]]2[[/]].",
      note: "Undead have an attack range of [[value]]1000[[/]], are considered your summons, inherit [[value]]40%[[/]] of your Attack Damage. They are invulnerable, have no HP, and thus do not trigger effects based on HP.",
    },
    upgrades: [
      {
        level: 10,
        name: "Trap Force",
        description: "+[[value]]2[[/]]s to all summon durations",
        note: "Applies to summons from other sources, but some summons are not affected",
      },
      {
        level: 20,
        name: "Tethering Force",
        description: "When [[ref]]Enslave Undead[[/]] reaches its max count, a random undead has its attack cooldown reduced by [[value]]2[[/]]s, and its next attack deals additional [[value]]30%[[/]] damage",
        note: "An undead bound by souls does not expire until it makes an attack or you die, and its next attack will occur no sooner than [[value]]1[[/]] seconds later",
      },
      {
        level: 30,
        name: "Guiding Force",
        description: "Undead prioritize targets with low HP",
      },
      {
        level: 40,
        name: "Tribute to the Black Fertility Mother",
        description: "Killing a boss enemy spawns a more powerful undead.Increases the maximum number of enslaved units by one. This undead becomes a permanent boss-level follower that resets at the start of each round.",
        note: "Leader undead additionally inherit [[value]]30%[[/]] of Attack Damage. If the max is already reached, it replaces a normal undead.",
      },
    ],
    flavor: "Fear not the grim shepherd, for it is they who tend your flock. You may not see them, nor know that they are there, but when your final bleating cries are heard, they will be there to guide you unto grander pastures.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 6,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "eagle-eye-ring",
    gameId: "item_artifact_eagle_eye_ring",
    name: "Hawk-Eye Ring",
    era: "middle",
    icon: "/artifacts/eagle-eye-ring.png",
    iconName: "eagle_eye_ring",
    maxLevel: 40,
    heroLevel: 11,
    stats: [
      {
        name: "Attack Damage",
        base: 50,
        perLevel: 0.8,
      },
    ],
    unique: {
      name: "Hawk-Eye Insight",
      description: "+[[value]]30%[[/]] final critical damage",
    },
    upgrades: [
      {
        level: 10,
        name: "Reveal",
        description: "+[[value]]25%[[/]] vision radius. Grants unobstructed vision within [[value]]450[[/]] range.",
      },
      {
        level: 20,
        name: "Hawk Vision",
        description: "After critical strike, gain True Sight on the target for [[value]]15[[/]]s",
      },
      {
        level: 30,
        name: "Exposure",
        description: "Every [[value]]15[[/]]s, mark the nearest enemy within [[value]]1000[[/]] radius, causing it to take additional [[value]]40%[[/]] final critical damage",
      },
      {
        level: 40,
        name: "Fusion",
        description: "Once only, consume this Artifact to permanently gain [[value]]15%[[/]] final critical damage",
      },
    ],
    flavor: "A ring passed down in the name of Gough the Eagle Eye, one of the Four Knights who served Gwyn, the Lord of the First Flame.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 10,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "arcanomatic-railgun",
    gameId: "item_artifact_arcanomatic_railgun",
    name: "Keen Cannon",
    era: "middle",
    icon: "/artifacts/arcanomatic-railgun.png",
    iconName: "arcanomatic_railgun",
    maxLevel: 40,
    heroLevel: 11,
    stats: [
      {
        name: "Attack Damage",
        base: 30,
        perLevel: 0.3,
      },
      {
        name: "Agility",
        base: 20,
        perLevel: 0.25,
      },
    ],
    unique: {
      name: "Charged Sniping",
      description: "+[[value]]700[[/]] minimum Attack Range. Converts attacks into beams, firing one beam every [[value]]6[[/]] seconds at the target. Each beam hits all enemies in its path, dealing ([[value]]200%[[/]] + [[value]]100%[[/]] ) damage.",
      note: "Attack Speed affects charge rate. Each enemy hit causes damage to decay by [[value]]20%[[/]].",
    },
    second: {
      name: "Limited Effect",
      description: "All effects only apply to ranged attackers.",
    },
    upgrades: [
      {
        level: 10,
        name: "Hyper-Energy Penetration",
        description: "-[[value]]10%[[/]] [[ref]]Charged Sniping[[/]] damage decay",
      },
      {
        level: 20,
        name: "Hyper-Energy Piercing",
        description: "+[[value]]16[[/]] [[ref]]Charged Sniping[[/]] Armor Reduction",
      },
      {
        level: 30,
        name: "Overcharged",
        description: "After each cooldown cycle of [[ref]]Charged Sniping[[/]], gain additional [[value]]20%[[/]] Attack Damage inheritance and [[value]]50[[/]] minimum Attack Range",
        note: "Up to [[value]]10[[/]] stacks",
      },
      {
        level: 40,
        name: "Energy Overload",
        description: "-[[value]]1[[/]] seconds to minimum/maximum charge time. While at least [[value]]3[[/]] stacks of [[ref]]Overcharged[[/]], [[ref]]Charged Sniping[[/]] gains additional [[value]]100[[/]] beam width and damage no longer decays.",
      },
    ],
    flavor: "Strictly speaking, it is neither a cannon nor particularly 'giant'. Yet its first shot pierced an entire mountain, and amid gasps of awe, the name stuck.",
    drop: {
      pool: "General",
      weight: 200,
      chance: 0.6581,
      waveFrom: 6,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1500,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "keen-scope",
    gameId: "item_artifact_keen_scope",
    name: "Keen Scope",
    era: "middle",
    icon: "/artifacts/keen-scope.png",
    iconName: "keen_scope",
    maxLevel: 40,
    heroLevel: 10,
    stats: [
      {
        name: "Cast Range",
        base: 180,
        perLevel: 2,
      },
      {
        name: "Spell AMP",
        base: 15,
        perLevel: 0.12,
        unit: "%",
      },
    ],
    unique: {
      name: "Lens",
      description: "For targeted abilities, final damage is increased by [[value]]3%[[/]] for every [[value]]100[[/]] distance between you and the target.",
    },
    upgrades: [
      {
        level: 10,
        name: "Point-Blank Aim",
        description: "[[ref]]Lens[[/]] always gains at least the bonus of [[value]]400[[/]] distance.",
      },
      {
        level: 20,
        name: "Long-Range Aim",
        description: "If the target is farther than [[value]]80%[[/]] of the cast range, [[ref]]Lens[[/]] treats the target as being an additional [[value]]400[[/]] units away",
      },
      {
        level: 30,
        name: "Aiming Assist",
        description: "Increases the cast range of targeted abilities by [[value]]20%[[/]].",
      },
      {
        level: 40,
        name: "Focus",
        description: "Consecutively casting unit-targeted abilities on the same target grants [[ref]]Lens[[/]] bonus distance for its final distance calculation. Each cast adds [[value]]150[[/]] units, stacking up to [[value]]10[[/]] casts",
      },
    ],
    flavor: "The Keen are always inventing strange new gadgets. This scope, for instance, can spot the fuzz on a target’s face from three thousand yards away.",
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · DOTA",
    ],
  },
  {
    slug: "light-of-dawn",
    gameId: "item_artifact_light_of_dawn",
    name: "Light of Dawn",
    era: "middle",
    icon: "/artifacts/light-of-dawn.png",
    iconName: "light_of_dawn",
    maxLevel: 40,
    heroLevel: 10,
    stats: [
      {
        name: "Health",
        base: 500,
        perLevel: 6,
      },
      {
        name: "Buff Duration",
        base: 10,
        perLevel: 0.15,
        unit: "%",
      },
    ],
    unique: {
      name: "Rite of Light",
      description: "During Status, buff Duration granted by this Artifact have a [[value]]30%[[/]] chance to gain [[value]]200%[[/]] effectiveness.",
    },
    upgrades: [
      {
        level: 10,
        name: "Gift of Dawn",
        description: "Up to [[value]]1[[/]] time per Stage, when turns into , gain additional [[value]]2[[/]] After Act [[value]]3[[/]], each stack additionally grants [[value]]1[[/]]",
      },
      {
        level: 20,
        name: "Blessing of Dawn",
        description: "When [[ref]]Rite of Light[[/]] triggers, the target gains [[value]]18%[[/]] damage reduction until the applied effect expires",
      },
      {
        level: 30,
        name: "Shield of Tomorrow",
        description: "For each active [[ref]]Blessing of Dawn[[/]] on allied Heroes, you gain [[value]]15[[/]] per second",
        note: "The shield lasts until the end of the current Stage and can accumulate up to [[value]]25%[[/]] of your Max HP",
      },
      {
        level: 40,
        name: "Step into Tomorrow",
        description: "Can be used to grant Status for this StageCooldown: [[value]]2[[/]] Stages",
        note: "This also affects other Abilities and can trigger [[ref]]Gift of Dawn[[/]], regardless of whether it is currently night",
      },
    ],
    flavor: "All blessings granted by daylight can be forged into armor of light, and at the end of the long night, dawn shall always come.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 6,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "lord-of-madness",
    gameId: "item_artifact_lord_of_madness",
    name: "Lord of Frenzy",
    era: "middle",
    icon: "/artifacts/lord-of-madness.png",
    iconName: "lord_of_madness",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Primary Attribute",
        base: 20,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Inject Frenzy",
      description: "The artifact can be toggled on or off. While active, it applies [[color:#ff9b4a]]Burn[[/]] to yourself each second equal to [[value]]185%[[/]] of your primary attribute, while granting [[value]]50%[[/]] [[color:#ff9b4a]]Burn Resistance[[/]]. Whenever you take [[color:#ff9b4a]]Burn Damage[[/]], the prevented portion is emitted as [[color:#ff9b4a]]Burn[[/]] to enemies within [[value]]600[[/]] radius.",
    },
    upgrades: [
      {
        level: 10,
        name: "Tier One Resistance",
        description: "+[[value]]10%[[/]] [[color:#ff9b4a]]Burn Resistance[[/]] while [[ref]]Inject Frenzy[[/]] is active",
      },
      {
        level: 20,
        name: "Tier Two Resistance",
        description: "Grants [[value]]30%[[/]] [[color:#ff9b4a]]Burn Resistance[[/]] even while [[ref]]Inject Frenzy[[/]] is inactive.",
      },
      {
        level: 30,
        name: "Tier Three Resistance",
        description: "Blocks [[color:#ff9b4a]]Burn Damage[[/]] equal to [[value]]2%[[/]] of your Max Health.",
      },
      {
        level: 40,
        name: "Devotion",
        description: "The artifact can be activated a second time. All Burn applied to yourself and enemies is increased by [[value]]60%[[/]]. Additionally, when your [[color:#ff9b4a]]Burn Stacks[[/]] exceeds [[value]]80%[[/]] of your Max Health, gain an additional [[value]]25%[[/]] [[color:#ff9b4a]]Burn Resistance[[/]].",
      },
    ],
    flavor: "Why did he set himself on fire? I don't know. Maybe for the cause he believed in.",
    drop: {
      pool: "General",
      weight: 150,
      chance: 0.4936,
      waveFrom: 10,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    requiredDifficulty: 27,
    sources: [
      "May drop in EX+3 worlds or above",
    ],
  },
  {
    slug: "yulsarias-mantle",
    gameId: "item_artifact_yulsarias_mantle",
    name: "Mantle of Yulsaria",
    era: "middle",
    icon: "/artifacts/yulsarias-mantle.png",
    iconName: "yulsarias_mantle",
    maxLevel: 40,
    heroLevel: 11,
    stats: [
      {
        name: "Magic Armor",
        base: 20,
        perLevel: 0.2,
      },
      {
        name: "Mana",
        base: 25,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Frostmist",
      description: "Enemies within [[value]]800[[/]] range have their MS reduced by [[value]]20%[[/]] and their Magic Armor reduced by [[value]]18[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Encasing Frost",
        description: "Magic Armor reduction of [[ref]]Frostmist[[/]] is increased by [[value]]0.3[[/]]× against Frozen or Stunned enemies.",
      },
      {
        level: 20,
        name: "Breath of Yulsaria",
        description: "Enemies entering [[ref]]Frostmist[[/]] are Frozen for [[value]]2[[/]] seconds, each target has a [[value]]20[[/]] seconds cooldown",
      },
      {
        level: 30,
        name: "Permafrost",
        description: "For every [[value]]500[[/]] Max MP, [[ref]]Frostmist[[/]] gains additional [[value]]1[[/]] Magic Armor reduction, up to a maximum of [[value]]30[[/]].",
      },
      {
        level: 40,
        name: "Great Frostseal",
        description: "Can be toggled. While active, [[ref]]Frostmist[[/]] radius increases by [[value]]400[[/]] and Magic Armor reduction increases to [[value]]40[[/]], consuming [[value]]5%[[/]] MP per second.",
      },
    ],
    flavor: "In an age now lost to time, the Frozen Witch Yulsaria ruled the whitelands, summoning blizzards and hail storms upon those who displeased her, while an army of ice golems roamed the lands to snuff out all warmth. In time, her southward expansion angered the Eldwurm Slyrak who, in his terrible rage, melted Yulsaria's armies with his endless flame before conquering the Frozen Witch herself. Now, centuries later, shifts in the ice have uncovered yet another shard of her empire: her frosty mantle.",
    cost: {
      dust: 45,
    },
    sources: [
      "Drops from Astral Vault · Visitor from Beyond",
    ],
  },
  {
    slug: "nightfarer",
    gameId: "item_artifact_nightfarer",
    name: "Nightfarer",
    era: "middle",
    icon: "/artifacts/nightfarer.png",
    iconName: "nightfarer",
    maxLevel: 40,
    heroLevel: 10,
    stats: [
      {
        name: "Health Regeneration",
        base: 16,
        perLevel: 0.2,
      },
      {
        name: "Health",
        base: 400,
        perLevel: 5,
      },
      {
        name: "Mana",
        base: 400,
        perLevel: 4,
      },
    ],
    unique: {
      name: "Scatter Reforge",
      description: "Killing an enemy restores [[value]]8%[[/]] HP and [[value]]3%[[/]] MP, reduces the cooldown of a random Ability by [[value]]0.75[[/]] seconds.Effect is multiplied by [[value]]2[[/]] during Status.",
    },
    upgrades: [
      {
        level: 10,
        name: "Dark Vision",
        description: "+[[value]]500[[/]] night vision",
      },
      {
        level: 20,
        name: "Dark Harmony",
        description: "During Status, gain +[[value]]30%[[/]] HP Regeneration and [[value]]10%[[/]]",
      },
      {
        level: 30,
        name: "Night Crossing",
        description: "For every [[value]]3[[/]] Stages ended at Status, gain random [[value]]1[[/]] [[icon:tooltip/aghs-shard]]Scepter Shard[[/]]",
      },
      {
        level: 40,
        name: "Night Reign",
        description: "an be activated, usable [[value]]3[[/]] times per day, granting permanentStatus this game. Further uses require after reaching the daily limit.",
        note: "This also affects other abilities, and the effect persists even if the artifact is removed.",
      },
    ],
    flavor: "Woven from drifting strands of mist, forever cycling between dispersion and reformation.",
    drop: {
      pool: "General",
      weight: 200,
      chance: 0.6581,
      waveFrom: 6,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1500,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "sovereign-of-the-azure-seas",
    gameId: "item_artifact_sovereign_of_the_azure_seas",
    name: "Ocean Ruler",
    era: "middle",
    icon: "/artifacts/sovereign-of-the-azure-seas.png",
    iconName: "sovereign_of_the_azure_seas",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Attack Damage",
        base: 70,
        perLevel: 1.5,
      },
    ],
    unique: {
      name: "Sea Return",
      description: "Your next attack deals a [[value]]230%[[/]] Critical Strike and cleaves enemies in a large area in front for [[value]]100%[[/]] damage. While in Water Terrain, this attack gains [[value]]40%[[/]] Armor Penetration.",
    },
    upgrades: [
      {
        level: 10,
        name: "Dominance",
        description: "-[[value]]2[[/]] seconds [[ref]]Sea Return[[/]]'s cooldown",
      },
      {
        level: 20,
        name: "No Recall",
        description: "Armor Penetration gained from [[ref]]Sea Return[[/]] persists temporarily, decaying over [[value]]4[[/]] seconds.",
      },
      {
        level: 30,
        name: "Calamity Shift",
        description: "If under Water Terrain, [[ref]]No Recall[[/]] applied to the primary target is propagated to enemies affected by the cleave prior to the cleave damage.",
      },
      {
        level: 40,
        name: "Present Break",
        description: "[[ref]]Sea Return[[/]] creates a lingering slash line. After [[value]]1.5[[/]] seconds, enemies along the line are struck again for the same damage. This effect can hit the original target. Enemies within the slash path are Stalled while the effect persists.",
      },
    ],
    flavor: "If any blade could symbolize mastery over the ocean, it would be this one.",
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · Weapon Master",
    ],
  },
  {
    slug: "primordial-earth-heart",
    gameId: "item_artifact_primordial_earth_heart",
    name: "Primordial Earth Heart",
    era: "middle",
    icon: "/artifacts/primordial-earth-heart.png",
    iconName: "primordial_earth_heart",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Strength",
        base: 30,
        perLevel: 0.4,
      },
      {
        name: "Armor",
        base: 15,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Stoneskin",
      description: "As solid as bedrock, -[[value]]130[[/]] Movement Speed, but gain [[value]]40%[[/]] physical damage reduction and immunity to physical damage below [[value]]100[[/]].",
    },
    second: {
      name: "[Curse] Petrification",
      description: "After equipping this Artifact [[value]]3[[/]] times within the same day, you will be cursed. Each time you enter the labyrinth, this Artifact is automatically equipped and can only be removed by spending .",
      note: "Requires a certain level to activate. If there is insufficient Dust at the start, it will not be equipped.",
    },
    upgrades: [
      {
        level: 10,
        name: "Earth Attunement",
        description: "+[[value]]25%[[/]] model scale. For every [[value]]5%[[/]] additional model scale, gain [[value]]1%[[/]] Max HP",
      },
      {
        level: 20,
        name: "Highlands",
        description: "+[[value]]40%[[/]] slow resistance",
      },
      {
        level: 30,
        name: "Earth Stomp",
        description: "Every [[value]]6[[/]]s, deal damage equal to [[value]]10%[[/]] of your Max HP to enemies within a [[value]]350[[/]] radius beneath you",
        note: "Damage is further increased based on your model scale",
      },
      {
        level: 40,
        name: "Assimilation",
        description: "After [[ref]]Stoneskin[[/]] takes effect, gain an additional [[value]]25%[[/]] model scale. [[ref]]Stoneskin[[/]] is replaced by [[ref]]Advanced Stoneskin[[/]], no longer reduces MS, and now can block [[value]]150[[/]] physical damage",
      },
    ],
    flavor: "You must understand—he is a myth. There has never been any proof, and it is not unreasonable to think it all a mess of foolish assumptions. So when the blasting slurry detonated ahead of schedule, shattering the supports, every crewman knew we were finished. The cavern groaned under its own weight; there was nowhere to go but down. Then the ground split. Jagged crystals burst from the fissures, rising toward the ceiling. We fled without shame—most with only minor wounds. I was the last to leave. And when I looked back… I will never forget that diamond-bright smile at the end of the tunnel, before the crystal faded and everything collapsed. No one else saw it, but… I know it was no illusion. He is still down there, somewhere. I know it. And while he remains, I will do all I can to repay him. — Report of a miner’s encounter with Tyre Gallem, from Planar Exiles",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 6,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "providence",
    gameId: "item_artifact_providence",
    name: "Providence",
    era: "middle",
    icon: "/artifacts/providence.png",
    iconName: "providence",
    maxLevel: 40,
    heroLevel: 10,
    stats: [
      {
        name: "Damage Reduction",
        base: 10,
        perLevel: 0.15,
        unit: "%",
      },
    ],
    unique: {
      name: "Sanctuary",
      description: "Gain ([[value]]100[[/]] + Hero level × [[value]]30[[/]]) .The shield is restored [[value]]40[[/]] seconds after it is broken.",
    },
    upgrades: [
      {
        level: 10,
        name: "Undying",
        description: "-[[value]]10[[/]] seconds [[ref]]Sanctuary[[/]] restoration time",
      },
      {
        level: 20,
        name: "Dissent",
        description: "Enemy deaths within a [[value]]1000[[/]] radius increase the current [[ref]]Sanctuary[[/]] shield value by [[value]]10%[[/]]",
        note: "The shield value can be increased up to [[value]]300%[[/]] of its initial value",
      },
      {
        level: 30,
        name: "Guardian Soul",
        description: "Once per Stage, block lethal damage and fully restore the [[ref]]Sanctuary[[/]] shield",
      },
      {
        level: 40,
        name: "Providence",
        description: "Increase the [[ref]]Sanctuary[[/]] shield value equal to ([[value]]25%[[/]] Max HP)/([[value]]25%[[/]] Max MP)",
        note: "The higher value is applied",
      },
    ],
    flavor: "At the summit of the Sacred Mountain Aurélion, the first ray of sunlight on the anniversary of the Battle of Dawn pierces the crystal crown and reflects the blessing of the firmament upon this relic.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 6,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "rose-scepter",
    gameId: "item_artifact_rose_scepter",
    name: "Rose Scepter",
    era: "middle",
    icon: "/artifacts/rose-scepter.png",
    iconName: "rose_scepter",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Spell AMP",
        base: 15,
        perLevel: 0.1,
        unit: "%",
      },
      {
        name: "Intelligence",
        base: 20,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Poor Man's Rose",
      description: "Plants a rose at the target location that continuously releases toxic fumes, reducing the Magic Armor of nearby enemies and dealing damage over time.Duration: [[value]]15[[/]] secondsRadius: [[value]]500[[/]]Magic Armor Reduction: [[value]]25[[/]]Damage per Second: [[[value]]300%[[/]] + [[value]]8%[[/]] Max Mana]",
    },
    upgrades: [],
    flavor: "The Poor Man’s Rose is a low-cost miniature weapon of mass destruction. Cheap to produce and devastating in effect, it is beloved by petty dictators and desperate nations alike.",
    drop: {
      pool: "General",
      weight: 100,
      chance: 0.3291,
      waveFrom: 6,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    requiredDifficulty: 27,
    sources: [
      "May drop in EX+3 worlds or above",
    ],
  },
  {
    slug: "malenias-winged-helm",
    gameId: "item_artifact_malenias_winged_helm",
    name: "Rotwing",
    era: "middle",
    icon: "/artifacts/malenias-winged-helm.png",
    iconName: "malenias_winged_helm",
    maxLevel: 40,
    heroLevel: 11,
    stats: [
      {
        name: "Health",
        base: 500,
        perLevel: 10,
      },
      {
        name: "Status Resistance",
        base: 25,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Crimson Curse",
      description: "+[[value]]20%[[/]] to all damageWhile in combat, gain [[value]]3[[/]] stacks of Crimson Decay per second. Killing an enemy removes [[value]]10[[/]] stacks. Death clears all stacks. [[color:#4f4f4f]]Damage dealt per stack of Decay: [[value]]0.1%[[/]]Extra damage taken per stack: [[value]]0.5%[[/]]Maximum stacks: [[value]]300[[/]][[/]]",
    },
    upgrades: [
      {
        level: 10,
        name: "Curse Resistance",
        description: "-[[value]]0.15%[[/]] [[color:#4f4f4f]]additional damage taken per stack of [[ref]]Crimson Curse[[/]][[/]]",
      },
      {
        level: 20,
        name: "Decaying Blossom",
        description: "[[value]]1[[/]] times per Stage, when you take lethal damage, if [[ref]]Crimson Curse[[/]] stacks exceed [[value]]100[[/]], remove all stacks, block this damage, and restore HP to [[value]]50%[[/]]",
      },
      {
        level: 30,
        name: "Oath",
        description: "When HP falls below [[value]]25%[[/]], restore [[value]]10%[[/]] HP, and increase the maximum stacks of [[ref]]Crimson Curse[[/]] by [[value]]50%[[/]], stacking independently for [[value]]120[[/]]sCooldown [[value]]5[[/]]s",
      },
      {
        level: 40,
        name: "Obsession",
        description: "At the start of the Stage, gain [[value]]10[[/]] charges. Gain 1 Charge every [[value]]3[[/]] seconds. When you take damage, you may consume 1 Charge to negate the increased damage of [[ref]]Crimson Curse[[/]].",
      },
    ],
    flavor: "The Valkyries swore solemn oaths to oppose the spread of the God of Rot’s influence at any cost. The first true trial of their devotion was to draw the scarlet plague into their own bodies, wielding its unfathomable power to fight its very source.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 10,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "saintblood-twinblades",
    gameId: "item_artifact_saintblood_twinblades",
    name: "Saintblood Twinblades",
    era: "middle",
    icon: "/artifacts/saintblood-twinblades.png",
    iconName: "saintblood_twinblades",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Agility",
        base: 20,
        perLevel: 0.2,
      },
      {
        name: "Max Attack Speed",
        base: 40,
        perLevel: 0.3,
      },
    ],
    unique: {
      name: "Overture",
      description: "Odd-numbered attacks trigger [[ref]]Blood Rhythm[[/]], consuming [[value]]5%[[/]] of your current HP and converting it into [[value]]150%[[/]] bonus Attack Damage. Even-numbered attacks trigger [[ref]]Holy Rhythm[[/]], healing you for [[value]]20%[[/]] of the attack's damage. When your HP is below [[value]]50%[[/]], both effects are amplified by [[value]]100%[[/]].Every [[value]]4[[/]] attack cycles, gain [[value]]1[[/]] stacks of [[ref]]Overture[[/]]. The cycles required for each subsequent gain increase by [[value]]1[[/]].",
    },
    second: {
      name: "Saintblood Melody",
      description: "+ [[value]]2[[/]] all attributes/Stacks. Resets at the start of each stage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Interlude",
        description: "+[[value]]1%[[/]] Attack Damage for every [[value]]3[[/]] stacks of [[ref]]Overture[[/]]",
      },
      {
        level: 20,
        name: "Main Theme",
        description: "When [[ref]]Overture[[/]] reaches [[value]]15[[/]] stacks, your base attack time is reduced by [[value]]0.1[[/]]s",
      },
      {
        level: 30,
        name: "Variation",
        description: "[[ref]]Blood Rhythm[[/]] splatters blood, sending [[color:#ff3321]]Blood Mark[[/]] to nearby enemies. Hitting a marked enemy with [[ref]]Holy Rhythm[[/]] transfers [[value]]1[[/]] stacks of to another nearby enemy and deals bonus damage equal to [[color:#ff3321]]Blood Mark Stacks[[/]] × [[value]]10%[[/]] of your Attack Damage. stacks independently and lasts [[value]]7[[/]]s",
      },
      {
        level: 40,
        name: "Finale",
        description: "Taking lethal damage grants [Finale] for [[value]]3[[/]] seconds. During [Finale], you are immune to all damage, and attacks trigger both Amplifying Melodies. Once per stage.Fake Death can also trigger [Finale]. If already active, its duration is refreshed and extended. [Finale] can last up to [[value]]30[[/]] seconds per stage and cannot be extended while more than [[value]]6[[/]]s remain",
      },
    ],
    flavor: "A bloodstained saint who murdered the very god she worshipped. Kind, selfless, and pure, she was deceived by a false god’s lies—only to be condemned by another, more hypocritical deity. Punished for the crime of deicide, she was twisted into an inhuman abomination...",
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · Weapon Master",
    ],
  },
  {
    slug: "staff-of-resurrection",
    gameId: "item_artifact_staff_of_resurrection",
    name: "Scepter of Rebirth",
    era: "middle",
    icon: "/artifacts/staff-of-resurrection.png",
    iconName: "staff_of_resurrection",
    maxLevel: 40,
    heroLevel: 11,
    stats: [
      {
        name: "Health",
        base: 600,
        perLevel: 8,
      },
      {
        name: "Mana",
        base: 600,
        perLevel: 8,
      },
    ],
    unique: {
      name: "Rebirth",
      description: "[[value]]2[[/]] available per Match, [[value]]5[[/]] available per day. Spend [[value]]1800[[/]] gold to revive a Hero.",
      note: "Revives the closest target to the cast point",
    },
    upgrades: [
      {
        level: 10,
        name: "Restored State",
        description: "[[ref]]Rebirth[[/]] refreshes all Ability and item cooldowns of the target",
      },
      {
        level: 20,
        name: "Blessing of Immortality",
        description: "[[ref]]Rebirth[[/]] grants the target [[value]]15[[/]] until death",
      },
      {
        level: 30,
        name: "Authority of the Highborn",
        description: "[[ref]]Rebirth[[/]] daily uses are increased to [[value]]10[[/]], and this Artifact no longer consumes Chrono Dust",
      },
      {
        level: 40,
        name: "Grace of the Sacred King",
        description: "The first [[value]]2[[/]] uses of [[ref]]Rebirth[[/]] each day do not consume gold",
      },
    ],
    flavor: "The scepter whispers a requiem of a forgotten dynasty. Once the supreme symbol of the Twin Thrones, its power does not grant life, but reverses the flow of the River of Death, dragging souls back to their bodies.",
    drop: {
      pool: "General",
      weight: 900,
      chance: 2.9615,
      waveFrom: 6,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "evil-serpent-of-the-abyss",
    gameId: "item_artifact_evil_serpent_of_the_abyss",
    name: "Serpent of the Abyss",
    era: "middle",
    icon: "/artifacts/evil-serpent-of-the-abyss.png",
    iconName: "evil_serpent_of_the_abyss",
    maxLevel: 40,
    heroLevel: 11,
    stats: [
      {
        name: "Health",
        base: 500,
        perLevel: 6,
      },
      {
        name: "Strength",
        base: 20,
        perLevel: 0.3,
      },
    ],
    unique: {
      name: "Abyssal Idol",
      description: "When you active Teleport/Blink-type Ability, release a fiery blast at the destination within a [[value]]400[[/]] radius, applying burning effect equal to ([[value]]300[[/]] + [[value]]200%[[/]] of Primary Attribute).",
    },
    upgrades: [
      {
        level: 10,
        name: "Abyssal Boon",
        description: "+[[value]]15%[[/]] cast range for Teleport/Blink-type Abilities",
      },
      {
        level: 20,
        name: "Abyssal Swiftness",
        description: "-[[value]]15%[[/]] cooldown for Teleport/Blink-type Abilities",
      },
      {
        level: 30,
        name: "Abyssal Ember",
        description: "[[ref]]Abyssal Idol[[/]] leaves a burning zone on the ground for [[value]]4[[/]]s, reducing burn damage decay by [[value]]65%[[/]] within the area",
      },
      {
        level: 40,
        name: "Abyssal Decay",
        description: "Can be toggled. While active, [[ref]]Abyssal Ember[[/]] duration is increased by [[value]]10[[/]]s, and you are also afflicted with burning damage.This effect can be disabled at any time, otherwise it lasts until the end of the Stage. The Artifact is disabled for [[value]]1[[/]] Stages after this effect ends.",
      },
    ],
    flavor: "When the winged serpent’s eyes glow yellow, the seal still holds. When that light fades, you would do well to run, pray, or beg, even though none of it will save you.",
    cost: {
      dust: 45,
    },
    sources: [
      "Drops from Astral Vault · Darkmoon Guidance",
    ],
  },
  {
    slug: "shadow-of-subverter",
    gameId: "item_artifact_shadow_of_subverter",
    name: "Subverter Gloom",
    era: "middle",
    icon: "/artifacts/shadow-of-subverter.png",
    iconName: "shadow_of_subverter",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Health",
        base: 500,
        perLevel: 6,
      },
      {
        name: "All Attributes",
        base: 10,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Reverse",
      description: "Your final healing effect is reduced by [[value]]40%[[/]]. Additionally, each time you heal, an energy wave with a radius of [[value]]350[[/]] is triggered centered on your heal target, dealing [[value]]125%[[/]] of that heal amount as damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Never Die",
        description: "The healing reduction imposed by [[ref]]Reverse[[/]] is weakened on low-health targets.",
      },
      {
        level: 20,
        name: "False Shield",
        description: "While healing, generates equal to [[value]]20%[[/]] of healing amount, lasting until the end of the stage, up to [[value]]150%[[/]] of max HP.",
      },
      {
        level: 30,
        name: "Living Undeath",
        description: "Can be used to reduce your HP to [[value]]1[[/]], preventing death for the next [[value]]6[[/]] seconds. Cooldown: [[value]]60[[/]] seconds. Triggers a Fake Death upon activation, which can be used to trigger certain death effects.",
      },
      {
        level: 40,
        name: "Undead March",
        description: "Each time you heal, there is a chance based on the healing amount to trigger on the target hero. Base chance: [[value]]10%[[/]]. Each trigger reduces the chance by half, stacking independently for [[value]]70[[/]]s.",
      },
    ],
    flavor: "A set meant for anyone trying to break reality's script. A former friend recalls the wearer as once being totally gentle. Chances are, the Abyss Sovereign's dirty work is behind it all.",
    drop: {
      pool: "General",
      weight: 150,
      chance: 0.4936,
      waveFrom: 10,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    requiredDifficulty: 27,
    sources: [
      "May drop in EX+3 worlds or above",
    ],
  },
  {
    slug: "tesla-cannon",
    gameId: "item_artifact_tesla_cannon",
    name: "Tesla Cannon",
    era: "middle",
    icon: "/artifacts/tesla-cannon.png",
    iconName: "tesla_cannon",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Attack Damage",
        base: 60,
        perLevel: 0.6,
      },
    ],
    unique: {
      name: "Hyper-Energy Blast",
      description: "The next attack deals [[value]]150%[[/]]damage to enemies in a line, and hit enemies take an additional [[value]]25%[[/]] damage after [[value]]5[[/]] seconds.",
      note: "Debuff Status is applied before dealing damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Precision Correction",
        description: "For every [[value]]100[[/]] distance from you, deal additional [[value]]3%[[/]] bonus damage.",
      },
      {
        level: 20,
        name: "Shock Reset",
        description: "[[ref]]Hyper-Energy Blast[[/]] damage on the target permanently increases by [[value]]5%[[/]] each time, up to [[value]]60%[[/]]",
      },
      {
        level: 30,
        name: "Light Strike",
        description: "Each attack has a [[value]]10%[[/]] chance to trigger the [[ref]]Hyper-Energy Blast[[/]] effect",
      },
      {
        level: 40,
        name: "Overload",
        description: "Can be activated, reducing [[ref]]Hyper-Energy Blast[[/]] cooldown by [[value]]40%[[/]], increasing [[ref]]Light Strike[[/]] trigger chance by [[value]]15%[[/]], but the generated rays have divergence",
      },
    ],
    flavor: "An energy weapon crafted from the ore of Thunder Mountain. Its pitch-black barrel possesses APEX energy conductivity, allowing energy to be output and radiated with almost no loss. The creator is unknown; it is said to be a deity, but there is no evidence to substantiate this—perhaps it is merely the self-deception of those dwarf craftsmen...",
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · Imperial Reign",
    ],
  },
  {
    slug: "tyrant-kings-robe",
    gameId: "item_artifact_tyrant_kings_robe",
    name: "Tyrant’s Mantle",
    era: "middle",
    icon: "/artifacts/tyrant-kings-robe.png",
    iconName: "tyrant_kings_robe",
    maxLevel: 100,
    heroLevel: 12,
    stats: [
      {
        name: "Primary Attribute",
        base: 35,
        perLevel: 0.3,
      },
    ],
    unique: {
      name: "Tyranny",
      description: "For every [[value]]1[[/]] Stage carried, provides an additional [[value]]4[[/]] Primary Attributes bonus.",
      note: "Universal Hero splits the bonus equally.",
    },
    second: {
      name: "[Curse]Tyrant's Obsession",
      description: "Removing this Artifact permanently takes an additional [[value]]50%[[/]] damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Intimidation",
        description: "The first damage dealt to you by an enemy has no effect",
      },
      {
        level: 20,
        name: "Eternal Reign",
        description: "Even after removing the Artifact, retains [[value]]50%[[/]] of the bonus from [[ref]]Tyranny[[/]]",
      },
      {
        level: 30,
        name: "Sovereign’s Rule",
        description: "The secondary bonuses granted by each point of your Primary Attribute are increased by [[value]]30%[[/]]",
        note: "Does not grant Spell Amplification",
      },
      {
        level: 40,
        name: "Soothe Obsession",
        description: "Can be used, each time consuming [[value]]2000[[/]] gold to permanently gain secondary bonus from [[value]]5%[[/]] Primary Attributes, after reaching [[value]]5[[/]] times it is no longer affected by [[ref]]Tyranny[[/]], and can be removed/used at any times.",
      },
      {
        level: 100,
        name: "Awaken",
        description: "The obsession lingering here has not yet gained enough strength to manifest...",
      },
    ],
    flavor: "The Hidden Church's collection is truly diverse... they even managed to acquire the mantle of a former tyrant king. Although that tyrant has vanished into the river of history, his former subjects would never allow 'commoners' to touch their king's belongings. But the Hidden Church cares not for such things; these items all flow into their black market.",
    cost: {
      dust: 45,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · Shadow Sect",
    ],
  },
  {
    slug: "voiceless-gaze",
    gameId: "item_artifact_voiceless_gaze",
    name: "Voiceless Gaze",
    era: "middle",
    icon: "/artifacts/voiceless-gaze.png",
    iconName: "voiceless_gaze",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Mana",
        base: 25,
        perLevel: 0.3,
        unit: "%",
      },
    ],
    unique: {
      name: "Voiceless Glimmer",
      description: "This Artifact can be toggled, forcing you into silence. While active, it deals damage equal to [[value]]8%[[/]] of your maximum mana each second to enemies within [[value]]700[[/]] range. Once activated, it cannot be deactivated for [[value]]15[[/]] seconds unless you die.",
    },
    upgrades: [
      {
        level: 10,
        name: "Farsighted Gaze",
        description: "Increases the radius of [[ref]]Voiceless Glimmer[[/]] to [[value]]20%[[/]] of your vision range",
      },
      {
        level: 20,
        name: "Nearsighted Gaze",
        description: "[[ref]]Voiceless Glimmer[[/]] deals [[value]]40%[[/]] increased damage to the target you are attacking",
      },
      {
        level: 30,
        name: "Fleeting Glimpse",
        description: "Upon entering a stage, gain [[value]]1500[[/]] vision range. This bonus decays over time",
      },
      {
        level: 40,
        name: "Insight",
        description: "[[ref]]Voiceless Glimmer[[/]] additionally affects the [[value]]2[[/]] lowest-health enemies within your vision range, treating them as targets of [[ref]]Nearsighted Gaze[[/]]. If these targets are also within its normal radius, they are hit multiple times.",
      },
    ],
    flavor: "Silence does not mean having nothing to say; sometimes, silence itself speaks with deafening force.",
    drop: {
      pool: "General",
      weight: 200,
      chance: 0.6581,
      waveFrom: 6,
      waveTo: 11,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    requiredDifficulty: 15,
    sources: [
      "May drop in S world or above",
    ],
  },
  {
    slug: "nihility-fulcrum",
    gameId: "item_artifact_nihility_fulcrum",
    name: "Void Anchor",
    era: "middle",
    icon: "/artifacts/nihility-fulcrum.png",
    iconName: "nihility_fulcrum",
    maxLevel: 40,
    heroLevel: 12,
    stats: [
      {
        name: "Final Spell AMP",
        base: 10,
        perLevel: 0.1,
        unit: "%",
      },
    ],
    unique: {
      name: "Void Return",
      description: "Every [[value]]10[[/]] seconds, deals damage equal to [[value]]25%[[/]] of your highest single Ability damage in this Stage to up to [[value]]2[[/]] enemies within [[value]]900[[/]] radius.",
      note: "Damage cannot exceed [[value]]2000%[[/]] of Primary Attributes. Damage type will match the recorded damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Void Penetration",
        description: "[[ref]]Void Return[[/]] damage ignores [[value]]25%[[/]] Armor/Magic Armor Reduction",
      },
      {
        level: 20,
        name: "Void Annihilation",
        description: "[[ref]]Void Return[[/]] deals [[value]]50%[[/]] splash damage within [[value]]260[[/]] radius",
      },
      {
        level: 30,
        name: "Void Creation",
        description: "Once per Stage, this Artifact can be used to create a Void Anchor at a targeted location. Every [[value]]15[[/]] seconds, it applies [[ref]]Void Return[[/]] to the nearest [[value]]1[[/]] visible enemies within [[value]]1800[[/]] range.",
      },
      {
        level: 40,
        name: "Void Fusion",
        description: "[[ref]]Void Return[[/]] gains cooldown reduction equal to [[value]]40%[[/]] of the last trigger’s source Ability cooldown reduction.",
      },
    ],
    flavor: "Void Shard is a substance formed from aether, lacking a fixed form and influenced by the user's characteristics; depending on the user, it exhibits entirely different properties. In this regard, this weapon has not fully utilized the advantages of Void Shard. Nevertheless, the creator of this weapon is a rare forge master, so this fixed property has been maximized.",
    drop: {
      pool: "General",
      weight: 100,
      chance: 0.3291,
      waveFrom: 6,
    },
    cost: {
      dust: 45,
      platinum: 1000,
    },
    requiredDifficulty: 27,
    sources: [
      "May drop in EX+3 worlds or above",
    ],
  },
  {
    slug: "abyssal-avenger",
    gameId: "item_artifact_abyssal_avenger",
    name: "Abyssal Avenger",
    era: "post",
    icon: "/artifacts/abyssal-avenger.png",
    iconName: "abyssal_avenger",
    maxLevel: 60,
    heroLevel: 17,
    stats: [
      {
        name: "Attack Damage",
        base: 50,
        perLevel: 0.5,
      },
      {
        name: "Melee Attack Range",
        base: 120,
        perLevel: 2,
      },
    ],
    unique: {
      name: "Abyssal Maw",
      description: "Attacks slow the target's MS by [[value]]30%[[/]] and reduce Armor by [[value]]8[[/]] for [[value]]4[[/]] seconds. While in Water Terrain, this Artifact grants [[value]]100%[[/]] bonus [[color:#61a5fe]]Melee Attack Range[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Tidal Erosion",
        description: "Grants [[value]]3[[/]] seconds [[ref]]Abyssal Maw[[/]] duration. Armor reduction increases by [[value]]1[[/]] /[[value]]2[[/]] seconds, up to [[value]]10[[/]].",
      },
      {
        level: 20,
        name: "Abyssal Prison",
        description: "The first attack against an enemy grants [[value]]10[[/]] seconds to [[ref]]Abyssal Maw[[/]] debuff duration and creates a water sphere that traps the target, preventing movement for [[value]]3[[/]] seconds. If the target dies while trapped, you gain for [[value]]15[[/]] sceconds.",
      },
      {
        level: 30,
        name: "Tidal Dominion",
        description: "While in , attacking enemies affected by [[ref]]Abyssal Maw[[/]] shares [[value]]20%[[/]] of the damage dealt with other enemies with the same debuff.",
        note: "This shared damage is applied once every [[value]]1[[/]] seconds.",
      },
      {
        level: 40,
        name: "Abyssal Descent",
        description: "[[value]]2[[/]] times per day. Activate to assume a massive sea monster form. In this form:· +[[value]]50%[[/]] Max HP, +[[value]]30%[[/]] Base Strength and Base Agility· Your attacks are always melee and deal [[value]]50%[[/]] splash damage within [[value]]300[[/]] range[[color:#fe6161]]· Intelligence reduced by [[value]]50%[[/]]· No other transformations allowed· Leaving disables bonuses for [[value]]15[[/]] seconds[[/]]",
        note: "Base Attack Range is set to [[value]]250[[/]]. Removing this Artifact also removes this effect.",
      },
      {
        level: 60,
        name: "Tainted Fall",
        description: "[[ref]]Abyssal Descent[[/]] daily limit increased to [[value]]4[[/]]. After reaching the daily limit, further uses require .",
      },
    ],
    flavor: "Your soul is but a single droplet within the boundless ocean of my power. Offer it willingly, be reborn within the abyssal vortex, and let your enemies find their doom therein.",
    drop: {
      pool: "Siltbreaker",
      weight: 250,
      chance: 41.6667,
      waveFrom: 10,
    },
    cost: {
      dust: 60,
      platinum: 2500,
    },
    requiredDifficulty: 24,
    sources: [
      "Drops only from the [Prison of the Siltbreaker] in EX worlds or above.",
    ],
  },
  {
    slug: "blighttouch-scepter",
    gameId: "item_artifact_blighttouch_scepter",
    name: "Blighttouch Scepter",
    era: "post",
    icon: "/artifacts/blighttouch-scepter.png",
    iconName: "blighttouch_scepter",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Intelligence",
        base: 30,
        perLevel: 0.3,
      },
      {
        name: "Poison Application",
        base: 15,
        perLevel: 0.15,
        unit: "%",
      },
    ],
    unique: {
      name: "Blighttouch Parasite",
      description: "Enemies you afflict with [[color:#98f698]]Poison[[/]] are marked by a Parasite. If a marked enemy maintains the highest [[color:#98f698]]Poison[[/]] stacks for [[value]]3[[/]]s, the Parasite awakens, pulling up to [[value]]4[[/]] marked enemies within [[value]]400[[/]] toward it.Affected enemies gain [[ref]]Blighttouch[[/]] for [[value]]3[[/]]s, slowing movement by [[value]]20%[[/]] and [[color:#98f698]]Poison Decay[[/]] by [[value]]15%[[/]], and activating [[color:#98f698]]Poison[[/]] once. Secondary targets consume no [[color:#98f698]]Poison Stacks[[/]] and use the primary target's stack count.Activation Ratio: [[value]]5%[[/]]Activation Damage: [[value]]1200%[[/]]",
      note: "The pull and activation repeat every [[value]]3[[/]]s",
    },
    upgrades: [
      {
        level: 10,
        name: "Deep Roots",
        description: "Entangled secondary targets transfer [[value]]5%[[/]] of their [[color:#98f698]]Poison[[/]] stacks to the primary target",
      },
      {
        level: 20,
        name: "Twisted Knots",
        description: "Tentacles bounce from secondary targets at an angle [[value]]1[[/]] times",
      },
      {
        level: 30,
        name: "Strangulation",
        description: "While [[ref]]Blighttouch[[/]] lasts, activates [[color:#98f698]]Poison[[/]] every [[value]]1[[/]]s.Activation Ratio: [[value]]2%[[/]]Activation Damage: [[value]]700%[[/]]",
      },
      {
        level: 40,
        name: "Breeding Ground",
        description: "When the primary target dies, [[value]]30%[[/]] of its remaining [[color:#98f698]]Poison[[/]] stacks are distributed among entangled targets",
      },
    ],
    flavor: "That fell venom shall not merely abide within the flesh. It shall take root and blossom, seeking out the soul most grievously corrupted, and drawing all other wretches into the very heart of decay.",
    drop: {
      pool: "General",
      weight: 30,
      chance: 0.0987,
      waveFrom: 8,
    },
    cost: {
      dust: 60,
      platinum: 1000,
    },
    requiredDifficulty: 37,
    sources: [
      "May drop in EX+13 worlds or above",
    ],
  },
  {
    slug: "slaimute",
    gameId: "item_artifact_slaimute",
    name: "Bloodbound Slymet",
    era: "post",
    icon: "/artifacts/slaimute.png",
    iconName: "slaimute",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Health",
        base: 600,
        perLevel: 6,
      },
      {
        name: "Health Regeneration",
        base: 20,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Blood Barrier",
      description: "When HP is above [[value]]90%[[/]], excess blood is stored. When HP falls below [[value]]50%[[/]], stored blood is consumed to restore HP. Can store up to [[value]]500%[[/]] of Max HP as blood. Resets at the start of each Stage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Blood Cushion",
        description: "For every [[value]]100%[[/]] of Max HP stored as blood, gain [[value]]3[[/]] Armor",
      },
      {
        level: 20,
        name: "Autonomous Assault",
        description: "For every [[value]]100%[[/]] of Max HP stored as blood, gain 1 [[ref]]Autonomous Assault[[/]]. Each attacks once every [[value]]7[[/]] seconds, dealing [[value]]3%[[/]] of current stored blood as damage.",
      },
      {
        level: 30,
        name: "Blood Compression",
        description: "Max storage increased to [[value]]1000%[[/]], and at the start of a Stage, grants blood equal to [[value]]40%[[/]] Max HP",
      },
      {
        level: 40,
        name: "Pure Bloodbound",
        description: "Reduces [[value]]30%[[/]] cost when [[ref]]Blood Barrier[[/]] restores life. Each time blood is consumed, reduce the attack cooldown of all [[ref]]Autonomous Assault[[/]] by [[value]]0.5[[/]] seconds, but attacks have a minimum cooldown of [[value]]1.5[[/]] seconds.",
      },
    ],
    flavor: "An artificial symbiote derived from a demonic core. Through an intricate process of arcane manipulation and bio-engineering, the Grand Archive’s Biotics Division succeeded in creating a symbiotic slime core, allowing a host creature to bond with it and generate endoplasm and an exoskeletal layer, protecting both the slime and its core from harm.",
    drop: {
      pool: "General",
      weight: 200,
      chance: 0.6581,
      waveFrom: 10,
    },
    cost: {
      dust: 60,
      platinum: 1500,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "cosmic-aspect",
    gameId: "item_artifact_cosmic_aspect",
    name: "Cosmic Aspect",
    era: "post",
    icon: "/artifacts/cosmic-aspect.png",
    iconName: "cosmic_aspect",
    maxLevel: 50,
    heroLevel: 6,
    stats: [
      {
        name: "Summon AMP",
        base: 25,
        perLevel: 0.2,
        unit: "%",
      },
      {
        name: "All Attributes",
        base: 15,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Cosmic Warden",
      description: "Summon the Guardian, which possesses various special abilities. Until the wielder reaches level [[value]]17[[/]], this Artifact provides only [[value]]40%[[/]] of its base bonuses, and the Guardian's attributes are reduced to [[value]]35%[[/]] as well.",
      note: "Uncontrollable Guardian follows you. ATK: [[value]]200[[/]] + [[value]]1[[/]]x all-attribute. HP= [[value]]150%[[/]] of your Mana. Resummoned at stage start.",
    },
    second: {
      name: "Aegis of the Immortal",
      description: "The Guardian has Debuff immunity and [[value]]20[[/]]s auto respawn.",
    },
    upgrades: [
      {
        level: 10,
        name: "Immortal Ascension",
        description: "Each time the Warden dies, its attributes are increased by [[value]]10%[[/]], up to [[value]]10[[/]] times.",
      },
      {
        level: 20,
        name: "Cosmic Reversal",
        description: "The respawn time of [[ref]]Cosmic Warden[[/]] is reduced to [[value]]13[[/]]s. The first death in each stage will respawn with no delay",
      },
      {
        level: 30,
        name: "Interstellar Voyage",
        description: "After taking damage equal to [[value]]10%[[/]] of its max HP, the Guardian reverts to its state [[value]]3[[/]]s prior, dealing [[value]]15%[[/]] of max HP as damage to enemies in range. Each time it recovers [[value]]60%[[/]] of max HP by this effect, it counts as [[ref]]Immortal Ascension[[/]] once",
        note: "Has a trigger interval of [[value]]5[[/]]s",
      },
      {
        level: 40,
        name: "Cosmic Mystery",
        description: "After [[ref]]Immortal Ascension[[/]] reaches its cap, it can continue to gain attribute bonuses, but each subsequent bonus gain is reduced to [[value]]4%[[/]].",
        note: "Max Bonus: [[value]]100%[[/]]",
      },
      {
        level: 50,
        name: "Cosmic Union",
        description: "This Artifact can be activated up to [[value]]1[[/]] times per stage to fuse with the Guardian. For [[value]]30[[/]]s, you become invulnerable and can control only the Guardian. During this time, the Guardian cannot die, deals [[value]]200%[[/]] increased damage, and cannot move too far away from the summoner. When the effect ends, the summoner takes non-lethal backlash damage based on the damage taken during the fusion that could not be reverted. Taking a large amount of unreverted damage will end the fusion prematurely",
      },
    ],
    flavor: "For centuries, stargazers have been trying to explore the mysteries of the cosmos, and astrological research has also made rapid progress. During a routine assignment, a student at the Calatos Observatory spotted a strange creature. It looked like Roshan, but it could move freely through space.",
    cost: {
      dust: 60,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · DOTA",
    ],
  },
  {
    slug: "necromancers-robe",
    gameId: "item_artifact_necromancers_robe",
    name: "Crimson Robe",
    era: "post",
    icon: "/artifacts/necromancers-robe.png",
    iconName: "necromancers_robe",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Intelligence",
        base: 30,
        perLevel: 0.3,
      },
      {
        name: "Health",
        base: 400,
        perLevel: 4,
      },
      {
        name: "Mana",
        base: 400,
        perLevel: 4,
      },
    ],
    unique: {
      name: "Blood Price",
      description: "[[value]]3%[[/]] of the spell damage you deal is converted into Negative Energy, stacking independently for [[value]]15[[/]] seconds. When your HP/MP falls below [[value]]70%[[/]], you can use Negative Energy to restore.",
    },
    upgrades: [
      {
        level: 10,
        name: "Blood Hunt",
        description: "Converts an additional [[value]]30%[[/]] Negative Energy when dealing damage to enemies with HP above [[value]]80%[[/]]",
      },
      {
        level: 20,
        name: "Essence Conversion",
        description: "When Negative Energy decays naturally, each point restores [[value]]0.25[[/]] HP/MP",
      },
      {
        level: 30,
        name: "Negative Energy Release",
        description: "Locks onto up to [[value]]3[[/]] enemies within [[value]]1000[[/]] range, dealing [[value]]10%[[/]] of accumulated Negative Energy as damage per second to them.",
      },
      {
        level: 40,
        name: "Primordial Blood",
        description: "Negative Energy does not expire, but for portions exceeding × [[value]]30[[/]] , it decays by [[value]]8%[[/]] per second",
      },
    ],
    flavor: "A lingering stream of negative energy flows within this robe. Whenever powerful magic is channeled through it, the robe expels this energy in the form of dark smoke with scarlet veins.",
    cost: {
      dust: 60,
      platinum: 1200,
    },
    sources: [
      "Drops from Astral Vault · Shadow Sect",
    ],
  },
  {
    slug: "shadow-of-the-darkmoon",
    gameId: "item_artifact_shadow_of_the_darkmoon",
    name: "Darkmoon Shadow",
    era: "post",
    icon: "/artifacts/shadow-of-the-darkmoon.png",
    iconName: "shadow_of_the_darkmoon",
    maxLevel: 60,
    heroLevel: 17,
    stats: [
      {
        name: "Intelligence",
        base: 30,
        perLevel: 0.3,
      },
      {
        name: "Mana",
        base: 400,
        perLevel: 4,
      },
      {
        name: "Armor",
        base: 8,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Darkmoon Shackles",
      description: "Manifest two arms that grasp enemies within a [[value]]1100[[/]] radius. Slows Movement Speed by [[value]]40[[/]] and deals [[value]]180[[/]] + [[value]]150%[[/]] of your damage per second.",
    },
    upgrades: [
      {
        level: 10,
        name: "Eclipsing Breath",
        description: "[[ref]]Darkmoon Shackles[[/]] gains [[value]]12%[[/]] bonus damage per [[value]]1[[/]] seconds, up to [[value]]60%[[/]]. This bonus resets when switching targets.",
      },
      {
        level: 20,
        name: "Moonshadow Spread",
        description: "[[ref]]Darkmoon Shackles[[/]] radius is increased by an amount equal to [[value]]100%[[/]]",
      },
      {
        level: 30,
        name: "Lunar Resonance",
        description: "Each Ability cast triggers [[ref]]Darkmoon Shackles[[/]], causing the arms to immediately deal [[value]]3[[/]] seconds worth of damage to grasp targets",
        note: "The cooldown applied by the triggering Ability cannot be reduced below [[value]]1[[/]] seconds",
      },
      {
        level: 40,
        name: "Lunar Crossing",
        description: "[[ref]]Darkmoon Shackles[[/]] arms can now grasp the same target. Casting a single-target Ability creates 1 additional arm acting on the target.Duration: ([[value]]4[[/]] + [[value]]75%[[/]] of the Ability's base cooldown)",
        note: "A single target can be grasped by up to [[value]]5[[/]] additional arms, and the slow effect does not stack.",
      },
      {
        level: 60,
        name: "Lunar Chantress",
        description: "[[ref]]Lunar Crossing[[/]] base duration is increased by [[value]]4[[/]] seconds and is no longer limited to unit-targeted Abilities.",
      },
    ],
    flavor: "An extra pair of arms can be incredibly useful—unfortunately, they are terribly bad at hugging or shaking hands, unless you happen to enjoy the sensation of a thousand ice cubes slowly sliding down your spine.",
    cost: {
      dust: 60,
    },
    sources: [
      "Drops from Astral Vault · Darkmoon Guidance",
    ],
  },
  {
    slug: "divine-sanction",
    gameId: "item_artifact_divine_sanction",
    name: "Divine Sanction",
    era: "post",
    icon: "/artifacts/divine-sanction.png",
    iconName: "divine_sanction",
    maxLevel: 60,
    heroLevel: 17,
    stats: [
      {
        name: "Intelligence",
        base: 40,
        perLevel: 0.4,
      },
      {
        name: "Cast Range",
        base: 200,
        perLevel: 2,
      },
    ],
    unique: {
      name: "The First Tome: Time Lockdown",
      description: "Has a [[value]]30[[/]] second quota. After each cast, the Ability's remaining cooldown is instantly reduced by [[value]]40%[[/]], and [[value]]175%[[/]] of this portion is transferred for the Artifact to bear instead.",
      note: "Does not affect on Abilities that cannot be refreshed.",
    },
    upgrades: [
      {
        level: 10,
        name: "The Second Tome: Sacred Echo",
        description: "The more cooldown [[ref]]The First Tome: Time Lockdown[[/]] bears, the faster its cooldown speed, up to [[value]]25%[[/]] faster",
      },
      {
        level: 20,
        name: "The Third Tome: Endless Path",
        description: "+[[value]]5[[/]]s [[ref]]The First Tome: Time Lockdown[[/]] duration. Restores [[value]]75%[[/]] mana per ability cooldown completed.",
      },
      {
        level: 30,
        name: "The Fourth Tome: Eternal Flame Wings",
        description: "+[[value]]5[[/]] seconds to [[ref]]The First Tome: Time Lockdown[[/]] duration. [[value]]1[[/]] times per stage, when taking fatal damage, fully restores HP and mana.",
      },
      {
        level: 40,
        name: "The Fifth Tome: Perfect Casting",
        description: "When [[ref]]The First Tome: Time Lockdown[[/]] is off cooldown, +[[value]]20%[[/]] area radius. Otherwise, +[[value]]20%[[/]] spell amplification.",
      },
      {
        level: 60,
        name: "The Sixth Tome: Triumphant Return",
        description: "When [[ref]]The First Tome: Time Lockdown[[/]] is active, has a [[value]]20%[[/]] chance to instantly end an Ability's cooldown, without generating additional burden. After triggering this effect, the trigger chance is reduced by [[value]]5%[[/]] for the next [[value]]20[[/]] seconds.",
      },
    ],
    flavor: "This is a spear and also a special key, possessing a unique ability to open a small spiritual gate, allowing the wielder to temporarily summon a tome from a designated area of the Hall of Enlightenment. These tomes contain powerful sacred magic, capable of manifesting the essence of the knowledge or stories they carry. This manifestation may be a blessing applied to the wielder or a magical phenomenon affecting the surrounding area.",
    cost: {
      dust: 60,
    },
    sources: [
      "Drops from Astral Vault · Imperial Reign",
    ],
  },
  {
    slug: "bow-of-lucid-dreams",
    gameId: "item_artifact_bow_of_lucid_dreams",
    name: "Echo of Dreams",
    era: "post",
    icon: "/artifacts/bow-of-lucid-dreams.png",
    iconName: "bow_of_lucid_dreams",
    maxLevel: 40,
    heroLevel: 16,
    stats: [
      {
        name: "RangedAttack Range",
        base: 200,
        perLevel: 2,
      },
      {
        name: "Attack Damage",
        base: 50,
        perLevel: 0.8,
      },
    ],
    unique: {
      name: "Dreamweaving",
      description: "Creates a following dream illusion that attacks every [[value]]2.5[[/]] seconds, dealing [[value]]160%[[/]] damage. The illusion is disabled while you are silenced or banished.",
      note: "The illusion has the same attack range as you, with a minimum of [[value]]600[[/]]",
    },
    upgrades: [
      {
        level: 10,
        name: "Lost Domain",
        description: "The illusion’s attacks reduce [[value]]3[[/]] Magic Armor, stacking independently for [[value]]20[[/]] seconds",
      },
      {
        level: 20,
        name: "Sharp Sense",
        description: "Attacks and casts have a [[value]]20[[/]]/[[value]]100%[[/]] chance to command the illusion to attack",
      },
      {
        level: 30,
        name: "Dual Dream",
        description: "Creates No.[[value]]2[[/]] illusion",
      },
      {
        level: 40,
        name: "Fallen Dreamscape",
        description: "While you are silenced or banished, the illusion no longer disappears and now creates [[value]]2[[/]] additional illusions.",
      },
    ],
    flavor: "From the bow comes a deeper chill and drowsiness—the echo of sinking into the dream realm.",
    drop: {
      pool: "General",
      weight: 700,
      chance: 2.3034,
      waveFrom: 8,
    },
    cost: {
      dust: 60,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "power-hammer",
    gameId: "item_artifact_power_hammer",
    name: "Force Maul",
    era: "post",
    icon: "/artifacts/power-hammer.png",
    iconName: "power_hammer",
    maxLevel: 60,
    heroLevel: 17,
    stats: [
      {
        name: "Attack Damage",
        base: 35,
        perLevel: 0.5,
      },
      {
        name: "Attack Damage",
        base: 20,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Realm Breaker",
      description: "Your attack speed is reduced by [[value]]60%[[/]], but your attack damage is increased by [[value]]35%[[/]]. Additionally, each attack emits a field that deals [[value]]75%[[/]] split damage to up to [[value]]3[[/]] nearby enemies.",
      note: "Attacks that cannot trigger Splash cannot trigger this effect, but they still benefit from its attack damage bonus.",
    },
    upgrades: [
      {
        level: 10,
        name: "Wex Strike",
        description: "Every [[value]]6[[/]] seconds, increase your next attack damage by [[value]]50%[[/]].",
      },
      {
        level: 20,
        name: "Truth",
        description: "[[ref]]Wex Strike[[/]] increases [[ref]]Realm Breaker[[/]] radius by [[value]]200[[/]] and splits all enemies.",
      },
      {
        level: 30,
        name: "Loyalty",
        description: "[[ref]]Wex Strike[[/]] is modified by base . For every [[value]]25[[/]] Strength, your attacks have a [[value]]1%[[/]] chance to trigger its effect.",
      },
      {
        level: 40,
        name: "Millennial Glory",
        description: "Forged through countless battles, this war hammer grows stronger over time. For every [[value]]10[[/]] bosses killed, the damage bonus of [[ref]]Wex Strike[[/]] permanently increases by [[value]]1%[[/]](+). Stacks up to [[value]]260%[[/]].",
      },
      {
        level: 60,
        name: "True Ascension",
        description: "Immediately raises the bonus from [[ref]]Millennial Glory[[/]] to [[value]]100%[[/]]. Once the additional bonus reaches its maximum, the Attack Damage granted by this Artifact's base attributes is converted into Final Attack Damage Bonus. Additionally, killing a Boss enemy counts as [[value]]15[[/]] Leader kills.",
      },
    ],
    flavor: "A product of technology at its peak. It stands as a symbol of loyalty made real.",
    cost: {
      dust: 60,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · Weapon Master",
    ],
  },
  {
    slug: "gaia",
    gameId: "item_artifact_gaia",
    name: "Gaia",
    era: "post",
    icon: "/artifacts/gaia.png",
    iconName: "gaia",
    maxLevel: 40,
    heroLevel: 16,
    stats: [
      {
        name: "Intelligence",
        base: 30,
        perLevel: 0.4,
      },
      {
        name: "Area of Effect",
        base: 85,
        perLevel: 1,
      },
    ],
    unique: {
      name: "Terrain Reshape",
      description: "Passively creates an earthquake zone within [[value]]500[[/]] range. This zone slowly moves toward enemy areas at [[value]]200[[/]] units per second. Every second, it deals damage to enemies inside equal to [[value]]14%[[/]] of their max mana and slows their movement speed by [[value]]30%[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Gravity Tweak",
        description: "Each time you cast a spell, the earthquake zone becomes harder to move through. Movement slow increases by an additional [[value]]5%[[/]], stacking independently for [[value]]8[[/]] seconds, up to [[value]]20%[[/]].",
      },
      {
        level: 20,
        name: "Gravity",
        description: "Movement slow of Terrain Reshape lingers for an extra [[value]]4[[/]] seconds. When enemies are outside the zone, gravity pulls them in at [[value]]150[[/]] units per second.",
      },
      {
        level: 30,
        name: "Companion Star",
        description: "Creates a companion star that orbits you in an ellipse. Used for gravity effects, it can pull in enemies within [[value]]500[[/]] range. When it gets near an earthquake zone, it triggers a much stronger quake, increasing that zone's damage by up to [[value]]100%[[/]].",
      },
      {
        level: 40,
        name: "Astral Grip",
        description: "Consumes [[value]]5[[/]]% of max mana per trigger and the companion star gets a [[value]]50[[/]] pull speed toward the quake's core. Independent stack, lasts [[value]]10[[/]] seconds. Keep the star within [[value]]100[[/]] of the center and the quake zone grows by [[value]]300[[/]]%. Also, the longer hold that position, the harder the quake hits.",
      },
    ],
    flavor: "A massive sickle forged from the horn of a Moonhorn. Every few decades, the Moonhorn's horn naturally sheds to allow a larger new horn to grow. For generations, local residents have collected these horns to Forge sacred weapons and present them to heroes.",
    drop: {
      pool: "General",
      weight: 60,
      chance: 0.1974,
      waveFrom: 8,
    },
    cost: {
      dust: 60,
      platinum: 1500,
    },
    requiredDifficulty: 27,
    sources: [
      "May drop in EX+3 worlds or above",
    ],
  },
  {
    slug: "gods-mercy",
    gameId: "item_artifact_gods_mercy",
    name: "God's Mercy",
    era: "post",
    icon: "/artifacts/gods-mercy.png",
    iconName: "gods_mercy",
    maxLevel: 60,
    heroLevel: 17,
    stats: [
      {
        name: "Strength",
        base: 40,
        perLevel: 0.5,
      },
      {
        name: "Armor",
        base: 15,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Wrath of Strife",
      description: "Reduces [[value]]35%[[/]] of frontal physical damage taken from close range. After the total mitigated damage reaches [[color:#f0ad4e]][[[value]]400[[/]] + [[value]]20%[[/]] of your Max HP][[/]], petrifies enemies in front of you for [[value]]3.5[[/]] seconds and increase the Physical Damage they take by [[value]]70%[[/]].",
      note: "The petrification area is a cone-shaped zone with a width of [[value]]350[[/]] and a length of [[value]]500[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Hypocrisy",
        description: "+[[value]]100[[/]] petrification width and +[[value]]300[[/]] length",
      },
      {
        level: 20,
        name: "Face Off",
        description: "Increases the angle considered as frontal by [[value]]20[[/]]. Also affects judgment for other abilities.",
      },
      {
        level: 30,
        name: "Divine Retribution",
        description: "After [[ref]]Wrath of Strife[[/]] petrifies enemies, apply a [[value]]260%[[/]] Critical Strike. This attack gains [[value]]160%[[/]] bonus Attack Damage.",
      },
      {
        level: 40,
        name: "Trial",
        description: "Attacking enemies within the affected area of [[ref]]Wrath of Strife[[/]] also triggers its effect. Cooldown: [[value]]15[[/]] seconds.",
      },
      {
        level: 60,
        name: "Impurity Strike",
        description: "[[ref]]Divine Retribution[[/]] deals bonus damage equal to [[value]]50%[[/]] of the damage mitigated by the most recent trigger of %[[ref]]Wrath of Strife[[/]].",
      },
    ],
    flavor: "Trust not in the mercy of gods, for many find it more fearsome than mortal spite.",
    cost: {
      dust: 60,
    },
    sources: [
      "Drops from Astral Vault · Darkmoon Guidance",
    ],
  },
  {
    slug: "god-slaying-emperor-blade",
    gameId: "item_artifact_god_slaying_emperor_blade",
    name: "Godslayer Blade",
    era: "post",
    icon: "/artifacts/god-slaying-emperor-blade.png",
    iconName: "god_slaying_emperor_blade",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Attack Damage",
        base: 120,
        perLevel: 2,
      },
    ],
    unique: {
      name: "Godslayer",
      description: "+[[value]]20[[/]] Attack Armor Reduction",
    },
    upgrades: [
      {
        level: 10,
        name: "Inevitable",
        description: "The first attack against an enemy gains an additional [[value]]350[[/]] Attack Damage",
      },
      {
        level: 20,
        name: "Inescapable",
        description: "The first attack against an enemy always hits and applies Break, disabling passives for [[value]]3[[/]] seconds.",
      },
      {
        level: 30,
        name: "Irresistible",
        description: "The first attack against an enemy ignores all Armor",
      },
      {
        level: 40,
        name: "Irrevocable",
        description: "The first attack resets after [[value]]15[[/]] seconds",
      },
    ],
    flavor: "It is the sharpest of blades, capable of cleaving through enchanted armor. Even defenses reinforced to their absolute limits are stripped away before its edge.",
    cost: {
      dust: 60,
    },
    sources: [
      "Drops from Astral Vault · Visitor from Outerworld",
    ],
  },
  {
    slug: "the-hat-of-moiret",
    gameId: "item_artifact_the_hat_of_moiret",
    name: "Hat of Moiret",
    era: "post",
    icon: "/artifacts/the-hat-of-moiret.png",
    iconName: "the_hat_of_moiret",
    maxLevel: 40,
    heroLevel: 16,
    stats: [
      {
        name: "Spell AMP",
        base: 30,
        perLevel: 0.3,
        unit: "%",
      },
    ],
    unique: {
      name: "Foresight of Fate",
      description: "Spell damage has a [[value]]20%[[/]] chance to be increased to [[value]]140%[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Revelation of Fate",
        description: "Every [[value]]10[[/]] seconds, reveals an enemy and reduces its Magic Armor by [[value]]20[[/]] for [[value]]10[[/]] seconds",
        note: "Boss units are prioritized",
      },
      {
        level: 20,
        name: "Shear of Fate",
        description: "When dealing higher spell damage, the trigger chance of [[ref]]Foresight of Fate[[/]] is increased to [[value]]50%[[/]]",
        note: "This comparison uses values before spell amplification is applied",
      },
      {
        level: 30,
        name: "Favor of the Three",
        description: "The next failed chance-based event is converted into a success. Cooldown: [[value]]3[[/]]–[[value]]60[[/]] seconds, based on the chance.",
        note: "Not all chance-based events are affected, including this Artifact itself. The base chance of the target event must be at least 1%.",
      },
      {
        level: 40,
        name: "Omnivision",
        description: "Can be activated to increase its base bonus to [[value]]200%[[/]] for the current Stage. After the effect ends, the Artifact is disabled for [[value]]1[[/]] Stages.",
      },
    ],
    flavor: "A hat blessed by Three Fates, granting its wearer the ability to glimpse a fleeting future.",
    drop: {
      pool: "General",
      weight: 400,
      chance: 1.3162,
      waveFrom: 8,
    },
    cost: {
      dust: 60,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "helmet-of-bayle",
    gameId: "item_artifact_helmet_of_bayle",
    name: "Helmet of Bayle",
    era: "post",
    icon: "/artifacts/helmet-of-bayle.png",
    iconName: "helmet_of_bayle",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Health",
        base: 15,
        perLevel: 0.15,
        unit: "%",
      },
      {
        name: "Magic Armor",
        base: 20,
        perLevel: 0.2,
      },
    ],
    unique: {
      name: "Tyranny",
      description: "Every [[value]]7[[/]] seconds, generate up to [[value]]5[[/]] lightning strikes hitting enemies within [[value]]1000[[/]] range, dealing [[value]]6%[[/]] maximum HP damage. The lower the current HP, the shorter the strike interval.",
    },
    upgrades: [
      {
        level: 10,
        name: "Berserk",
        description: "For every [[value]]10%[[/]] HP lost, increases Health Regeneration by [[value]]3%[[/]]",
      },
      {
        level: 20,
        name: "Tenacity",
        description: "For every [[value]]10%[[/]] HP lost, grants [[value]]2%[[/]] damage reduction",
      },
      {
        level: 30,
        name: "Furious Destroyer",
        description: "After each instance of damage taken, accelerates the next [[ref]]Tyranny[[/]] by [[value]]0.1[[/]] seconds",
        note: "There is still a minimum trigger interval",
      },
      {
        level: 40,
        name: "Wyrm's Wrath",
        description: "Can be activated to grant an additional [[value]]20%[[/]] Max Health bonus, but your Max Health is capped at [[value]]30%[[/]].",
      },
    ],
    flavor: "A-Ahhhhhh… B...Bayle… You shall know...fear yet...Graaaaaargh! Bayle the Dread! You shall haunt me no longer!",
    drop: {
      pool: "General",
      weight: 60,
      chance: 0.1974,
      waveFrom: 10,
    },
    cost: {
      dust: 60,
      platinum: 1200,
    },
    requiredDifficulty: 27,
    sources: [
      "May drop in EX+3 worlds or above",
    ],
  },
  {
    slug: "houyis-bow",
    gameId: "item_artifact_houyis_bow",
    name: "Hou Yi’s Bow",
    era: "post",
    icon: "/artifacts/houyis-bow.png",
    iconName: "houyis_bow",
    maxLevel: 60,
    heroLevel: 17,
    stats: [
      {
        name: "RangedAttack Range",
        base: 250,
        perLevel: 2.5,
      },
      {
        name: "Agility",
        base: 40,
        perLevel: 0.5,
      },
    ],
    unique: {
      name: "Solar Strike",
      description: "Attacks fire [[ref]]Fire Arrows[[/]] into the sky. After [[value]]3[[/]]s, they fall on enemies within [[value]]200%[[/]] attack range at a rate of [[value]]5[[/]] arrows/s.[[ref]]Fire Arrows[[/]] deals [[value]]150%[[/]] damage. When many [[ref]]Fire Arrows[[/]] are stored, their consumption speed and damage are increased.",
    },
    upgrades: [
      {
        level: 10,
        name: "Volley of Arrows",
        description: "Fires [[value]]8[[/]] [[ref]]Fire Arrows[[/]] when attacking a target for the first time.",
      },
      {
        level: 20,
        name: "Set Ablaze",
        description: "[[ref]]Fire Arrows[[/]] applies [[color:#ff9b4a]]Burn[[/]] equal to [[value]]80%[[/]]",
      },
      {
        level: 30,
        name: "Sun Chaser",
        description: "During Status, +[[value]]25%[[/]] [[color:#ff9b4a]]Burn[[/]] application, and [[ref]]Fire Arrows[[/]] fall faster",
      },
      {
        level: 40,
        name: "Solar Radiance",
        description: "While under Status, the attack range bonus from Houyi's Bow is increased by +[[value]]75%[[/]] and you gain 2 passive effects:·When any enemy dies under [[color:#ff9b4a]]Burn State[[/]], gain Status for [[value]]8[[/]]s.·When [[color:#ff9b4a]]Burn Stacks[[/]] on any enemy within attack range reaches [[value]]20%[[/]] of their max HP, gain Status",
      },
      {
        level: 60,
        name: "Scorching Finale",
        description: "[[ref]]Fire Arrows[[/]] deals increased hit damage equal to [[value]]10%[[/]] of the target's [[color:#f07c4e]]Hotspot[[/]]",
      },
    ],
    flavor: "Since the dawn of creation, there were once ten suns in the sky. Hou Yi drew his bow and shot down nine fiery crows, leaving only a single Golden Sun—the true flame of the sun itself.",
    cost: {
      dust: 60,
    },
    sources: [
      "Drops from Astral Vault · Visitor from Beyond",
    ],
  },
  {
    slug: "jasper-daggers",
    gameId: "item_artifact_jasper_daggers",
    name: "Jade Dagger",
    era: "post",
    icon: "/artifacts/jasper-daggers.png",
    iconName: "jasper_daggers",
    maxLevel: 60,
    heroLevel: 17,
    stats: [
      {
        name: "Agility",
        base: 40,
        perLevel: 0.5,
      },
      {
        name: "Poison Damage",
        base: 10,
        perLevel: 0.1,
        unit: "%",
      },
    ],
    unique: {
      name: "Verdant Bite",
      description: "Attacks apply [[color:#98f698]]Poison[[/]] equal to [[value]]300[[/]] + [[value]]150%[[/]] .",
    },
    upgrades: [
      {
        level: 10,
        name: "Resistance Break",
        description: "Every [[value]]10[[/]] seconds, your next attack reduces the target's [[color:#98f698]]Poison[[/]] decay by [[value]]50%[[/]] for [[value]]5[[/]] seconds",
      },
      {
        level: 20,
        name: "Backstab",
        description: "When attacking from behind, [[ref]]Verdant Bite[[/]] applies an additional [[value]]200%[[/]] of [[color:#98f698]]Poison[[/]].",
      },
      {
        level: 30,
        name: "Funeral Rite",
        description: "When attacking an enemy from behind, activate [[color:#98f698]]Poison[[/]] once. This effect has a [[value]]2[[/]]-s cooldown per enemy.Activation Ratio: [[value]]7.5%[[/]]Activation Damage: [[value]]2000%[[/]]",
      },
      {
        level: 40,
        name: "Marked Weakness",
        description: "+[[value]]25[[/]] angle considered as back",
      },
      {
        level: 60,
        name: "Jade Shadow",
        description: "Attacks have a [[value]]35%[[/]] chance to be considered backstabs. Increases [[color:#98f698]]Poison[[/]] applied by [[ref]]Backstab[[/]] to [[value]]300%[[/]] .",
      },
    ],
    flavor: "Many say the Jade Assembly are merely hired killers... But that is too simplistic a view. Lorlin Lasan's spy network offers many services — as long as the client can pay. Assassinations are merely the most popular among them.",
    cost: {
      dust: 60,
      platinum: 1000,
    },
    sources: [
      "Drops from Astral Vault · Shadow Sect",
    ],
  },
  {
    slug: "comets-luna-trail",
    gameId: "item_artifact_comets_luna_trail",
    name: "Meteor Leap",
    era: "post",
    icon: "/artifacts/comets-luna-trail.png",
    iconName: "comets_luna_trail",
    maxLevel: 40,
    heroLevel: 16,
    stats: [
      {
        name: "Agility",
        base: 30,
        perLevel: 0.4,
      },
      {
        name: "Attack Damage",
        base: 40,
        perLevel: 0.5,
      },
    ],
    unique: {
      name: "Drifting Moon",
      description: "During combat, [[icon:artifacts/comets-luna-trail]]Meteor Leap[[/]] are generated and spin. These blades track enemies within an orbit radius of [[value]]200[[/]] – [[value]]1200[[/]], dealing [[value]]120%[[/]] damage on hit.",
      note: "Moon Glaives speed increases with Agility",
    },
    upgrades: [
      {
        level: 10,
        name: "Chasing Moon",
        description: "[[icon:artifacts/comets-luna-trail]]Meteor Leap[[/]] rotation speed increases by [[value]]8%[[/]] per second, up to a maximum of [[value]]120%[[/]]. Speed is reduced by [[value]]10%[[/]] upon grazing an enemy.",
      },
      {
        level: 20,
        name: "Aegis Moon",
        description: "Each full revolution of Moon Glaives grants [[value]]2%[[/]] damage reduction, up to a maximum of [[value]]50%[[/]]. Each time damage is negated, this bonus is reduced by [[value]]10%[[/]].",
      },
      {
        level: 30,
        name: "Reclining Moon",
        description: "Before each full revolution, the first [[value]]1[[/]] instances of damage inherit attack effects.",
      },
      {
        level: 40,
        name: "New Moon",
        description: "Additional Moon Glaives are generated every [[value]]15[[/]] attacks or on each spell cast. Extra Glaives last [[value]]7[[/]] seconds, up to a maximum of [[value]]2[[/]].",
        note: "Extra Moon Glaives always orbit on an outer layer beyond the primary glaive and do not overlap.",
      },
    ],
    flavor: "A star-path instrument formed where a falling comet entwined with a waning moon. When moving swiftly, its silver axis turns with its shadow, tracing frost-laced arcs through the air.",
    drop: {
      pool: "General",
      weight: 700,
      chance: 2.3034,
      waveFrom: 8,
    },
    cost: {
      dust: 60,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
      "Available for purchase or exchange in the Curated Vault",
    ],
  },
  {
    slug: "titanic-bulwark",
    gameId: "item_artifact_titanic_bulwark",
    name: "Mighty Greatshield",
    era: "post",
    icon: "/artifacts/titanic-bulwark.png",
    iconName: "titanic_bulwark",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Armor",
        base: 18,
        perLevel: 0.3,
      },
      {
        name: "Model Scale",
        base: 20,
        perLevel: 0.3,
        unit: "%",
      },
    ],
    unique: {
      name: "Mighty Physique",
      description: "Increases Strength by [[value]]15%[[/]], reduces Agility by [[value]]20%[[/]]. Damage instances below [[value]]100%[[/]] of your Strength are reduced by [[value]]40%[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Might",
        description: "+[[value]]10%[[/]] Max HP, +[[value]]15%[[/]] Health Regeneration",
      },
      {
        level: 20,
        name: "Mighty Force",
        description: "Every [[value]]3[[/]] seconds, deal [[value]]250%[[/]] damage to enemies within [[value]]300[[/]] radius",
        note: "The effect radius also increases with your model size",
      },
      {
        level: 30,
        name: "Mighty Strength",
        description: "+[[value]]2%[[/]] of your Max HP as [[ref]]Mighty Force[[/]] damage",
      },
      {
        level: 40,
        name: "Grand Might",
        description: "After not attacking for [[value]]20[[/]] seconds, trigger interval of [[ref]]Mighty Force[[/]] is reduced by [[value]]1[[/]] seconds, Strength is increased by [[value]]20%[[/]]",
      },
    ],
    flavor: "Those who wield the strength to move mountains will eventually become part of them. Your heartbeat echoes the pulse of the earth, and your breath turns into the gales that sweep the mountain passes.",
    drop: {
      pool: "General",
      weight: 700,
      chance: 2.3034,
      waveFrom: 10,
    },
    cost: {
      dust: 60,
      platinum: 1200,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "twin-moon-blades",
    gameId: "item_artifact_twin_moon_blades",
    name: "Moonfire Blades",
    era: "post",
    icon: "/artifacts/twin-moon-blades.png",
    iconName: "twin_moon_blades",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Attack Damage",
        base: 40,
        perLevel: 0.5,
      },
      {
        name: "Spell AMP",
        base: 15,
        perLevel: 0.15,
        unit: "%",
      },
    ],
    unique: {
      name: "Carian Sword Arts",
      description: "For every [[value]]5%[[/]] Spell AMP, grants [[value]]3%[[/]] bonus Attack Damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Moonlight",
        description: "Every [[value]]8[[/]] attacks, grants [[value]]30%[[/]] of Max MP to your next attack damage",
      },
      {
        level: 20,
        name: "Flame Scorch",
        description: "From attack [[value]]4[[/]] onward, every [[value]]8[[/]] attacks deals [[value]]75%[[/]] splash damage in [[value]]300[[/]] radius.",
      },
      {
        level: 30,
        name: "Mutual Genesis",
        description: "During Status, [[ref]]Moonlight[[/]] has a [[value]]30%[[/]] chance to also trigger [[ref]]Flame Scorch[[/]]. During Status, [[ref]]Flame Scorch[[/]] has the same chance to trigger [[ref]]Moonlight[[/]].",
      },
      {
        level: 40,
        name: "Moonfire Stance",
        description: "When [[ref]]Moonlight[[/]] and [[ref]]Flame Scorch[[/]] trigger simultaneously, both effects are amplified by [[value]]100%[[/]].",
      },
    ],
    flavor: "A Carian greatsword inlaid with glintstone. Moon and flame reside within, forever inseparable.",
    cost: {
      dust: 60,
    },
    sources: [
      "Drops from Astral Vault · Darkmoon Guidance",
    ],
  },
  {
    slug: "paradox",
    gameId: "item_artifact_paradox",
    name: "Parallel Paradox",
    era: "post",
    icon: "/artifacts/paradox.png",
    iconName: "paradox",
    maxLevel: 40,
    heroLevel: 16,
    stats: [
      {
        name: "Attack Damage",
        base: 60,
        perLevel: 1,
      },
      {
        name: "Cooldown Reduction",
        base: 8,
        perLevel: 0.1,
        unit: "%",
      },
    ],
    unique: {
      name: "Paradox Space",
      description: "Creates a remnant from another timeline that remains at its current location. Whenever you teleport or blink, the remnant casts [[ref]]Paradox Space[[/]] to move to your previous position.",
    },
    second: {
      name: "Space Slash",
      description: "Slashes toward the target location, dealing [[value]]125%[[/]] attack damage to enemies along the path and reducing their armor by [[value]]10[[/]] for [[value]]9[[/]] seconds.",
    },
    upgrades: [
      {
        level: 10,
        name: "Void Break",
        description: "[[ref]]Paradox Space[[/]] deals [[value]]120%[[/]] Critical Damage.",
      },
      {
        level: 20,
        name: "Shadow Break",
        description: "Repeated [[ref]]Paradox Space[[/]] hits increase the armor reduction by [[value]]3[[/]]. Stacks independently for [[value]]4[[/]] seconds.",
      },
      {
        level: 30,
        name: "Time Break",
        description: "Creates a new remnant linked to your first remnant.",
      },
      {
        level: 40,
        name: "Realm Break",
        description: "You also cast [[ref]]Paradox Space[[/]] toward the target.",
      },
    ],
    flavor: "Going into another timeline is risky… but it’s only for a few seconds here. And it’s never hurt anyone I didn’t intend to.",
    cost: {
      dust: 60,
      platinum: 1500,
    },
    sources: [
      "Drops from Astral Vault · Weapon Master",
    ],
  },
  {
    slug: "thousand-faced-mirage-currents",
    gameId: "item_artifact_thousand_faced_mirage_currents",
    name: "Phantom Flow",
    era: "post",
    icon: "/artifacts/thousand-faced-mirage-currents.png",
    iconName: "thousand_faced_mirage_currents",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Armor",
        base: 14,
        perLevel: 0.3,
      },
      {
        name: "Magic Armor",
        base: 20,
        perLevel: 0.3,
      },
    ],
    unique: {
      name: "Surging Flow",
      description: "While in Water Terrain, you and allied units within [[value]]300[[/]] gain [[value]]35%[[/]] MS.",
    },
    upgrades: [
      {
        level: 10,
        name: "Riptide",
        description: "While in , you can command water currents to attack enemies, striking [[value]]3[[/]] targets once, or [[value]]1[[/]] targets with [[value]]2[[/]] hits. Cooldown: [[value]]6[[/]] seconds.",
        note: "Damage equals [[value]]1000%[[/]] of your Armor. For every [[value]]3[[/]] Magic Armor you have, this damage increases by [[value]]1%[[/]].",
      },
      {
        level: 20,
        name: "Myriad Forms",
        description: "At the end of each Stage, gain [[value]]20%[[/]] damage resistance against the damage type that dealt the most damage to you during that Stage.",
        note: "Damage types: Physical / Magic / Pure",
      },
      {
        level: 30,
        name: "All Are One",
        description: "While in , [[ref]]Myriad Forms[[/]] applies as all-damage reduction.",
      },
      {
        level: 40,
        name: "Surging Flow",
        description: "[[value]]4[[/]] times per day, this Artifact can be activated to permanently gain Status. After reaching the daily limit, further uses require .",
        note: "This also affects other skill effects. The bonus persists even if the Artifact is removed.",
      },
    ],
    flavor: "Where the tide’s murmur reaches, there lies dominion; where the waves cover, all becomes ocean.",
    drop: {
      pool: "General",
      weight: 700,
      chance: 2.3034,
      waveFrom: 8,
    },
    cost: {
      dust: 60,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "phoenix-feather",
    gameId: "item_artifact_phoenix_feather",
    name: "Phoenix Feather",
    era: "post",
    icon: "/artifacts/phoenix-feather.png",
    iconName: "phoenix_feather",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Health",
        base: 15,
        perLevel: 0.15,
        unit: "%",
      },
      {
        name: "Health Regeneration",
        base: 18,
        perLevel: 0.15,
        unit: "%",
      },
    ],
    unique: {
      name: "Sun Ray",
      description: "Create a [[value]]600[[/]] heat zone which deals [[color:#ff9b4a]]Burn[[/]] damage equal to [[value]]12%[[/]] of your max HP [[color:#ff9b4a]]Burn[[/]]. Closer enemies gain more stacks. This artifact can be activated to increase [[color:#ff9b4a]]Burn[[/]] damage by [[value]]75%[[/]], but you will also suffer [[value]]50%[[/]] of that damage as burn effect.",
    },
    second: {
      name: "Nirvana",
      description: "On every death, max Health Rune storage goes up by [[value]]1[[/]], up to [[value]]3[[/]] total bonus.",
    },
    upgrades: [
      {
        level: 10,
        name: "Scorching Healing",
        description: "[[color:#ff9b4a]]Burn[[/]] damage you take heals other allies within range for [[value]]30%[[/]] of that damage.",
      },
      {
        level: 20,
        name: "Falling Feather",
        description: "After taking a total of [[value]]250%[[/]] of your max HP in damage from [[color:#ff9b4a]]Burn[[/]], restore [[value]]1[[/]] HP Runes. Can occur up to [[value]]1[[/]] times every [[value]]2[[/]] stages. Damage still accumulates normally even during cooldown.",
      },
      {
        level: 30,
        name: "Advanced Nirvana",
        description: "Consume a Health Rune to respawn. Permanently gain +[[value]]8[[/]] All Attributes.",
      },
      {
        level: 40,
        name: "Phoenix Remnant",
        description: "At the start of each stage, summon a Phoenix Remnant. The remnant casts Solar Beam toward the nearest visible enemy, applying [[ref]]Sun Ray[[/]] [[color:#ff9b4a]]Burn[[/]] effect. The remnant is considered as a summon and inherits [[value]]150%[[/]] of your health. It does not cost health to maintain. When a target attacked by the remnant dies, you are healed for [[value]]10%[[/]] of your maximum health.",
      },
    ],
    flavor: "The darkest hour is just before dawn. And right before that tide-turning final stand, the despair hits hardest. One sacrifice can change the future. This blade almost begs its wielder to make that call.",
    drop: {
      pool: "General",
      weight: 50,
      chance: 0.1645,
      waveFrom: 10,
    },
    cost: {
      dust: 60,
      platinum: 1200,
    },
    requiredDifficulty: 27,
    sources: [
      "May drop in EX+3 worlds or above",
    ],
  },
  {
    slug: "primary-fulcrum",
    gameId: "item_artifact_primary_fulcrum",
    name: "Primordial Fulcrum",
    era: "post",
    icon: "/artifacts/primary-fulcrum.png",
    iconName: "primary_fulcrum",
    maxLevel: 40,
    heroLevel: 16,
    stats: [
      {
        name: "Intelligence",
        base: 30,
        perLevel: 0.4,
      },
      {
        name: "Spell AMP",
        base: 20,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Unstable Casting",
      description: "Grants [[value]]20%[[/]]–[[value]]40%[[/]] additional cooldown. [[value]]20%[[/]] of spell damage dealt is stored. After a [[value]]10[[/]] seconds delay, the next cast releases a radial shockwave, damaging enemies up to [[value]]800[[/]] away.",
      note: "Does not affect equipments. Damage is only recorded when a spell triggers an additional cooldown or when you actively cast a spell. After the delay ends, damage accumulation stops until the next spell cast. Stored damage is capped at [[value]]50[[/]] % of your Primary Attribute.",
    },
    upgrades: [
      {
        level: 10,
        name: "Inertial Field",
        description: "[[ref]]Unstable Casting[[/]] applies a [[value]]50%[[/]] Movement Speed slow for [[value]]2[[/]] seconds.",
      },
      {
        level: 20,
        name: "Dark Insight",
        description: "[[ref]]Unstable Casting[[/]] grants unobstructed vision for [[value]]10[[/]] seconds and applies a permanent [[value]]15[[/]] Magic Armor reduction, once per enemy.",
      },
      {
        level: 30,
        name: "Dark Repulsion",
        description: "After [[ref]]Unstable Casting[[/]], you gain [[value]]80%[[/]] damage reduction for [[value]]2[[/]] seconds",
      },
      {
        level: 40,
        name: "Primordial Singularity",
        description: "Can be activated to mark a location. [[ref]]Unstable Casting[[/]] then converges on this location and pulls enemies toward it. The effect has a radius of [[value]]1200[[/]].",
        note: "Activating the Artifact again will remove the mark",
      },
    ],
    flavor: "A small faction of the Scholar of the Dark Dawn dedicated itself to researching the shadows between the stars and the spaces where light cannot reach. Most of them went mad, and the resulting experiments were nearly as unstable as the scholars themselves.",
    drop: {
      pool: "General",
      weight: 200,
      chance: 0.6581,
      waveFrom: 8,
    },
    cost: {
      dust: 60,
      platinum: 1500,
    },
    requiredDifficulty: 15,
    sources: [
      "May drop in S world or above",
    ],
  },
  {
    slug: "spuit-lance",
    gameId: "item_artifact_spuit_lance",
    name: "Spuit Lance",
    era: "post",
    icon: "/artifacts/spuit-lance.png",
    iconName: "spuit_lance",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Attack Damage",
        base: 70,
        perLevel: 1,
      },
      {
        name: "Health Regeneration",
        base: 20,
        perLevel: 0.2,
        unit: "%",
      },
    ],
    unique: {
      name: "Bloodlust",
      description: "Gain [[value]]30%[[/]] lifesteal on attack, and [[value]]20%[[/]] of excess lifesteal becomes a physical damage shield.",
      note: "Maximum shield value: [[value]]1000%[[/]] of Max Health.",
    },
    upgrades: [
      {
        level: 10,
        name: "Frenzy",
        description: "After stealing health equal to [[value]]50%[[/]] of your Max Health, gain +[[value]]50[[/]] Max Attack Speed. Resets at the end of the stage.",
      },
      {
        level: 20,
        name: "Bloodthirst",
        description: "[[ref]]Bloodlust[[/]] gains [[value]]100%[[/]](x) increased lifesteal on the first [[value]]3[[/]] hits against each enemy.",
      },
      {
        level: 30,
        name: "Blood Frenzy",
        description: "Gain bonus Attack Damage equal to [[value]]5%[[/]] of Lifesteal dealt in the last [[value]]10[[/]] seconds.",
        note: "Cannot exceed [[value]]500%[[/]] of your Base Attack Damage.",
      },
      {
        level: 40,
        name: "Blood Bath",
        description: "Artifact can be switched. Activates [[ref]]Blood Bath[[/]]. Drains [[value]]15%[[/]] of Max Health per second. [[ref]]Frenzy[[/]] grants +[[value]]100[[/]] Max Attack Speed and [[value]]30%[[/]] status resistance. [[ref]]Bloodlust[[/]] lifesteal is increased to [[value]]60%[[/]].",
      },
    ],
    flavor: "A colossal lance forged in the likeness of a syringe. Its spearhead drinks the blood of those it impales, storing it within the hollow shaft before channeling it back to the wielder through embedded tubes.",
    cost: {
      dust: 60,
      platinum: 1500,
    },
    sources: [
      "Drops from Astral Vault · Weapon Master",
    ],
  },
  {
    slug: "fallen-star-blades",
    gameId: "item_artifact_fallen_star_blades",
    name: "Starfall Blades",
    era: "post",
    icon: "/artifacts/fallen-star-blades.png",
    iconName: "fallen_star_blades",
    maxLevel: 40,
    heroLevel: 16,
    stats: [
      {
        name: "Strength",
        base: 30,
        perLevel: 0.3,
      },
      {
        name: "Slow Resistance",
        base: 30,
        perLevel: 0.4,
        unit: "%",
      },
    ],
    unique: {
      name: "Gravity Enchant",
      description: "Every [[value]]10[[/]] attacks, your next attack deals [[value]]180%[[/]] splash damage within a [[value]]425[[/]] radius, pulls enemies toward the center, and slows Movement Speed by [[value]]50%[[/]] for [[value]]1.5[[/]] seconds.",
    },
    upgrades: [
      {
        level: 10,
        name: "Weighted",
        description: "After [[ref]]Gravity Enchant[[/]] triggers, gain complete slow resistance for [[value]]2[[/]] seconds",
      },
      {
        level: 20,
        name: "Gravity Aftermath",
        description: "[[ref]]Gravity Enchant[[/]] creates a gravity field. Enemies within the area have their Movement Speed slowed by [[value]]20%[[/]] and take [[value]]20%[[/]] additional damage.",
      },
      {
        level: 30,
        name: "Imbalance",
        description: "[[ref]]Gravity Enchant[[/]] attack counts continue to accumulate while on cooldown. Auto reload after [[value]]10[[/]] seconds without attacking.",
      },
      {
        level: 40,
        name: "Star Shatter",
        description: "Every [[value]]24[[/]] seconds, summon a gravity meteor that deals damage to enemies within [[value]]345[[/]] range. The damage is equal to [[value]]100%[[/]] of the highest damage instance triggered by [[ref]]Gravity Enchant[[/]] this run.",
      },
    ],
    flavor: "A low, pulsating gravitational hum whispers like the heartbeat of distant stars.",
    drop: {
      pool: "General",
      weight: 200,
      chance: 0.6581,
      waveFrom: 10,
    },
    cost: {
      dust: 60,
      platinum: 1500,
    },
    requiredDifficulty: 12,
    sources: [
      "May drop in A world or above",
    ],
  },
  {
    slug: "start-sword",
    gameId: "item_artifact_start_sword",
    name: "Stellar Greatsword",
    era: "post",
    icon: "/artifacts/start-sword.png",
    iconName: "start_sword",
    maxLevel: 40,
    heroLevel: 16,
    stats: [
      {
        name: "Attack Damage",
        base: 50,
        perLevel: 1,
      },
    ],
    unique: {
      name: "Stellar Energy",
      description: "Draws energy from the sun, moon, and stars. Each Stage grants +[[value]]3%[[/]] Attack Damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Steel Cleaver",
        description: "+[[value]]30%[[/]] Positive Armor Reduction",
      },
      {
        level: 20,
        name: "Energy Discharge",
        description: "Your next attack strikes up to [[value]]2[[/]] targets within [[value]]300[[/]] radius. Cooldown: [[value]]4[[/]] seconds.",
      },
      {
        level: 30,
        name: "Stellar Radiance",
        description: "In Stages that start at , [[ref]]Stellar Energy[[/]] growth is increased by [[value]]100%[[/]]",
        note: "Status cannot trigger this effect",
      },
      {
        level: 40,
        name: "Resonance",
        description: "[[value]]2[[/]] times per day. When the Hero reaches level [[value]]5[[/]], activate to unlock [[value]]50%[[/]] of its capabilities in advance. After reaching the daily limit, further uses require",
        note: "Growth earned before reaching the unlock level is restored when fully unlocked.",
      },
    ],
    flavor: "Star metal exists only in the polar regions. After absorbing the energy of the sun, moon, and stars without end, it emits a faint blue glow. Weapons forged from star metal can achieve a sharpness unattainable by any other material.",
    cost: {
      dust: 60,
    },
    sources: [
      "Drops from Astral Vault · Visitor from Outerworld",
    ],
  },
  {
    slug: "daemonomicon",
    gameId: "item_artifact_daemonomicon",
    name: "Tome of the Fallen",
    era: "post",
    icon: "/artifacts/daemonomicon.png",
    iconName: "daemonomicon",
    maxLevel: 40,
    heroLevel: 16,
    stats: [
      {
        name: "Summon AMP",
        base: 20,
        perLevel: 0.2,
        unit: "%",
      },
      {
        name: "All Attributes",
        base: 15,
        perLevel: 0.15,
      },
    ],
    unique: {
      name: "Soul Confluence",
      description: "After a summon takes lethal damage, it remains invulnerable for [[value]]5[[/]] seconds",
      note: "Summons still die when their duration expires.",
    },
    upgrades: [
      {
        level: 10,
        name: "Soul Endurance",
        description: "For each enemy that dies within [[value]]1000[[/]] radius around you, the duration of active [[ref]]Soul Confluence[[/]] is extended by [[value]]1[[/]] seconds, up to [[value]]10[[/]] seconds.",
      },
      {
        level: 20,
        name: "Death Dominion",
        description: "Undead summons deal [[value]]30%[[/]] additional damage, and summons under [[ref]]Soul Confluence[[/]] are considered undead.",
      },
      {
        level: 30,
        name: "Legion of the Dead",
        description: "When an enemy dies within [[value]]1000[[/]] range of you, spawn a Death Warrior that lasts for [[value]]60[[/]] seconds, inheriting [[value]]50%[[/]] of your Attack Damage. Up to [[value]]4[[/]] Death Warriors can exist at the same time.",
        note: "Death Warriors are uncontrollable, have no HP, take no damage, and do not trigger effects based on HP",
      },
      {
        level: 40,
        name: "Soul Convergence",
        description: "[[ref]]Legion of the Dead[[/]] at max: empowers all Skeleton Warriors. Duration +[[value]]5[[/]] seconds, Attack Damage +[[value]]5%[[/]] (max [[value]]150%[[/]]).",
      },
    ],
    flavor: "Souls are like bubbles cast from the vast current of the world. Though they differ in size, all souls share the same nature.",
    cost: {
      dust: 60,
    },
    sources: [
      "Event · Path of Guidance · Tome of the Fallen Ultimate Reward",
    ],
  },
  {
    slug: "thunder-bolt",
    gameId: "item_artifact_thunder_bolt",
    name: "True Thunderbolt",
    era: "post",
    icon: "/artifacts/thunder-bolt.png",
    iconName: "thunder_bolt",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Intelligence",
        base: 35,
        perLevel: 0.4,
      },
      {
        name: "Attack Damage",
        base: 60,
        perLevel: 1,
      },
    ],
    unique: {
      name: "Lightning Call",
      description: "Attack additionally deals [[value]]600%[[/]] damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Primal Decree",
        description: "Gain [[value]]1[[/]] Attack Speed per point of Spell AMP",
      },
      {
        level: 20,
        name: "Thunderclap",
        description: "[[ref]]Lightning Call[[/]] becomes a [[value]]300[[/]] area effect.",
      },
      {
        level: 30,
        name: "Static Field",
        description: "Any Spell Damage deals additional damage equal to [[value]]8%[[/]] of the target’s [[color:#f0ad4e]]current HP[[/]] ([[color:#f0ad4e]]Bosses[[/]]: [[value]]5%[[/]]), capped at [[value]]1000%[[/]] . Each Spell has a [[value]]3[[/]] seconds cooldown per target.",
      },
      {
        level: 40,
        name: "Tempest Wrath",
        description: "[[ref]]Lightning Call[[/]] has a [[value]]30%[[/]] chance to deal pure damage and deal [[value]]30%[[/]] bonus damage.",
      },
    ],
    flavor: "Striding through the clouds and leaping between storms, the True Thunderbolt roams the skies, ever ready to smite the unjust in Zeus’s eyes.",
    cost: {
      dust: 60,
    },
    sources: [
      "Drops from Astral Vault · Visitor from Beyond",
    ],
  },
  {
    slug: "hand-of-the-valkyrie",
    gameId: "item_artifact_hand_of_the_valkyrie",
    name: "Valkyrie’s Arm",
    era: "post",
    icon: "/artifacts/hand-of-the-valkyrie.png",
    iconName: "hand_of_the_valkyrie",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Melee Attack Range",
        base: 100,
        perLevel: 1,
      },
      {
        name: "Max Attack Speed",
        base: 60,
        perLevel: 0.5,
      },
    ],
    unique: {
      name: "Waterfowl Dance",
      description: "Final Attack Damage reduced by [[value]]50%[[/]], grants [[value]]35%[[/]] base Agility bonus.",
    },
    second: {
      name: "Blood Burst",
      description: "Attack applies a curse of [[value]]50%[[/]] to the enemy, exploding after [[value]]5[[/]] seconds, dealing Physical Damage.",
    },
    upgrades: [
      {
        level: 10,
        name: "Restorative Reprisal",
        description: "When attacked, there is a [[value]]20%[[/]] chance to counterattack with a strike",
      },
      {
        level: 20,
        name: "Corruption",
        description: "After [[ref]]Waterfowl Dance[[/]] triggers, target gains additional [[value]]3%[[/]] [[ref]]Waterfowl Dance[[/]] vulnerability, up to [[value]]30%[[/]]",
      },
      {
        level: 30,
        name: "Blood Piercer",
        description: "Attack has a [[value]]10%[[/]] chance to detonate [[ref]]Waterfowl Dance[[/]], removing only [[value]]30%[[/]] of its accumulated value",
      },
      {
        level: 40,
        name: "Crimson Incarnation",
        description: "Every [[value]]7[[/]] seconds, an avatar splits off to attack enemies on a random path. Attack Speed affects this trigger interval.",
      },
    ],
    flavor: "In the endless struggle against the Crimson Rot, Valkyries often lose their limbs to its deadly plague. Forged of pure gold, these prosthetics are bestowed upon those who fight on through pain, allowing them to return to the battlefield with renewed fervor and formidable new weapons.",
    drop: {
      pool: "General",
      weight: 60,
      chance: 0.1974,
      waveFrom: 8,
    },
    cost: {
      dust: 60,
      platinum: 1000,
    },
    requiredDifficulty: 27,
    sources: [
      "May drop in EX+3 worlds or above",
    ],
  },
  {
    slug: "deaths-vigil",
    gameId: "item_artifact_deaths_vigil",
    name: "Vigil of Death",
    era: "post",
    icon: "/artifacts/deaths-vigil.png",
    iconName: "deaths_vigil",
    maxLevel: 40,
    heroLevel: 16,
    stats: [
      {
        name: "Summon Duration",
        base: 10,
        perLevel: 0.15,
        unit: "%",
      },
      {
        name: "Intelligence",
        base: 30,
        perLevel: 0.3,
      },
    ],
    unique: {
      name: "Pyre of Cremation",
      description: "When the summon disappears, it deals damage equal to the summon's [[value]]400[[/]] + [[value]]100%[[/]] of its max health to enemies within [[value]]450[[/]].",
    },
    upgrades: [
      {
        level: 10,
        name: "Ashes of Death",
        description: "After [[ref]]Pyre of Cremation[[/]] triggers, the cooldown of the summoning ability is reduced by [[value]]20%[[/]]",
      },
      {
        level: 20,
        name: "Flame of Vigil",
        description: "Within the area affected by [[ref]]Pyre of Cremation[[/]], your summons gain a shield that absorbs damage equal to [[value]]50%[[/]] of their HP.",
      },
      {
        level: 30,
        name: "Fire of Rebirth",
        description: "For the first [[value]]2[[/]] seconds after being summoned, summons gain [[value]]70%[[/]] damage reduction",
      },
      {
        level: 40,
        name: "Vigil of Death",
        description: "Can be activated. While active, summons lose [[value]]20%[[/]] of their Max HP every [[value]]2[[/]] seconds and trigger [[ref]]Pyre of Cremation[[/]] at [[value]]60%[[/]] effectiveness. This also applies to invulnerable summons, but the interval is increased to [[value]]4[[/]] seconds.",
      },
    ],
    flavor: "From the very first day of our existence, she was already there. Leaning against a silver-plated skull, she helped us find rebirth.She brought aid to the ailing. Not light, not brightness, not glory — but like embers, she shielded us from the cold of death. For those on the verge of dying, she offered a gentle farewell. The departed, under her care, left with a ring of sparkling embers, adorned with immaculate dignity. Others brought death — she burned it away. A practitioner’s wound, left on the dark blade; the scars she excised no longer troubled us. And so we lived, grew, and passed on under her watch, she bearing a double burden — both of penance and of solace. Who better to guard life than one who holds its end? Who better to reap life than one who knows its worth? — The Planar Exile",
    drop: {
      pool: "General",
      weight: 700,
      chance: 2.3034,
      waveFrom: 10,
    },
    cost: {
      dust: 60,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
  {
    slug: "baleful-banner",
    gameId: "item_artifact_baleful_banner",
    name: "Vile Shackles",
    era: "post",
    icon: "/artifacts/baleful-banner.png",
    iconName: "baleful_banner",
    maxLevel: 40,
    heroLevel: 17,
    stats: [
      {
        name: "Summon AMP",
        base: 22,
        perLevel: 0.2,
        unit: "%",
      },
      {
        name: "Health",
        base: 15,
        perLevel: 0.15,
        unit: "%",
      },
    ],
    unique: {
      name: "Soulbind Legion",
      description: "Losing [[value]]30%[[/]] HP to summon Vile Soul which inherits [[value]]100%[[/]] HP Lost, and its Attack Damage equal to [[value]]50%[[/]] of its Max HP.Attack Interval: [[value]]4[[/]]s. Damage:[[value]]150%[[/]]Attack Effect: -[[value]]5[[/]] Magic Armor, stacking independently for [[value]]10[[/]]s, up to [[value]]100%[[/]].Max Summons: [[value]]2[[/]]Souls are invincible and persist until the end of the Stage (And the lost HP will be returned).",
      note: "Attack Speed affects the attack interval of Souls. Damage dealt by Souls is considered as dealt by the summoner and thus triggers damage reflection. This Artifact cannot be removed if a Vile Soul exists.",
    },
    upgrades: [
      {
        level: 10,
        name: "Soulbind",
        description: "When Vile Soul kills an enemy, it absorbs [[value]]1%[[/]] of the target’s Max HP, up to [[value]]5%[[/]] summoner’s Max HP per absorption.",
        note: "This increases Vile Soul's Max hp, thereby increasing its Attack Damage.",
      },
      {
        level: 20,
        name: "Affliction",
        description: "[[value]]2%[[/]] of damage dealt by Souls is converted into temporary HP for the summoner, up to a maximum of [[value]]3000[[/]], lasting until the end of the Round.",
      },
      {
        level: 30,
        name: "Shackles",
        description: "Souls within [[value]]300[[/]] receive [[value]]50%[[/]] of temporary HP gained from [[ref]]Affliction[[/]].",
      },
      {
        level: 40,
        name: "Unshackle",
        description: "+[[value]]1[[/]] max Vile Souls. You may continue summoning beyond the max; doing so will remove the oldest Vile Soul, then consumes HP again to summon a new one.",
        note: "New Vile Souls inherit the maximum HP gained by the previous Vile Soul through [[ref]]Shackles[[/]].",
      },
    ],
    flavor: "Forged from the bones and wreckage of battlefields where tens of thousands perished. The halberd’s shaft is entwined with the dry bones and shattered weapons of fallen soldiers, while the ghostly war banner hanging from its side is woven from the souls of the defeated, whispering dirges of war and death. The weapon pulses with the agony of bound spirits, glowing with a blood-red spectral light.",
    drop: {
      pool: "General",
      weight: 700,
      chance: 2.3034,
      waveFrom: 10,
    },
    cost: {
      dust: 60,
      platinum: 1000,
    },
    sources: [
      "May drop while completing the Stage",
    ],
  },
]
