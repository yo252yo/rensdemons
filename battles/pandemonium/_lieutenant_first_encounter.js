// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('pandemonium/lieutenant');
AUDIO.music.interface.boss();

var battle = "pandemonium/_lieutenant_first_encounter";

PLAYER_ACTIONS.add({
  name: ABILITY.Escape,
  outcome: BATTLETREE.ESCAPE,
  description: ["You decide you're not prepared for this encounter and run away before your enemy notices you."],
});

PLAYER_ACTIONS.add({
  name: "Run",
  outcome: BATTLETREE.LOSS,
  description: ["You attempt to run away. The demon does not appreciate this interruption. He snaps his finger and you find yourself devoured by a torrent of flames."],
});

PLAYER_ACTIONS.add({
  name: "Attack",
  unlock: true,
  outcome: BATTLETREE.LOSS,
  description: ["You charge at your enemy with conventional weapons. It doesn't even take a second for him to notice you and send out a tornado of fire to devour you by a simple snap of his fingers."],
});


var unlock_ourfault = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "it's our fault",
  outcome: BATTLETREE.ESCAPE,
  unlock: true,
  description: [
    `$$Ren$: "It's... our fault? It's something human did? But what?"`,
    `You think you can see genuine compassion on the demon's face. Or maybe it's just an illusion?`,
    `$$demon_lieutenant$: "Too little, too late, child... I can see why the Goddess took a liking to you. Your race is way past saving, but in another time, maybe you could have done something..."`,

    `$$Ren$: "What happened? What did our ancestors do? Tell us! Maybe we can fix it!"`,
    `$$demon_lieutenant$: "If you need me to tell you, you're still as bad as them. The answer is the problem. This is something you need to figure out on your own... Telling you would be like admitting that you cannot be redeemed..."`,
    `$$Ren$: "But then how can I learn? How can I find out?"`,
    `$$demon_lieutenant$: "Look into yourself. Look at the humans, look at their past..."`,
    `$$demon_lieutenant$: "I'll spare you this time. I have pity for you. You brought me some amusement, and I am weary of this war. But if I ever see you here again, or if you attempt to pass through to go to hell, I will have to kill you."`,
    `$$Ren$: "So... What now?"`,
    `$$BestFriend$: "I heard that west of here is the Forgotten Fissure, one of the oldest ruins from the time of the ancestors that we haven't checked out yet. Maybe we'll find an answer there?"`
  ],
  extra_function: function() {
    ABILITIES.unlock("_lieutenant_confronted");
  }
});

var fake_answer = function(parent, text){
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: text,
    unlock: true,
    outcome: BATTLETREE.LOSS,
    description: [
      `$$demon_lieutenant$: "Your stupidity is laughable. You really do not understand anything..."`,
      `With a snap of his fingers, $$demon_lieutenant$ puts you out of your misery.`,
    ],
  });
  f(parent);
}

var unlock_lesson = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Lesson",
  unlock: true,
  description: [
    `$$Ren$: "Our lesson?"`,
    `$$demon_lieutenant$: "You foolish humans, your arrogance is blinding you to the obvious! Your ignorance defies understanding! How is it not all you think about? How dare you keep playing with your little inventions and turn a blind eye to the truth staring you in the face? You're so obsessed with your little selves, that's all you seem to care about!"`,
    `$$demon_lieutenant$'s amusement was slowly turning into rage.`,
    `$$demon_lieutenant$: "Did you never wonder what happened back then? Why $$demon_lord$ came to cleanse $$world_name$?"`,
  ],
  function: function() {
    BATTLETREE.api.lock(battle, DICTIONARY.get("demon_lord"));
    BATTLETREE.api.lock(battle, "Despair");
    BATTLETREE.api.lock(battle, "Attack");
    BATTLETREE.api.lock(battle, "Run");
    fake_answer("Lesson", "he's evil");
    fake_answer("Lesson", "he's mad");
    fake_answer("Lesson", "he's violent");
    fake_answer("Lesson", "he enjoys it");
    unlock_ourfault("Lesson");
  }
});

var unlock_artifact = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Artifact",
  unlock: true,
  description: [
    `$$demon_lieutenant$: "All that being said, I have to admit that I'm impressed that you were able to obtain such an artifact. It's been a long time since I last saw such powerful weapons. But do not kid yourself. They did not work back then, they are not going to work now. Your ancestors had many more of these, some of which much more powerful than the one you brought. If it were enough to stop us, we wouldn't be here now, would we?"`,
    `$$demon_lieutenant$: "You miserable humans haven't changed one bit! Still full of yourselves, arrogant, overly confident in your minuscule weapons... You haven't learned your lesson at all..."`,
  ],
  function: unlock_lesson,
});

var unlock_despair = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Despair",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `You find yourself filled with despair. The ancient artifact, the strongest weapon in humanity's arsenal, barely made a dent in this collossal demon, and he was not even the strongest of them. Your feelings must have shown on your face, because $$demon_lieutenant$ exploded in another burst of laughter.`,
    `$$demon_lieutenant$: "Only now do you realize that you are no more than ants in our path? You are nothing! All you can do is run away and hide, we would already have liberated $$world_name$ if it weren't for your useless obstination. But we won't give up, your resistance is useless."`,
  ],
});

var unlock_maou = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: DICTIONARY.get("demon_lord"),
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
    `$$Ren$: "Where is $$demon_lord$?"`,
    `$$demon_lieutenant$: "He is comfortable in his castle in Hell. But you do realize that there's no way I'm letting you pass through, right?"`,
  ],
});

var unlock_notice = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Notice",
  unlock: true,
  description: [
    `$$Ren$: "Wait, you're not $$demon_lord$?"`,
    `You detect what you think is surprise on the deformed face of the hellish creature.`,
    `$$demon_lieutenant$: "How do you know that?"`,
    `$$Ren$: "The Goddess showed me!"`,
    `$$demon_lieutenant$: "It would appear that your Goddess has you in her good graces, child! Indeed, I am not $$demon_lord$, though you are the first human to ever notice it. I am $$demon_lieutenant$, $$demon_lord$'s lieutenant. I lead our armies during the invasion of $$world_name$. The Dark Master will not trouble Himself over vermin like you."`,
  ],
  function: function() {
    BATTLETREE.api.lock(battle, "Answer");
    unlock_despair("Notice");
    unlock_maou("Notice");
    unlock_artifact("Notice");
  }
});

var unlock_answer = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Answer",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [
      `You decide to not reveal you are the Promised Child. You try to hide your fear and steady your voice as much as you can.`,
      `$$Ren$: "I'm $$Ren$."`,
      `$$demon_lieutenant$: "How did you survive so long, child? This place is crawling with monsters..."`,
  ],
});

PLAYER_ACTIONS.add({
  name: "Ancient Armament",
  unlock: true,
  description: ["You take the ancient artifact that you painfully collected. It's been loaded with the appropriate ammunition. You aim carefully the head of the pipe in the direction of your enemy. You might not get another chance if they notice you... You pray that the Goddess makes your aim true. You heart is beating fast in your chest, cold sweat runs on your forehead. You feel the reassuring presence of $$BestFriend$ next to you. You take a deep breath and press the trigger...",
                "A deafening explosion echoes in the valley. You're thrown on the ground, forced to let go of your grip on the artifact that suddenly became scorching hot. The projectile pierces through the air so fast that you cannot track it with your eyes. But you can clearly see the impact on the body of the demon. A wide circle appeared on the torso of your opponent, a few centimeters deep. The ammunition did not pierce through the demonic skin but made a sizeable indent. You succeeded in remaining stealthy, and the demon is completely taken aback. The violence of the shock projects him on the floor. His fall makes the whole crater tremble.",
                "You let out a relieved sigh. You couldn't have hoped for a better hit.",
                "But your satisfaction is short lived. The giant stands back up and looks at his body. The place of the impact is already healing. The old skin crumbles and sheds into thick black ashes and is replaced little by little with new flesh. The face of the demon briefly shows a puzzled expression. He then turns in your direction and looks at you wide-eyed.",
                "He bursts out laughing. The deep cavernous voice reverberates on the rocks all around you and chills you to the bone. Before you can figure out how to react, the demon addresses you in your language. His voice is so hoarse that it sounds like rocks rubbing against each other...",
                `$$demon_lieutenant$: "Well done, little human. You have a lot of guts to do what you just did. Who are you and how did you get here?"`,
            ],
  function: function() {
    BATTLETREE.api.lock(battle, ABILITY.Escape);
    BATTLETREE.api.lock(battle, "Ancient Armament");
    BATTLETREE.api.unlock(battle, "Run");
    unlock_answer("Ancient Armament");
    unlock_notice("Ancient Armament");
  }
});


// ===================
//hack START
// ===================

BATTLE.operations.start("The massive demon towers over you. You can almost feel the magic energy emanating from him.");
