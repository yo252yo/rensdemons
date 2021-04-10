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
      `${name}: "Damn these monsters coming from who-knows-were to pillage and destroy our beloved lands!"`,
  ],
  [
      `${name}: "Some say the monster invasion is punishment for our sins. Each monster is born from a sinner. I can't wait to get rid of all the scum so that only pure people remain and the problem will be solved once and for all!"`,
  ],
  [
      `${name}: "I'm sure it's travellers like you who bring the monsters to our doors..."`,
  ],
  [
      `${name}: "Things will only improve after we've thouroughly defeated all the outsiders in battle, and pushed them back where they come from. Or better yet, exterminate them!"`,
  ],
  [
      `${name}: "The monsters won't cease attacking as long as there's impurity in our hearts. We must pray harder!"`,
  ],
]);

add_item(`"Hunt"`, [
  [
    `${name}: "Our hunters are the best there is! I just hope they are careful and don't bring dangers to our town by getting followed!"`,
  ],
  [
    `${name}: "Truth be told, we almost never hunt. Leaving the town is way too risky."`,
  ],
  [
    `${name}: "I don't trust those hunter folks. They just galavant willy-nilly outside the village. Who knows what kind of stuff happens there..."`,
  ],
]);

add_item(`"Taxes"`, [
  [
    `${name}: "I don't mind financing our war efforts. But I do mind when the money is spent in useless bails for unworthy people, or even worse, outsiders."`,
  ],
  [
    `${name}: "I'm paying my dues. I'm not convinced that everyone else is doing the same. I'm pretty sure there's corruption somewhere. With the amount I've donated, we should have won the war by now!"`,
  ],
  [
    `${name}: "I don't like paying taxes. You can't ever be sure that the money doesn't end up in the wrong pocket. Not everyone is an upstanding citizen like I am."`,
  ],
]);

add_item(`"King"`, [
  [
    `${name}: "He's too weak, we need someone stronger to weed out the bad elements of this kingdom, and to kick the intruders out!"`,
  ],
  [
    `${name}: "If I was king, I wouldn't have let things get this bad."`,
  ],
  [
    `${name}: "Yes, I support the king. I'm not one of those troublemakers causing chaos in our fine kingdom."`,
  ],
]);

add_item(`"Health"`, [
  [
    `${name}: "We would be fine if it weren't for outsiders bringing plagues and diseases into this beautiful city."`,
  ],
  [
    `${name}: "I'm taking great care of protecting myself. I almost never leave my house, so I don't run into diseases, and I pray the Goddess every hour, so that she protects me!"`,
  ],
  [
    `${name}: "I spend most of my day cleaning my house. We wouldn't have plagues if everyone was as diligent as me. Those bad apples make it hard for the rest of honnest folk like me..."`,
  ],
]);

add_item(`"Family"`, [
  [
    `${name}: "I cut ties with my family. Their morals were too loose for my taste. I didn't want to be associated with this kind of people, and become part of the problem."`,
  ],
  [
    `${name}: "When I meet someone right, and we have children together, we'll educate them properly. Moral standards have been going down lately, and the children are as bad as it gets. No wonder why we get divine punishments..."`,
  ],
  [
    `${name}: "I want to start a family, I just haven't met the right person. It's important for me that my life partner is pure, you know. I wouldn't want to invite misfortune on our home. I need to chose carefully!"`,
  ],
]);

add_item(`"Promised Child"`, [
  [
    `${name}: "The Pomised Child would have been here a long time ago if people were not so impure. The Goddess did not send us Her child because we're not worthy yet. We haven't prayed enough, it's that simple."`,
  ],
  [
    `${name}: "I'm not sure the Promised Child is ever coming, to be honnest. There's so much sin everywhere. I don't know how such a dark environment can birth a holy child. We must repent!"`,
  ],
  [
    `${name}: "I spend all my time praying the Goddess and asking Her to send Her Promised Child to save me. I'm sure She will find my devotion worthy."`,
  ],
]);

add_item(`"Job"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"Rumors"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"Dreams"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"Traditions"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"City"`, [
  [
    `${name}: ""`,
  ],
]);

add_item(`"Religion"`, [
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
