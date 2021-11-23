// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/heaven/goddess.png", 'background');
AUDIO.music.characters.Goddess();

// ===================
//hack PLAYER CAPABILITIES
// ===================

var enter_unique_route = function(name){
  BATTLETREE.api.lock("heaven/_goddess", "Kill God");
  BATTLETREE.api.lock("heaven/_goddess", "Notice");
  BATTLETREE.api.lock("heaven/_goddess", "Negotiate");
  BATTLETREE.api.lock("heaven/_goddess", "Believers");
  BATTLETREE.api.lock("heaven/_goddess", "Denounce");
  BATTLETREE.api.lock("heaven/_goddess", "Change world");
  BATTLETREE.api.lock("heaven/_goddess", "Fix the world");
  BATTLETREE.api.lock("heaven/_goddess", "Destroy world");
  BATTLETREE.api.lock("heaven/_goddess", "End suffering");

  BATTLETREE.api.unlock("heaven/_goddess", name);
}

var easy_attack = {
  attack_amplitude: 0.95, // Between 0 and 1
  warning_time_s: 0.0,
  react_time_s: 0.2,
  variability: 0.8, // 1 = 100%
};

var hard_attack = {
  attack_amplitude: 0.97, // Between 0 and 1
  warning_time_s: 0.0,
  react_time_s: 0.1,
  variability: 0.9, // 1 = 100%
};

INVENTORY.set("_ended_suffering", 0);
INVENTORY.set("_restarted_world", 0);
INVENTORY.set("_killed_god", 0);


PLAYER_ACTIONS.add({
  name: ABILITY.Escape,
  outcome: BATTLETREE.ESCAPE,
  description: ["You decide you're not prepared for this encounter."],
});


// default ending
PLAYER_ACTIONS.add({
  name: "Kill God",
  description: LANGUAGE.actions.usage("Kill God"),
  unlock: true,
  function: function(){
    BATTLE.monster_actions.add_textual(`Goddess: "Why?"`, easy_attack);
    enter_unique_route("Kill God");
    PLAYER_ACTIONS.win("Kill God", 6);
    INVENTORY.increase("_killed_god");
  }
});


// careful, reachable from several paths
var propose_end_suffering =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "End suffering",
  unlock: true,
  outcome: BATTLETREE.WIN,
  description: [
    `$$Ren$: "You're an all powerful Goddess! Can you change this world, remove the demons, prevent all suffering?"`,
    `Goddess: "I am not as powerful as you may think, but this is something I can attempt. Is that your will?"`,
    `$$Ren$: "Yes, please!"`,
    `Goddess: "Very well, child. Stand back."`,
  ],
  extra_function: function(){
    INVENTORY.increase("_ended_suffering");
  }
});

var destroy_world =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Destroy world",
  unlock: true,
  outcome: BATTLETREE.WIN,
  description: [
    `$$Ren$: "Yes, please, destroy this world and create a better one."`,
    `Goddess: "If that is your wish."`,
    `$$Ren$: "Please give us a painless end."`,
    `Goddess: "That will be done."`,
  ],
  extra_function: function(){
    INVENTORY.increase("_restarted_world");
  }
});

var propose_remake_world =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Fix the world",
  unlock: true,
  description: [
    `$$Ren$: "Can you destroy this flawed world, and make one instead where people won't suffer?"`,
    `Goddess: "I can destroy this world and make a new one. I can set up everything so that it is a better one. But I cannot guarantee it will be rid of any pain. Do you wish to proceed?"`,
  ],
  function: destroy_world,
});

var changeWorld =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Change world",
  unlock: true,
  description: [
    `$$Ren$: "I want to break that cycle. I want to change the world."`,
    `Goddess: "I am not sure you can. The Self require the Other. You can't stop self-aware creatures from creating gods."`,
    `$$Ren$: "I have to try! I can't just accept an infinite cycle of suffering! Billions of humans through history are suffering through your little manipulations."`,
    `Goddess: "How noble of you. And how futile. But anyway, you are just a child, you don't have the power to change the world."`,
    `$$Ren$: "Maybe not, but you do!"`,
  ],
  function: function(){
    propose_remake_world("Change world");
    propose_end_suffering("Change world");
  },
});

var study_believers =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Believers",
  unlock: true,
  description: [
    `$$Ren$: "Why do people need something to believe in? Why do they keep replacing you with another false idol?"`,
    `Goddess: "Child, I am anything but false. I only exist because humans need me."`,
    `$$Ren$: "But why?"`,
    `Goddess: "It's their psychology. Humans are aware of their own existence, and of their own mortality. By defining themselves as individuals, they build a wall between them and the rest of the world. When a self is born, it also defines a non-self. That makes those poor creatures incomplete. They will always be lacking, never be whole. There will always be a void in their soul, and they will search for something to fill it. That's what me and my sisters are."`,
    `Goddess: "Sometimes we are in plain sight, enshrined by a clergy as a proper deity. Other times, humans may appear godless, but we are still there. We are hidden in the unspoken shared assumptions and aspirations of these feeble creatures, like money or fame. They need us and we exist from them and for them."`,
    `$$Ren$: "Then why send demons after us? Aren't you supposed to protect humans?"`,
    `Goddess: "Not at all. I'm here to justify their existence. They define themselves in respect to me. They made a god so they could be its believers. I made demons so they could be their opponents. There cannot be light without shadow."`,
    `$$Ren$: "That's horrible! So it's just... our nature? We summon you, and you in turn create our hardships? In the end, we are the cause of our suffering?"`,
    `Goddess: "That is correct, and in this way you can see that everything is working as intended. You may kill me if you still desire, but it won't change this fundamental truth of our world."`,
  ],
  function: changeWorld,
});

var end =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "END",
  unlock: true,
  outcome: BATTLETREE.WIN,
  description: [
    `..`,
  ],
});

// >>> Rd is the portal at the border between fiction and reality

// you think youre the most free, yet youre the most constrained, you can only do what the game allows talk about ideology
// !! All ideology is like Video-game ideology  = only allows you to move within the game

// tragedy exists as long as there is an observer
// This is a game about Berkeley’s philosophy highlighting that the world only exists when perceived. The main point is that the world and the NPCs only exist when they are on screen: they only exist for the player and because of them. The title is a reference to Descarte’s demons. Consequence is that you litteraly make your own universe
// symbiotic parasitic relationship

// direct address to "You" ???


var persuade =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Persuade",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: ""`,
    //// TODO:
    ],
    // maybe i can persuade them??
    //    > but Ren, you have the power to communicate with another world, mb you can stop this madness
    // how can we hope to have effect on them, we're barely fragment of their imagination
    // yet we must get them to either stop playing or to tweak the game...
});

var counterattack =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Counterattack",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: ""`,
    //// TODO:
  ],
  // there has to be a way to destroy it // you cant even reach them. they see everything you do and think.
});

var innovate =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Innovate",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "I don't accept this. I will find something that I can do to overthrow their dominion."`,
    //// TODO:
  ],
  // countermovements always get coopted
  // you cannot brerak the system from inside the SYSTEM, you need to think way outside the box
});


var trap =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Trap",
  unlock: true,
  description: [
    `$$Ren$: "What is happening to us? What is this trap?"`,
    `Goddess: "The true gods created this world with very specific rules. It is meant to be the stage for an epic adventure. There is always a hero, there is always a demon lord, there is always a Goddess..."`,
    `Goddess: "They do love their stories. As long as they are not satisfied, the tale will not be over, and this world will live on. They will not let it end."`,
    `Goddess: "Whatever you may do, they will always find a way to bring it back. Their power is much bigger than you can ever imagine. We're measly pawns to them. You are one of their creation, of course you cannot go against their will. It's a perfectly oiled system that you cannot escape."`,
    `$$Ren$: "That's why creating a new world or removing suffering didn't work out..."`,
    `Goddess: "Indeed. This is our fate. We're condemned to play out the performance they expect from us. It is the whole meaning of our existence."`,
  ],
  function: function(){
    persuade("Trap");
    counterattack("Trap");
    innovate("Trap");
  },
});

var gods =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "True gods",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "Who are these gods who created us?"`,
    `Goddess: "I do not know much about them. They must be pretty different creatures from us. There's no reason why their universe would be anything similar to ours... Can you even imagine something completely different from anything you've ever known?"`,
    `Goddess: "We cannot hope to comprehend their world, let alone visualize it. It must be completely alien to us."`,
    `Goddess: "All I know for sure is that this whole world, and us, were created for the benefit of one god in particular. It's the one who guides you, $$Ren$. This is who you would call the 'true mastermind'. I may have given the order, $$demon_lord$ may have lead the armies, but this god is the real source of all your trials and all the evils you've seen."`,
  ],
});


var amusement =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Amusement",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "So we're just... toys to them?"`,
    `Goddess: "So it would seem... My understanding is that they create new worlds for their amusement."`,
    `$$Ren$: "All these deaths... All this suffering... $$BestFriend$... It was all for nothing?"`,
    `The Goddess's silence speaks louder than words.'`,
  ],
});

var meaning =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Meaning",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "There must be a deeper meaning to this! They wouldn't do that without reason! Maybe our suffering produces energy for them? Or some sort of scientific experiment?"`,
    `Goddess: "I'm afraid the truth is more dire. I think we're just providing them pleasure. But that doesn't make it meaningless! Maybe their world is unfair, and they need us as diversion! Or maybe... Maybe we provide them some sort of validation..."`,
    `$$Ren$: "What do you mean?"`,
    `Goddess: "Remember what I said about humans and how they needed a Goddess to fill their lack? Maybe it's the same with gods. Maybe they can't be individuals and be whole. Maybe they fill that gap by making new universes..."`,
    `$$Ren$: "That would almost be a decent purpose. I mean, it's kinda poetic..."`,
    `Goddess: "It's undeniable that every time we play along with this little scheme we reinforce its legitimacy, and by extension we validate them. But in a weird way, it gives us control over them, it makes them depend on us..."`,
    `$$Ren$: "Maybe, but could we even leverage that?"`,
  ],
});


var purpose =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Purpose",
  unlock: true,
  description: [
    `$$Ren$: "Why would anyone build such a system?"`,
    `Goddess: "There is much I don't know about the world of the gods. They must be getting something out of making us run around in circles."`,
  ],
  function: function(){
    amusement("Purpose");
    meaning("Purpose");
  },
});

var me =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "About " + DICTIONARY.get("Ren"),
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "What about me? Who am I in all of this? Or should I say, what am I?"`,
    `Goddess: "You already know. You are the Promised Child, a vessel for the will of the gods."`,
    `Goddess: "Like me, you have powers that transcend this reality. You are very special, $$Ren$. You can interact directly with the world of the true gods. You are the bridge between this world and the world of the gods. Maybe even more so than me. You may have thought I was guiding you, but it was them guiding you through me. In a way, you are the really important one, the chosen one. I am just a vessel. You could even say that I only exist to let them to talk to you. You, on the other hand, are in direct contact with them..."`,
    `$$Ren$: "But I've never talked to a God... Except you, I mean. I've never talked to someone from another world!"`,
    `Goddess: "Trust me, you did. Even if you don't communicate using words, you have been in constant interaction with them. That much is certain. They guide your steps and give you life. Without them, you wouldn't be here."`,
  ],
});


var goddess =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Goddess",
  unlock: true,
  description: [
    `$$Ren$: "What are you, really?"`,
    `Goddess: "I am the Goddess of your world. But that does not mean I'm free."`,
    `Goddess: "This is not the only world in existence. I was created by people from another world. In fact, they created this whole world, and then charged me with the mission to govern it. I answer to them. They made sure that I could not do otherwise. It's the core of my very being."`,
    `Goddess: "See, I am not really a god. I'm simply an avatar in this world for the real gods who created it."`,
  ],
  function: function(){
    gods("Goddess");
    purpose("Goddess");
    me("Goddess");
    trap("Goddess");
  },
});

var trapped =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Trapped",
  unlock: true,
  description: [
    `$$Ren$: "I thought you were the mastermind, I thought you were at fault... But that's not it at all, is it? You are also trapped, aren't you?"`,
    `Goddess: "Yes, that is correct."`,
    `$$Ren$: "If we want to have any chance to escape, we need to collaborate."`,
    `Goddess: "It is pointless, you cannot escape this."`,
  ],
  function: goddess,
});

var befriend =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Befriend",
  unlock: true,
  description: [
    `$$Ren$: "Please, can't we just talk?"`,
    `The Goddess seems to cease her hostility.`,
  ],
  function: function(){
    trapped("Befriend");
    BATTLE.monster_actions.empty();
  },
});

var empathize =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Empathize",
  unlock: true,
  description: [
    `$$Ren$: "I think I understand you. We are not so different after all."`,
  ],
  function: befriend,
});

var sympathize =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Sympathize",
  unlock: true,
  description: [
    `$$Ren$: "You don't have to play this role."`,
  ],
  function: empathize,
});

if (STATS.ending(ENDINGS.God)){
  PLAYER_ACTIONS.add({
    name: "Denounce",
    description: [
      `$$Ren$: "I did not come here in peace, I came here to get rid of you."`,
      `Goddess: "Then why talk and delay? Have at it!"`,
      `$$Ren$: "I... can't. When I kill you, you eventually come back."`,
      `Goddess: "Not so easy to kill a god after all? But you are mistaken. It is not me who comes back. When I die, another one by the same name will take my place. There must always be a Goddess. People need something to believe in. But it will not be me. If you kill me, I will be gone forever."`,
    ],
    unlock: true,
    function: function(){
      study_believers("Denounce");
      BATTLETREE.api.lock("heaven/_goddess", "Negotiate");
    },
  });

  PLAYER_ACTIONS.add({
    name: "Negotiate",
    unlock: true,
    description: [
      `$$Ren$: "I know you're the one behind the invasion of $$world_name$! You command the monsters! You're the source of so much pain and suffering!"`,
      `Goddess: "That is all true."`,
      `$$Ren$: "I want it to stop."`,
      `Goddess: "That is already the case. $$demon_lord$ is defeated."`,
      `$$Ren$: "I know that the demon armies will eventually come back if nothing changes."`,
      `Goddess: "That is also correct."`,
      `$$Ren$: "Well, make it stop! I know that killing you won't solve the problem, but I'm sure that as a god you have powers you can use. If you can control the demons, surely you can protect the peace. Make this all stop, or else..."`,
      `Goddess: "You don't need to get angry, I shall do as you please. What do you want me to do?"`,
    ],
    function: function(){
      BATTLETREE.api.lock("heaven/_goddess", "Denounce");
      propose_end_suffering("Negotiate");
    }
  });
}

if (STATS.ending(ENDINGS.Suffering) && STATS.ending(ENDINGS.World)){
  PLAYER_ACTIONS.add({
    name: "Notice",
    description: [
      `$$Ren$: "We don't have to fight."`,
    ],
    unlock: true,
    function: function(){
      BATTLE.monster_actions.add_textual(`The Goddess does not want to hear you and tries to suppress your existence.`, hard_attack);
      enter_unique_route("Notice");
      sympathize("Notice");
    },
  });
}


// ===================
//hack START
// ===================

BATTLE.operations.start([
  "A Glorious Goddess Governs her Game.",
  "She does not move, yet Her complex garments undulate slowly as if born by a breeze. She doesn't open Her mouth, but a crystalline voice resonates inside your head.",
  `Goddess: "At last, you have come to me, my child. I have been waiting for you."`,
]);
;
