
//AUDIO.music.town();
/*
var seed = DICTIONARY.get("town_1_seed");
var gen = new TownGenerator(seed, 1800, 1800);

gen.build();

var g = gen.church_entrance();*/

new S_Floor(50, 1050, 1000, 1000, 'obj_dark');
new S_Town(250, 250, "004_town", "004_town");
CURRENTLEVEL.initialize_with_character(300, 300, 0.6);
