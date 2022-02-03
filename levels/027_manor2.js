// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================

var gen = new Generator(DICTIONARY.get("world_seed")*93);
AUDIO.music.levels.manor();

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================
new S_WoodFloor(1950,1950,100,375);
new S_WoodFloor(1875,1750,250,50);

var rooms = [];
rooms.push(new S_WoodFloor(1575,1875,350,300));
rooms.push(new S_WoodFloor(1575,2275,850,375));
new S_WoodFloor(2075,1875,350,300);


new S_Stairs(1975, 1625, false, '027_manor');

new B_Bed(2225, 1650);
new B_Bed(2255, 1650);
new B_Table(2150, 1600);
new B_Table(2325, 1600);
new B_Statue(2350, 1850);
new B_Chest(2100, 1850);


// ===================
//hack D. UNIQUE ELEMENTS
// ===================

new SE_event(1825, 1775, [
  `You got a Spoon.`,
  ], 50, undefined, function(){
    INVENTORY.increase("Spoon");
  });


new SE_event(1600, 2250, [
  `You got a Coin.`,
  `$$SnobRich$: "Wow, you'd even take a single coin from the floor?"`,
  `$$Ren$: "I know it's not much, but it does add up. Besides, once I've looked, I can't not take it."`,
  `$$SnobRich$: "Suit yourself."`,
  ], 50, undefined, function(){
    INVENTORY.increase(ITEM.Coin);
  });


new SE_event(2400, 1725, [
  `$$SnobRich$: "See, I told you, it's just a normal bedroom."`,
  `$$Ren$: "It's never just a normal bedroom."`,
  `As you say that, you notice a loose plank on the wall. You push it and discover a hidden niche behind the wall. In it, you find a fancy weapon.`,
  `You got a ${ITEM.Sword_great}.`,
  `$$SnobRich$: "I never knew this was there... I guess my parents kept it for protection."`,
  ], 50, undefined, function(){
    INVENTORY.increase(ITEM.Sword_great);
  });


var door = new SE_event(2050, 1750, []);
door.interaction = function(){
  if(!INVENTORY.count("Big rusty key")){
    TextBannerSequence.make([
      `You find yourself faced with a locked heavy door. Like for all locked doors, though, you know the key has to be nearby.`,
    ]);
  } else{
    TextBannerSequence.make([
      `You slide the Big rusty key in the lock and turn it effortlessly. The door opens.`,
      `$$SnobRich$: "Congratulations on opening my parents bedroom. You can see how pointless it is, now."`,
      `$$Ren$: "Just you wait..."`,
    ], function() {
      door.destroy();
    });
  }
};

// ===================
//hack E. DECOR
// ===================

var f = new Filler(gen.get());
var filler = new MultiFiller(f, 50, 50);

filler.clear();
filler.set_tries(10, 20);
filler.add_default_constructor("B_Bucket");
filler.add_default_constructor("B_Table");
filler.add_default_constructor("B_Jar");
filler.add_default_constructor("B_Stool");
filler.add_default_constructor("B_Statue");
filler.add_default_constructor("B_Chair");
filler.add_default_constructor("B_Chest");

for(var f of rooms){
  filler.set_zone_from_floor(f);
  filler.fill_floor_by_retry();
}


// ===================
//hack F. EVENTS
// ===================


// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.initialize_with_character(1975, 1650);
