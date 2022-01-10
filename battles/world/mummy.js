// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('world/mummy');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Linnens, 1);
BATTLE.operations.add_loot("", 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 3);                 // 100  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 1);                        // 100  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 2);                    // 150  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 4);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 2);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 150  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 4);                       // 75   WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 3);                        // 250  WEAP

PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 5    TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 1.5,
  variability: 0.05, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Mummy seizes your neck and starts choking you.", attack);
BATTLE.monster_actions.add_textual("The Mummy whips you with a loose bandages.", attack);
BATTLE.monster_actions.add_textual("The Mummy hits you with a slow but powerful punch.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("world/mummy"));
