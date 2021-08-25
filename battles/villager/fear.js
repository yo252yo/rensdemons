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


add_item(`Weather`, [
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

add_item(`Crops`, [
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

add_item(`War`, [
  [
      `${name}: "Damn these monsters coming from who-knows-were to pillage and destroy our beloved lands!"`,
  ],
  [
      `${name}: "Some say the monster invasion is punishment for our sins. Each monster is born from a sinner. I can't wait to get rid of all the scum so that only pure people remain and the problem will be solved once and for all!"`,
  ],
  [
      `${name}: "I'm sure it's travelers like you who bring the monsters to our doors..."`,
  ],
  [
      `${name}: "Things will only improve after we've thoroughly defeated all the outsiders in battle, and pushed them back where they come from. Or better yet, exterminate them!"`,
  ],
  [
      `${name}: "The monsters won't cease attacking as long as there's impurity in our hearts. We must pray harder!"`,
  ],
]);

add_item(`Hunt`, [
  [
    `${name}: "Our hunters are the best there is! I just hope they are careful and don't bring dangers to our town by getting followed!"`,
  ],
  [
    `${name}: "Truth be told, we almost never hunt. Leaving the town is way too risky."`,
  ],
  [
    `${name}: "I don't trust those hunter folks. They just galivant willy-nilly outside the village. Who knows what kind of stuff happens there..."`,
  ],
]);

add_item(`Taxes`, [
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

add_item(`King`, [
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

add_item(`Health`, [
  [
    `${name}: "We would be fine if it weren't for outsiders bringing plagues and diseases into this beautiful city."`,
  ],
  [
    `${name}: "I'm taking great care of protecting myself. I almost never leave my house, so I don't run into diseases, and I pray the Goddess every hour, so that she protects me!"`,
  ],
  [
    `${name}: "I spend most of my day cleaning my house. We wouldn't have plagues if everyone was as diligent as me. Those bad apples make it hard for the rest of honest folk like me..."`,
  ],
]);

add_item(`Family`, [
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

add_item(`Promised Child`, [
  [
    `${name}: "The Promised Child would have been here a long time ago if people were not so impure. The Goddess did not send us Her child because we're not worthy yet. We haven't prayed enough, it's that simple."`,
  ],
  [
    `${name}: "I'm not sure the Promised Child is ever coming, to be honest. There's so much sin everywhere. I don't know how such a dark environment can birth a holy child. We must repent!"`,
  ],
  [
    `${name}: "I spend all my time praying the Goddess and asking Her to send Her Promised Child to save me. I'm sure She will find my devotion worthy."`,
  ],
]);

add_item(`Job`, [
  [
    `${name}: "The world would be a much better place if everyone was doing their job as diligently as me!"`,
    `$$Ren$: "Oh, what do you do?"`,
    `${name}: "Nothing at the moment, I pray!"`,
  ],
  [
    `${name}: "Most people in this city are devotes. They don't have a job per se, they dedicate their whole life to praying the Goddess and mediating, repenting and asking for forgiveness."`,
  ],
  [
    `${name}: "I belong to the militia. We go through the town and make sure that public order is respected, and that people are acting in a proper and devout way. You might say that I'm the protector of the spiritual peace of this kingdom. So you better watch what you're doing, I'm keeping an eye on you, outsider."`,
  ],
  [
    `${name}: "I work at the temple. We conduct random raids in the village, to punish the corrupt people who are at the root of our suffering. Once we finish getting rid of this scum, surely the Goddess will grant us peace and prosperity. You can see how important my job is."`,
  ],
]);

add_item(`Rumors`, [
  [
    `${name}: "I keep hearing that some people have settled in this city without deserving their place... I'm sure their laziness is attracting monsters upon us..."`,
  ],
  [
    `${name}: "Rumor has it that there are people in this city that do not do their due diligence and pray enough. I'm pretty sure this is true, and this is why the Goddess is punishing us."`,
  ],
  [
    `${name}: "Rumors are plentiful in this city. Nobody is as perfect as me, everyone has dirty laundry. We're still far from a perfect world. If only people tried a little harder..."`,
  ],
  [
    `${name}: "I'm sure that my neighbor is slacking off from prayer. I've heard many people confirming it..."`,
  ],
]);

add_item(`Dreams`, [
  [
    `${name}: "I just wish that everybody was doing as much effort as me..."`,
  ],
  [
    `${name}: "If only we could get rid of the invaders, life would be so much better..."`,
  ],
  [
    `${name}: "I wish there were more hours in the day, so that I could pray the Goddess for longer!"`,
  ],
]);

add_item(`Traditions`, [
  [
    `${name}: "Every week, we hold a citizen tribunal, to confront our unworthy neighbors with their sins. It's for the good of all of us, we must be righteous if we are to survive."`,
  ],
  [
    `${name}: "We have regular deliberations to decide who should we banish from the town. It's important to banish someone every month, it keeps the city pure, and the fear keeps people in check..."`,
  ],
  [
    `${name}: "Despite our trials and banishments, the city is still full of sin. I say we need to be more strict, so that we finally stop attracting monsters."`,
  ],
]);

add_item(`City`, [
  [
    `${name}: "Welcome to the best city in the world! We probably have faults, but we're very devoted to getting rid of them as soon as we notice."`,
  ],
  [
    `${name}: "Welcome to the best city in the world! We work very hard at keeping it pure and weeding out the unwanted elements."`,
  ],
  [
    `${name}: "Things are horrible, it's the fault of outsiders like you and lowlives who are not devoted enough to the Goddess. You better do things the right way if you want to stay here."`,
  ],
  [
    `${name}: "Here, we value purity and devotion!"`,
  ],
]);

add_item(`Religion`, [
  [
    `${name}: "Praise be to the Goddess for keeping us righteous!"`,
  ],
  [
    `${name}: "We pray zealously to show that we are worthy and to keep the bad away from us."`,
  ],
  [
    `${name}: "Religion is the only way to purity which will keep the monsters at bay."`,
  ],
]);


// ===================
//hack NPC RESPONSES
// ===================
var attack = {
  attack_amplitude: 0.05, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 0.2,
  time_variation: 0.8, // 1 = 100%
};
BATTLE.monster_actions.add_textual(`The stranger stares at you judgmentally in silence.`, attack);
BATTLE.monster_actions.add_textual(`The villager's glacial gaze is pretty oppressive.`, attack);
BATTLE.monster_actions.add_textual(`${name} scolds you. What are you doing here? Isn't there somewhere else you should be?`, attack);
BATTLE.monster_actions.add_textual(`${name} doesn't seem convinced that you're telling the truth. They press you for more details.`, attack);
BATTLE.monster_actions.add_textual(`You have to subject yourself to the relentless questioning of ${name}.`, attack);
BATTLE.monster_actions.add_textual(`${name} asks for proof of your faith, but it seems that nothing you say will ever be good enough.`, attack);
BATTLE.monster_actions.add_textual(`${name} asks you an embarrassing questions.`, attack);


// ===================
//hack BASE ACTIONS
// ===================
PLAYER_ACTIONS.escape();
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
