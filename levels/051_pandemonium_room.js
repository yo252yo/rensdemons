// ===================
//hack A. INITIALIZATION (sound, etc...)
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
//hack B. FLOORS
// ===================
if (isGooRoom){
  new S_GooFloor(1175,1525,350,275);
} else {
  new S_CastleFloor(1175,1525,350,275);
}

// ===================
//hack C. EXIT
// ===================
var exit;
if(room < 2){
  exit = new S_ExitFloor(1500,1400,50,50, '051_pandemonium@' + floor);
} else {
  exit =  new S_ExitFloor(1150,1400,50,50, '051_pandemonium@' + floor);
}


// ===================
//hack D. UNIQUE ELEMENTS
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
//hack E. DECOR
// ===================

var decorFiller = new Filler(gen.get(), 50, 50);
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
    decorFiller.fill_decor_by_retry();
  } else if(roomType < 0.6){
    decorFiller.add_default_constructor("B_Bed", 10);
    decorFiller.add_default_constructor("S_HellEgg");
    decorFiller.add_default_constructor("S_Candle",4);
    decorFiller.add_default_constructor("S_Spike");
    decorFiller.set_tries(1, 5);
    decorFiller.fill_decor_by_retry();
  } else{
    decorFiller.add_default_constructor("S_HellEgg");
    decorFiller.add_default_constructor("S_Armor",4);
    decorFiller.add_default_constructor("S_Candle",4);
    decorFiller.add_default_constructor("S_Spike");
    decorFiller.set_tries(1, 5);
    decorFiller.fill_decor_by_retry();
  }
}

var wallFiller = new Filler(gen.get(), 75, 0);
wallFiller.set_zone(1200,1525,300,275);
//var wallFiller = decorFiller.copy(75, 0);
wallFiller.add_default_constructor("S_Painting_wall");
wallFiller.add_default_constructor("S_HellWindow_wall");
wallFiller.add_default_constructor("S_Flag_wall");
wallFiller.add_default_constructor("S_Mirror_wall");

//wallFiller.set_zone(1525,1300,200,150);
wallFiller.fill_line();


// ===================
//hack F. EVENTS
// ===================

var events = new EventFiller(gen.get(), 25);
events.set_zone(1200,1525,300,275);

events.battle('pandemonium/abaddon', 1.1);
events.battle('pandemonium/asmodeus', 0.2);
events.battle('pandemonium/azazel', 1.1);
events.battle('pandemonium/belial', 1.1);
events.battle('pandemonium/belphegor', 0.3);
events.battle('pandemonium/golem', 1.1);
events.battle('pandemonium/hellhound', 1.1);
events.battle('pandemonium/ifrit', 1.1);
events.battle('pandemonium/mammon', 1.1);
events.battle('pandemonium/titan', 1.1);

events.groundItem(ITEM.Elixir_chaos);
events.groundItem(ITEM.Elixir_decay);
events.groundItem(ITEM.Goo);

events.text(`You see a demon larvae hatching from a nearby egg. You're fast enough to get rid of the menace before it grows into something more dangerous.`, 0.8);
events.text(`The wind howls as it speeds through the hallways of the castle, and a chill runs down your bones. No doubt the demons do not care about the temperature.`, 0.8);
events.text(`A patrol of a group of well armed demons is heading your way. Fortunately, you manage to hide behind one of the numerous decorations and avoid the encounter.`, 0.8);
events.text(`You can't help but think that for a spawning ground for barbaric beasts, the decoration is quite ostentatious. Those demons are clearly more civilized than you anticipated. It doesn't change your objective, though.`, 0.8);
events.text(`You inadvertently trigger a deadly trap: the tile you were just stepping on opens up to reveal a very deep well. Fortunately, your reflexes help you jump out in time and save your skin. The Goddess must be looking out for you!`, 0.8);
events.text(`This massive castle spells the end of your adventure. In your soul, the Goddess encourages you to climb higher and higher.`, 0.8);
events.text(`You understand that this place is more than a symbol of power for $$demon_lord$. Based on the rooms you see around you, this is clearly a hatchery where demons are spawned. It's probably the very origin of the hordes that destroyed your world...`, 0.8);
events.text(`You know that each step brings you closer to the final fight, and your subsequent victory. You keep pumping yourself up and preparing yourself for the final confrontation. You know that now is the time to prepare and summon all your strengths. There's only one possible outcome to all of this.`, 0.8);
events.add_conversations(0.2, true);

events.set_tries(3, 7);
events.fill_floor_by_retry();


// ===================
//hack G. START/INIT
// ===================

exit.initialize_with_character();
