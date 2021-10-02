// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/hellhound.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Elixir_ice, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);



PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Axe, 2);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 4);                  // 50  ELEM

PLAYER_ACTIONS.win(ABILITY.Lull, 3);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 10, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 7, true);            // 30  ALCH

PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);



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
