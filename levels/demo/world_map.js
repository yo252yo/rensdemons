
AUDIO.music.levels.map();
INTERFACE.make_compass();
var gen = new Generator(DICTIONARY.get("world_seed")*7);



var h = 600;
var w = 600;
new S_Floor(1050, 1000+h, w, h-50, 'obj_dark');

new SM_Town(1300, 1400, "demo/town", "town_1");


var brave = function() {
  if(STATS.flag("_demo_died")){
    new CenteredTextMenu("Will you break the rule?",
                  [
                    {"text": "Yes", "effect": function(){ CURRENTLEVEL.setup("demo/mountain"); }},
                    {"text": "No", "effect": "##CLOSE"},
                 ]
               );
 }
}

var m = new SM_Mountain(1450, 1200, gen.get(), `Holy mountain`);
m.interaction = function() {
  TextBannerSequence.make(
    ["This is the holy mountain where the Goddess protecting $$town_1$ reside.", "You are not supposed to go there."]
    , brave);
}

var FMap = new Filler(gen.get(), 100, 100);
FMap.set_zone(1050, 1000+h, w, h-50);
FMap.set_tries(3, 10);
FMap.add_default_constructor("SM_Trees");
FMap.fill_floor_by_retry();

var FEasyEvents = new EventFiller(gen.get(), 25, 25, 'obj_light');
FEasyEvents.battle('world/ghost', 1.7);
FEasyEvents.battle('forests/flower', 1.7);
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
FEasyEvents.byConstructor("EB_Pebbles", 0.5);
FEasyEvents.byConstructor("EB_Plants", 0.5);
FEasyEvents.byConstructor("EB_Skeleton", 1);

FEasyEvents.text(`You find a puddle of a dark red liquid that you suppose to be blood. The forces of $$demon_lord$ met a few wandering humans here. There's no corpse to tell the tale of the battle, but maybe that in itself is telling enough.`);
FEasyEvents.text(`You stumble upon the remains of a camp. The fire has been put out pretty recently. Judging by how messy the place is, this was probably not done by humans. Maybe you should hurry along...`);
FEasyEvents.text(`There is a vast area where the grass turns to bare charred ground. The armies of $$demon_lord$ are not only after humans, they seem determined to ransack all of $$world_name$ and destroy all life.`);
FEasyEvents.text(`You see in the distance a battalion of the evil monsters brought to this world by $$demon_lord$. They seem way too numerous and organized for you to stand any chance against them. You opt to hide in nearby bushes and wait it out until they leave. Fortunately, they seem to not notice you.`);

FEasyEvents.set_zone_from_filler(FMap);
FEasyEvents.set_tries(15, 30);
FEasyEvents.fill_floor_by_retry();





CURRENTLEVEL.initialize_with_character(1300, 1400, 0.6);
SAVE.autosave();
