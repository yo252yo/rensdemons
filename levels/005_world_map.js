
AUDIO.music.map();
/*
var seed = DICTIONARY.get("town_1_seed");
var gen = new TownGenerator(seed, 1800, 1800);

gen.build();

var g = gen.church_entrance();*/

new S_Floor(50, 2050, 1000, 2000, 'obj_dark');


// do not keep, just a test
new S_Town(550, 550, "004_town", DICTIONARY.get("town_2"), function() { return false;});


new S_Town(250, 1750, "004_town", DICTIONARY.get("town_1"));
CURRENTLEVEL.initialize_with_character(280, 1760, 0.6);
