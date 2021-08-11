// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/civilians/priest.png", 'background');


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

PLAYER_ACTIONS.add({
  name: "Enquire",
  description: [
    `$$Ren$: "So, Father, how can I be of service? How can a little child save the town?"`,
    `Priest: "Well, it's pretty simple, really. A child cannot fight the forces of evil. Humans cannot fight the forces of evil. Only Gods can help us."`,
    `$$Ren$: "What does that have to do with me?"`,
    `Priest: "You don't see it yet? For their help, for keeping us safe, the Gods require compensation. There is a price to pay."`,
    `You almost ask the burning question in your mind, but you already know the answer. A chill runs down your spine as the words of the priest confirm your suspicions.`,
    `Priest: "The price is the blood of the innocent, freely offered."`,
    `He holds you a knife.`,
              ],
  unlock: true,
  function: function() {
    unlock_stab1("Enquire");
    unlock_stab2("Enquire");
  },
});

PLAYER_ACTIONS.add({
  name: ABILITY.CallHelp,
  outcome: BATTLETREE.NOTHING,
  description: ["You shout, terrified, in hope that someone around will help.",
                "But nobody moves. Your voice echoes dreadfully through the solemn cathedral."],
});

PLAYER_ACTIONS.add({
  name: ABILITY.Flee,
  outcome: BATTLETREE.LOSS,
  description: ["You try to go further back, but you trip and fall on the ground.",
                "The priest sighs at your reaction, takes a knife from under his robes, and stabs you repeatedly.",
                "Priest: \"Such a shame... What a waste.\""
              ],
});

// ===================
// =================== START
// ===================
BATTLE.operations.start("You approach the head priest. A lot of thoughts are racing through your head.");
