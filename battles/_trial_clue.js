
new CenteredImage("assets/battles/statue.png", 'background');

var inspect = "Inspect";

PLAYER_ACTIONS.add({
  name: ABILITY.Flee,
  outcome: BATTLETREE.ESCAPE,
  description: [],
  outcome_description:  RANDOM.pick([
    "You turn away, trying to put this memory behind you.",
    "You make your way back to your path.",
  ]),
});

PLAYER_ACTIONS.add({
  name: inspect,
  outcome: BATTLETREE.ESCAPE,
  description: [],
  outcome_description: "Looking closely, you can see something engraved in the rock.",
  extra_function: function(){
    BATTLETREE.unlock("_trial_exit", "Speak the secret word");
  }
});
BATTLETREE.unlock(BATTLE.get_current_battle(), inspect);


BATTLE.operations.start("You find yourself faced by a big statue of the Goddess. ");
