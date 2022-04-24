// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('pandemonium/abaddon');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Elixir_chaos, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Sneak, 5);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_great, 1);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 3);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 3);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 4);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 5, true);           // 50  ALCH

PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);


// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("pandemonium/abaddon", {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 0.6,
  variability: 0.2, // 1 = 100%
});



// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("pandemonium/abaddon"));
