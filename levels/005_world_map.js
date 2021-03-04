
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


new SM_Town(250, 1750, "004_town", DICTIONARY.get("town_1"));
CURRENTLEVEL.initialize_with_character(280, 1760, 0.6);
