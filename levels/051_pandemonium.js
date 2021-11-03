// ===================
//hack 0. INITIALIZATION
//hack 1. FLOORS
//hack 2. EXIT
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_CastleFloor(850,1750,1000,600);

new S_GooFloor(750,1250,200,225);
var f = new S_ExitFloor(1300,1775,100,35, '050_hell_map');





new S_Door(1125, 1150, true);
new S_CastleFloor(1150,1175,50,250);
new S_CastleFloor(1125,1025,100,100);
new S_Stairs(1150, 1000, true);

new S_Door(1475, 1150, false);
new S_CastleFloor(1500,1175,50,250);
new S_CastleFloor(1475,1025,100,100);
new S_Stairs(1500, 1000, false);

// ===================
//hack 7. START/INIT
// ===================

//CURRENTLEVEL.initialize_with_character(1375, 1750);

CURRENTLEVEL.initialize_with_character(1375, 750);
