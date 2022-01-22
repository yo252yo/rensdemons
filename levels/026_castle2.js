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

/*
var guardsthrone = function() {
    this.face_character();

    new TextBannerRandom([
      `Guard: "The throne room is up ahead. As the Promised Child, I can't deny you entry, but you should know that the King and his advisors are pretty busy with important matters of the state. You shouldn't bother them for nothing."`
      ]);
 };
 var g1 = new M_Guard(CITIES.fear,2500, 1775, gen.get());
 var g2 = new M_Guard(CITIES.fear,2615, 1775, gen.get());
 var g3 = new M_Guard(CITIES.fear,3170, 1430, gen.get());
 var g4 = new M_Guard(CITIES.fear,1920, 1430, gen.get());

g1.interaction = guardsthrone;
g2.interaction = guardsthrone;
g3.interaction = guardsthrone;
g4.interaction = guardsthrone;


var guardsentry = function() {
    this.face_character();

    new TextBannerRandom([
      `Guard: "This is the royal castle. You may enter, you're the Promised Child. But don't make a mess."`
      ]);
 };
var g3 = new M_Guard(CITIES.fear, 2500, 2550, gen.get());
var g4 = new M_Guard(CITIES.fear, 2615, 2550, gen.get());
g3.interaction = guardsentry;
g4.interaction = guardsentry;
*/


// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.setup_text_start_function([
  `$$DisguisedPrincess$: "Let's go! I hope you're ready!"`,
]);


CURRENTLEVEL.initialize_with_character(2025, 1875);
