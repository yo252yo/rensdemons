
PLAYER_ACTIONS.allow_flight(true);

PLAYER_ACTIONS.add({
  name: ABILITY.Pray,
  outcome: BATTLETREE.WIN,
  description: RANDOM.pick([
    "You send your thoughts to the Goddess, may She guide you on the right path.",
    "You close your eyes and invoke a short prayer before going back on your way."
  ]),
});

BATTLE.operations.start(SPECIALBATTLES._battle_extra_data);
