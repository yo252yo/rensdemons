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

var isGooRoom = false;
if (gen.get() < 0.25){
  isGooRoom = true;
}
// ===================
//hack 1. FLOORS
// ===================
if (isGooRoom){
  new S_GooFloor(1175,1525,350,275);
} else {
  new S_CastleFloor(1175,1525,350,275);
}

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

var x = 1225;
var y = 1425;

if(room >= 2){
  x += 200;
}
var placeholder;

if(floor == 0 && room == 0) {
  new SE_groundItem(x, y, ITEM.MaouKey0);
  placeholder = new S_SavePoint(x,y);
} else if(floor == 1 && room == 2) {
  new SE_groundItem(x, y, ITEM.MaouKey1);
  placeholder = new S_SavePoint(x,y);
} else if(floor == 2 && room == 1) {
  new SE_groundItem(x, y, ITEM.MaouKey2);
  placeholder = new S_SavePoint(x,y);
} else if(floor == 3 && room == 3) {
  new SE_groundItem(x, y, ITEM.MaouKey3);
  placeholder = new S_SavePoint(x,y);
} else if(floor == 4 && room == 0) {
  new SE_groundItem(x, y, ITEM.MaouKey4);
  placeholder = new S_SavePoint(x,y);
} else if(floor == 5 && room == 2) {
  new SE_groundItem(x, y, ITEM.MaouKey5);
  placeholder = new S_SavePoint(x,y);
}

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================


var filler = new Filler(gen.get());
var decorFiller = new MultiFiller(filler, 50, 50);
decorFiller.set_zone(1200,1525,300,275);
if (isGooRoom){
  decorFiller.add_default_constructor("S_HellEgg",7);
  decorFiller.add_default_constructor("S_HellPlantLeaning");
  decorFiller.add_default_constructor("S_HellPlantSretching");
  decorFiller.add_default_constructor("S_HellPlantSlimy");
  decorFiller.add_default_constructor("S_HellPlantLoops");
  decorFiller.add_default_constructor("S_Spike");
  decorFiller.set_tries(80, 100);
  decorFiller.fill_decor_by_retry(true);
} else {
  var roomType = gen.get();
  if(roomType < 0.2){
    decorFiller.set_guaranteed(1);
    decorFiller.add_default_constructor("S_Organ", 10, 100, 100);
    decorFiller.set_tries(1, 1);
    decorFiller.fill_decor_by_retry(true);
    decorFiller.clear();

    decorFiller.add_default_constructor("S_Armor");
    decorFiller.add_default_constructor("S_Candle");
    decorFiller.set_tries(2, 5);
    decorFiller.fill_decor_by_retry(true);
  } else if(roomType < 0.6){
    decorFiller.add_default_constructor("B_Bed", 10);
    decorFiller.add_default_constructor("S_HellEgg");
    decorFiller.add_default_constructor("S_Candle",4);
    decorFiller.add_default_constructor("S_Spike");
    decorFiller.set_tries(1, 5);
    decorFiller.fill_decor_by_retry(true);
  } else{
    decorFiller.add_default_constructor("S_HellEgg");
    decorFiller.add_default_constructor("B_Jar",2);
    decorFiller.add_default_constructor("S_Armor",4);
    decorFiller.add_default_constructor("S_Candle",4);
    decorFiller.add_default_constructor("S_Spike");
    decorFiller.set_tries(1, 5);
    decorFiller.fill_decor_by_retry(true);
  }
}


// ===================
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================
if(placeholder){
  placeholder.destroy();
}

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================



// ===================
//hack 7. START/INIT
// ===================

if(room < 2){
  CURRENTLEVEL.initialize_with_character(1475, 1375);
} else {
  CURRENTLEVEL.initialize_with_character(1175, 1375);
}
