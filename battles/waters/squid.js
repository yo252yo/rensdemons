// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/squid.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 1,
  time_variation: 0.3, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Squid smashes you with one of its spiky tentacles.", attack);
BATTLE.monster_actions.add_textual("The Squid darts at you with a pointy tentacle that seems sharp enough to pierce any armor.", attack);
BATTLE.monster_actions.add_textual("The Squid overwhelms you with a barrage of hits from its strong tentacles.", attack);

// pierce, smash

// ===================
//hack START
// ===================
BATTLE.operations.start("A Slithering Squid Swam to Smother you.");

//todo
