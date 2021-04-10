// This is the City of Debauch
// debauchery/lust  > freedom, memories
// thigns are horrible, so we need to make the most of whatever little time we have

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
    `${name}: "Don't really care about that. Interesting things happen at night, anyway."`,
  ],
  [
    `${name}: "Who cares about what's going on in the sky? What matters is what we do here on earth!"`,
  ],
  [
    `${name}: "The storms have become more frequent lately. They'll probably destroy this city soon, so we need to make the most of it before!"`,
  ],
  [
    `${name}: "We hold a rain festival when it rains, and a sun festival when it doesn't! There's never a boring day! Sometimes we do even both in the same day!"`,
  ],
]);

add_item(`"Crops"`, [
  [
    `${name}: "We have the best delicacies in the Kingdom! I mean it's just bread, but with enough wine it'll taste divine!"`,
  ],
  [
    `${name}: "Damn, you missed the harvest festival by a few days! It's a celebration where we get all the crops we've just harvested, and eat them all until we get sick! It's wicked!"`,
  ],
  [
    `${name}: "We don't really store crops, here. We just eat whatever the Goddess provides!"`,
    `$$Ren$: "What about the future? The next cold season?"`,
    `${name}: "Who knows if we'll survive until then. Let's enjoy what we have while we can!"`,
  ],
]);

add_item(`"War"`, [
  [
    `${name}: "Yeah, war is raging, we probably won't hold on much longer, so why not enjoy ourselves?"`,
  ],
  [
    `${name}: "Monsters could raid us any day now, come and have fun before it's too late!"`,
  ],
  [
    `${name}: "My best mate was killed in a raid last week. We could be next. Forget about this stuff, let's make the most of the time we have!"`,
  ],
  [
    `${name}: "Don't be a downer! Why do you have to bring heavy topics like that!"`,
  ],
]);

add_item(`"Hunt"`, [
  [
    `${name}: "There's nothing tastier than a roasted boar! Make sure to try it the next chance you get!"`,
  ],
  [
    `${name}: "Yes, I sometimes hunt. I'm pretty good. I can tell how tasty the prey is going to be just by looking at it."`,
  ],
  [
    `${name}: "Praised be to hunter, I tell you. They are the backbone of this community! They bring us so much good food! We have a big banquet after every hunt!"`,
  ],
]);

add_item(`"Taxes"`, [
  [
    `${name}: "Fuck taxes! I'm not gonna send money to the kingdom when it can be better spent elsewhere, and by elsewhere I mean here!"`,
  ],
  [
    `${name}: "We don't really like taxes, here. Everyone does whatever they want with their money. No, what's really important is that everyone contributes to the potlucks and banquets!"`,
  ],
  [
    `${name}: "I swear I was about to pay my taxes, but then I spent it all in wine instead."`,
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
  attack_amplitude: 0.4, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 1.5,
  time_variation: 0.9, // 1 = 100%
};
BATTLE.monster_actions.add_textual(`You need to fight off the overbearing stranger who's coming a little too close.`, attack);
BATTLE.monster_actions.add_textual(`You struggle to match ${name}'s levels of excitement.`, attack);
BATTLE.monster_actions.add_textual(`You struggle to find an interesting answer.`, attack);
BATTLE.monster_actions.add_textual(`You feel the weight of the social pressure to come up with interesting small talk.`, attack);
BATTLE.monster_actions.add_textual(`${name} tries to share their drink with you, but you do your best to refuse.`, attack);
BATTLE.monster_actions.add_textual(`${name} tries to make you eat something, but you think you should probably refuse.`, attack);

BATTLE.monster_actions.add_textual(`${name} high-fives you.`);
BATTLE.monster_actions.add_textual(`${name} compliments you and says that apparently you're "their kind of people".`);

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
  `The villager jumps at you and passes an arm around your shoulder.`,
  `The villager winks and comes very close to you.`,
  `The villager grabs your arm and pulls you towards them.`,
  `The person in front of you is visibly inebriated. They tumble on you and mumble an apology.`,
  `${name}: "Yo! What's up?"`,
  `${name}: "Hey! Come join the party!"`,
]);
BATTLE.operations.start(start_text);
