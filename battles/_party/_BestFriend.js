// ===================
// =================== INITIALIZATION
// ===================
new CenteredMovingBattleImage("assets/characters/party/BestFriend.png", 'background',32,48, 2);
AUDIO.music.characters.BestFriend();

PLAYER_ACTIONS.escape();

var unlock_triedeverything = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `i tried everything`,
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [`$$Ren$: "I've tried everything I can think of! I've done this fight over and over again, and there's no way to keep you alive!"`,
                `$$BestFriend$'s face displays a strange resigned expression.`,
                `$$BestFriend$: "Well, if that's true, we might as well accept my fate, shouldn't we?"`,
                ],
});

var unlock_promise = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Promise`,
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [`You bite your lip to fight back tears.`,
                `$$Ren$: "Can you really promise that this time will be different? I can't go through that again! I can't bear losing you!"`,
                `$$BestFriend$: "Don't worry, I promise..."`,
                `But you're fully aware that $$BestFriend$ doesn't have the authority to enforce that promise...`,
                ],
});

var reply = ``;
if (STATS.flag("KilledBestFriend") < 3){
  reply = `$$BestFriend$: "It's not even that much... There's always hope that this time will be different!"`;
} else {
  reply = `$$BestFriend$: "Well... And after all that, we're still here, together, right? Maybe it's ok if I die. Maybe we'll always find each other again, in the end... We survived ${STATS.flag("KilledBestFriend")} separations, what's one more? I'll see you on the other side."`;
}

var unlock_count = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Count`,
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [`$$Ren$: "You don't believe me? I swear! I've seen you die ${STATS.flag("KilledBestFriend")} times in front of my eyes! If I let you come, it's like killing you myself!"`,
                reply,
                ],
});

var unlock_sawitmanytimes = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `i saw it many times`,
  unlock: true,
  description: [`$$Ren$: "I've seen it happen so many times before! I've seen you die! I can't handle this pain!"`,
                `$$BestFriend$: "I don't know what you've seen, but it wasn't me. I'm here, now. This time will be different!"`,
                ],
  function: function(){
    unlock_promise(`i saw it many times`);
    unlock_count(`i saw it many times`);
  },
});


var unlock_goddessisclear = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `goddess is clear`,
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [`$$Ren$: "The message of the Goddess is clear! Her words leave no room for interpretation!"`,
                `$$BestFriend$: "As wise as She is, She cannot know everything! We'll show Her that there's another way!"`,
                ],
});


var unlock_disillusion = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Disillusion`,
  unlock: true,
  description: [`$$Ren$: "It won't work! No matter how careful we are, you're going to die, and I can't let that happen!"`,
                `$$BestFriend$: "How can you be so sure?"`,
                ],
  function: function(){
    unlock_triedeverything("Disillusion");
    unlock_sawitmanytimes("Disillusion");
    unlock_goddessisclear("Disillusion");
  },
});

var unlock_foreknowledge = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Foreknowledge`,
  unlock: true,
  description: [`$$Ren$: "Listen, I'm not kidding... I know what is going to happen. You're going to die there. The Goddess showed me!"`,
                `$$BestFriend$: "Well I believe that if we're careful we can avoid your premonition! We'll just have to be very cautious!"`,
                ],
  function: unlock_disillusion,
});

var unlock_insist2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Insist `,
  unlock: true,
  description: [`$$Ren$: "Please..."`,
                `But $$BestFriend$ remains unflinching.`,
                ],
});

var unlock_insist = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Insist`,
  unlock: true,
  description: [`$$Ren$: "Please, I beg you!"`,
                `$$BestFriend$: "And I'm telling you that I refuse to let you go alone!"`,
                ],
  function: unlock_insist2,
});


PLAYER_ACTIONS.add({
  name: "Warn",
  unlock: true,
  description: [`$$Ren$: "Please, do not join this fight, it's too dangerous."`,
                `$$BestFriend$: "All the more reason for me to come, I'm not going to let you face danger alone!"`,
                ],
  function: function(){
    unlock_insist("Warn");
    unlock_foreknowledge("Warn");
  },
});


PLAYER_ACTIONS.add({
  name: "Protect",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [`You're pretty sure it won't work, but you still need to try.`,
                `$$Ren$: "Promise me that when the fight is over you'll rush to shelter straight away. $$demon_lieutenant$ will explode, it'll be very dangerous!"`,
                `$$BestFriend$: "Don't worry! I promise I'll be careful!"`,
                ],
});


var unlock_goodbye3 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Confess`,
  unlock: true,
  outcome: BATTLETREE.WIN,
  description: [`$$Ren$: "I know you don't want to say goodbye... I know you want to believe... But I also know that your belief is foolish..."`,
                `$$BestFriend$: "You're just too pessimistic..."`,
                `$$Ren$: "No, you're too optimistic... But it's okay, it's what makes you you. I wouldn't have it any other way. I love that about you."`,
                `You see the delicate skin of $$BestFriend$ take a slightly red shade.`,
                `$$Ren$: "I respect that. No goodbyes. But let me at least tell you how I feel. It may be our last chance."`,
                `$$BestFriend$ seems too embarrassed to answer one way or the other. Your heart is thumping in your chest louder than it ever did, but you cannot stop there. You know what is going to happen, and there are things you need to say before.`,
                `$$Ren$: "Thank you for the time we spent together. I loved every minute of it. You made my life better. You turned a painful journey into a fun adventure."`,
                `You fight back the tears that well up as you think about the impending doom.`,
                `$$Ren$: "I love you, $$BestFriend$."`,
                `As answer, $$BestFriend$ leans towards you and kisses you softly on your lips. It lasts only a second, but it feels like your whole being is exploding under a whirlwind of emotions.`,
                `$$BestFriend$: "I love you too... But let's not linger, it'll only make what we have to do harder. We'll have plenty of time for this later..."`,
                `$$BestFriend$ grabs your hand and pulls you forward, as you're still processing your bittersweet feelings. You know that you won't have plenty of time later. But $$BestFriend$ is probably right. Any longer and you won't have it in you to move forward.`,
                `You think you see a tear in the corner of $$BestFriend$'s eye. Are you imagining it? Or could this be a crack in the optimistic facade? Did $$BestFriend$ really believe so strongly that you would both make it through? Could it have been a sacrifice to give you both courage to do what needed to be done?`,
                ],
});

var unlock_goodbye2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Goodbye `,
  unlock: true,
  description: [`$$Ren$: "What if this time, we don't get out of this fight alive?"`,
                `$$BestFriend$: "I don't think we should go into it with a losing mindset."`,
                `$$Ren$: "Maybe, but... That's not what I mean... I mean..."`,
                `You're embarrassed and struggle to put your feelings into words.`,
                `$$Ren$: "If that's our last conversation..."`,
                `$$BestFriend$: "$$Ren$..."`,
                `$$Ren$: "If that's our last conversation, I just want to say goodbye properly. Thank you for everything. Tell you how much you mean to me..."`,
                `$$BestFriend$: "I know... I feel the same way... I can't imagine life without you... So let's just not say goodbye, okay? Let's simply make sure that the goodbye moment never arrives!"`,
                ],
  function: unlock_goodbye3,
});

PLAYER_ACTIONS.add({
  name: "Goodbye",
  unlock: true,
  description: [`You look at $$BestFriend$ in the eyes and ponder how much you have been through together in your lives.`,
                `$$Ren$: "$$BestFriend$, if anything were to happen to you, I want you to know that I'm very grateful for the time we spent together."`,
                `$$BestFriend$: "It's so weird to see you get sentimental, it's not like you."`,
                `$$Ren$: "Stop joking, I'm serious! This is the strongest enemy we've faced yet!"`,
                `$$BestFriend$: "Yep, and like all the others, it won't resist us!"`,
                ],
  function: unlock_goodbye2,
});

// ===================
// =================== START
// ===================
BATTLE.operations.start("$$BestFriend$ looks at you with inquisitive eyes, wondering why you've stopped right before a crucial moment.");
