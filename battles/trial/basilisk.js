// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/trial/basilisk.png", 'background');

// ===================
//hack PLAYER CAPABILITIES
// ===================

var swear_loyalty = "Swear loyalty";

if(STATS.get(STAT.Death) > 0){
  ABILITIES.unlock(ABILITY.Pray);
}

PLAYER_ACTIONS.add({
  name: ABILITY.Escape,
  outcome: BATTLETREE.LOSS,
  description: ["You try to go further back, but you trip and fall on the ground.",
                "The basilisk takes advantage of your weakness. It jumps at you and burrows its fangs in your neck. You barely have time to scream before your body falls lifeless on the cold ground."],
});

PLAYER_ACTIONS.add({
  name: ABILITY.CallHelp,
  outcome: BATTLETREE.LOSS,
  description: ["You shout, terrified, in hope that someone around will help.",
                "But nobody moves. Your voice echoes dreadfully through the maze of underground tunnels.",
                "The basilisk is upset by your voice. You angered it. It jumps at you and burrows his fangs in your arm. You can almost feel the poison coursing through your veins like a burning liquid before you lose consciousness."],
});

var swearLoyalty = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: swear_loyalty,
  outcome: BATTLETREE.WIN,
  description: ["$$Ren$: \"Goddess, If I make it, I pledge to serve You and do Your bidding. I'll be your arms and do whatever You demand. Just please let me live.\"",
                "Suddenly, an eerie light basks the room. The basilisk grows stiff and stops moving. The creature is dead."],
});

PLAYER_ACTIONS.add({
  name: ABILITY.Pray,
  description: ["You close your eyes and focus on your faith.",
                "$$Ren$: \"Goddess, please, if there was ever a time to show Yourself to me, it would be now.\"",
                "It may just be your imagination, but you have a feeling that something is different. Maybe the Goddess heeded your plea.<br />You get the vague impression that by picking the right position, you may yet dodge the next attack from the beast, and even survive it."],
  function: swearLoyalty,
  extra_function: function(){

    var attack = {
      attack_amplitude: 0.4,
      warning_time_s: 5.0,
      react_time_s: 3.0,
      variability: 0,
    };
    BATTLE.monster_actions.empty();
    BATTLE.monster_actions.add_textual("The Basilisk straightens up, ready to pounce at you. Adrenaline rushes through your body. A cold shiver runs down your spine. You can hear your frantic heartbeat in your eardrums. Time seems to be slowing down for a moment.", attack);
  }
});




// ===================
//hack MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The Basilisk hisses and spits.");
BATTLE.monster_actions.add_textual("The Basilisk gets ever closer, snapping its jaw, showing all too clearly its giant fangs.");

// ===================
//hack START
// ===================
BATTLE.operations.start("A Beastly Basilisk Blitzed on your Body.");
