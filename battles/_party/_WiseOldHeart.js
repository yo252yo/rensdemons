new CenteredImage("assets/battles/civilians/priest.png", 'background');

PLAYER_ACTIONS.escape("Leave");

var final_desc = [
  `As you offer a helping hand, you're surprised to see the beggar refuse it. He snaps his fingers and a magic aura surrounds him. In a few seconds, his clothes are tidied up and the smell is gone. He adjusts his glasses and turns to you.`,
  `$$WiseOld$: "Well, you took long enough! What? Oh yeah, sorry. I've been waiting for you. My name is $$WiseOld$. I've been studying all my life to assist you, like my mentor before me, and his before him!"`,
  `$$WiseOld$: "Patience and preparation are key to success! Your quest is no small one! I won't let you go until you've completed your training!"`,
  `$$BestFriend$: "... You are crazy."`,
  `$$WiseOld$: "Crazy? Maybe. It doesn't matter. Only one thing matters in this world... It is you, Promised Child! Are you ready?"`,
  `$$Ren$: "I..."`,
  `$$WiseOld$: "No! Don't speak! I will be the judge of that. I will test you until I know for sure that you are up to Her holy ambitions for you."`,
  `$$Ren$: "Uh... Thanks?"`,
  `$$WiseOld$: "No! No thanks. This is simply my duty. I'm here to probe your heart, your body and your mind. You have helped a poor beggar against all odds. Your heart is good."`,
  `$$WiseOld$: "The next time you come to me, let us put your body on trial."`,
];

var unlock_food = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Offer food",
  unlock: true,
  description: final_desc,
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.increase("_wiseOldTraining", 1);
  },
});

var unlock_gold = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Offer money",
  unlock: true,
  description: final_desc,
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.increase("_wiseOldTraining", 1);
  },
});

var unlock_gaze = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Sustain gaze",
  unlock: true,
  description: [`A toothless smile dawns on the Odd Old Oaf's face and his eyes widen, as if he saw in you something surprising.`,
                `Beggar: "Hello there, my pretties! Alms! My pretties! Alms! For your heart!"`,
                `The way he looks at you is clearly unhealthy, a bit of drool runs down his mouth.`,
                `$$BestFriend$: "Ew... Creepy..."`,
              ],
  function: function(){
    unlock_food("Sustain gaze");
    unlock_gold("Sustain gaze");
    PLAYER_ACTIONS.escape("Refuse");
    PLAYER_ACTIONS.escape("Be scared");
  }
});

var unlock_approach2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Continue approaching",
  unlock: true,
  description: [`Suddenly, the Odd Old Oaf stops his animalistic behavior and looks at you straight in the eyes.`,
                `$$BestFriend$: "$$Ren$, I'm scared!"`,
              ],
  function: function(){
    unlock_gaze("Continue approaching");
    PLAYER_ACTIONS.escape("Run away");
  }
});

var unlock_approach = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Approach more",
  unlock: true,
  description: [`The Odd Old Oaf is basically barking now. The stench is unbearable.`,
                `$$BestFriend$: "Maybe we shouldn't bother him..."`,
              ],
  function: function(){
    unlock_approach2("Approach more");
    PLAYER_ACTIONS.escape("Give up");
  }
});

PLAYER_ACTIONS.add({
  name: "Approach",
  unlock: true,
  description: [`As you approach, the mumbling of the crazy Odd Old Oaf grows louder and more erratic. His smell begins to bother you.`,
              ],
  function: function(){
    unlock_approach("Approach");
    PLAYER_ACTIONS.escape("Turn away");
  }
});

// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `In the corner of the room stands an Odd Old Oaf. The eccentric elder is wearing the traditional garments of the Church, except his are torn to shreds and haven't been washed in a while. He seems quite disturbed, rocking slowly and muttering to himself.`
);
