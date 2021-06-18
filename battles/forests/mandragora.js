// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/mandragora.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CABAILITIES
// ===================

PLAYER_ACTIONS.useless(ABILITY.Pray);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.8,
  time_variation: 0.8, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Mandragora slaps you with one of its thin flexible roots.", attack);
BATTLE.monster_actions.add_textual("The Mandragora unleashes on you a deluge of whips from its roots.", attack);
BATTLE.monster_actions.add_textual("The Mandragora tries to immobilize you by wrapping a root around you.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Malicious Mandragora Manifests its Monstrosity.");

//todo
