
new CenteredMovingImage("assets/characters/party/TorturedSoul.png", 'background',32,48, 2);

AUDIO.music.characters.TorturedSoul();
PLAYER_ACTIONS.escape();





// ===================
// =================== START
// ===================
BATTLE.operations.start([
  `$$TorturedSoul$: "Help me. Put me out of my misery."`,
]);
