// ===================
//hack 0. INITIALIZATION
// ===================
var floor = 0;
var room = 0;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);

s = s[1].split("_");
if(s.length > 1){
  floor = parseInt(s[0]);
  room = parseInt(s[1]);
}
var gen = new Generator(DICTIONARY.get("world_seed")*37 + floor + room);
AUDIO.music.levels.pandemonium();

// ===================
//hack 1. FLOORS
// ===================
new S_GooFloor(1175,1525,350,275);

// ===================
//hack 2. EXIT
// ===================

if(room < 2){
  new S_ExitFloor(1500,1400,50,50, '051_pandemonium@' + floor);
} else {
  new S_ExitFloor(1150,1400,50,50, '051_pandemonium@' + floor);
}


// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================
// ===================
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================
var x = 1225;
var y = 1425;

if(room >= 2){
  x += 200;
}

if(floor == 0 && room == 0) {
  new SE_groundItem(x, y, ITEM.MaouKey0);
} else if(floor == 1 && room == 2) {
  new SE_groundItem(x, y, ITEM.MaouKey1);
} else if(floor == 2 && room == 1) {
  new SE_groundItem(x, y, ITEM.MaouKey2);
} else if(floor == 3 && room == 3) {
  new SE_groundItem(x, y, ITEM.MaouKey3);
} else if(floor == 4 && room == 0) {
  new SE_groundItem(x, y, ITEM.MaouKey4);
} else if(floor == 5 && room == 2) {
  new SE_groundItem(x, y, ITEM.MaouKey5);
}

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================



// ===================
//hack 7. START/INIT
// ===================

if(room < 2){
  CURRENTLEVEL.initialize_with_character(1450, 1375);
} else {
  CURRENTLEVEL.initialize_with_character(1200, 1375);
}
