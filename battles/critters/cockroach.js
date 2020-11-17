// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/cockroach.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.can_flee();

PLAYER_ACTIONS.useless(ABILITY.Pray);
PLAYER_ACTIONS.useless(ITEM.Stick);
PLAYER_ACTIONS.useless(ITEM.Bone);

PLAYER_ACTIONS.win(ITEM.Fang, 2, true);
PLAYER_ACTIONS.win(ITEM.Stone, 3, true);
PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.05, // Between 0 and 1
  warning_time_s: 2.0,
  react_time_s: 1.0,
  time_variation: 0.1, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Cockroach runs between your legs.", attack);
BATTLE.monster_actions.add_textual("The Cockroach emits small chirping sound.", attack);
BATTLE.monster_actions.add_textual("The Cockroach runs around in circles.", attack);

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Crass Cockroach Crawled Creepily.");
