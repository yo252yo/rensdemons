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
new S_WoodFloor(1575,1875,350,300);
rooms.push(new S_WoodFloor(1575,2275,850,375));
new S_WoodFloor(2075,1875,350,300);


new S_Stairs(1975, 1625, false, '027_manor');

new B_Bed(2225, 1650);
new B_Bed(2255, 1650);
new B_Table(2150, 1600);
new B_Table(2325, 1600);
new B_Statue(2350, 1850);
new B_Chest(2100, 1850);


new B_Bed(1725, 1650);
new B_Table(1650, 1600);
new B_Table(1800, 1600);
new B_Statue(1600, 1850);
new B_Chest(1850, 1850);

// ===================
//hack D. UNIQUE ELEMENTS
// ===================


var glitch = new SE_event(2075, 2000, [], 50);

glitch.interaction = function(){
  var kill = function(){
    INVENTORY.increase("Spoon");
    glitch.visual_element.destroy(true);
    glitch.make_walkable();
  };

  if(!INVENTORY.count("Spoon")){
    TextBannerSequence.make([
      `You got a Spoon.`,
    ], kill);
  } else if(INVENTORY.count("Spoon") == 1) {
    TextBannerSequence.make([
      `You got a Spoon.`,
      `$$BestFriend$: "Didn't we already pick up that spoon?"`,
      `$$Ren$: "I think so. But it came back. It must be glitched."`,
      `$$BestFriend$: "Glitched?"`,
      `$$Ren$: "It means the state of the world did not properly change. Oh well, more for us."`,
    ], kill);
  } else {
    TextBannerSequence.make([
      `You got a Spoon.`,
      `$$BestFriend$: "One more?"`,
      `$$Ren$: "Yep! We can get rich that way!"`,
      `$$SnobRich$: "That's a rather slow income, if you ask me."`,
    ], kill);
  }
}


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
    INVENTORY.increase("_found_cache_snobrich");
  });


var cache = new SE_event(1550, 1725);
cache.interaction = function(){
  if(!INVENTORY.count("_found_cache_snobrich")){
    TextBannerSequence.make([
      `This wall is perfectly ordinary.`,
      `$$SnobRich$: "There's nothing there."`,
      `$$Ren$: "There must be. My intuition is telling me!"`,
      `$$SnobRich$: "This is my room, I spent all my life here. I can tell you that there's nothing there!"`,
    ]);
  } else{
    TextBannerSequence.make([
      `You look closely at the wall.`,
      `$$Ren$: "If there was a cache on the other side of the house, that means there's probably a symmetrical one here!"`,
      `You try to press on the planks, and sure enough one of them reveals a little niche like in the parent's bedroom. This one does not contain a sword, however, but a pretty old silver goblet.`,
      `You got a Silver Goblet.`,
    ], function() {
      INVENTORY.increase("Silver Goblet");
      cache.destroy();
    });
  }
};

new SE_event(1675, 2000, [
    `You got an Old Book.`,
    `$$SnobRich$: "What is this? Probably some old account books..."`,
    `$$BestFriend$: "What does it say?"`,
    `$$Ren$: "Most of the pages are blank, there's at most one or two paragraphs written in it."`,
    `$$Ren$: "Who cares anyway, I just want to resell it."`,
    `$$BestFriend$: "I can't imagine anyone wanting to buy that..."`,
  ], 50, undefined, function(){
    INVENTORY.increase("Old Book");
  });

new SE_event(2300, 2200, [
    `You got an ${ITEM.Elixir_ice}.`,
    `$$BestFriend$: "Cool! This I know for sure we can use in battle!"`,
    `$$Ren$: "We could also sell it."`,
  ], 50, undefined, function(){
    INVENTORY.increase(ITEM.Elixir_ice);
  });


var doll = new SE_event(1725, 1800, []);

doll.interaction = function(){
  if(!INVENTORY.count("_porcelaindollstory")){
    TextBannerSequence.make([
      `As soon as you enter the bedroom, $$SnobRich$ rushes towards a porcelain doll laying on the ground.`,
      `$$SnobRich$: "It's my favorite doll! I can't believe we've been separated! I'll never let you go again!"`,
      `Yet, carried away by her burst of emotions, $$SnobRich$ gets careless. Just when she starts to get up, hugging dearly her newly found treasure, she makes a wrong move, ties her foot in her convoluted dress and twists her ankle. She falls forward with a loud noise and a piercing scream. The doll did not survive the impact. Her head rolls ominously a few feet away.`,
      `$$SnobRich$ watched in disbelief, her heavily made-up face starting to twitch into a grimace. Terrified of the upcoming wailing that would surely damage your eardrums, you decide to be proactive.`,
      `$$Ren$: "Wait! I can fix this!"`,
      `$$SnobRich$: "There's no point! With the fracture, she's going to be hideous!"`,
      `$$Ren$: "I'm not talking about a cheap repair! I can get you the original one back. Do you trust my powers?"`,
      `$$SnobRich$ is doubtful but wants to believe in whatever could bring her beloved toy back.`,
      `$$SnobRich$: "What do I need to do?"`,
      `$$Ren$: "Not much. We need to leave and come back."`,
      `$$SnobRich$: "How is that going to help?"`,
      `$$Ren$: "Sometimes, environments restore themselves while I'm away. Objects and monsters respawn."`,
      `$$SnobRich$: "So you can go back in time?"`,
      `$$Ren$: "It's more like the room is going to go back in time. I don't understand it very well myself. I think it's easier to show you. Come."`,
    ]);
    INVENTORY.set("_porcelaindollstory", 1);
  } else if (INVENTORY.count("_porcelaindollstory") == 1) {
    TextBannerSequence.make([
      `$$Ren$: "We just need to go somewhere else and come back. Somewhere sufficiently far. Like downstairs."`,
      `$$BestFriend$: "Sounds like you're preparing a magic trick."`,
    ]);
  } else {
    TextBannerSequence.make([
      `When you come back to the room, the porcelain doll is intact in all her usual creepiness. $$SnobRich$ is overjoyed but manages her reaction carefully. She takes the toy with infinite precautions and cradles it like an actual infant, making sure every one of her motion is as smooth and safe as can be.`,
      `$$SnobRich$: "I cannot believe you were right! How did you do that? You really have wonderful powers. Thank you so much!"`,
      `You got a Creepy Porcelain Doll.`,
    ], function() {
      INVENTORY.increase("Creepy Porcelain Doll");
      doll.destroy();
    });
  }
};



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
