
PLAYER_ACTIONS.add.escape({
  name: ABILITY.Flee,
  description: [],
  effect:  RANDOM.pick([
    "You turn away, trying to put this memory behind you.",
    "You make your way back to your path.",
  ]),
});

BATTLE.operations.start("You find yourself faced by a big wall, in front of which a statue of the Goddess stands. ");
