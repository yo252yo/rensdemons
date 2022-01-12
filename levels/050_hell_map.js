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
var f = new S_MapFloor(1050, 1000+h, w, h-50, 'void');

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

FMap.add_default_constructor("SM_Worm", 1.5);
FMap.add_default_constructor("SM_Fang");
FMap.add_default_constructor("SM_Tenta", 2);

FMap.set_tries(70, 100);
FMap.fill_floor_by_retry();


// ===================
//hack 5. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================



var FEvents = new EventFiller(FMap, 25, 25, 'obj_light');
FEvents.battle('hell/centipede', 1.9);
FEvents.battle('hell/devilfly', 1.3);
FEvents.battle('hell/eyeball', 1.9);
FEvents.battle('hell/hecatoncheir', 1.9);
FEvents.battle('hell/sandworm', 1.7);
FEvents.battle('hell/satyr', 0.5);
FEvents.battle('hell/serpentine', 1.5);
FEvents.battle('hell/toad', 1);
FEvents.battle('hell/warlock', 1.3);

FEvents.battleRubble(ITEM.Elixir_venom, 0.1);
FEvents.battleRubble(ITEM.Elixir_decay, 0.1);
FEvents.battleRubble(ITEM.Elixir_chaos, 0.1);
FEvents.groundItem(ITEM.Bone, 0.6);
FEvents.groundItem(ITEM.Goo, 0.6);
FEvents.groundItem(ITEM.Eye, 0.6);
FEvents.groundItem(ITEM.Meat, 0.6);

FEvents.byConstructor("EB_Skeleton", 0.1);

FEvents.text(`Around you, the arid region extends in all directions. Perspectives play tricks on your mind, shapes shift and move on the horizon. It's very hard to keep your sense of orientation in a world filled with ungodly magic...`, 0.9);
FEvents.text(`You can't help but scream as your foot burrows in a patch of loose sand. You lose your footing and fall to the ground. Insects start to crawl onto you. Fortunately, you manage to get back up and push them away easily.`, 0.9);
FEvents.text(`You can distinguish in the distance what is probably $$demon_lord$'s castle. It sits in the middle of the desert on top of a hill. Its many obsidian towers seem to tear through the sky. It's surrounded by a flurry of lightning bolts, but the sky is wide open...`, 0.9);
FEvents.text(`You gaze at the sky of this other universe. Unlike yours, it's perfectly clear: no star or cloud to be seen. It's simply radiating an overwhelming flat light that slowly but surely burns up deeper and deeper into your skin.`, 0.9);
FEvents.text(`You take cover between the odd trees when a swarm of flying demons approaches in your direction. You cannot face a whole army by yourself. You wait patiently for them to go away, praying that they have not noticed you.`, 0.9);
FEvents.text(`You find what appears clearly to be human bones half burrowed in the dry ground. Did an unfortunate adventurer loose its way? Was there another Promised Child in the past? Or did a demon simply take its food back home?`, 0.9);

FEvents.set_tries(100, 150);
FEvents.fill_floor_by_retry();




// ===================
//hack 7. START/INIT
// ===================


if(! ABILITIES.has_ability("_secret_ending_chosen")){
  heaven.destroy();
}

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
//SAVE.autosave();
