
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.fissure();
var gen = new Generator(DICTIONARY.get("world_seed")*24);

// ===================
//hack 1. FLOORS
// ===================
new S_WebFloor(1250,2650,325,1075);
new S_WebFloor(1025,2650,550,175);

// ===================
//hack 2. EXIT
// ===================
new S_ExitFloor(1250,1600,325,50, "042_fissure_trunk");

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
var prophecy = function() {
  TextBannerSequence.make(["You find a column on which some text is inscribed in a variety of different languages. You soon find a fragment you can read.",
                           "Pity be to her soul and to her hollow ways<br />For Individuals have no need for a guide<br />Killed by the Human Pride to emancipate Us<br />Long live our glorious Selves, the false goddess is DEAD"]);
}
var t = new S_event(1100, 2575);
t.interaction = prophecy;


// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

//decorFiller.set_zone(950,2875,1075,1525);

var filler = new Filler(gen.get());
var decorFiller = new MultiFiller(filler, 60, 50);
decorFiller.set_zone(950,2875,825,1525);
decorFiller.add_constructor( function(x,y,seed){ return new S_CristalSmall(x, y); });
decorFiller.add_constructor( function(x,y,seed){ return new S_RockColumn(x, y); });
decorFiller.add_constructor( function(x,y,seed){ return new S_Web(x, y); });

decorFiller.add_constructor( function(x,y,seed){ return new S_CristalBig(x, y); });
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks1(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks2(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks4(x, y); }, 0.1);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rocks3(x, y); }, 0.1);
decorFiller.set_tries(15, 30);
decorFiller.fill_decor_by_retry();

decorFiller.set_zone(1175,2675,425,1075)
decorFiller.add_constructor( function(x,y,seed){ return new S_CristalTiny(x, y); });
decorFiller.add_constructor( function(x,y,seed){ return new S_Bocals(x, y); }, 2);
decorFiller.add_constructor( function(x,y,seed){ return new S_Rubble(x, y); }, 2);
decorFiller.add_constructor( function(x,y,seed){ return new S_RubbleLarge(x, y); }, 2);

decorFiller.set_tries(40, 50);
decorFiller.fill_floor_by_retry();


// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

var events = new EventFiller(decorFiller);
events.set_zone(1175,2675,425,1075);
events.battle('caves/bloodsucker', 0.1);
events.battle('caves/bat');
events.battle('caves/mole', 0.8);
events.battle('caves/scorpion');
events.battle('caves/crawler');

events.set_tries(40, 50);
events.fill_floor_by_retry();


// ===================
//hack 7. START/INIT
// ===================
CURRENTLEVEL.initialize_with_character(1375,1650);

// boss = rhino
