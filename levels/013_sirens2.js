// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.sirens();
var gen = new Generator(DICTIONARY.get("world_seed")*51);

// ===================
//hack 1. FLOORS
// ===================

new S_SandFloor(1075,2200,2375,1350);

// ===================
//hack 2. EXIT
// ===================
new S_ExitFloor(2150,2225,250,50, "010_world_map");


// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_SavePoint(2175, 1900, 100, 50);

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var placeholder = new S_Painting(2250, 1775);

var f = new Filler(gen.get());
var decorFiller = new MultiFiller(f, 50, 50);
decorFiller.set_zone(1075,2200,2375,1350);
decorFiller.add_default_constructor("S_Seashell");
decorFiller.add_default_constructor("S_Seashellpointy");
decorFiller.add_default_constructor("S_Planks");

decorFiller.add_default_constructor("S_AlgaeWall", 1, 100, 50);
decorFiller.add_default_constructor("S_Coral", 3);
decorFiller.add_default_constructor("S_Anemone", 2);
decorFiller.add_default_constructor("S_Waterplants", 2);
decorFiller.set_tries(75, 100);
decorFiller.fill_floor_by_retry();

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

var events = new EventFiller(decorFiller, 10);
events.battle('waters/anemone', 0.5);
events.battle('waters/crab', 0.5);
events.battle('waters/jellyfish', 0.5);
events.battle('waters/mermaid');
events.battle('waters/naiad');
events.battle('waters/triton');
/*
events.battleRubble(ITEM.Shield, 0.05);
events.battleRubble(ITEM.Elixir_vine, 0.05);
events.battleRubble(ITEM.Sword_wooden, 0.1);
events.battleRubble(ITEM.Bone);
events.groundItem(ITEM.Scale);
events.groundItem(ITEM.Seashell);
events.groundItem(ITEM.AncientRubbles);
events.groundItem(ITEM.Net, 0.1);
events.text('You find a pile of goo that surely used to be other living creatures. You shudder at the thought that it may be the fate that awaits you.');
events.text('The stench and humidity is unbearable. The floor under your feet is gooey and unsteady. You progress with difficulty.');
events.text('You notice a dull pain in your feet. When you take a look, you notice that there is thin layer of thick liquid everywhere around you. It is weakening the leather of your shoes and slowly burning your skin underneath. It\'s taking a very long time, but things will surely get worse if you don\'t find a way out fast.');
events.text('Trinkets and bits of human-made objects lie around you on the exposed flesh. It gives you hope that you can find something interesting around here.');

events.byConstructor("B_Skeleton", 1);
events.byConstructor("B_Seashell", 1);
*/
events.set_tries(50, 75);
events.fill_floor_by_retry();

placeholder.destroy();
// ===================
//hack 7. START/INIT
// ===================


var next = function() {
  PARTY.changeNickname(PARTYMEMBERS.TraitorFisher);
  TextBannerSequence.make([
    `$$TraitorFisher$: "Why were you trespassing on the territory of the Sirens?"`,
    `$$Ren$: "The Sirens? Sorry, we had no idea..."`,
  ], IO.control.character);
};
CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
    `You get dragged all the way to the bottom of the lake. When the currents finally quiet down, the tentacular monster that brought you here is nowhere to be seen. Instead, you can see plenty of heavily armored sirens and tritons floating in the water all around. They are all watching you with a suspicious eye.`,
    `In front of you, a young woman, studying you patiently. She seems very serious, and not at all phased by this unusual environment or by your presence.`,
  ], next);
};

CURRENTLEVEL.initialize_with_character(2275, 1800);
