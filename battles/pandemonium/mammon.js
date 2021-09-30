// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/mammon.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Mace, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Intimidate, 2);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 5);                         // 75  WEAP

PLAYER_ACTIONS.win(ABILITY.Storm, 1);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 4, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);



// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 0.8,
  variability: 0.8, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Mammon tortures you by reminding you of everything you've ever wanted but could never have. You keep being disappointed.", attack);
BATTLE.monster_actions.add_textual("The Mammon makes you acutely aware that no matter what you do you will never be satisfied with what you have. You'll always want something more. You're doomed to remain lacking.", attack);
BATTLE.monster_actions.add_textual("The Mammon reminds you of all the things you held dear and have lost, or worst, forgotten. Everything is replaceable, even you.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start("A Macabre Mammon Mocks your Minuscule size.");
