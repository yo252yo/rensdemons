// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('waters/crab');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Scale, 1);
BATTLE.operations.add_loot("", 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);


PLAYER_ACTIONS.win(PARTYMEMBERS.BestFriend);
PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);
PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 3);                  // 100  ELEM
PLAYER_ACTIONS.win(ABILITY.Thunder, 2);                   // 150  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 150  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 200  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 1, true);           // 100  ALCH

PLAYER_ACTIONS.win(ITEM.Mace, 1);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP

PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 1.1,
  react_time_s: 0.5,
  variability: 0.2, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Crab pinches your arm with its dented claws.", attack);
BATTLE.monster_actions.add_textual("The Crab rushes at you, snapping its pincers towards your face.", attack);
BATTLE.monster_actions.add_textual("The Crab crawls towards you and pinches your leg.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("waters/crab"));
