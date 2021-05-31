AUDIO.music.town_debauch();

var seed = DICTIONARY.get("town_4_seed");
var gen = new Generator(seed);

new S_TownFloor(50, 1050, 2000, 1000, "005_world_map");

new S_Church(950, 300, "007_church4");

new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 500, 100, 1000, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Alchemy, 10000, 1825, 900, gen.get());
new S_Store(ABILITIES_ARCHETYPES_NAMES.Diplomat, 1000, 1200, 375, gen.get());
new S_Store(ABILITIES_ARCHETYPES_NAMES.Spirit, 1000, 1500, 600, gen.get());


var houseFiller = new Filler(gen);
houseFiller.set_zone(75, 1025, 1950, 950);
houseFiller.set_tries(5, 60);
houseFiller.set_object(120, 160, function(x,y,g){ return new S_House(CITIES.indulgence, x, y, g); });
houseFiller.fill_by_retry();

var villagerFiller = new Filler(gen);
villagerFiller.set_zone(75, 1025, 1950, 950);
villagerFiller.set_tries(35, 120);//this.gen.int(10) - 7
villagerFiller.set_object(50, 60, function(x,y,g){ return new M_Villager(CITIES.indulgence, x, y, g); });
villagerFiller.fill_by_retry();
