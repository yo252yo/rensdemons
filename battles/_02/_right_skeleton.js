
PLAYER_ACTIONS.allow_flight(true);
PLAYER_ACTIONS.useless(ABILITY.Pray);
PLAYER_ACTIONS.escape("Avert eyes");


PLAYER_ACTIONS.add({
  name: "Ponder",
  unlock: true,
  description: "You wonder what this poor soul was doing in this wilderness. Probably searching for the same shelter than you are. Except that they didn't have the Goddess to help them on their way.",
  outcome: BATTLETREE.NOTHING,
});

PLAYER_ACTIONS.add({
  name: "Search",
  unlock: true,
  description: "You search through the bones for anything useful. In the middle of the dust and bones, you find a little shiny object. It's a key, probably for the shelter!",
  outcome: BATTLETREE.WIN,
  give_item: ITEM.ShelterKey,
});

BATTLE.operations.start("You find the remains of a long forgotten traveler. The time of their demise is long past. All that remains are bones, scattered by scavenger beasts, and a few torn pieces of cloth.");
