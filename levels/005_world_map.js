
AUDIO.music.map();

INTERFACE.make_compass();

new S_Floor(50, 2550, 3000, 2500, 'obj_dark');

// First make the towns
new SM_Town(250, 1750, "004_town1", "town_1");
new SM_Town(850, 550, "006_town2", "town_2");
// to do
new SM_Town(2300, 1275, "_town3", "town_3", function() { return false;});
new SM_Town(2725, 300, "007_town4", "town_4", function() { return ABILITIES.has_ability("_town2_visited");}); // optional
new SM_Town(1450, 2500, "007_town5", "town_5", function() { return ABILITIES.has_ability("_town2_visited");}); // optional


// Procedurally generated elements:
var seed = DICTIONARY.get("world_map_seed");
var gen = new Generator(seed);

// Special elements
var hanFiller = new Filler(gen);
hanFiller.set_zone(100, 1950, 600, 600);
hanFiller.set_guaranteed(1);
var hanTree = function(x,y,g){
  var t = new SM_Trees(x, y, g);
  t.interaction = function(){CURRENTLEVEL.setup("005_han_grove");}
  return t;
}
hanFiller.set_object(100, 100, hanTree);
hanFiller.fill_by_retry();







// The base map elements
var mapFiller = new Filler(gen);
mapFiller.set_zone(50, 2550, 3000, 2500);

// could be non uniform
for(var i = 0; i < 3; i++) {
  mapFiller.set_tries(3, 25);
  mapFiller.set_object(100, 100, function(x,y,g){ return new SM_Trees(x, y, g);});
  mapFiller.fill_by_retry();

  mapFiller.set_tries(3, 15);
  mapFiller.set_object(300, 200, function(x,y,g){ return new SM_Lake(x, y, g);});
  mapFiller.fill_by_retry();

  mapFiller.set_tries(3, 15);
  mapFiller.set_object(300, 150, function(x,y,g){ return new SM_Mountain(x, y, g);});
  mapFiller.fill_by_retry();
}
// Place hills after as they are walkable
mapFiller.set_tries(10, 40);
mapFiller.set_object(200, 100, function(x,y,g){ return new SM_Hills(x, y, g);});
mapFiller.fill_by_retry();

CURRENTLEVEL.initialize_with_character(280, 1760, 0.6);
