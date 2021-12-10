// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.sirens();
var gen = new Generator(DICTIONARY.get("world_seed")*51);

var sirenspart = 1;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  sirenspart= s[1];
}


if(sirenspart == 1){
  var dim = [2375,1350];
  var modifier = 1;
} else if(sirenspart == 2){
  var dim = [1800,900];
  var modifier = 2;
} else {
  var dim = [1300,600];
  var modifier = 4;
}

// ===================
//hack 1. FLOORS
// ===================

new S_SandFloor(1075,2200,dim[0],dim[1]);

// ===================
//hack 2. EXIT
// ===================
if(sirenspart == 1){
  var x = new S_ExitFloor(2150,2225,250,50, "010_world_map");
} else if(sirenspart == 2){
  var x = new S_ExitFloor(1525,1325,400,50, "010_world_map");
} else {
  var x = new S_ExitFloor(1050,2000,50,250, "010_world_map");
}

x.interaction = function(){
  new CenteredTextMenu("Swim to the surface?", [
    {"text": "Yes", "effect": function(){ CURRENTLEVEL.setup("010_world_map"); }},
    {"text": "Not yet", "effect": function(){}},
  ]);
}

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
if(sirenspart == 1){
  new S_SavePoint(2175, 1900, 100, 50);

  var traitor = new M_TraitorFisher(2300, 1750);

  traitor.interaction = function() {
    this.face_character();
    if (PARTY.has_member(PARTYMEMBERS.TraitorFisher)){
      TextBannerSequence.make([
        `$$TraitorFisher$: "Let's leave quickly before we get found out!"`,
      ]);
    } else {
      BATTLE.api.make('_party/_TraitorFisher');
    }
  }
}


// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var placeholder = new S_Placeholder(2235, 1835,100, 100);

var f = new Filler(gen.get());
var decorFiller = new MultiFiller(f, 50, 80);
decorFiller.set_zone(1075,2200,dim[0], dim[1]);
decorFiller.add_default_constructor("S_Seashell", 0.6);
decorFiller.add_default_constructor("S_Seashellpointy", 0.6);
decorFiller.add_default_constructor("S_Planks", 0.4);

decorFiller.add_default_constructor("S_WaterPlantWall", 1);
decorFiller.add_default_constructor("S_BubblePlant", 4);
decorFiller.add_default_constructor("S_TentaPlant", 2);
decorFiller.add_default_constructor("S_TentaPlantMini", 2);
decorFiller.add_default_constructor("S_Coral", 1);
decorFiller.add_default_constructor("S_Anemone", 1);
decorFiller.add_default_constructor("S_Whirlwind", 1 * modifier);


decorFiller.set_tries(75, 100);
decorFiller.fill_floor_by_retry();

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

var events = new EventFiller(decorFiller, 10);
events.battle('waters/anemone', modifier);
events.battle('waters/crab', modifier);
events.battle('waters/jellyfish', modifier);
events.battle('waters/mermaid', 2 * modifier);
events.battle('waters/naiad', 2 * modifier);
events.battle('waters/triton', 2 * modifier);
events.groundItem(ITEM.Scale);
events.groundItem(ITEM.Seashell);
events.battleRubble(ITEM.Bone);
events.battleRubble(ITEM.Spear, 0.05);
events.battleRubble(ITEM.Elixir_venom, 0.1);
events.battleRubble(ITEM.Poison_darts, 0.1);
events.battleRubble(ITEM.BreathingPotion, 0.1);
events.byConstructor("B_Seashell", 0.1);
events.byConstructor("B_Skeleton", 0.1);
events.text('The waters in this lake are way more tumultuous than the placid surface had lead you to believe. Every now and then you see columns of bubbles swirling, or fishes being dragged by powerful chaotic currents.');
events.text(`A patrol of heavily armed tritons is swimming nearby. You don't think you can take them head on. Fortunately, you can swim down to the sand. You croutch and wait for the menace to go away.`);
events.text(`The lake is much deeper than you first thought. When you look up, you can barely see rays of light defracted by massive quantities of water. Most of the ambient light that allows you to see comes from fluorescent vegetals.`);
events.text(`The water dulls the sounds around you. It makes it hard to be reactive to approaching danger. When a flesh eating fish charges you from behind, you only notice it way too late. Fortunately, $$BestFriend$ is ready and manages to counter the animal before you even get hurt.`);
events.text(`The bottom of the lake is full of life. Huge swarms of fishes are swimming above your heads. Their colorful scale make them shine in the darkness like moving sparkly stars. The Sirens people must not be hungry.`);
events.text(`The breathing potion makes it possible for you to remain underwater. You breathe in the liquid and it somehow sustains you without drowning. The feeling is weird, it's definitely more viscous and heavy than air, and it has a distinctly fishy taste.`);

events.set_tries(50, 75);
events.fill_floor_by_retry();

//placeholder.destroy();

// ===================
//hack 7. START/INIT
// ===================

if(sirenspart == 1){
  var callback = function(){
    TextBannerSequence.make([
      `$$BestFriend$: "What... What just happened? How did you know you could trust her?"`,
      `$$BestFriend$: "Of course, the Goddess! Well, let's not linger! She said to head south, right?"`,
    ]);
  }

  var fight = function(){
    IO.control.character();
    BATTLE.api.make('_party/_TraitorFisherTrial', callback);
  }

  var next = function() {
    PARTY.changeNickname(PARTYMEMBERS.TraitorFisher);
    TextBannerSequence.make([
      `$$TraitorFisher$: "Why were you trespassing on the territory of the Sirens?"`,
      `$$Ren$: "The Sirens? Sorry, we had no idea..."`,
      `The crowd of merfolk exchange concerned murmurs in a tongue you cannot comprehend. It sounds like hisses and tongue clicks. $$TraitorFisher$ sends a few concerned gazes around.`,
      `$$TraitorFisher$: "I'm sorry, we must begin your formal trial."`,
    ], fight);
  };
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `You get dragged all the way to the bottom of the lake. When the currents finally quiet down, the tentacular monster that brought you here is nowhere to be seen. Instead, you can see plenty of heavily armored sirens and tritons floating in the water all around. They are all watching you with a suspicious eye.`,
      `In front of you stands a young woman, studying you patiently. She seems very serious, and not at all phased by this unusual environment or by your presence.`,
    ], next);
  };

  CURRENTLEVEL.initialize_with_character(2275, 1800);
} else if(sirenspart == 2){
/*
- we'll be safe once we pass this theeshold/ rly?wtf we'll lose aggro (@2)*/

} else {
/*
- also a text saying you get deeper @3*/

}
CURRENTLEVEL.initialize_with_character(2275, 1800);
