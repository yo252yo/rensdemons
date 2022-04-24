// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('hell/sandworm');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Scale, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);



PLAYER_ACTIONS.win(ABILITY.Sneak, 4);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Axe, 1);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Lull, 3);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 9, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 3, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);


// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("hell/sandworm", {
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.4,
  react_time_s: 0.5,
  variability: 0.8, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("hell/sandworm"));
