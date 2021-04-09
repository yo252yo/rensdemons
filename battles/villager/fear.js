// This is the City of Fear
// zeal/purity/sectarism/distrust/suspicion/obsession/zeal/exclusion/rejection/isolation/paranoia  > ? rules/faith/guilt
// thigns are horrible, it's probably your fault, you better to things the right way if you dont want to be shunned


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
  attack_amplitude: 0.05, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 0.2,
  time_variation: 0.9, // 1 = 100%
};

BATTLE.monster_actions.add_textual(``, attack);
BATTLE.monster_actions.add_textual(``);

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
  `The villager looks at you suspiciously, their eyes silently asking what you want.`,
  `The villager snappily asks you what you want.`,
  `The villager notices straight away your unfamiliar face. They grumpily come to scold you.`,
  `The person in front of you keeps darting suspicious glances at you and taking quick notes in a small black book.`,
  `${name}: "Who are you and what are you doing here?"`,
  `${name}: "I haven't seen you around here before. We don't really like strangers in this town..."`,
]);
BATTLE.operations.start(start_text);
