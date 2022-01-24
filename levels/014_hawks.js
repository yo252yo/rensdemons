// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.levels.hawks();

var hawkpart = 1;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  hawkpart= parseInt(s[1]);
}
var gen = new Generator((DICTIONARY.get("world_seed")+ hawkpart)*61);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================

var centerX = 1000 + 1500;
var centerY = 1000 + 1500;

var paths = [200, 150, 100, 75,  50];
var sizes = [1400,  900, 600, 400, 200];

var o = Math.floor((hawkpart-1) / 4);
var path = paths[o];
var size = sizes[o];

var exit;

switch(hawkpart % 4){
  case 1:
    new S_Floor(centerX-size, centerY+size,           size, path);
    var destination = hawkpart > 1 ? "014_hawks@" + (hawkpart-1) : "010_world_map";
    exit = new S_ExitFloor(centerX-size+size-25, centerY+size,           50, path, destination);
    new S_Floor(centerX-size, centerY+size,           path, size);
    new S_ExitFloor(centerX-size, centerY+size-size+25,           path, 50, "014_hawks@" + (hawkpart+1));
  break;
  case 2:
    new S_Floor(centerX-size, centerY-size + path,    size, path);
    new S_ExitFloor(centerX-size+size-25, centerY-size + path,    50, path, "014_hawks@" + (hawkpart+1));
    new S_Floor(centerX-size, centerY,                path, size);
    exit = new S_ExitFloor(centerX-size, centerY+25,                path, 50, "014_hawks@" + (hawkpart-1));
  break;
  case 3:
    new S_Floor(centerX, centerY-size + path,         size, path);
    exit = new S_ExitFloor(centerX-25, centerY-size + path,  50, path, "014_hawks@" + (hawkpart-1));
    new S_Floor(centerX+size - path, centerY,         path, size);
    new S_ExitFloor(centerX+size - path, centerY+25,  path, 50, "014_hawks@" + (hawkpart+1));
  break;
  case 0: // 4
    new S_Floor(centerX, centerY+size,                size, path);
    if (hawkpart < 20){
      new S_ExitFloor(centerX-25, centerY+size,       50, path, "014_hawks@" + (hawkpart+1));
    }
    new S_Floor(centerX+size - path, centerY+size,    path, size);
    exit = new S_ExitFloor(centerX+size - path, centerY+size-size+25,  path, 50, "014_hawks@" + (hawkpart-1));
  break;
}

if (hawkpart == 20){ // summit
  new S_Floor(2475,2700,50,150);
  new S_Floor(2400,2600,200,200);
}

// ===================
//hack D. UNIQUE ELEMENTS
// ===================

if(hawkpart % 4 == 1){
  new S_SavePoint(exit.x - 125, exit.y + 25 - (path-50)/2);
}
if(hawkpart == 20){
  new SBattle(2475, 2650, 'mountains/phoenix');
  new SBattle(2475, 2500, '#wand'); // WIP TODO
}

// ===================
//hack F. EVENTS
// ===================

// ===================
//hack G. START/INIT
// ===================

if(hawkpart == 1){
  CURRENTLEVEL.setup_text_start_function([
    `You find yourself at the bottom of the tallest mountain you've ever seen. It is bound to be an arduous climb.`,
  ]);
}

exit.initialize_with_character(2500, 2500);
