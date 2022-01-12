// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.squids();
var gen = new Generator(DICTIONARY.get("world_seed")*12);

var access = "_squid_access";

// ===================
//hack 1. FLOORS
// ===================


new S_SandFloor(1375,2400,1275,875);
new S_SandFloor(1275,2475,200,175);
new S_SandFloor(1425,2575,500,200);
new S_SandFloor(1200,2350,200,275);
new S_SandFloor(1250,2125,200,500);
new S_SandFloor(1575,1675,775,300);
new S_SandFloor(2075,2550,475,175);
new S_SandFloor(2575,2025,300,400);

new S_SandFloor(2025,2625,250,125);
new S_SandFloor(1875,2575,100,75);


// ===================
//hack 2. EXIT
// ===================

var leave = function(){
  CURRENTLEVEL.setup('010_world_map');
  INVENTORY.decrease(access);
}
var f1 = new S_ExitFloor(1900,2525,200,125);
var f2 = new S_ExitFloor(1950,2650,100,200);

f1.interaction = leave;
f2.interaction = leave;

new S_SandFloor(1375,2425,1275,50);


// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_SavePoint(2000, 2375);

var whale = new SBattle(1450, 1700, 'waters/whale');
whale.make_default_callback = function(){return function(){};};

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var f = new Filler(gen.get());
var decorFiller = new MultiFiller(f, 50, 50);
decorFiller.set_zone(1150,2600,1725,1300);
decorFiller.add_default_constructor("S_AlgaeWall", 1, 100, 50);
decorFiller.add_default_constructor("S_Coral", 3);
decorFiller.add_default_constructor("S_Anemone", 2);
decorFiller.add_default_constructor("S_Seashell", 2);
decorFiller.add_default_constructor("S_Seashellpointy", 2);
decorFiller.add_default_constructor("S_Waterplants", 2);
decorFiller.set_tries(80, 100);
decorFiller.fill_floor_by_retry();


// ===================
//hack 5. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

var events = new EventFiller(decorFiller);
events.set_zone(1150,2475,2100,1475);

events.battle('waters/anemone', 0.5);
events.battle('waters/crab', 0.5);
events.battle('waters/anglerjelly');
events.battle('waters/jellyfish');
events.battle('waters/octopus', 0.2);
events.battle('waters/squid');
events.battleRubble(ITEM.AncientRubbles, 0.5);
events.battleRubble(ITEM.Scale, 0.3);
events.groundItem(ITEM.Seashell);
events.groundItem(ITEM.Stone, 0.1);

events.text(`The water is very cold. It was hard to bear at first, but you're finally getting used to it. You hope $$BestFriend$ handles it well, but you don't want to say anything to keep the topic off everyone's mind.`);
events.text(`There is a lot of fishing swimming all around you. Most of them are even above you, like weird birds, since you're at the very bottom of the lake. But you cannot look at any too closely, since they seem to run away from you every time you approach.`);
events.text(`You find a huge rock that stands out suspiciously. It triggers your curiosity, so you try to push it to see if it covers anything, but despite all your efforts it won't budge. It's most likely a false trail...`);
events.text(`You can be underwater thanks to the potion, but it doesn't prevent your clothes from being damp. You make progress really slowly. The water resistance is significantly stronger than air, which slows every of your motion. But it's ok, you'll just take your time.`);

events.byConstructor("B_Seashell", 2);
events.byConstructor("B_Skeleton", 1);

events.set_tries(100, 120);
events.fill_floor_by_retry();


// ===================
//hack 7. START/INIT
// ===================

var dive = function(){
  new CenteredTextMenu("Drink a breathing potion?", [
    {"text": "Yes", "effect": function() {
      INVENTORY.decrease(ITEM.BreathingPotion);
      INVENTORY.increase(access);
      SAVE.autosave();
      IO.control.character();
    }},
    {"text": "No", "effect": function() {
      CURRENTLEVEL.setup("010_world_map");
     }}
   ]);
}

var alreadyEaten = function() { return INVENTORY.count("_eaten_by_whale") > 0; };
CURRENTLEVEL.add_trigger("alreadyEaten", alreadyEaten, function() {
  INVENTORY.decrease("_eaten_by_whale", INVENTORY.count("_eaten_by_whale"));
  CURRENTLEVEL.setup("024_squids2", [1100, 1350]);
});

CURRENTLEVEL.initialize_with_character(2000, 2425);
var potion = function(){
  if (INVENTORY.count(access)){
    IO.control.character();
    return;
  }
  if (INVENTORY.count(ITEM.BreathingPotion) > 0){
    TextBannerSequence.make([
      `The lake in front of you seems swarming with dangerous creatures. You can see them come and go under the dark surface of the water.`,
      `$$BestFriend$: "So we're supposed to dive in and find... what?"`,
      `$$Ren$: "Some sort of ancient relic, I assume."`,
      `$$BestFriend$: "Let's go! Do you have the breathing potion?"`,
    ], dive);
  } else {
    TextBannerSequence.make([
      `The lake in front of you seems swarming with dangerous creatures. You can see them come and go under the dark surface of the water.`,
      `$$BestFriend$: "So we're supposed to dive in and find... what?"`,
      `$$Ren$: "Some sort of ancient relic, I assume."`,
      `$$BestFriend$: "Let's go! Do you have the breathing potion?"`,
      `$$Ren$: "Hmmm... I think we don't have any."`,
      `$$BestFriend$: "Well then let's go back to town and get some, how else are we supposed to explore a lake?"`,
    ], function() {CURRENTLEVEL.setup("010_world_map"); });
  }
}

potion();
