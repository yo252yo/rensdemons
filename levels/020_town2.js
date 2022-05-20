// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.town.fear();
var gen = new Generator(DICTIONARY.get("world_seed")*3);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================
var town = new S_TownFloor(1050, 2150, 1100, 1100, "010_world_map");


// ===================
//hack D. UNIQUE ELEMENTS
// ===================
new S_Church(1700, 1750, "020_church2");

new S_Castle(1075, 1425);

new S_Store(CITIES.fear, ITEMS_ARCHETYPES_NAMES.Weapon, 500, 1800, 1200, gen.get());
new S_Store(CITIES.fear, ITEMS_ARCHETYPES_NAMES.Tool, 200, 1925, 2000, gen.get());
new S_Store(CITIES.fear, ITEMS_ARCHETYPES_NAMES.Alchemy, 100, 1225, 1850, gen.get());

// ===================
//hack E. DECOR (permanent filler)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 2525, 1475, 1450);
houseFiller.set_tries(15, 75);
houseFiller.add_constructor(function(x,y,seed){ return new S_House(CITIES.fear, x, y, seed); },1 ,120, 160);
houseFiller.fill_floor_by_retry();

var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(1075, 2525, 1475, 1450);
villagerFiller.set_tries(2, 10);//this.gen.int(10) - 7
villagerFiller.add_constructor(function(x,y,seed){ return new M_Villager(CITIES.fear, x, y, seed); },1,50,60);
villagerFiller.fill_floor_by_retry();

villagerFiller.set_tries(6, 20);
villagerFiller.add_constructor(function(x,y,seed){ return new M_Guard(CITIES.fear, x, y, seed); },1,50,60);
villagerFiller.fill_floor_by_retry();

// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.setup_text_start_function([
  `You arrive at $$town_2$. The metropolis is bigger than anything you've ever known, leaving $$BestFriend$ looking around, pretty impressed.`,
  `$$BestFriend$: "Wow... This is nothing like $$town_1$!"`,
  `More than the size of the town, what really strikes you is its condition. Most buildings in $$town_1$, without being outright ruins, were displaying clearly the mark of time passing. Patches and repairs over the years made any building's appearance somewhat chaotic. Not here, though. All houses, without exception, are in pristine condition, as if they had just been freshly built. The stones have been bleached or painted to an immaculate white, turning the city into a shimmering sea that almost blinds you under the day's sun.`,
  `Something else feels peculiar, but you can't put your finger on it until $$BestFriend$ articulates it for you.`,
  `$$BestFriend$: "This city is so big, but it's weird, there's almost nobody in the streets..."`,
  `Indeed, the place looks like a ghost town. Not only are passerby pretty rare, there is also none of the usual signs of life you'd expect on the roads: trails, mud, steps, the occasional lost item... It looks as if nobody ever steps foot outside.`,
  `This only makes the ambient silence weigh even more. You would almost consider this town abandoned if it weren't for its impeccable maintenance and the occasional glance you exchange with inhabitants peeking at you from their homes, protected behind heavy curtains.`,
  `$$Ren$: "You're right, this is a weird place..."`,
  `$$BestFriend$: "I don't really like it..."`,
  `$$Ren$: "We don't have to stay long... Let's head for the church and see what kind of training they have for me!"`,
]);

town.get_exit().initialize_with_character(1750, 2550);
