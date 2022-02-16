
AUDIO.music.levels.casino();

new CenteredBattleImage("assets/battles/encounters/casino.png", 'background');
var gen = new Generator(INVENTORY.count("_casino_seed") || DICTIONARY.get("world_seed"));
var bet = 0;

var record_generator = function(){
  var g = gen.get();
  INVENTORY.set("_casino_seed", g);
  gen = new Generator(g);
}

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
    (make_bet_function(0))();
    (make_bet_function(1))();
    (make_bet_function(2))();
    (make_bet_function(5))();
    (make_bet_function(10))();
    (make_bet_function(25))();
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
      if(sum){
        bet += sum;
        INVENTORY.decrease(ITEM.Coin, sum);
      }
      main_menu();
    }
  });
}

var make_game_function = function(name, payout, descript) {
  var description = descript;
  if (payout > 0) {
  description = description.concat(RANDOM.pick([
    ["You won!"],
    [`$$BestFriend$: "You won, $$Ren$!"`, `$$Ren$: "I didn't do anything, the randomness generator was just in our favor."`],
    [`$$BestFriend$: "Praised be the Goddess!"`],
    [`$$BestFriend$: "Yay! Did you know this would happen?"`],
  ]));
  } else {
    description = description.concat(RANDOM.pick([
      ["You lost."],
      [`$$Ren$: "Damn randomness generator, it wasn't very helpful!"`, `$$BestFriend$: "What are you talking about?"`],
      [`$$BestFriend$: "Has the Goddess abandoned us?"`],
      [`$$BestFriend$: "You lost..."`, `$$Ren$: "It's not my fault! It's the randomness generator!"`, `$$BestFriend$: "The what?"`, `$$Ren$: "The part of reality that decides the outcomes of chance games. One of the many powers of the Goddess, if you will."`],
      [`$$BestFriend$: "But... I thought you could see the future!"`, `$$Ren$: "It's more complicated than that..."`],
    ]));
  }


  return PLAYER_ACTIONS.function.unlock_replacing_action({
    name: `${name}`,
    unlock: true,
    description: description,
    function: function() {
      bet = Math.ceil(bet * payout);
      main_menu();
    }
  });
}

var game_coin = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Coin toss (x1.5 payout)",
  unlock: true,
  description: [
    `You decide to play a game of coin toss, the payout of which is x1.5. You now need to place your bet.`,
    ],
  function: function(){
    BATTLE.player_actions.empty();
    var is_head = gen.get() < 0.5;
    record_generator();
    var descript = ["You watch intensely, praying for your favored outcome, as the coin soars and spins through the air.",
      `The coin lands on ` + (is_head ? "heads." : "tails.")
      ];
    (make_game_function("Call heads", is_head ? 1.5 : 0, descript))();
    (make_game_function("Call tails", is_head ? 0 : 1.5, descript))();
  }
});

var game_dice = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Dice roll (x3 payout)",
  unlock: true,
  description: [
    `You decide to play with dice. The payout is x3 if you land on the right number. You now need to place your bet.`,
    ],
  function: function(){
    BATTLE.player_actions.empty();
    var roll = 1 + gen.int(6);
    record_generator();
    var descript = [
      "You roll the dice and watch it swirl hesitantly between its six faces.",
      `Finally, it lands on ${roll}.`
      ];
    (make_game_function("Call 1", roll == 1 ? 3 : 0, descript))();
    (make_game_function("Call 2", roll == 2 ? 3 : 0, descript))();
    (make_game_function("Call 3", roll == 3 ? 3 : 0, descript))();
    (make_game_function("Call 4", roll == 4 ? 3 : 0, descript))();
    (make_game_function("Call 5", roll == 5 ? 3 : 0, descript))();
    (make_game_function("Call 6", roll == 6 ? 3 : 0, descript))();
  }
});

var win_agiliy = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Reward",
  unlock: true,
  description: [
    `You successfully dodged the knife.`,
    ],
  function: function(){
    bet = Math.ceil(bet * 10);
    main_menu();
  }
});

var game_agility = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Agility challenge (x10 payout)",
  unlock: true,
  description: [
    `The rules of this game are pretty simple. They throw a knife at you. If you can dodge it, you win. It's rare to see people put their lives on the line, so the crowd is going crazy when you accept to do it. You brace yourself for the impact...`,
    ],
  function: function(){
    BATTLE.monster_actions.empty();
    var attack = {
      attack_amplitude: 0.9, // Between 0 and 1
      warning_time_s: 0.1,
      react_time_s: 0.3,
      variability: 0.01, // 1 = 100%
    };
    BATTLE.monster_actions.add_textual(`The knife pierces through the air towards your face.`, attack);
    BATTLE.player_actions.empty();
    win_agiliy();
  }
});



var main_menu = function(){
  BATTLE.player_actions.empty();
  BATTLE.monster_actions.empty();
  unlock_escape();
  bets_submenu();
  if(bet){
    game_coin();
    game_dice();
    game_agility();
    whitdraw_bets();
  }
  BATTLE.monster_actions.add_textual(`You currently have ${INVENTORY.cash()} coins in your pocket and ${bet} coins locked in bets.`);
}

main_menu();
BATTLE.operations.start([
  "The building houses what appears to be a casino. The atmosphere is chaotic. Patrons are betting loudly against each others in heated battles of cards or dice. A few ruined gamblers are sobbing in a corner.",
  `$$Ren$: "Of course, there is a casino..."`,
  `$$Ren$: "It seems that you can't go anywhere without running into some kind of gambling."`,
  `Nobody around you seems to mind that you are children. The staff is encouraging you to take part in the games in very overbearing ways.`,
]);
