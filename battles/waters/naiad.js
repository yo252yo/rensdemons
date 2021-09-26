// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/naiad.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Stick, 0.5);
BATTLE.operations.add_loot(ITEM.Meat, 0.5);
BATTLE.operations.add_loot(ITEM.Seashell, 1);
BATTLE.operations.add_loot("", 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 5);                 // 20  WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 2);                       // 50  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 2);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 66  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 7, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 4, true);             // 20  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);




// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 0.7,
  react_time_s: 0.5,
  time_variation: 0.2, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Naiad slaps you with her tentacles.", attack);
BATTLE.monster_actions.add_textual("The Naiad's slimy appendages expand and hit you.", attack);
BATTLE.monster_actions.add_textual("The Naiad waves her rod and casts a choking spell on you.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Nautical Naiad Nags you Noxiously.");
