// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.mushrooms();
var gen = new Generator(DICTIONARY.get("world_seed")*10);

// ===================
//hack 1. FLOORS
// ===================

var hallways = [
  new S_LushFloor(1625,2000,750,50),
  new S_LushFloor(1625,2250,50,525),
  new S_LushFloor(2325,2150,50,600),
  new S_LushFloor(1975,1975,50,375),
  new S_LushFloor(2175,1600,475,50),
  new S_LushFloor(2150,2150,400,50),
  new S_LushFloor(2500,2350,50,425),
  new S_LushFloor(2500,2350,300,50),
  new S_LushFloor(2750,2500,50,325),
  new S_LushFloor(2750,2500,300,50),
  new S_LushFloor(2750,2225,200,50),
  new S_LushFloor(2500,1975,525,50),
  new S_LushFloor(2975,2075,50,350),
  new S_LushFloor(2975,2075,275,50),
  new S_LushFloor(2975,1775,250,50),
  new S_LushFloor(2600,1725,50,400),
  new S_LushFloor(2600,1725,225,50),
  new S_LushFloor(2600,1375,375,50),
  new S_LushFloor(2925,1525,50,400),
  new S_LushFloor(2925,1525,275,50),
  new S_LushFloor(1475,2250,200,50),
  new S_LushFloor(1475,2375,50,275),
  new S_LushFloor(1250,2150,275,50),
  new S_LushFloor(1250,2275,50,300),
  new S_LushFloor(1400,1775,275,50),
  new S_LushFloor(1400,1950,50,425),
  new S_LushFloor(1200,1575,250,50),
  new S_LushFloor(2800,1175,350,50),
  new S_LushFloor(2175,1675,50,325),
  new S_LushFloor(2200,1375,225,50),
  new S_LushFloor(2375,1450,50,325),
  new S_LushFloor(2275,1175,275,50),
  new S_LushFloor(1775,1650,325,50),
  new S_LushFloor(1775,1750,50,650),
  new S_LushFloor(1525,1150,475,50),
  new S_LushFloor(1525,1400,50,450),
  new S_LushFloor(1525,1400,50,450),
  new S_LushFloor(1200,1700,50,600),
  new S_LushFloor(1100,1150,300,50),
  new S_LushFloor(1375,1400,325,50),
];

new S_LushFloor(1950,2450,100,500);
new S_LushFloor(2100,1375,125,50);
new S_LushFloor(2100,1400,50,50);

// ===================
//hack 2. EXIT
// ===================

var f = new S_ExitFloor(1900,2500,200,75, '010_world_map');

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

new S_SavePoint(1975, 2050);

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

// could improve load by making these cosmetics and not level items
var noTreeZone = new S_LushFloor(2075,1475,100,175);

var filler = new Filler(gen.get());
filler.set_zone(1150,2475,2100,1475);
filler.set_tries(200, 250);

filler.add_default_constructor("S_Shroomgiant", 1, 100, 100);
filler.add_default_constructor("S_Tree", 3, 30, 10);
filler.add_default_constructor("S_Shroomtall", 1, 20, 75);
filler.fill_decor_by_retry(true);



filler.clear();
filler.set_tries(0, 2);
for(var f of hallways) {
  filler.set_zone_from_floor(f);
  filler.add_default_constructor("S_PlantSmall", 1, 20, 20);
  filler.add_default_constructor("S_Shroomsmall", 1, 20, 20);
  filler.fill_floor_by_retry();
}


// ===================
//hack 5. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

var events = new EventFiller(filler, 10);
events.set_tries(0, 3);
events.battle('forests/boar');
events.battle('forests/flower');
events.battle('forests/mandragora');
events.battle('forests/fox', 0.5);
events.battle('forests/squirrel');
events.battle('forests/morel',3);
events.battle('forests/truffle',3);
events.groundItem(ITEM.Stick, 0.5);
events.groundItem(ITEM.Berry, 0.5);
events.groundItem(ITEM.Flower, 0.5);
events.groundItem(ITEM.Mushroom);
events.battleRubble(ITEM.AncientRubbles, 0.5);
events.byConstructor("EB_Plants", 2);
events.byConstructor("EB_Skeleton", 1);

events.text('You do not see many creatures around you in these woods, but you do hear scratching and cracklings all around you. The feeling of there being something nearby watching you that you cannot pinpoint is especially nerve-wracking.');
events.text('The heavy vegetation around and above you is creating a very dark and damp place. The roots and bushes constantly hinder your progress, and when they\'re not you still have to contend with a very muddy floor. Your progress is slow and painful.');
events.text('Fruity aromas reach your nostrils, but you have a suspicion that they might be a treacherous lure from some exotic plant to push you into a trap. You brace yourself and continue on.');
events.text('The leaves and branches are so heavy here that you have to actively break them to make a path. Fortunately, it eases out before long, and you can go back to your usual velocity.');
events.add_shared_events(0.8);

for(var f of hallways) {
  events.set_zone_from_floor(f);
  events.fill_floor_by_retry();
}


// ===================
//hack 6. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================

noTreeZone.destroy(true);
new SBattle(2075, 1425, '_02/_loot_forest');
new SBattle(2125, 1375, 'forests/fungus');

// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.setup_text_start_function([
  `You stand before the forest that the priest mentioned. It doesn't seem very dangerous, but you can tell that the lustrous vegetation becomes very dense quite fast, promising to make navigation a real challenge. Only a small trail seems walkable in the middle of the tangled mess of bushes.`,
  `$$BestFriend$: "What are we even looking for?"`,
  `$$Ren$: "Not sure... Some sort of irregularity? Things that could be ancient ruins, burrowed under the vegetation?"`,
  `$$BestFriend$: "That's going to be tough..."`,
]);

CURRENTLEVEL.initialize_with_character(2000, 2425);
