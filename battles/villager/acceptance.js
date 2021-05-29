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


add_item(`Weather`, [
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

add_item(`Crops`, [
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

add_item(`War`, [
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

add_item(`Hunt`, [
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

add_item(`Taxes`, [
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

add_item(`King`, [
  [
    `${name}: "He owns us. I'll follow his orders and do whatever I can to contribute, even if it's a lost cause!"`,
  ],
  [
    `${name}: "Poor lad, thrown in charge of this mess and tasked with an impossible quest. It's a lost battle, and yet he has to fight... I tell you, wouldn't want to be him..."`,
  ],
  [
    `${name}: "Sometimes I dream about his death. Surely after he's gone we can all officially give up, and this whole suffering will end."`,
  ],
]);

add_item(`Health`, [
  [
    `${name}: "Diseases are a blessing in disguise. Most often the pain is short and you die pretty fast."`,
  ],
  [
    `${name}: "I don't fear diseases. I'm sure monsters will kill you before you get a chance to get sick."`,
  ],
  [
    `${name}: "Health comes and goes, it's unavoidable. I'm not a big believer in hygiene. There's no use trying to avoid plagues, they'll get to you eventually."`,
  ],
]);

add_item(`Family`, [
  [
    `${name}: "I don't want children. I can't bring myself to impose this worlf of suffering on others."`,
  ],
  [
    `${name}: "Most of my family is already dead. My siblings are waiting for me with the Goddess. I can't wait for my turn to join them."`,
  ],
  [
    `${name}: "My only child was stillborn. It's probably just as well, at least she didn't suffer. She might be the lucky one."`,
  ],
]);

add_item(`Promised Child`, [
  [
    `${name}: "The Promised Child could come, or not. It doesn't matter. It's too late."`,
  ],
  [
    `${name}: "I'm sure the Promised Child was born a long time ago and was killed by the monsters. Maybe there was even several Promised Children."`,
  ],
  [
    `${name}: "I think it's pretty clear by now that the Promised Child is not coming. We've waited hundreds of years. Why would they come now?"`,
  ],
]);

add_item(`Job`, [
  [
    `${name}: "I have the priviledge to work on building tombs. It's an important responsibility. Our lives are transient, but our final rest will be eternal!"`,
  ],
  [
    `${name}: "I offer council to prepare people for death. I organize sessions of prayers and meditations. I guess you could call me a guide for the spirits."`,
  ],
  [
    `${name}: "I'm what you'd call the executioner, I guess. I'm in charge of picking the sacrifices, preparing them, and executing the ceremony at the altar. It's probably the most important job of all!"`,
  ],
  [
    `${name}: "I don't have a job. I don't want to waste my time building things that are just going to be destroyed or disappear."`,
  ],
]);

add_item(`Rumors`, [
  [
    `${name}: "I hear there will be a raid soon. Many will die. I hope my turn comes."`,
  ],
  [
    `${name}: "Many here are saying that the Goddess has abandonned us. I can't tell if it's true, but it sure looks like it."`,
  ],
  [
    `${name}: "People around here keep saying that the grave is a better place than this wretched world. I'm not sure if I believe them, but if things keep piling up, I might..."`,
  ],
]);

add_item(`Dreams`, [
  [
    `${name}: "My only wish is for my death to be painless."`,
  ],
  [
    `${name}: "I just wish the pain would stop."`,
  ],
  [
    `${name}: "I hope our sacrifice pleases the Goddess and spares us a bit from suffering."`,
  ],
]);

add_item(`Traditions`, [
  [
    `${name}: "Every month, we designate a sacrifice, who gets killed in the church as an offering to the Goddess. We hope it eases her anger, and lessens our punishment."`,
  ],
  [
    `${name}: "We do regular sacrifices to the Goddess. We all want to give ourselves to Her, so we draw the lucky chosen at random. Only our blood willingly offered can appease the Goddess."`,
  ],
  [
    `${name}: "No matter how many executions we do, the Goddess will not stop punishing her. I don't dare imagine how much worse things would be without our sacrifices."`,
  ],
]);

add_item(`City`, [
  [
    `${name}: "Welcome to the best city in the world! The only place with the courage to look at reality in the face!"`,
  ],
  [
    `${name}: "Welcome to the best city in the world, where we know how wretched our kind is. We try very hard to atone and to appease the anger of the Goddess by making sacrifices."`,
  ],
  [
    `${name}: "Things are horrible, the only sensible thing to do is to accept our inevitable death and learn to love our suffering."`,
  ],
  [
    `${name}: "Here, we value wisdom and knowledge. Once you know your fate, you must accept it."`,
  ],
]);

add_item(`Religion`, [
  [
    `${name}: "Praise be to the Goddess and may She forgive us and lessen Her punishment!"`,
  ],
  [
    `${name}: "We pray, offer blood and lives, so that the Goddess may forgive us and ease our pain!"`,
  ],
  [
    `${name}: "Religion is the only way to forgiveness which will keep our punishment bearable."`,
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
