// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_easy/skeleton.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Bone, 5);
BATTLE.operations.add_loot(ITEM.Sword_wooden, 1);
BATTLE.operations.add_loot("", 14);

// ===================
//hack PLAYER CABAILITIES
// ===================



// ===================
//hack MONSTER BEHAVIOR
// ===================


// ===================
//hack START
// ===================

BATTLE.operations.start("A Snorty Skeleton Seizes its Sword.");


//todo
