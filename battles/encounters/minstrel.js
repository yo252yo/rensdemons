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

// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("encounters/minstrel"));
