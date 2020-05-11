
var s = new StaticSprite("assets/snake.png", 'background');
s.container.style.position = "fixed";
new LevelObject(s, SCREEN.width() / 2 - 200, SCREEN.height() / 2);

// we need to die every choice, and after first death can escape death through the goddess

//attempts = 0;
var back_away = function() {
//  attempts ++;
//  if (attempts < 2) {
//   return ["Your attempt to slowly back away fails. The viper advances forward. Behind, the priests shout:",
//           "Priest: \"Come on, child! The trial must happen.\""];
//  } else {
  DISK.set("viper_defeat", true);
  BATTLE.monster_actions.prepare_loss("The snake takes advantage of your weakness. It jumps at you and burrows its fangs in your neck. You barely have time to scream before your body falls lifeless on the cold ground.");
  return ["You try to go further back, but you trip and fall on the ground."];
//  }
};
BATTLE.player_actions.add('Back away', back_away);

var call_help = function() {
  DISK.set("viper_defeat", true);
  BATTLE.monster_actions.prepare_loss("The viper is upset by your voice. You angered it. It jumps at you and burrows his fangs in your arm. You can almost feel the poison coarsing through your veins like a burning liquid before you lose consciousness.");
  return ["You shout, terrified, in hope that someone around will help.",
         "But nobody moves. The priests are observing the fight, completely detached. No doubt they've seen this play out countless times.",
         "The children around are trembling and exchanging frightened looks, too afraid for their own lives to do anything."];
};
BATTLE.player_actions.add('Call help', call_help);


var add_swear_loyalty = function() {
  var swear_loyalty = function () {
    BATTLE.monster_actions.prepare_win("Suddenly, an eerie light basks the room. The snake grows stiff and stops moving. The creature is dead.");
    return ["Ren: \"Goddess, If I make it, I pledge to serve You and do Your bidding. I'll be your arms and do whatever You demand. Just please let me live.\""];
  };
  BATTLE.player_actions.add('Swear loyalty', swear_loyalty);
}

var add_pray = function() {
  var pray = function() {
    add_swear_loyalty();
    BATTLE.player_actions.remove('Pray');
    return ["You close your eyes and focus on your faith.",
            "Ren: \"Goddess, please, if there was ever a time to show Yourself to me, it would be now.\""];
  };
  BATTLE.player_actions.add('Pray', pray);
}

if (DISK.get("viper_defeat")) {
  add_pray();
}

BATTLE.monster_actions.add_textual("The viper hisses and spits.");
BATTLE.monster_actions.add_textual("The viper slithers on the ground towards you.");
BATTLE.monster_actions.add_textual("The viper gets ever closer, snapping its jaw, showing all too clearly its giant fangs.");

BATTLE.operations.start("A vicious viper ventured into view.");
