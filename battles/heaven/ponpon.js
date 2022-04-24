// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('heaven/ponpon');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Fur, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP

PLAYER_ACTIONS.win(ABILITY.Storm, 3);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Lull, 2);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 3);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 2, true);           // 50  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);



// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("heaven/ponpon", {
  attack_amplitude: 0.9, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 0.6,
  variability: 0.3, // 1 = 100%
});

// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("heaven/ponpon"));
