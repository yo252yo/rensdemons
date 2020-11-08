
new S_Floor(100,1900,1800,1800);

new S_Church(900, 900);

CURRENTLEVEL.initialize_with_character(1000, 950);

var seed = DICTIONARY.get("town_1_seed");

var gen = new Generator(seed);

var nb_tries = 3 + 100 * gen.get();


function canBuild(x,y) {
  var free = true;
  x -= 5;
  y -= 5;
  free = free && CURRENTLEVEL.io.is_walkable(x,y);
  free = free && CURRENTLEVEL.io.is_walkable(x+180,y-150);
  free = free && CURRENTLEVEL.io.is_walkable(x+180,y);
  free = free && CURRENTLEVEL.io.is_walkable(x,y-150);
  free = free && CURRENTLEVEL.io.is_walkable(x+80,y-70);

  return free;
}

for(var i = 0; i < nb_tries; i++) {
  var x = 100 + gen.get() * 1550;
  var y = 150 + gen.get() * 1600;

  if (canBuild(x,y)) {
    new S_House(x, y, gen.get());
  }
}
