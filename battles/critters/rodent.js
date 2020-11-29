// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/rodent.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.allow_flight();

PLAYER_ACTIONS.useless(ABILITY.Pray);
PLAYER_ACTIONS.useless(ITEM.Stick);
PLAYER_ACTIONS.useless(ITEM.Bone);

PLAYER_ACTIONS.win(ITEM.Fang, 1, true);
PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);
PLAYER_ACTIONS.win(ITEM.Bone, 1, true);

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 1.0,
  time_variation: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Rodent takes a bite off your leg. It strings. You hope it won't get infected.", attack);
BATTLE.monster_actions.add_textual("The Rodent scratches around, like it's looking for something.", attack);
BATTLE.monster_actions.add_textual("The Rodent shakes its whiskers. Maybe it's calling for help.", attack);

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Repulsive Rodent Rushed to your Rear.");
