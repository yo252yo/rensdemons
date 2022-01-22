// ===================
//hack A. INITIALIZATION (sound, etc...)
//hack B. FLOORS
//hack C. EXIT
// ===================

var gen = new Generator(DICTIONARY.get("world_seed")*7);

new Snippet("levels/decors/castle");


// ===================
//hack D. UNIQUE ELEMENTS
// ===================



// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.setup_text_start_function([
  `$$DisguisedPrincess$: "Let's go! I hope you're ready!"`,
]);


CURRENTLEVEL.initialize_with_character(2025, 1875);
