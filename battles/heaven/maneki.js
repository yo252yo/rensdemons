// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/heaven/maneki.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Coin, 10);
BATTLE.operations.add_loot(ITEM.Sword_legend, 0.1);
BATTLE.operations.add_loot(ITEM.War_hammer, 0.1);
BATTLE.operations.add_loot(ITEM.Staff, 0.1);
BATTLE.operations.add_loot(ITEM.Wand, 0.1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Dagger, 1);                       // 50  WEAP

PLAYER_ACTIONS.win(ABILITY.Incinerate, 1);                // 1000 ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_venom, 1, true);           // 40  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);



// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 0.4,
  react_time_s: 0.4,
  variability: 0.99, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Maneki challenges you to a game of luck. Most outcomes will have you suffer, but there's a one in a million chance you might get extremely rich!", attack);
BATTLE.monster_actions.add_textual("The Maneki makes a bet with you. Heads, it becomes your ally. Tails, you suffer.", attack);
BATTLE.monster_actions.add_textual("The Maneki proposes a gamble. You think you see the flaw in the bargain and you have a winning strategy, so you accept. You were wrong.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("heaven/maneki"));
