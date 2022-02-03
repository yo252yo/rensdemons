
//new CenteredMovingImage("assets/characters/party/SavageChild.png", 'background',32,48, 2);

AUDIO.music.characters.SavageChild();
PLAYER_ACTIONS.escape();

if(INVENTORY.count(ITEM.Meat)){
  PLAYER_ACTIONS.add({
    name: "Throw meat",
    unlock: true,
    description: [`You decide to leave meat on the ground. You are a bit puzzled by your own action, but you assume it will make sense later.`],
    outcome: BATTLETREE.WIN,
    extra_function: function() {
      INVENTORY.decrease(ITEM.Meat, 1);
      INVENTORY.increase("_donated_meat", 1);
    },
  });
} else {
  PLAYER_ACTIONS.add({
    name: "Throw meat",
    unlock: true,
    description: [`You want to throw meat on the ground, but you do not have any at the moment. You consider purchasing some, as you are quite intrigued by where this event could lead...`],
    outcome: BATTLETREE.WIN,
  });
}

// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `There doesn't seem to be anything there...`,
);
