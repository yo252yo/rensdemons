
// get the sprite name from BATTLE.make_conversation
var sprite = SPECIALBATTLES._battle_extra_data[0];
var s = new CenteredMovingBattleImage("assets/characters/villager" + sprite + ".png", 'background', 32, 48);


PLAYER_ACTIONS.allow_flight();

BATTLE.operations.start("You find a wooden chest. It doesn't seem locked.");
