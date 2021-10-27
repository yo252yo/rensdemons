// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.hell();
INTERFACE.make_compass();
var gen = new Generator(DICTIONARY.get("world_seed")*23);

// ===================
//hack 1. FLOORS
// ===================
var h = 1550;
var w = 1950;
var f = new S_Floor(1050, 1000+h, w, h-50, 'void');

f.visual_element.html_rectangle.style.border = "1px dotted #00000022";

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new SM_HellVulcano(2500, 2200);

new SM_Pandemonium(1400,1625, `Pandemonium`);
var heaven = new SM_Heaven(1400,1200, `Heaven`);


new SM_Altar(1100, 1125, ITEMS_ARCHETYPES_NAMES.Alchemy);
new SM_Altar(1175, 1550, ABILITIES_ARCHETYPES_NAMES.Diplomat);
new SM_Altar(1375, 1950, ITEMS_ARCHETYPES_NAMES.Tool);
new SM_Altar(1725, 1950, ABILITIES_ARCHETYPES_NAMES.Element);
new SM_Altar(1925, 1550, ITEMS_ARCHETYPES_NAMES.Weapon);
new SM_Altar(2050, 1125, ABILITIES_ARCHETYPES_NAMES.Spirit);

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var filler = new Filler(gen.get());
var FMap = new MultiFiller(filler, 80, 80);
FMap.set_zone(1075, 1000+h-25, w-50, h-100);

FMap.add_constructor( function(x,y,seed){ return new SM_Creep(x, y, seed); }, 1.5);
FMap.add_constructor( function(x,y,seed){ return new SM_Fang(x, y, seed); });
FMap.add_constructor( function(x,y,seed){ return new SM_Tenta(x, y, seed); }, 2);

FMap.set_tries(70, 100);
FMap.fill_floor_by_retry();


// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================



var FEvents = new EventFiller(FMap, 25, 25, 'obj_light');
FEvents.battle('hell/centipede', 1.7);
FEvents.battle('hell/devilfly', 1.2);
FEvents.battle('hell/eyeball', 1.7);
FEvents.battle('hell/hecatoncheir', 1.7);
FEvents.battle('hell/sandworm', 1.5);
FEvents.battle('hell/satyr', 1.7);
FEvents.battle('hell/serpentine', 1.2);
FEvents.battle('hell/toad', 1.2);
FEvents.battle('hell/warlock', 1.2);
/*


FEvents.battleRubble(ITEM.Poison_darts, 0.1);
FEvents.battleRubble(ITEM.Dagger, 0.1);
FEvents.battleRubble(ITEM.Elixir_ice, 0.1);
FEvents.battleRubble(ITEM.Linnens, 0.7);
FEvents.groundItem(ITEM.Bone, 0.6);
FEvents.groundItem(ITEM.Stone, 0.6);
FEvents.groundItem(ITEM.Berry, 0.6);
FEvents.groundItem(ITEM.Mushroom, 0.6);

FEvents.byConstructor("B_Pebbles", 0.5);
FEvents.byConstructor("B_Plants", 0.5);
FEvents.byConstructor("B_Skeleton", 1);
FEvents.battle('world/ruins', 1);

FEvents.text(`You find a puddle of a dark red liquid that you suppose to be blood. The forces of $$demon_lord$ met a few wandering humans here. There's no corpse to tell the tale of the battle, but maybe that in itself is telling enough.`);
FEvents.text(`You stumble upon the remains of a camp. The fire has been put out pretty recently. Judging by how messy the place is, this was probably not done by humans. Maybe you should hurry along...`);
FEvents.text(`There is a vast area where the grass turns to bare charred ground. The armies of $$demon_lord$ are not only after humans, they seem determined to ransack all of $$world_name$ and destroy all life.`);
FEvents.text(`You see in the distance a battalion of the evil monsters brought to this world by $$demon_lord$. They seem way too numerous and organized for you to stand any chance against them. You opt to hide in nearby bushes and wait it out until they leave. Fortunately, they seem to not notice you.`);
*/
//FEvents.set_zone_from_filler(FEasyN);
FEvents.set_tries(100, 150);
FEvents.fill_floor_by_retry();








// ===================
//hack 7. START/INIT
// ===================


heaven.destroy();

CURRENTLEVEL.start_function = function() {
  var callback = function(){
    SAVE.autosave();
    IO.control.character();
  }
  TextBannerSequence.make([
    `When you exit the vulcano, you find yourself in a different world. Your trip in the mountains indeed brought you to another dimension, probably the one where the demons originated.`,
    `Maybe the loss of $$BestFriend$ numbed your soul, or maybe the Goddess prepared you for this on some level, but you do not seem surprised or scared by the new landscape that expands in front of your eyes.`,
    "A dry wasteland extends as far as your eye can see. The fauna and flora are unlike anything you've ever seen before. The atmosphere seems thicker, somehow. The ground is dry and colorful. You have no doubt that every creature in this place is deadly. The overpowering heat make breathing hard.",
    "But those hardship do not phase you. You're here for one purpose only, and your resolve is strong. You're going to find $$demon_lord$.",
  ], callback);
};

CURRENTLEVEL.initialize_with_character(2475, 2225, 0.6);

// ===================
//hack 8. AUTOSAVE
// ===================
SAVE.autosave();
