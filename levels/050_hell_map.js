// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.hell();
INTERFACE.make_compass();
var gen = new Generator(DICTIONARY.get("world_seed")*23);

// ===================
//hack 1. FLOORS
// ===================
var h = 1550;
var w = 1950;
var f = new S_Floor(1050, 1000+h, w, h-50, 'void');

f.visual_element.html_rectangle.style.border = "1px dotted #00000022";

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new SM_HellVulcano(2500, 2200);

new SM_Pandemonium(1600,1625, `Pandemonium`);
new SM_Heaven(1600,1200, `Heaven`);

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.initialize_with_character(2475, 2225, 0.6);

// ===================
//hack 8. AUTOSAVE
// ===================
SAVE.autosave();
