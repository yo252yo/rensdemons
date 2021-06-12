// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/squirrel.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Berry, 1);
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
BATTLE.operations.start("A Savage Squirrel Springs on Stage.");

//todo
