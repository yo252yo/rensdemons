// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('encounters/purse');

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.add({
  name: "Ignore it",
  unlock: true,
  description: [
    "You ignore it and walk away.",
    `It turns out that the purse was an enchanted item. It is moved by your humility, and wishes to reward it.`,
    `The next time you look at your own purse, it feels unnaturally heavier. It seems that 5 Coins manifested out of thin air to grow your fortune.`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.increase(ITEM.Coin, 5);
  }
});

var amount = Math.min(INVENTORY.cash(), 30);
PLAYER_ACTIONS.add({
  name: "Pick it up",
  unlock: true,
  description: [
    "You pick up the purse and add it to your possession. You empty its content into your own purse and get excited when you notice it contains over 100 coins.",
    `The next time you look at your own purse, however, it feels unnaturally lighter. The gold you found on the floor was cursed. Not only did it disappear, but it looks like it took some of your own coins with it!`,
    `This little operation made you lose ${amount} Coins.`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.decrease(ITEM.Coin, amount);
  }
});


PLAYER_ACTIONS.add({
  name: "Look for owner",
  unlock: true,
  description: [
    "You look around for traces of its owner, but you cannot find anything. It's just a simple coin purse.",
    "You respectfully tuck it away in your bag, hoping to find a clue as to the whereabouts of its owner some day so that you can give the purse back.",
    "The next time you open your bag, you find that the peculiar purse disappeared. But your own purse seems somehow 20 coins richer.",
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.increase(ITEM.Coin, 20);
  }
});

PLAYER_ACTIONS.add({
  name: "Kick it",
  unlock: true,
  description: [
    "You give the suspicious purse a good kick. As you expected, it's not just a simple purse. But you didnt expect it to be cursed to the point it can defend itself. The magic item lays a jinx on you. You immediately have difficulty breathing, and before long you lay lifeless on the ground.",
  ],
  outcome: BATTLETREE.LOSS,
});

PLAYER_ACTIONS.add({
  name: "Pass",
  unlock: true,
  description: [
    "You decide to walk away from this peculiar finding.",
  ],
  outcome: BATTLETREE.WIN,
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("encounters/purse"));
