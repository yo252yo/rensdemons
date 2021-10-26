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

CURRENTLEVEL.start_function = function() {
  var callback = function(){
    SAVE.autosave();
    IO.control.character();
  }
  TextBannerSequence.make([
    `When you exit the vulcano, you find yourself in a different world. Your trip in the mountains indeed brought you to another dimension, probably the one where the demons originated.`,
    `Maybe the loss of $$BestFriend$ numbed your soul, or maybe the Goddess prepared you for this on some level, but you do not seem surprised or scared by the new landscape that expands in front of your eyes.`,
    "The fauna and flora are unlike anything you've ever seen before. The atmosphere seems thicker, somehow. The ground is dry and colorful, the plants seem to hide some deadly poisons. You have no doubt that every creature in this place is deadly. The heat and humidity make breathing hard.",
    "But those hardship do not phase you. You're here for one purpose only, and your resolve is strong. You're going to find $$demon_lord$.",
  ], callback);
};

CURRENTLEVEL.initialize_with_character(2475, 2225, 0.6);

// ===================
//hack 8. AUTOSAVE
// ===================
SAVE.autosave();
