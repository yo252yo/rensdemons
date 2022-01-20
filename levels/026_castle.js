// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================

AUDIO.music.levels.castle();
var gen = new Generator(DICTIONARY.get("world_seed")*7);



// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================

var exit = new S_ExitFloor(2500,2500,150,50, "020_town2");

new S_TilingFloor(2500,2475,150,900);
new S_TilingFloor(2625,2300,525,100);
new S_TilingFloor(1975,2300,550,100);
new S_TilingFloor(2625,1800,525,100);
new S_TilingFloor(1975,1800,550,100);


new S_TilingFloor(1975,1675,1175,400);


new S_TilingFloor(1975,1975,175,150);
var rooms = [];
rooms.push(new S_TilingFloor(1975,2175,250,175));
rooms.push(new S_TilingFloor(2250,2175,225,175));
rooms.push(new S_TilingFloor(2175,1975,125,150));
rooms.push(new S_TilingFloor(2325,1975,150,150));
rooms.push(new S_TilingFloor(2675,2175,125,350));
rooms.push(new S_TilingFloor(2825,1975,325,150));
rooms.push(new S_TilingFloor(2825,2175,175,175));
rooms.push(new S_TilingFloor(3025,2175,125,175));

rooms.push(new S_TilingFloor(1975,2475,200,150));
rooms.push(new S_TilingFloor(2200,2475,150,150));
rooms.push(new S_TilingFloor(2375,2475,100,150));
rooms.push(new S_TilingFloor(2675,2475,175,150));
rooms.push(new S_TilingFloor(2875,2475,275,150));


new S_TilingFloor(2050,2375,50,125);
new S_TilingFloor(2250,2375,50,125);
new S_TilingFloor(2400,2375,50,125);
new S_TilingFloor(2000,2250,50,125);
new S_TilingFloor(2325,2250,50,125);
new S_TilingFloor(2000,1875,50,125);
new S_TilingFloor(2200,1875,50,125);
new S_TilingFloor(2350,1875,50,125);
new S_TilingFloor(2600,2025,125,50);
new S_TilingFloor(3000,2375,50,125);
new S_TilingFloor(2600,2425,125,50);
new S_TilingFloor(2900,2250,50,125);
new S_TilingFloor(3075,2250,50,125);
new S_TilingFloor(3000,1875,50,125);

// ===================
//hack D. UNIQUE ELEMENTS
// ===================

new M_DisguisedPrincess(2000, 1925);
new B_Bed(2075, 1900);

new S_RoyalThrone(2550, 1325);

new S_Column(2475, 1625);
new S_Column(2625, 1625);
new S_Column(2475, 1500);
new S_Column(2625, 1500);
new S_Column(2475, 1375);
new S_Column(2625, 1375);
new S_Column(1975, 1625);
new S_Column(1975, 1500);
new S_Column(1975, 1375);
new S_Column(3125, 1375);
new S_Column(3125, 1500);
new S_Column(3125, 1625);

new S_StainedGlass(2650, 1300, 'man');
new S_StainedGlass(2425, 1300, 'man');
new S_StainedGlass(2750, 1300, 'man');
new S_StainedGlass(2850, 1300, 'man');
new S_StainedGlass(2950, 1300, 'man');
new S_StainedGlass(3050, 1300, 'man');
new S_StainedGlass(2325, 1300, 'man');
new S_StainedGlass(2225, 1300, 'man');
new S_StainedGlass(2125, 1300, 'man');
new S_StainedGlass(2025, 1300, 'man');

new S_GameBoard(2700, 1625);

// ===================
//hack E. DECOR
// ===================

var f = new Filler(gen.get());
var filler = new MultiFiller(f, 50, 50);
filler.set_tries(3, 6);

filler.add_default_constructor("B_Chest");
filler.add_default_constructor("B_Bucket");
filler.add_default_constructor("B_Jar");
filler.add_default_constructor("B_Stool");
filler.add_default_constructor("B_Housefire");
filler.add_default_constructor("B_Statue");
filler.add_default_constructor("B_WeaponRack", 2);


for (var f of rooms) {
  filler.set_zone_from_floor(f);
  filler.fill_floor_by_retry();
}

// ===================
//hack F. EVENTS
// ===================


// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.setup_text_start_function([
  `When you enter the castle, the place is teeming with activity. Guards run down hallways, well-dressed guests yell at each other. You wonder what could be causing such commotion. Could it be your arrival?`,
  `$$BestFriend$: "Something is going on here... Are we under attack?"`,
  `It becomes clear that everyone is fully invested in some sort of event, that has nothing to do with you.`,
]);


exit.initialize_with_character();
