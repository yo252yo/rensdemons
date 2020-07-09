
new CenteredImage("assets/battles/statue.png", 'background');

var inspect = "Inspect";

PLAYER_ACTIONS.add.escape({
  name: ABILITY.Flee,
  description: [],
  effect:  RANDOM.pick([
    "You turn away, trying to put this memory behind you.",
    "You make your way back to your path.",
  ]),
});

PLAYER_ACTIONS.add.escape({
  name: inspect,
  description: [],
  effect: "Looking closely, you can see something engraved in the rock.",
  extra_function: function(){
    BATTLETREE.unlock("_trial_exit", "Speak the secret word");
  }
});
BATTLETREE.unlock(BATTLE.get_current_battle(), inspect);


BATTLE.operations.start("You find yourself faced by a big statue of the Goddess. ");
