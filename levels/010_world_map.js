// ===================
//hack INITIALIZATION
// ===================
AUDIO.music.interface.map();
INTERFACE.make_compass();
var gen = new Generator(DICTIONARY.get("world_map_seed"));

var after_t2 = function() { return ABILITIES.has_ability("_town2_visited");};
var LaterInStory = function() { return false;};

// ===================
//hack FIXED ELEMENTS (zones)
// ===================

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


// ===================
//hack FIXED ELEMENTS (story)
// ===================

// First make the towns
new SM_Town(250, 1750, "005_town1", "town_1");
new SM_Town(850, 550, "020_town2", "town_2");
new SM_Town(2300, 1275, "030_town3", "town_3", LaterInStory);
new SM_Town(2725, 300, "021_town4", "town_4", after_t2); // optional
new SM_Town(1450, 2500, "022_town5", "town_5", after_t2); // optional

// Scenario elements
new SM_Forest(1675, 350, `Forest of the<br />${DICTIONARY.get("mushroom_adj")} Mushrooms`, "023_mushrooms", after_t2);
new SM_Lake(250, 200, new Generator(1), `Waters of the<br />${DICTIONARY.get("squid_adj")} Squids`, "024_squids", after_t2);
new SM_Mountain(1300, 1025, gen, `Peaks of the<br />${DICTIONARY.get("harpies_adj")} Harpies`, "025_harpies", after_t2);
new SM_Crevasse(1700, 2025, `Forgotten Fissure`, "032_fissure", LaterInStory);
new SM_Vulcano(2650, 1800, `Maw of Hell`, "031_hellsmaw", LaterInStory);

// ===================
//hack GENERATED ELEMENTS (new places)
// ===================

FEasyS.set_guaranteed(1);
FEasyS.set_object(100, 100, function(x,y,g){
  return new SM_Trees(x, y, g.get(), "", "011_han_grove");
});
FEasyS.fill_by_retry();


FHardSW.set_guaranteed(1);
FHardSW.set_object(300, 250, function(x,y,g){
  return new SM_Forest(x, y, `Woods of the<br />${DICTIONARY.get("trees_adj")} Trees`, "012_trees", LaterInStory);
});
FHardSW.fill_by_retry();


FHardNE.set_guaranteed(1);
FHardNE.set_object(250, 150, function(x,y,g){
  return new SM_Lake(x, y, g.get(), `Sea of the<br />${DICTIONARY.get("sirens_adj")} Sirens`, "013_sirens", LaterInStory);
});
FHardNE.fill_by_retry();


FHardMain.set_guaranteed(1);
FHardMain.set_object(250, 150, function(x,y,g){
  return new SM_Mountain(x, y, g.get(), `Mounts of the<br />${DICTIONARY.get("hawk_adj")} Hawks`, "014_hawks", LaterInStory);
});
FHardMain.fill_by_retry();

FHardMain.set_guaranteed(1);
FHardMain.set_object(100, 50, function(x,y,g){
  return new SM_Cave(x, y, `Cave of the<br />${DICTIONARY.get("slimes_adj")} Slimes`, "015_slimes", LaterInStory);
});
FHardMain.fill_by_retry();


// ===================
//hack GENERATED ELEMENTS (decor)
// ===================

// could be non uniform
for(var i = 0; i < 3; i++) {
  FMap.set_tries(3, 25);
  FMap.set_object(100, 100, function(x,y,g){ return new SM_Trees(x, y, g.get());});
  FMap.fill_by_retry();

  FMap.set_tries(3, 15);
  FMap.set_object(300, 200, function(x,y,g){ return new SM_Lake(x, y, g.get());});
  FMap.fill_by_retry();

  FMap.set_tries(3, 15);
  FMap.set_object(300, 150, function(x,y,g){ return new SM_Mountain(x, y, g.get());});
  FMap.fill_by_retry();
}
// Place hills after as they are walkable
FMap.set_tries(10, 40);
FMap.set_object(200, 100, function(x,y,g){ return new SM_Hills(x, y, g.get());});
FMap.fill_by_retry();


// ===================
//hack TEMPORARY ELEMENTS (encounters)
// ===================

var FEasyEvents = new EventFiller(FMap, 25, 25, 'obj_light');
FEasyEvents.battle('world/ghost', 1.7);
FEasyEvents.battle('world/goblin', 1.7);
FEasyEvents.battle('world/mummy', 1.7);
FEasyEvents.battle('world/skeleton', 1.7);
FEasyEvents.battle('world/wraith', 1.7);
FEasyEvents.battleRubble(ITEM.Poison_darts, 0.05);
FEasyEvents.battleRubble(ITEM.Dagger, 0.05);
FEasyEvents.battleRubble(ITEM.Elixir_ice, 0.05);
FEasyEvents.battleRubble(ITEM.Linnens, 0.2);
FEasyEvents.groundItem(ITEM.Bone, 0.2);
FEasyEvents.groundItem(ITEM.Stone, 0.2);
FEasyEvents.groundItem(ITEM.Berry, 0.2);

FEasyEvents.text(`You find a puddle of a dark red liquid that you suppose to be blood. The forces of $$demon_lord$ met a few wandering humans here. There's no corpse to tell the tale of the battle, but maybe that in itself is telling enough.`);
FEasyEvents.text(`You stumble upon the remains of a camp. The fire has been put out pretty recently. Judging by how messy the place is, this was probably not done by humans. Maybe you should hurry along...`);
FEasyEvents.text(`There is a vast area where the grass turns to bare charred ground. The armies of $$demon_lord$ are not only after humans, they seem determined to ransack all of $$world_name$ and destroy all life.`);
FEasyEvents.text(`You see in the distance a battalion of the evil monsters brought to this world by $$demon_lord$. They seem way too numerous and organized for you to stand any chance against them. You opt to hide in nearby bushes and wait it out until they leave. Fortunately, they seem to not notice you.`);

FEasyEvents.set_zone_from_filler(FEasyS);
FEasyEvents.set_tries(10, 20);
FEasyEvents.fill_by_retry();

FEasyEvents.set_zone_from_filler(FEasyN);
FEasyEvents.set_tries(30, 50);
FEasyEvents.fill_by_retry();


// ===================
//hack START
// ===================

CURRENTLEVEL.initialize_with_character(280, 1760, 0.6);
