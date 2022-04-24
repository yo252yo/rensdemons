// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('hell/devilfly');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Scale, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);



PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_iron, 2);                   // 500  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 3);                   // 83  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 2);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 5, true);             // 20  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);



// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("hell/devilfly", {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.6,
  react_time_s: 0.3,
  variability: 0.7, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("hell/devilfly"));
