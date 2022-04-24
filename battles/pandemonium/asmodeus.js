// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('pandemonium/asmodeus');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Elixir_decay, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Persuade, 3);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_iron, 3);                   // 500  WEAP

PLAYER_ACTIONS.win(ABILITY.Incinerate, 2);                // 1000 ELEM

PLAYER_ACTIONS.win(ABILITY.Lull, 2);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 7, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 3, true);           // 75  ALCH

PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);


// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("pandemonium/asmodeus", {
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 0.5,
  variability: 0.5, // 1 = 100%
});



// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("pandemonium/asmodeus"));
