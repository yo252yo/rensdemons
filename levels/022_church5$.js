// ===================
//hack 0. INITIALIZATION
//hack 1. FLOORS -> EXITS
//hack 2. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new Snippet("levels/decors/temple");

var f = new S_ExitFloor(1250,1775,100,35, '022_town5');

new M_Trainer(1100, 1300, 0, ABILITIES_ARCHETYPES_NAMES.Diplomat, 750);
new M_Trainer(1475, 1150, 0, ABILITIES_ARCHETYPES_NAMES.Element, 2000);

var make_priest = function (x, y) {
  var priest = new M_Priest(x,y);
  priest.interaction = function() {
    this.face_character();

    new TextBannerRandom([
      "Priest: \"The Sacrifice is our most important ritual, so we spend most of our time preparing for it. There's not much to do, but it needs to be perfect.\"",
      "Priest: \"The people are usually eager to serve in the Sacrifice. We need to enforce a strict limit on the rate, or there wouldn't be anybody left in this town.\"",
      "Priest: \"May the Goddess accept our offering and have mercy on us. Though I guess it is presumptuous to think that our actions could influence Her.\"",
      "Priest: \"I wish it were my turn...\"",
      "Priest: \"The Sacrifice is important, because it gives us all something to look forward to. One day, each of us will have our turn!\"",
    ]);
 };
 return priest;
}

make_priest(1225, 1375);
make_priest(1200, 1450);
make_priest(1275, 1525);
make_priest(1350, 1450);
make_priest(1325, 1375);

var v = new M_Villager(CITIES.acceptance, 1275, 1450);
v.interaction = function() {
  this.face_character();
  TextBannerSequence.make([
    "Martyr: \"We're preparing for this month's Sacrifice.\"",
    "Martyr: \"We're a little early, but I'm just so eager to serve my community. I know that things will remain bad, but maybe I can help make them a little bit better.\"",
  ]);
};
// ===================
//hack 6. START/INIT
// ===================

CURRENTLEVEL.initialize_with_character(1275, 1750);
