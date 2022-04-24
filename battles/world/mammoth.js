// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('world/mammoth');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 1);
BATTLE.operations.add_loot(ITEM.Bone, 1);
BATTLE.operations.add_loot(ITEM.Fur, 0.3);


// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.kill_with_anything_over(700);

PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Spear, 1);                        // 250  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 2);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Fireball, 3);                  // 10  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 3);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Shrink, 1);                    // 66  SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 2);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Arrow, 8, true);                  // 2   TOOL


PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 50  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 75  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.GeniusProdigy);
PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);





// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("world/mammoth", {
  attack_amplitude: 0.95, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 1.3,
  variability: 0.1, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("world/mammoth"));
