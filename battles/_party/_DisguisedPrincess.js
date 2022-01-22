
new CenteredMovingImage("assets/characters/party/DisguisedPrincess.png", 'background',32,48, 2);

AUDIO.music.characters.DisguisedPrincess();
PLAYER_ACTIONS.escape();

PLAYER_ACTIONS.add({
  name: "..",
  unlock: true,
  description: [`....`],
  outcome: BATTLETREE.WIN,
});


// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `There doesn't seem to be anything there...`,
);
