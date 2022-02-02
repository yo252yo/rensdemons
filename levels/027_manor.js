// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================

var gen = new Generator(DICTIONARY.get("world_seed")*93);
AUDIO.music.levels.manor();

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================

new S_WoodFloor(1950,2300,100,725);
new S_WoodFloor(1500,1950,1000,50);
new S_WoodFloor(2450,2275,50,700);
new S_WoodFloor(1500,2275,50,700);

new S_WoodFloor(1725,2025,50,200);
new S_WoodFloor(2225,2025,50,200);

var rooms = [];
rooms.push(new S_WoodFloor(1575,1875,350,300));
rooms.push(new S_WoodFloor(2075,1875,350,300));
rooms.push(new S_WoodFloor(1575,2275,350,300));
rooms.push(new S_WoodFloor(2075,2275,350,300));


var exit = new S_ExitFloor(1950,2325,100,50, "021_town4");

new S_Stairs(1975, 1625, true, '027_manor2');

// ===================
//hack D. UNIQUE ELEMENTS
// ===================

new SE_event(2025, 2200, [
    `When you enter the house, you notice immediately a cupboard on your right. A quick glance through indicates that it's where the owners would keep their umbrellas. You take one and show it to $$SnobRich$.`,
    `$$Ren$: "I can take one of these..."`,
    `$$SnobRich$ seems a bit disappointed`,
    `$$SnobRich$: "Just one?"`,
    `$$Ren$: "Usually, I can only take one thing per container."`,
    `You got an Umbrella.`,
  ], 50, undefined, function(){
    INVENTORY.increase("Umbrella");
  });

new SE_event(1925, 2125, [
    `$$SnobRich$ points at an expensive looking painting on the wall.`,
    `$$SnobRich$: "How about this painting? It's my father, it's always been one of my favorite."`,
    `$$Ren$: "Sorry, it's pretty rare that I can take stuff from the walls. Paintings don't usually come off."`,
    `$$SnobRich$ makes a pouty face.`,
    `$$SnobRich$: "But I want it!"`,
  ], 50, undefined);

new SE_event(1950, 1975, [
    `$$Ren$: "So that's most of my income. Whenever I end up somewhere, I usually start by looking around for stuff I can pick up."`,
    `$$Ren$: "Sometimes I like to do a thorough sweep to make sure I don't miss anything. You never know when you might find something important."`,
    `$$BestFriend$: "When did you start doing all that?"`,
    `$$Ren$: "During the trial. I think the Goddess did something to my brain..."`,
    `$$SnobRich$: "Very well, let's do this. We still have a lot of ground to cover. How do we go about it, teach me!"`,
    `$$Ren$: "I like to start by dead ends. They often have pretty interesting stuff."`,
  ], 100, undefined);

new SE_event(1500, 1625, [
  ], 50, undefined, function(){
    `You got a Big rusty key.`,
    `$$Ren$: "Now this looks important."`,
    `$$SnobRich$: "Does it? It's just a random key..."`,
    `$$Ren$: "Keys usually opens up something!"`,
    `$$SnobRich$: "I think this one is for the master bedroom upstairs. I don't think you'll find anything interesting there..."`,
    `$$Ren$: "If there is a key, there must be something worth protecting!"`,
    `$$SnobRich$: "Yes, people sleeping!"`,
    `$$Ren$: "You'll see..."`,
    INVENTORY.increase("Big rusty key");
  });

new SE_event(2450, 1625, [
  `$$Ren$: "There's nothing there..."`,
  `$$SnobRich$: "What about this carpet?"`,
  `$$Ren$: "It's off limits."`,
  `$$SnobRich$: "I don't think I'll ever understand your rules..."`,
  ], 50, undefined);

new SE_event(2450, 2275, [
  `You got a Candle.`,
  ], 50, undefined, function(){
    INVENTORY.increase("Candle");
  });

new SE_event(1500, 2275, [
  `You got a Vase.`,
  `$$SnobRich$: "Why did you remove the flowers before taking it?"`,
  `$$Ren$: "I can only get the vase."`,
  `$$BestFriend$: "Put it back! The flowers are going to die!"`,
  `$$Ren$: "Sorry, that's not really possible..."`,
  `$$BestFriend$: "What do you mean?"`,
  `$$SnobRich$: "If I did not know you were following the Goddess, I'd have you thrown in an asylum..."`,
  ], 50, undefined, function(){
    INVENTORY.increase("Vase");
  });



new SE_event(1800, 2200, [
  `$$SnobRich$: "You're not taking anything in this room?"`,
  `$$Ren$: "No, it's mostly stuff for decoration."`,
  `$$SnobRich$: "Decoration?"`,
  `$$Ren$: "Yes, it sets a tone, it builds a mood. I mean didn't you ever notice that this furniture disposition is really impractical? There's also tons of stuff that are missing, even in this huge house. I bet we won't see a bathroom for instance..."`,
  `$$BestFriend$: "To be fair, there are buckets."`,
  `$$SnobRich$: "I dislike the implication."`,
  ], 50, undefined);

new SE_event(2300, 1650, [
  `$$SnobRich$: "So you just... go into people's houses? And nobody minds?"`,
  `$$Ren$: "No. Not even in $$town_2$."`,
  `$$BestFriend$: "Though that was borderline."`,
  `$$Ren$: "I suppose being the Promised Child has its perks."`,
  `$$SnobRich$: "That it does. Sounds like a good source of income."`,
  `$$Ren$: "Well, it comes at a price."`,
  ], 50, undefined);


new SE_event(1625, 1800, [
  `$$SnobRich$: "Doesn't anyone complain when you're going through all their properties?"`,
  `$$Ren$: "Not really."`,
  `$$BestFriend$: "They did in $$town_2$. But even then, they'd let us do whatever we wanted."`,
  `$$SnobRich$: "Unbelievable."`,
  `$$Ren$: "Well you're not complaining either, are you? You're even guiding you through your villa."`,
  `$$SnobRich$: "This case is... complicated. Let's leave it at that, shall we?"`,
  ], 50, undefined);


new SE_event(2275, 2075, [
  `You got a Rare wine.`,
  `$$SnobRich$: "Oh, good choice, that is worth a fortune!"`,
  `$$Ren$: "Why is it just lying on the floor then?"`,
  `$$SnobRich$: "I suppose this place has really gone downhill since we left!"`,
  ], 50, undefined, function(){
    INVENTORY.increase("Rare wine");
  });


new SE_event(1700, 1600, [
    `You got a Stuffed Bear Head.`,
    `$$BestFriend$: "You can't possibly tell me that we'll need that for our quest!"`,
    `$$Ren$: "I don't think so, but you never know what lies ahead... Besides, if it's not useful, I'll sell it."`,
    `$$BestFriend$: "That's so heavy though!"`,
    `$$SnobRich$: "It's worth quite a lot of money!"`,
    `$$BestFriend$: "Who's going to buy this thing?"`,
    `$$Ren$: "All traders will be happy to take this off my hands!"`,
    `$$SnobRich$: "Maybe they are the crazy ones..."`,
    `$$BestFriend$: "How are you going to decide if you're selling it or keeping it in case it's useful?"`,
    `$$Ren$: "Where it goes in my inventory should give me a clue. Well if it's really important, they'll refuse to buy it."`,
    `$$BestFriend$: "I think that just shows they have good taste."`,
    `$$SnobRich$: "Hey! Respect my father's hunting trophies."`,
  ], 50, undefined, function(){
    INVENTORY.increase("Stuffed Bear Head");
  });


new SE_event(2325, 1825, [
    `You got a Massive Gold Statue.`,
    `$$SnobRich$: "How are you going to carry that? It's huge!"`,
    `$$Ren$: "The Goddess made my bag bottomless. Look."`,
    `Your companions look in awe as you fit the oversized sculpture in your inventory.`,
  ], 50, undefined, function(){
    INVENTORY.increase("Massive Gold Statue");
  });

new SE_event(2125, 2100, [
    `You got a ${ITEM.Berry}.`,
    `$$BestFriend$: "Eww don't pick that up we don't know how long this has been on the floor!"`,
    `$$Ren$: "It's fine, I promise. It doesn't spoil!"`,
    `$$BestFriend$: "Well I'm not eating it!"`,
  ], 50, undefined, function(){
    INVENTORY.increase(ITEM.Berry);
  });

new SE_event(1600, 2225, [
    `You got a ${ITEM.Seashell}.`,
    `$$SnobRich$: "What on earth is this doing here?"`,
    `$$Ren$: "I'm not sure. Things don't always make sense. The bottom line is that it's ours now!"`,
  ], 50, undefined, function(){
    INVENTORY.increase(ITEM.Seashell);
  });



var blockingEvent = new SE_event(1950, 1800, [], 100, undefined);
blockingEvent.interaction = function(){
  if(!INVENTORY.count("Big rusty key")){ // WIP TODO condition
    TextBannerSequence.make([
      `$$Ren$: "I don't think we should leave this floor yet. I like to clean up a floor completely before moving on to the next. It helps with tracking progress, and, once again, not forgetting anything important."`,
      `$$BestFriend$: "What could be so important?"`,
      `$$Ren$: "I don't know... Maybe there's something critical to our quest!"`,
    ]);
  } else{
    TextBannerSequence.make([
      `$$Ren$: "Ok, I think we've cleared this place, we can move on."`,
      `$$BestFriend$: "Whatever you say..."`,
    ], function() {
      blockingEvent.destroy();
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

CURRENTLEVEL.setup_text_start_function([
  `You turn to $$SnobRich$ and start explaining your Goddess-given knowledge.`,
  `$$Ren$: "See, when I enter a place like this, I know there are some things I can take and some things I can't."`,
  `$$SnobRich$: "And that's not theft?"`,
  `$$Ren$: "No, the people leave it willingly for me. I think it's some sort of offering because I'm the Promised Child. They want to help my quest in whatever little way they can, I suppose."`,
  `$$SnobRich$: "Ok, and how do you know what you can take or not?"`,
  `$$Ren$: "The Goddess blessed my eyes with a special vision. The things I can take are usually highlighted, or in a different color. They stand out."`,
  `$$SnobRich$: "That's pretty odd... So what about this hallway? Anything you can take?"`,
]);

exit.initialize_with_character(2575, 2575);
