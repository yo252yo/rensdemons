// ===================
//hack 0. INITIALIZATION
//hack 1. FLOORS
//hack 2. EXIT
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_CastleFloor(850,1750,1000,600);

new S_Floor(1550,1175,75,200);

new S_GooFloor(750,1250,200,225);

var f = new S_ExitFloor(1300,1775,100,35, '050_hell_map');

// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.initialize_with_character(1375, 1750);
