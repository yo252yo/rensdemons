// ===================
//hack 0. INITIALIZATION
//hack 1. FLOORS
//hack 2. EXIT
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_CastleFloor(850,1750,1000,600);

new S_GooFloor(750,1250,200,225);
var f = new S_ExitFloor(1300,1775,100,35, '050_hell_map');


new S_Door(1200, 1150, true);
new S_CastleFloor(1225,1175,50,200);
new S_CastleFloor(1200,1050,100,100);
new S_Stairs(1225, 1025, true, '051_pandemonium');

new S_Door(1400, 1150, false);
new S_CastleFloor(1425,1175,50,200);
new S_CastleFloor(1400,1050,100,100);
new S_Stairs(1425, 1025, false, '051_pandemonium');

// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.initialize_with_character(1375, 1750);
