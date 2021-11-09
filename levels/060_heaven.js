// ===================
//hack 0. INITIALIZATION
// ===================
var gen = new Generator(Math.random());//DICTIONARY.get("world_seed")*41);
AUDIO.music.levels.heaven();
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);

var from = s[1];
var state = INVENTORY.count("_heaven_sequence");
var progressing = true;

if ((state == 0 || state == 1) && from == "t"){ // _ or T
  INVENTORY.increase("_heaven_sequence");
} else if (state == 2 && from == "d"){ // TT
  INVENTORY.increase("_heaven_sequence");
} else if (state == 2 && from == "t"){  // no move out of state 2
} else if (state == 3 && from == "d"){ // TTD
  INVENTORY.increase("_heaven_sequence");
} else if (state == 4 && from == "l"){ // TTDD
  INVENTORY.increase("_heaven_sequence");
} else if (state == 5 && from == "r"){ // TTDDL
  INVENTORY.increase("_heaven_sequence");
} else if (state == 6 && from == "l"){ // TTDDLR
  INVENTORY.increase("_heaven_sequence");
} else if (state == 7 && from == "r"){ // TTDDLRL
  INVENTORY.increase("_heaven_sequence");
} else if (state == 8) { // stay there
} else {
  progressing = false;
  INVENTORY.set("_heaven_sequence", 0);
}


// ===================
//hack 1. FLOORS
// ===================
var t = new S_TownFloor(1125,1550,500,500, "050_hell_map", "assets/patterns/clouds.png");

if(INVENTORY.count("_heaven_sequence") < 8){
  t.left_border.interaction = function(){ CURRENTLEVEL.setup("060_heaven@l"); };
  t.right_border.interaction = function(){ CURRENTLEVEL.setup("060_heaven@r"); };
  t.top_border.interaction = function(){ CURRENTLEVEL.setup("060_heaven@t"); };
  t.bot_border.interaction = function(){ CURRENTLEVEL.setup("060_heaven@d"); };
}

// ===================
//hack 2. EXIT
// ===================


// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

if (INVENTORY.count("_heaven_sequence") >= 8){
  var s1 = new B_Statue(1350,1275);
  s.interaction = function(){};
}

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
// from is to make sure we dont blink out right away
if(INVENTORY.count("_heaven_sequence") < 8 && from && !progressing && Math.random() < 0.2) {
  INVENTORY.set("_heaven_sequence", 0);
  CURRENTLEVEL.setup("050_hell_map");
} else {
  // We use a trick to always spawn in the same place!
  CURRENTLEVEL._recover_position = [1375,1325];
  CURRENTLEVEL.initialize_with_character(1375,1325);
}
