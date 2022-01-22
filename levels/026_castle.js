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
