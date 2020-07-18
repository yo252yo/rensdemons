
new CenteredImage("assets/battles/statue.png", 'background');

PLAYER_ACTIONS.add({
  name: ABILITY.Flee,
  description: RANDOM.pick([
    "You turn away, trying to put this memory behind you.",
    "You make your way back to your path.",
  ]),
  outcome: BATTLETREE.ESCAPE,
});


PLAYER_ACTIONS.add({
  name: "Speak the secret word",
  outcome: BATTLETREE.NOTHING,
  description: "You speak the secret word of the ancients you've seen engraved on the other statue.",
  extra_function: function() {
    BATTLE.monster_actions.make_unique(function(){});
    CURRENTLEVEL.setup("demoend");
  }
});


BATTLE.operations.start("You find yourself faced by a big wall, in front of which a statue of the Goddess stands. ");
