// ===================
//hack INITIALIZATION
// ===================
AUDIO.music.levels.squids();
var gen = new Generator(DICTIONARY.get("dungeons_seed"));

var access = "_squid_access";

// ===================
//hack FIXED ELEMENTS (floors)
// ===================

new S_Floor(375,2400,1275,875);
new S_Floor(275,2475,200,175);
new S_Floor(425,2575,500,200);
new S_Floor(200,2350,200,275);
new S_Floor(250,2125,200,500);
new S_Floor(575,1675,775,300);
new S_Floor(1075,2550,475,175);
new S_Floor(1575,2025,300,400);

new S_Floor(1025,2625,250,125);
new S_Floor(875,2575,100,75);


new SBattle(450, 1700, 'waters/whale');

// ===================
//hack GENERATED ELEMENTS (decor)
// ===================

var decorFiller = new Filler(gen);
decorFiller.set_zone(150,2600,1725,1300);

decorFiller.set_tries(5, 10);
decorFiller.set_object(100, 50, function(x,y,g){ return new S_AlgaeWall(x, y); });
decorFiller.fill_by_retry();

decorFiller.set_tries(7, 15);
decorFiller.set_object(50, 50, function(x,y,g){ return new S_Coral(x, y); });
decorFiller.fill_by_retry();

decorFiller.set_tries(5, 20);
decorFiller.set_object(50, 50, function(x,y,g){ return new S_Anemone(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 50, function(x,y,g){ return new S_Seashell(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 50, function(x,y,g){ return new S_Seashellpointy(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 50, function(x,y,g){ return new S_Waterplants(x, y); });
decorFiller.fill_by_retry();





// ===================
//hack TEMPORARY ELEMENTS (encounters)
// ===================

var events = new EventFiller(decorFiller);
events.set_zone(150,2475,2100,1475);

events.battle('waters/anemone', 0.5);
events.battle('waters/crab', 0.5);
events.battle('waters/anglerjelly');
events.battle('waters/jellyfish');
events.battle('waters/octopus');
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

events.set_tries(50, 100);
events.fill_by_retry();


// ===================
//hack FINISHING ELEMENTS (exit)
// ===================
// Do the exit after the decor so that decor doesnt spawn on it
var leave = function(){
  CURRENTLEVEL.setup('010_world_map');
  INVENTORY.decrease(access);
}
var f1 = new S_Floor(900,2525,200,125, 'obj_dark');
var f2 = new S_Floor(950,2650,100,200, 'obj_dark');

f1.interaction = leave;
f2.interaction = leave;

new S_Floor(375,2425,1275,50);


// ===================
//hack START
// ===================

var dive = function(){
  new CenteredTextMenu("Drink a breathing potion?", [
    {"text": "Yes", "effect": function() {
      INVENTORY.decrease(ITEM.BreathingPotion);
      INVENTORY.increase(access);
      IO.control.character();
    }},
    {"text": "No", "effect": function() {
      CURRENTLEVEL.setup("010_world_map");
     }}
   ]);
}

var alreadyEaten = function() { return INVENTORY.count("_eaten_by_whale") > 0; };
CURRENTLEVEL.add_trigger("foundAllChildren", alreadyEaten, function() {
  INVENTORY.decrease("_eaten_by_whale");
  CURRENTLEVEL.setup("024_squids2");
});



CURRENTLEVEL.initialize_with_character(1000, 2425);
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
