// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/caves/crawler.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Stone, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 1);                        // 250  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 3);                  // 50  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL
PLAYER_ACTIONS.win(ITEM.Poison_darts, 6, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 3, true);             // 20  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 75  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);




// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.4, // Between 0 and 1
  warning_time_s: 1.1,
  react_time_s: 0.3,
  variability: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Crawler blends in with the rocks around. You cannot see it in the shadows until it's already on you.", attack);
BATTLE.monster_actions.add_textual("The Crawler dashes around you faster than your eyes. You can't see its assault coming.", attack);
BATTLE.monster_actions.add_textual("The Crawler disappears on the wall in front of you. It reemerges a few moments later right behind you.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Cunning Crawler Creeps in the Cavern.");
