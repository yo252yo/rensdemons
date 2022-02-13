// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.interface.map();
INTERFACE.make_compass();
var gen = new Generator(DICTIONARY.get("world_seed")*7);

var after_going_to_town2 = function() { return ABILITIES.has_ability("_town2_visited");};
var after_town2_sends_you_to_town3 = function() { return ABILITIES.has_ability("_town3_prompted") || STATS.flag("StoryOfTheAncients");};

// ===================
//hack 1. FLOORS
// ===================

var h = 2550;
var w = 2950;
var f = new S_MapFloor(1050, 1000+h, w, h-50, 'obj_dark');
f.visual_element.html_rectangle.style.border = "1px dotted #FFFFFF22";

var FMap = new Filler(gen.get(), 300, 200);
FMap.set_zone(1075, 1000+h-25, w-50, h-100);
//FMap.draw_for_debug('#FFFFFF')

// Easy zone:
var FEasyN = new Filler(gen.get());
FEasyN.set_zone(1075, 2050, 2050, 975);
//FEasyN.draw_for_debug('#0000FF')
var FEasyS = new Filler(gen.get());
FEasyS.set_zone(1075, 2950, 1050, 1950 - 1050);
//FEasyS.draw_for_debug('#00FF00')

// Hard zone:
var FHardSW = new Filler(gen.get());
FHardSW.set_zone(1075,1000+h-25,1050,h-1950-25);
//FHardSW.draw_for_debug('#FFFF00')
var FHardNE = new Filler(gen.get());
FHardNE.set_zone(3075+50, 2050, w-2050-50, 975);
//FHardNE.draw_for_debug('#FF00FF')
var FHardMain = new Filler(gen.get());
FHardMain.set_zone(2075+50, 1000+h-25, w-1050-50, h-1050-25);
//FHardMain.draw_for_debug('#FF0000')


// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

new SM_Town(1250, 2750, "005_town1", "town_1");
if (INVENTORY.has_ancient_armament() && !ABILITIES.has_ability("_town2_saved")){
  new SM_Town(1850, 1550, "030_town2_ruins", "town_2");
} else {
  new SM_Town(1850, 1550, "020_town2", "town_2");
}
new SM_Town(3300, 2275, "040_town3", "town_3", after_town2_sends_you_to_town3);

new SM_Town(3725, 1300, "021_town4", "town_4", after_going_to_town2); // optional
new SM_Town(2450, 3500, "022_town5", "town_5", after_going_to_town2); // optional

new SM_Forest(2675, 1350, `Forest of the<br />${DICTIONARY.get("mushroom_adj")} Mushrooms`, "023_mushrooms", after_going_to_town2);
new SM_Lake(1250, 1200, new Generator(1), `Waters of the<br />${DICTIONARY.get("squid_adj")} Squids`, "024_squids", after_going_to_town2);
new SM_Mountain(2300, 2025, gen.get(), `Peaks of the<br />${DICTIONARY.get("harpies_adj")} Harpies`, "025_harpies", after_going_to_town2);
new SM_Crevasse(2700, 3025, `Forgotten Fissure`, "042_fissure", after_town2_sends_you_to_town3);


var v = new SM_Vulcano(3650, 2800, `Maw of Hell`, "041_hellsmaw", after_town2_sends_you_to_town3);
v.interaction = function() {
  if(STATS.flag("KilledBestFriend")){
    new CenteredTextMenu("Are you sure you want to go? You know that an unescapable tragic fate awaits you...",
                  [
                    {"text": "Yes", "effect": function(){ CURRENTLEVEL.setup("041_hellsmaw"); }},
                    {"text": "No", "effect": "##CLOSE"},
                 ]
               );
  } else if(after_town2_sends_you_to_town3()){
    CURRENTLEVEL.setup("041_hellsmaw");
  } else{
    new TextBanner("The gates of hell are spewing a thick black fog on the land of the living. The Goddess strongly impresses in your mind that you are not prepared for what is to come. In Her infinite wisdom, She knows that this is not where are meant to be for now.");
  }
}



// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

//hack landmarks
FEasyS.set_guaranteed(1);
FEasyS.add_constructor(function(x,y,seed){
  return new SM_Trees(x, y, seed, "", "011_han_grove");
}, 1, 100, 100);
FEasyS.fill_floor_by_retry();


FHardSW.set_guaranteed(1);
FHardSW.add_constructor(function(x,y,seed){
  return new SM_Forest(x, y, `Woods of the<br />${DICTIONARY.get("trees_adj")} Trees`, "012_trees");
}, 1, 300, 250);
FHardSW.fill_floor_by_retry();


FHardNE.set_guaranteed(1);
FHardNE.add_constructor(function(x,y,seed){
  return new SM_Lake(x, y, seed, `Sea of the<br />${DICTIONARY.get("sirens_adj")} Sirens`, "013_sirens");
}, 1, 250, 150);
FHardNE.fill_floor_by_retry();


FHardMain.set_guaranteed(1);
FHardMain.add_constructor(function(x,y,seed){
  return new SM_Mountain(x, y, seed, `Mounts of the<br />${DICTIONARY.get("hawk_adj")} Hawks`, "014_hawks");
}, 1, 250, 150);
FHardMain.fill_floor_by_retry();

FHardMain.set_guaranteed(1);
FHardMain.add_constructor(function(x,y,seed){
  return new SM_Cave(x, y, `Cave of the<br />${DICTIONARY.get("slimes_adj")} Slimes`, "015_slimes");
},1 ,100, 50);
FHardMain.fill_floor_by_retry();

FMap.add_default_constructor("SM_Trees", 2, 100, 100);
FMap.add_default_constructor("SM_Lake", 1.5, 300, 200);
FMap.add_default_constructor("SM_Mountain", 1, 300, 150);
FMap.set_tries(40, 100);
FMap.fill_floor_by_retry();
// Place hills after as they are walkable
FMap.set_tries(10, 40);
FMap.clear();
FMap.add_default_constructor("SM_Hills");
FMap.fill_floor_by_retry();

// ===================
//hack 5. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

var FEasyEvents = new EventFiller(FMap, 25, 25, 'obj_light');
FEasyEvents.battle('world/ghost', 1.7);
FEasyEvents.battle('world/goblin', 1.7);
FEasyEvents.battle('world/mummy', 1.7);
FEasyEvents.battle('world/skeleton', 1.7);
FEasyEvents.battle('world/wraith', 0.8);

FEasyEvents.battleRubble(ITEM.Poison_darts, 0.1);
FEasyEvents.battleRubble(ITEM.Dagger, 0.1);
FEasyEvents.battleRubble(ITEM.Elixir_ice, 0.1);
FEasyEvents.battleRubble(ITEM.Linnens, 0.7);
FEasyEvents.groundItem(ITEM.Bone, 0.6);
FEasyEvents.groundItem(ITEM.Stone, 1.5);
FEasyEvents.groundItem(ITEM.Berry, 0.6);
FEasyEvents.groundItem(ITEM.Mushroom, 1.5);

FEasyEvents.byConstructor("EB_Plants", 0.5);
FEasyEvents.byConstructor("EB_Skeleton", 0.1);
FEasyEvents.battle('encounters/ruins', 1);

FEasyEvents.text(`You find a puddle of a dark red liquid that you suppose to be blood. The forces of $$demon_lord$ met a few wandering humans here. There's no corpse to tell the tale of the battle, but maybe that in itself is telling enough.`);
FEasyEvents.text(`You stumble upon the remains of a camp. The fire has been put out pretty recently. Judging by how messy the place is, this was probably not done by humans. Maybe you should hurry along...`);
FEasyEvents.text(`There is a vast area where the grass turns to bare charred ground. The armies of $$demon_lord$ are not only after humans, they seem determined to ransack all of $$world_name$ and destroy all life.`);
FEasyEvents.text(`You see in the distance a battalion of the evil monsters brought to this world by $$demon_lord$. They seem way too numerous and organized for you to stand any chance against them. You opt to hide in nearby bushes and wait it out until they leave. Fortunately, they seem to not notice you.`);
FEasyEvents.add_shared_events(2);

FEasyEvents.set_zone_from_filler(FEasyS);
FEasyEvents.set_tries(10, 25);
FEasyEvents.fill_floor_by_retry();

FEasyEvents.set_zone_from_filler(FEasyN);
FEasyEvents.set_tries(30, 60);
FEasyEvents.fill_floor_by_retry();



var FHardEvents = new EventFiller(FMap, 25, 25, 'obj_light');
FHardEvents.battle('world/arsonist', 2);
FHardEvents.battle('world/bruiser', 2);
FHardEvents.battle('world/butcher', 2);
FHardEvents.battle('world/djinn', 2);
FHardEvents.battle('world/grizzly', 2);
FHardEvents.battle('world/knight', 2);
FHardEvents.battle('world/mammoth', 2);
FHardEvents.battle('world/vadhaka', 0.7);


FHardEvents.battleRubble(ITEM.Arrow, 0.3);
FHardEvents.battleRubble(ITEM.Mace, 0.1);
FHardEvents.battleRubble(ITEM.Shield, 0.05);
FHardEvents.battleRubble(ITEM.Elixir_vine, 0.1);
FHardEvents.battleRubble(ITEM.Elixir_venom, 0.05);
FEasyEvents.battleRubble(ITEM.Stone, 0.2);
FHardEvents.groundItem(ITEM.AncientRubbles, 0.7);
FHardEvents.groundItem(ITEM.Feather, 0.7);
FHardEvents.groundItem(ITEM.Flower, 0.7);
FHardEvents.groundItem(ITEM.Bone, 0.7);

FHardEvents.byConstructor("EB_Skeleton", 2.5);
FHardEvents.battle('encounters/traveler', 2);
FHardEvents.battle('encounters/ruins', 1);

FHardEvents.text(`You stop your progression: you can see in the distance a pack of feral beasts. As you observe them carefully, you notice that they seem to be tearing to shreds the corpses of a few innocent travelers, throwing around the meat as if making a game out of it. Their fur is drenched in the blood of their unfortunate victims. Crouched on the floor, your heart beating fast, you wait for them to finish their meal, praying that you don't get noticed.`);
FHardEvents.text(`The sound of metal alerts you of the movement of enemy troops in the distance. You barely have time to find shelter in a bush. A group of several heavily armored demons are patrolling the steppes at a fast pace. The sun makes the dark metal of their foreign armor shine softly.`);
FHardEvents.text(`You see a fellow human on the distance. As soon as he notices you, he immediately adopts a battle stance. In these wild lands, noone can be trusted. To demonstrate your good faith, you decide to keep the distance and move away from the poor fellow. It will probably be a while after you're out of sight for him to let his guard down.`);
FHardEvents.text(`You arrive in a desolate area. The grass has been completely burnt to ashes. The ground is blackened and arid. Broken bones are shattered all over. You silently make your way through, trying not to imagine the horrible things that took place here.`);
FHardEvents.text(`In the middle of a puddle of old blood that has long since dried up, you see a magnificent red flower blooming. It feels your heart with determination. There is hope and beauty in this world, and it can prevail over the destruction.`);
FHardEvents.add_shared_events(1);

FHardEvents.set_zone_from_filler(FHardSW);
FHardEvents.set_tries(8, 20);
FHardEvents.fill_floor_by_retry();

FHardEvents.set_zone_from_filler(FHardNE);
FHardEvents.set_tries(10, 40);
FHardEvents.fill_floor_by_retry();


FHardEvents.set_zone_from_filler(FHardMain);
FHardEvents.set_tries(60, 100);
FHardEvents.fill_floor_by_retry();


// ===================
//hack 7. START/INIT
// ===================
var foundAncientArmamentCondition = function(){
  return INVENTORY.has_ancient_armament && !ABILITIES.has_ability("_saw_ancient_armament_prompt");
}

CURRENTLEVEL.add_trigger("foundAncientArmament", foundAncientArmamentCondition, function() {
  ABILITIES.unlock("_saw_ancient_armament_prompt");
  TextBannerSequence.make([
    "$$BestFriend$: \"Hey $$Ren$, I'm no expert, but looking at the manual we found, I think we have everything we need to make this artifact work.\"",
    "$$Ren$: \"Do we?\"",
    "$$BestFriend$: \"Well there's nothing on the pictures except this weird armature and the ammunition we got in the lake.\"",
    "$$Ren$: \"So how does it work? Can you use it?\"",
    "$$BestFriend$: \"Wow, no, I can't decipher all these old runes. We need someone well versed in history. I suggest we go back to $$town_2$ and ask the priests.\"",
    "$$Ren$: \"I don't think I have a better proposal. We'll see on the way if the Goddess has a better way for us.\"",
    "$$Ren$: \"Let's go back to $$town_2$ then!\"",
  ], function(){ IO.control.character(); });
});


CURRENTLEVEL.initialize_with_character(1280, 2760, 0.6);

// ===================
//hack 8. AUTOSAVE
// ===================
SAVE.autosave();
