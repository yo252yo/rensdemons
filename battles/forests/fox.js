// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/fox.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Bone, 1);
BATTLE.operations.add_loot("", 4);


// ===================
//hack PLAYER CABAILITIES
// ===================


// ===================
//hack MONSTER BEHAVIOR
// ===================


// ===================
//hack START
// ===================

BATTLE.operations.start("A Frisky Fox Feints Flight.");

//todo
