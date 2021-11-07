// ===================
//hack 0. INITIALIZATION
// ===================
var floor = 0;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  floor = parseInt(s[1]);
}
var gen = new Generator(DICTIONARY.get("world_seed")*31 + floor);
AUDIO.music.levels.pandemonium();


// ===================
//hack 1. FLOORS
// ===================
new S_CastleFloor(950,1650,800,500);

// ===================
//hack 2. EXIT
// ===================

if(floor == 0){
  new S_ExitFloor(1300,1675,100,35, '050_hell_map');
}


// Even floors go up on right, odd floors go up on left
var is_odd = floor % 2;

var newfloor = function (is_up) {
  var r = floor;
  if (is_up){
    return r + 1;
  } else {
    return r - 1;
  }
}

// Left block
new S_Door(1200, 1150, is_odd, floor);
new S_CastleFloor(1225,1175,50,200);
new S_CastleFloor(1200,1050,100,100);
if (floor > 0){
  new S_Stairs(1225, 1025, is_odd, '051_pandemonium@' + newfloor(is_odd));
}

// Right block
new S_Door(1400, 1150, (!is_odd && floor != 6), floor);
new S_CastleFloor(1425,1175,50,200);
new S_CastleFloor(1400,1050,100,100);
if (floor < 6){
  new S_Stairs(1425, 1025, !is_odd, '051_pandemonium@' + newfloor(!is_odd));
}


if (floor < 6) {
  new S_CastleFloor(900,1550,75,50);
  new S_ExitFloor(875,1550,50,50, '051_pandemonium_room@' + floor + "_" + 0);
  new S_CastleFloor(900,1300,75,50);
  new S_ExitFloor(875,1300,50,50, '051_pandemonium_room@' + floor + "_" + 1);

  new S_CastleFloor(1700,1300,100,50);
  new S_ExitFloor(1775,1300,50,50, '051_pandemonium_room@' + floor + "_" + 2);
  new S_CastleFloor(1700,1550,100,50);
  new S_ExitFloor(1775,1550,50,50, '051_pandemonium_room@' + floor + "_" + 3);

}

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
if (floor == 6) {
  new S_Throne(1250, 1350);
} else {
  new S_SavePoint(1325, 1200);
}
// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var filler = new Filler(gen.get());
var decorFiller = new MultiFiller(filler, 100, 100);
decorFiller.set_zone(975,1650,750,475);
decorFiller.add_default_constructor("S_HellEgg");
decorFiller.add_default_constructor("B_Jar",2);
decorFiller.add_default_constructor("S_Armor",4);
decorFiller.add_default_constructor("S_Candle",4);
decorFiller.add_default_constructor("S_Spike");

decorFiller.set_tries(15, 25);

if (floor != 6) {
  decorFiller.fill_decor_by_retry(true);
}


var wallFiller = new MultiFiller(filler, 75, 0);
wallFiller.add_default_constructor("S_Painting");
wallFiller.add_default_constructor("S_HellWindow");
wallFiller.add_default_constructor("S_Flag");
wallFiller.add_default_constructor("S_Mirror");
wallFiller.set_zone(1525,1300,200,150);
wallFiller.fill_line();
wallFiller.set_zone(975,1300,200,150);
wallFiller.fill_line();

// ===================
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================
if (floor == 6) {
  new S_Maou(1200, 1550);
}

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================


var events = new EventFiller(decorFiller, 15);
events.set_zone(975,1650,750,475);

events.battle('pandemonium/abaddon', 1.5);
events.battle('pandemonium/asmodeus', 1.5);
events.battle('pandemonium/azazel', 1.5);
events.battle('pandemonium/belial', 1.5);
events.battle('pandemonium/belphegor', 1.5);
events.battle('pandemonium/golem', 1.5);
events.battle('pandemonium/hellhound', 1.5);
events.battle('pandemonium/ifrit', 1.5);
events.battle('pandemonium/mammon', 1.5);
events.battle('pandemonium/titan', 1.5);

events.groundItem(ITEM.Elixir_chaos);
events.groundItem(ITEM.Elixir_decay);
events.groundItem(ITEM.Goo);
events.battleRubble(ITEM.Sword_great, 0.1);
events.battleRubble(ITEM.Axe, 0.1);
events.battleRubble(ITEM.Sword_iron, 0.1);

events.text(`...`);
events.text(`...`);
events.text(`...`);
events.text(`...`);
events.text(`...`);

events.set_tries(8, 15);
events.fill_floor_by_retry();


// ===================
//hack 7. START/INIT
// ===================

if(floor == 0){
  CURRENTLEVEL.initialize_with_character(1375, 1650);
} else if(floor % 2 == 1) {
  CURRENTLEVEL.initialize_with_character(1450, 1050);
} else {
  CURRENTLEVEL.initialize_with_character(1250, 1050);
}
