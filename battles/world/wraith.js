// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('world/wraith');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);

PLAYER_ACTIONS.win(ABILITY.Thunder, 2);                   // 150  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 200  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 4);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 4);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 1);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 1, true);           // 100  ALCH

PLAYER_ACTIONS.win(ITEM.Mace, 4);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 3);                        // 250  WEAP

PLAYER_ACTIONS.win(ITEM.Rope, 3);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 1.3,
  variability: 0.2, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Wraith howls at the sky, and the air around trembles.", attack);
BATTLE.monster_actions.add_textual("The Wraith curses you and fills your brain with the cacophony of hundreds of tortured souls screaming for relief.", attack);
BATTLE.monster_actions.add_textual("The Wraith speaks with a deep voice, though you cannot see its mouth. It is long forgotten words invoking a malediction on you.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("world/wraith"));
