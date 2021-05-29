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


add_item(`Weather`, [
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

add_item(`Crops`, [
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

add_item(`War`, [
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

add_item(`Hunt`, [
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

add_item(`Taxes`, [
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

add_item(`King`, [
  [
    `${name}: "Never seen him, though we keep sending him invitations to our festivals! Why should I care?"`,
  ],
  [
    `${name}: "He's so beautiful! A bit old, but experience can be a good thing, if you know what I mean. You can tell by his look that he's been through a lot. He can surely teach me a thing or two."`,
  ],
  [
    `${name}: "I hear he gives the most extravagant parties! What wouldn't I give for an invite to the luxury of the royal palace!"`,
  ],
]);

add_item(`Health`, [
  [
    `${name}: "There are some who say that too much drinking is bad for your health. But how can it be true if it feels so great?"`,
  ],
  [
    `${name}: "I'll make the most of my body until it cannot withstand it anymore!"`,
  ],
  [
    `${name}: "Diseases can kill you any day, you know. Nothing you can do about that. The only thing you can actually do is make sure you live a life worth living before that time comes!"`,
  ],
]);

add_item(`Family`, [
  [
    `${name}: "Spend as much time as you can with your family! Cherish them! Don't you just love a big family meal!?"`,
  ],
  [
    `${name}: "Have you come to play with my children? Sorry, they're off with their friends now, somewhere in the village. You can wait with me until they come back, if you want."`,
  ],
  [
    `${name}: "Yes, I have a few children here and there. We don't have a strict model of family in this city, we're a community. Or if you look at it another way, we are one giant family!"`,
    ],
]);

add_item(`Promised Child`, [
  [
    `${name}: "The Promised Child has been found? Amazing! We must celebrate! Let's start planning the biggest party ever!"`,
  ],
  [
    `${name}: "When the Promised Child gets there, we're going to throw a festival, and it'll be the biggest and grandest celebration anyone has ever thrown! We've been working on plans for decades, you know!"`,
  ],
  [
    `${name}: "You know, it's only logical, the best thing we can do to help with the coming of the Promised Child is to make as many children as we can..."`,
  ],
]);

add_item(`Job`, [
  [
    `${name}: "Life is too short to waste it on a job!"`,
  ],
  [
    `${name}: "Jobs only serve to limit your potential and trap you in a mold. Here, we do whatever we feel like."`,
  ],
  [
    `${name}: "In this city, we're all a bit poet, cook or musician. Dancer one day, painter the next... Follow your heart, surely that's what the Goddess wants!"`,
  ],
  [
    `${name}: "We don't have masons or blacksmiths, so there's less and less buildings and tools we can use, but we all share what's left!"`,
  ],
]);

add_item(`Rumors`, [
  [
    `${name}: "I hear the end of the world will be in three days, and we're gonna have a huge feast just before!"`,
  ],
  [
    `${name}: "Rumor has it that there's a party tomorrow at  ${gen.pick(DATASETS.male_names)}'s place. Very exclusive event. You didn't hear it from me."`,
  ],
  [
    `${name}: "Everyone is talking about that new kind of wine that a trader brought us last week. I wonder if there is any left..."`,
  ],
]);

add_item(`Dreams`, [
  [
    `${name}: "I don't know, I'm simple, I just wish for good food, good drinks, and good company."`,
  ],
  [
    `${name}: "Well, I could always use more money..."`,
  ],
  [
    `${name}: "When I was a child, I tried the frutiest wine I've ever tasted... What I wouldn't give for another drop of this delicious wine!"`,
  ],
]);

add_item(`Traditions`, [
  [
    `${name}: "Every week we throw a big ball where every artist in town can demonstrate the new songs, dances or poems they came up with!"`,
  ],
  [
    `${name}: "Every month a lot of villagers get together for a big or... wait, you're probably too young for me to tell you about that!"`,
  ],
  [
    `${name}: "We have festivals for each big occasion! Seasons, great people, historical events, spirits of nature... We celebrate something every week or so!"`,
  ],
]);

add_item(`City`, [
  [
    `${name}: "Welcome to the best city in the world! We know how to have fun and live a good life, here!"`,
  ],
  [
    `${name}: "Welcome to the best city in the world! We know how fragile life is, so we enjoy every day to the fullest!"`,
  ],
  [
    `${name}: "Things are horrible, so we need to make the most of whatever little time we have left on this world!"`,
  ],
  [
    `${name}: "Here, we value pleasure. That's all we have in our fleeting lives."`,
  ],
]);

add_item(`Religion`, [
  [
    `${name}: "Praise be to the Goddess for giving us such pleasant experiences!"`,
  ],
  [
    `${name}: "We pray so the Goddess gives us more food and drinks!"`,
  ],
  [
    `${name}: "Religion? It's a good subject of inspiration for art, a great way to transcend our mortal senses."`,
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
