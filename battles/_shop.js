
// get the sprite name from BATTLE.make_conversation
var sprite = BATTLE.pending_text[0];
var s = new CenteredMovingImage("assets/characters/villager" + sprite + ".png", 'background', 32, 48);


PLAYER_ACTIONS.allow_flight();

BATTLE.operations.start("You find a wooden chest. It doesn't seem locked.");
