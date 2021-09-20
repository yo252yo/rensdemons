// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.town.debauch();
var gen = new Generator(DICTIONARY.get("world_seed")*5);

// ===================
//hack 1. FLOORS
//hack 2. EXIT
// ===================
new S_TownFloor(1050, 2050, 2000, 1000, "010_world_map");

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_Church(1950, 1300, "021_church4$");

new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 500, 1100, 2000, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Alchemy, 10000, 2825, 1900, gen.get());
new S_Store(ABILITIES_ARCHETYPES_NAMES.Diplomat, 2000, 2200, 1375, gen.get());
new S_Store(ABILITIES_ARCHETYPES_NAMES.Spirit, 2000, 2500, 1600, gen.get());

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 2025, 1950, 950);
houseFiller.set_tries(5, 60);
houseFiller.set_object(120, 160, function(x,y,seed){ return new S_House(CITIES.indulgence, x, y, seed); });
houseFiller.fill_by_retry();

var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(1075, 2025, 1950, 950);
villagerFiller.set_tries(35, 120);//this.gen.int(10) - 7
villagerFiller.set_object(50, 60, function(x,y,seed){ return new M_Villager(CITIES.indulgence, x, y, seed); });
villagerFiller.fill_by_retry();
