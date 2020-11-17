
PLAYER_ACTIONS.escape("Run away");
PLAYER_ACTIONS.escape("Avert eyes");

PLAYER_ACTIONS.useless(ABILITY.Pray);

var s = new CenteredMovingImage("assets/characters/" + BATTLE.pending_text + ".png", 'background', 32, 48);

var attack = {
  attack_amplitude: 0.01, // Between 0 and 1
  warning_time_s: 5,
  react_time_s: 5,
  time_variation: 0.01, // 1 = 100%
};
BATTLE.monster_actions.add_textual("The Viper slithers on the ground towards you.", attack);

BATTLE.operations.start("You find ");
