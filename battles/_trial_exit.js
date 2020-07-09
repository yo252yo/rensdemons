
new CenteredImage("assets/battles/statue.png", 'background');

PLAYER_ACTIONS.add.escape({
  name: ABILITY.Flee,
  description: [],
  effect:  RANDOM.pick([
    "You turn away, trying to put this memory behind you.",
    "You make your way back to your path.",
  ]),
});


PLAYER_ACTIONS.add.useless({
  name: "Speak the secret word",
  description: ["You speak the secret word of the ancients you've seen engraved on the other statue."],
  extra_function: function() {
    BATTLE.monster_actions.make_unique(function(){});
    CURRENTLEVEL.setup("demoend");
  }
});


BATTLE.operations.start("You find yourself faced by a big wall, in front of which a statue of the Goddess stands. ");
