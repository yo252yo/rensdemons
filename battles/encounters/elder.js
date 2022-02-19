// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('encounters/elder');

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.add({
  name: "Slay",
  unlock: true,
  description: RANDOM.pick([
    "You judge that this encounter is rather suspicious. An eldery woman in the middle of the wilderness? It must be a trap, some sort of illusion! You proactively seize your weapon and slay whatever demon is trying to trick you before it gets the chance to attack.",
  ]),
  outcome: BATTLETREE.WIN,
});


PLAYER_ACTIONS.add({
  name: "Avoid",
  unlock: true,
  description: RANDOM.pick([
    "You think it is rather strange to find an eldery lady in the middle of nowhere. You decide to avoid any risk and walk around the silhouette. You have no trouble distancing it.",
  ]),
  outcome: BATTLETREE.ESCAPE,
});

PLAYER_ACTIONS.add({
  name: "Welcome",
  unlock: true,
  description: RANDOM.pick([
    "The elderly woman approaches you. You greet her with a warm smile.",
    `She explains that she noticed you were the Promised Child, and wanted to help you on your quest. She gives you a potion of her making. It is a ${ITEM.Elixir_vine}.`,
  ]),
  outcome: BATTLETREE.WIN,
  give_item:ITEM.Elixir_vine,
});

PLAYER_ACTIONS.add({
  name: "Receive",
  unlock: true,
  description: RANDOM.pick([
    "An old woman comes towards you? Naturally she wants to give you things! You're the Promised Child, after all.",
    `She finds your expectant pose annoying, but she cannot deny that she came all the way here to help the Promised Child. Bitterly, she gives you a ${ITEM.Elixir_ice}.`,
  ]),
  outcome: BATTLETREE.WIN,
  give_item:ITEM.Elixir_ice,
});


PLAYER_ACTIONS.add({
  name: "Refuse",
  unlock: true,
  description: RANDOM.pick([
    "An old woman came to greet the Promised Child. She offers you as a present a potion of her making. You politely refuse.",
    `She praises your humility but insists that she came all this way to give you a present. Faced with her stubbordness, you end up caving, and receiving a ${ITEM.Elixir_decay}.`,
  ]),
  outcome: BATTLETREE.WIN,
  give_item:ITEM.Elixir_decay,
});



// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("encounters/elder"));
