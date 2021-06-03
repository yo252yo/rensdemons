
AUDIO.music.map();

INTERFACE.make_compass();

var seed = DICTIONARY.get("world_map_seed");
var gen = new Generator(seed);

var after_t2 = function() { return ABILITIES.has_ability("_town2_visited");};
var todo = function() { return false;};

// Zones

var h = 2550;
var w = 2950;
new S_Floor(50, h, w, h-50, 'obj_dark');

var FMap = new Filler(gen);
FMap.set_zone(75, h-25, w-50, h-100);
//FMap.draw_for_debug('#FFFFFF')

// Easy zone:
var FEasyN = new Filler(gen);
FEasyN.set_zone(75, 1050, 2050, 975);
//FEasyN.draw_for_debug('#0000FF')
var FEasyS = new Filler(gen);
FEasyS.set_zone(75, 1950, 1050, 1950 - 1050);
//FEasyS.draw_for_debug('#00FF00')

// Hard zone:
var FHardSW = new Filler(gen);
FHardSW.set_zone(75,h-25,1050,h-1950-25);
//FHardSW.draw_for_debug('#FFFF00')
var FHardNE = new Filler(gen);
FHardNE.set_zone(2075+50, 1050, w-2050-50, 975);
//FHardNE.draw_for_debug('#FF00FF')
var FHardMain = new Filler(gen);
FHardMain.set_zone(1075+50, h-25, w-1050-50, h-1050-25);
//FHardMain.draw_for_debug('#FF0000')



// First make the towns
new SM_Town(250, 1750, "005_town1", "town_1");
new SM_Town(850, 550, "020_town2", "town_2");
// to do
new SM_Town(2300, 1275, "_town3", "town_3", todo);
new SM_Town(2725, 300, "021_town4", "town_4", after_t2); // optional
new SM_Town(1450, 2500, "022_town5", "town_5", after_t2); // optional

// Scenario elements
new SM_Forest(1675, 350, `Forest of the<br />${DICTIONARY.get("mushroom_adj")} Mushrooms`, "todo", after_t2);
new SM_Lake(250, 200, gen, `Waters of the<br />${DICTIONARY.get("squid_adj")} Squids`, "todo", after_t2);
new SM_Mountain(1300, 1025, gen, `Peaks of the<br />${DICTIONARY.get("harpies_adj")} Harpies`, "todo", after_t2);
new SM_Crevasse(1700, 2025, `Forgotten Fissure`, "todo", todo);
new SM_Vulcano(2650, 1800, `Maw of Hell`, "todo", todo);


FEasyS.set_guaranteed(1);
FEasyS.set_object(100, 100, function(x,y,g){
  return new SM_Trees(x, y, g, "", "011_han_grove");
});
FEasyS.fill_by_retry();


FHardSW.set_guaranteed(1);
FHardSW.set_object(300, 250, function(x,y,g){
  return new SM_Forest(x, y, `Woods of the<br />${DICTIONARY.get("trees_adj")} Trees`, "todo");
});
FHardSW.fill_by_retry();


FHardNE.set_guaranteed(1);
FHardNE.set_object(250, 150, function(x,y,g){
  return new SM_Lake(x, y, g, `Sea of the<br />${DICTIONARY.get("sirens_adj")} Sirens`, "todo");
});
FHardNE.fill_by_retry();


FHardMain.set_guaranteed(1);
FHardMain.set_object(250, 150, function(x,y,g){
  return new SM_Mountain(x, y, g, `Mounts of the<br />${DICTIONARY.get("hawk_adj")} Hawks`, "todo");
});
FHardMain.fill_by_retry();

FHardMain.set_guaranteed(1);
FHardMain.set_object(100, 50, function(x,y,g){
  return new SM_Cave(x, y, `Cave of the<br />${DICTIONARY.get("slimes_adj")} Slimes`, "todo");
});
FHardMain.fill_by_retry();
/*


FHardMain
new SM_Forest(1675, 350, `Forest of the<br />${DICTIONARY.get("forest_adj")} Mushrooms`, "todo", after_t2);
new SM_Lake(250, 200, gen, `Waters of the<br />${DICTIONARY.get("sea_adj")} Squids`, "todo", after_t2);
new SM_Mountain(1300, 1025, gen, `Peaks of the<br />${DICTIONARY.get("mountain_adj")} Harpies`, "todo", after_t2);
//new SM_Cave(1675, 350, `Forest of the<br />${DICTIONARY.get("forest_adj")} Mushrooms`, "todo", after_t2);
*/


// could be non uniform
for(var i = 0; i < 3; i++) {
  FMap.set_tries(3, 25);
  FMap.set_object(100, 100, function(x,y,g){ return new SM_Trees(x, y, g);});
  FMap.fill_by_retry();

  FMap.set_tries(3, 15);
  FMap.set_object(300, 200, function(x,y,g){ return new SM_Lake(x, y, g);});
  FMap.fill_by_retry();

  FMap.set_tries(3, 15);
  FMap.set_object(300, 150, function(x,y,g){ return new SM_Mountain(x, y, g);});
  FMap.fill_by_retry();
}
// Place hills after as they are walkable
FMap.set_tries(10, 40);
FMap.set_object(200, 100, function(x,y,g){ return new SM_Hills(x, y, g);});
FMap.fill_by_retry();

CURRENTLEVEL.initialize_with_character(280, 1760, 0.6);
