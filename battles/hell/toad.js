// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('hell/toad');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Goo, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 4);                         // 75  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 6);                  // 50  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 2);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 3, true);            // 30  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);


// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("hell/toad", {
  attack_amplitude: 0.75, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 0.9,
  variability: 0.3, // 1 = 100%
});



// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("hell/toad"));
