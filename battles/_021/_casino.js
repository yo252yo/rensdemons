
new CenteredBattleImage("assets/battles/encounters/casino.png", 'background');
var gen = new Generator(INVENTORY.count("_casino_seed") || DICTIONARY.get("world_seed"));
var bet = 0;

PLAYER_ACTIONS.add({
  name: "Inquire",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `You make your way to someone you assume to be part of the organization team running this joint and you ask.`,
    `$$Ren$: "Excuse me, what kind of randomness do you use here?"`,
    `Employee: "Well, as you can see, cards and dice. There's occasional fights and races of animals or humans, too..."`,
    `$$Ren$: "Sure, but is it true randomness or pseudo randomness?"`,
    `Employee: "What do you mean?"`,
    `$$Ren$: "If I were to come back another time, would I get the same results as this time? Does the same action twice get the same outcome? Are the dice roll deterministic? How good is your randomness generator?"`,
    `Employee: "I'm sorry, I'm not sure I understand. Are you accusing us of cheating?"`,
    `$$Ren$: "Sorry, nevermind."`,
    ],
});

var unlock_escape = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: ABILITY.Escape,
  description: RANDOM.pick([`You make your way out of the building, with the ${bet} coins of your bet.`]),
  outcome: BATTLETREE.ESCAPE,
  extra_function: function(){
    if (bet){
      INVENTORY.increase(ITEM.Coin, bet);
    }
  }
});

var bets_submenu = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Bet coins",
  unlock: true,
  description: [
    `You decide to increase your bets.`,
    ],
  function: function(){
    BATTLE.player_actions.empty();
    (make_bet_function(0))("Bet coins");
    (make_bet_function(1))("Bet coins");
    (make_bet_function(2))("Bet coins");
    (make_bet_function(5))("Bet coins");
    (make_bet_function(10))("Bet coins");
    (make_bet_function(25))("Bet coins");
  }
});

var whitdraw_bets = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Cash out",
  unlock: true,
  description: [
    `You decide to withdraw your bets.`,
    ],
  function: function(){
    if (bet){
      INVENTORY.increase(ITEM.Coin, bet);
      bet = 0;
    }
    main_menu();
  }
});


var make_bet_function = function(sum) {
  console.log(INVENTORY.cash());
  if (INVENTORY.cash() < sum){
    return function(){};
  }
  return PLAYER_ACTIONS.function.unlock_replacing_action({
    name: `Bet ${sum} coins`,
    unlock: true,
    description: [
      `You bet ${sum} extra coins. Your total bet is now ${sum+bet}.`,
    ],
    function: function() {
      bet += sum;
      INVENTORY.decrease(ITEM.Coin, sum);
      main_menu();
    }
  });
}


var main_menu = function(){
  BATTLE.player_actions.empty();
  BATTLE.monster_actions.empty();
  unlock_escape();
  bets_submenu();
  if(bet){
    whitdraw_bets();
  }
  BATTLE.monster_actions.add_textual(`You currently have ${INVENTORY.cash()} coins in your pocket and ${bet} coins locked in bets.`);
  var g = gen.get();
  INVENTORY.set("_casino_seed", g);
  gen = new Generator(g);
}

main_menu();
BATTLE.operations.start([
  "The building houses what appears to be a casino. The atmosphere is chaotic. Patrons are betting loudly against each others in heated battles of cards or dice. A few ruined gamblers are sobbing in a corner.",
  `$$Ren$: "Of course, there is a casino..."`,
]);
