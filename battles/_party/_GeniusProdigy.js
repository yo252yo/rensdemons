
new CenteredMovingImage("assets/characters/party/GeniusProdigy.png", 'background',32,48, 2);

PLAYER_ACTIONS.escape();
AUDIO.music.characters.GeniusProdigy();


var unlock_ok = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `OK`,
  unlock: true,
  outcome: BATTLETREE.WIN,
  description: [`$$Ren$: "Uh... Okay."`,
                `$$GeniusProdigy$: "I can't wait!"`,
                ],
  extra_function: function(){
    INVENTORY.set("_geniusInvestigation", 1);
  }
});

var unlock_now = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Now`,
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [`$$Ren$: "Why not now?"`,
                `$$GeniusProdigy$: "There's a lot I still don't know, of course, but if what I suspect is true, you might want to rest a little before I put you to the test. Maybe you'd like to pray, or meditate?"`,
                ],
});


var unlock_knowledge = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Knowledge`,
  unlock: true,
  description: [`$$Ren$: "I... know things that others don't."`,
                `It looks that you hit the soft spot of $$GeniusProdigy$. He can barely contain his excitement.`,
                `$$GeniusProdigy$: "Okay, okay! I need to assess that. I'll give you a little time, come back to me when you're ready and we'll study your powers!"`,
                ],
  function: function(){
    BATTLE.player_actions.empty(true);
    unlock_ok(`Knowledge`);
    unlock_now('Knowledge');
  }
});

var unlock_guide = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Guide`,
  unlock: true,
  description: [`$$Ren$: "There's... The Goddess is behind me, always guiding my steps towards the right path."`,
                `$$GeniusProdigy$ ponders your words and scrutinize your face with intensity.`,
                `$$GeniusProdigy$: "Hmm, I see! I need to assess that. I'll give you a little time, come back to me when you're ready and we'll study your powers!"`,
                ],
  function: function(){
    BATTLE.player_actions.empty(true);
    unlock_ok(`Guide`);
    unlock_now('Guide');
  }
});

var unlock_supernatural = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Supernatural`,
  unlock: true,
  description: [`$$Ren$: "I can do things that are not possible in the laws of nature..."`,
                `$$GeniusProdigy$: "Hmm, it would be quite amazing if it were true! But my guess is that whatever you're experiencing, it's still subservient to the basic laws of nature in the end. Nothing goes against them. Nothing that I've seen, anyway..."`,
                `$$GeniusProdigy$: "Maybe you'll be the exception? The singularity? The boy outside of the universe?"`,
                `$$GeniusProdigy$: "Anyway, there's only one thing to do. We need to know more. I'll give you a little time, come back to me when you're ready and we'll study your powers!"`,
                ],
  function: function(){
    BATTLE.player_actions.empty(true);
    unlock_ok(`Supernatural`);
    unlock_now('Supernatural');
  }
});


var unlock_heavy = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Heavy`,
  unlock: true,
  description: [`$$Ren$: "It's a lot of responsibilities... I don't know if I can do it..."`,
                `$$GeniusProdigy$'s face gets somber for a moment. A genuine empathy can be seen in his eyes.`,
                `$$GeniusProdigy$: "Yes, it must be hard. But you're also getting some impressive abilities in the process, aren't you?"`,
                `$$Ren$: "Sure..."`,
                `$$GeniusProdigy$: "Well, you should study them! You'll understand your situation and your limits better. It will make you more comfident and more efficient. Hopefully that will help. I always say that knowledge is the most powerful ally you can have!"`,
                `$$Ren$: "Maybe you're right, but I'm not even sure where to start."`,
                `$$GeniusProdigy$: "Don't worry, I'll help! First tell me a bit more about your powers!"`,
                              ],
  function: function(){
    BATTLE.player_actions.empty(true);
    unlock_trust('Heavy');

    unlock_guide('Heavy');
    unlock_knowledge('Heavy');
    unlock_supernatural('Heavy');
  }
});

var unlock_trust = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Trust`,
  unlock: true,
  description: [`$$Ren$: "Why should I trust you?"`,
                `$$GeniusProdigy$: "Come on, why are you asking me? I'm sure your powers can tell you, can't they?"`,
                ],
  outcome: BATTLETREE.NOTHING,
});

var unlock_cool = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Cool`,
  unlock: true,
  description: [`$$Ren$: "It's nice, as you saw, I get a lot of special powers and insights."`,
                `$$GeniusProdigy$ is so excited that he seems almost shaking. He comes way too close to you and start inspecting you.`,
                `$$GeniusProdigy$: "Tell me more! What kind of powers?"`,
                ],
  function: function(){
    BATTLE.player_actions.empty(true);
    unlock_trust('Cool');

    unlock_guide('Cool');
    unlock_knowledge('Cool');
    unlock_supernatural('Cool');
  }
});

var unlock_pc = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Promised child`,
  unlock: true,
  description: [`$$Ren$: "I'm the Promised Child."`,
                `$$GeniusProdigy$ pauses for a second, absorbed in his own thoughts, then turns to you with a bright face and a wide smile.`,
                `$$GeniusProdigy$: "I see! And how is that?"`,
                ],
  function: function(){
    BATTLE.player_actions.empty(true);
    unlock_cool(`Promised child`);
    unlock_heavy(`Promised child`);
  }
});

var unlock_godly = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Goddess`,
  unlock: true,
  description: [`$$Ren$: "They come from the Goddess."`,
                `$$GeniusProdigy$ pauses for a second, absorbed in his own thoughts, then turns to you with a bright face and a wide smile.`,
                `$$GeniusProdigy$: "I see! And how is that?"`,
                ],
  function: function(){
    BATTLE.player_actions.empty(true);
    unlock_cool(`Goddess`);
    unlock_heavy(`Goddess`);
  }
});

var unlock_powers = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Powers`,
  unlock: true,
  description: [`$$Ren$: "I'm just a child with special powers."`,
                `The eyes of $$GeniusProdigy$ sparkle with excitement.`,
                `$$GeniusProdigy$: "What kind of powers?"`,
                ],
  function: function(){
    BATTLE.player_actions.empty(true);
    unlock_godly(`Powers`);
    unlock_trust('Powers');

    unlock_guide('Powers');
    unlock_knowledge('Powers');
    unlock_supernatural('Powers');
  }
});

var unlock_nobody = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Nobody`,
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [`$$Ren$: "I'm nobody, really. Who are you?"`,
                `$$GeniusProdigy$ thinks for a while, completely oblivious to your question. He then shakes his head.`,
                `$$GeniusProdigy$: "No, sorry, I can't accept this answer. You guessing my first name is an incredibly unlikely event. It demands an explanation equaly exceptional."`,
                ],
});

var unlock_you = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `You`,
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [`$$Ren$: "You tell me first, what are you doing here?"`,
                `$$GeniusProdigy$ is puzzled, then smiles.`,
                `$$GeniusProdigy$: "Interesting. So you know my name, but you don't know what I'm doing? What a very peculiar combination..."`,
                `$$GeniusProdigy$ paces around, mumbling to himself, then turns back to you.`,
                `$$GeniusProdigy$: "Yes, you're definitely oustide of the norm. We'll talk about me later. First, I NEED to know who you are! Please!"`,
                ],
});

//hack phase 1:  he is ignoring me!

var total_useless = 0;
var called_useless = 0;

var unlock_call = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Shout name`,
  unlock: true,
  description: [`$$Ren$: "Hey! $$GeniusProdigy$!"`,
                `The boy turns around slowly and studies you with a piercing gaze.`,
                `$$GeniusProdigy$: "Who are you, and how do you know my name?"`,
                ],
  function: function(){
    BATTLE.player_actions.empty(true);
    BATTLE.monster_actions.empty(true);
    PARTY.changeNickname(PARTYMEMBERS.GeniusProdigy, "What name will you shout?");
    unlock_pc(`Shout name`);
    unlock_powers(`Shout name`);
    unlock_you(`Shout name`);
    unlock_nobody(`Shout name`);
  }
});

var make_useless = function(name, text){
  total_useless ++;

  PLAYER_ACTIONS.add({
    name: name,
    unlock: true,
    description: [text],
    outcome: BATTLETREE.NOTHING,
    extra_function: function(){
      called_useless ++;

      if(called_useless == total_useless){
        unlock_call(name);
      }
    }
  });
}

make_useless("Interject", `You politely introduce yourself to the stranger. He doesn't even spare you a glance.`);
make_useless("Call out", `You call out to the odd gentleman, but he pays you no attention.`);
make_useless("Wave", `You wave a hand in front of the boy who doesn't react. It's as if he doesn't even notice.`);
make_useless("Shoulder tap", `You politely tap on the shoulder of the gentleman, without any effect. He's as absorbed in his contemplation as ever.`);
make_useless("Examine walls", `You imitate the boy and examine the walls, voicing your opinion loudly, but it doesn't seem to have any effect. He remains focused.`);
make_useless("Scream", `You randomly shout, in hope to grab the young man's attention. The walls tremble from your voice echoeing, but it's not enough to pierce the concentration of the stranger.`);

BATTLE.monster_actions.add_textual(`Boy: "Isn't it amazing to think this whole network was dug by our ancestors?"`);
BATTLE.monster_actions.add_textual(`Boy: "These runes are clearly some of the best preserved I've ever seen! This place is a wonder!"`);
BATTLE.monster_actions.add_textual(`Boy: "I wish I had brought all my material! Why did I left things at home! I'll have to come back if I want to do chemical analyses..."`);
BATTLE.monster_actions.add_textual(`Boy: "This place is a treasure trove of knowledge about the ancients, but I bet I can also learn a lot about the ecosystem of slimes and their symbiotic relationships."`);
BATTLE.monster_actions.add_textual(`Boy: "I must bring some of these to the lab!"`);
BATTLE.monster_actions.add_textual(`Boy: "The ancestors were amazing! I can't even imagine what their technologies must have been like!"`);


// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `A young boy in aristocratic attire is examining the surroundings carefully.`,
);
