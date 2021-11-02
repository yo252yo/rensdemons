// ===================
//hack 0. INITIALIZATION
//hack 1. FLOORS
//hack 2. EXIT
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new Snippet("levels/decors/temple");

var f = new S_ExitFloor(1250,1775,100,35, '021_town4');
new S_StainedGlass(1075, 1050, 'church');
new S_StainedGlass(1275, 1050, 'debauch');
new S_StainedGlass(1475, 1050, 'church');



// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.initialize_with_character(1275, 1750);
