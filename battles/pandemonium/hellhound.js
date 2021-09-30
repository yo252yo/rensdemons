// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/hellhound.png", 'background');
PLAYER_ACTIONS.allow_flight();


/*TODO T3 loots
BATTLE.operations.add_loot(ITEM.Elixir_fire, 0.5);
BATTLE.operations.add_loot("", 2);
*/


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);

/*TODO T3 defense
PLAYER_ACTIONS.win(ABILITY.Persuade, 3);                  // 250  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_iron, 2);                 // 20  WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 50  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 1);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 5, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_venom, 3, true);           // 40  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);
*/




// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.6,
  react_time_s: 0.2,
  variability: 0.5, // 1 = 100%
};



BATTLE.monster_actions.add_textual("The Hellhound offers to let you go if you can answer its riddle. You think about it for a while, but it's above your level.", attack);
BATTLE.monster_actions.add_textual("The Hellhound offers to let you go if you can outrun it. You raise to the challenge, but it is just much faster.", attack);
BATTLE.monster_actions.add_textual("The Hellhound offers to let you go if you can win a stare contest. You fight valiantly but its spirit is stronger.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start("A Hulky Hellhound lets out a Hollow Howl.");
