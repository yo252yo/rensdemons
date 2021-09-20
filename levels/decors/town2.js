// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.town.fear();
var gen = new Generator(DICTIONARY.get("world_seed")*3);

// ===================
//hack 1. FLOORS -> EXITS
// ===================
new S_TownFloor(1050, 2550, 1500, 1500, "010_world_map");

// ===================
//hack 2. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_Church(1700, 1750, "020_church2");

new S_Castle(1075, 1425);

new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 500, 2200, 1300, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Tool, 200, 2225, 2225, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Alchemy, 100, 1425, 1850, gen.get());

// ===================
//hack 3. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 2525, 1475, 1450);
houseFiller.set_tries(15, 100);
houseFiller.set_object(120, 160, function(x,y,seed){ return new S_House(CITIES.fear, x, y, seed); });
houseFiller.fill_by_retry();

var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(1075, 2525, 1475, 1450);
villagerFiller.set_tries(2, 10);//this.gen.int(10) - 7
villagerFiller.set_object(50, 60, function(x,y,seed){ return new M_Villager(CITIES.fear, x, y, seed); });
villagerFiller.fill_by_retry();
