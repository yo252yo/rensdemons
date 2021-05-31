// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/child_m.png", 'background');
AUDIO.music.characters.PreciousChild();

PLAYER_ACTIONS.escape("Stop talking");

var bf = DICTIONARY.get(PARTYMEMBERS.BestFriend);

var unlock_side_pc = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Side with ${DICTIONARY.get(PARTYMEMBERS.PreciousChild)}`,
  unlock: true,
  outcome: BATTLETREE.WIN,
  description: [`$$Ren$: "Come on, $$BestFriend$. I'm sure that if we tell him no, he'll just follow us by himself, and that would be even more dangerous..."`,
                `$$BestFriend$: "I guess you're right. There's no keeping you out of danger, so you'll be safer in my sight, I suppose."`,
                `$$PreciousChild$: "Yaay!"`,
                `$$PreciousChild$ and you exchange a happy glance. `,
                `$$BestFriend$: "You better stay out of danger and do everything I tell you!"`,
                `$$PreciousChild$: "Yes, I promise! I'll be good!"`,
                `$$BestFriend$: "If not, we'll just feed you to the monsters!"`,
                `$$PreciousChild$: "Nooo! I'll be good, I swear! I'll help and I won't do anything bad!"`,
                "$$PreciousChild$ joins your party!",
                ],
  extra_function: function(){
    PARTY.add(PARTYMEMBERS.PreciousChild);
  },
});

var unlock_side_bf = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Side with ${bf}`,
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "I'm sorry, $$PreciousChild$, you're just too young."`,
                `$$PreciousChild$: "But..."`,
                `$$Ren$: "If I'm worried about you, I won't be able to protect $$BestFriend$ with all my strength. You don't want that, do you?"`,
                `$$PreciousChild$: "No, you're right... Good luck then, but you better come back fast! And take good care of $$BestFriend$!"`,
                ],
});

var unlock_accept = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Accept`,
  unlock: true,
  description: [`$$Ren$: "Maybe..."`,
                `$$BestFriend$: "Absolutely not! It's way too dangerous!"`,
                `$$BestFriend$ seems really opposed to the idea.`,
                ],
  function: function() {
    unlock_side_pc("Accept");
    unlock_side_bf("Accept");
   },
});


var unlock_refuse = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Refuse`,
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "I'm sorry, $$PreciousChild$, you're just too young."`,
                `$$PreciousChild$: "But..."`,
                `$$Ren$: "If I'm worried about you, I won't be able to protect $$BestFriend$ with all my strength. You don't want that, do you?"`,
                `$$PreciousChild$: "No, you're right... Good luck then, but you better come back fast! And take good care of $$BestFriend$!"`,
                ],
});


var unlock_silence = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Stay silent",
  unlock: true,
  description: [`After a moment, $$PreciousChild$ looks at you with determination.`,
                `$$PreciousChild$: "I'm coming with you! I have to protect $$BestFriend$!"`,
                `$$Ren$: "It's too risky, there's gonna be so much danger."`,
                `$$PreciousChild$: "I don't care, I'm coming!"`,
                ],
  function: function() {
    unlock_accept("Stay silent");
    unlock_refuse("Stay silent");
   },
});

var unlock_protect = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Protect ${bf}`,
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "Don't worry, I'll protect $$BestFriend$ with my own life!"`,
                `$$BestFriend$: "And I'm sure it won't come to that. We have the Goddess on our side, after all."`,
                `$$BestFriend$ winks at $$PreciousChild$. You can tell that his worry is slightly eased, but some uneasiness remains in his gaze.`,
                `$$PreciousChild$: "I suppose you're right. I trust the two of you, but please, be careful."`,
                `$$Ren$: "We will. And we'll be back in no time!"`,
                `$$PreciousChild$: "You better be!"`,
                ],
});


var unlock_bestFriend = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: bf,
  unlock: true,
  description: [`$$PreciousChild$: "What about $$BestFriend$?"`,
                `$$BestFriend$: "I'm going with $$Ren$. Sorry, $$PreciousChild$, but you'll have to manage on your own for a bit..."`,
                `$$PreciousChild$ looks at the two of you, stunned. You can imagine that a lot is going through his head.`,
                ],
  function: function() {
    unlock_silence(bf);
    unlock_protect(bf);
   },
});

var unlock_joinQuest = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Invite",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$PreciousChild$: "Can I come with you?"`,
                `$$Ren$: "I'm not sure, it's going to be a dangerous adventure..."`,
                `$$PreciousChild$: "I don't care, I want to come!"`,
                `$$BestFriend$: "No way, that's out of the question. You're way too young to leave town!"`,
                `$$PreciousChild$: "But..."`,
                `$$Ren$: "Sorry, $$PreciousChild$. $$BestFriend$ is right. Fighting the armies of $$demon_lord$ is too dangerous..."`,
                `$$PreciousChild$ turns away, sulking. You can tell he's holding back tears.`
                ],
});

var unlock_cheerup = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Cheer up",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "Don't worry! I'll come back in no time."`,
                `$$PreciousChild$: "Do you promise?"`,
                `$$Ren$: "Of course!"`,
                `$$PreciousChild$: "Then I believe you! Go kick $$demon_lord$'s ass! I'll be waiting for you!"`,
                `$$Ren$: "With this kind of support, nothing can stop me! Thanks $$PreciousChild$!"`,
                ],
});

var unlock_doubt = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Confess",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "You know... I'm not sure I'm up to the task. How can I take down the mighty $$demon_lord$?"`,
                `$$PreciousChild$: "Don't worry, $$Ren$. If anyone can do it, you can. Even the Goddess said so! I believe in you!"`,
                `$$Ren$: "Thanks, it means a lot. Now I kinda have to succeed, don't I? I don't want to let you down..."`,
                `$$PreciousChild$: "That's impossible! I believe in you!"`,
                `$$Ren$: "Thanks, I'll make you proud!"`,
                ],
});

var unlock_promise = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Promise",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "I promise you, I'll take down $$demon_lord$, and I'll make the world a better place. For everybody's sake, but mostly for you!"`,
                `$$PreciousChild$ blushes and smiles.`,
                `$$PreciousChild$: "Oh, $$Ren$, thank you. I'm sure you'll win! I'll be praying for you!"`,
                ],
});

var unlock_future = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Future",
  unlock: true,
  description: [`$$Ren$: "You know, $$PreciousChild$, finishing the Trial means that things are going to change..."`,
                `$$PreciousChild$: "I know! You're a hero now! You're the Promised Child!"`,
                `$$Ren$: "Yes, but it also means I'll be going away for some time..."`,
                `$$PreciousChild$: "Oh..."`,
                `An expression of worry clouds the bright face of the upbeat child.`
                ],
   function: function() {
     unlock_bestFriend("Future");
     unlock_cheerup("Future");
     unlock_doubt("Future");
     unlock_promise("Future");
     unlock_joinQuest("Future");
    },
});

PLAYER_ACTIONS.add({
  name: "Reassure",
  unlock: true,
  description: [`$$PreciousChild$: "So about the Trial, how did it go?"`,
                `$$Ren$: "It went fine. I passed."`,
                `$$PreciousChild$: "Really? That's so cool!"`,
                `The child's eyes shine with genuine excitement. He probably doesn't understand everything that the Trial implies.`,
                ],
  function: unlock_future,
});

var unlock_refuse = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Refuse to join",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`You refuse politely his proposal.`,
                `$$Ren$: "Sorry, I don't really have time now."`,
                `Disappointment is visible on the child's face, but it only lasts for a second.`,
                `$$PreciousChild$: "That's ok, I understand. Good luck!"`,
                `No sooner had $$PreciousChild$ finished talking than he was already running off in the distance.`,
                ],
});

var unlock_join = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Join in",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "Sure!"`,
                `You spend hours looking all over the village for rocks with interesting shapes. It's a lot of fun, but you're not sure the Goddess would approve. At the end of the day, you each chose your favorite rock and decide to keep it with you in memory of this day. You bury the rest in a place where they will be safe from thieves and pirates.`],
});

PLAYER_ACTIONS.add({
  name: "Enquire",
  unlock: true,
  description: [`$$Ren$: "What are you doing?"`,
                `$$PreciousChild$: "I'm playing Adventurers! I'm looking for precious stones, do you wanna help?"`,
                ],
  function: function() {
    unlock_refuse("Enquire");
    unlock_join("Enquire");
  },
});


// ===================
// =================== START
// ===================
BATTLE.operations.start("$$PreciousChild$ is playing in the streets. As soon as he notices you, a smile illuminates his face and he rushes towards you.");
