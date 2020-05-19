var self = "viper";

// ===================
// =================== INITIALIZATION
// ===================
var s = new StaticSprite("assets/snake.png", 'background');
s.container.style.position = "fixed";
new LevelObject(s, SCREEN.width() / 2 - 200, SCREEN.height() / 2);

var EFFECTS = {};
var make_player_action = function(name){
  BATTLE.player_actions.add(name, EFFECTS[name]);
}

// ===================
// =================== ABILITIES CALLBACKS
// ===================

var pray = "Pray";
var back_away = "Back away";
var call_help = "Call help";
var swear_loyalty = "Swear loyalty";

EFFECTS[back_away] = function() {
  ACTIONS.unlock(self, pray);
  ACTIONS.develop(self, back_away, ACTIONS.LOSS);
  BATTLE.monster_actions.prepare_loss("The snake takes advantage of your weakness. It jumps at you and burrows its fangs in your neck. You barely have time to scream before your body falls lifeless on the cold ground.");
  return ["You try to go further back, but you trip and fall on the ground."];
};
make_player_action(back_away);

EFFECTS[call_help] = function() {
  ACTIONS.unlock(self, pray);
  ACTIONS.develop(self, call_help, ACTIONS.LOSS);
  BATTLE.monster_actions.prepare_loss("The viper is upset by your voice. You angered it. It jumps at you and burrows his fangs in your arm. You can almost feel the poison coarsing through your veins like a burning liquid before you lose consciousness.");
  return ["You shout, terrified, in hope that someone around will help.",
         "But nobody moves. The priests are observing the fight, completely detached. No doubt they've seen this play out countless times.",
         "The children around are trembling and exchanging frightened looks, too afraid for their own lives to do anything."];
};
make_player_action(call_help);

EFFECTS[swear_loyalty] = function () {
  ACTIONS.develop(self, swear_loyalty, ACTIONS.WIN);
  BATTLE.monster_actions.prepare_win("Suddenly, an eerie light basks the room. The snake grows stiff and stops moving. The creature is dead.");
  return ["Ren: \"Goddess, If I make it, I pledge to serve You and do Your bidding. I'll be your arms and do whatever You demand. Just please let me live.\""];
};
EFFECTS[pray] = function() {
  ACTIONS.unlock(self, swear_loyalty, pray);
  make_player_action(swear_loyalty);
  BATTLE.player_actions.remove(pray);
  return ["You close your eyes and focus on your faith.",
          "Ren: \"Goddess, please, if there was ever a time to show Yourself to me, it would be now.\""];
};
make_player_action(pray);


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
