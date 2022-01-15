
new CenteredMovingImage("assets/characters/party/GeniusProdigy.png", 'background',32,48, 2);

PLAYER_ACTIONS.escape();
AUDIO.music.characters.GeniusProdigy();









//hack phase 1:  ignoring!

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
    BATTLE.player_actions.empty();
    BATTLE.monster_actions.empty();
    PARTY.changeNickname(PARTYMEMBERS.GeniusProdigy, "What name will you shout?");
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


// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `A young boy in aristocratic attire is examining the surroundings carefully.`,
);
