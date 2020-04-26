
new LevelObject(new StaticSprite("assets/snake.png", 'background'), SCREEN.width() / 2 - 200, SCREEN.height() / 2);



attempts = 0;
BATTLE.player_actions['Back away'] = function() {
  attempts ++;
  if (attempts < 2) {
   return ["Your attempt to slowly back away fails. The viper advances forward. Behind, the priests shout:",
           "Priest: \"Come on, child! The trial must happen.\""];
  } else {
    BATTLE.prepare_doom("The snake takes advantage of your weakness. It jumps at you and burrows its fangs in your neck. You barely have time to scream before your body falls lifeless on the cold ground.");
    return ["You try to go further back, but you trip and fall on the ground."];
  }
};
BATTLE.player_actions['Call help'] = function() {
  delete BATTLE.player_actions['Call help'];
   return ["You shout, terrified, in hope that someone around will help.",
           "But nobody moves. The priests are observing the fight, completely detached. No doubt they've seen this play out countless times.",
           "The children around are trembling and exchanging frightened looks, too afraid for their own lives to do anything."];
};

BATTLE.player_actions['Pray'] = function() {
  BATTLE.player_actions['Swear loyalty'] = function (){
    //....
  };
  delete BATTLE.player_actions['Pray'];
  return ["You close your eyes and focus on your faith.",
          "Ren: \"Goddess, please, if there was ever a time to show Yourself to me, it would be now.\""];
};

BATTLE.monster_actions.push(
 function() { BATTLE.monster_turn("The viper hisses and spits."); },
 function() { BATTLE.monster_turn("The viper gets ever closer, snapping its jaw, showing all too clearly its giant fangs."); }
);

BATTLE.start("A vicious viper ventured into view.");
