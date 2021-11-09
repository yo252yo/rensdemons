// ===================
//hack 0. INITIALIZATION
// ===================
var gen = new Generator(DICTIONARY.get("world_seed")*41);
AUDIO.music.levels.heaven();


// ===================
//hack 1. FLOORS
// ===================
new S_TownFloor(1100,1600,600,600, "060_heaven", "assets/patterns/clouds.png");

// ===================
//hack 2. EXIT
// ===================


// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================


// ===================
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================
// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

// ===================
//hack 7. START/INIT
// ===================
var c = INVENTORY.count("_heaven_tickets");
if(c >2) {
  INVENTORY.decrease("_heaven_tickets", c);
  CURRENTLEVEL.setup("050_hell_map");
} else {
  CURRENTLEVEL.initialize_with_character(1375,1325);

}
INVENTORY.increase("_heaven_tickets");
