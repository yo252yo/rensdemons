
var seed = DICTIONARY.get("town_5_seed");
var gen = new Generator(seed);

new S_TownFloor(50, 1550, 1000, 1500, "005_world_map");

new S_Church(850, 775);

new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 100000, 625, 700, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Tool, 100000, 175, 1050, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Alchemy, 100000, 375, 225, gen.get());


var houseFiller = new Filler(gen);
houseFiller.set_zone(75, 1525, 950, 1450);
houseFiller.set_tries(5, 40);
houseFiller.set_object(120, 160, function(x,y,g){ return new S_House(CITIES.acceptance, x, y, g); });
houseFiller.fill_by_retry();

var villagerFiller = new Filler(gen);
villagerFiller.set_zone(75, 1525, 950, 1450);
villagerFiller.set_tries(10, 30);//this.gen.int(10) - 7
villagerFiller.set_object(50, 60, function(x,y,g){ return new M_Villager(CITIES.acceptance, x, y, g); });
villagerFiller.fill_by_retry();
