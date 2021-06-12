// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_easy/goblin.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Stick, 1);
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
BATTLE.operations.start("A Grumpy Goblin Grasps some Grass.");

//todo
