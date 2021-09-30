// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/hell/toad.png", 'background');
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

var attack = {
  attack_amplitude: 0.75, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 0.9,
  variability: 0.3, // 1 = 100%
};



BATTLE.monster_actions.add_textual("The Toad skin shifts between bright colors. Suddenly, it adopts a hue that cannot exist. Your mind breaks down.", attack);
BATTLE.monster_actions.add_textual("The Toad starts jumping around. The trajectory of the jumps is impossible in three dimensions. Your mind breaks down.", attack);
BATTLE.monster_actions.add_textual("The Toad croaks first normaly, but then switch to frequencies that cannot exist. Your brain is filled with impossible sounds. Your mind breaks down.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start("A Toxic Toad Taunts you by its Throbs.");
