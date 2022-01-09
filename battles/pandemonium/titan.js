// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/titan.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Sword_iron, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Persuade, 2);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Axe, 1);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 2);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 2);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 5, true);           // 50  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.GeniusProdigy);


// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 0.8,
  variability: 0.3, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Titan claims that you did something horrible. They're so persuasive that you begin to believe it yourself.", attack);
BATTLE.monster_actions.add_textual("The Titan insists that they saw you do a heinous act, and they have proof. It's impossible, or is it?", attack);
BATTLE.monster_actions.add_textual("The Titan informs you that a thing you thought was innocuous had terrible repercussions. And it's all your fault.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("pandemonium/titan"));
