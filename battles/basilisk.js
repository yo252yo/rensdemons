// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/basilisk.png", 'background');
var battle_name = "basilisk";
var _PLAYER_ACTIONS = {};

// ===================
// =================== ABILITIES CALLBACKS
// ===================

var pray = "Pray";
var swear_loyalty = "Swear loyalty";

BATTLE.player_actions.add_losing_action({
  name: ABILITY.Flee,
  description: ["You try to go further back, but you trip and fall on the ground."],
  effect: "The basilisk takes advantage of your weakness. It jumps at you and burrows its fangs in your neck. You barely have time to scream before your body falls lifeless on the cold ground.",
  extra_function: function(){BATTLETREE.unlock(battle_name, pray);},
});

BATTLE.player_actions.add_losing_action({
  name: ABILITY.CallHelp,
  description: ["You shout, terrified, in hope that someone around will help.",
                "But nobody moves. Your voice echoes dreadfully through the maze of underground tunnels."],
  effect: "The basilisk is upset by your voice. You angered it. It jumps at you and burrows his fangs in your arm. You can almost feel the poison coarsing through your veins like a burning liquid before you lose consciousness.",
  extra_function: function(){BATTLETREE.unlock(battle_name, pray);},
});

var unlock_swear_loyalty = function() {
  BATTLE.player_actions.add_winning_action({
    name: swear_loyalty,
    description: ["Ren: \"Goddess, If I make it, I pledge to serve You and do Your bidding. I'll be your arms and do whatever You demand. Just please let me live.\""],
    effect: "Suddenly, an eerie light basks the room. The basilisk grows stiff and stops moving. The creature is dead.",
  });
};

BATTLE.player_actions.add({
  name: pray,
  description: ["You close your eyes and focus on your faith.",
                "Ren: \"Goddess, please, if there was ever a time to show Yourself to me, it would be now.\""],
  function: function() {
    BATTLETREE.unlock(battle_name, swear_loyalty, pray);
    unlock_swear_loyalty();
    BATTLE.player_actions.remove(pray);
  },
});


// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The basilisk hisses and spits.");
BATTLE.monster_actions.add_textual("The basilisk slithers on the ground towards you.");
BATTLE.monster_actions.add_textual("The basilisk gets ever closer, snapping its jaw, showing all too clearly its giant fangs.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Beastly Basilisk Blitzed on your Body.");
