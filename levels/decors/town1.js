

var seed = DICTIONARY.get("town_1_seed");
var gen = new Generator(seed);

new S_TownFloor(50, 1050, 1000, 1000, "005_world_map");

new S_Church(450, 400);

new S_Store("Weapon", 200, 700, 175, gen.get());
new S_Store("Tool", 200, 850, 225, gen.get());

var s = new S_Store("Occult", 0, 150, 950, gen.get());
s.enter = function() {
  CURRENTLEVEL.setup("004_occultshop");
};

var houseFiller = new Filler(gen);
houseFiller.set_zone(75, 975, 950,  975);
houseFiller.set_tries(5, 70);
houseFiller.set_object(120, 160, function(x,y,g){ return new S_House("hope", x, y, g); });
houseFiller.fill_by_retry();

if (!PARTY.has_member(PARTYMEMBERS.PreciousChild)){
  var preciousChild  = new M_ChildM(875, 980);
  preciousChild.interaction = function() {
    this.face_character();
    BATTLE.api.make('_party/_PreciousChild');
   };
}
