// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('caves/scorpion');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Poison_darts, 0.5);
BATTLE.operations.add_loot(ITEM.Scale, 1);
BATTLE.operations.add_loot("", 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Sneak, 2);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 4);                 // 20  WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 5);                       // 50  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 2);                     // 150  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                  // 50  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 66  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 2);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 2   TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 2, true);            // 10  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_vine, 2, true);            // 30  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.BestFriend);
PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.win(PARTYMEMBERS.GeniusProdigy);




// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("caves/scorpion", {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 0.6,
  react_time_s: 0.4,
  variability: 0.6, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("caves/scorpion"));
