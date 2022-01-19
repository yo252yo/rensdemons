
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




// 99.9% in 14 steps
// i need about 20 scenarii i think



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
    prompt: "...",
    options: [
      {action: "...", reaction: "She appreciates the attention.", score: 1},
      {action: "...", reaction: "She does not care about your life.", score: -1},
      {action: "...", reaction: "She seems nonplussed.", score: 0},
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
  BATTLE.player_actions.empty();
  for(var option of situation.options){
    add_player_actions(option, nextSituation);
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
