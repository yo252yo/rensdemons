
new CenteredMovingImage("assets/characters/party/FemmeFatale.png", 'background',32,48, 2);

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
      {action: "Shield her", reaction: "She retorts that she does not need your protection.", score: 0},
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
    PLAYER_ACTIONS.add({
      name: "Accept defeat",
      unlock: true,
      description: [
        `$$Ren$: "I'm never reaching 100%, am I?"`,
        `$$FemmeFatale$ finds the wording weird but understands the sentiments. She smiles and nods.`,
      //  `$$FemmeFatale$: "It's all about the chase, isn't it?"`,
      ],
      function: function(){
        BATTLE.monster_actions.empty();
        BATTLE.player_actions.empty(true);
        //TODO wip phase two

      }
    });
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
