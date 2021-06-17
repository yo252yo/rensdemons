// ===================
//hack INITIALIZATION
// ===================
AUDIO.music.levels.mushrooms();
var gen = new Generator(DICTIONARY.get("dungeons_seed"));

// ===================
//hack FIXED ELEMENTS (floors)
// ===================

var f = new S_Floor(900,2500,200,75, 'obj_dark', '010_world_map');

var hallways = [
  new S_Floor(625,2000,750,50),
  new S_Floor(625,2250,50,525),
  new S_Floor(1325,2150,50,600),
  new S_Floor(975,1975,50,375),
  new S_Floor(1175,1600,475,50),
  new S_Floor(1150,2150,400,50),
  new S_Floor(1500,2350,50,425),
  new S_Floor(1500,2350,300,50),
  new S_Floor(1750,2500,50,325),
  new S_Floor(1750,2500,300,50),
  new S_Floor(1750,2225,200,50),
  new S_Floor(1500,1975,525,50),
  new S_Floor(1975,2075,50,350),
  new S_Floor(1975,2075,275,50),
  new S_Floor(1975,1775,250,50),
  new S_Floor(1600,1725,50,400),
  new S_Floor(1600,1725,225,50),
  new S_Floor(1600,1375,375,50),
  new S_Floor(1925,1525,50,400),
  new S_Floor(1925,1525,275,50),
  new S_Floor(475,2250,200,50),
  new S_Floor(475,2375,50,275),
  new S_Floor(250,2150,275,50),
  new S_Floor(250,2275,50,300),
  new S_Floor(400,1775,275,50),
  new S_Floor(400,1950,50,425),
  new S_Floor(200,1575,250,50),
  new S_Floor(1800,1175,350,50),
  new S_Floor(1175,1675,50,325),
  new S_Floor(1200,1375,225,50),
  new S_Floor(1375,1450,50,325),
  new S_Floor(1275,1175,275,50),
  new S_Floor(775,1650,325,50),
  new S_Floor(775,1750,50,650),
  new S_Floor(525,1150,475,50),
  new S_Floor(525,1400,50,450),
  new S_Floor(525,1400,50,450),
  new S_Floor(200,1700,50,600),
  new S_Floor(100,1150,300,50),
  new S_Floor(375,1400,325,50),
];

new S_Floor(950,2450,100,500);
new S_Floor(1100,1375,125,50);
new S_Floor(1100,1400,50,50);

// ===================
//hack FIXED ELEMENTS (decor)
// ===================

new S_SavePoint(975, 2050);

new SBattle(1075, 1425, '_02/_loot_forest');
new SBattle(1125, 1375, 'forests/fungus');

// ===================
//hack GENERATED ELEMENTS (decor)
// ===================

// could improve load by making these cosmetics and not level items
var noTreeZone = new S_Floor(1075,1475,100,175);

var filler = new Filler(gen);
filler.set_zone(150,2475,2100,1475);
filler.set_tries(100, 100);
filler.set_object(30, 10, function(x,y,g){ return new S_Tree(x, y); });
filler.fill_by_retry(true);
filler.set_tries(75, 75);
filler.set_object(100, 100, function(x,y,g){ return new S_Shroomgiant(x, y); });
filler.fill_by_retry(true);
filler.set_tries(25, 25);
filler.set_object(20, 75, function(x,y,g){ return new S_Shroomtall(x, y); });
filler.fill_by_retry(true);


noTreeZone.destroy();

filler.set_tries(1, 1);
for(var f of hallways) {
  filler.set_zone_from_floor(f);
  var r = gen.get();
  if (r < 0.2){
    filler.set_object(20, 20, function(x,y,g){ return new S_PlantSmall(x, y); });
    filler.fill_by_retry();
  } else if (r < 0.4){
    filler.set_object(20, 20, function(x,y,g){ return new S_Shroomsmall(x, y); });
    filler.fill_by_retry();
  }
}


// ===================
//hack TEMPORARY ELEMENTS (encounters)
// ===================

var events = new EventFiller(filler, 10);
events.set_tries(0, 2);
events.battle('forests/boar');
events.battle('forests/flower');
events.battle('forests/fox');
events.battle('forests/mandragora');
events.battle('forests/squirrel');
events.battle('forests/morel',3);
events.battle('forests/truffle',3);
events.groundItem(ITEM.Stick, 0.5);
events.groundItem(ITEM.Berry, 0.5);
events.groundItem(ITEM.Flower, 0.5);
events.groundItem(ITEM.Mushroom);
events.battleRubble(ITEM.AncientRubbles, 0.5);

events.text('You do not see many creatures around you in these woods, but you do hear scratching and cracklings all around you. The feeling of there being something nearby watching you that you cannot pinpoint is especially nerve-wracking.');
events.text('The heavy vegetation around and above you is creating a very dark and damp place. The roots and bushes constantly hinder your progress, and when they\'re not you still have to contend with a very muddy floor. Your progress is slow and painful.');
events.text('Fruity aromas reach your nostrils, but you have a suspicion that they might be a treacherous lure from some exotic plant to push you into a trap. You brace yourself and continue on.');
events.text('The leaves and branches are so heavy here that you have to actively break them to make a path. Fortunately, it eases out before long, and you can go back to your usual velocity.');

for(var f of hallways) {
  events.set_zone_from_floor(f);
  events.fill_by_retry();
}



// ===================
//hack START
// ===================


CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
  `You stand before the forest that the priest mentioned. It doesn't seem very dangerous, but you can tell that the lustrous vegetation becomes very dense quite fast, promising to make navigation a real challenge. Only a small trail seems walkable in the middle of the tangled mess of bushes.`,
  `$$BestFriend$: "What are we even looking for?"`,
  `$$Ren$: "Not sure... Some sort of irregularity? Things that could be ancient ruins, burrowed under the vegetation?"`,
  `$$BestFriend$: "That's going to be tough..."`,
  ], IO.control.character);
};

CURRENTLEVEL.initialize_with_character(1000, 2425);
