// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/anemone.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.useless(ABILITY.Pray);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 1.3,
  time_variation: 0.6, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Anemone extends its giant squirmy tentacle in your direction.", attack);
BATTLE.monster_actions.add_textual("The Anemone spreads out a cloud of dark liquid, you better avoid it.", attack);
BATTLE.monster_actions.add_textual("The Anemone spits balls of a venomous goo.", attack);


// ===================
//hack START
// ===================
BATTLE.operations.start("An Angry Anemone Articulates its Appendage.");

//todo
