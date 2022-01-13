
// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.levels.slimes();

var slimepart = 1;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  slimepart = parseInt(s[1]);
}
var gen = new Generator((DICTIONARY.get("world_seed")+ slimepart)*61);


// ===================
//hack B. FLOORS
// ===================
var hallways = [];
var rooms = [];

if(slimepart == 2){
  // zone 4 hallways
  hallways.push(new S_MudFloor(1900,1125,525,100));
  hallways.push(new S_MudFloor(2075,1450,25,375));
  hallways.push(new S_MudFloor(1825,2475,50,575));
  hallways.push(new S_MudFloor(2200,1675,375,50));
  hallways.push(new S_MudFloor(1175,1600,550,50));
  hallways.push(new S_MudFloor(1150,1600,75,425));
  hallways.push(new S_MudFloor(1400,2225,950,25));
  hallways.push(new S_MudFloor(1525,2425,875,25));
  hallways.push(new S_MudFloor(1600,2750,25,550));
  hallways.push(new S_MudFloor(1575,2775,575,25));
  hallways.push(new S_MudFloor(2250,2950,50,625));

  // zone 4 rooms
  rooms.push(new S_MudFloor(1675,1975,600,600));
  rooms.push(new S_MudFloor(1075,1250,225,275));
  rooms.push(new S_MudFloor(2025,3000,350,175));
  // zone 3 hallways
  hallways.push(new S_MudFloor(2325,3300,925,125));
  hallways.push(new S_MudFloor(3150,3675,100,475));
  hallways.push(new S_MudFloor(3150,3675,500,50));
  hallways.push(new S_MudFloor(2525,3225,50,775));
  hallways.push(new S_MudFloor(2525,2575,500,125));
  hallways.push(new S_MudFloor(3000,2525,25,500));
  hallways.push(new S_MudFloor(3225,1850,650,75));
  hallways.push(new S_MudFloor(3800,2075,75,300));
  hallways.push(new S_MudFloor(3825,2075,1500,50));
  hallways.push(new S_MudFloor(5300,2075,25,1100));
  hallways.push(new S_MudFloor(3675,1225,1650,50));
  hallways.push(new S_MudFloor(3550,1825,75,550));
  hallways.push(new S_MudFloor(4000,1525,50,350));
  hallways.push(new S_MudFloor(4000,1525,200,50));
  hallways.push(new S_MudFloor(4150,1650,50,175));
  hallways.push(new S_MudFloor(4150,1650,200,50));
  hallways.push(new S_MudFloor(4300,2075,50,475));
  hallways.push(new S_MudFloor(5300,1550,650,100));
  hallways.push(new S_MudFloor(5725,1525,75,225));
  hallways.push(new S_MudFloor(3050,1225,400,25));
  hallways.push(new S_MudFloor(3050,1525,50,325));
  hallways.push(new S_MudFloor(2625,1550,475,25));
  hallways.push(new S_MudFloor(2625,1525,50,325));

  // zone 3 rooms
  rooms.push(new S_MudFloor(2800,2075,475,325));
  rooms.push(new S_MudFloor(3400,1325,325,300));
  rooms.push(new S_MudFloor(2375,1275,425,225));

}  else if(slimepart == 1) {
  // zone 2 hallways
  hallways.push(new S_MudFloor(3750,3925,125,1025));
  hallways.push(new S_MudFloor(4325,2925,625,50));
  hallways.push(new S_MudFloor(4900,3325,50,450));
  hallways.push(new S_MudFloor(4900,3325,225,50));
  hallways.push(new S_MudFloor(5075,4050,50,775));
  hallways.push(new S_MudFloor(5075,4075,850,75));
  hallways.push(new S_MudFloor(4675,3875,450,50));
  hallways.push(new S_MudFloor(5075,3550,400,100));

  hallways.push(new S_MudFloor(4650,2925,75,500));
  hallways.push(new S_MudFloor(6200,3475,1025,100));
  hallways.push(new S_MudFloor(6700,3425,50,1225));
  hallways.push(new S_MudFloor(5925,2250,825,50));
  hallways.push(new S_MudFloor(5925,2725,50,525));
  hallways.push(new S_MudFloor(7150,4300,75,925));
  hallways.push(new S_MudFloor(7150,4175,825,75));

  hallways.push(new S_MudFloor(5800,4300,1425,50));
  hallways.push(new S_MudFloor(5800,4525,50,275));
  hallways.push(new S_MudFloor(5625,4525,225,50));
  hallways.push(new S_MudFloor(5625,4725,50,250));
  hallways.push(new S_MudFloor(5500,4725,175,50));
  new S_MudFloor(2350,3350,200,125);

  // zone 2 rooms
  rooms.push(new S_MudFloor(3575,2975,825,400));
  rooms.push(new S_MudFloor(4600,2475,300,250));
  rooms.push(new S_MudFloor(5450,3600,800,400));
  rooms.push(new S_MudFloor(5000,4825,550,300));

  // zone 1 hallways
  hallways.push(new S_MudFloor(2175,5225,75,500));
  hallways.push(new S_MudFloor(1450,4800,775,75));
  hallways.push(new S_MudFloor(1450,4800,75,350));
  hallways.push(new S_MudFloor(1200,4525,325,75));
  hallways.push(new S_MudFloor(1200,4525,75,475));
  hallways.push(new S_MudFloor(1200,4125,1325,75));
  hallways.push(new S_MudFloor(2450,4450,75,400));
  hallways.push(new S_MudFloor(1600,4125,75,625));
  hallways.push(new S_MudFloor(4850,2300,1100,25));

  hallways.push(new S_MudFloor(1175,3100,100,950));
  hallways.push(new S_MudFloor(1175,2225,375,75));
  hallways.push(new S_MudFloor(1475,2700,75,550));
  hallways.push(new S_MudFloor(1475,2700,775,50));
  hallways.push(new S_MudFloor(2200,3125,50,475));

  hallways.push(new S_MudFloor(2275,3825,50,300));
  hallways.push(new S_MudFloor(2275,3825,650,50));
  hallways.push(new S_MudFloor(2875,4075,50,300));
  hallways.push(new S_MudFloor(2875,4075,500,50));
  hallways.push(new S_MudFloor(2200,4925,975,50));
  hallways.push(new S_MudFloor(3125,4925,50,275));
  hallways.push(new S_MudFloor(3125,4700,750,50));
  hallways.push(new S_MudFloor(3825,4875,50,225));
  hallways.push(new S_MudFloor(3825,4875,1050,50));

  hallways.push(new S_MudFloor(4200,4125,325,75));
  hallways.push(new S_MudFloor(4450,4675,75,875));
  hallways.push(new S_MudFloor(4450,4675,450,75));
  hallways.push(new S_MudFloor(4825,4975,75,375));
  hallways.push(new S_MudFloor(4825,4975,400,50));

  // rooms
  rooms.push(new S_MudFloor(1100,3575,1300,500));
  rooms.push(new S_MudFloor(3325,4375,925,525));

  // Entrance
  rooms.push(new S_MudFloor(2075,5500,300,300));
}


// ===================
//hack C. EXIT
// ===================
var exit;
if(slimepart == 2) {
  new S_ExitFloor(5925,1550,50,100, '015_slimes@3');
  exit = new S_ExitFloor(2300,3300,50,125, '015_slimes@1');
}  else if(slimepart == 1) {
  exit = new S_ExitFloor(2100,5525,250,50, '010_world_map');
  new S_ExitFloor(2525,3350,50,125, '015_slimes@2');
}



// ===================
//hack D. UNIQUE ELEMENTS
// ===================
if(slimepart == 2) {
  new S_SavePoint(3045, 1895);

  new SBattle(5775, 1565, '#doorD', 125);
  new SBattle(2325, 1140, '#doorC', 125);
}  else if(slimepart == 1) {
  new S_SavePoint(1875, 3350);
  new S_SavePoint(2200, 5350);
  new S_SavePoint(5750, 3425);

  new SBattle(2375, 3350, '#doorB', 125);
  new SBattle(3750, 3875, '#doorA', 125);

  new M_GeniusProdigy(3875, 3925);
}


// ===================
//hack E. DECOR
// ===================

var filler = new Filler(gen.get());
var bigDecorFiller = new MultiFiller(filler, 100, 100);
var smallDecorFiller = new MultiFiller(filler, 50, 50);

var rocks = 1/slimepart;
var cristals = 1*slimepart;

bigDecorFiller.add_default_constructor("S_RockColumn", rocks);
bigDecorFiller.add_default_constructor("S_RockLump", rocks);
bigDecorFiller.add_default_constructor("S_CristalBig", cristals);

smallDecorFiller.add_default_constructor("S_Rocks4", rocks);
smallDecorFiller.add_default_constructor("S_Rocks3", rocks);
smallDecorFiller.add_default_constructor("S_CristalTiny", cristals);
smallDecorFiller.add_default_constructor("S_CristalSmall", cristals);
smallDecorFiller.add_default_constructor("S_CristalFragment", cristals);
smallDecorFiller.add_default_constructor("S_Caveplant", 0.7 + 0.5 * cristals);
smallDecorFiller.add_default_constructor("S_Cavesprouts", 0.7 + 0.5 * cristals);


for(var f of rooms) {
  var base = Math.max(1, Math.round(5 * (f.w * f.h) / 200000));
  bigDecorFiller.set_tries(base, 1.5 * base);
  smallDecorFiller.set_tries(base, 1.5 * base);
  bigDecorFiller.set_zone(f.x-50,f.y+50,f.w+100,f.h+100);
  bigDecorFiller.fill_decor_by_retry();
  smallDecorFiller.set_zone_from_floor(f);
  smallDecorFiller.fill_decor_by_retry();
}

// ===================
//hack F. EVENTS
// ===================


var events = new EventFiller(bigDecorFiller, 5, 75);

events.battle('caves/bloodsucker', 0.1);
events.set_tries(1, 1 + slimepart);
for(var f of hallways) {
  events.set_zone(f.x,f.y+5,f.w,f.h);
  events.fill_floor_by_retry();
}
for(var f of rooms) {
  events.set_tries(3, 3 + slimepart * 2);
  events.set_zone_from_floor(f);
  events.fill_floor_by_retry();
}
// ===================
//hack G. START/INIT
// ===================

exit.initialize_with_character();
