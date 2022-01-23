
new CenteredMovingImage("assets/characters/party/FemmeFatale.png", 'background',32,48, 2);

AUDIO.music.characters.FemmeFatale();
PLAYER_ACTIONS.escape();

var scoreitem = "_ff_score";

var confront2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Anticipate`,
  unlock: true,
  description: [
    `$$Ren$: "Yes, and I also know you're going to tell me that it's just what people want to hear..."`,
    `$$FemmeFatale$ seems slightly surprised by your foresight. So is $$BestFriend$.`,
    `$$FemmeFatale$: "Yes, I was. Because it is."`,
    `$$Ren$: "Why does everyone keep saying the same thing and reacting in the exact same way?"`,
    `$$FemmeFatale$: "Tell me about it... I feel like most of my clients are simple automatons. They all behave the same way, say the same lines, want the same thing... You're different, aren't you?"`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.increase("_FemmeFataleTokens");
  }
});

var confront = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Explain`,
  unlock: true,
  description: [
    `$$Ren$: "Well, you always say the same thing!"`,
    `$$FemmeFatale$: "That's just what people want to hear!"`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    if (INVENTORY.count("_FemmeFataleTokens") <4){
      INVENTORY.increase("_FemmeFataleTokens");
    }
  }
});


PLAYER_ACTIONS.add({
  name: "Interrupt",
  unlock: true,
  description: [
    `$$Ren$: "... give me the time of my life, honey, I know..."`,
    `$$FemmeFatale$: "You know my catchphrase?"`,
  ],
  function: function(){
    BATTLETREE.api.lock("_party/_FemmeFatale0", "Let her talk");
    confront("Interrupt");
    if (INVENTORY.count("_FemmeFataleTokens") >= 4){
      confront2("Interrupt");
    }
  },
});

PLAYER_ACTIONS.add({
  name: "Let her talk",
  unlock: true,
  description: [
    `$$FemmeFatale$: "... give you the time of your life, honey!"`,
  ],
  outcome: BATTLETREE.ESCAPE,
});



// ===================
// =================== START
// ===================
BATTLE.operations.start(
  [
  `$$FemmeFatale$: "I can..."`,
  ]
);
