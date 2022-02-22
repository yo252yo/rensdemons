// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.town.denial();
var gen = new Generator(DICTIONARY.get("world_seed")*4);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================
var town = new S_TownFloor(1050, 3050, 2000, 2000, "010_world_map");

// ===================
//hack D. UNIQUE ELEMENTS
// ===================
new S_Church(1950, 2050, "040_church3");

new S_Store(CITIES.denial, ITEMS_ARCHETYPES_NAMES.Weapon, 100000, 1225, 1350, gen.get());
new S_Store(CITIES.denial, ITEMS_ARCHETYPES_NAMES.Tool, 100000, 2600, 1525, gen.get());

// ===================
//hack E. DECOR (permanent filler)
// ===================


var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 3025, 1950, 1950);
houseFiller.set_tries(20, 125);
houseFiller.add_constructor(function(x,y,seed){ return new S_House(CITIES.denial, x, y, seed); }, 1, 120, 160);
houseFiller.fill_floor_by_retry();

var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(1075, 3025, 1950, 1950);
villagerFiller.set_tries(20, 75);//this.gen.int(10) - 7
villagerFiller.add_constructor(function(x,y,seed){ return new M_Villager(CITIES.denial, x, y, seed); },1 , 50, 60);
villagerFiller.fill_floor_by_retry();


// ===================
//hack G. START/INIT
// ===================
CURRENTLEVEL.setup_text_start_function([
  `As you arrive in the town of $$town_3$, you are relieved to see a peaceful little city where life seems to be going on normally.`,
  `$$BestFriend$: "So this is the last bastion of human forces?"`,
  `$$Ren$: "It seems so. Anything wrong?"`,
  `$$BestFriend$: "Nothing, I just expected it to be more... militaristic? alert, maybe? I don't know... It seems too quiet..."`,
  `$$Ren$: "Maybe it's because they are so powerful that they can keep the demons at bay and be in peace!"`,
  `$$BestFriend$: "It would be nice... If that's true, we have a lot to learn from them. Let's resupply here before we head southeast for the Maw of Hell..."`,
]);

town.get_exit().initialize_with_character(1100, 1100);
