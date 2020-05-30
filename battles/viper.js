// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/viper.png", 'background');
var battle_name = "viper";
var _PLAYER_ACTIONS = {};

// ===================
// =================== ABILITIES CALLBACKS
// ===================

var pray = "Pray";
var back_away = "Back away";
var call_help = "Call help";
var swear_loyalty = "Swear loyalty";

_PLAYER_ACTIONS[back_away] = function() {
  ACTIONS.unlock(battle_name, pray);
  ACTIONS.develop(battle_name, back_away, ACTIONS.LOSS);
  BATTLE.monster_actions.prepare_loss("The snake takes advantage of your weakness. It jumps at you and burrows its fangs in your neck. You barely have time to scream before your body falls lifeless on the cold ground.");
  return ["You try to go further back, but you trip and fall on the ground."];
};

_PLAYER_ACTIONS[call_help] = function() {
  ACTIONS.unlock(battle_name, pray);
  ACTIONS.develop(battle_name, call_help, ACTIONS.LOSS);
  BATTLE.monster_actions.prepare_loss("The viper is upset by your voice. You angered it. It jumps at you and burrows his fangs in your arm. You can almost feel the poison coarsing through your veins like a burning liquid before you lose consciousness.");
  return ["You shout, terrified, in hope that someone around will help.",
         "But nobody moves. The priests are observing the fight, completely detached. No doubt they've seen this play out countless times.",
         "The children around are trembling and exchanging frightened looks, too afraid for their own lives to do anything."];
};

var swear_loyalty_function = function () {
  ACTIONS.develop(battle_name, swear_loyalty, ACTIONS.WIN);
  BATTLE.monster_actions.prepare_win("Suddenly, an eerie light basks the room. The snake grows stiff and stops moving. The creature is dead.");
  return ["Ren: \"Goddess, If I make it, I pledge to serve You and do Your bidding. I'll be your arms and do whatever You demand. Just please let me live.\""];
};

_PLAYER_ACTIONS[pray] = function() {
  ACTIONS.unlock(battle_name, swear_loyalty, pray);
  BATTLE.player_actions.add(swear_loyalty, swear_loyalty_function);
  BATTLE.player_actions.remove(pray);

  return ["You close your eyes and focus on your faith.",
          "Ren: \"Goddess, please, if there was ever a time to show Yourself to me, it would be now.\""];
};

BATTLE.player_actions.register_map(_PLAYER_ACTIONS);

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The viper hisses and spits.");
BATTLE.monster_actions.add_textual("The viper slithers on the ground towards you.");
BATTLE.monster_actions.add_textual("The viper gets ever closer, snapping its jaw, showing all too clearly its giant fangs.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A vicious viper ventured into view.");
