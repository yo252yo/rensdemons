
new CenteredMovingImage("assets/characters/party/TorturedSoul.png", 'background',32,48, 2);

AUDIO.music.characters.TorturedSoul();
PLAYER_ACTIONS.escape();


var cantdie = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "I can't die",
  unlock: true,
  description: [
    `$$Ren$: "I... I don't think I can die. I know this might sounds weird..."`,
    `$$TorturedSoul$: "No, it does not. My personal situation is quite similar. Countless times have I attempted to withdraw my own life. However, it was to no avail."`,
    `$$Ren$: "I think it might be a slightly different case. I have a way to cheat death. At least until I've finished my mission."`,
    `$$TorturedSoul$: "Say, if thou have such mastery over death, perchance might thou assist me..."`,
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
    `$$TorturedSoul$: "Fine on thee, I suppose... Thou are but deluding thyself. Thou are still spellbound and have yet to comprehend how meaningless it all really is. I must imagine thee happy."`,
    `$$TorturedSoul$: "Do abandon me to my woes. Everybody always does."`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var giveup = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Sometimes",
  unlock: true,
  description: [
    `$$Ren$: "I guess I have my doubts... But I don't think I could."`,
    `$$TorturedSoul$: "Why would that be?"`,
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
    `$$TorturedSoul$: "Fine on thee, I suppose... Then thou cannot understand me. Thou are but deluding thyself."`,
    `$$TorturedSoul$: "Do abandon me to my woes. Everybody always does."`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var meaning = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Meaning",
  unlock: true,
  description: [
    `$$Ren$: "What do you mean?"`,
    `$$TorturedSoul$: "Behold these sheep, tending to their chores every day. Do they not realize that none of this actually matters? We will all be dead and forgotten in a blink."`,
    `$$TorturedSoul$: "They all strive every day, but what is it all for? We all want to believe in a higher meaning, any certainty organizing our existences. The truth is that there is none. It is all smokes and mirror. There is no meaning to be found on this earth."`,
    `$$TorturedSoul$: "Thus do we all err, broken, bleeding, lacking, longing to fill a void that reality never will. All that meets our efforts is the unreasonable silence of the world."`,
    `$$TorturedSoul$: "Man stands face to face with the irrational. What is the point in denying it? It is similar to attempting to replenish a pierced barrel."`,
    `$$TorturedSoul$: "Do thou never feel like giving up?"`,
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
    `$$TorturedSoul$: "I have heeded this tale a thousand times over... And yet things remain same as ever. Even if it was correct, which I still doubt, what could a lone youngster do faced with hordes of demons?"`,
    `$$TorturedSoul$: "Through my art, I am also a vessel for the divine. Thereby know I only too well how it inspires us by its tantalizing glow, only to ultimately forsake us."`,
  ],
  outcome: BATTLETREE.NOTHING,
});

var goddess = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Goddess",
  unlock: true,
  description: [
    `$$Ren$: "What about the Goddess? She cares for you. There's salvation in devotion!"`,
      `$$TorturedSoul$: "How could anything I do conceivably affect Her? She sits comfortably, remote, in heaven. She has forsaken us. The feud is already lost. The Goddess is dead and abandoned us to fend for ourselves. Why partake in a doomed enterprise?"`,
  ],
  outcome: promisedchild,
});

var art = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Art",
  unlock: true,
  description: [
    `$$Ren$: "What about art? You sound like a poet."`,
    `$$TorturedSoul$: "It is true, I used to write. Rather, I used to be a vessel for divine inspiration."`,
    `$$TorturedSoul$: "It occupied me a moment. Such delicate distraction from the misery of existence..."`,
    `$$TorturedSoul$: "But each masterpiece I birthed only reminded me how alone I actually was. Nobody really understood me or my art."`,
    `$$TorturedSoul$: "We are always alone, ultimately. Alone shall we face death. Nobody can ever peek inside thine soul. How much could one really share through shattered communications?"`,
  ],
  outcome: BATTLETREE.NOTHING,
});

var no = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Not really",
  unlock: true,
  description: [
    `$$TorturedSoul$: "I grasp thy emotion..."`,
    `$$TorturedSoul$: "This absurd universe is devoid of meaning, and there is naught that us measly humans could do about it..."`,
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
    `$$TorturedSoul$: "Fine on thee, I suppose... Then thou cannot understand me. Thou are but deluding thyself."`,
    `$$TorturedSoul$: "Do abandon me to my woes. Everybody always does."`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

PLAYER_ACTIONS.add({
  name: "Are you ok?",
  unlock: true,
  description: [
    `$$TorturedSoul$: "Could anyone be content in this shattered realm? Would thou?"`,
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
  `$$TorturedSoul$: "Is there a more lonesome location than a crowded borough?"`,
]);
