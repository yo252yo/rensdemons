
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.fissure();
var gen = new Generator(DICTIONARY.get("world_seed")*21);

// ===================
//hack 1. FLOORS
// ===================
new S_Floor(1100,1775,225,200);

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
new S_ExitFloor(1075,1775,50,200, "042_fissure_trunk");

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

var prophecy = function() {
  TextBannerSequence.make(["You find a column on which some text is inscribed in a variety of different languages. You soon find a fragment you can read.",
                           "Man alone bathed in the light of Intelligence<br />So it is His duty to spread Enlightenment<br />Thus He is entitled to dominion over EVERYTHING"]);
}
var t = new S_event(1325, 2850);
t.interaction = prophecy;


// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var filler = new Filler(gen.get());
filler.set_zone(875,3000,900,1525);
var bigDecorFiller = new MutliFiller(filler, 200, 50);

bigDecorFiller.add_constructor( function(x,y,seed){ return new S_Web(x, y); }, 2);
bigDecorFiller.add_constructor( function(x,y,seed){ return new S_RocksHuge(x, y); }, 2);
bigDecorFiller.add_constructor( function(x,y,seed){ return new S_WebLarge(x, y); }, 0.1);

bigDecorFiller.set_tries(5, 10);
bigDecorFiller.fill_decor_by_retry();

var decorFiller = new MutliFiller(filler, 60, 50);
decorFiller.add_constructor( function(x,y,seed){ return new S_CristalSmall(x, y); });
decorFiller.add_constructor( function(x,y,seed){ return new S_RockColumn(x, y); });
decorFiller.add_constructor( function(x,y,seed){ return new S_Web(x, y); });

decorFiller.add_constructor( function(x,y,seed){ return new S_CristalBig(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks1(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks2(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks4(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks3(x, y); }, 0.1);
decorFiller.set_tries(5, 30);
decorFiller.fill_decor_by_retry();

decorFiller.add_constructor( function(x,y,seed){ return new S_CristalTiny(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Bocals(x, y); }, 2);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rubble(x, y); }, 2);
decorFiller.add_constructor( function(x,y,seed){ return new S_RubbleLarge(x, y); }, 2);

decorFiller.set_tries(70, 100);
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
CURRENTLEVEL.initialize_with_character(1125,1700);

// boss = rhino
