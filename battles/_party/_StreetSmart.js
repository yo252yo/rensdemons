// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/villager0.png", 'background');

var g = INVENTORY.cash();

PLAYER_ACTIONS.add({
  name: "Give money",
  unlock: true,
  description: [`You promptly comply and give him all of your ${g} coins.`,
                `As promised, the thief takes flight as swiflty and quickly as he arrived, and you find yourself stunned and penniless, still struggling to piece together what happened in your foggy mind.`,
              ],
  outcome: BATTLETREE.ESCAPE,
  extra_function: function() {
    INVENTORY.decrease(ITEM.Coin, g);
  },
});


// ===================
// =================== START
// ===================
BATTLE.operations.start([
  "Your assaillant seems to be a young man dressed in leather. It's pretty clear that he spends a lot of time in nature. He jumped at you in total silence, with a feline agility, landing his sharp dagger under your throat. You're the only one who woke up. He whispers in your ear:",
  `$$StreetSmart$: "One wrong move and you're dead. Don't you dare make a sound. Just give me all of your money and everything will be fine. I don't want to have to hurt you."`,
]);
