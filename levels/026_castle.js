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

if(! PARTY.has_member(PARTYMEMBERS.DisguisedPrincess)){
  new M_DisguisedPrincess(2000, 1925);
}

new S_SavePoint(2100, 1975);



// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.setup_text_start_function([
  `When you enter the castle, the place is teeming with activity. Guards run down hallways, well-dressed guests yell at each other. You wonder what could be causing such commotion. Could it be your arrival?`,
  `$$BestFriend$: "Something is going on here... Are we under attack?"`,
  `It becomes clear that everyone is fully invested in some sort of event, that has nothing to do with you.`,
]);



CURRENTLEVEL.initialize_with_character(2575, 2575);
