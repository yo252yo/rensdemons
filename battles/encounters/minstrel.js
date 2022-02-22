// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('encounters/minstrel');

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.add({
  name: "Kill",
  outcome: BATTLETREE.LOSS,
  unlock: true,
  description: ["Scared by the appearance of this peculiar character, you decide to be cautious and get rid of the stranger before he does anything bad to you.",
                "However, it appears soon that not only was he innocent, he was a beloved minstrel in all the kingdom. Your act gets you shunned by all of mankind, and you finish your days in solitude and regret."],
});

PLAYER_ACTIONS.add({
  name: "Don't listen",
  outcome: BATTLETREE.ESCAPE,
  unlock: true,
  description: ["You politely refuse to hear a story from the traveling bard and decide to get on your way."],
});

PLAYER_ACTIONS.add({
  name: "Question",
  outcome: BATTLETREE.NOTHING,
  unlock: true,
  description: [
      `$$Ren$: "Who are you?"`,
      `Bard: "I am the Bard Who Tells The Stories Of Those Who Cannot Tell Their Own Stories."`,
      `Bard: "Do you want to hear one of my stories?"`,
    ],
});
var seed = Math.random();
var tip = Math.min(10, INVENTORY.cash());
PLAYER_ACTIONS.add({
  name: "Listen",
  unlock: (seed >= 0 && seed < 0.165),
  description: [
    "He tells you the story of a young child whose best friend is chosen as a sacrifice to save the world. The child pretends to be supportive and enthusiastic about this calling, but deep down resents the whole world for putting a forced end to their peaceful days of playing together.",
    "You feel that the moving story helps you grows and give you new insights about the world (10 xp). "
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.increase(ITEM.XpToken, 10);
  }
});

PLAYER_ACTIONS.add({
  name: "Listen ",
  unlock: (seed >= 0.165 && seed < 0.330),
  description: [
    "He tells you the story of a young child whose best friend leaves their village to go save the world. The child decides to follow the friend's wish, even without sharing it. There is not a single day where the child does not miss the little village they left, but it is a small price to pay to keep spending time together.",
    `Moved by the story, you end up tipping the storyteller ${tip} Coins.`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.decrease(ITEM.Coin, tip);
  }
});

PLAYER_ACTIONS.add({
  name: "Listen  ",
  unlock: (seed >= 0.330 && seed < 0.495),
  description: [
    "He tells you the story of a mother whose child was drafted in an important mission that might save the world. In public, she insisted how proud and glad she was of this honor. But every night, she cried herself to sleep knowing very well that this was most likely a suicide mission.",
    "You feel that the moving story helps you grows and give you new insights about the world (10 xp). "
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.increase(ITEM.XpToken, 10);
  }
});

PLAYER_ACTIONS.add({
  name: "Listen   ",
  unlock: (seed >= 0.495 && seed < 0.660),
  description: [
    "He tells you the story of a mother whose child left home to go make the world a better place. Every day, she would pray for her child's safety and swift return. But deep in her heart, she admired her child for being brave enough to face the unknown.",
    `Moved by the story, you end up tipping the storyteller ${tip} Coins.`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.decrease(ITEM.Coin, tip);
  }
});

PLAYER_ACTIONS.add({
  name: "Listen    ",
  unlock: (seed >= 0.660 && seed < 0.825),
  description: [
    "He tells you the story of a little child who was chosen by the gods to do wonders. The child was given gifts and riches beyond the dreams of any human. But the child resented the gods and their gifts, wanting only a simple happy uneventful life.",
    "You feel that the moving story helps you grows and give you new insights about the world (10 xp). "
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.increase(ITEM.XpToken, 10);
  }
});

PLAYER_ACTIONS.add({
  name: "Listen     ",
  unlock: (seed >= 0.825 && seed < 0.990),
  description: [
    "He tells you the story of a little child who gave everything to the gods. Never was there a child as pious in all of the kingdom. The gods never gave the child more than anyone else, but the child was so humble and thankful that it was more than enough to attain complete bliss.",
    `Moved by the story, you end up tipping the storyteller ${tip} Coins.`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.decrease(ITEM.Coin, tip);
  }
});


PLAYER_ACTIONS.add({
  name: "Listen      ",
  unlock: (seed >= 0.990),
  description: [
    "He tells you the story of a humble storyteller who vowed to give a voice to the people who had none. He travelled around the kingdom, memorizing the story of everyone he came accross, and spreading those tales everywhere he went.",
    `One day, his path crossed the one of a naive child, who was more inquisitive than the rest. The child asked the storyteller about himself, and how he came to travel the world.`,
    `The storyteller could not tell his own story, for he swore to only tell the story of the people who could not tell it themselves. But this very fact qualified him to tell his own story.`,
    `He pondered the question for a while, and thanked the child for this riddle. They agreed together that no solution could ever be found, and they decided to move past it.`,
    `This was the most interesting encounter the storyteller ever had. As thanks for this stimulation, the storyteller gave the child 100 Coins.`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.increase(ITEM.Coin, 100);
  }
});



// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("encounters/minstrel"));
