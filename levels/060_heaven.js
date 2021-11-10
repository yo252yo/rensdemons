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
  s1.interaction = function(){};

  var s = new S_StainedGlass(1175,1475, 'circle');
  s.visual_element.adjust_depth(0);
  s.interaction = undefined;
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

var placeholder = new S_SavePoint(1375, 1325);

var filler = new Filler(gen.get());
var decorFiller = new MultiFiller(filler, 100, 100);
decorFiller.set_zone(1125,1550,500,500);

switch(gen.int(3)){
  case 0:
    decorFiller.add_default_constructor("S_Bookshelf", 1, 50, 100);
    decorFiller.add_default_constructor("S_BookshelfBig", 3, 150, 150);
    decorFiller.set_tries(30, 50);
    break;
  case 1:
    decorFiller.add_default_constructor("S_Cloud", 1, 70, 50);
    decorFiller.set_tries(15, 25);
    break;
  case 2:
    decorFiller.add_default_constructor("S_Tomb", 50, 75);
    decorFiller.set_tries(30, 50);
    break;
}

// no decor for first entrance
if (INVENTORY.count("_heaven_visits") && INVENTORY.count("_heaven_sequence") < 8){
  decorFiller.fill_decor_by_retry();
}

placeholder.destroy();


// ===================
//hack 7. START/INIT
// ===================

if (!INVENTORY.count("_heaven_visits")){
  CURRENTLEVEL.start_function = function() {
    var callback = function(){
      IO.control.character();
    }
    TextBannerSequence.make([
      `You find yourself in the middle of a sea of cottony clouds. The slow swirling motion of the vapor is numbing your senses. No doubt that some sort of divine magic is also at play in this disorientation. You're not exactly sure how you arrived there or where you should go... The mist extends in every direction, but every time you look away it seems that the world changes around you. It's going to be hard to orient yourself, let alone pierce the mystery of this place...`,
    ], callback);
  };
}

// from is to make sure we dont blink out right away
if(INVENTORY.count("_heaven_sequence") < 8 && from && !progressing && Math.random() < 0.2) {
  INVENTORY.set("_heaven_sequence", 0);
  CURRENTLEVEL.setup("050_hell_map");
} else {
  // We use a trick to always spawn in the same place!
  CURRENTLEVEL._recover_position = [1375,1325];
  CURRENTLEVEL.initialize_with_character(1375,1325);
}
INVENTORY.increase("_heaven_visits");
