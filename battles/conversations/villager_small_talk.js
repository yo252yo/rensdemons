// ===================
//hack LOADING
// ===================

// get the sprite name from BATTLE.make_conversation
var sprite = BATTLE.pending_text[0];
var gen = new Generator(BATTLE.pending_text[1]);

var s = new CenteredMovingImage("assets/characters/" + sprite + ".png", 'background', 32, 48);
var name = "Villager";

if (sprite == "villager2" || sprite == "villager3") {
  name = gen.pick(DATASETS.male_names);
} else {
  name = gen.pick(DATASETS.female_names);
}

var unlocked_keys = [];
var is_unlocked = function(key){
  var unlock_proba = 3 / 10; /* avg number of unlocked / total number of possibilities */
  var p = gen.get();
  return p <= unlock_proba;
}

var add_item = function(name, choices){
  PLAYER_ACTIONS.mutually_exclusive(name, choices, is_unlocked(), BATTLETREE.NOTHING);
}

// ===================
//hack PLAYER ACTIONS
// ===================


add_item("Weather", [
  [
    `${name}: "What a crazy weather we're having lately, right? If the rain keeps going on that way, the crops are sure to rot, and we'll have another famine on our hands..."`,
  ], [
    `${name}: "The winds from the east have been strong lately. Surely it's an omen of good beginnings."`,
  ], [
    `${name}: "I'm so glad to see a bit of sun today. It's been so cloudy lately. Praised be the Goddess for this blessed vision."`,
  ], [
    `${name}: "Could the Goddess bless us with a bit of sunlight? Life's hard enough as it is..."`,
  ],
  ]);

add_item("War", [
  [
    `${name}: "Won't the fights ever cease? One of these days, the monsters will breach our walls. I have nightmares about it every night."`,
  ], [
    `${name}: "Day after day, the same threats. My parents fought in the war. My siblings fight in the war. My children will fight in the war. Is there no end to our suffering? When was the last time of peace? Who even remembers?"`,
  ], [
    `${name}: "I cannot wait to go back out on the battlefield. I'll make the Goddess proud, and rid us of this scum."`,
  ], [
    `It's a touchy subject. ${name} seems to fight back tears. Who knows what losses the war has caused already... The wound still seems fresh.`,
  ],
  ]);

add_item("Crops", [
  [
    `${name}: "I worry about food a lot. The years where we have enough to eat are rare. Not only do we need clement weather, but the raids can destroy monthes of hard work. The Goddess sure is hard on us."`,
  ], [
    `${name}: "I've been trying to breed new varieties of wheat. Make them more resilient to the rain and suchlikes. I don't have much to show for it, but I'm keeping hope. These things take time."`,
  ], [
    `${name}: "We mostly live from our own crops, like many people in this town, but there's so little space we can farm within the city walls. And everything outside can be destroyed any day."`,
  ],
  ]);

add_item("Hunt", [
  [
    `${name}: "I'm no hunter, but I wish them good luck. With all the raids, they're our main source of food, y'know."`,
  ], [
    `${name}: "Yep, I'm a hunter. I know I don't look the part, but I'm bringing game every day or so."`,
  ], [
    `${name}: "The secret to being a hunter, kid, is to know the patterns of your preys. But even more than that, you gotta know about the monsters. That's why we hunt at dawn, when there's fewer of these bastards around."`,
  ],
  ]);

add_item("Taxes", [
  [
    `${name}: "Look, I'm like anyone, of course I don't like paying, but that's something we have to do if we want the guard to protect us. With them monsters and all, someone has to protect the town. It's all worth it if you ask me."`,
  ], [
    `${name}: "It's crazy what they take us! We can barely afford to eat as it is! I'd say the times are tough, but truth is I've never seen it any other way."`,
  ], [
    `${name}: "I had a bit of coins on the side, I was working on a present for my Second Born, for her trial. But with the rise of taxes this year, I had to give it up. It's just as well, she's probably not the Promised Child anyway."`,
  ],
  ]);

add_item("King", [
  [
    `${name}: "The King? Yea, he's allright. Sure this is no paradize, but what can he do except wait for the Goddess to send us a Promised Child?"`,
  ], [
    `${name}: "I ain't gonna badmouth royalty with a stranger. So I ain't gonna say nothing."`,
  ], [
    `${name}: "He's a fine lad. I hope the Goddess helps him bring salvation to the lands."`,
  ],
  ]);

add_item("Health", [
  [
    `${name}: "With the monsters raiding our crops, we barely have enough to eat. We're more often sick than not. It's fortunate that we have the Goddess to watch over us, because there isn't much else to give us hope down here..."`,
  ], [
    `${name}: "We haven't had a plague this decade, I think. So I think it's going pretty well. Though no doubt the monsters will bring another soon..."`,
  ], [
    `${name}: "Three of my children did not make it past 1. Winters are too cold here, and crops are too rare. My Second Born was among them. What if he was the Promised Child? Will this misery continue forever?"`,
  ],
  ]);

add_item("Children", [
  [
    `${name}: "Between infant mortality and the Second Born trial, I haven't much to call a child. I just hope my little ${gen.pick(DATASETS.male_names)} grows up to do us proud."`,
  ], [
    `${name}: "I don't have one yet. I suppose I should get busy soon. I want many little ones to carry on my legacy. The Goddess permitting, of course!"`,
  ], [
    `${name}: "My little one looks just like you. You should come back later, you could play together."`,
  ], [
    `${name}: "Have you come to play with them? They're working the fields, now. I don't think they'll have time to play today. Sorry."`,
  ],
  ]);

add_item("Promised Child", [
  [
    `${name}: "The Promised Child can't come soon enough, I tell you. This town cannot survive much longer, I reckon. Then again my dad used to say the same thing. We're a town of survivors."`,
  ], [
    `${name}: "You are the Promised Child? You must be joking. Oh, sweetie, I wish it were true. These are serious topics, don't make such cruel jokes."`,
  ], [
    `${name}: "I hear there's another trial going on today. I can't wait to know the results."`,
  ], [
    `${name}: "Are you? Are you sure? Praised be the Goddess, can I touch you?"`,
    `Without waiting for your answer, ${name} puts a hand on your shoulder. In a weird holy transe, ${name} then falls on the ground and starts weeping tears of joy, muttering prayers to the Goddess.`
  ],
  ]);

add_item("Job", [
  [
    `${name}: "How sweet of you to ask. I'm a tanner. I get the skin from the animals that the hunters bring back, and I make all kind of clothes out of them. Do you like my jacket? Maybe I can make you one some day."`,
  ], [
    `${name}: "I'm a butcher. I prepare meat from whatever the hunters bring. It's dirty, but without me nobody could eat!"`,
  ], [
    `${name}: "I'm the blacksmith. I make the weapons that our fine guards use to defend our town. And the tools our hunters use to bring us our food."`,
  ], [
    `${name}: "Mason isn't an easy job. I made this house with my bare hands. And maybe yours, too."`,
  ], [
    `${name}: "With the forest all around, we will always need lumberjacks. Wood has so many uses, not the least of which is to warm us through the night."`,
  ],
  ]);

//todo: other potential topics: religion, rumours about others, games, errands, ancestors, this town, ren, complain about wife, news, other countries, sports, dreams/aspiratiosn, siblings (esp. second born), food (fav meal, etc..), travel (did u ever leave the town)

// ===================
//hack NPC RESPONSES
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 2,
  react_time_s: 1,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual(`You feel the weight of the social pressure to come up with interesting small talk.`, attack);
BATTLE.monster_actions.add_textual(`You struggle to find an interesting answer.`, attack);
BATTLE.monster_actions.add_textual(`There's an awkward silence during which you don't know what to say.`, attack);
BATTLE.monster_actions.add_textual(`${name} asks you an embarrassing question.`, attack);
BATTLE.monster_actions.add_textual(`The villager mumbles some platitudes with a warm smile.`);
BATTLE.monster_actions.add_textual(`${name} compliments your hair.`);


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
  "This villager seems interested in talking to you. They greet you with a big smile.",
  "This villager starts the conversation with a warm greeting.",
  "It looks like small talk is unavoidable. What topic will you chose?",
  "What will you talk about?",
]);
BATTLE.operations.start(start_text);
