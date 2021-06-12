var common = [
  "After protecting the old document with leather and magic, you all take a careful look at it. Although the ink has faded and many pages are torn, there is enough left to make rough sense of it. The language is undecipherable, but there are many schematics painting a pretty clear picture of an old technology long forgotten, and how to use it to get rid of an enemy. This is definitely going to be useful.",
  `You obtain the ${ITEM.AncientArmamentAdvisor}.`];
PLAYER_ACTIONS.add({
  name: PARTYMEMBERS.BestFriend,
  description: [
    "You ask $$BestFriend$ to try and get the object for you. With much delicacy and care, $$BestFriend$ extirpate the old book from its vegetal cocoon.",
  ].concat(common),
  outcome: BATTLETREE.WIN,
  give_item: ITEM.AncientArmamentAdvisor,
});

PLAYER_ACTIONS.add({
  name: "Dig carefully",
  description: [
    "You take the greatest care you can as you delicately try to extirpate the old book from its vegetal cocoon.",
  ].concat(common),
  outcome: BATTLETREE.WIN,
  give_item: ITEM.AncientArmamentAdvisor,
});

PLAYER_ACTIONS.add({
  name: "Dig",
  unlock: true,
  description: "You dig around the roots. Your fingers encounter some sort of books, but the centuries and elements have left it very frail. Your innatentive grip finishes to destroy it to dust. It must have been important, because you will continue to err in the forest for days without ever finding the ancient artifact.",
  outcome: BATTLETREE.LOSS,
  extra_function: function(){
    ABILITIES.unlock("Dig carefully");
  }
});

PLAYER_ACTIONS.add({
  name: "Examine",
  unlock: true,
  description: "Watching carefully, you can distinguish some sort of worn out book tied in the middle of the vegetation. Time has not been kind to it, and it seems to be on the brink of disintegration.",
  outcome: BATTLETREE.NOTHING,
  function: function(){
    ABILITIES.unlock("Dig carefully");
  }
});

PLAYER_ACTIONS.allow_flight(true);
PLAYER_ACTIONS.lose(ITEM.Elixir_fire, "It seems that you burned down an important object. You will continue to err in the forest for days without ever finding the ancient artifact.");

BATTLE.operations.start("You notice a suspicious irregularity in the roots of a tree.");
