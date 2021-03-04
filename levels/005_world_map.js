
AUDIO.music.map();
/*
var seed = DICTIONARY.get("town_1_seed");
var gen = new TownGenerator(seed, 1800, 1800);

gen.build();

var g = gen.church_entrance();*/

INTERFACE.make_compass();

new S_Floor(50, 2050, 1000, 2000, 'obj_dark');


// do not keep, just a test
new SM_Town(550, 550, "004_town", DICTIONARY.get("town_2"), function() { return false;});
/*
var seed = DICTIONARY.get("town_1_seed");
var gen = new Generator(seed);

for (var i =50; i< 600; i+=200){
for (var j =50; j< 600; j+=200){
new SM_Trees(100+i, 1550-j, gen);
}
}*/

  var seed = Math.random();
var gen = new Generator(seed);
var houseFiller = new Filler(gen);
houseFiller.set_zone(50, 2050, 1000, 2000);
houseFiller.set_tries(3, 8);

houseFiller.set_object(100, 100, function(x,y,g){ return new SM_Trees(x, y, g);});
houseFiller.fill_by_retry();

houseFiller.set_object(300, 200, function(x,y,g){ return new SM_Lake(x, y, g);});
houseFiller.fill_by_retry();

houseFiller.set_object(300, 150, function(x,y,g){ return new SM_Mountain(x, y, g);});
houseFiller.fill_by_retry();

houseFiller.set_object(200, 100, function(x,y,g){ return new SM_Hills(x, y, g);});
houseFiller.fill_by_retry();


new SM_Town(250, 1750, "004_town", DICTIONARY.get("town_1"));
CURRENTLEVEL.initialize_with_character(280, 1760, 0.6);
