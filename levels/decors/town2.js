
var seed = DICTIONARY.get("town_2_seed");
var gen = new Generator(seed);

new S_TownFloor(50, 1550, 1500, 1500, "005_world_map");

new S_Church(700, 750, "006_church2");

new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 500, 1200, 300, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Tool, 200, 1225, 1225, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Alchemy, 100, 425, 850, gen.get());

var houseFiller = new Filler(gen);
houseFiller.set_zone(75, 1525, 1475, 1450);
houseFiller.set_tries(15, 100);
houseFiller.set_object(120, 160, function(x,y,g){ return new S_House(CITIES.fear, x, y, g); });
houseFiller.fill_by_retry();

var villagerFiller = new Filler(gen);
villagerFiller.set_zone(75, 1525, 1475, 1450);
villagerFiller.set_tries(2, 10);//this.gen.int(10) - 7
villagerFiller.set_object(50, 60, function(x,y,g){ return new M_Villager(CITIES.fear, x, y, g); });
villagerFiller.fill_by_retry();
