// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/heaven/goddess.png", 'background');
AUDIO.music.characters.Goddess();

// ===================
//hack PLAYER CAPABILITIES
// ===================

var attack = {
  attack_amplitude: 0.95, // Between 0 and 1
  warning_time_s: 0.0,
  react_time_s: 0.2,
  variability: 0.8, // 1 = 100%
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
    BATTLE.monster_actions.add_textual(`Goddess: "Why?"`, attack);

    BATTLETREE.api.lock("heaven/_goddess", "Negotiate");
    BATTLETREE.api.lock("heaven/_goddess", "Believers");
    BATTLETREE.api.lock("heaven/_goddess", "Denounce");
    BATTLETREE.api.lock("heaven/_goddess", "Change world");
    BATTLETREE.api.lock("heaven/_goddess", "Fix the world");
    BATTLETREE.api.lock("heaven/_goddess", "Destroy world");
    BATTLETREE.api.lock("heaven/_goddess", "End suffering");

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
    `Goddess: "It's their psychology. Humans are aware of their own existence, and of their own mortality. By defining themselves as individuals, they build a wall between them and the rest of the world. When a self is born, it also defines a non-self. That makes those poor creatures incomplete. They will always be lacking, never be whole. There will always be a void in their soul, and they will invent something to fill it. That's what me and my sisters are."`,
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



// ===================
//hack START
// ===================

BATTLE.operations.start([
  "A Glorious Goddess Governs her Game.",
  "She does not move, yet Her complex garments undulate slowly as if born by a breeze. She doesn't open Her mouth, but a crystalline voice resonates inside your head.",
  `Goddess: "At last, you have come to me, my child. I have been waiting for you."`,
]);
;
