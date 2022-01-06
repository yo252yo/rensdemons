
new CenteredMovingImage("assets/characters/party/SavageChild.png", 'background',32,48, 2);

AUDIO.music.characters.SavageChild();
PLAYER_ACTIONS.escape();

if(INVENTORY.count(ITEM.Meat)){
  PLAYER_ACTIONS.add({
    name: "Give meat",
    unlock: true,
    description: [
      `You hand over some meat to the creature.`,
      `It doesn't move at first, but after a while it finally approaches you with wary steps.`,
      `It appears to be a human girl. She is covered with mud and dried blood. She snatches the meat away from your hand between her teeth, and immediately jumps away in the trees.`,
    ],
    outcome: BATTLETREE.WIN,
    extra_function: function() {
      INVENTORY.increase(ITEM.Meat, -1);
      INVENTORY.increase("_donated_meat", 1);
    },
  });

  PLAYER_ACTIONS.add({
    name: "Throw meat",
    unlock: true,
    description: [
      `You throw some meat over to the creature.`,
      `It devours what you gave it and darts away before you could approach it. You feel like you've wasted a good piece of meat.`
    ],
    outcome: BATTLETREE.ESCAPE,
    extra_function: function() {
      INVENTORY.increase(ITEM.Meat, -1);
    },
  });

  PLAYER_ACTIONS.add({
    name: "Bait with meat",
    unlock: true,
    description: [
      `You wave some meat around to attract the creature.`,
      `Maybe it somehow picks up on your intention to not actually give away the meat? The creature gauges you a few moments, then goes on on its way.`
    ],
    outcome: BATTLETREE.ESCAPE,
  });
} else {
  PLAYER_ACTIONS.add({
    name: "Give meat",
    unlock: true,
    description: [`You want to give the creature some meat, but you don't have any on you. By the time you're done looking through your inventory, the mysterious creature is gone. You curse yourself and note that you need to come back with more meat.`],
    outcome: BATTLETREE.WIN,
  });
}



PLAYER_ACTIONS.add({
  name: "Call out",
  unlock: true,
  description: [`You call out to what you believe to be a person. Human or not, the creature is spooked by your voice and runs away in the forest.`],
  outcome: BATTLETREE.ESCAPE,
});

PLAYER_ACTIONS.add({
  name: "Observe",
  unlock: true,
  description: [`You do not do anything and silently observe the creature. You believe it looks like... a small human girl? But before you can confirm what you think you saw, the target of your observation has disappeared in a bush.`],
  outcome: BATTLETREE.ESCAPE,
});

PLAYER_ACTIONS.add({
  name: "Approach",
  unlock: true,
  description: [`You carefully approach the newcomer, avoiding any sudden motion. As soon as the creature notices your movement, it darts away jumping from branch to branch.`],
  outcome: BATTLETREE.ESCAPE,
});



// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `You think you see a silhouette from the corner of your eye...`,
);
