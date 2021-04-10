// This is the City of acceptance
// death/praise  > death cult/scapegoat/acceptance
// thigns are horrible, we welcome our death and rejoice in suffering


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
    `${name}: "If the Goddess sent us these storms, it's surely that the wind is good for us. A human can survive on very little food, you know..."`,
  ],
  [
    `${name}: "I don't look at the sky anymore, that way I'm never disappointed if it's not sunny!"`,
  ],
  [
    `${name}: "You're looking at things the wrong way. What good is the sun, apart for the crops? What good are the crops, apart keeping us alive longer? And why would I want to be apart from the Goddess any longer than necessary?"`,
  ],
]);

add_item(`"Crops"`, [
  [
    `${name}: "I don't really need food, I'll eat while there is some, but I'll be glad to join the Goddess when She calls me back to Her."`,
  ],
  [
    `${name}: "Wheat is the food of the body. Mine is already dead. Soon it will be nothing but dust. What matters is the food of the spirit."`,
  ],
  [
    `${name}: "I don't mind famine. If we had food, we'd stay alive longer, and then we'd suffer for longer."`,
  ],
]);

add_item(`"War"`, [
  [
    `${name}: "War will always be with us, it's simply the best way for us to go back to our Goddess."`,
  ],
  [
    `${name}: "When monsters raid us next, I won't fight back. Death is the only relief from the fear of the next raid."`,
  ],
  [
    `${name}: "We have less raids than other parts of the Kingdom because we send sacrifices to the monsters. It appeases their appetite."`,
  ],
  [
    `${name}: "Best not think about it!"`,
    `$$Ren$: "Shouldn't you prepare yourselves to defend?"`,
    `${name}: "What's the use, we don't stand a chance. Best prepare ourselves for our inevitable demise."`,
  ],
]);

add_item(`"Hunt"`, [
  [
    `${name}: "Yes, we do hunt most of our food. It's a very spiritual moment between the hunter and their prey. We'll all be united in death, sometime."`,
  ],
  [
    `${name}: "I like to hunt and to take other animals' lives. It's good practice for when I'll have to take my own."`,
  ],
  [
    `${name}: "What's the point in hunting? Why take innocent lives to prolong ours, since we are doomed anyway."`,
  ],
]);

add_item(`"Taxes"`, [
  [
    `${name}: "We don't pay taxes to the kingdom. What's the point, soon there won't be a kingdom left."`,
  ],
  [
    `${name}: "Yes, I usually give all my money. I won't need it soon, anyway."`,
  ],
  [
    `${name}: "Since I'm dying soon, I'm don't keep any money. So there's nothing to take from."`,
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
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 2,
  react_time_s: 1,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual(`There's an awkward silence during which you don't know what to say.`, attack);
BATTLE.monster_actions.add_textual(`${name} is looking at you in silence.`, attack);
BATTLE.monster_actions.add_textual(`You feel that the villager's gloominess is getting to you.`, attack);

BATTLE.monster_actions.add_textual(`${name} stares at you with empty eyes.`);
BATTLE.monster_actions.add_textual(`${name} stands still in front of you.`);
BATTLE.monster_actions.add_textual(`${name} sighs.`);
BATTLE.monster_actions.add_textual(`${name} simply waits for the conversation to go on.`);


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
  `The villager salutes you with a monotonous voice.`,
  `The villager barely raises an eyebrow noticing you.`,
  `The villager doesn't react to your presence.`,
  `The person in front of you is barely moving. If it weren't for their breathing, you might think they were a statue.`,
  `${name}: "Hi!"`,
  `${name}: "Hi! We're glad your path lead you here. We hope you'll share our peace!"`,
]);
BATTLE.operations.start(start_text);
