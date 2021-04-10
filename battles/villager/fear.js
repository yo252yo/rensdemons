// This is the City of Fear
// zeal/purity/sectarism/distrust/suspicion/obsession/zeal/exclusion/rejection/isolation/paranoia  > ? rules/faith/guilt
// thigns are horrible, it's probably your fault, nobody prays enough, you better do things the right way if you dont want to be shunned


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
    `${name}: "Yes, the weather has been dreadful. It's obvious, since we share the sky with lowlives heretics, we must also share their punition..."`,
  ],
  [
    `${name}: "It's such a shame that the Goddess has to punish all of us for the actions of a few bad apples..."`,
  ],
  [
    `${name}: "If only people were more zealous, the Goddess wouldn't have to ruin the crops to punish them..."`,
  ],
]);

add_item(`"Crops"`, [
  [
    `${name}: "We all have to ration ourselves pretty strictly to make sure that the food supplies last. We don't get a lot, with all the outsiders coming in, destroying our crops, stealing our supplies..."`,
  ],
  [
    `${name}: "Are you here to steal my food? I've earned it fair and square. I'm not going to give it to outsiders like you."`,
  ],
  [
    `${name}: "Why don't you farm your own crops before enquiring about honest folks like me? A lot of talking, not a lot of working... It's because of people like you that the Goddess has forsaken us!"`,
  ],
  [
    `${name}: "We get really worse yields than we deserve. It's because people are not praying enough. I spend hours every day repenting, and I wish I could do more."`,
  ],
]);

add_item(`"War"`, [
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
BATTLE.monster_actions.add_textual(`The stranger stares at you judgmentally in silence.`, attack);
BATTLE.monster_actions.add_textual(`The villager's glacial gaze ie pretty oppressive.`, attack);
BATTLE.monster_actions.add_textual(`${name} scolds you. What are you doing here? Isn't there somewhere else you should be?`, attack);
BATTLE.monster_actions.add_textual(`${name} doesn't seem convinced that you're telling the truth. They press you for more details.`, attack);
BATTLE.monster_actions.add_textual(`You have to subject yourself to the relentless questioning of ${name}.`, attack);
BATTLE.monster_actions.add_textual(`${name} asks for proof of your faith, but it seems that nothing you say will ever be good enough.`, attack);
BATTLE.monster_actions.add_textual(`${name} asks you an embarrassing questions.`, attack);


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
