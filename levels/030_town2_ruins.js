

// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.town.fear();
var gen = new Generator(DICTIONARY.get("world_seed")*3);

// ===================
//hack 1. FLOORS
//hack 2. EXIT
// ===================
new S_TownFloor(1050, 2550, 1500, 1500, "010_world_map");

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
var obj = [];
obj.push(new S_Church(1700, 1750, "020_church2"));
obj.push(new S_Castle(1075, 1425));
obj.push(new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 500, 2200, 1300, gen.get()));
obj.push(new S_Store(ITEMS_ARCHETYPES_NAMES.Tool, 200, 2225, 2225, gen.get()));
obj.push(new S_Store(ITEMS_ARCHETYPES_NAMES.Alchemy, 100, 1425, 1850, gen.get()));

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 2525, 1475, 1450);
houseFiller.set_tries(15, 100);
houseFiller.set_object(120, 160, function(x,y,seed){ obj.push(new S_House(CITIES.fear, x, y, seed)); });
houseFiller.fill_by_retry();

for(var o of obj) {
  var x = o.x;
  var y = o.y;
  if (o.h_w) {
    x += o.h_w / 2;
    y += o.h_h / 2;
  }
  o.destroy();
  new S_RubbleLarge(x, y);
}

//hack reset generator (i.e. new content)

var gen = new Generator(gen.get());

var rubbleFiller = new Filler(gen.get());
rubbleFiller.set_zone(1075, 2525, 1475, 1450);
rubbleFiller.set_tries(20, 40);
rubbleFiller.set_object(30, 30, function(x,y,seed){ return new S_Rubble(x, y); });
rubbleFiller.fill_by_retry();


rubbleFiller.set_object(50, 60, function(x,y,seed){ return new M_Villager(CITIES.fear, x, y, seed); });
rubbleFiller.fill_by_retry();

// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
    `When you approach $$town_2$, it is beyond recognition. Most buildings have been burnt to the ground. Mounts of blackened stone and wood are all that remain from the capital. Smoke still rises from some of the rubble.`,
    `The royal castle did not get a better fate. Only a slightly bigger pile of debris is there to attest that this was once the center of a human kingdom.`,
    `Under shock, $$BestFriend$ could barely hold back tears.`,
    `$$BestFriend$: "What... what happened here?"`,
  ], IO.control.character);
};

CURRENTLEVEL.initialize_with_character(1750, 2550);
