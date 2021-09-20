// ===================
//hack 0. INITIALIZATION
//hack 1. FLOORS -> EXITS
//hack 2. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new Snippet("levels/decors/temple");

var f = new S_ExitFloor(1250,1775,100,35, '021_town4');


// ===================
//hack 6. START/INIT
// ===================

CURRENTLEVEL.initialize_with_character(1275, 1750);
