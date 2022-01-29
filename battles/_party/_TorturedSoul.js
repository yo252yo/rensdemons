
new CenteredMovingImage("assets/characters/party/TorturedSoul.png", 'background',32,48, 2);

AUDIO.music.characters.TorturedSoul();
PLAYER_ACTIONS.escape();


var cantdie = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "I can't die",
  unlock: true,
  description: [
    `$$Ren$: "I... I don't think I can die. I know this might sounds weird..."`,
    `$$TorturedSoul$: "No, it doesn't. I'm the same. I've tried to take my own life countless times, but to no avail."`,
    `$$Ren$: "I think it might be a slightly different case. I have a way to cheat death."`,
    `$$TorturedSoul$: "Well, if you have such mastery over death, maybe you can help me..."`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    INVENTORY.set("_torturedSoulSteps", 1);
  },
});

var duty = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Duty",
  unlock: true,
  description: [
    `$$Ren$: "I have my duty to uphold as the Promised Child."`,
    `$$TorturedSoul$: "Good for you, I guess... You haven't realized how meaningless it really is... Then you can't understand me. You're just deluding yourself."`,
    `$$TorturedSoul$: "Just leave me to my woes. Everybody always does."`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var giveup = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Sometimes",
  unlock: true,
  description: [
    `$$Ren$: "I guess I have my doubts... But I don't think I could."`,
    `$$TorturedSoul$: "Why is that?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    duty("Sometimes");
    cantdie("Sometimes");
  }
});

var dontgiveup = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "No",
  unlock: true,
  description: [
    `$$Ren$: "I have to stay strong, for the Goddess."`,
    `$$TorturedSoul$: "Good for you, I guess... Then you can't understand me. You're just deluding yourself."`,
    `$$TorturedSoul$: "Just leave me to my woes. Everybody always does."`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var meaning = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Meaning",
  unlock: true,
  description: [
    `$$Ren$: "What do you mean?"`,
    `$$TorturedSoul$: "Look at these sheep, tending to their chores every day. Don't they know that none of this matters? We'll all be dead and forgotten soon."`,
    `$$TorturedSoul$: "They all strive every day, but what is it all for? We all want to believe there's a meaning and a certainty in our lives, but the truth is that there is none. It's all fake."`,
    `$$TorturedSoul$: "We're all broken, bleeding, lacking, and reality will never fill our void."`,
    `$$TorturedSoul$: "What's the point in fighting it? It's like trying to fill a pierced barrel."`,
    `$$TorturedSoul$: "Don't you ever feel like giving up?"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    giveup("Meaning");
    dontgiveup("Meaning");
  }
});

var promisedchild = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Promised Child",
  unlock: true,
  description: [
    `$$Ren$: "The Goddess did not abandon us! She sent us a Promised Child!"`,
    `$$TorturedSoul$: "I've heard this story before... And yet things are still the same. Even if it was true, which I doubt, what can a lone child do against hordes of demons?"`,
  ],
  outcome: BATTLETREE.NOTHING,
});

var goddess = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Goddess",
  unlock: true,
  description: [
    `$$Ren$: "What about the Goddess? She cares for you. There's salvation in devotion!"`,
    `$$TorturedSoul$: "How can anything I do possibly affect Her? She has forsaken us, the war is already lost. The Goddess is dead and left us to fend for ourselves. Why take up a doomed cause?"`,
  ],
  outcome: promisedchild,
});

var art = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Art",
  unlock: true,
  description: [
    `$$Ren$: "What about art? You sound like a poet."`,
    `$$TorturedSoul$: "It's true, I used to write. Or rather, I used to be a conduit for divine inspiration."`,
    `$$TorturedSoul$: "It kept me busy for a while, distracted me from the pain of existence..."`,
    `$$TorturedSoul$: "But every work I produced only reminded me how alone I was. Nobody really understood me or my art."`,
    `$$TorturedSoul$: "We're always alone, in the end. We all die alone. Nobody can ever see what's in your soul. How much of a link can you really establish through broken communications?"`,
  ],
  outcome: BATTLETREE.NOTHING,
});

var no = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Not really",
  unlock: true,
  description: [
    `$$TorturedSoul$: "I know, right..."`,
    `$$TorturedSoul$: "This absurd world is devoid of meaning, and there is nothing us measly humans can do about it..."`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);

    goddess("Not really");
    art("Not really");
    meaning("Not really");
  }
});

var yeah = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Hum... yeah",
  unlock: true,
  description: [
    `$$TorturedSoul$: "Good for you, I guess... Then you can't understand me. You're just deluding yourself."`,
    `$$TorturedSoul$: "Just leave me to my woes. Everybody always does."`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

PLAYER_ACTIONS.add({
  name: "Are you ok?",
  unlock: true,
  description: [
    `$$TorturedSoul$: "Can anyone be okay in this shattered world? Are you?"`,
  ],
  function: function(){
    yeah("Are you ok?");
    no("Are you ok?");
  }
});


// ===================
// =================== ATTACKS
// ===================

var attack = {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 1.2,
  variability: 0.3, // 1 = 100%
};

var texts = [
  `The heavy atmosphere is too much to handle.`,
  `The overly sentimental conversation makes you withdraw in cringe.`,
  `The negativity of $$TorturedSoul$ is really bringing you down.`,
  `$$TorturedSoul$ makes you question the worth of your own existence.`
];

var make_attack = function (text, source){
  BATTLE.monster_actions.add_textual(
    [RANDOM.pick(texts), `$$TorturedSoul$: "${text}"`],
  attack, function(){
    CONSOLE.log.debug("Lyrics from " + source)
  });
}

make_attack(
  `Do you ever feel like breaking down? Do you ever feel out of place?`,
  "'Welcome to My Life' - Simple Plan"
);

make_attack(
  `I walk a lonely road, the only one that I have ever known.`,
  "'Boulevard of Broken Dreams' - Green Day"
);

make_attack(
  `I'm so tired of being here, suppressed by all my childish fears...`,
  "'My Immortal' - Evanescence"
);

make_attack(
  `And if you die, I wanna die with you, take your hand and walk away...`,
  "'Lonely Day' - System of a Down"
);

make_attack(
  `No one knows what it's like to be the bad man to be the sad man behind blue eyes.`,
  "'Behind Blue Eyes' - Limp Bizkit"
);

make_attack(
  `I've become so numb, I can't feel you there.`,
  "'Numb' - Linkin Park"
);

make_attack(
  `Everybody's Changing, and I don't feel the same...`,
  "'Everybody's Changing' - Keane"
);


// ===================
// =================== START
// ===================
BATTLE.operations.start([
  `You find a young man wearing overly convoluted black velvety clothes brooding in a corner of the town. When he sees you, he pretends not to and starts reciting a poem to himself.`,
  `$$TorturedSoul$: "Is there a loneliest place than a crowded city?"`,
]);
