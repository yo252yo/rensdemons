
new CenteredMovingImage("assets/characters/party/TorturedSoul.png", 'background',32,48, 2);

AUDIO.music.characters.TorturedSoul();
PLAYER_ACTIONS.escape();

// ===================
// =================== START
// ===================
BATTLE.operations.start([
  `You find a young man wearing black velvety clothes brooding in a corner of the town. When he sees you, he pretends not to and starts reciting a poem to himself.`,
  `$$TorturedSoul$: "Is there a loneliest place than a crowded city?"`,
]);
