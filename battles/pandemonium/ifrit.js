// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('pandemonium/ifrit');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Elixir_fire, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP

PLAYER_ACTIONS.win(ABILITY.Storm, 3);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 5);                    // 66  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 8, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 4, true);             // 20  ALCH

PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);

// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("pandemonium/ifrit", {
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 0.4,
  variability: 0.9, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("pandemonium/ifrit"));
