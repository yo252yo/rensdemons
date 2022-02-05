
new CenteredMovingBattleImage("assets/characters/party/TraitorFisher.png", 'background',32,48, 2);

AUDIO.music.characters.TraitorFisher();

// ===================
// =================== PLOT
// ===================

var submit = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Submit",
  unlock: true,
  description: [
    `You bow your neck, waiting for the impact.`,
    `You hear the whooshing sound of the scythe cutting through the water.`,
    `And then $$TraitorFisher$ whispers in your ear.`,
    `$$TraitorFisher$: "Quick, this is your chance, run away now! Be fast! The closest shore is to the south!"`,
  ],
  outcome: BATTLETREE.WIN,
});

var attack2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Attack",
  unlock: true,
  description: [
    `You wait for the sirens to be far away and for $$TraitorFisher$ to seem vulnerable, and launch a surprise attack.`,
    `It fails miserably. It appears that $$TraitorFisher$ expected it, and counters effortlessly with her scythe that cuts your neck clean.`,
  ],
  outcome: BATTLETREE.LOSS,
});

var plead2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Plead mercy",
  unlock: true,
  description: [
    `$$Ren$: "Please, spare us!"`,
    `$$TraitorFisher$: "Silence! Every one of your word is an insult to us!"`,
    `Without further ado, $$TraitorFisher$ slashes through the water with her scythe and cuts your neck clean.`,
  ],
  outcome: BATTLETREE.LOSS,
});

var traitor = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Chose " + DICTIONARY.get("TraitorFisher"),
  unlock: true,
  description: [
    `You point to $$TraitorFisher$.`,
    `$$Ren$: "Can you do the honors?"`,
    `$$BestFriend$ questions you in a gaze, but you try to display confidence in your plan. $$TraitorFisher$ seems a bit taken aback. She translates your request to the crowd.`,
    `It takes a while, but it seems that they come to an agreement. A triton gives their scythe to $$TraitorFisher$, then the crowd starts to dissipate as merfloks go back to their occupations.`,
  ],
  function: function(){
    BATTLE.player_actions.empty();
    submit("Chose " + DICTIONARY.get("TraitorFisher"));
    attack2("Chose " + DICTIONARY.get("TraitorFisher"));
    plead2("Chose " + DICTIONARY.get("TraitorFisher"));
  },
});

var yourself = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Chose yourself",
  unlock: true,
  description: [
    `A series of agitated clicks shakes the crowd. It might be your imagination, but you get the feeling that they are laughing at you.`,
    `Before you can react, two heavily armed tritons swim in your direction. You try to resist, but you find that the water is blocking your movements. Soon, the sea creatures cut off your head with their scythes.`,
  ],
  outcome: BATTLETREE.LOSS,
});

var weak = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Chose weak triton",
  unlock: true,
  description: [
    `You point to what you believe to be the weakest individual in the crowd.`,
    `But as the triton comes towards you, you discover that you cannot resist: but the water is blocking your movements. Soon, the sea creature cut off your head with his scythe.`,
  ],
  outcome: BATTLETREE.LOSS,
});

var strong = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Chose strong triton",
  unlock: true,
  description: [
    `You point to what you believe to be the strongest individual in the crowd. Maybe they will let down their guard...`,
    `But as the triton comes towards you, you discover that you cannot resist: but the water is blocking your movements. Soon, the sea creature cut off your head with his scythe.`,
  ],
  outcome: BATTLETREE.LOSS,
});

var wait = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Wait",
  unlock: true,
  description: [
    `A few moments later, $$TraitorFisher$ comes back.`,
    `$$TraitorFisher$: "I don't know who you are, child, but your plea touched them. Your impunity in your little promenade is still beyond forgiving, though. But in an incredible act of clemency, they are willing to let you chose your own executor."`,
  ],
  function: function(){
    BATTLE.player_actions.empty();
    yourself("Wait");
    weak("Wait");
    strong("Wait");
    traitor("Wait");
  },
});

var beg = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Clause",
  unlock: true,
  description: [
    `$$Ren$: ""We're simple travelers, we know how offensive our presence here is, but we mean the Sirens no harm. I demand application of the ... .-.. .- ...- . clause."`,
    `$$TraitorFisher$: "This is highly unusual. Stay put."`,
    `All around, the merfolks are deliberating in what you perceive as hushed voices.`,
    `$$TraitorFisher$ swims towards them and starts arguing in clicks and hisses.`,
  ],
  function: wait,
});


PLAYER_ACTIONS.add({
  name: "... .-.. .- ...- .",
  unlock: STATS.flag("_sirens_language"),
  description: [
    `As you alternate clicks and hisses, the crowd of merfolks grows silent and wide eyed. $$BestFriend$ stares at you with incredulity. The siren emissary shares the general disbelief.`,
    `$$TraitorFisher$: "Who are you? How do you know our language? How are you so well learned in our laws?"`,
    `$$BestFriend$: "Yes, when did you learn that?"`,
  ],
  function: beg,
});


var learn = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Learn",
  unlock: true,
  description: [
    `$$Ren$: "Can you teach us?"`,
    `$$TraitorFisher$: "They're all watching, your fate is doomed already."`,
    `$$Ren$: "Then teach us to present our farewell."`,
    `$$TraitorFisher$: "It's too late, it won't save you now."`,
    `$$Ren$: "Please..."`,
    `$$TraitorFisher$ sighs reluctantly and articulates a series of hisses and clicks: ... .-.. .- ...- .`,
    `The merfolks all around exchange interrogative glances.`,
    `$$TraitorFisher$: "This is a special clause in Siren law. It's very self-deprecating. It's a provision that allows anyone to surrender all their rights and ask for exile. Usually, merfolks would be honor bound to consider it. But it doesn't work for humans."`,
    `You try to reproduce the noises.`,
    `$$Ren$: "... .-.. .- ...- ."`,
    `A series of agitated clicks shakes the crowd. It might be your imagination, but you get the feeling that they are laughing at you.`,
    `Before you can react, two heavily armed tritons swim in your direction. You try to resist, but you find that the water is blocking your movements. Soon, the sea creatures cut off your head with their scythes.`,
  ],
  outcome: BATTLETREE.LOSS,
  extra_function: function(){
    STATS.record.flag("_sirens_language");
  }
});

var resign = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Resign",
  unlock: true,
  description: [
    `$$Ren$: "Fine, I suppose we should accept our fate..."`,
    `$$TraitorFisher$: "I'm so sorry..."`,
    `$$TraitorFisher$ turns to the merfolks and speaks to them in their language.`,
    `Two heavily armed tritons swim in your direction. You try to resist, but you find that the water is blocking your movements. Soon, the sea creatures cut off your head with their scythes.`,
  ],
  outcome: BATTLETREE.LOSS,
});

var whisper = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Customs",
  unlock: true,
  description: [
    `$$Ren$: "Are you sure there's nothing we can do? No loophole or custom we could use?"`,
    `$$TraitorFisher$: "I'm sorry. The human language is extremely sacrilegious. It would be another thing if you could speak their language..."`,
  ],
  function: learn,
});

var listen = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Listen",
  unlock: true,
  description: [
    `$$TraitorFisher$: "You are charged with trespassing on Siren territory. Quite frankly, you shouldn't be surprised. Humans have lost control of the kingdom long ago. This belongs to the monsters now. You can't escape your sentence."`,
  ],
  function: function() {
    resign("Listen");
    whisper("Listen");
  }
});

PLAYER_ACTIONS.add({
  name: "Stay quiet",
  unlock: STATS.flag("_sirens_quiet"),
  description: [
    `$$Ren$: "..."`,
    `$$TraitorFisher$: "Please, remain silent. Your language is despised by the merfolks. Just speaking it might enrage them and shorten this trial."`,
    `You're about to ask what you are on trial for, but you think better of it at the last minute. You nod to show your approbation. $$TraitorFisher$ smiles.`,
  ],
  function: listen,
});

var insist = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Insist",
  unlock: true,
  description: [
    `$$Ren$: "Please, whatever it is, we're not like them!"`,
    `$$TraitorFisher$: "Silence, I tell you! Your insubordination is not helping your case! There's no possible redemption for impertinent humans!"`,
    `$$TraitorFisher$ turns to the merfolks and speaks to them in their language.`,
    `Two heavily armed tritons swim in your direction. You try to resist, but you find that the water is blocking your movements. Soon, the sea creatures cut off your head with their scythes.`,
  ],
  outcome: BATTLETREE.LOSS,
  extra_function: function(){
    STATS.record.flag("_sirens_quiet");
  }
});

var question = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Question",
  unlock: true,
  description: [
    `$$Ren$: "What did humans do to you to deserve such contempt?"`,
    `$$TraitorFisher$: "Silence, this is about you, not me!"`,
  ],
  function: insist,
});

var accuse = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Accuse",
  unlock: true,
  description: [
    `$$Ren$: "So you just help monsters butcher your own kind?"`,
    `$$TraitorFisher$: "Don't you dare speak about what you don't know."`,
    `$$TraitorFisher$ is visibly enraged. She turns to the merfolks and speaks to them in their language. As two tritons swim towards you, she translates for you.`,
    `$$TraitorFisher$: "Your sentence will now be executed. It is death."`,
    `You try to resist, but you find that the water is blocking your movements. Soon, the sea creatures cut off your head with their scythes.`,
  ],
  outcome: BATTLETREE.LOSS,
  extra_function: function(){
    STATS.record.flag("_sirens_hate");
  }
});

var plead = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Plead",
  unlock: true,
  description: [
    `$$Ren$: "Please, help a fellow human! Just let us go!"`,
    `$$TraitorFisher$: "My last shred of sympathy for your kind has died long ago. Your appeal is pityful. Let's get this over with."`,
    `$$TraitorFisher$ turns to the merfolks and speaks to them in their language.`,
    `Two heavily armed tritons swim in your direction. You try to resist, but you find that the water is blocking your movements. Soon, the sea creatures cut off your head with their scythes.`,
  ],
  outcome: BATTLETREE.LOSS,
  extra_function: function(){
    STATS.record.flag("_sirens_hate");
  }
});

var liberate = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Liberate",
  unlock: true,
  description: [
    `$$Ren$: "Are you held against your will? We can help!"`,
    `$$TraitorFisher$: "Are you suggesting that I cannot take care of myself? No, I am not a prisoner here."`,
    `$$TraitorFisher$ is visibly enraged. She turns to the merfolks and speaks to them in their language. As two tritons swim towards you, she translates for you.`,
    `$$TraitorFisher$: "Your sentence will now be executed. It is death."`,
    `You try to resist, but you find that the water is blocking your movements. Soon, the sea creatures cut off your head with their scythes.`,
  ],
  outcome: BATTLETREE.LOSS,
});


PLAYER_ACTIONS.add({
  name: DICTIONARY.get("TraitorFisher"),
  unlock: STATS.flag("_sirens_tried"),
  description: [`$$Ren$: "We know we're in the wrong, being humans intruding on Siren territory, but what are you doing here? Are you not human too?"`,
                `$$TraitorFisher$: "I may have been at some point, but I have renounced my origins long ago. I serve the Siren people, and act as mediator to my former kind."`,
                ],
  function: function(){
    accuse(DICTIONARY.get("TraitorFisher"));
    plead(DICTIONARY.get("TraitorFisher"));
    liberate(DICTIONARY.get("TraitorFisher"));
    if(STATS.flag("_sirens_hate")){
      question(DICTIONARY.get("TraitorFisher"));
    }
  }
});

PLAYER_ACTIONS.add({
  name: "Apologize",
  unlock: true,
  outcome: BATTLETREE.LOSS,
  description: [`$$Ren$: "Sorry, we had no idea, we didn't mean to..."`,
                `$$TraitorFisher$: "You are humans in the middle of monster territory. Surely you do not expect clemency. This lake belongs to the Sirens, and intrusion will not be tolerated."`,
                `$$Ren$: "Please, listen..."`,
                `The hissing and clicking around you grows louder, somewhat dimmed by the water.`,
                `$$TraitorFisher$: "There is nothing to say. Your sentence is death."`,
                `Two heavily armed tritons swim in your direction. You try to resist, but you find that the water is blocking your movements. Soon, the sea creatures cut off your head with their scythes.`,
                ],
  extra_function: function(){
    STATS.record.flag("_sirens_tried");
  }
});

PLAYER_ACTIONS.add({
  name: "Defend",
  unlock: true,
  outcome: BATTLETREE.LOSS,
  description: [`$$Ren$: "We were just taking a stroll."`,
                `$$TraitorFisher$: "A stroll in the middle of monster territory? You must be joking. This lake belongs to the Sirens, and intrusion will not be tolerated."`,
                `$$Ren$: "Please, listen..."`,
                `The hissing and clicking around you grows louder, somewhat dimmed by the water.`,
                `$$TraitorFisher$: "There is nothing to say. Your sentence is death."`,
                `Two heavily armed tritons swim in your direction. You try to resist, but you find that the water is blocking your movements. Soon, the sea creatures cut off your head with their scythes.`,
                ],
  extra_function: function(){
    STATS.record.flag("_sirens_tried");
  }
});

PLAYER_ACTIONS.add({
  name: "Atone",
  unlock: true,
  outcome: BATTLETREE.LOSS,
  description: [`$$Ren$: "We are so sorry for this misunderstanding. We take full responsibility. What can we do to help?"`,
                `$$TraitorFisher$: "Nothing. You're humans in the middle of monster territory. The penalty for intrusion is death."`,
                `$$Ren$: "Please, listen..."`,
                `The hissing and clicking around you grows louder, somewhat dimmed by the water.`,
                `$$TraitorFisher$: "There is nothing to say. Your sentence is decided."`,
                `Two heavily armed tritons swim in your direction. You try to resist, but you find that the water is blocking your movements. Soon, the sea creatures cut off your head with their scythes.`,
                ],
  extra_function: function(){
    STATS.record.flag("_sirens_tried");
  }
});




// ===================
// =================== ATTACKS
// ===================

var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 1,
  variability: 0.6, // 1 = 100%
};

BATTLE.monster_actions.add_textual(`$$TraitorFisher$: "Objection sustained!"`, attack);
BATTLE.monster_actions.add_textual(`$$TraitorFisher$: "Order in the court!"`, attack);
BATTLE.monster_actions.add_textual(`$$TraitorFisher$: "Overruled!"`, attack);
BATTLE.monster_actions.add_textual(`$$TraitorFisher$: "Motion denied!"`, attack);
BATTLE.monster_actions.add_textual(`$$TraitorFisher$: "The prosecution rests."`, attack);


// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `$$TraitorFisher$: "You're under arrest for trespassing on the territory of the Sirens."`,
);
