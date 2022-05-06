// ===================
// =================== INITIALIZATION
// ===================
new CenteredMovingBattleImage("assets/characters/party/StreetSmart.png", 'background',32,48, 2);

AUDIO.music.characters.StreetSmart();

var battle = "_party/_StreetSmart2";

var unlock_talk_confess = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Confess",
  unlock: true,
  description: [
    `$$Ren$: "No, I don't know exactly where he is. But the Goddess tells me things, every now and then. I really think it's the best way for you to find him."`,
    `The thief pauses to think for a while.`,
    `$$StreetSmart$: "It does seem that she speaks to you, whatever that means. I've always relied on my wits instead of some godly magic, but I have to admit that so far, it hasn't brought me my dog back."`,
    `He hesitates for a second, before declaring.`,
    `$$StreetSmart$: "I guess... I guess I can stick around with you, kid. I respect your honesty and your guts. It's not like I have somewhere I need to be, I can do my business on the road. Travelling is actually pretty good for trading. I'll see where this superstitious fairytale takes you, and if it can really help me find $$han_dog$."`,
    `$$Ren$: "I promise I'll do my best! But please stop calling me kid, we are barely a few years apart."`,
    `$$StreetSmart$: "No can do, kid. We might be a few years apart, but you still have so much to learn about life."`,
    `$$StreetSmart$: "My name is $$StreetSmart$, by the way... Here, have your money back."`,
    `He hands you your COINS back.`,
    "$$StreetSmart$ JOINS YOUR PARTY!",
  ],
  extra_function: function(){
    PARTY.add(PARTYMEMBERS.StreetSmart);
    INVENTORY.increase(ITEM.Coin, INVENTORY.count("_streetSmart_mugged_amount"));

    BATTLE.monster_actions.make_unique(
      function() {
        PARTY.changeNickname(PARTYMEMBERS.StreetSmart, undefined, BATTLE.operations.win);
      }
    );
  },
});

var unlock_talk_lie = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Lie",
  unlock: true,
  description: [
    `$$Ren$: "Yes."`,
    `$$StreetSmart$: "Where?"`,
    `$$Ren$: "I... can't tell you right now."`,
    `It seems that you've angered him.`,
    `$$StreetSmart$: "Listen, either you're blackmailing me, or you're making light of something that's very deer to me. Both of these are pretty despicable. I don't know who you are or what your deal is, but I hope I never have to see you again."`,
    `Without adding a word, the thief turns around and leaves.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var dog = DICTIONARY.get('han_dog');
var unlock_talk_goodbluff = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: dog,
  unlock: true,
  description: [
    `$$Ren$: "I can help you find $$han_dog$."`,
    `The thief cannot hide his surprise.`,
    `$$StreetSmart$: "How do you know about him?"`,
    `$$Ren$: "Through the Goddess."`,
    `$$StreetSmart$: "I'm not much of a believer, but I cannot understand how you'd know about $$han_dog$ if you're lying. Did the Goddess tell you where he is?"`,
  ],
  extra_function: function(){
    unlock_talk_lie(dog);
    unlock_talk_confess(dog);
  }
});

var unlock_talk_bluff = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Bluff",
  unlock: true,
  description: [
    `$$Ren$: "I can help you find what you seek."`,
    `The thief seems shocked for a second, but then regains composure and replies coldly.`,
    `$$StreetSmart$: "This is the oldest trick in the book. Do you really think I'm gonna fall for this lame bluff? I can't believe that for a second I let you give me hope to find $$han_dog$ again."`,
    `Without adding a word, the thief turns around and leaves, visibly disappointed.`,
  ],
  outcome: BATTLETREE.ESCAPE,
  extra_function: function(){
    STATS.record.flag("StreetSmart_dogname");
  }
});

var unlock_talk_animals = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Animals",
  unlock: true,
  description: [
    `$$Ren$: "What if I were to tell you that I can make the world a place where no one has to suffer anymore? No human, and especially no animal?"`,
    `The thief is taken aback by your question. He quickly gathers his wits, though, and answers suspiciously.`,
    `$$StreetSmart$: "What do you mean?"`,
    `$$Ren$: "I'm going to defeat $$demon_lord$.`,
    `$$StreetSmart$: "You? A child?"`,
    `$$Ren$: "We both know that 'children' don't just wander out in the wilderness unless there's some very special circumstances. I have special powers, given to me by the Goddess."`,
    `The thief is puzzled. He thinks for a while and says.`,
    `$$StreetSmart$: "I admit that there's something peculiar about you, but claiming that you can change the world..."`,
    `$$Ren$: "Well come and join me, then! It'll increase our odds!"`,
    `$$StreetSmart$: "What's in it for me, though?"`,
  ],
  function: function() {
    unlock_talk_bluff("Animals");
    unlock_talk_goodbluff("Animals");
    if(!STATS.flag("StreetSmart_dogname")){ // not recorder and therefore appears striken
      BATTLETREE.api.forget(battle, dog);
    }
  },
});

var unlock_talk_question = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Question",
  unlock: true,
  description: [
    `$$Ren$: "Tell me your story."`,
    `The thief bursts out laughing.`,
    `$$StreetSmart$: "Is that it? Is that really what you want?"`,
    `You keep a serious face and nod.`,
    `$$StreetSmart$: "You're an odd one, aren't you? Well there's not much to say. I faced the war like everybody else. I'm just trying to do what I can to survive day by day. I ain't proud of it, but I wasn't exactly given a choice."`,
    `$$Ren$: "So you became a petty thief?"`,
    `The thief laughs again.`,
    `$$StreetSmart$: "I'm no petty thief! I'm the best!"`,
    `$$Ren$: "Well I've never heard of you!"`,
    `$$StreetSmart$: "Isn't that proof enough that I'm pretty good?"`,
    `$$Ren$: "Why are you mugging children, then?"`,
    `$$StreetSmart$: "We both know that 'children' don't just wander out in the wilderness unless there's some very special circumstances. Anyway I don't usually steal as long as I can help it. It's more of a... last resort, when things have gotten really bad."`,
    `$$Ren$: "What do you do, usually?"`,
    `$$StreetSmart$: "I'm a beastmaster. I don't exactly have a permit, but I can say in all modesty that I'm the best. If you want real results, don't go to the amateurs that have an official license."`,
    `$$StreetSmart$: "I tame animals, train them and sell them. As company, messengers, guards... or sometimes food or fighters."`,
    `There is a noticeable sadness in his voice as he ends his sentence. Clearly, some of his activities are more painful than others. You're about to offer comforting words when he cuts the discussion short.`,
    `$$StreetSmart$: "That's enough. I didn't come here to chat. Thanks for the cash, kid."`,
    `No sooner has he finished talking that he quickly salutes you and turns away.`,
  ],
  outcome: BATTLETREE.ESCAPE,
  extra_function: function(){
    STATS.record.flag("StreetSmart_animals");
  }
});

var unlock_talk_promised_child = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Promised Child",
  unlock: true,
  description: [
    `$$Ren$: "I'm the Promised Child! I'm on a quest to defeat $$demon_lord$. Come with me! We could use your talents!"`,
    `The thief bursts out laughing.`,
    `$$StreetSmart$: "You're funny. Sorry, I'm not into charity and pipe dreams. I have actual problems to take care of."`,
    `No sooner has he finished talking that he quickly salutes you and turns away.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var unlock_talk_glory = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Glory",
  unlock: true,
  description: [
    `$$Ren$: "I know a way to shower you with fame and glory. If you join me, you'll never need for anything again!"`,
    `The thief bursts out laughing.`,
    `$$StreetSmart$: "You're funny. Sorry, I'm not interested. Things are going just fine."`,
    `No sooner has he finished talking that he quickly salutes you and turns away.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var unlock_talk_help = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Offer help",
  unlock: true,
  description: [
    `$$Ren$: "You don't have to live like this! I can help you!"`,
    `The thief bursts out laughing.`,
    `$$StreetSmart$: "You've got some nerves, judging me like that. Sorry, I like my life as it is. Maybe save your charity and Goddess nonsense for people who need good stories!"`,
    `No sooner has he finished talking that he quickly salutes you and turns away.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var unlock_talk_riches = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Riches",
  unlock: true,
  description: [
    `$$Ren$: "I'm on a quest to defeat $$demon_lord$. Come with me! We'll find plenty of treasures and rewards!"`,
    `The thief bursts out laughing.`,
    `$$StreetSmart$: "You're funny. There's no way you're ever taking down $$demon_lord$. I'm not a betting man, but if I were, I'd still not follow these odds. I'll stick to my plans, thank you very much. Good luck with the quest, though. Let me know if you survive."`,
    `No sooner has he finished talking that he quickly salutes you and turns away.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var unlock_talk_join = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Join",
  unlock: true,
  description: [
    `$$Ren$: "I'm on a quest, come and join me!"`,
    `The thief bursts out laughing.`,
    `$$StreetSmart$: "What's in it for me? Sorry, kid, I have actual work to do!"`,
    `No sooner has he finished talking that he quickly salutes you and turns away.`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var unlock_outwit = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Outwit",
  unlock: true,
  description: [
    `$$Ren$: "I'm not a fool. I didn't give anything away. I simply bought a chance to talk."`,
    `The thief's face brightens with a smile.`,
    `$$StreetSmart$: "Interesting. I like the way you think. Ok, kid, let's make your money's worth. What do you have to say? You better make it count."`,
  ],
  function: function() {
    unlock_talk_promised_child("Outwit");
    unlock_talk_join("Outwit");
    unlock_talk_riches("Outwit");
    unlock_talk_glory("Outwit");
    unlock_talk_help("Outwit");
    unlock_talk_question("Outwit");
    if(STATS.flag("StreetSmart_animals")){
      unlock_talk_animals("Outwit");
    }
  },
});

var unlock_goodbye = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Have faith",
  unlock: true,
  description: [
    `$$Ren$: "I have faith. I guess time will tell if I've been right!"`,
    `The thief smirks.`,
    `$$StreetSmart$: "Cool, well, let me know how this turns out for you!"`,
    `He walks away, but before leaving he turns to you a last time and gives you a genuine smile.`,
    `$$StreetSmart$: "Hey, thanks."`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var unlock_pay = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Give 2 coins",
  unlock: true,
  description: [
    `You give the thief two of your coins. He grabs them in a motion almost too fast to see.`,
    `$$StreetSmart$: "You're a fool to give this away. And an even greater fool for believing in the Goddess' help."`,
  ],
  function: function() {
    INVENTORY.decrease(ITEM.Coin, 2);
    INVENTORY.increase(ITEM.Coin, 2);
    // INVENTORY.increase("_streetSmart_mugged_amount", 2);
    unlock_outwit("Give 2 coins");
    unlock_goodbye("Give 2 coins");
  },
});

var unlock_betray = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Betray",
  outcome: BATTLETREE.ESCAPE,
  unlock: true,
  description: [`At the last minute, you try to grab the thief's hand. However, his stellar reflexes are better than yours, and he manages to jump backwards and take flight.`, ],
});

var unlock_insist = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Insist",
  unlock: true,
  description: [`You insist.`,
                `$$Ren$: "Really, take some, I don't mind."`,
                `After a while, he answers.`,
                `$$StreetSmart$: "A lot of people die for these... Is this worth nothing to you?"`,
                `$$Ren$: "Of course not. But I think I'll find a way to get more, with the help of the Goddess. It just looks like you need it more, if you're reduced to do this kind of things."`,
                `The thief approaches you carefully. You can tell that he's clearly still on alert.`,
                ],
  function: function() {
    unlock_pay("Insist");
    unlock_betray("Insist");
  },
});

if(INVENTORY.cash() > 1){
  PLAYER_ACTIONS.add({
    name: "Offer money",
    unlock: true,
    description: [
      `You get a few coins and hold them towards the thief. In a very soft voice, you ask.`,
      `$$Ren$: "Is this what you're after? You can have some, I don't mind."`,
      `The thief looks at you with distrust.`,
    ],
    function: function() {
      unlock_insist("Offer money");
    },
  });
} else {
  PLAYER_ACTIONS.add({
    name: "Offer money",
    unlock: true,
    description: [`You want to use money to lure the thief, but as you dig in your pockets you realize that you don't have any. Your assailant notices your movements, though, and, realizing you're awake, runs away swiftly.`],
    outcome: BATTLETREE.WIN,
  });
}

PLAYER_ACTIONS.add({
  name: "Call for help",
  unlock: true,
  description: [`You scream, waking up $$BestFriend$. Seeing this, the rogue flies away with a speed that you didn't know humans were capable of. You're safe.`],
  outcome: BATTLETREE.ESCAPE,
});

PLAYER_ACTIONS.add({
  name: "Draw weapon",
  unlock: true,
  description: [`You draw your weapon. The thief reacts at lightning speed by running away with great dexterity. He vanishes in the distance before you can react.`],
  outcome: BATTLETREE.ESCAPE,
});

PLAYER_ACTIONS.add({
  name: "Chase",
  unlock: true,
  description: [`You start running after the thief, in order to catch him, but your body is no match for the capabilities of this young man. It doesn't take long for him to outrun you and lose you.`],
  outcome: BATTLETREE.ESCAPE,
});


// ===================
// =================== START
// ===================

BATTLE.operations.start([
  "The thief approaches carefully. With his skills, he would be almost impossible to detect if you didn't already know he was coming. But this time, you have the initiative advantage.",
]);
