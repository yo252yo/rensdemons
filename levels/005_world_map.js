
AUDIO.music.map();

INTERFACE.make_compass();

new S_Floor(50, 2050, 1000, 2000, 'obj_dark');

// First make the towns
new SM_Town(250, 1750, "004_town1", "town_1");
new SM_Town(550, 550, "006_town2", "town_2");


// do not keep, just a test
new SM_Town(750, 750, "004_town1", "town_3", function() { return false;});
new SM_Town(950, 950, "004_town1", "town_4", function() { return false;});
new SM_Town(1150, 1150, "004_town1", "town_5", function() { return false;});

var seed = DICTIONARY.get("world_map_seed");
var gen = new Generator(seed);
var mapFiller = new Filler(gen);
mapFiller.set_zone(50, 2050, 1000, 2000);

for(var i = 0; i < 3; i++) {
  mapFiller.set_tries(1, 8);
  mapFiller.set_object(100, 100, function(x,y,g){ return new SM_Trees(x, y, g);});
  mapFiller.fill_by_retry();

  mapFiller.set_tries(1, 5);
  mapFiller.set_object(300, 200, function(x,y,g){ return new SM_Lake(x, y, g);});
  mapFiller.fill_by_retry();

  mapFiller.set_tries(1, 5);
  mapFiller.set_object(300, 150, function(x,y,g){ return new SM_Mountain(x, y, g);});
  mapFiller.fill_by_retry();
}
// Place hills after as they are walkable
mapFiller.set_tries(3, 10);
mapFiller.set_object(200, 100, function(x,y,g){ return new SM_Hills(x, y, g);});
mapFiller.fill_by_retry();

CURRENTLEVEL.initialize_with_character(280, 1760, 0.6);
