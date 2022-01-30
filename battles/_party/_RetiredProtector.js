
new CenteredMovingImage("assets/characters/party/RetiredProtector.png", 'background',32,48, 2);

AUDIO.music.characters.RetiredProtector();
PLAYER_ACTIONS.escape();


var bio = "go through that left him forever scarred, but it is assumed that it might have something to do with chickens. In any case, the weight of that somber history is visible on art. And his face. And his gestures. And his clothes. He is not one to hide the feelings of suffering that swallow his soul.<br /><br /> got intrigued by your peculiar relationship to death, and decided to stick to your side, partly out of morbid curiosity, partly following his death wish that your impossible quest was bound to fulfill.";

PLAYER_ACTIONS.add({
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


// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `You face a burly man. His scar and the wear on his attire tell you that he has seen much, but those days seem far behind him now.`,
);
