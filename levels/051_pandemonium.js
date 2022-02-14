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
  new S_Throne(1250, 1400);
}

new S_SavePoint(1325, 1200);


// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var decorFiller = new Filler(gen.get(), 100, 100);
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


var wallFiller = new Filler(gen.get(), 75, 0);
wallFiller.add_default_constructor("S_Painting_wall");
wallFiller.add_default_constructor("S_HellWindow_wall");
wallFiller.add_default_constructor("S_Flag_wall");
wallFiller.add_default_constructor("S_Mirror_wall");

if (floor != 6) {
  wallFiller.set_zone(1525,1300,200,150);
  wallFiller.fill_line();
  wallFiller.set_zone(975,1300,200,150);
  wallFiller.fill_line();
}

// ===================
//hack 5. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================


var events = new EventFiller(decorFiller, 15);
events.set_zone(975,1650,750,475);

events.battle('pandemonium/abaddon', 1.5);
events.battle('pandemonium/asmodeus', 0.4);
events.battle('pandemonium/azazel', 1.5);
events.battle('pandemonium/belial', 1.5);
events.battle('pandemonium/belphegor', 1);
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

events.text(`You see a demon larvae hatching from a nearby egg. You're fast enough to get rid of the menace before it grows into something more dangerous.`, 0.8);
events.text(`The wind howls as it speeds through the hallways of the castle, and a chill runs down your bones. No doubt the demons do not care about the temperature.`, 0.8);
events.text(`A patrol of a group of well armed demons is heading your way. Fortunately, you manage to hide behind one of the numerous decorations and avoid the encounter.`, 0.8);
events.text(`You can't help but think that for a spawning ground for barbaric beasts, the decoration is quite ostentatious. Those demons are clearly more civilized than you anticipated. It doesn't change your objective, though.`, 0.8);
events.text(`You inadvertently trigger a deadly trap: the tile you were just stepping on opens up to reveal a very deep well. Fortunately, your reflexes help you jump out in time and save your skin. The Goddess must be looking out for you!`, 0.8);
events.text(`This massive castle spells the end of your adventure. In your soul, the Goddess encourages you to climb higher and higher.`, 0.8);
events.text(`You understand that this place is more than a symbol of power for $$demon_lord$. Based on the rooms you see around you, this is clearly a hatchery where demons are spawned. It's probably the very origin of the hordes that destroyed your world...`, 0.8);
events.text(`You know that each step brings you closer to the final fight, and your subsequent victory. You keep pumping yourself up and preparing yourself for the final confrontation. You know that now is the time to prepare and summon all your strengths. There's only one possible outcome to all of this.`, 0.8);
events.add_conversations(0.2, true);

events.set_tries(8, 15);
if (floor != 6){
  events.fill_floor_by_retry();
}

// ===================
//hack 6. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================
if (floor == 6) {
  new S_Maou(1200, 1600);

  var i = function(){
    TextBannerSequence.make([
      `It's a statue of the Goddess... In the most evil place in the world...`,
    ]);
  }
  var s1 = new B_Statue(975, 1175);
  s1.interaction = i;
  var s2 = new B_Statue(1675, 1175);
  s2.interaction = i;
  var s3 = new B_Statue(975, 1625);
  s3.interaction = i;
  var s4 = new B_Statue(1675, 1625);
  s4.interaction = i;
}


// ===================
//hack 7. START/INIT
// ===================
if (floor == 0){
  CURRENTLEVEL.setup_text_start_function([
    `You arrive in the main hall of the wide castle. The floor is paved with cold marble slabs, the walls are made of old stone. The place is swarming with demons and ungodly sights. No doubt that $$demon_lord$ is in the middle of all this.`,
    `You gather your courage. You're at the heart of the enemy's forces. The end is near.`,
  ]);
}
if (floor == 6){
  CURRENTLEVEL.setup_text_start_function([
    `You finally reach the final floor. You're exhausted, but the adrenaline you get from approaching your goal powers you through.`,
    `The top floor is just one wide room, with numerous openings in the walls from which $$demon_lord$ can gaze upon his territory in every direction. The demon lord is in the middle of the room, slowly pacing around his massive throne. It looks like he's waiting for something.`,
    `You have the itch to pray at the altar before such an important encounter.`,
  ]);
}

if(floor == 0){
  CURRENTLEVEL.initialize_with_character(1375, 1650);
} else if(floor % 2 == 1) {
  CURRENTLEVEL.initialize_with_character(1450, 1050);
} else {
  CURRENTLEVEL.initialize_with_character(1250, 1050);
}
