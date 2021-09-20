
// ===================
//hack INITIALIZATION
// ===================

AUDIO.music.town.acceptance();

var gen = new Generator(DICTIONARY.get("world_seed")*6);

// ===================
//hack PREMANENT FIXED ELEMENTS (floors)
// ===================

new S_TownFloor(1050, 2550, 1000, 1500, "010_world_map");

new S_Church(1850, 1775, "022_church5$");

new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 100000, 1625, 1700, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Tool, 100000, 1175, 2050, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Alchemy, 100000, 1375, 1225, gen.get());

// ===================
//hack PREMANENT FILLER ELEMENTS (decor)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 2525, 950, 1450);
houseFiller.set_tries(5, 40);
houseFiller.set_object(120, 160, function(x,y,seed){ return new S_House(CITIES.acceptance, x, y, seed); });
houseFiller.fill_by_retry();

var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(1075, 2525, 950, 1450);
villagerFiller.set_tries(10, 30);//this.gen.int(10) - 7
villagerFiller.set_object(50, 60, function(x,y,seed){ return new M_Villager(CITIES.acceptance, x, y, seed); });
villagerFiller.fill_by_retry();
