AUDIO.music.levels.harpies();

var f = new S_Floor(900,2500,200,75, 'obj_dark', '010_world_map');


// main
new S_Floor(950,2450,100,175);
new S_Floor(950,2325,450,125);
new S_Floor(1325,2400,200,275);
new S_Floor(1375,2175,100,450);
new S_Floor(1325,1775,200,275);
new S_Floor(1200,1700,175,125);
new S_Floor(1200,2025,100,375);
new S_Floor(550,2025,700,100);
new S_Floor(425,2100,175,250);
new S_Floor(475,1875,50,500);
new S_Floor(400,1450,200,175);
new S_Floor(550,1375,175,50);
new S_Floor(675,1725,50,400);
new S_Floor(625,1775,150,125);
new S_Floor(725,1725,350,50);
new S_Floor(1000,1775,75,150);
new S_Floor(1025,1675,25,350);
new S_Floor(850,1350,200,25);
new S_Floor(825,1400,100,150);


// shortcut
new S_Floor(975,2250,25,125);
new S_Floor(825,2150,175,25);
new S_Floor(825,2275,25,150);
new S_Floor(725,2275,125,25);
new S_Floor(725,2275,25,150);
new S_Floor(600,2150,150,25);
new S_Floor(600,2275,25,150);
new S_Floor(500,2275,125,25);
new S_Floor(500,2275,25,225);

// extra 1
new S_Floor(1400,1525,25,125);
new S_Floor(1400,1425,75,25);
new S_Floor(1450,1425,25,100);
new S_Floor(1325,1350,150,25);
new S_Floor(1325,1350,25,100);
new S_Floor(1325,1275,150,25);
new S_Floor(1450,1300,75,75);

// extra 2
new S_Floor(300,1975,150,25);
new S_Floor(300,1975,25,150);
new S_Floor(300,1850,100,25);
new S_Floor(375,1850,25,125);
new S_Floor(300,1750,100,25);
new S_Floor(300,1750,25,125);
new S_Floor(300,1650,100,25);
new S_Floor(375,1650,75,75);

// extra 3
new S_Floor(325,2275,200,25);
new S_Floor(325,2275,25,100);
new S_Floor(325,2200,75,25);
new S_Floor(375,2200,25,75);
new S_Floor(300,2150,100,25);
new S_Floor(300,2150,25,100);
new S_Floor(300,2100,75,75);

// door
new S_Floor(850,1250,50,25, 'obj_dark', '010_world_map');


console.log("todo Ancient Armament Ammunition");

CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
    `You stand in front of a tall mountain. There is a sort of path climbing up towards the summit. Up there, mythical creatures fly around the peak, cutting through the clouds and letting out screeching cries that chill you to the bone.`,
    `$$BestFriend$: "Is there really an ancient refuge here?"`,
    `$$Ren$: "I suppose we'll have to find out."`,
  ], IO.control.character);
};

CURRENTLEVEL.initialize_with_character(1000, 2425);
