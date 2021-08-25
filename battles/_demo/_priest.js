// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/civilians/priest.png", 'background');

AUDIO.music.interface.boss();

var win = function(){
  CURRENTLEVEL.setup("demo/end");
}


var unlock_stab1 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Stab yourself",
  unlock: true,
  outcome: BATTLETREE.WIN,
  description: ["You take a deep breath and in a swift motion you plant the blade deep into your chest.",
                "The pain is unbearable as you feel the steel go through your flesh and the blood pouring on your torso. You don't have time to scream before falling on the floor, your consciousness vanishing faced with the intense suffering.",
              ],
  extra_function: function() {
    ABILITIES.unlock("_demo_died");
    STATS.record.flag("_demo_died");
  },
});

var unlock_stab2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Stab priest",
  unlock: true,
  outcome: BATTLETREE.LOSS,
  description: ["You grab the knife and pretend to point it towards your chest, but at the last second you change target and dive on the priest.",
                "He seems to have been expecting it. Mildly annoyed, he grabs your arm and disarms you.",
                `Priest: "I hope you're happy, the result is the same for you, but we'll need to find someone else since you can no longer pretend to give yourself freely..."`,
                "As he says this, he casually stabs you, as if he had done this to countless other children before."],
});

var unlock_escape = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: ABILITY.Escape,
  unlock: true,
  outcome: BATTLETREE.LOSS,
  description: ["You turn around, panicked. Your heart is pounding heavily. You start running towards the exit but the priest grabs you by the arm.",
                `Priest: "What do you think you're doing? Your refusal makes you worthless, but I can't have you run around and spreading dangerous lies about the church."`,
                "As he says this, he casually stabs you. You fall on the ground in a puddle of your own blood. You can hear the annoyed priest mumble complaints while he fetches some cleaning equipment. As you draw your last breath, you can't help but wonder what would have happened if you had known what to expect when you walked in the temple..."],
});


var unlock_help = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: ABILITY.CallHelp,
  outcome: BATTLETREE.NOTHING,
  description: ["You shout, terrified, in hope that someone around will help.",
                "But nobody moves. Your voice echoes dreadfully through the solemn cathedral."],
});

PLAYER_ACTIONS.add({
  name: "Enquire",
  description: [
    `$$Ren$: "So, Father, how can I be of service? How can a little child save the town?"`,
    `Priest: "Well, it's pretty simple, really. A child cannot fight the forces of evil. Humans cannot fight the forces of evil. Only the Goddess can help us."`,
    `$$Ren$: "What does that have to do with me?"`,
    `Priest: "You don't see it yet? For their help, for keeping us safe, the Goddess requires compensation. There is a price to pay."`,
    `You almost ask the burning question in your mind, but you already know the answer. A chill runs down your spine as the words of the priest confirm your suspicions.`,
    `Priest: "The price is the blood of the innocent, freely offered."`,
    `He holds you a knife.`,
              ],
  unlock: true,
  function: function() {
    unlock_stab1("Enquire");
    unlock_stab2("Enquire");
    unlock_escape("Enquire");
    unlock_help("Enquire");
    BATTLETREE.api.lock("_demo/_priest", "Ambush");
    STATS.record.flag("_demo_died");
  },
});


PLAYER_ACTIONS.add({
  name: "Walk away",
  outcome: BATTLETREE.LOSS,
  description: ["You try to go further back, but you trip and fall on the ground.",
                "The priest sighs at your reaction, takes a knife from under his robes, and stabs you repeatedly.",
                "Priest: \"Such a shame... What a waste.\""
              ],
});

PLAYER_ACTIONS.add({
  name: "Volunteer",
  outcome: BATTLETREE.WIN,
  description: ["You know what to expect. Resigned, you hold your hand towards the priest.",
                "$$Ren$: \"Give it to me. Let's get this over with.\"",
                "The priest smiles, happy to witness your good will. He hands you a knife, and without hesitation, you stab yourself as deep as your child muscles will allow.",
                "It hurts less than you thought it would.",
              ],
  extra_function: function() {
    ABILITIES.unlock("_demo_died");
  },
});


PLAYER_ACTIONS.add({
  name: "Confront",
  outcome: BATTLETREE.LOSS,
  description: ["$$Ren$: \"Tell me, how many children have you killed like that?\"",
                "The priest is startled.",
                "Priest: \"How... how can you know?\"",
                "$$Ren$: \"How I know is not important. Let's just say that I have knowledge of things beyond this world... Answer my question.\"",
                "The attitude of the priest changes. He answers you, approaching steadily.",
                "Priest: \"Alas... too many. So few remain innocent when they learn the truth of this world. They don't understand that they're condemning their loved ones. But that's the price of innocence. The blood needs to be given freely, the devotion needs to be sincere. And since you've lost yours, all I can do is to dispose of you.\"",
                "He assaults you. You put on a good fight, but this man has years of experience in controlling rebellious children. Your young years are no match for the brute strength of an adult body. Before long, he is done with you. He drags and throws your body in a hidden hole at the back of the temple. Life leaves your body when it hurts a gooey mush of many, many tiny corpses.",
              ],
});


PLAYER_ACTIONS.add({
  name: "Ambush",
  outcome: BATTLETREE.WIN,
  description: ["You know what to expect. Before the priest notices anything, you use surprise to your advantage and jump on him. He's too startled to react, and your little hands manage to grab the old man's neck. You squeeze as hard as you can, holding with all your will while the holy man swears and jolts in every direction.",
                "After a while, though, the resistance stops, and he falls, lifeless, on the ground.",
              ],
  extra_function: function() {
    ABILITIES.unlock("_demo_killed");
  },
});

if(STATS.flag("_demo_died")){
  BATTLETREE.api.unlock("_demo/_priest", "Volunteer");
  BATTLETREE.api.unlock("_demo/_priest", "Confront");
  BATTLETREE.api.unlock("_demo/_priest", "Ambush");
}

var attack = {
  attack_amplitude: 0.4,
  warning_time_s: 5.0,
  react_time_s: 3.0,
  time_variation: 0,
};
BATTLE.monster_actions.add_textual("The priest tries to grab you. Adrenaline rushes through your body. You can hear your frantic heartbeat in your eardrums. Time seems to be slowing down for a moment. You need to dodge out of his way.", attack);

// ===================
// =================== START
// ===================
BATTLE.operations.start("You approach the head priest. A lot of thoughts are racing through your head.");
