// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_easy/mummy.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Linnens, 1);
BATTLE.operations.add_loot("", 9);

// ===================
//hack PLAYER CABAILITIES
// ===================


// ===================
//hack MONSTER BEHAVIOR
// ===================


// ===================
//hack START
// ===================
BATTLE.operations.start("A Meandering Mummy Moans Mournfully.");

//todo
