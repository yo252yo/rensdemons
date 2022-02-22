// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.town.acceptance();
var gen = new Generator(DICTIONARY.get("world_seed")*6);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================
var town = new S_TownFloor(1050, 2550, 1000, 1500, "010_world_map");

// ===================
//hack D. UNIQUE ELEMENTS
// ===================
new S_Church(1850, 1775, "022_church5$");

new S_Casern(1725, 2475);

new S_Store(CITIES.acceptance, ITEMS_ARCHETYPES_NAMES.Weapon, 100000, 1625, 1700, gen.get());
new S_Store(CITIES.acceptance, ITEMS_ARCHETYPES_NAMES.Tool, 100000, 1175, 2050, gen.get());
new S_Store(CITIES.acceptance, ITEMS_ARCHETYPES_NAMES.Alchemy, 100000, 1375, 1225, gen.get());


new M_TorturedSoul(1075, 2550);


// ===================
//hack E. DECOR (permanent filler)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 2525, 950, 1450);
houseFiller.set_tries(5, 40);
houseFiller.add_constructor( function(x,y,seed){ return new S_House(CITIES.acceptance, x, y, seed); }, 1, 120, 160);
houseFiller.fill_floor_by_retry();

var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(1075, 2525, 950, 1450);
villagerFiller.set_tries(10, 30);//this.gen.int(10) - 7
villagerFiller.add_constructor(function(x,y,seed){ return new M_Villager(CITIES.acceptance, x, y, seed); }, 1 , 50, 60);
villagerFiller.fill_floor_by_retry();


// ===================
//hack G. START/INIT
// ===================
CURRENTLEVEL.setup_text_start_function([
  `The atmosphere of $$town_5$ is eerily calm. It's nothing like the oppressive, watchful silence from $$town_2$. There are people in the streets, life is going on. But it seems to be moving at a slower pace. People are sluggish, their faces are inexpressive. Nobody is making any sound.`,
  `$$BestFriend$: "It's almost like a town full of ghosts..."`,
  `By chance or by fate, you arrive at a time where the morning sky is covered in clouds, adding to the ambient morosity. Though the washed out grey stone of the building hints that the weather is not often sunny here. It seems like a cold wind is running through the streets. Or is it your imagination?`,
  `$$Ren$: "Let's go!"`,
]);


town.get_exit().initialize_with_character(1100, 1100);
