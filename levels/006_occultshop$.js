// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.house();
// ===================
//hack 1. FLOORS
// ===================
new S_WoodFloor(1200, 1500, 300, 300);


// ===================
//hack 2. EXIT
// ===================

var entrance = new S_ExitFloor(1335, 1525, 50, 35, '005_town1');

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_SavePoint(1425, 1475);
new S_SavePoint(1225, 1475);

new B_Statue(1450, 1225);
new B_Statue(1225, 1225);

new B_Table(1325, 1325);

var shopkeep = new M_UpbeatDojikko(1325, 1275);

// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.initialize_with_character(1350, 1505);
