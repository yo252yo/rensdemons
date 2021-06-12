// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/trial/arachnid.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CABAILITIES
// ===================


PLAYER_ACTIONS.useless(ABILITY.Pray);
PLAYER_ACTIONS.useless(ITEM.Stick);
PLAYER_ACTIONS.useless(ITEM.Bone);

PLAYER_ACTIONS.win(ITEM.Stone, 2, true);
PLAYER_ACTIONS.win(ITEM.Sword_wooden, 1);
PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);


// ===================
//hack MONSTER BEHAVIOR
// ===================


var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 3.0,
  react_time_s: 0.5,
  time_variation: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Arachnid crawls up your arm. The unsettling sensation of its fur against your skin makes you panic.", attack);
BATTLE.monster_actions.add_textual("The Arachnid bites you. Nothing too serious. Yet.", attack);
BATTLE.monster_actions.add_textual("The Arachnid's many legs burrow in your forearm. There's no dislodging their hooks.", attack);

// ===================
//hack START
// ===================
BATTLE.operations.start("An Aversive Arachnid Appears on your Arm.");
