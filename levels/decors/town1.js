

var seed = DICTIONARY.get("town_1_seed");
var gen = new Generator(seed);

new S_TownFloor(150, 1950, 1800, 1800, "005_world_map");

new S_Church(1000, 1050);

new S_Store("Weapon", 200, 600, 1050, gen.get());



var s = new S_Store("Occult", 200, 800, 1050, gen.get());
s.enter = function() {
  CURRENTLEVEL.setup("004_occultshop");
};

var houseFiller = new Filler(gen);
houseFiller.set_zone(150 + 50, 150 + 1800 - 50, 1800 - 100,  1800 - 100);
houseFiller.set_tries(5, 100);
houseFiller.set_object(120, 160, function(x,y,g){ return new S_House(x, y, g); });
houseFiller.fill_by_retry();


if (!PARTY.has_member(PARTYMEMBERS.PreciousChild)){
  var preciousChild  = new M_ChildM(1150, 1150);
  preciousChild.interaction = function() {
    this.face_character();
    BATTLE.api.make('_party/_PreciousChild');
   };
}
