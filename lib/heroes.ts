// The Aghanim's Labyrinth roster (63 heroes), grouped and ordered the way the in-game
// picker shows them -- which is why the order isn't alphabetical. The attributes all
// match current Dota, so heroesByAttribute() needs no special-casing.
//
// Abilities, relics and review are optional so hero pages can be filled in one at a
// time. When this moves to a database, replace the getters below and keep these shapes.

export const ATTRIBUTES = ['strength', 'agility', 'intelligence', 'universal'] as const

export type Attribute = (typeof ATTRIBUTES)[number]

/** Valve's own attribute colours, dimmed to sit inside the ice palette. */
export const ATTRIBUTE_COLOR: Record<Attribute, string> = {
  strength: '#e0654a',
  agility: '#66bf5c',
  intelligence: '#5ab6e0',
  universal: '#c98ee0',
}

export type Ability = {
  name: string
  /** Valve's internal ability id, used to build the icon URL. Pre-filled from Dota. */
  valveId?: string
  /** James's own art. Wins over valveId when both are set. */
  image?: string
  /** Labyrinth behaviour, written by us -- Valve's wording doesn't apply here. */
  description?: string
  /** Set when the ability also exists in the generated catalogue, which has the numbers. */
  href?: string
}

/**
 * One rung of the talent tree: the level it unlocks at, and the choice either side.
 * Text only -- Valve serves no icon for talents, and the Labyrinth wording is ours.
 */
export type Talent = {
  level: number
  left: string
  right: string
}

export type Hero = {
  slug: string
  name: string
  attribute: Attribute
  abilities?: Ability[]
  talents?: Talent[]
  /**
   * Long-form review, written by us.
   * @deprecated Superseded by per-author takes in the database (lib/takes.ts). Kept so
   * the few heroes with a written review don't lose it; new writing goes in a take.
   */
  review?: string
}

export const HEROES: Hero[] = [
  {
    slug: 'shredder',
    name: 'Timbersaw',
    attribute: 'strength',
    abilities: [
      { name: 'Whirling Death', valveId: 'shredder_whirling_death' },
      { name: 'Timber Chain', valveId: 'shredder_timber_chain' },
      { name: 'Reactive Armor', valveId: 'shredder_reactive_armor' },
      { name: 'Flamethrower', valveId: 'shredder_flamethrower' },
      { name: 'Chakram', valveId: 'shredder_chakram' },
      { name: 'Return Chakram', valveId: 'shredder_return_chakram' },
    ],
  },
  {
    slug: 'omniknight',
    name: 'Omniknight',
    attribute: 'strength',
    abilities: [
      { name: 'Purification', valveId: 'omniknight_purification' },
      { name: 'Repel', valveId: 'omniknight_martyr' },
      { name: 'Hammer of Purity', valveId: 'omniknight_hammer_of_purity' },
      { name: 'Degen Aura', valveId: 'omniknight_degen_aura' },
      { name: 'Guardian Angel', valveId: 'omniknight_guardian_angel' },
    ],
  },
  {
    slug: 'abyssal_underlord',
    name: 'Underlord',
    attribute: 'strength',
    abilities: [
      { name: 'Firestorm', valveId: 'abyssal_underlord_firestorm' },
      { name: 'Pit of Malice', valveId: 'abyssal_underlord_pit_of_malice' },
      { name: 'Atrophy Aura', valveId: 'abyssal_underlord_atrophy_aura' },
      { name: 'Fiend\'s Gate', valveId: 'abyssal_underlord_dark_portal' },
    ],
  },
  {
    slug: 'pudge',
    name: 'Pudge',
    attribute: 'strength',
    abilities: [
      { name: 'Meat Hook', valveId: 'pudge_meat_hook' },
      { name: 'Rot', valveId: 'pudge_rot' },
      { name: 'Meat Shield', valveId: 'pudge_flesh_heap' },
      { name: 'Flesh Heap', valveId: 'pudge_innate_graft_flesh' },
      { name: 'Dismember', valveId: 'pudge_dismember' },
    ],
  },
  {
    slug: 'axe',
    name: 'Axe',
    attribute: 'strength',
    abilities: [
      { name: 'Berserker\'s Call', valveId: 'axe_berserkers_call' },
      { name: 'Battle Hunger', valveId: 'axe_battle_hunger' },
      { name: 'Counter Helix', valveId: 'axe_counter_helix' },
      { name: 'Culling Blade', valveId: 'axe_culling_blade' },
    ],
  },
  {
    slug: 'slardar',
    name: 'Slardar',
    attribute: 'strength',
    abilities: [
      { name: 'Guardian Sprint', valveId: 'slardar_sprint' },
      { name: 'Slithereen Crush', valveId: 'slardar_slithereen_crush' },
      { name: 'Bash of the Deep', valveId: 'slardar_bash' },
      { name: 'Corrosive Haze', valveId: 'slardar_amplify_damage' },
    ],
  },
  {
    slug: 'tidehunter',
    name: 'Tidehunter',
    attribute: 'strength',
    abilities: [
      { name: 'Gush', valveId: 'tidehunter_gush' },
      { name: 'Kraken Shell', valveId: 'tidehunter_kraken_shell' },
      { name: 'Anchor Smash', valveId: 'tidehunter_anchor_smash' },
      { name: 'Dead in the Water', valveId: 'tidehunter_dead_in_the_water' },
      { name: 'Ravage', valveId: 'tidehunter_ravage' },
      { name: 'Leviathan\'s Catch', valveId: 'tidehunter_krill_eater' },
    ],
  },
  {
    slug: 'sven',
    name: 'Sven',
    attribute: 'strength',
    abilities: [
      { name: 'Storm Hammer', valveId: 'sven_storm_bolt' },
      { name: 'Great Cleave', valveId: 'sven_great_cleave' },
      { name: 'Warcry', valveId: 'sven_warcry' },
      { name: 'God\'s Strength', valveId: 'sven_gods_strength' },
      { name: 'Wrath of God', valveId: 'sven_wrath_of_god' },
    ],
  },
  {
    slug: 'chaos_knight',
    name: 'Chaos Knight',
    attribute: 'strength',
    abilities: [
      { name: 'Chaos Bolt', valveId: 'chaos_knight_chaos_bolt' },
      { name: 'Reality Rift', valveId: 'chaos_knight_reality_rift' },
      { name: 'Chaos Strike', valveId: 'chaos_knight_chaos_strike' },
      { name: 'Phantasm', valveId: 'chaos_knight_phantasm' },
    ],
  },
  {
    slug: 'bristleback',
    name: 'Bristleback',
    attribute: 'strength',
    abilities: [
      { name: 'Viscous Nasal Goo', valveId: 'bristleback_viscous_nasal_goo' },
      { name: 'Quill Spray', valveId: 'bristleback_quill_spray' },
      { name: 'Bristleback', valveId: 'bristleback_bristleback' },
      { name: 'Hairball', valveId: 'bristleback_hairball' },
      { name: 'Warpath', valveId: 'bristleback_warpath' },
    ],
  },
  {
    slug: 'mars',
    name: 'Mars',
    attribute: 'strength',
    abilities: [
      { name: 'Spear of Mars', valveId: 'mars_spear' },
      { name: 'God\'s Rebuke', valveId: 'mars_gods_rebuke' },
      { name: 'Bulwark', valveId: 'mars_bulwark' },
      { name: 'Arena Of Blood', valveId: 'mars_arena_of_blood' },
    ],
  },
  {
    slug: 'night_stalker',
    name: 'Night Stalker',
    attribute: 'strength',
    abilities: [
      { name: 'Void', valveId: 'night_stalker_void' },
      { name: 'Crippling Fear', valveId: 'night_stalker_crippling_fear' },
      { name: 'Midnight Feast', valveId: 'night_stalker_midnight_feast' },
      { name: 'Hunter in the Night', valveId: 'night_stalker_hunter_in_the_night' },
      { name: 'Dark Ascension', valveId: 'night_stalker_darkness' },
    ],
  },
  {
    slug: 'undying',
    name: 'Undying',
    attribute: 'strength',
    abilities: [
      { name: 'Decay', valveId: 'undying_decay' },
      { name: 'Soul Rip', valveId: 'undying_soul_rip' },
      { name: 'Tombstone', valveId: 'undying_tombstone' },
      { name: 'Ceaseless Dirge', valveId: 'undying_ceaseless_dirge' },
      { name: 'Flesh Golem', valveId: 'undying_flesh_golem' },
    ],
  },
  {
    slug: 'tiny',
    name: 'Tiny',
    attribute: 'strength',
    abilities: [
      { name: 'Avalanche', valveId: 'tiny_avalanche' },
      { name: 'Toss', valveId: 'tiny_toss' },
      { name: 'Tree Grab', valveId: 'tiny_tree_grab' },
      { name: 'Tree Volley', valveId: 'tiny_tree_channel' },
      { name: 'Insurmountable', valveId: 'tiny_insurmountable' },
      { name: 'Grow', valveId: 'tiny_grow' },
      { name: 'Tree Throw', valveId: 'tiny_toss_tree' },
    ],
  },
  {
    slug: 'centaur',
    name: 'Centaur Warrunner',
    attribute: 'strength',
    abilities: [
      { name: 'Hoof Stomp', valveId: 'centaur_hoof_stomp' },
      { name: 'Double Edge', valveId: 'centaur_double_edge' },
      { name: 'Retaliate', valveId: 'centaur_return' },
      { name: 'Work Horse', valveId: 'centaur_work_horse' },
      { name: 'Hitch A Ride', valveId: 'centaur_mount' },
      { name: 'Stampede', valveId: 'centaur_stampede' },
    ],
  },
  {
    slug: 'rattletrap',
    name: 'Clockwerk',
    attribute: 'strength',
    abilities: [
      { name: 'Battery Assault', valveId: 'rattletrap_battery_assault' },
      { name: 'Power Cogs', valveId: 'rattletrap_power_cogs' },
      { name: 'Rocket Flare', valveId: 'rattletrap_rocket_flare' },
      { name: 'Overclocking', valveId: 'rattletrap_overclocking' },
      { name: 'Jetpack', valveId: 'rattletrap_jetpack' },
      { name: 'Hookshot', valveId: 'rattletrap_hookshot' },
      { name: 'Jetpack Toggle', valveId: 'rattletrap_jetpack_toggle' },
    ],
  },
  {
    slug: 'dragon_knight',
    name: 'Dragon Knight',
    attribute: 'strength',
    abilities: [
      { name: 'Breathe Fire', valveId: 'dragon_knight_breathe_fire' },
      { name: 'Dragon Tail', valveId: 'dragon_knight_dragon_tail' },
      { name: 'Wyrm\'s Wrath', valveId: 'dragon_knight_wyrms_wrath' },
      { name: 'Fireball', valveId: 'dragon_knight_fireball' },
      { name: 'Dragon Blood', valveId: 'dragon_knight_dragon_blood' },
      { name: 'Elder Dragon Form', valveId: 'dragon_knight_elder_dragon_form' },
    ],
  },
  {
    slug: 'phoenix',
    name: 'Phoenix',
    attribute: 'strength',
    abilities: [
      { name: 'Icarus Dive', valveId: 'phoenix_icarus_dive' },
      { name: 'Fire Spirits', valveId: 'phoenix_fire_spirits' },
      { name: 'Sun Ray', valveId: 'phoenix_sun_ray' },
      { name: 'Toggle Movement', valveId: 'phoenix_sun_ray_toggle_move' },
      { name: 'Dying Light', valveId: 'phoenix_dying_light' },
      { name: 'Supernova', valveId: 'phoenix_supernova' },
      { name: 'Launch Fire Spirit', valveId: 'phoenix_launch_fire_spirit' },
      { name: 'Stop Icarus Dive', valveId: 'phoenix_icarus_dive_stop' },
      { name: 'Stop Sun Ray', valveId: 'phoenix_sun_ray_stop' },
    ],
  },
  {
    slug: 'juggernaut',
    name: 'Juggernaut',
    attribute: 'agility',
    abilities: [
      { name: 'Blade Fury', valveId: 'juggernaut_blade_fury' },
      { name: 'Healing Ward', valveId: 'juggernaut_healing_ward' },
      { name: 'Blade Dance', valveId: 'juggernaut_blade_dance' },
      { name: 'Swiftslash', valveId: 'juggernaut_swift_slash' },
      { name: 'Omnislash', valveId: 'juggernaut_omni_slash' },
    ],
  },
  {
    slug: 'viper',
    name: 'Viper',
    attribute: 'agility',
    abilities: [
      { name: 'Poison Attack', valveId: 'viper_poison_attack' },
      { name: 'Nethertoxin', valveId: 'viper_nethertoxin' },
      { name: 'Corrosive Skin', valveId: 'viper_corrosive_skin' },
      { name: 'Nosedive', valveId: 'viper_nose_dive' },
      { name: 'Viper Strike', valveId: 'viper_viper_strike' },
    ],
  },
  {
    slug: 'phantom_assassin',
    name: 'Phantom Assassin',
    attribute: 'agility',
    abilities: [
      { name: 'Stifling Dagger', valveId: 'phantom_assassin_stifling_dagger' },
      { name: 'Phantom Strike', valveId: 'phantom_assassin_phantom_strike' },
      { name: 'Blur', valveId: 'phantom_assassin_blur' },
      { name: 'Fan of Knives', valveId: 'phantom_assassin_fan_of_knives' },
      { name: 'Immaterial', valveId: 'phantom_assassin_immaterial' },
      { name: 'Coup de Grace', valveId: 'phantom_assassin_coup_de_grace' },
    ],
  },
  {
    slug: 'ursa',
    name: 'Ursa',
    attribute: 'agility',
    abilities: [
      { name: 'Earthshock', valveId: 'ursa_earthshock' },
      { name: 'Overpower', valveId: 'ursa_overpower' },
      { name: 'Fury Swipes', valveId: 'ursa_fury_swipes' },
      { name: 'Enrage', valveId: 'ursa_enrage' },
    ],
  },
  {
    slug: 'sniper',
    name: 'Sniper',
    attribute: 'agility',
    abilities: [
      { name: 'Shrapnel', valveId: 'sniper_shrapnel' },
      { name: 'Headshot', valveId: 'sniper_headshot' },
      { name: 'Take Aim', valveId: 'sniper_take_aim' },
      { name: 'Concussive Grenade', valveId: 'sniper_concussive_grenade' },
      { name: 'Assassinate', valveId: 'sniper_assassinate' },
    ],
  },
  {
    slug: 'gyrocopter',
    name: 'Gyrocopter',
    attribute: 'agility',
    abilities: [
      { name: 'Rocket Barrage', valveId: 'gyrocopter_rocket_barrage' },
      { name: 'Homing Missile', valveId: 'gyrocopter_homing_missile' },
      { name: 'Flak Cannon', valveId: 'gyrocopter_flak_cannon' },
      { name: 'Afterburner', valveId: 'gyrocopter_afterburner' },
      { name: 'Side Gunner', valveId: 'gyrocopter_side_gunner_spawn_ability' },
      { name: 'Call Down', valveId: 'gyrocopter_call_down' },
    ],
  },
  {
    slug: 'mirana',
    name: 'Mirana',
    attribute: 'agility',
    abilities: [
      { name: 'Starstorm', valveId: 'mirana_starfall' },
      { name: 'Sacred Arrow', valveId: 'mirana_arrow' },
      { name: 'Leap', valveId: 'mirana_leap' },
      { name: 'Celestial Quiver', valveId: 'mirana_celestial_quiver' },
      { name: 'Moonlight Shadow', valveId: 'mirana_invis' },
    ],
  },
  {
    slug: 'weaver',
    name: 'Weaver',
    attribute: 'agility',
    abilities: [
      { name: 'The Swarm', valveId: 'weaver_the_swarm' },
      { name: 'Shukuchi', valveId: 'weaver_shukuchi' },
      { name: 'Geminate Attack', valveId: 'weaver_geminate_attack' },
      { name: 'Time Lapse', valveId: 'weaver_time_lapse' },
    ],
  },
  {
    slug: 'faceless_void',
    name: 'Faceless Void',
    attribute: 'agility',
    abilities: [
      { name: 'Time Walk', valveId: 'faceless_void_time_walk' },
      { name: 'Time Dilation', valveId: 'faceless_void_time_dilation' },
      { name: 'Time Lock', valveId: 'faceless_void_time_lock' },
      { name: 'Reverse Time Walk', valveId: 'faceless_void_time_walk_reverse' },
      { name: 'Chronosphere', valveId: 'faceless_void_chronosphere' },
    ],
  },
  {
    slug: 'slark',
    name: 'Slark',
    attribute: 'agility',
    abilities: [
      { name: 'Dark Pact', valveId: 'slark_dark_pact' },
      { name: 'Pounce', valveId: 'slark_pounce' },
      { name: 'Saltwater Shiv', valveId: 'slark_saltwater_shiv' },
      { name: 'Depth Shroud', valveId: 'slark_depth_shroud' },
      { name: 'Essence Shift', valveId: 'slark_essence_shift' },
      { name: 'Shadow Dance', valveId: 'slark_shadow_dance' },
    ],
  },
  {
    slug: 'luna',
    name: 'Luna',
    attribute: 'agility',
    abilities: [
      { name: 'Lucent Beam', valveId: 'luna_lucent_beam' },
      { name: 'Lunar Orbit', valveId: 'luna_lunar_orbit' },
      { name: 'Moon Glaives', valveId: 'luna_moon_glaive' },
      { name: 'Lunar Blessing', valveId: 'luna_lunar_blessing' },
      { name: 'Eclipse', valveId: 'luna_eclipse' },
    ],
  },
  {
    slug: 'nevermore',
    name: 'Shadow Fiend',
    attribute: 'agility',
    abilities: [
      { name: 'Shadowraze', valveId: 'nevermore_shadowraze1' },
      { name: 'Shadowraze', valveId: 'nevermore_shadowraze2' },
      { name: 'Shadowraze', valveId: 'nevermore_shadowraze3' },
      { name: 'Feast of Souls', valveId: 'nevermore_frenzy' },
      { name: 'Presence of the Dark Lord', valveId: 'nevermore_dark_lord' },
      { name: 'Requiem of Souls', valveId: 'nevermore_requiem' },
      { name: 'Necromastery', valveId: 'nevermore_necromastery' },
    ],
  },
  {
    slug: 'ember_spirit',
    name: 'Ember Spirit',
    attribute: 'agility',
    abilities: [
      { name: 'Searing Chains', valveId: 'ember_spirit_searing_chains' },
      { name: 'Sleight of Fist', valveId: 'ember_spirit_sleight_of_fist' },
      { name: 'Flame Guard', valveId: 'ember_spirit_flame_guard' },
      { name: 'Activate Fire Remnant', valveId: 'ember_spirit_activate_fire_remnant' },
      { name: 'Fire Remnant', valveId: 'ember_spirit_fire_remnant' },
    ],
  },
  {
    slug: 'razor',
    name: 'Razor',
    attribute: 'agility',
    abilities: [
      { name: 'Plasma Field', valveId: 'razor_plasma_field' },
      { name: 'Static Link', valveId: 'razor_static_link' },
      { name: 'Storm Surge', valveId: 'razor_storm_surge' },
      { name: 'Unstable Current', valveId: 'razor_unstable_current' },
      { name: 'Eye of the Storm', valveId: 'razor_eye_of_the_storm' },
    ],
  },
  {
    slug: 'riki',
    name: 'Riki',
    attribute: 'agility',
    abilities: [
      { name: 'Smoke Screen', valveId: 'riki_smoke_screen' },
      { name: 'Blink Strike', valveId: 'riki_blink_strike' },
      { name: 'Tricks of the Trade', valveId: 'riki_tricks_of_the_trade' },
      { name: 'Backstab', valveId: 'riki_innate_backstab' },
      { name: 'Cloak and Dagger', valveId: 'riki_backstab' },
    ],
  },
  {
    slug: 'bloodseeker',
    name: 'Bloodseeker',
    attribute: 'agility',
    abilities: [
      { name: 'Bloodrage', valveId: 'bloodseeker_bloodrage' },
      { name: 'Blood Rite', valveId: 'bloodseeker_blood_bath' },
      { name: 'Thirst', valveId: 'bloodseeker_thirst' },
      { name: 'Sanguivore', valveId: 'bloodseeker_sanguivore' },
      { name: 'Rupture', valveId: 'bloodseeker_rupture' },
    ],
  },
  {
    slug: 'skywrath_mage',
    name: 'Skywrath Mage',
    attribute: 'intelligence',
    abilities: [
      { name: 'Arcane Bolt', valveId: 'skywrath_mage_arcane_bolt' },
      { name: 'Concussive Shot', valveId: 'skywrath_mage_concussive_shot' },
      { name: 'Ancient Seal', valveId: 'skywrath_mage_ancient_seal' },
      { name: 'Shield of the Scion', valveId: 'skywrath_mage_shield_of_the_scion' },
      { name: 'Mystic Flare', valveId: 'skywrath_mage_mystic_flare' },
    ],
  },
  {
    slug: 'zuus',
    name: 'Zeus',
    attribute: 'intelligence',
    abilities: [
      { name: 'Arc Lightning', valveId: 'zuus_arc_lightning' },
      { name: 'Lightning Bolt', valveId: 'zuus_lightning_bolt' },
      { name: 'Heavenly Jump', valveId: 'zuus_heavenly_jump' },
      { name: 'Nimbus', valveId: 'zuus_cloud' },
      { name: 'Lightning Hands', valveId: 'zuus_lightning_hands' },
      { name: 'Thundergod\'s Wrath', valveId: 'zuus_thundergods_wrath' },
      { name: 'Static Field', valveId: 'zuus_static_field' },
    ],
  },
  {
    slug: 'winter_wyvern',
    name: 'Winter Wyvern',
    attribute: 'intelligence',
    abilities: [
      { name: 'Arctic Burn', valveId: 'winter_wyvern_arctic_burn' },
      { name: 'Splinter Blast', valveId: 'winter_wyvern_splinter_blast' },
      { name: 'Cold Embrace', valveId: 'winter_wyvern_cold_embrace' },
      { name: 'Eldwurm\'s Edda', valveId: 'winter_wyvern_eldwurms_edda' },
      { name: 'Winter\'s Curse', valveId: 'winter_wyvern_winters_curse' },
    ],
  },
  {
    slug: 'lich',
    name: 'Lich',
    attribute: 'intelligence',
    abilities: [
      { name: 'Frost Blast', valveId: 'lich_frost_nova' },
      { name: 'Frost Shield', valveId: 'lich_frost_shield' },
      { name: 'Sinister Gaze', valveId: 'lich_sinister_gaze' },
      { name: 'Ice Spire', valveId: 'lich_ice_spire' },
      { name: 'Sacrifice', valveId: 'lich_death_charge' },
      { name: 'Chain Frost', valveId: 'lich_chain_frost' },
    ],
  },
  {
    slug: 'leshrac',
    name: 'Leshrac',
    attribute: 'intelligence',
    abilities: [
      { name: 'Split Earth', valveId: 'leshrac_split_earth' },
      { name: 'Diabolic Edict', valveId: 'leshrac_diabolic_edict' },
      { name: 'Lightning Storm', valveId: 'leshrac_lightning_storm' },
      { name: 'Nihilism', valveId: 'leshrac_greater_lightning_storm' },
      { name: 'Pulse Nova', valveId: 'leshrac_pulse_nova' },
    ],
  },
  {
    slug: 'crystal_maiden',
    name: 'Crystal Maiden',
    attribute: 'intelligence',
    abilities: [
      { name: 'Crystal Nova', valveId: 'crystal_maiden_crystal_nova' },
      { name: 'Frostbite', valveId: 'crystal_maiden_frostbite' },
      { name: 'Arcane Aura', valveId: 'crystal_maiden_brilliance_aura' },
      { name: 'Crystal Clone', valveId: 'crystal_maiden_crystal_clone' },
      { name: 'Glacial Guard', valveId: 'crystal_maiden_glacial_guard' },
      { name: 'Freezing Field', valveId: 'crystal_maiden_freezing_field' },
      { name: 'Stop Freezing Field', valveId: 'crystal_maiden_freezing_field_stop' },
    ],
  },
  {
    slug: 'queenofpain',
    name: 'Queen of Pain',
    attribute: 'intelligence',
    abilities: [
      { name: 'Shadow Strike', valveId: 'queenofpain_shadow_strike' },
      { name: 'Blink', valveId: 'queenofpain_blink' },
      { name: 'Scream Of Pain', valveId: 'queenofpain_scream_of_pain' },
      { name: 'Sonic Wave', valveId: 'queenofpain_sonic_wave' },
    ],
  },
  {
    slug: 'necrolyte',
    name: 'Necrophos',
    attribute: 'intelligence',
    abilities: [
      { name: 'Death Pulse', valveId: 'necrolyte_death_pulse' },
      { name: 'Ghost Shroud', valveId: 'necrolyte_ghost_shroud' },
      { name: 'Heartstopper Aura', valveId: 'necrolyte_heartstopper_aura' },
      { name: 'Death Seeker', valveId: 'necrolyte_death_seeker' },
      { name: 'Sadist', valveId: 'necrolyte_sadist' },
      { name: 'Reaper\'s Scythe', valveId: 'necrolyte_reapers_scythe' },
    ],
  },
  {
    slug: 'lion',
    name: 'Lion',
    attribute: 'intelligence',
    abilities: [
      { name: 'Earth Spike', valveId: 'lion_impale' },
      { name: 'Hex', valveId: 'lion_voodoo' },
      { name: 'Mana Drain', valveId: 'lion_mana_drain' },
      { name: 'Finger of Death', valveId: 'lion_finger_of_death' },
    ],
  },
  {
    slug: 'obsidian_destroyer',
    name: 'Outworld Devourer',
    attribute: 'intelligence',
    abilities: [
      { name: 'Arcane Orb', valveId: 'obsidian_destroyer_arcane_orb' },
      { name: 'Astral Imprisonment', valveId: 'obsidian_destroyer_astral_imprisonment' },
      { name: 'Objurgation', valveId: 'obsidian_destroyer_objurgation' },
      { name: 'Essence Flux', valveId: 'obsidian_destroyer_equilibrium' },
      { name: 'Sanity\'s Eclipse', valveId: 'obsidian_destroyer_sanity_eclipse' },
    ],
  },
  {
    slug: 'silencer',
    name: 'Silencer',
    attribute: 'intelligence',
    abilities: [
      { name: 'Arcane Curse', valveId: 'silencer_curse_of_the_silent' },
      { name: 'Glaives of Wisdom', valveId: 'silencer_glaives_of_wisdom' },
      { name: 'Last Word', valveId: 'silencer_last_word' },
      { name: 'Global Silence', valveId: 'silencer_global_silence' },
    ],
  },
  {
    slug: 'lina',
    name: 'Lina',
    attribute: 'intelligence',
    abilities: [
      { name: 'Dragon Slave', valveId: 'lina_dragon_slave' },
      { name: 'Light Strike Array', valveId: 'lina_light_strike_array' },
      { name: 'Fiery Soul', valveId: 'lina_fiery_soul' },
      { name: 'Flame Cloak', valveId: 'lina_flame_cloak' },
      { name: 'Laguna Blade', valveId: 'lina_laguna_blade' },
    ],
  },
  {
    slug: 'muerta',
    name: 'Muerta',
    attribute: 'intelligence',
    abilities: [
      { name: 'Dead Shot', valveId: 'muerta_dead_shot' },
      { name: 'The Calling', valveId: 'muerta_the_calling' },
      { name: 'Gunslinger', valveId: 'muerta_gunslinger' },
      { name: 'Spectral Slug', valveId: 'muerta_spectral_slug' },
      { name: 'Pierce the Veil', valveId: 'muerta_pierce_the_veil' },
      { name: 'Supernatural', valveId: 'muerta_supernatural' },
    ],
  },
  {
    slug: 'storm_spirit',
    name: 'Storm Spirit',
    attribute: 'intelligence',
    abilities: [
      { name: 'Static Remnant', valveId: 'storm_spirit_static_remnant' },
      { name: 'Electric Vortex', valveId: 'storm_spirit_electric_vortex' },
      { name: 'Overload', valveId: 'storm_spirit_overload' },
      { name: 'Ball Lightning', valveId: 'storm_spirit_ball_lightning' },
    ],
  },
  {
    slug: 'tinker',
    name: 'Tinker',
    attribute: 'intelligence',
    abilities: [
      { name: 'Laser', valveId: 'tinker_laser' },
      { name: 'March of the Machines', valveId: 'tinker_march_of_the_machines' },
      { name: 'Deploy Turrets', valveId: 'tinker_deploy_turrets' },
      { name: 'Warp Flare', valveId: 'tinker_warp_grenade' },
      { name: 'Keen Conveyance', valveId: 'tinker_keen_teleport' },
      { name: 'Rearm', valveId: 'tinker_rearm' },
    ],
  },
  {
    slug: 'venomancer',
    name: 'Venomancer',
    attribute: 'universal',
    abilities: [
      { name: 'Venomous Gale', valveId: 'venomancer_venomous_gale' },
      { name: 'Snakebite', valveId: 'venomancer_snakebite' },
      { name: 'Plague Ward', valveId: 'venomancer_plague_ward' },
      { name: 'Poison Sting', valveId: 'venomancer_poison_sting' },
      { name: 'Noxious Plague', valveId: 'venomancer_noxious_plague' },
    ],
  },
  {
    slug: 'beastmaster',
    name: 'Beastmaster',
    attribute: 'universal',
    abilities: [
      { name: 'Wild Axes', valveId: 'beastmaster_wild_axes' },
      { name: 'Summon Razorback', valveId: 'beastmaster_summon_razorback' },
      { name: 'Summon Raptors', valveId: 'beastmaster_summon_raptor' },
      { name: 'Inner Beast', valveId: 'beastmaster_inner_beast' },
      { name: 'Drums of Slom', valveId: 'beastmaster_drums_of_slom' },
      { name: 'Primal Roar', valveId: 'beastmaster_primal_roar' },
    ],
  },
  {
    slug: 'death_prophet',
    name: 'Death Prophet',
    attribute: 'universal',
    abilities: [
      { name: 'Crypt Swarm', valveId: 'death_prophet_carrion_swarm' },
      { name: 'Silence', valveId: 'death_prophet_silence' },
      { name: 'Spirit Siphon', valveId: 'death_prophet_spirit_siphon' },
      { name: 'Witchcraft', valveId: 'death_prophet_witchcraft' },
      { name: 'Exorcism', valveId: 'death_prophet_exorcism' },
    ],
  },
  {
    slug: 'sand_king',
    name: 'Sand King',
    attribute: 'universal',
    abilities: [
      { name: 'Burrowstrike', valveId: 'sandking_burrowstrike' },
      { name: 'Sand Storm', valveId: 'sandking_sand_storm' },
      { name: 'Stinger', valveId: 'sandking_scorpion_strike' },
      { name: 'Caustic Finale', valveId: 'sandking_caustic_finale' },
      { name: 'Epicenter', valveId: 'sandking_epicenter' },
    ],
  },
  {
    slug: 'snapfire',
    name: 'Snapfire',
    attribute: 'universal',
    abilities: [
      { name: 'Scatterblast', valveId: 'snapfire_scatterblast' },
      { name: 'Firesnap Cookie', valveId: 'snapfire_firesnap_cookie' },
      { name: 'Lil\' Shredder', valveId: 'snapfire_lil_shredder' },
      { name: 'Gobble Up', valveId: 'snapfire_gobble_up' },
      { name: 'Spit Out', valveId: 'snapfire_spit_creep' },
      { name: 'Mortimer Kisses', valveId: 'snapfire_mortimer_kisses' },
    ],
  },
  {
    slug: 'windrunner',
    name: 'Windranger',
    attribute: 'universal',
    abilities: [
      { name: 'Shackleshot', valveId: 'windrunner_shackleshot' },
      { name: 'Powershot', valveId: 'windrunner_powershot' },
      { name: 'Windrun', valveId: 'windrunner_windrun' },
      { name: 'Gale Force', valveId: 'windrunner_gale_force' },
      { name: 'Focus Fire Cancel', valveId: 'windrunner_focusfire_cancel' },
      { name: 'Focus Fire', valveId: 'windrunner_focusfire' },
      { name: 'Tailwind', valveId: 'windrunner_tailwind' },
    ],
  },
  {
    slug: 'void_spirit',
    name: 'Void Spirit',
    attribute: 'universal',
    abilities: [
      { name: 'Aether Remnant', valveId: 'void_spirit_aether_remnant' },
      { name: 'Dissimilate', valveId: 'void_spirit_dissimilate' },
      { name: 'Resonant Pulse', valveId: 'void_spirit_resonant_pulse' },
      { name: 'Astral Step', valveId: 'void_spirit_astral_step' },
    ],
  },
  {
    slug: 'magnataur',
    name: 'Magnus',
    attribute: 'universal',
    abilities: [
      { name: 'Shockwave', valveId: 'magnataur_shockwave' },
      { name: 'Empower', valveId: 'magnataur_empower' },
      { name: 'Skewer', valveId: 'magnataur_skewer' },
      { name: 'Horn Toss', valveId: 'magnataur_horn_toss' },
      { name: 'Solid Core', valveId: 'magnataur_solid_core' },
      { name: 'Reverse Polarity', valveId: 'magnataur_reverse_polarity' },
    ],
  },
  {
    slug: 'dazzle',
    name: 'Dazzle',
    attribute: 'universal',
    abilities: [
      { name: 'Poison Touch', valveId: 'dazzle_poison_touch' },
      { name: 'Shallow Grave', valveId: 'dazzle_shallow_grave' },
      { name: 'Shadow Wave', valveId: 'dazzle_shadow_wave' },
      { name: 'Weave', valveId: 'dazzle_innate_weave' },
      { name: 'Nothl Projection', valveId: 'dazzle_nothl_projection' },
      { name: 'End Projection', valveId: 'dazzle_nothl_projection_end' },
    ],
  },
  {
    slug: 'marci',
    name: 'Marci',
    attribute: 'universal',
    abilities: [
      { name: 'Dispose', valveId: 'marci_grapple' },
      { name: 'Rebound', valveId: 'marci_companion_run' },
      { name: 'Bodyguard', valveId: 'marci_bodyguard' },
      { name: 'Special Delivery', valveId: 'marci_special_delivery' },
      { name: 'Unleash', valveId: 'marci_unleash' },
    ],
  },
  {
    slug: 'pangolier',
    name: 'Pangolier',
    attribute: 'universal',
    abilities: [
      { name: 'Swashbuckle', valveId: 'pangolier_swashbuckle' },
      { name: 'Shield Crash', valveId: 'pangolier_shield_crash' },
      { name: 'Lucky Shot', valveId: 'pangolier_lucky_shot' },
      { name: 'Roll Up', valveId: 'pangolier_rollup' },
      { name: 'Rolling Thunder', valveId: 'pangolier_gyroshell' },
      { name: 'Stop Rolling', valveId: 'pangolier_gyroshell_stop' },
      { name: 'End Roll Up', valveId: 'pangolier_rollup_stop' },
      { name: 'Fortune Favors the Bold', valveId: 'pangolier_fortune_favors_the_bold' },
    ],
  },
  {
    slug: 'nyx_assassin',
    name: 'Nyx Assassin',
    attribute: 'universal',
    abilities: [
      { name: 'Impale', valveId: 'nyx_assassin_impale' },
      { name: 'Mind Flare', valveId: 'nyx_assassin_jolt' },
      { name: 'Spiked Carapace', valveId: 'nyx_assassin_spiked_carapace' },
      { name: 'Burrow', valveId: 'nyx_assassin_burrow' },
      { name: 'Mana Burn', valveId: 'nyx_assassin_neuro_sting' },
      { name: 'Vendetta', valveId: 'nyx_assassin_vendetta' },
      { name: 'Unburrow', valveId: 'nyx_assassin_unburrow' },
    ],
  },
  {
    slug: 'batrider',
    name: 'Batrider',
    attribute: 'universal',
    abilities: [
      { name: 'Sticky Napalm', valveId: 'batrider_sticky_napalm' },
      { name: 'Flamebreak', valveId: 'batrider_flamebreak' },
      { name: 'Firefly', valveId: 'batrider_firefly' },
      { name: 'Flaming Lasso', valveId: 'batrider_flaming_lasso' },
    ],
  },
  {
    slug: 'techies',
    name: 'Techies',
    attribute: 'universal',
    abilities: [
      { name: 'Sticky Bomb', valveId: 'techies_sticky_bomb' },
      { name: 'Reactive Tazer', valveId: 'techies_reactive_tazer' },
      { name: 'Blast Off!', valveId: 'techies_suicide' },
      { name: 'M.A.D.', valveId: 'techies_mutually_assured_destruction' },
      { name: 'Minefield Sign', valveId: 'techies_minefield_sign' },
      { name: 'Proximity Mines', valveId: 'techies_land_mines' },
      { name: 'Detonate Tazer', valveId: 'techies_reactive_tazer_stop' },
      { name: 'Detonate M.A.D.', valveId: 'techies_focused_detonate' },
    ],
  },
]

// Heroes added after Valve stopped publishing the legacy `_vert.jpg` portraits. They
// only exist on the newer path, which serves a wider 400x250 crop -- the tile centres it.
const NO_LEGACY_PORTRAIT = new Set(['dawnbreaker', 'primal_beast', 'muerta', 'marci'])

/** Vertical picker portrait, the same art Dota's own hero grid uses. */
export function portraitUrl(slug: string): string {
  const base = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images'
  return NO_LEGACY_PORTRAIT.has(slug)
    ? `${base}/dota_react/heroes/crops/${slug}.png`
    : `${base}/heroes/${slug}_vert.jpg`
}

/**
 * The animated turntable of the hero's 3D model -- the same render dota2.com uses.
 * VP9 WebM, 1440x1440, on a pure black background (see components/HeroModel).
 */
export function renderUrl(slug: string): string {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${slug}.webm`
}

/** Icon for a pre-filled Dota ability. James's own uploads bypass this. */
export function abilityIconUrl(valveId: string): string {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${valveId}.png`
}

export function getHeroes(): Hero[] {
  return HEROES
}

export function getHero(slug: string): Hero | undefined {
  return HEROES.find((hero) => hero.slug === slug)
}

export function heroesByAttribute(attribute: Attribute): Hero[] {
  return HEROES.filter((hero) => hero.attribute === attribute)
}

/**
 * James's own nickname list. Only the 34 roster heroes he gave a nickname appear here;
 * the other 29 are findable by name alone.
 *
 * Nicknames that merely repeat the display name are left out on purpose -- "underlord",
 * "magnus" and "clockwerk" already match via the name, so listing them would add a row
 * that does nothing. Only shorthand the name can't produce is worth a line.
 */
const ALIASES: Record<string, string[]> = {
  shredder: ['timber'], // Timbersaw
  omniknight: ['omni'],
  tidehunter: ['tide'],
  chaos_knight: ['ck'],
  bristleback: ['bristle'],
  night_stalker: ['ns'],
  centaur: ['centaur'], // Centaur Warrunner
  rattletrap: ['clock'], // Clockwerk
  dragon_knight: ['dk'],
  juggernaut: ['jugg'],
  phantom_assassin: ['pa'],
  gyrocopter: ['gyro'],
  faceless_void: ['faceless'],
  nevermore: ['sf'], // Shadow Fiend
  ember_spirit: ['ember'],
  bloodseeker: ['bs', 'blood'],
  skywrath_mage: ['sky', 'skywrath'],
  winter_wyvern: ['wyvern'],
  leshrac: ['lesh'],
  crystal_maiden: ['cm', 'crystal'],
  queenofpain: ['qop'],
  necrolyte: ['necro'], // Necrophos
  obsidian_destroyer: ['od', 'outworld', 'outhousedecorator'],
  storm_spirit: ['ss'],
  venomancer: ['veno'],
  beastmaster: ['bm'],
  death_prophet: ['dp'],
  sand_king: ['sk'],
  snapfire: ['snap'],
  windrunner: ['wr', 'wind'], // Windranger
  void_spirit: ['vs'],
  pangolier: ['pango'],
  nyx_assassin: ['nyx'],
  batrider: ['bat'],
}

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

/** First letter of each word: "Queen of Pain" -> "qop". */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toLowerCase()

/**
 * How well a hero answers a query. Lower is better; null means no match.
 *
 * Ranking matters more than it looks: "sk" substring-matches chaosKnight, skywrath and
 * sandKing, and without scoring the roster order would surface Chaos Knight first. A
 * name or alias that *starts* with what you typed always beats a mid-word hit.
 */
export function scoreHero(hero: Hero, query: string): number | null {
  const q = normalise(query)
  if (!q) return 0

  const name = normalise(hero.name)
  const aliases = ALIASES[hero.slug] ?? []

  if (name === q || aliases.includes(q)) return 0
  if (aliases.some((alias) => alias.startsWith(q))) return 1
  if (name.startsWith(q)) return 2
  if (initials(hero.name).startsWith(q)) return 3
  // Start of any later word: "king" -> Sand King.
  if (hero.name.split(/\s+/).some((word) => normalise(word).startsWith(q))) return 4
  if (name.includes(q)) return 5
  return null
}

export function matchesQuery(hero: Hero, query: string): boolean {
  return scoreHero(hero, query) !== null
}

/** Matching heroes, best first, roster order preserved within a rank. */
export function searchHeroes(heroes: Hero[], query: string): Hero[] {
  return heroes
    .map((hero, index) => ({ hero, index, score: scoreHero(hero, query) }))
    .filter((entry): entry is { hero: Hero; index: number; score: number } => entry.score !== null)
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((entry) => entry.hero)
}
