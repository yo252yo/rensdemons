// This is the City of Hope
// exposition/duty/perseverance/bravery/sacrifice/patience
// thigns are horrible, but we're keeping faith in a better tomorrow. despite all odds


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
    `${name}: "What a crazy weather we're having lately, right? Only a few more days of rain and the crops will start rotting. It's not going to happen, though, the Goddess is with us. The sun will be back any day now."`,
  ],
  [
    `${name}: "The winds from the east have been strong lately and destroyed many crops. Winds from the east... It's an omen of good beginnings."`,
  ],
  [
    `${name}: "I'm so glad to see a bit of sun today. It's been so cloudy lately, I haven't been able to grow anything. Praised be the Goddess for this blessed vision."`,
  ],
  [
    `${name}: "This period of famine will pass soon! The Goddess is here above us. She'll bring us some sun any day, I'm sure!"`,
  ],
]);

add_item(`"Crops"`, [
  [
    `${name}: "We haven't had enough to eat for years. Not only do we need clement weather, but the raids can destroy monthes of hard work. This would be terrifying if the Goddess wasn't there to guarantee a better future soon."`,
  ],
  [
    `${name}: "I've been trying to breed new varieties of wheat. Make them more resilient to the rain and suchlikes. So far, all my attempts have failed, but I'm keeping hope. These things take time."`,
  ],
  [
    `${name}: "We mostly live from our own crops, like many people in this town. Anything outside the city walls can be destroyed any day. But fortunately, we have some space to farm in the city. It's tiny, but it can provide us several days worth of food!"`,
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
/*var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 2,
  react_time_s: 1,
  time_variation: 0.5, // 1 = 100%
};*/

BATTLE.monster_actions.add_textual(`${name} compliments your hair.`);
BATTLE.monster_actions.add_textual(`${name} is impressed. You're so mature for your age. You really got the Goddess's blessings.`);
BATTLE.monster_actions.add_textual(`The villager mumbles some platitudes with a warm smile.`);
BATTLE.monster_actions.add_textual(`${name} blesses the Goddess for having allowed your meeting.`);
BATTLE.monster_actions.add_textual(`${name} politely asks you questions about your day.`);
BATTLE.monster_actions.add_textual(`${name} is holding on to your every word, eager to hear what you'll say next.`);

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
  `The villager is interested in talking to you and greets you with a big smile.`,
  `This villager starts the conversation with a warm greeting.`,
  `The villager waves at you, you feel like you should answer.`,
  `The person in front of you clearly hasn't had enough to eat in a while, and yet a faint smile is shining on their face as they greet you.`,
  `${name}: "Hello, may the Goddess light your path!"`,
  `${name}: "Hello! I'm sorry, this city is not great, but we're working hard on improving it!"`,
]);
BATTLE.operations.start(start_text);
