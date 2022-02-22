
// ===================
//hack A. INITIALIZATION (sound, etc...)
//hack B. FLOORS
//hack D. UNIQUE ELEMENTS
// ===================
new Snippet("levels/decors/temple");

var f = new S_ExitFloor(1250,1775,100,35, '021_town4');
new S_StainedGlass_wall(1075, 1050, 'church');
new S_StainedGlass_wall(1275, 1050, 'debauch');
new S_StainedGlass_wall(1475, 1050, 'church');



// ===================
//hack G. START/INIT
// ===================


f.initialize_with_character(1275, 1750);
