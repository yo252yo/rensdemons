
new CenteredMovingImage("assets/characters/party/GeniusProdigy.png", 'background',32,48, 2);

PLAYER_ACTIONS.escape();
AUDIO.music.characters.GeniusProdigy();


var make_loss = function(from, name, text){
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [text, `$$GeniusProdigy$ seems a bit confused and disappointed, struggling to grasp the explanation behind your previous success and current failure.`],
    outcome: BATTLETREE.LOSS,
  });
  return f(from);
}


var reality = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Reality`,
  unlock: true,
  description: [
    `$$Ren$: "But those alternate versions of me... Are they real?"`,
    `$$GeniusProdigy$: "Well... I'd be lying if I said they didn't feel that way... But at least they don't feel like this for long, right?"`,
    `$$GeniusProdigy$: "Jokes aside, you may think of them as some sort of alternate universes. They never existed to begin with. Not in the way our does."`,
    `You wonder if this explanation really makes sense.`,
  ],
  outcome: BATTLETREE.NOTHING,
});

var future = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Future`,
  unlock: true,
  description: [
    `$$Ren$: "So, what then?"`,
    `$$GeniusProdigy$: "I'm a bit at a loss at the moment. I need to figure out an experimental protocol to clarify the nature of this knowledge transfer. I wonder if I could also learn more about alternate realities in the process... I don't know how much observational data will help, but I'm sure I'll figure out something in the long term."`,
    `$$Ren$: "Observational data? Long term?"`,
    `$$GeniusProdigy$: "Oh yeah sorry, I guess the proper social protocol is to ask? I don't really care, though, I'm coming with you whether you like it or not. I'm not about to let such an interesting subject escape me."`,
    `$$Ren$: "What? Oh ok."`,
    "$$GeniusProdigy$ joins your party!",
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    PARTY.add(PARTYMEMBERS.GeniusProdigy);
  },
});

var rejoice = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Rejoice`,
  unlock: true,
  description: [
    `$$GeniusProdigy$: "By the way, that means that absolutely nothing can stop you! Whatever trial you may face, you can just use brute force to try over and over again until you succeed! If my theory is correct, that is..."`,
    `$$BestFriend$: "You're asking $$Ren$ to die over and over again!"`,
    `$$GeniusProdigy$: "No, I'm promising $$Ren$ invulnerability!"`,
  ],
  function: function(){
    reality("Rejoice");
  },
});

var implications = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Implications`,
  unlock: true,
  description: [
    `$$BestFriend$: "Wait. Are you saying that $$Ren$ is dying countless times? It's horrible!"`,
    `$$GeniusProdigy$: "Yes and no. A version of... $$Ren$, was it? is dying every time. Probably a lot if I'm being honest. But in a sense, they are not real. The real one is the one right here, the one who survives..."`,
    `$$BestFriend$ is shocked and dismayed, while your head is spinning trying to make sense of all the ramifications.`
  ],
  function: function(){
    reality("Implications");
  },
});

var ask = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Ask`,
  unlock: true,
  description: [
    `$$Ren$: "So, what did you learn about me?"`,
    `$$GeniusProdigy$: "Basically, you're simply immortal. That's more or less your only power."`,
    `$$Ren$: "What do you mean?"`,
    `$$GeniusProdigy$: "So my hypothesis is that you're a normal human being. But every time something bad happens to you, the Goddess brings you back to life before you could make whatever mistake you did."`,
    `$$Ren$: "How does this explain anything?"`,
    `$$GeniusProdigy$: "It explains everything! I don't know how, yet, but you somehow keep some sort of foreknowledge of what lead to your death, which allows you to avoid it! I'm not sure how, yet. It's probably an artifact of whatever spell the Goddess uses to bring you back. I need to investigate this more."`,
    `$$GeniusProdigy$: "But it's nothing like time travel. You don't have memories of being in the future: it hasn't happened yet. You just... know what not to do."`,
    `$$Ren$: "Hmmm I think I understand."`,
  ],
  function: function(){
    implications(`Ask`);
    rejoice(`Ask`);
    future(`Ask`);
  },
});

var how = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `How`,
  unlock: true,
  description: [
    `$$Ren$: "How did you figure out all of this? Are you also connected to the Goddess?"`,
    `$$GeniusProdigy$: "No, none of this! You're the only Promised Child! I'm just trained in the art of reasoning and critical thinking. I make observations, extrapolate hypotheses, test them, and that allows me to develop models to predict reality!"`,
    `$$Ren$: "I'm not sure I understand everything you just said, but you have a way to deduce things by looking carefully, right?"`,
    `$$GeniusProdigy$: "That's the gist of it!"`,
    ],
  outcome: BATTLETREE.NOTHING,
});

var dodge = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Clues`,
  unlock: true,
  description: [
    `$$Ren$: "That was not very nice."`,
    `$$GeniusProdigy$: "Sorry, but I know you would dodge. See, I too know stuff that seems impossible."`,
    `He laughs at the irony of the situation.`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    BATTLE.monster_actions.empty();
    how(`Clues`);
    ask(`Clues`);
  },
});


var attack = {
  attack_amplitude: 0.9,
  warning_time_s: 0.01,
  react_time_s: 2,
  variability: 0, // 1 = 100%
};


var artifact = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Clues`,
  unlock: true,
  description: [
    `$$Ren$: "There's clues to open the other door."`,
    `$$GeniusProdigy$ smiles.`,
    `$$GeniusProdigy$: "Indeed. Exactly. I think I've figured it out. I just have one last thing I want to try."`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    BATTLE.monster_actions.add_textual(`$$GeniusProdigy$ jumps on you and unsheathe a dagger in a quick gesture.`, attack);
    dodge('Clues');
  },
});


var mole = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Mole`,
  unlock: true,
  description: [
    `$$Ren$: "Not much, there's a mole that's about to come crawling in, over there..."`,
    `You point to a corner of the cave. A few moments later, the event you predicted comes to pass. The mole crawls slowly inside the cavern. $$BestFriend$ is very surprised, but $$GeniusProdigy$ looks like he expected it.`,
    `$$GeniusProdigy$: "Impressive. All according to my predictions."`,
    `He spends a few more moments thinking.`,
    `$$GeniusProdigy$: "Ok, tell me what's beyond this metal door that the ancients created here?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);

    make_loss("Mole", "Survivors", [`$$GeniusProdigy$ obviously knows something about this place that you don't. He shakes his head in disapproval.`]);
    make_loss("Mole", "A chasm", [`$$GeniusProdigy$ obviously knows something about this place that you don't. He shakes his head in disapproval.`]);
    make_loss("Mole", "A slime nest", [`$$GeniusProdigy$ obviously knows something about this place that you don't. He shakes his head in disapproval.`]);
    make_loss("Mole", "Treasures", [`$$GeniusProdigy$ obviously knows something about this place that you don't. He shakes his head in disapproval.`]);

    artifact("Mole");
  },
});

var nothing = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Nothing`,
  unlock: true,
  description: [
    `$$Ren$: "Nothing special, really..."`,
    `$$GeniusProdigy$: "Come on! Please find something, even the smallest thing is ok, it's a simple test!"`,
    `$$GeniusProdigy$: "I understand that not much will happen in this cave... Unless your powers also includes attracting monsters and inviting chaos?"`,
    `He ended this last sentence with a mysterious smile, as if he knew something you did not.`,
    ],
  outcome: BATTLETREE.NOTHING,
});

var admit = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Admit",
  unlock: true,
  description: [
    `$$Ren$: "No, none of that."`,
    `$$BestFriend$: "We're learning magic, though!"`,
    `$$Ren$: "Yes, but anyone can do that."`,
    `$$GeniusProdigy$: "That makes sense... I think I'm starting to understand your situation."`,
    `$$Ren$: "Are you? I'm not."`,
    `$$GeniusProdigy$: "Don't worry about it."`,
    `$$GeniusProdigy$ looks around.`,
    `$$GeniusProdigy$: "Can you tell me something that's about to happen in this cavern?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);

    make_loss("Admit", "Cave-in", [`$$Ren$: "The ceiling is about to collapse."`, `$$GeniusProdigy$ looks doubtful, but humors you. You spend a few minutes waiting expectantly, but nothing happens, apart from a mole crawling slowly in a corner.`]);
    make_loss("Admit", "Slime", [`$$Ren$: "We'll be attacked by slimes!"`, `$$GeniusProdigy$ looks doubtful, but humors you. You spend a few minutes waiting expectantly, but nothing happens, apart from a mole crawling slowly in a corner.`]);
    make_loss("Admit", "Earthquake", [`$$Ren$: "The ground is about to shake!"`, `$$GeniusProdigy$ looks doubtful, but humors you. You spend a few minutes waiting expectantly, but nothing happens, apart from a mole crawling slowly in a corner.`]);
    nothing("Admit");
    mole("Admit");
  },
});

var admit2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Explain",
  unlock: true,
  description: [
    `$$Ren$: "It doesn't work like that, I can't do those things..."`,
    `$$GeniusProdigy$: "I see. Interesting."`,
    `$$GeniusProdigy$: "It seems rather information-based. Do you have weird powers, like... can you go through this wall, or teleport?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    make_loss("Explain", "Teleport", [`You try to teleport, but it's not one of your powers! $$GeniusProdigy$ laughs as you comically clench your fists.`]);
    make_loss("Explain", "Pass through wall", [`You run towards the wall and violently hurt your face on the stone. You fall back on the ground, losing your balance.`]);
    make_loss("Explain", "Levitate", [`You attempt to levitate, but it's not something you can do! $$GeniusProdigy$ watches you, perplexed, while you do nothing.`]);
    admit("Explain");
  },
});

var timetravel = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Time travel",
  unlock: true,
  description: [
    `$$Ren$: "It's kind of like time travel, I guess? I somehow see everything that could happen. I saw you telling me the number you were thinking of."`,
    `$$GeniusProdigy$ ponders this answer.`,
    `$$GeniusProdigy$: "That's amazing! Can you go to the future? Or go back and change the past?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    make_loss("Time travel", "Go to the past", [`You are about to time travel when you suddenly remember that you cannot do that. You stand in the middle of the cavern, not knowing what to do, while $$GeniusProdigy$ looks at you expectantly. Nothing happens.`]);
    make_loss("Time travel", "Go to the future", [`You are about to time travel when you suddenly remember that you cannot do that. You stand in the middle of the cavern, not knowing what to do, while $$GeniusProdigy$ looks at you expectantly. Nothing happens.`]);
    admit2("Time travel");
  },
});

var knowledge = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Sixth sense",
  unlock: true,
  description: [
    `$$Ren$: "It's some sort of intuition. I know things and perceive things that are hidden from others. It only works in very specific settings."`,
    `$$GeniusProdigy$ ponders this answer.`,
    `$$GeniusProdigy$: "It seems rather information-based. Do you have weird powers, like... can you go through this wall, or teleport?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    make_loss("Sixth sense", "Teleport", [`You try to teleport, but it's not one of your powers! $$GeniusProdigy$ laughs as you comically clench your fists.`]);
    make_loss("Sixth sense", "Pass through wall", [`You run towards the wall and violently hurt your face on the stone. You fall back on the ground, losing your balance.`]);
    make_loss("Sixth sense", "Levitate", [`You attempt to levitate, but it's not something you can do! $$GeniusProdigy$ watches you, perplexed, while you do nothing.`]);
    admit("Sixth sense");
  },
});

var helper = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Helper",
  unlock: true,
  description: [
    `$$Ren$: "It's very religious, really. It's like someone is whispering in my mind the good thing to do or the right answer."`,
    `$$GeniusProdigy$ ponders this answer.`,
    `$$GeniusProdigy$: "It seems rather information-based. Do you have weird powers, like... can you go through this wall, or teleport?"`,
  ],
  function: function(){
    make_loss("Helper", "Teleport", [`You try to teleport, but it's not one of your powers! $$GeniusProdigy$ laughs as you comically clench your fists.`]);
    make_loss("Helper", "Pass through wall", [`You run towards the wall and violently hurt your face on the stone. You fall back on the ground, losing your balance.`]);
    make_loss("Helper", "Levitate", [`You attempt to levitate, but it's not something you can do! $$GeniusProdigy$ watches you, perplexed, while you do nothing.`]);
    admit("Helper");
  },
});




var ooe = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "108",
  unlock: true,
  description: [
    `$$GeniusProdigy$: "Pretty impressive..."`,
    `$$BestFriend$: "So is it like... you can read minds?"`,
    `$$Ren$: "No, not really, it's more..."`,
    `$$GeniusProdigy$: "Tell me, what does it feel like?"`,
  ],
  function: function(){
    timetravel("108");
    knowledge("108");
    helper("108");
  },
});


var think = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Think",
  unlock: true,
  description: [
    `You think about it.`,
  ],
  extra_function: function() {
    var trueName = DICTIONARY.get("GeniusProdigy");
    var answer = prompt(`What number is ${trueName} thinking of?`);
    if(answer != 108){
      make_loss("Think", answer, [`$$GeniusProdigy$: "No... I was thinking of 108..."`]);
    }

    ooe("Think");
    if(answer != 108){
      BATTLETREE.api.lock("_party/_GeniusProdigy2", "108");
    }
  }
});

var apple = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Apple",
  unlock: true,
  description: [
    `$$GeniusProdigy$'s smile intensifies. $$BestFriend$ looks at you between surprised and jealousy.`,
    `$$BestFriend$: "Do you know this guy?"`,
    `$$Ren$: "No, it's all coming from the Goddess!"`,
    `$$GeniusProdigy$: "The Goddess..."`,
    `$$GeniusProdigy$: "Okay, so you know stuff about the world. What else can you do? Can you like... tell me what number I'm thinking of?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    think("Apple");
  }
});


PLAYER_ACTIONS.add({
  name: "Start",
  unlock: true,
  description: [
    `$$Ren$: "Let's go!"`,
    `$$GeniusProdigy$: "Ok so you found out my name. Do you know anything else about me? Like... what's my favorite food?"`,
  ],
  function: function(){
    make_loss("Start", "Pizza", [`$$GeniusProdigy$: "What on earth is that?"`]);
    make_loss("Start", "Cheese", [`$$GeniusProdigy$: "Sorry, no..."`]);
    make_loss("Start", "Beef", [`$$GeniusProdigy$: "Wrong!..."`]);
    apple("Start");
  }
});



// ===================
// =================== START
// ===================
BATTLE.operations.start([
  `$$GeniusProdigy$ wants to use you as a test subject.`,
  `$$GeniusProdigy$: "Come on, it'll be super informative for both of us. This might be the greatest day in my life!"`,
]);
