// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/mermaid.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 0.5);
BATTLE.operations.add_loot(ITEM.Scale, 0.5);
BATTLE.operations.add_loot(ITEM.Seashell, 1);
BATTLE.operations.add_loot("", 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Persuade, 3);                  // 250  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 3);                         // 75  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 1);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 3);                  // 50  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 3);                   // 166  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 2   TOOL
PLAYER_ACTIONS.win(ITEM.Poison_darts, 4, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 3, true);            // 30  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 2, true);           // 50  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.BestFriend);
PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.GeniusProdigy);




// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.4, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 0.7,
  time_variation: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Mermaid winks at you and beckons you into her treacherous arms.", attack);
BATTLE.monster_actions.add_textual("The Mermaid sings a song that lulls your defenses.", attack);
BATTLE.monster_actions.add_textual("The Mermaid approaches you gently, but suddenly switches to grabbing your throat.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Magnificent Mermaid Mesmerizes you with Magnetism.");
