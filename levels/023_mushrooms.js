AUDIO.music.levels.mushrooms();

var f = new S_Floor(900,2500,200,75, 'obj_dark', '010_world_map');

new S_Floor(950,2450,100,500);
new S_Floor(625,2000,750,50);
new S_Floor(625,2250,50,525);
new S_Floor(1325,2150,50,600);
new S_Floor(975,1975,50,375);
new S_Floor(1175,1600,475,50);
new S_Floor(1150,2150,400,50);
new S_Floor(1500,2350,50,425);
new S_Floor(1500,2350,300,50);
new S_Floor(1750,2500,50,325);
new S_Floor(1750,2500,300,50);
new S_Floor(1750,2225,200,50);
new S_Floor(1500,1975,525,50);
new S_Floor(1975,2075,50,350);
new S_Floor(1975,2075,275,50);
new S_Floor(1975,1775,250,50);
new S_Floor(1600,1725,50,400);
new S_Floor(1600,1725,225,50);
new S_Floor(1600,1375,375,50);
new S_Floor(1925,1525,50,400);
new S_Floor(1925,1525,275,50);
new S_Floor(475,2250,200,50);
new S_Floor(475,2375,50,275);
new S_Floor(250,2150,275,50);
new S_Floor(250,2275,50,300);
new S_Floor(400,1775,275,50);
new S_Floor(400,1950,50,425);
new S_Floor(200,1575,250,50);
new S_Floor(1800,1175,350,50);
new S_Floor(1175,1675,50,325);
new S_Floor(1100,1400,50,50);
new S_Floor(1100,1375,325,50);
new S_Floor(1375,1450,50,325);
new S_Floor(1275,1175,275,50);
new S_Floor(775,1650,325,50);
new S_Floor(775,1750,50,650);
new S_Floor(525,1150,475,50);
new S_Floor(525,1400,50,450);
new S_Floor(525,1400,50,450);
new S_Floor(200,1700,50,600);
new S_Floor(100,1150,300,50);
new S_Floor(375,1400,325,50);

// use actual seed
var gen = new Generator(1);
// could improve load by making these cosmetics and not level items
var treeFiller = new Filler(gen);
treeFiller.set_zone(150,2475,2100,1475);
treeFiller.set_tries(200, 200);
treeFiller.set_object(30, 10, function(x,y,g){ return new S_Tree(x, y); });
treeFiller.fill_by_retry(true);

new S_SavePoint(975, 2050);

//Ancient Armament Advisor


CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
  `You stand before the forest that the priest mentioned. It doesn't seem very dangerous, but you can tell that the lustrous vegetation becomes very dense quite fast, promising to make navigation a real challenge. Only a small trail seems walkable in the middle of the tangled mess of bushes.`,
  `$$BestFriend$: "What are we even looking for?"`,
  `$$Ren$: "Not sure... Some sort of irregularity? Things that could be ancient ruins, burrowed under the vegetation?"`,
  `$$BestFriend$: "That's going to be tough..."`,
  ], IO.control.character);
};

CURRENTLEVEL.initialize_with_character(1000, 2425);
