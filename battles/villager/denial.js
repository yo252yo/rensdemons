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
    `${name}: ""`,
  ],
]);

add_item(`"War"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"Crops"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"Hunt"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"Taxes"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"King"`, [
  [
    `${name}: ""`,
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
