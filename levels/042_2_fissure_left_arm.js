
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.fissure();
var gen = new Generator(DICTIONARY.get("world_seed")*21);

// ===================
//hack 1. FLOORS
// ===================
new S_Floor(1300,1775,225,200);

new S_Floor(1250,2600,175,1025);
new S_Floor(1200,2650,275,300);

new S_Floor(1075,2400,200,50);
new S_Floor(1400,2400,200,50);
new S_Floor(1200,2825,50,275);
new S_Floor(1425,2825,50,275);
new S_Floor(1315,2900,50,350);

// ===================
//hack 2. EXIT
// ===================
new S_ExitFloor(1500,1775,50,200, "042_fissure_trunk");

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

var prophecy = function() {
  TextBannerSequence.make(["You find a column on which some text is inscribed in a variety of different languages. You soon find a fragment you can read.",
                           "Holy among all things, Precious above all else<br />MYSELF must be center of all my attentions<br />To be cherished, revered and heralded supreme"]);
}
var t = new S_event(1325, 2850);
t.interaction = prophecy;


// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var decorFiller = new Filler(gen.get());

decorFiller.set_zone(875,3000,900,1525);
decorFiller.set_tries(5, 15);
decorFiller.set_object(175, 50, function(x,y,seed){ return new S_RocksHuge(x, y); });
decorFiller.fill_decor_by_retry();
decorFiller.set_tries(5, 10);
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks1(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks2(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks3(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks4(x, y); });
decorFiller.fill_by_retry();

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================


var events = new EventFiller(decorFiller);
events.set_zone(1200,2675,275,1100);
events.battle('caves/bloodsucker', 0.1);
events.battle('caves/bat');
events.battle('caves/mole', 0.8);
events.battle('caves/scorpion');
events.battle('caves/crawler');

events.set_tries(30, 50);
events.fill_by_retry();


// ===================
//hack 7. START/INIT
// ===================
CURRENTLEVEL.initialize_with_character(1450,1700);

// boss = rhino
