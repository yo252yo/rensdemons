// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.town.fear();
var gen = new Generator(DICTIONARY.get("world_seed")*3);

// ===================
//hack 1. FLOORS
//hack 2. EXIT
// ===================
new S_TownFloor(1050, 2550, 1500, 1500, "010_world_map");

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_Church(1700, 1750, "020_church2");

new S_Castle(1075, 1425);

new S_Store(CITIES.fear, ITEMS_ARCHETYPES_NAMES.Weapon, 500, 2200, 1300, gen.get());
new S_Store(CITIES.fear, ITEMS_ARCHETYPES_NAMES.Tool, 200, 2225, 2225, gen.get());
new S_Store(CITIES.fear, ITEMS_ARCHETYPES_NAMES.Alchemy, 100, 1425, 1850, gen.get());

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 2525, 1475, 1450);
houseFiller.set_tries(20, 100);
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
