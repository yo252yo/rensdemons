
new CenteredMovingBattleImage("assets/characters/party/RetiredProtector.png", 'background',32,48, 2);

AUDIO.music.characters.RetiredProtector();
PLAYER_ACTIONS.escape();

var _ROLE = '';
var _MOTIVATION = '';
var _COST = '';
var _RETIRE = '';

var writebio = function(){
  DICTIONARY.set('RetiredProtector_bio', `
    His many qualities quickly earned him the title of best ${_ROLE} in the kingdom. He was admired by all for his strength in battle and his integrity, as he was always following his ${_MOTIVATION}. His successful career came at a cost, however, as ${_COST}.<br /><br />
    But the glory days could not last forever. When ${_RETIRE}, he decided to retire and withdraw from public life. He settled under a fake name in quiet ${DICTIONARY.get("town_5")} and swore never to fight again.
  `);
}

var goddess = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Goddess",
  unlock: true,
  description: [
    `$$Ren$: "I'm not really sure. The Goddess brought you to me."`,
    `$$Ren$: "In a way, it's a lot like me. I was just an ordinary child before She chose me too for this holy mission."`,
    `$$Ren$: "She has a way to do that... Pick the perfect choice. Select a random nondescript element and imbue it with meaning, make it special."`,
    `$$Ren$: "I wasn't the Promised Child before she looked at me. You were not my protector until she looked at you. But with Her great powers... She changed us."`,
    `$$RetiredProtector$: "You're right. After this conversation, I do feel changed. It feels like I never could have escaped this calling."`,
    `$$RetiredProtector$: "A few hours ago, I was an old soul getting ready to die. I had lost my faith and my motivation. But you and the Goddess barged into my life, and now it feels like it was always meant to be. Like my story is not over."`,
    `$$RetiredProtector$: "I'll follow you, kid. My blade is yours. The Goddess picked me through you, and made me alive again. The moment I turn away, I will stop existing."`,
    "$$RetiredProtector$ JOINS YOUR PARTY!",
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function() {
    PARTY.add(PARTYMEMBERS.RetiredProtector);
    writebio();
  },
});


var unlock_9_keys = ["30 years", "10 years", "15 years", "25 years"];
var unlock_9 = function(from, name) {
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `$$Ren$: "... ${name}. You retired ${name} years ago."`,
      `$$RetiredProtector$ take a pause to think. He does mental math, counts on his fingers, and then looks at you with surprised.`,
      `$$RetiredProtector$: "Well I'll be damned! You're right! It looks like you might now me better than I know myself..."`,
      `$$Ren$: "The Goddess does. I'm just her vessel."`,
      `$$RetiredProtector$: "Can I just ask, though. Why me? I know I used to be a great soldier, but I haven't fought in a long time! There's probably hundreds more qualified soldiers in the army. Heck, maybe even in this room. Why did you pick a random nobody like me?"`,
    ],
    function: function() {
      BATTLE.player_actions.empty(true);
      goddess(name);
    },
  });
  f(from);
}



var unlock_8_keys = ["lost daughter", "dead liege", "inspiring master", "abandoned wife"];
var unlock_8 = function(from, key) {

  var pronoun = "her";
  var name = STRING_UTILS.camel_case(key);
  switch(key){
    case unlock_8_keys[1]:
    case unlock_8_keys[2]:
      pronoun = "him";
     break;
  }

  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `$$Ren$: "...your ${key}."`,
      `$$RetiredProtector$: "You're right! You're right! I need to do this. I must make ${pronoun} proud!"`,
      `After calming down, he looks at you sternly and asks.`,
      `$$RetiredProtector$: "Is there anything you don't know about me?"`,
      `For only answer, you give him a shy apologetic smile.`,
      `$$RetiredProtector$: "You really have the Goddess on your side... To this you can just come and pull me out, make me hold a sword for the first time in 20 years..."`,
      `$$Ren$: "Actually, you're wrong, it has been..."`,
    ],
    function: function() {

      switch(key){
        case unlock_8_keys[0]:
          _COST = "he never saw his daughter grow up";
         break;
        case unlock_8_keys[1]:
          _COST = "he lost his liege in a tragic battle";
         break;
        case unlock_8_keys[2]:
          _COST = "he was too busy to mourn the master whom he looked up to";
         break;
        case unlock_8_keys[3]:
          _COST = "he had to leave his beloved wife behind";
         break;
      }

      BATTLE.player_actions.empty(true);
      for (var k of unlock_9_keys){
        unlock_9(name, k);
      }
    },
  });
  f(from);
}


var unlock_7_keys = ["heart", "orders", "honor", "conscience"];
var unlock_7 = function(from, key) {
  var name = STRING_UTILS.camel_case(key);
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `$$Ren$: "...${key}."`,
      `You stop when you see that $$RetiredProtector$ is putting a hand in front of his face, to hide his sobbing.`,
      `$$RetiredProtector$: "Damn it, kid."`,
      `He takes a while to calm his nerves, then sighs deeply and says.`,
      `$$RetiredProtector$: "You might just persuade me. Anyone else, any other way, I would have turned down... But this..."`,
      `$$Ren$: "Please, do it for..."`,
    ],
    function: function() {
      _MOTIVATION = key;
      BATTLE.player_actions.empty(true);
      for (var k of unlock_8_keys){
        unlock_8(name, k);
      }
    },
  });
  f(from);
}


var unlock_6_keys = ["forgive", "accept", "move on", "redeem"];
var unlock_6 = function(from, key) {
  var name = STRING_UTILS.camel_case(key);
  switch(key){
    case unlock_6_keys[0]:
     var value = "It's time you forgive yourself.";
     break;
    case unlock_6_keys[1]:
     var value = "It's time to accept your past.";
     break;
    case unlock_6_keys[2]:
     var value = "It's time to move on.";
     break;
    case unlock_6_keys[3]:
     var value = "It's time to redeem your past mistakes.";
     break;
  }
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `$$Ren$: "${value}"`,
      `$$Ren$: "You've only ever done what you needed to do. The Goddess and I both know that you were only following your..."`,
    ],
    function: function() {
      BATTLE.player_actions.empty(true);
      for (var k of unlock_7_keys){
        unlock_7(name, k);
      }
    },
  });
  f(from);
}


var unlock_5_keys = ["betrayal", "failure", "lie", "accident"];
var unlock_5 = function(from, key) {
  var name = STRING_UTILS.camel_case(key);
  switch(key){
    case unlock_5_keys[0]:
     var value = "I know about your betrayal, how you turned against your liege.";
     break;
    case unlock_5_keys[1]:
     var value = "I know about that battle in which you failed to protect your liege.";
     break;
    case unlock_5_keys[2]:
     var value = "I know about the lie you've been living all these years.";
     break;
    case unlock_5_keys[3]:
     var value = "I know about that terrible accident where you poured the blood of an innocent.";
     break;
  }
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `$$Ren$: "${value}"`,
      `$$RetiredProtector$'s shocked face shows that you've hit a nerve. $$BestFriend$ gasps in surprise and puzzlement, dying to ask more questions about how you know this, but stays silent.`,
    ],
    function: function() {
      switch(key){
        case unlock_5_keys[0]:
         _RETIRE = "he discovered that the liege he was serving was sacrificing the country for his selfish interest";
         break;
        case unlock_5_keys[1]:
         _RETIRE = "he failed to protect his ruler in a terrible bloodshed";
         break;
        case unlock_5_keys[2]:
         _RETIRE = "a scandal revealed that his position in the army was built on shameless lies";
         break;
        case unlock_5_keys[3]:
         _RETIRE = "he accidentally killed a man from his battalion on the field";
         break;
      }
      BATTLE.player_actions.empty(true);
      for (var k of unlock_6_keys){
        unlock_6(name, k);
      }
    },
  });
  f(from);
}



var unlock_4_keys = ["duty", "regret", "gain", "purpose"];
var unlock_4 = function(from, key) {
  var name = STRING_UTILS.camel_case(key);
  switch(key){
    case unlock_4_keys[0]:
     var value = "Don't you think you have a duty to help? Even if the chance is slim?";
     break;
    case unlock_4_keys[1]:
     var value = "Don't you think you'll regret not taking that chance to change the world?";
     break;
    case unlock_4_keys[2]:
     var value = "Don't you think there's a lot in this opportunity for you?";
     break;
    case unlock_4_keys[3]:
     var value = "Don't you think it would give back purpose to your life, instead of just... waiting for death here?";
     break;
  }
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `$$Ren$: "${value}"`,
      `$$RetiredProtector$: "Damn it, kid. Your words move me. It's like you know exactly what to say!"`,
      `$$Ren$: "Credit goes to the Goddess. I am just the Promised Child."`,
      `$$RetiredProtector$: "She lets you peek right into my soul, right?"`,
      `$$Ren$: "Yes, I even know about..."`,
    ],
    function: function() {
      BATTLE.player_actions.empty(true);
      for (var k of unlock_5_keys){
        unlock_5(name, k);
      }
    },
  });
  f(from);
}

var unlock_3_keys = ["future generations", "redemption", "my failure", "the glory"];
var unlock_3 = function(from, key) {
  var name = STRING_UTILS.camel_case(key);
  switch(key){
    case unlock_3_keys[0]:
     var value = "They will suffer if you don't help us!";
     break;
    case unlock_3_keys[1]:
     var value = "It's a chance to fix your past mistakes!";
     break;
    case unlock_3_keys[2]:
     var value = "You know I don't stand a chance without you.";
     break;
    case unlock_3_keys[3]:
     var value = "You could touch again the fame of your golden days!";
     break;
  }

  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `$$Ren$: "Sir, I understand how you feel, but think about ${key}. ${value}"`,
      `$$Ren$: "I'm going on what is probably a suicide mission to save the world. I have no idea how to succeed. Without your help, I'll probably fail!"`,
    ],
    function: function() {
      BATTLE.player_actions.empty(true);
      for (var k of unlock_4_keys){
        unlock_4(name, k);
      }
    },
  });
  f(from);
}





var unlock_20_keys = ["warrior", "tactician", "general", "strategist", "soldier", "commander"];
var unlock_20 = function(from, key) {
  var name = STRING_UTILS.camel_case(key);
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `$$Ren$: "...${key}! And you could be again!"`,
      `$$RetiredProtector$: "That's all in the past!"`,
    ],
    function: function() {
      BATTLE.player_actions.empty(true);
      _ROLE = key;
      for (var k of unlock_3_keys){
        unlock_3(name, k);
      }
    },
  });
  f(from);
}



var unlock_2 = function(from, key) {
  var name = STRING_UTILS.camel_case(key);
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `$$Ren$: "I'm the Promised Child. I'm on a quest to save the world, and I'd like your ${key}."`,
      `$$RetiredProtector$: "You've come to the wrong guy. I don't do that kind of stuff anymore. I don't know how you found me, but you better leave."`,
      `$$Ren$: "Please, hear me out! I know it was long ago, but you were once the world's best..."`,
    ],
    function: function() {
      BATTLE.player_actions.empty(true);
      for (var key of unlock_20_keys){
        unlock_20(name, key);
      }
    },
  });
  f(from);
}



var names = MARKOV_MODELS.human_names.mutate_n("Geralt", 5, 5);
for(var n of names){
  var f = function(key) {
    var name = STRING_UTILS.camel_case(key);

    PLAYER_ACTIONS.add({
      name: name,
      unlock: true,
      description: [
        `$$Ren$: "...${name}?"`,
        `${name}: "I don't know how you found me, but yeah, that's me. Though it's a name I have not heard in a long time. I don't go by it anymore. What do you want, kid?"`,
      ],
      function: function() {
        BATTLE.player_actions.empty(true);
        DICTIONARY.set(PARTYMEMBERS.RetiredProtector, name);

        for (var quality of ["protection", "help", "guidance", "mentoring"]){
          unlock_2(name, quality);
        }
      },
    });

  }
  f(n);
}

// ===================
// =================== START
// ===================
BATTLE.operations.start([
  `You face a burly man. His scar and the wear on his attire tell you that he has seen much, but those days seem far behind him now.`,
  `To $$BestFriend$'s surprise, you immediately start up a conversation, sure of yourself.`,
  `$$Ren$: "Are you the one they call..."`,
]);
