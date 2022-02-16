
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.town.hope();
var gen = new Generator(DICTIONARY.get("world_seed")*2);

// ===================
//hack 1. FLOORS
//hack 2. EXIT
// ===================
new S_TownFloor(1050, 2050, 1000, 1000, "010_world_map");

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

new S_Church(1450, 1400, "004_trial_end");

new S_Store(CITIES.hope, ITEMS_ARCHETYPES_NAMES.Weapon, 200, 1700, 1175, gen.get());
new S_Store(CITIES.hope, ITEMS_ARCHETYPES_NAMES.Tool, 100, 1850, 1225, gen.get());

var s = new S_Store(CITIES.hope, "Occult", 0, 1150, 1950, gen.get());
s.enter_function = function() {
  CURRENTLEVEL.setup("006_occultshop$");
};

if (!PARTY.has_member(PARTYMEMBERS.PreciousChild)){
  var preciousChild  = new M_PreciousChild(1875, 1980);
}

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 1975, 950,  975);
houseFiller.set_tries(5, 70);
houseFiller.add_constructor(function(x,y,seed){ return new S_House(CITIES.hope, x, y, seed); }, 1 ,120, 160);
houseFiller.fill_floor_by_retry();


var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(1075, 1975, 1000, 975);
villagerFiller.set_tries(3, 30);//this.gen.int(10) - 7
villagerFiller.add_constructor(function(x,y,seed){ return new M_Villager(CITIES.hope, x, y, seed); },1 , 50, 60);
villagerFiller.fill_floor_by_retry();

villagerFiller.set_tries(2, 6);
villagerFiller.add_constructor(function(x,y,seed){ return new M_Guard(CITIES.hope, x, y, seed); },1 , 50, 60);
villagerFiller.fill_floor_by_retry();
// ===================
//hack 6. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================
