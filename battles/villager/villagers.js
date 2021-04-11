
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
  var unlock_proba = 2 / 8; /* avg number of unlocked / total number of possibilities */
  var p = gen.get();
  return p <= unlock_proba;
}


// ===================
//hack ACTIONS
// ===================

PLAYER_ACTIONS.add({
  name: "Expose",
  outcome: BATTLETREE.NOTHING,
  unlock: is_unlocked(),
  description: [`$$Ren$: "I am on to you, I know what you're doing."`,
                `${name}: "What do you mean?"`,
                `$$Ren$: "You and all the other villagers... You're only telling me generic platitudes. You're just dumping expository information on me to teach me about this world, aren't you?`,
                `${name} looks at you, puzzled.`,
                `${name}: "I don't know what you mean, we're just making conversation..."`,
              ],
});

PLAYER_ACTIONS.add({
  name: "Dismiss",
  outcome: BATTLETREE.LOSS,
  unlock: is_unlocked(),
  description: [`$$Ren$: "Why should I listen to what you have to say? You're nobody. You're just a decoration. The Goddess told me you don't have kind of any real importance."`,
                `${name} is really stunned to be talked to that way. After a few seconds of shock, you can see the villager's face grow purple with rage.`,
                `${name}: "What?! How dare you, you little scoundrel! I'll teach you some manners."`,
              ],
});

PLAYER_ACTIONS.add({
  name: "Challenge",
  outcome: BATTLETREE.WIN,
  unlock: is_unlocked(),
  description: [`$$Ren$: "I know what you're going to say before you'll say it..."`,
                `${name}: "Do you, now? How, pray tell!"`,
                `$$Ren$: "The Goddess told me."`,
                `${name}: "Don't you dare use Her Holy name in vain!"`,
                `$$Ren$: "It's true. I'm the Promised Child. I can read your thoughts."`,
                `${name}: "If you are the Promised Child, indeed you probably know."`,
              ],
});

PLAYER_ACTIONS.add({
  name: "Worry",
  outcome: BATTLETREE.NOTHING,
  unlock: is_unlocked(),
  description: [`$$Ren$: "Are you okay? You're always saying the same thing."`,
                `${name}: "What?"`,
                `$$Ren$: "Every time I talk to you, you keep saying the same thing, over and over again. I think you may be crazy."`,
                `${name}: "I think you may be the crazy one..."`,
              ],
});

PLAYER_ACTIONS.add({
  name: "Claim",
  outcome: BATTLETREE.NOTHING,
  unlock: is_unlocked(),
  description: [`$$Ren$: "Give me everything you have."`,
                `${name} seems shocked and amused.`,
                `${name}: "What? Who do you think you are? Didn't your parents teach you some manners?"`,
                `$$Ren$: "I'm the Promised Child! I'm entitled to your possessions!"`,
                `${name}'s expression immediately changes.`,
                `${name}: "I'm so sorry! Please forgive me! Praised be to you and the Goddess. Help yourself to my posessions. You can have anything I have. It isn't much, though."`,
              ],
});

PLAYER_ACTIONS.add({
  name: "Offer",
  outcome: BATTLETREE.NOTHING,
  unlock: is_unlocked(),
  description: [`$$Ren$: "Do you have a quest for me?"`,
                `${name}: "What?"`,
                `$$Ren$: "Do you have a quest for me? An errand I could run for you? The Goddess told me you might."`,
                `${name}: "Hum, sorry, kid, I'm not sure you have the right person. I have nothing for you."`,
                `$$Ren$: "It's training for my future fights! I'm doing all kinds of things to get stronger!"`,
                `${name}: "Good luck!"`,
              ],
});

PLAYER_ACTIONS.add({
  name: "Remind",
  outcome: BATTLETREE.NOTHING,
  unlock: is_unlocked(),
  description: [`$$Ren$: "Don't you remember me?"`,
                `${name}: "What?"`,
                `$$Ren$: "We've already talked! We've already had this exact conversation!"`,
                `${name}: "Sorry, kid. Doesn't ring a bell."`,
              ],
});

PLAYER_ACTIONS.add({
  name: "Directions",
  outcome: BATTLETREE.NOTHING,
  unlock: is_unlocked(),
  description: [`$$Ren$: "Where should I go?"`,
                `${name}: "Beg your pardon?"`,
                `$$Ren$: "I believe you're supposed to give me some sort of hint towards my next objective."`,
                `${name}: "What? Well start by getting the hell out of my way, then."`,
              ],
});


/*
todo more ideas:
- I've been here and I know you
- challenge triggers a riddle or unlocks Expose
- your conversation is weird and unnatural
- more worshiping of you
- topics: hospitality (what are you doing here, etc..., scolding you), games, errands, ancestors, ren, complain about wife, news, other countries, sports, aspiratiosn, siblings (esp. second born), food (fav meal, etc..), travel (did u ever leave the town)

https://elderscrolls.fandom.com/wiki/Generic_Dialogue_(Oblivion)
http://conceptnet.io/c/en/people
*/


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
  `The villager salutes you.`,
  `You start up a conversation.`,
]);
BATTLE.operations.start(start_text);
