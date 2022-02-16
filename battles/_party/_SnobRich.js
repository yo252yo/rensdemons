
new CenteredMovingBattleImage("assets/characters/party/SnobRich.png", 'background',32,48, 2);

AUDIO.music.characters.SnobRich();
PLAYER_ACTIONS.escape();


var accept = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Accept",
  unlock: true,
  description: [
    `$$Ren$: "I suppose I could. I'm not sure how, though..."`,
    `$$SnobRich$: "Well see this big manor we're standing in front of? It is in fact my residence. But it just so happens that I was wrongfully chased away from it due to an unfortunate misunderstanding. There remains however quite a few of my valuable possessions I did not have the opportunity to retrieve. Perhaps this could be the ideal grounds for your demonstration?"`,
    `$$Ren$: "You know what, it does sound exactly like it!"`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.increase("_followedBySnobRich");
  },
});


var refuse = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Refuse",
  unlock: true,
  description: [
    `You politely refuse. $$SnobRich$ is visibly disappointed, but does not insist. The conversation ends there.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});


var divine = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Gathering",
  unlock: true,
  description: [
    `$$Ren$: "It is quite hard to explain. Let's just say that I have certain intuitions that guide me towards things... ripe for the taking."`,
    `$$SnobRich$: "You're not suggesting anything illegal, I hope?"`,
    `$$Ren$: "No, I only take what's offered to me."`,
    `$$SnobRich$: "Most intriguing. I have to admit I have a hard time imagining what you mean. If it's hard to explain, maybe you could show me?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    accept("Gathering");
    refuse("Gathering");
  }
});

var gambling = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Gambling",
  unlock: true,
  description: [
    `$$Ren$: "You can make a fortune in gambling when you know you have the Goddess on your side."`,
    `$$SnobRich$: "Sir, I will not be associated with this kind of lowly schemes."`,
    `The lady slaps you and turns away.`,
  ],
  outcome: BATTLETREE.LOSS,
});

var itsforgotten = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "It's forgotten",
  unlock: true,
  description: [
    `$$Ren$: "My dear, it's already forgotten."`,
    `$$SnobRich$: "You're too kind..."`,
    `$$SnobRich$ pretends to change the subject in order to ask about what's really on her mind. She probes you with the subtlety of an elephant in a glassware shop.`,
    `$$SnobRich$: "Pray tell, sir, what are those means you were mentioning?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    gambling("It's forgotten");
    divine("It's forgotten");
  }
});



var no = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "No",
  unlock: true,
  description: [
    `$$Ren$: "No!"`,
    `You let your rebuttal hang in the air and immediately walk away. You may have ruined your chances with $$SnobRich$, but you cannot say that it didn't feel very good.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var incognito = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "You should know",
  unlock: true,
  description: [
    `$$Ren$: "I have found it sensible to not flaunt my riches too ostentatiously. I'm sure a successful lady such as yourself can understand why."`,
    `$$SnobRich$'s attitude changes completely. Once again, the Goddess guided you towards the perfect thing to say. The aristocrat, now apologetic, mumbles in a hushed tone.`,
    `$$SnobRich$: "Of course, you're right, you're right. I'm so sorry, it appears I have misjudged you. There is more to you than meets the eye. Can you ever forgive me?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    itsforgotten("You should know");
    no("You should know");
  }
});

var ilikeit = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "I like it",
  unlock: true,
  description: [
    `$$Ren$: "I happen to like my outfit!"`,
    `$$SnobRich$: "This tells me more about you than I need to know! Now off you go, little liar. Stop wasting my precious time."`,
    `$$SnobRich$ turns away from you.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var imnotpoor = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "I'm not poor",
  unlock: true,
  description: [
    `$$Ren$: "I'm not poor. I have ways."`,
    `$$SnobRich$ seems taken aback. She tries to put up an indifferent face, but you can tell that you've piqued her interest.`,
    `$$SnobRich$: "Pardon?"`,
    `$$Ren$: "I'm saying I'm not poor. I have my own ways to make good money."`,
    `$$SnobRich$: "Why do you dress like a beggar, then?"`,
  ],
  function: function(){
    incognito("I'm not poor");
    ilikeit("I'm not poor");
  }
});

var okthanks = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Thank you",
  unlock: true,
  description: [
    `$$Ren$: "Thank you for your time."`,
    `$$SnobRich$: "Always a pleasure to give back! Now off you go, and please be mindful not to touch my couture with your... skin."`,
    `$$SnobRich$ turns away from you.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var imnotacharity = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Protest",
  unlock: true,
  description: [
    `$$Ren$: "Who do you think you are? I'm not a charity case!"`,
    `$$SnobRich$: "Who do you think YOU are? I have never met such an ill behaved rude little monster child. I have half a mind to have you thrown in jail."`,
    `The lady slaps you and turns away.`,
  ],
  outcome: BATTLETREE.LOSS,
});

var unlock_respects = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Grovel exaggeratedly",
  unlock: true,
  description: [
    `You attempt to respond to her introduction with the most courtesy you can think of. You multiply meaningless polite phrases and bow exaggeratedly, half scared that the excess might offend her. To your surprise, she does not consider this too much, but barely enough for her stature. She laughs at your candor in a shrill piercing voice.`,
    `$$SnobRich$: "Well, I trust it brightened your life to have this chance to meet me in person, but as you can see I am quite busy and have no time to consecrate to greeting poor commoners like yourself. I unfortunately cannot spend all my time working on charitable causes!"`,
  ],
  function: function(){
    imnotpoor("Grovel exaggeratedly");
    imnotacharity("Grovel exaggeratedly");
    okthanks("Grovel exaggeratedly");
  }
});


var unlock_ok = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Acquiesce",
  unlock: true,
  description: [
    `$$Ren$: "Okay, nice to meet you!"`,
    `The lady is deeply offended and slaps you.`,
    `$$SnobRich$: "If you're just going to insult me, I won't stand for it."`,
    `$$SnobRich$ turns away from you.`,
  ],
  outcome: BATTLETREE.LOSS,
});

var unlock_short = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Shorten name",
  unlock: true,
  description: [
    `You were right about to ask her if you could call her something more... rememberable when she continued, as if reading your mind.`,
    `$$SnobRich$: "You may call me..."`,
  ],
  function: function(){
    BATTLE.monster_actions.make_unique(
      function() {
        PARTY.newChangeNickname(PARTYMEMBERS.SnobRich, undefined, BATTLE.turn_factory.player);
      }
    );
  }
});

var unlock_no = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "No, sorry",
  unlock: true,
  description: [
    `The lady seems as surprised as if she heard these words for the first time.`,
    `$$SnobRich$: "What candor! How delightfully refreshing and humorous!"`,
    `$$SnobRich$: "Why, I am of course $$SnobRich$ $$SnobRich_particules$ of course!"`,
  ],
  function: function(){
    unlock_respects("No, sorry");
    unlock_ok("No, sorry");
    unlock_short("No, sorry");
  },
});

var unlock_apo = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Apologize",
  unlock: true,
  description: [
    `You mumble a vague apology, trying to sound as deferent as you possibly can, before running away to avoid any more etiquette mishaps.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});


PLAYER_ACTIONS.add({
  name: `Approach`,
  unlock: true,
  description: [
    `You approach the lady and starts asking if everything is ok, but she turns to you and seems outraged by you talking to her.`,
    `$$SnobRich$: "How dare you talk to me unprompted, don't you know who I am?"`,
    ],
  function: function(){
    unlock_apo("Approach");
    unlock_no("Approach");
  },
});


PLAYER_ACTIONS.add({
  name: "Look away",
  unlock: true,
  description: [
    `You pretend not to see.`,
    ],
  outcome: BATTLETREE.ESCAPE,
});

// ===================
// =================== START
// ===================
BATTLE.operations.start([
  `A wealthy looking young woman is peeking through the window of the villa. Her opulent attire is making this the very opposite of stealthy.`,
]);
