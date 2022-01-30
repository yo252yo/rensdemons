
new CenteredMovingImage("assets/characters/party/RetiredProtector.png", 'background',32,48, 2);

AUDIO.music.characters.RetiredProtector();
PLAYER_ACTIONS.escape();

// WIP TODO
var bio = "go through that left him forever scarred, but it is assumed that it might have something to do with chickens. In any case, the weight of that somber history is visible on art. And his face. And his gestures. And his clothes. He is not one to hide the feelings of suffering that swallow his soul.<br /><br /> got intrigued by your peculiar relationship to death, and decided to stick to your side, partly out of morbid curiosity, partly following his death wish that your impossible quest was bound to fulfill.";

var unlock_end = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "FINISH",
  unlock: true,
  description: [
    `...`,
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function() {
    PARTY.add(PARTYMEMBERS.RetiredProtector);
    DICTIONARY.set('RetiredProtector_bio', bio);
  },
});


var unlock_2 = function(from, quality, name) { // i need to pass name otherwise its precomputed to an old version
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: STRING_UTILS.camel_case(quality),
    unlock: true,
    description: [
      `$$Ren$: "I'm the Promised Child. I'm on a quest to save the world, and I'd like your ${quality}."`,
      `$$RetiredProtector$: "You've come to the wrong guy. I don't do that kind of stuff anymore."`,
      // ... TODO WIP
    ],
    function: function() {
      BATTLE.player_actions.empty(true);
      unlock_end(name);
    },
  });
  f(from);
}



var names = MARKOV_MODELS.human_names.mutate_n("Geralt", 5, 5);
for(var n of names){
  var f = function(name) {

    PLAYER_ACTIONS.add({
      name: name,
      unlock: true,
      description: [
        `$$Ren$: "...${name}?"`,
        `${name}: "That's me, though it's a name I have not heard in a long time. I don't go by it anymore. What do you want, kid?"`,
      ],
      function: function() {
        BATTLE.player_actions.empty(true);
        DICTIONARY.set(PARTYMEMBERS.RetiredProtector, name);

        for (var quality of ["protection", "help", "guidance", "mentoring"]){
          unlock_2(name, quality, name);
        }
      },
    });

  }
  f(n);
}

// ===================
// =================== START
// ===================
BATTLE.operations.start([
  `You face a burly man. His scar and the wear on his attire tell you that he has seen much, but those days seem far behind him now.`,
  `To $$BestFriend$'s surprise, you immediately start up a conversation, sure of yourself.`,
  `$$Ren$: "Are you the one they call..."`,
]);
