
AUDIO.music.levels.harpies();
var gen = new Generator(DICTIONARY.get("world_seed")*13);


new S_Floor(400,1450,200,175);
new S_Floor(550,1375,175,50);
new S_Floor(675,1725,50,400);
new S_Floor(625,1775,150,125);
new S_Floor(725,1725,350,50);
new S_Floor(1000,1775,75,150);
new S_Floor(1025,1675,25,350);
new S_Floor(850,1350,200,25);
new S_Floor(825,1400,100,150);


var f = new S_Floor(375,1425,50,125, 'obj_dark', 'demo/world_map');

var door = new S_Floor(850,1250,50,25, 'obj_dark');
door.interaction = function() {
  CURRENTLEVEL.setup("demo/cavern");
}



var filler = new Filler(gen);
filler.set_zone(425,1875,750,700);
filler.set_tries(3, 10);
filler.set_object(175, 50, function(x,y,g){ return new S_RocksHuge(x, y); });
filler.fill_by_retry(true);
filler.set_object(50, 20, function(x,y,g){ return new S_Rocks1(x, y); });
filler.fill_by_retry(true);
filler.set_object(50, 20, function(x,y,g){ return new S_Rocks2(x, y); });
filler.fill_by_retry(true);
filler.set_object(50, 20, function(x,y,g){ return new S_Rocks3(x, y); });
filler.fill_by_retry(true);
filler.set_object(50, 20, function(x,y,g){ return new S_Rocks4(x, y); });
filler.fill_by_retry(true);



new SBattle(1015, 1450, 'mountains/dragon');



var events = new EventFiller(filler, 5);

events.battle('world/mummy', 1);
events.battle('mountains/harpy', 1);
events.battle('world/wraith', 1);
events.battle('mountains/emu', 1);
events.groundItem(ITEM.Feather);
events.groundItem(ITEM.Stone, 0.5);
events.battleRubble(ITEM.Arrow, 0.2);
events.battleRubble(ITEM.Bone, 0.2);
events.text('The path is thin, the climb is steep. You feel sweat running down your forehead and your back as you struggle to continue your path.');
events.text('The peaks in front of you seem to be piercing through the skies. You can distinguish, close to the highest point, a shining spot in the facade of the rock. Seems like a door. It\'s probably your goal!');
events.byConstructor("B_Skeleton", 1);

events.set_zone(425,1875,750,700);
events.set_tries(50, 50);
events.fill_by_retry();











CURRENTLEVEL.initialize_with_character(425, 1350);
