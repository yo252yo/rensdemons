// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('waters/naiad');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Stick, 0.5);
BATTLE.operations.add_loot(ITEM.Meat, 0.5);
BATTLE.operations.add_loot(ITEM.Seashell, 1);
BATTLE.operations.add_loot("", 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 5);                 // 20  WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 2);                       // 50  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 2);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 66  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 7, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 4, true);             // 20  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.BestFriend);




// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("waters/naiad", {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 0.7,
  react_time_s: 0.5,
  variability: 0.2, // 1 = 100%
});



// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("waters/naiad"));
