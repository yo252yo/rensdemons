// This is the City of Denial
// ignorance/delusion/lie/pretend  > cant see others?
// thigns are horrible in actuality, but we cannot see them so everything is amazing and this is the best possible world


// ===================
//hack LOADING
// ===================

// get the sprite name from BATTLE.make_conversation
var sprite = SPECIALBATTLES._battle_extra_data[0];
var gen = new Generator(SPECIALBATTLES._battle_extra_data[1]);

var s = new CenteredMovingImage("assets/characters/" + sprite + ".png", 'background', 32, 48);
var name = "Villager";

if (sprite == "villager2" || sprite == "villager3") {
  name = gen.pick(DATASETS.male_names);
} else {
  name = gen.pick(DATASETS.female_names);
}

var unlocked_keys = [];
var is_unlocked = function(key){
  var unlock_proba = 3 / 16; /* avg number of unlocked / total number of possibilities */
  var p = gen.get();
  return p <= unlock_proba;
}

var add_item = function(name, choices){
  PLAYER_ACTIONS.mutually_exclusive(name, choices, is_unlocked(), BATTLETREE.NOTHING);
}

// ===================
//hack PLAYER ACTIONS
// ===================


add_item(`"Weather"`, [
  [
    `${name}: "Is there anything better than this great sunshine?"`,
    `You are perplexed, as the sky is full of dark clouds.`,
  ],
  [
    `${name}: "I love days of warm weather like this"`,
    `$$Ren$: "But.. it's cold, and raining!"`,
    `${name}: "Poor child, you're delusional. Your brain must be hurt from the tough circumstances you've lived through..."`,
  ],
  [
    `${name}: "This is the perfect temperature for crops!"`,
    `${name} points in a direction where you can see a few fruits on the ground. They are obviously smaller than they should have been, as if they didn't develop properly.`,
  ],
]);

add_item(`"Crops"`, [
  [
    `${name}: "What do you mean reserves are slim? You must be misinformed, there's plenty of food in store!"`,
  ],
  [
    `${name}: "Do you want to share my bread? It's a bit stale, but I've had worse..."`,
    `$$Ren$: "Hum excuse me, sorry, I think this is a rock..."`,
  ],[
    `${name}: "Did you not see the lustrous fields all around our glorious city? We have plenty of food to spare!"`,
    `$$Ren$: "Actually, all I saw were ravaged lands..."`,
    `${name}: "That's odd... You probably came from a weird direction then, that must be it!"`,
  ],
]);

add_item(`"War"`, [
  [
    `${name}: "What are you talking about? There's no war in this city."`,
  ],
  [
    `${name}: "I, for one, have never seen any monster around here. I'm not sure what you're talking about."`,
  ],
  [
    `${name}: "War? I've only ever known this period of peace and quiet."`,
  ],
  [
    `${name}: "What country are you talking about? Yours? It sounds awful, I'm so glad to live here."`,
  ],
]);

add_item(`"Hunt"`, [
  [
    `${name}: "Hunting is pretty easy in these parts. Animals just come to us!"`,
  ],
  [
    `${name}: "Don't you just love taking a little stroll in the woods and hunt whatever comes your way?"`,
  ],
  [
    `${name}: "That's a common misconception, hunting doesn't actually hurt the animals, you know."`,
  ],
]);

add_item(`"Taxes"`, [
  [
    `${name}: "Sure, I'll gladly pay my taxes, it's what allows the king to make our kingdom such a wonderful and safe place!"`,
  ],
  [
    `${name}: "We barely pay any taxes, and in exchange we get protections and services from the kingdom. Talk about a good deal!"`,
  ],
  [
    `${name}: "Pay taxes? To whom?"`,
  ],
]);

add_item(`"King"`, [
  [
    `${name}: "All hail our mighty king, the glorious and perfect leader of this great nation!"`,
  ],
  [
    `${name}: "He is doing such an outstanding job! It's thanks to him that we're so prosperous! I can't imagine a better king."`,
  ],
  [
    `${name}: "You know what, I don't think he exists. Never seen him in person, and things have always been just fine."`,
  ],
]);

add_item(`"Health"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"Children"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"Promised Child"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"Job"`, [
  [
    `${name}: ""`,
  ],
]);


// ===================
//hack NPC RESPONSES
// ===================
var attack = {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 1,
  time_variation: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual(`The constant cheerfullness of your conversation partner is a bit too much to handle.`, attack);
BATTLE.monster_actions.add_textual(`You need to carefully craft your answer to not contradict ${name}'s weird inconsistent answer.`, attack);
BATTLE.monster_actions.add_textual(`You try to tiptoe carefully around the truth to not break ${name}'s rosy bubble of optimism.`, attack);

BATTLE.monster_actions.add_textual(`${name} smiles in silence. Their enthusiasm is almost contagious.`);
BATTLE.monster_actions.add_textual(`You listen as ${name} rambles on about how great this city is.`);
BATTLE.monster_actions.add_textual(`${name} goes on in pointless details about how great a day they're having.`);


// ===================
//hack BASE ACTIONS
// ===================
var escapes = [
  "End conversation",
  "Bid farewell",
  "Say goodbye",
  "Run away"
];
BATTLETREE.api.declare_all(BATTLE.current_battle, escapes);
PLAYER_ACTIONS.escape(gen.pick(escapes));
PLAYER_ACTIONS.useless(ABILITY.Pray);

// ===================
//hack START
// ===================
var start_text = gen.pick([
  `The villager politely greets you.`,
  `The villager greets you with open arms and a friendly face.`,
  `The villager doesn't seem to notice you. They are startled when you speak.`,
  `The person in front of you is smiling in spite of what seems to be a pretty deep fresh wound on their arm.`,
  `${name}: "Hello! Isn't it a beautiful day?"`,
  `${name}: "Hello! Welcome to the best city on this world!"`,
]);
BATTLE.operations.start(start_text);
