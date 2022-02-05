
new CenteredMovingBattleImage("assets/characters/party/DisguisedPrincess.png", 'background',32,48, 2);

AUDIO.music.characters.DisguisedPrincess();
PLAYER_ACTIONS.escape();

var go = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Go`,
  unlock: true,
  description: [
    `$$Ren$: "Let's go then!"`,
  ],
  outcome: BATTLETREE.WIN,
});


// -------------------------------------------------------------------------------------
var plan = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Plan`,
  unlock: true,
  description: [
    `$$Ren$: "Huh... Don't we need... You know... a plan or something? There's a lot of guards, they won't let us just walk out!"`,
    `$$DisguisedPrincess$: "Oh right, you're right! Good thinking! How did you know?`,
    `$$DisguisedPrincess$: "I almost forgot! Sorry, I got too excited because it's the first time ever I get to interact in private with an adventurer! And to think I've been working on this plan for years! And now I have someone to help!"`,
    `$$DisguisedPrincess$'s thoughts are clearly a mess, scrambled by the excitement of meeting you and potentially getting help. The noble takes a second to think clearly and continues on a calmer tone.`,
    `$$DisguisedPrincess$: "Sorry, yes. Please forgive my excitement. I should have started by saying that I've been studying alchemy, and I've developed an elixir that should... indispose the guards. Without killing them, of course, I'm not a monster. But the castle is teeming with them, we do need to get rid of them if we want to get out safely."`,
    `$$Ren$: "I see..."`,
    `$$DisguisedPrincess$: "Take these herbs and put them in the guards' meals. It should leave us some time to get out."`,
    `You obtain a ` + ITEM.PoisonousHerbs + ".",
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function() {
    INVENTORY.set(ITEM.PoisonousHerbs, 1);
  }
});

var castle = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Board game`,
  unlock: true,
  description: [
    `$$Ren$: "Is this about that... weird game they're doing in the throne room?"`,
    `$$DisguisedPrincess$: "Oh, you don't know the half of it. It's not just a game."`,
    `$$DisguisedPrincess$: "I don't know when, but it started as battle simulations for the real war. A way to try out strategies, to find out who the best tacticians were, that kind of thing. That makes sense, doesn't it? You can't really run experiments with real armies."`,
    `$$DisguisedPrincess$: "But now, we've gone so far from that... I can't remember the last time the human armies applied against the demons anything that was conceived in this game. Maybe it was even before I was born?"`,

    `$$BestFriend$: "So now they're just... playing make-belief?"`,

    `$$DisguisedPrincess$: "No, no, no. Far from it. This is as real as it gets. To them, it is more real than the demons in the fields."`,
    `$$DisguisedPrincess$: "In the royal court, the game is everything. Your strategical abilities determine your standing and your reputation. Alliances, betrayals... it's the center of geopolitics, that's what it is.`,
    `$$DisguisedPrincess$: "A good game can make or break carreers. It's no wonder it's all they think about."`,
    `$$DisguisedPrincess$: "Not to mention the money. Everyone is developing new equipment and variation for board game pieces... It has outweight real... I mean conventional weapons by far. Most of the kingdom's budget is going into this contest of power."`,
    `$$DisguisedPrincess$: "So no, it's not just a 'game'. It's their lives. It literally dictates the way the kingdom is going!"`,

    `$$Ren$: "Doesn't sound like it's going very well..."`,

    `$$DisguisedPrincess$: "I'm with you on that one, and that's also why I want to get out of here. I can't bear to keep looking at this pointless masquerade."`,

  ],
  outcome: BATTLETREE.NOTHING,
});

var life = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Noble life`,
  unlock: true,
  description: [
    `$$Ren$: "What's so bad about living in safety?"`,
    `$$DisguisedPrincess$: "I wouldn't call that living! I'm forbidden to leave this room! If I want to go anywhere, I have to ask for an escort! I've only seen four rooms my whole life! Here, the kitchen, the library and the throne room. And this one I'm only allowed in for ceremonies I'm forced to attend!"`,
    `$$DisguisedPrincess$: "Most of the time, all I can do is sit silently next to the King. Pose as a poster child for the royal family in pointless gatherings and dinners."`,
    `$$DisguisedPrincess$: "One time I tried to say something during a banquet, I was confined to my quarters for a month after that."`,
    `$$DisguisedPrincess$: "So no, it's not that great, and I want out."`,
  ],
  outcome: BATTLETREE.NOTHING,
});
// -------------------------------------------------------------------------------------

var ok = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Ok... sure`,
  unlock: true,
  description: [
    `$$DisguisedPrincess$: "Really?"`,
    `$$DisguisedPrincess$ seems almost surprised. The aristocrat starts jumping everywhere in the room, taking luggage that was clearly pre-packed long ago. Within minutes, $$DisguisedPrincess$ is back standing before you.`,
    `$$DisguisedPrincess$: "I'm ready!"`,
  ],
  function: function(){
    if( STATS.flag("_seen_castle2")){
      plan(`Ok... sure`);
    }
    go(`Ok... sure`);
  }
});

var why = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `But... why`,
  unlock: true,
  description: [
    `$$Ren$: "Why would you want to leave? You must have a pretty good life here! I assure you, no place out there is better than the royal castle. Most of the world is a death trap..."`,
    `$$DisguisedPrincess$: "I know that! But I can't take it here anymore!"`,
  ],
  function: function(){
    castle(`But... why`);
    life(`But... why`);
  }
});

var huhno = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Huh... no?`,
  unlock: true,
  description: [
    `$$DisguisedPrincess$ seems pretty hurt by your refusal.`,
    `$$DisguisedPrincess$: "Well then leave if you're not gonna help!"`,
  ],
  outcome: BATTLETREE.ESCAPE,
});
var noway = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `No way!`,
  unlock: true,
  description: [
    `$$DisguisedPrincess$ seems pretty hurt by your refusal.`,
    `$$DisguisedPrincess$: "Well then leave if you're not gonna help!"`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var afterAnswer = function(from){
  ABILITIES.unlock("_metDisguisedPrincess");
  BATTLE.player_actions.empty(true);
  huhno(from);
  noway(from);
  ok(from);
  why(from);
}


var tell = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Tell`,
  unlock: true,
  description: [
    `You tell $$DisguisedPrincess$ a summary of your travels as the Promised Child. The noble eats up your every word with wide opened eyes. Your memories are punctuated by childish exclamations of stupor.`,

    `$$DisguisedPrincess$: "That's amazing! You're so great!"`,
    `Enthusiasm waned as a veil of sadness covered the aristocrat's face.`,
    `$$DisguisedPrincess$: "If only I could leave this place! If only I could see the world too!"`,
    `After a moment of silence, the young noble piles up.`,
    `$$DisguisedPrincess$: "No! No more 'what if'. I'm getting out. And you're going to help. This is my chance!"`,
  ],
  function: afterAnswer,
});

var confabulate = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Confabulate`,
  unlock: true,
  description: [
    `You tell $$DisguisedPrincess$ an entirely fictional and overly exaggerated story, loosely inspired by some children books you remember. To your surprise, the noble does not notice the trickery, but instead eats up your every word with wide opened eyes. Your unbelievable tale is punctuated by childish exclamations of stupor.`,

    `$$DisguisedPrincess$: "That's amazing! You're so great!"`,
    `Enthusiasm waned as a veil of sadness covered the aristocrat's face.`,
    `$$DisguisedPrincess$: "If only I could leave this place! If only I could see the world too!"`,
    `After a moment of silence, the young noble piles up.`,
    `$$DisguisedPrincess$: "No! No more 'what if'. I'm getting out. And you're going to help. This is my chance!"`,
  ],
  function: afterAnswer,
});


var refuse = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Refuse`,
  unlock: true,
  description: [
    `$$DisguisedPrincess$: "I understand! I bet you're too busy, being on a quest or something!"`,
    `You're puzzled by the aristocrat's ability to remain enthusiastic faced with your refusal. But the energetic face was soon covered by a veil of sadness.`,

    `$$DisguisedPrincess$: "If only I could leave this place! If only I could see the world too!"`,
    `After a moment of silence, the young noble piles up.`,
    `$$DisguisedPrincess$: "No! No more 'what if'. I'm getting out. And you're going to help. This is my chance!"`,
  ],
  function: afterAnswer,
});


PLAYER_ACTIONS.add({
  name: "Yes",
  unlock: true,
  description: [
    `$$DisguisedPrincess$: "That's so great! Please, come in! Tell me all about your travels, please!"`,
  ],
  function: function(){
    BATTLE.player_actions.empty(true);
    tell("Yes");
    confabulate("Yes");
    refuse("Yes");
  },
});

PLAYER_ACTIONS.add({
  name: "No",
  unlock: true,
  description: [
    `$$DisguisedPrincess$: "Oh."`,
    `$$DisguisedPrincess$ loses all interest in you.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});


// ===================
// =================== START
// ===================
if (!ABILITIES.has_ability("_metDisguisedPrincess")){
  BATTLE.operations.start([
    `As soon as you enter the room, a young aristocrat grabs your shoulders and asks.`,
    `$$DisguisedPrincess$: "Are you an adventurer? I've never seen you around here!"`,
  ]);
} else{
  BATTLE.operations.start([
    `$$DisguisedPrincess$ stares at you impatiently.`,
    `$$DisguisedPrincess$: "Are you helping me or not?"`,
  ]);
  afterAnswer();
}
