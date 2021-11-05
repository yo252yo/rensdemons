// ===================
//hack 0. INITIALIZATION
// ===================
var floor = 0;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  floor = parseInt(s[1]);
}
var gen = new Generator(DICTIONARY.get("world_seed")*31 + floor);
AUDIO.music.levels.pandemonium();


// ===================
//hack 1. FLOORS
// ===================
new S_CastleFloor(950,1650,800,500);

// ===================
//hack 2. EXIT
// ===================

if(floor == 0){
  new S_ExitFloor(1300,1675,100,35, '050_hell_map');
}


// Even floors go up on right, odd floors go up on left
var is_odd = floor % 2;

var newfloor = function (is_up) {
  var r = floor;
  if (is_up){
    return r + 1;
  } else {
    return r - 1;
  }
}

// Left block
new S_Door(1200, 1150, is_odd, floor);
new S_CastleFloor(1225,1175,50,200);
new S_CastleFloor(1200,1050,100,100);
if (floor > 0){
  new S_Stairs(1225, 1025, is_odd, '051_pandemonium@' + newfloor(is_odd));
}

// Right block
new S_Door(1400, 1150, (!is_odd && floor != 6), floor);
new S_CastleFloor(1425,1175,50,200);
new S_CastleFloor(1400,1050,100,100);
if (floor < 6){
  new S_Stairs(1425, 1025, !is_odd, '051_pandemonium@' + newfloor(!is_odd));
}


if (floor < 6) {
  new S_CastleFloor(1700,1300,100,50);
  new S_ExitFloor(1775,1300,50,50);
  new S_CastleFloor(1700,1550,100,50);
  new S_ExitFloor(1775,1550,50,50);
  new S_CastleFloor(900,1550,75,50);
  new S_ExitFloor(875,1550,50,50);
  new S_CastleFloor(900,1300,75,50);
  new S_ExitFloor(875,1300,50,50);
}

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
if (floor == 6) {
  new S_Throne(1250, 1350);
} else {
  new S_SavePoint(1325, 1200);
}
// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================
// ===================
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================
if (floor == 6) {
  new S_Maou(1200, 1550);
}

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================



// ===================
//hack 7. START/INIT
// ===================

if(floor == 0){
  CURRENTLEVEL.initialize_with_character(1375, 1650);
} else if(floor % 2 == 1) {
  CURRENTLEVEL.initialize_with_character(1450, 1050);
} else {
  CURRENTLEVEL.initialize_with_character(1250, 1050);
}
