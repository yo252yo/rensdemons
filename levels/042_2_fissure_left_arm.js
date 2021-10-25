
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.fissure();
var gen = new Generator(DICTIONARY.get("world_seed")*22);

// ===================
//hack 1. FLOORS
// ===================
new S_WebFloor(1300,1775,225,200);

new S_WebFloor(1250,2600,175,1025);
new S_WebFloor(1200,2650,275,300);

new S_WebFloor(1075,2400,200,50);
new S_WebFloor(1400,2400,200,50);
new S_WebFloor(1200,2825,50,275);
new S_WebFloor(1425,2825,50,275);
new S_WebFloor(1315,2900,50,350);

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

new S_WebLarge(1250,1600);


var filler = new Filler(gen.get());
var decorFiller = new MultiFiller(filler, 60, 50);
decorFiller.set_zone(875,3000,900,1600);
decorFiller.add_constructor( function(x,y,seed){ return new S_CristalSmall(x, y); });
decorFiller.add_constructor( function(x,y,seed){ return new S_RockColumn(x, y); });
decorFiller.add_constructor( function(x,y,seed){ return new S_Web(x, y); });

decorFiller.add_constructor( function(x,y,seed){ return new S_CristalBig(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks1(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks2(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks4(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks3(x, y); }, 0.1);
decorFiller.set_tries(15, 30);
decorFiller.fill_decor_by_retry();

decorFiller.set_zone(1050,2900,550,1350);
decorFiller.add_constructor( function(x,y,seed){ return new S_CristalTiny(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Bocals(x, y); }, 2);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rubble(x, y); }, 2);
decorFiller.add_constructor( function(x,y,seed){ return new S_RubbleLarge(x, y); }, 2);

decorFiller.set_tries(40, 50);
decorFiller.fill_floor_by_retry();

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
events.fill_floor_by_retry();


// ===================
//hack 7. START/INIT
// ===================
CURRENTLEVEL.initialize_with_character(1450,1700);

// boss = rhino
