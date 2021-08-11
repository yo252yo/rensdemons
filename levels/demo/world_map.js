
AUDIO.music.interface.map();
INTERFACE.make_compass();
var gen = new Generator(DICTIONARY.get("world_seed")*7);

var win = function(){
  CURRENTLEVEL.setup("demo/end");
}



var h = 600;
var w = 600;
new S_Floor(50, h, w, h-50, 'obj_dark');

new SM_Town(300, 400, "demo/town", "town_1");


var brave = function() {
  if(STATS.flag("_demo_died")){
    new CenteredTextMenu("Will you break the most important rule of this world?",
                  [
                    {"text": "Yes", "effect": function(){ CURRENTLEVEL.setup("demo/mountain"); }},
                    {"text": "No", "effect": "##CLOSE"},
                 ]
               );
 }
}

var m = new SM_Mountain(450, 200, gen.get(), `Holy mountain`);
m.interaction = function() {
  TextBannerSequence.make(
    ["This is the holy mountain where the gods protecting $$town_1$ reside. No mortal is allowed to enter."]
    , brave);
}

var FMap = new Filler(gen);
FMap.set_zone(50, h, w, h-50);
FMap.set_tries(3, 10);
FMap.set_object(100, 100, function(x,y,g){ return new SM_Trees(x, y, g.get());});
FMap.fill_by_retry();

var FEasyEvents = new EventFiller(FMap, 25, 25, 'obj_light');
FEasyEvents.battle('world/ghost', 1.7);
FEasyEvents.battle('forest/flower', 1.7);
FEasyEvents.battle('world/mummy', 1.7);
FEasyEvents.battle('mountains/harpy', 1.7);
FEasyEvents.battle('world/wraith', 1.7);
FEasyEvents.battleRubble(ITEM.Poison_darts, 0.1);
FEasyEvents.battleRubble(ITEM.Dagger, 0.1);
FEasyEvents.battleRubble(ITEM.Elixir_ice, 0.1);
FEasyEvents.battleRubble(ITEM.Linnens, 0.7);
FEasyEvents.groundItem(ITEM.Bone, 0.8);
FEasyEvents.groundItem(ITEM.Stone, 0.8);
FEasyEvents.groundItem(ITEM.Berry, 0.8);
FEasyEvents.byConstructor("B_Pebbles", 0.5);
FEasyEvents.byConstructor("B_Plants", 0.5);
FEasyEvents.byConstructor("B_Skeleton", 1);

FEasyEvents.text(`You find a puddle of a dark red liquid that you suppose to be blood. The forces of $$demon_lord$ met a few wandering humans here. There's no corpse to tell the tale of the battle, but maybe that in itself is telling enough.`);
FEasyEvents.text(`You stumble upon the remains of a camp. The fire has been put out pretty recently. Judging by how messy the place is, this was probably not done by humans. Maybe you should hurry along...`);
FEasyEvents.text(`There is a vast area where the grass turns to bare charred ground. The armies of $$demon_lord$ are not only after humans, they seem determined to ransack all of $$world_name$ and destroy all life.`);
FEasyEvents.text(`You see in the distance a battalion of the evil monsters brought to this world by $$demon_lord$. They seem way too numerous and organized for you to stand any chance against them. You opt to hide in nearby bushes and wait it out until they leave. Fortunately, they seem to not notice you.`);

FEasyEvents.set_zone_from_filler(FMap);
FEasyEvents.set_tries(15, 30);
FEasyEvents.fill_by_retry();





CURRENTLEVEL.initialize_with_character(300, 250, 0.6);
SAVE.autosave();
