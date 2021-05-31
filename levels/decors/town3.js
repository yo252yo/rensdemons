AUDIO.music.town.denial();

var seed = DICTIONARY.get("town_3_seed");
var gen = new Generator(seed);
new S_TownFloor(50, 2050, 2000, 2000, "005_world_map");

new S_Church(950, 1050, TODO);

new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 100000, 225, 350, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Tool, 100000, 1600, 525, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Alchemy, 100000, 1350, 1675, gen.get());




var houseFiller = new Filler(gen);
houseFiller.set_zone(75, 2025, 1950, 1950);
houseFiller.set_tries(20, 150);
houseFiller.set_object(120, 160, function(x,y,g){ return new S_House(CITIES.denial, x, y, g); });
houseFiller.fill_by_retry();

var villagerFiller = new Filler(gen);
villagerFiller.set_zone(75, 2025, 1950, 1950);
villagerFiller.set_tries(20, 75);//this.gen.int(10) - 7
villagerFiller.set_object(50, 60, function(x,y,g){ return new M_Villager(CITIES.denial, x, y, g); });
villagerFiller.fill_by_retry();
