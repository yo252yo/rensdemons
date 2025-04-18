// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('caves/slime');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Goo, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.kill_with_anything_over(700);

PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 2);                 // 20  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_iron, 1);                   // 500  WEAP

PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 250  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 66  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 2);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 7, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 2);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 50  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);
PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);
PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);


// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("caves/slime", {
  attack_amplitude: 0.4, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 0.9,
  variability: 0.5, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("caves/slime"));
