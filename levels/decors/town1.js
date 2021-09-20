
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.town.hope();

// ===================
//hack 2. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

var gen = new Generator(DICTIONARY.get("world_seed")*2);

new S_TownFloor(1050, 2050, 1000, 1000, "010_world_map");

new S_Church(1450, 1400, "004_trial_end");

new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 200, 1700, 1175, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Tool, 100, 1850, 1225, gen.get());

var s = new S_Store("Occult", 0, 1150, 1950, gen.get());
s.enter = function() {
  CURRENTLEVEL.setup("006_occultshop$");
};


// ===================
//hack 3. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 1975, 950,  975);
houseFiller.set_tries(5, 70);
houseFiller.set_object(120, 160, function(x,y,seed){ return new S_House(CITIES.hope, x, y, seed); });
houseFiller.fill_by_retry();

if (!PARTY.has_member(PARTYMEMBERS.PreciousChild)){
  var preciousChild  = new M_ChildM(1875, 1980);
  preciousChild.interaction = function() {
    this.face_character();
    BATTLE.api.make('_party/_PreciousChild');
   };
}

var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(1075, 1975, 1000, 975);
villagerFiller.set_tries(3, 30);//this.gen.int(10) - 7
villagerFiller.set_object(50, 60, function(x,y,seed){ return new M_Villager(CITIES.hope, x, y, seed); });
villagerFiller.fill_by_retry();
