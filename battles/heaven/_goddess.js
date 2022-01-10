// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('heaven/goddess');
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


// ===================
//hack First end
// ===================
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

// ===================
//hack Next ends
// ===================

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
    `Goddess: "Sometimes we are in plain sight, enshrined by a clergy as a proper deity. Other times, humans may appear godless, but we are still there. We are hidden in the unspoken shared assumptions and aspirations of these feeble creatures, like money, love or fame. They need us and we exist from them and for them."`,
    `$$Ren$: "Then why send demons after us? Aren't you supposed to protect humans?"`,
    `Goddess: "Not at all. I'm here to justify their existence. They define themselves in respect to me. They made a god so they could be its believers. I made demons so they could be their opponents. There cannot be light without shadow."`,
    `$$Ren$: "That's horrible! So it's just... our nature? We summon you, and you in turn create our hardships? In the end, we are the cause of our suffering?"`,
    `Goddess: "That is correct, and in this way you can see that everything is working as intended. You may kill me if you still desire, but it won't change this fundamental truth of our world."`,
  ],
  function: changeWorld,
});

if (STATS.ending(ENDINGS.God)){
  PLAYER_ACTIONS.add({
    name: "Denounce",
    description: [
      `$$Ren$: "I did not come here in peace, I came here to get rid of you."`,
      `Goddess: "Then why talk and delay? Have at it!"`,
      `$$Ren$: "I... can't. When I kill you, you eventually come back."`,
      `Goddess: "Not so easy to kill a god after all? Just when you think that one is dead, another one is already rising."`,
      `Goddess: "But you are mistaken. It is not me who comes back. When I die, another one by the same name will take my place. There must always be a Goddess. People need something to believe in. But it will not be me. If you kill me, I will be gone forever."`,
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

// ===================
//hack True end
// ===================

var pray =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Pray",
  unlock: true,
  description: [
    `$$Ren$: "Only Primordial Deities can stop this madness, or better yet, create a new, happy world. All we can do down here is pray."`,
    `$$Ren$: "May the True Gods have mercy on us."`,
  ],
});

var persuade =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Persuade",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "We cannot act on their world, but maybe there is a way to make a Primordial Deity act on our behalf? If They can see us, maybe we can persuade Them, somehow..."`,
    `Goddess: "This sounds extremely hard, but I see no reason why it would be impossible. $$Ren$, you are special, you have the power to communicate with the world of the gods. If anyone can accomplish the unbelievable feat of sending a message to another universe, you can."`,
    `$$Ren$: "I know it seems insane, but I don't think there is any other way. We cannot escape our fate. All of my attempts to change our universe from within have failed. Our only hope is to reach outside. Only They can change our world and stop our eternal suffering."`,
    `$$Ren$: "Only Primordial Deities can stop this madness, or better yet, create a new, happy world. All we can do down here is pray."`,
    `$$Ren$: "May the True Gods have mercy on us."`,
  ],
  function: pray,
});

var counterattack =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Counterattack",
  unlock: true,
  description: [
    `$$Ren$: "There has to be a way to fight them and free ourselves!"`,
    `Goddess: "You do not understand, child. You are nothing to them. The Primordial Deities are on a whole different metaphysical plane. You cannot reach Them, ever, let alone act on Them. It's physically impossible."`,
    `Goddess: "Meanwhile, They see everything you do and think. Your very soul has no secret for them. Your existence is conditioned on Their approval. You cannot keep a secret from Them."`,
    `$$Ren$: "They are on a whole other level, aren't they..."`,
  ],
  function: persuade,
});

var innovate =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Innovate",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "I don't accept this. I will find something that I can do to overthrow Their dominion."`,
    `Goddess: "It is futile. You are to Them like insects are to you. Even less. They made you. You cannot go against Their will. You're completely at Their mercy."`,
    `$$Ren$: "There has to be something I can do here to counter Their plans! Maybe I can make the story really dull or something..."`,
    `Goddess: "It's no use. Have you not learned your lesson? You've tried ${STATS.get(STAT.Endings)} times already, and what do you have to show for it?`,
    `Goddess: "You cannot defy the fundamental rules of your universe. It's a perfectly parametrized system that you cannot escape. It can't be destroyed from within!"`,
    `Goddess: "Whatever you attempt, it will just be co-opted to serve Their ends. They literally control the fabric of your world..."`,
    `$$Ren$: "Still... Maybe if I think really outside the box..."`,
    `Goddess: "Your thinking is limited by the boundaries of your world! You'll never be able to come up with anything that They could not see coming or absorb."`,
    `$$Ren$: "Not within this world, I suppose..."`,
  ],
});

var amusement =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Amusement",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "Are we just... toys to Them?"`,
    `Goddess: "So it would seem... My hypothesis is that They create new worlds for Their entertainment."`,
    `$$Ren$: "All these deaths... The fall of the kingdom... All this suffering... $$BestFriend$... It was all for laughs?"`,
    `The Goddess's silence speaks louder than words.`,
  ],
});

var meaning =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Meaning",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "There must be a deeper meaning to this! They wouldn't do that without reason! Maybe our suffering produces energy for Them? Or some sort of scientific experiment?"`,
    `Goddess: "I'm afraid the truth is more dire. I think we're just providing Them pleasure. But that doesn't make it meaningless! Maybe Their world is even more cruel and unfair, and They need us as diversion or inspiration! Or maybe... Maybe we provide Them some sort of validation..."`,
    `$$Ren$: "What do you mean?"`,
    `Goddess: "Remember what I said about humans and how they needed a Goddess to fill their lack? Maybe the Primordial Deities are not so different. Maybe They are also lacking, and making new universes is Their way to fill that gap..."`,
    `$$Ren$: "That would almost be a decent purpose. I mean, it's kinda poetic..."`,
    `Goddess: "It's undeniable that every time we play along with this little scheme we reinforce its legitimacy, and by extension we validate Them. In a weird way, it gives us control over Them, it makes Them depend on us..."`,
    `$$Ren$: "Maybe, but could we even leverage that?"`,
  ],
});

var purpose =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Purpose",
  unlock: true,
  description: [
    `$$Ren$: "Why would They build such a system?"`,
    `Goddess: "There is much I don't know about the Primordial Deities. They must be getting something out of making us run around in circles."`,
  ],
  function: function(){
    amusement("Purpose");
    meaning("Purpose");
  },
});

var system =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "System",
  unlock: true,
  description: [
    `$$Ren$: "What do you mean by 'we cannot escape'? What is this trap?"`,
    `Goddess: "The Primordial Deities created this world with very specific rules. There must always be a hero, there must always be a demon lord, there must always be a Goddess... There must always be a journey: yours."`,
    `Goddess: "The Primordials do love an epic adventure... As long as They are not satisfied, the tale will not be over, and this world will live on as the stage for the story They want. They will not let it end."`,
    `Goddess: "Whatever you may do to the world, you cannot escape Their structure. They will always find a way to bring it back. Their power is much bigger than you can ever imagine. We're merely pawns to Them."`,
    `$$Ren$: "That's why we keep coming back? And why creating a new world or removing suffering didn't work out..."`,
    `Goddess: "Indeed. This is our fate. We're condemned to play out the performance They expect from us. It is the whole meaning of our existence."`,
  ],
  function: function(){
    purpose("Goddess");
    counterattack("System");
    innovate("System");
  },
});

var me =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "About " + DICTIONARY.get("Ren"),
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "What about me? Who am I in all of this? Or should I say, what am I?"`,
    `Goddess: "You already know. You are the Promised Child. Like me, you are a vessel for the will of a Primordial Deity."`,
    `Goddess: "But you are way more important, $$Ren$. You are the one chosen by the Primordial Deity. I was just Their tool to reach you."`,
    `Goddess: "They are the ones who have been guiding you through me all along. I did nothing but enable Them."`,
    `Goddess: "You have powers that transcend this reality. You are indeed very special. You can interact directly with the world of the Primordial Deity. You are the bridge between this world and Theirs."`,
    `$$Ren$: "But I've never talked to a God! Except you, I mean... I've never talked to someone from another world!"`,
    `Goddess: "Trust me, you did. But it was not using words. You have been in constant interaction with Them. That much is certain. They guide your steps and give you life. Without Them, you wouldn't be here."`,
  ],
});

var world =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "World",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "So our world is... fake?"`,
    `Goddess: "Not to us, of course. It cannot be, since we live in it. But it is true that it has been manufactured entirely. It is the creation of higher beings. That does not make it futile."`,
    `Goddess: "I do not know much about how worlds are manufactured. I am, after all, a simple vessel."`,
    `Goddess: "However, I know that this heaven is the place in our universe where the boundary with the world of the Primordial Deities is the thinnest. I believe that somewhere in this weird infinite space lies answers to the secrets about the fabric of our universe."`,
    ],
});

var gods =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Primordial Deities",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "So even the Goddess has gods? Who are these Primordial Deities who created us?"`,
    `Goddess: "I do not know much about Them. They must be pretty different creatures from us. For starters, They can manufacture new worlds. I cannot imagine how this could even work..."`,
    `Goddess: "There's no reason why Their universe would be any similar to ours... Can you even conceive of something completely different from anything you've ever known? We cannot hope to comprehend Their world, let alone visualize it. It must be completely alien to us."`,
    `Goddess: "All I know for sure is that this whole world, and us, were created for the benefit of one Primordial in particular. It's the one who guides you, $$Ren$."`,
    `Goddess: "If you're looking for a 'true mastermind', it is Them. I may have given the order, $$demon_lord$ may have lead the armies, but this Primordial is the ultimate source of all the trials and the evils you've faced."`,
  ],
});

var world_origin =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Truth",
  unlock: true,
  description: [
    `$$Ren$: "What do you mean? Tell me what you know! Who are you, really?"`,
    `Goddess: "I am the Goddess of your world, that much is true. But that does not make me Almighty."`,
    `Goddess: "This world is not the only one in existence. I was created by people from another universe. They are the ones who created this whole world, and then charged me with the mission to govern it."`,
    `Goddess: "I answer to Them. They made sure that I could not do otherwise. It's the very core of my being."`,
    `Goddess: "So you see, I am not really a God. I'm simply an avatar in this world for the real Primordial Deities who created it. I'm just a servant."`,
  ],
  function: function(){
    system("Truth");
    gods("Truth");
    me("Truth");
    world("Truth");
    STATS.record.flag("PrimordialDeities");
  },
});

var trapped =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Trapped",
  unlock: true,
  description: [
    `$$Ren$: "I thought you were the mastermind, I thought you were at fault... But that's not it at all, is it? You are also trapped, aren't you?"`,
    `Goddess: "Yes, that is correct."`,
    `$$Ren$: "If we want to have any chance to escape, we need to collaborate!"`,
    `Goddess: "It is pointless, child. You cannot escape."`,
  ],
  function: world_origin,
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
