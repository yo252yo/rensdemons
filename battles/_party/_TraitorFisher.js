
new CenteredMovingImage("assets/characters/party/TraitorFisher.png", 'background',32,48, 2);

AUDIO.music.characters.TraitorFisher();

// ===================
// =================== PLOT
// ===================

PLAYER_ACTIONS.escape();



// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `$$TraitorFisher$: "Quick, run away before it's too late! The closest shore is to the south!"`,
);
