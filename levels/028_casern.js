// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================

var gen = new Generator(DICTIONARY.get("world_seed")*91);

AUDIO.music.characters.RetiredProtector();

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================

new S_TilingFloor(1775,2300,500,500);
var exit = new S_ExitFloor(1950,2325,150,50, "022_town5");

// ===================
//hack D. UNIQUE ELEMENTS
// ===================


// ===================
//hack E. DECOR
// ===================

var f = new Filler(gen.get());
var filler = new MultiFiller(f, 50, 50);
filler.set_zone(1775,2300,550,550);

filler.set_tries(7, 10);
filler.add_default_constructor("M_RetiredProtector");
filler.fill_floor_by_retry();

filler.clear();
filler.set_tries(25, 30);
filler.add_default_constructor("B_Bucket");
filler.add_default_constructor("B_Table");
filler.add_default_constructor("B_Jar");
filler.add_default_constructor("B_Stool");
filler.add_default_constructor("B_Barrel");



filler.fill_floor_by_retry();

// ===================
//hack F. EVENTS
// ===================


// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.setup_text_start_function([
  `You enter what appears to be a decrepit casern. You can tell that it hasn't been maintained in a while. Where you'd expect to see alert soldiers and piles of weapons, there's only old soldiers chit chatting and playing cards.`,
]);

exit.initialize_with_character(2575, 2575);
