
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.fissure();
var gen = new Generator(DICTIONARY.get("world_seed")*21);

// ===================
//hack 1. FLOORS
// ===================
new S_Floor(1250,2650,325,1075);
new S_Floor(1025,2650,550,175);

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

var decorFiller = new Filler(gen.get());
decorFiller.set_zone(950,2875,1075,1525);
decorFiller.set_tries(5, 15);
decorFiller.set_object(175, 50, function(x,y,seed){ return new S_RocksHuge(x, y); });
decorFiller.fill_by_retry(true);
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
events.set_zone(1175,2675,425,1075);
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
CURRENTLEVEL.initialize_with_character(1375,1650);

// boss = rhino
