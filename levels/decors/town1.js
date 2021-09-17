AUDIO.music.town.hope();

var gen = new Generator(DICTIONARY.get("world_seed")*2);

new S_TownFloor(50, 1050, 1000, 1000, "010_world_map");

new S_Church(450, 400, "004_trial_end");

new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 200, 700, 175, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Tool, 100, 850, 225, gen.get());

var s = new S_Store("Occult", 0, 150, 950, gen.get());
s.enter = function() {
  CURRENTLEVEL.setup("006_occultshop$");
};

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(75, 975, 950,  975);
houseFiller.set_tries(5, 70);
houseFiller.set_object(120, 160, function(x,y,seed){ return new S_House(CITIES.hope, x, y, seed); });
houseFiller.fill_by_retry();

if (!PARTY.has_member(PARTYMEMBERS.PreciousChild)){
  var preciousChild  = new M_ChildM(875, 980);
  preciousChild.interaction = function() {
    this.face_character();
    BATTLE.api.make('_party/_PreciousChild');
   };
}


var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(75, 975, 1000, 975);
villagerFiller.set_tries(3, 30);//this.gen.int(10) - 7
villagerFiller.set_object(50, 60, function(x,y,seed){ return new M_Villager(CITIES.hope, x, y, seed); });
villagerFiller.fill_by_retry();
