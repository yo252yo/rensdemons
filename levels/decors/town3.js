
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.town.denial();
var gen = new Generator(DICTIONARY.get("world_seed")*4);

// ===================
//hack 1. FLOORS
//hack 2. EXIT
// ===================

new S_TownFloor(1050, 3050, 2000, 2000, "010_world_map");

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_Church(1950, 2050, "040_church3");

new S_Store(CITIES.denial, ITEMS_ARCHETYPES_NAMES.Weapon, 100000, 1225, 1350, gen.get());
new S_Store(CITIES.denial, ITEMS_ARCHETYPES_NAMES.Tool, 100000, 2600, 1525, gen.get());

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
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
