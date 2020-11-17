AUDIO.music.town();

var seed = DICTIONARY.get("town_1_seed");
var gen = new TownGenerator(seed, 1800, 1800);

gen.build();

var g = gen.church_entrance();
CURRENTLEVEL.initialize_with_character(g[0], g[1]);
