
new CenteredMovingBattleImage("assets/characters/party/WiseOld.png", 'background',32,48, 2);

PLAYER_ACTIONS.escape("Give up");
AUDIO.music.characters.WiseOld();

var battle = "_party/_WiseOldMind";
var wrong_answer = [`$$WiseOld$: "Sadly, this is not the answer we are looking for."`];


var unlock_hire = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Graduate",
  unlock: true,
  description: [
    `$$BestFriend$: "Those were very weird questions... and very specific answers, on your first try! Did the Goddess give you the answers? Or did he just agree with whatever you'd say?"`,
    `$$Ren$: "A bit of both, I suppose."`,
    `$$WiseOld$: "You have the official blessing of the Church of $$town_2$ to go hunt $$demon_lord$. I trust you've talked to the head priest about the artifact? If not, you should go right now!"`,
    `$$WiseOld$: "In any case, now that your training is done, nothing binds me here. I am your humble servant. I've studied my whole life to assist you. I believe my knowledge could be of use on your journey. Please allow me to accompany you!"`,
    "$$WiseOld$ JOINS YOUR PARTY!",
  ],
  extra_function: function(){
    PARTY.add(PARTYMEMBERS.WiseOld);

    BATTLE.monster_actions.make_unique(
      function() {
        PARTY.changeNickname(PARTYMEMBERS.WiseOld, undefined, BATTLE.operations.win);
      }
    );
  },
});

var functions_dictionary = {
  "Begin": {
    question: "What are you feeling now?",
    function: function() {
      make_quiz_answers("Begin", ["Joy", "Excitement", "Determination", "Calm", "Serenity", "More than I should"]);
    }
  },
  "More than I should": {
    question: "And what are emotions?",
    function: function() {
      make_quiz_answers("More than I should", ["Passions of the soul", "Divine inspiration", "Fleeting thoughts", "My identity"]);
    }
  },
  "Fleeting thoughts": {
    question: "Who is having those thoughts?",
    function: function() {
      make_quiz_answers("Fleeting thoughts", ["Me", "Nobody", "The Goddess", "The world"]);
    }
  },
  "Nobody": {
    question: "Exactly. Never forget: thoughts and emotions exist. You are not them, nor are they you. You don't own them, nor do they own you. They are just passing through you. But wait, who are you?",
    function: function() {
      make_quiz_answers("Nobody", [DICTIONARY.get(PARTYMEMBERS.Ren), "A soul controlling a puppet", "Me ", "An otherworldly being", "An illusion"]);
    }
  },
  "An illusion": {
    question: "Yes, an important one. The most important one. But there is no such thing as 'you', since you keep changing and growing. So tell me, are you ready?",
    function: function() {
      make_quiz_answers("An illusion", ["Yes", "I think so", "As can be", "I will never be", "You tell me"]);
    }
  },
  "As can be": {
    question: "Well... I think that's a wise enough answer.",
    function: function() {
      unlock_hire("As can be");
    }
  },
};


var make_quiz_answers = function(action_name, answers) {
  BATTLE.player_actions.empty(true);
  for (var answer of answers){
    if (functions_dictionary[answer]){
      var f = functions_dictionary[answer];
      var unlock_answer = PLAYER_ACTIONS.function.unlock_replacing_action({
        name: answer,
        unlock: true,
        description: [`$$WiseOld$: "${f.question}"`],
        function: function(){
          BATTLE.player_actions.empty(true);
          f.function();
        }
      });
    } else {
      var unlock_answer = PLAYER_ACTIONS.function.unlock_replacing_action({
        name: answer,
        unlock: true,
        description: wrong_answer,
        outcome: BATTLETREE.LOSS,
      });
    }
    unlock_answer(action_name);
  }
}

var action_name = "Begin";
PLAYER_ACTIONS.add({
  name: action_name,
  unlock: true,
  description: [`$$WiseOld$: "${functions_dictionary[action_name].question}"`],
  function: function(){
    functions_dictionary[action_name].function();
  }
});

// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `$$WiseOld$: "The final trial is the trial of the mind. You will have to answer my questions."`,
);
