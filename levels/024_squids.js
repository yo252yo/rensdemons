var access = "_squid_access";


var leave = function(){
  CURRENTLEVEL.setup('010_world_map');
  INVENTORY.decrease(access);
}
var f1 = new S_Floor(900,2525,200,125, 'obj_dark');
var f2 = new S_Floor(950,2650,100,200, 'obj_dark');

f1.interaction = leave;
f2.interaction = leave;

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


console.log("todo Ancient Armament Armature");


var gen = new Generator(DICTIONARY.get("dungeons_seed"));
var filler = new Filler(gen);
filler.set_zone(150,2475,2100,1475);

filler.set_tries(40, 100);
filler.set_event([
  function(x,y,g){ return new SBattle(x, y, 'waters/anemone')},
  function(x,y,g){ return new SBattle(x, y, 'waters/crab')},
  function(x,y,g){ return new SBattle(x, y, 'waters/anglerjelly')},
  function(x,y,g){ return new SBattle(x, y, 'waters/jellyfish')},
  function(x,y,g){ return new SBattle(x, y, 'waters/octopus')},
  function(x,y,g){ return new SBattle(x, y, 'waters/squid')},
//  new SB_rubble(x, y, ITEM.Elixir_fire),
//  new SE_small_treasure(x, y, ITEM.Stone),
//  new SB_event(x, y, '...'),
]);
filler.fill_by_retry();




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

CURRENTLEVEL.initialize_with_character(1000, 2425);
var potion = function(){
  if (INVENTORY.count(access)){
    IO.control.character();
    return;
  }
  if (INVENTORY.count(ITEM.BreathingPotion) > 0){
    TextBannerSequence.make([
      `$$BestFriend$: "So we're supposed to dive in and find... what?"`,
      `$$Ren$: "Some sort of ancient relic, I assume."`,
      `$$BestFriend$: "Let's go! Do you have the breathing potion?"`,
    ], dive);
  } else {
    TextBannerSequence.make([
      `$$BestFriend$: "So we're supposed to dive in and find... what?"`,
      `$$Ren$: "Some sort of ancient relic, I assume."`,
      `$$BestFriend$: "Let's go! Do you have the breathing potion?"`,
      `$$Ren$: "Hmmm... I think we don't have any."`,
      `$$BestFriend$: "Well then let's go back to town and get some, how else are we suposed to explore a lake?"`,
    ], function() {CURRENTLEVEL.setup("010_world_map"); });
  }
}

potion();
