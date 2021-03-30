

var seed = DICTIONARY.get("town_1_seed");
var gen = new Generator(seed);

new S_TownFloor(150, 150 + 1800, 1800, 1800, "005_world_map");

new S_Church(150 + 1800 / 2 - 50, 150 + 1800 / 2);


new S_Store("Weapon", 150 + 1800 / 2 - 50 - 400, 150 + 1800 / 2, gen.get());
new S_Store("Element", 150 + 1800 / 2 - 50 - 200, 150 + 1800 / 2, gen.get());

var houseFiller = new Filler(gen);
houseFiller.set_zone(150 + 50, 150 + 1800 - 50, 1800 - 100,  1800 - 100);
houseFiller.set_tries(5, 100);
houseFiller.set_object(120, 160, function(x,y,g){ return new S_House(x, y, g); });
houseFiller.fill_by_retry();
