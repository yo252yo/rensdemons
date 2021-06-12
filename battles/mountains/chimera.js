// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/chimera.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 2);

// ===================
//hack PLAYER CABAILITIES
// ===================


// ===================
//hack MONSTER BEHAVIOR
// ===================


// ===================
//hack START
// ===================

BATTLE.operations.start("A Cawing Chimera Charges Claws ahead.");

//todo
