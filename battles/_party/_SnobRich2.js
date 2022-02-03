
new CenteredMovingImage("assets/characters/party/SnobRich.png", 'background',32,48, 2);

AUDIO.music.characters.SnobRich();

INVENTORY.set("_followedBySnobRich", 0);

var lose_item = function(item){
  if(INVENTORY.count(item)){
    INVENTORY.increase(item, -1);
  }
}

var lose_loot = function(){
  lose_item(ITEM.Umbrella);
  lose_item(ITEM.SnobRichKey);
  lose_item(ITEM.Candle);
  lose_item(ITEM.Vase);
  lose_item(ITEM.RareWine);
  lose_item(ITEM.StuffedBearHead);
  lose_item(ITEM.MassiveGoldStatue);
  lose_item(ITEM.Berry);
  lose_item(ITEM.Seashell);
  lose_item(ITEM.Spoon);
  lose_item(ITEM.Sword_great);
  lose_item(ITEM.SilverGoblet);
  lose_item(ITEM.OldBook);
  lose_item(ITEM.Elixir_ice);
  lose_item(ITEM.PorcelainDoll);
}

var hereyougo = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Here you go",
  unlock: true,
  description: [
    `$$SnobRich$: "Thanks! Now let us be on our way and accrue even more profit with your skillful fingers!"`,
    "$$SnobRich$ joins your party!",
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    lose_loot();
    PARTY.add(PARTYMEMBERS.SnobRich);
  },
});

var hereyougo2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Give back",
  unlock: true,
  description: [
    `You give back everything you got from the manor.`,
    `$$SnobRich$: "Thanks. Too bad about your short sightedness. We could have been a great team. I wish you luck in your future endeavors."`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: lose_loot,
});

var noway = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "No way",
  unlock: true,
  description: [
    `$$SnobRich$: "What?! But this all belongs to me!"`,
    `$$Ren$: "Not anymore..."`,
    `$$SnobRich$ starts throwing a tantrum, but you can tell that she can't do you any serious harm. She's annoying to hear, though, so you decide to be on your way.`,
  ],
  outcome: BATTLETREE.WIN,
});

PLAYER_ACTIONS.add({
  name: `Huh... ok`,
  unlock: true,
  description: [
    `$$SnobRich$: "Splendid, I can already sense that we'll have a fruitful business collaboration, you and I. Now if you would kindly start by giving me back all my things, please?"`,
    ],
  function: function(){
    hereyougo("Huh... ok");
    noway("Huh... ok");
  },
});


PLAYER_ACTIONS.add({
  name: "I don't want to work for you",
  unlock: true,
  description: [
    `$$Ren$: "I don't want to work for you! You never even asked me how I felt about it!"`,
    `$$SnobRich$: "Of course, I assumed you'd be overjoyed at this prospect. Well, I can only suppose that your mysterious powers also come with severe mental impairment. You're going to regret passing on this offer. Just give me my things back and I'll be on my way."`,
    ],
  function: function(){
    BATTLE.player_actions.empty();
    hereyougo2("I don't want to work for you");
    noway("I don't want to work for you");
  },
});


// ===================
// =================== START
// ===================
BATTLE.operations.start([
  `$$SnobRich$: "Thanks for helping me get back all my things."`,
  `$$SnobRich$: "Your methods are unusual, but I cannot deny their efficiency."`,
  `$$SnobRich$: "I think you could be a valuable ally to help me rebuild my fortune."`,
]);
