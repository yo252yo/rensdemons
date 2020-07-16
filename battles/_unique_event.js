
PLAYER_ACTIONS.add({
  name: ABILITY.Flee,
  outcome: BATTLETREE.WIN,
  description: [],
  outcome_description: RANDOM.pick([
    "You turn away, trying to put this memory behind you.",
    "You make your way back to your path.",
  ]),
});

PLAYER_ACTIONS.add({
  name: ABILITY.Pray,
  outcome: BATTLETREE.WIN,
  description: [],
  outcome_description: RANDOM.pick([
    "You send your thoughts to the Goddess, may She guide you on the right path.",
    "You close your eyes and invoke a short prayer before going back on your way."
  ]),
});

BATTLE.operations.start(BATTLE.pending_text);
