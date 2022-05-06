
new CenteredMovingBattleImage("assets/characters/party/FemmeFatale.png", 'background',32,48, 2);

AUDIO.music.characters.FemmeFatale();
PLAYER_ACTIONS.escape();

var scoreitem = "_ff_score";

//hack helper functions
var _SCORE = 0.5;

var _INCREASE_POW = 0.6;
var _DECREASE_POW = 1.15;

if(!INVENTORY.count(scoreitem)){
  INVENTORY.set(scoreitem, 0.5) ;
}

var updateScore = function(diff){
  var score = INVENTORY.count(scoreitem);
  if(diff > 0){
    if (Math.pow(score, _INCREASE_POW) < 0.999999){
      INVENTORY.set(scoreitem, Math.pow(score, _INCREASE_POW));
    } else {
      INVENTORY.set(scoreitem, score - 0.01 - Math.random() * 0.01);
    }
  } else if(diff < 0 && Math.pow(score, _DECREASE_POW) > 0.001) {
  INVENTORY.set(scoreitem, Math.pow(score, _DECREASE_POW));
  }
}

var score = function(){
  var m = 1;
  var ss = INVENTORY.count(scoreitem);
  while(ss*ss > 0.9) {
    ss *= ss;
    m *= 10;
  }
  var s = Math.round((INVENTORY.count(scoreitem))*100 * m) / m;
  return `${s}%`;
}

var comment = function(){
  var ss = INVENTORY.count(scoreitem);
  if(ss > 0.999){
    return "You're so close you can almost taste fulfilment. Only a tiny bit more...";
  } else if(ss > 0.99){
    return "Satisfaction is only slightly out of reach.";
  } else if(ss > 0.9){
    return "You're getting close to the satisfaction of your desires.";
  } else if(ss > 0.7){
    return "You're really developing a rapport.";
  } else if(ss > 0.5){
    return "She is warming up to you.";
  }
  return "You still have a long way to go.";
}

var updateMonsterAction = function(situation){
  BATTLE.monster_actions.empty();
  var flavortext = RANDOM.pick([
    "$$FemmeFatale$ blows you a kiss.",
    "$$FemmeFatale$ winks at you.",
    "$$FemmeFatale$ appraises your body.",
    "$$FemmeFatale$ caresses her cheek.",
    "$$FemmeFatale$ smacks her lips.",
    "$$FemmeFatale$ licks her lips.",
    "$$FemmeFatale$ bites her bottom lip.",
    "$$FemmeFatale$ shakes her hair suggestively.",
    "$$FemmeFatale$ seems to have a lot of ideas on her mind.",
    "$$FemmeFatale$ stretches and yawns, raising her chest.",
    "$$FemmeFatale$ bends towards you, accentuating her cleavage.",
  ]);
  var scoretext = `You feel that $$FemmeFatale$'s affection for you is about ${score()}. ${comment()}`;
  BATTLE.monster_actions.add_textual([flavortext + "<br />" + scoretext, situation.prompt]);
}

//hack phase2: resolution


var accept = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Accept`,
  unlock: true,
  description: [
    `$$FemmeFatale$: "Nice, I've always wanted to go see the world. Maybe this is my chance!"`,
    "$$FemmeFatale$ JOINS YOUR PARTY!",
    ],
    extra_function: function(){
      PARTY.add(PARTYMEMBERS.FemmeFatale);

      BATTLE.monster_actions.make_unique(
        function() {
          PARTY.changeNickname(PARTYMEMBERS.FemmeFatale, undefined, BATTLE.operations.win);
        }
      );
    },
});

var refuse = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Refuse`,
  unlock: true,
  description: [
    `$$FemmeFatale$: "That's fair. Well hit me up anytime if you change your mind. I could use a break from this life."`,
    ],
  outcome: BATTLETREE.LOSS,
});

var conversation = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Lonely`,
  unlock: true,
  description: [
    `$$Ren$: "Still, it drives me crazy how people's conversations are always so weird and unnatural. Even you, at times... It all seems so... artificial. Don't you see it too? Doesn't it make you feel lonely?"`,
    `$$FemmeFatale$: "Of course it does. But it's simply the way life is. We're only humans, after all. An impossible mix of complexity and simplicity."`,
    `She marks a pause, thinking for a while.`,
    `$$FemmeFatale$: "It's weird, I think it's the first time I've talked about this with anyone else. It's kinda... refreshing."`,
    `$$FemmeFatale$: "Do you mind if I hang out with you a bit longer? You look like you could use an expert at human relationships to watch your back..."`,
    ],
  function: function(){
    accept(`Lonely`);
    refuse(`Lonely`);
    STATS.record.flag("FemmeFatale_lonely");
  }
});

var different = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Different`,
  unlock: true,
  description: [
    `$$Ren$: "Yyou don't understand! To me, people are literally always saying the same thing. A couple of sentences in a loop. It's driving me insane!"`,
    `$$Ren$: "Even you, I know what you're going to say!"`,
    `$$FemmeFatale$: "Oh yeah? Try me!"`,
    `$$Ren$: "You're going to go on about the fact that it's the way life is, how we're only humans, and... what was it again? A mix of complexity and simplicity."`,
    `$$FemmeFatale$: "That does sound like something I would say..."`,
    `$$FemmeFatale$: "It's not as impressive as you think, though. Most of the time, I know what my clients are going to say before they say it..."`,
  ],
  outcome: BATTLETREE.NOTHING,
});


var tired = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Tired`,
  unlock: true,
  description: [
    `$$Ren$: "Then you get it, don't you? Aren't you tired of pretending that people are interesting? That the choices we make matter? How can you go on knowing that things are always the same..."`,
    `$$FemmeFatale$: "I just do. Partly because I don't have a choice, partly because even the most simple headed man can be beautiful in his nuances."`,
    `Her words give you a lot to think about.`,
  ],
  outcome: BATTLETREE.NOTHING,
});



var impressed = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Others`,
  unlock: true,
  description: [
    `$$Ren$: "Wow, you're nothing like the other people I've met."`,
    `$$Ren$: "Everyone seems so... robotic to me. They're just repeating the same things over and over again. They're always doing the same things..."`,
    `$$Ren$: "It feels a bit like... You're seeing it too! And yet you're not the Promised Child!"`,
    `$$FemmeFatale$: "That's just my experience talking. But never forget that even if that impression may be valid, you and I are not different from them. We also have our buttons, everybody does. And we'll also react predictably when they're pushed."`,
    ],
  function: function(){
    conversation(`Others`);
    tired(`Others`);
     if(STATS.flag("FemmeFatale_lonely")) {
       different(`Others`);
     }
   }
});

var outrage = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Outrage`,
  unlock: true,
  description: [
    `$$Ren$: "What? What do you mean?"`,
    `$$FemmeFatale$: "Please, there's one thing I'm good at, and that's reading people. I figure them out, what makes them tick, and how to press their buttons. Don't play innocent with me, I know what you were doing with me earlier. You were not exactly subtle in gauging my reactions to tell me what I wanted to hear. I know the game way too well to be duped."`,
    `Taken aback, you don't know how to respond. Seeing your confusion, $$FemmeFatale$ laughs.`,
    `$$FemmeFatale$: "That's okay, there's no harm in trying to understand people... What matters is what you do as a result."`,
    ],
  function: impressed
});

var cycle = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Ethics`,
  unlock: true,
  description: [
    `$$Ren$: "Are you not just trapping people in a vicious cycle?"`,
    `$$FemmeFatale$: "Am I? I'm giving them what they think they want, and also what they don't know they actually want. Sounds like a win to me..."`,
    `$$FemmeFatale$: "By the way, you're the one to talk! It's no different from what you're doing!"`,
    ],
  function: outrage
});


var ending = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Good end`,
  unlock: true,
  description: [
    `$$Ren$: "But how do I reach the good ending?"`,
    `$$FemmeFatale$: "You don't. Or rather, you've always been there. It's all about the chase, isn't it?"`,
    `$$FemmeFatale$: "People neve want what they think they want. They only want to run after it. That's where they are truly content. And that's what I'm giving them. A hope, an ideal..."`,
    `$$FemmeFatale$: "That's the most important lesson I've learned, and that's why I'm so good at what I do. All humans are the same. You just gotta keep them wanting more."`,
  ],
  function: function(){
    cycle("Good end");
  }
});

var flag = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Flag`,
  unlock: true,
  description: [
    `$$Ren$: "But why? Did I miss a flag?"`,
    `$$FemmeFatale$: "Oh, honey... It's not how human interactions work! There's no such thing as flags, scores, and so on... Believe me, I know a fair bit about that..."`,
  ],
  outcome: BATTLETREE.NOTHING,
});


var route = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Routes`,
  unlock: true,
  description: [
    `$$Ren$: "This is not the route I wanted for this relationship to go down! Did none of my choices matter?"`,
    `$$FemmeFatale$: "Of course they did, I wouldn't be standing here talking to you otherwise. But maybe it mattered in a way you were not expecting. Maybe you were so fixated on an illusionary goal that you didn't see the real growth happening in front of you..."`,
  ],
  outcome: BATTLETREE.NOTHING,
});


var accept_defeat = function() {
  PLAYER_ACTIONS.add({
    name: "Accept defeat",
    unlock: true,
    description: [
      `$$Ren$: "I'm never reaching 100%, am I?"`,
      `$$FemmeFatale$ finds the wording weird but understands the sentiments. She smiles and nods.`,
    ],
    function: function(){
      BATTLE.monster_actions.empty();
      BATTLE.player_actions.empty(true);
      ending("Accept defeat");
      flag("Accept defeat");
      choices("Accept defeat");
      route("Accept defeat");
    }
  });
}



//hack phase 1: the chase


var situations = [
  {
    prompt: "You start up a conversation.",
    options: [
      {action: "Talk about her", reaction: "She appreciates the attention.", score: 1},
      {action: "Talk about you", reaction: "She does not care about your life.", score: -1},
      {action: "Talk about the weather", reaction: "She seems nonplussed.", score: 0},
    ]
  },
  {
    prompt: "You want to say something nice.",
    options: [
      {action: "Compliment her face", reaction: "She appreciates the attention.", score: 1},
      {action: "Compliment her body", reaction: "She appreciates the attention.", score: 1},
      {action: "Compliment her eyes", reaction: "She appreciates the attention.", score: 1},
    ]
  },
  {
    prompt: "You want to be more forward.",
    options: [
      {action: "Touch her", reaction: "She slaps you.", score: -1},
      {action: "Whistle", reaction: "She does not like this kind of display.", score: 0},
      {action: "Stay calm", reaction: "She appreciates your diligence.", score: 1},
    ]
  },
  {
    prompt: "The conversation moves to her work.",
    options: [
      {action: "Must be easy", reaction: "She slaps you.", score: -1},
      {action: "How demeaning", reaction: "She does not care much for your paternalist empathy.", score: 0},
      {action: "I recognize your efforts", reaction: "She appreciates that you can see her job for what it is.", score: 1},
    ]
  },
  {
    prompt: "You introduce yourself.",
    options: [
      {action: "Tell the honest truth", reaction: "She is surprised and excited to meet the Promised Child.", score: 1},
      {action: "Exaggerate", reaction: "She does not believe you.", score: -1},
      {action: "Dodge the question", reaction: "She find your hesitation suspicious.", score: 0},
    ]
  },
  {
    prompt: "You want to know more about her.",
    options: [
      {action: "Ask what she's doing here", reaction: "She appreciates the attention.", score: 1},
      {action: "Ask about her family", reaction: "She does not feel comfortable enough with you to share her personal life.", score: 0},
      {action: "Ask about her job", reaction: "She is not thrilled to talk about work.", score: 0},
    ]
  },
  {
    prompt: "You want to give her a present.",
    options: [
      {action: "A flower", reaction: "She appreciates the gesture but wonders what to do with that.", score: 0},
      {action: "A delicacy", reaction: "She seems very excited by the idea of trying new food.", score: 1},
      {action: "Your signature", reaction: "She is shocked by your arrogance.", score: -1},
    ]
  },
  {
    prompt: "You try to guess her favorite literature.",
    options: [
      {action: "Religious books", reaction: "She does not respond to spirituality.", score: -1},
      {action: "Romance books", reaction: "She finds them predictable and boring.", score: 0},
      {action: "Adventure books", reaction: "She shares your thirst for adventure.", score: 1},
    ]
  },
  {
    prompt: "She seems at odds with $$BestFriend$.",
    options: [
      {action: "Take "+DICTIONARY.get(PARTYMEMBERS.BestFriend)+"'s side", reaction: "She would have liked your support.", score: 0},
      {action: "Take "+DICTIONARY.get(PARTYMEMBERS.FemmeFatale)+"'s side", reaction: "She appreciates your concern but finds it sad that you would turn on your friend so fast.", score: 0},
      {action: "Try peaceful mediation", reaction: "She is impressed by your maturity.", score: 1},
    ]
  },
  {
    prompt: "The recent past comes up...",
    options: [
      {action: "Comment on daily events", reaction: "She does not seem very interested.", score: 0},
      {action: "Brag about your exploits", reaction: "She resents your arrogance.", score: -1},
      {action: "Ask about her week", reaction: "She appreciates the attention.", score: 1},
    ]
  },
  {
    prompt: "What are you thinking about?",
    options: [
      {action: "How to make a good impression", reaction: "Your diligence comes across.", score: 1},
      {action: "Lunch", reaction: "A very understandable concern.", score: 0},
      {action: "When is it ok to leave", reaction: "She senses that you don't want to be here.", score: -1},
    ]
  },
  {
    prompt: "Anything to ask?",
    options: [
      {action: "Ask about the town", reaction: "She says it's not great, but it's her home.", score: 1},
      {action: "Ask about her past", reaction: "She would rather not talk about it.", score: 0},
      {action: "Ask about her prices", reaction: "She delivers her usual sales speech.", score: 0},
    ]
  },
  {
    prompt: "She seems about to leave.",
    options: [
      {action: "Promise her money", reaction: "She agrees to stay a bit longer.", score: 0},
      {action: "Say something provocative", reaction: "She reacts but does not seem pleased.", score: 0},
      {action: "Ask her to stay", reaction: "She appreciates your honesty.", score: 1},
    ]
  },
  {
    prompt: "A brawl erupts in a nearby street.",
    options: [
      {action: "Intervene", reaction: "She appreciates your dedication to peace.", score: 1},
      {action: "Protect her", reaction: "She seems more concerned about the fate of the strangers.", score: 0},
      {action: "Ignore", reaction: "Your conversation goes on.", score: 0},
    ]
  },
  {
    prompt: "A stranger ogles $$FemmeFatale$ from afar.",
    options: [
      {action: "Warn her", reaction: "She sighs and says she's used to it.", score: 1},
      {action: "Ignore him", reaction: "You continue your conversation.", score: 0},
      {action: "Teach him a lesson", reaction: "She retorts that she does not need you to protect her.", score: 0},
    ]
  },
  {
    prompt: "A thief pickpockets a nearby villager.",
    options: [
      {action: "Chase him and give the money back", reaction: "She appreciates your dedication to justice.", score: 1},
      {action: "Chase him and give the money to " + DICTIONARY.get(PARTYMEMBERS.FemmeFatale), reaction: "She appreciates the gift.", score: 0},
      {action: "Don't chase him", reaction: "You continue your conversation.", score: 0},
    ]
  },
  {
    prompt: "A way too drunk stranger approaches.",
    options: [
      {action: "Let him pass", reaction: "She tells you that everyone is like that here.", score: 1},
      {action: "Sober him up", reaction: "She does not care much for your intrusion in other people's lives.", score: 0},
      {action: "Defend her", reaction: "She retorts that she does not need to be shielded.", score: 0},
    ]
  },
  {
    prompt: "Loud music can be heard from a nearby house.",
    options: [
      {action: "Enjoy it", reaction: "She also likes parties.", score: 1},
      {action: "Complain", reaction: "She does not think it's wrong for people to enjoy life.", score: -1},
      {action: "Ignore it", reaction: "She does not seem to mind it.", score: 0},
    ]
  },
  {
    prompt: "A group of passerbys offers you to share their drinks.",
    options: [
      {action: "Refuse on her behalf", reaction: "She does not like when you speak for her.", score: -1},
      {action: "Share with her", reaction: "You enjoy a delicious mead.", score: 1},
      {action: "Suggest it's poisoned", reaction: "She does not care much for your paranoia.", score: 0},
    ]
  },
  {
    prompt: "Another pretty girl walks by.",
    options: [
      {action: "Ignore her", reaction: "You continue your conversation.", score: 1},
      {action: "Take a peek", reaction: "$$FemmeFatale$ does not appreciate the interruption.", score: -1},
      {action: "Compare the women", reaction: "$$FemmeFatale$ does not think this a respectable behavior.", score: -1},
    ]
  },
  {
    prompt: "You bump into her.",
    options: [
      {action: "Accuse her", reaction: "She says it's your fault.", score: -1},
      {action: "Apologize", reaction: "She apologizes too.", score: 1},
      {action: "Ignore it", reaction: "She accepts to let it go.", score: 0},
    ]
  },
];

var add_player_actions = function(o, nextSituation){
  PLAYER_ACTIONS.add({
    name:o.action,
    unlock: true,
    description: [o.reaction],
    function: function(){
      if(o.score){
        updateScore(o.score);
        if(o.score > 0){
          BATTLETREE.api.develop("_party/_FemmeFatale", o.action, BATTLETREE.WIN);
        } else {
          BATTLETREE.api.develop("_party/_FemmeFatale", o.action, BATTLETREE.LOSS);
        }
      } else {
        BATTLETREE.api.develop("_party/_FemmeFatale", o.action, BATTLETREE.NOTHING);
      }
      updateMonsterAction(nextSituation);
      queue_situation(nextSituation);
    }
  });
}




var queue_situation = function(situation){
  var nextSituation = RANDOM.pick(situations);
  BATTLE.player_actions.empty(true);
  for(var option of situation.options){
    add_player_actions(option, nextSituation);
  }

  if (INVENTORY.count(scoreitem) > 0.999) { // 14 steps min
    accept_defeat();
  }
}

var first_situation = RANDOM.pick(situations);
queue_situation(first_situation);

// ===================
// =================== START
// ===================
BATTLE.operations.start(
  [
  `You encounter a suggestively dressed lady. She tells you her name is $$FemmeFatale$ and she is looking for a good time.`,
  first_situation.prompt
  ]
);
