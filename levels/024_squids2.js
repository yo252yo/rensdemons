AUDIO.music.levels.squids();
var gen = new Generator(DICTIONARY.get("dungeons_seed"));

new S_Floor(75,375,625,50);
new S_Floor(650,700,350,375);
new S_Floor(1050,850,275,525);
new S_Floor(950,375,150,50);
new S_Floor(1275,375,225,50);
new S_Floor(1450,450,50,125);
new S_Floor(1350,450,150,50);
new S_Floor(1350,525,50,125);
new S_Floor(1350,525,225,50);
new S_Floor(1525,525,50,200);
new S_Floor(1525,375,125,50);
new S_Floor(1600,675,50,350);
new S_Floor(1525,675,125,50);
new S_Floor(1525,675,50,125);
new S_Floor(1450,600,125,50);
new S_Floor(1450,750,50,200);
new S_Floor(1450,750,200,50);
new S_Floor(1600,825,50,125);
new S_Floor(1450,825,200,50);
new S_Floor(1450,900,50,125);
new S_Floor(1450,900,275,50);
new S_Floor(1675,900,100,575);
new S_Floor(1725,425,125,100);



var filler = new Filler(gen);
filler.set_zone(625,925,1200,650);
filler.set_tries(5, 20);
filler.set_object(50, 50, function(x,y,g){ return new S_Seashell(x, y); });
filler.fill_by_retry();
filler.set_object(50, 50, function(x,y,g){ return new S_Seashellpointy(x, y); });
filler.fill_by_retry();


filler.set_tries(25, 50);
filler.set_event([
//  new SB_rubble(x, y, ITEM.Elixir_fire),
//  new SE_small_treasure(x, y, ITEM.Stone),
  function(x,y,g){ return new SB_event(x, y, '...');},
], 10);
filler.fill_by_retry();


new S_Floor(1800,425,75,100, 'obj_dark', '024_squids');


CURRENTLEVEL.initialize_with_character(100, 350);
IO.control.character();
