
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


if(slimepart == 1) {
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
} else if(slimepart == 2){
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

} else if (slimepart == 3){

  // zone 1
  hallways.push(new S_RockFloor(6050,1475,25,375));
  hallways.push(new S_RockFloor(6050,1125,175,25));
  hallways.push(new S_RockFloor(6225,1500,50,225));
  hallways.push(new S_RockFloor(6150,1300,300,25));
  hallways.push(new S_RockFloor(6300,1525,475,25));
  hallways.push(new S_RockFloor(6425,1400,25,125));
  hallways.push(new S_RockFloor(6425,1400,275,25));
  hallways.push(new S_RockFloor(6675,1750,25,375));
  hallways.push(new S_RockFloor(6150,1825,25,300));

  hallways.push(new S_RockFloor(6425,2575,275,75));

  hallways.push(new S_RockFloor(5900,1750,675,25));
  hallways.push(new S_RockFloor(6850,1575,300,25));
  hallways.push(new S_RockFloor(7125,2300,25,750));
  hallways.push(new S_RockFloor(6925,2300,225,25));
  hallways.push(new S_RockFloor(6925,2300,25,375));
  hallways.push(new S_RockFloor(6500,1950,450,25));
  hallways.push(new S_RockFloor(6675,1750,375,25));
  hallways.push(new S_RockFloor(7025,2125,25,400));
  hallways.push(new S_RockFloor(5975,2175,25,450));
  hallways.push(new S_RockFloor(5975,2175,400,25));
  hallways.push(new S_RockFloor(6350,2175,25,200));


  hallways.push(new S_RockFloor(7125,1825,175,25));
  hallways.push(new S_RockFloor(7275,2750,25,950));
  hallways.push(new S_RockFloor(7025,2575,550,25));
  hallways.push(new S_RockFloor(7550,3000,25,450));
  hallways.push(new S_RockFloor(7375,3000,200,25));
  hallways.push(new S_RockFloor(7375,3000,25,150));
  hallways.push(new S_RockFloor(7275,2875,125,25));
  hallways.push(new S_RockFloor(6875,2650,250,25));
  hallways.push(new S_RockFloor(7100,2750,25,125));
  hallways.push(new S_RockFloor(6725,3375,25,750));
  hallways.push(new S_RockFloor(6475,2250,25,275));
  hallways.push(new S_RockFloor(6475,2250,400,25));
  hallways.push(new S_RockFloor(6800,2475,25,450));
  hallways.push(new S_RockFloor(6650,2150,175,25));
  hallways.push(new S_RockFloor(6650,2250,25,175));
  hallways.push(new S_RockFloor(6200,3525,475,25));
  hallways.push(new S_RockFloor(6675,3875,25,375));
  hallways.push(new S_RockFloor(6675,3875,325,25));
  hallways.push(new S_RockFloor(6825,3500,675,25));
  hallways.push(new S_RockFloor(7025,3500,25,375));
  hallways.push(new S_RockFloor(7150,3625,25,350));
  hallways.push(new S_RockFloor(7225,3500,25,525));
  hallways.push(new S_RockFloor(7350,3575,25,350));
  hallways.push(new S_RockFloor(7350,3250,225,25));

  hallways.push(new S_RockFloor(5675,2525,775,25));
  hallways.push(new S_RockFloor(5675,2725,25,575));
  hallways.push(new S_RockFloor(6475,2925,25,375));
  hallways.push(new S_RockFloor(6150,2925,350,25));
  hallways.push(new S_RockFloor(6400,3250,25,350));
  hallways.push(new S_RockFloor(6300,3250,125,25));
  hallways.push(new S_RockFloor(6250,3175,25,200));
  hallways.push(new S_RockFloor(6300,2925,25,225));
  hallways.push(new S_RockFloor(6050,3175,150,25));
  hallways.push(new S_RockFloor(6050,3175,25,500));
  hallways.push(new S_RockFloor(5925,2700,150,25));
  hallways.push(new S_RockFloor(5450,2800,375,25));
  hallways.push(new S_RockFloor(5450,2800,25,300));
  hallways.push(new S_RockFloor(5175,3675,25,500));
  hallways.push(new S_RockFloor(5175,3675,275,25));
  hallways.push(new S_RockFloor(5425,3675,25,250));
  hallways.push(new S_RockFloor(5425,3450,625,25));
  hallways.push(new S_RockFloor(5725,3550,25,125));
  hallways.push(new S_RockFloor(5325,3375,875,25));
  hallways.push(new S_RockFloor(5850,3100,225,25));
  hallways.push(new S_RockFloor(5850,3225,25,325));
  hallways.push(new S_RockFloor(5650,3225,225,25));
  hallways.push(new S_RockFloor(5650,3225,25,325));
  hallways.push(new S_RockFloor(5650,2925,225,25));
  hallways.push(new S_RockFloor(5475,3000,200,25));
  hallways.push(new S_RockFloor(5475,3150,25,175));
  hallways.push(new S_RockFloor(5275,3150,225,25));


  hallways.push(new S_RockFloor(5350,2400,25,200));
  hallways.push(new S_RockFloor(4950,2225,625,25));
  hallways.push(new S_RockFloor(5350,2975,25,475));
  hallways.push(new S_RockFloor(4925,2450,375,25));
  hallways.push(new S_RockFloor(4925,3000,25,575));
  hallways.push(new S_RockFloor(4775,2825,175,25));
  hallways.push(new S_RockFloor(4625,3150,25,275));
  hallways.push(new S_RockFloor(4625,3150,250,25));
  hallways.push(new S_RockFloor(4850,3300,25,175));
  hallways.push(new S_RockFloor(4850,3300,225,25));
  hallways.push(new S_RockFloor(5050,3300,25,475));
  hallways.push(new S_RockFloor(5050,2850,175,25));
  hallways.push(new S_RockFloor(5200,3050,25,225));
  hallways.push(new S_RockFloor(4925,2675,325,25));
  hallways.push(new S_RockFloor(4575,2550,450,25));
  hallways.push(new S_RockFloor(4575,2750,25,225));
  hallways.push(new S_RockFloor(5350,2300,350,25));


  // NO EVENT ON THIS BATCH, ending
  new S_RockFloor(5675,4100,75,375);
  new S_RockFloor(5675,4100,650,25);
  new S_RockFloor(6300,4700,25,625);
  new S_RockFloor(4450,4700,1875,25);
  new S_RockFloor(4450,4700,25,400);
  new S_RockFloor(3525,4325,950,25);
  new S_RockFloor(3525,4850,25,550);
  new S_RockFloor(3475,5000,150,175);


  // Entrance
  rooms.push(new S_RockFloor(5925,1550,400,100));

  // rooms
  rooms.push(new S_RockFloor(6725,1600,150,175));
  rooms.push(new S_RockFloor(6350,2000,175,175));
  rooms.push(new S_RockFloor(5800,2800,150,150));
  rooms.push(new S_RockFloor(6675,2650,225,200));
  rooms.push(new S_RockFloor(6175,3425,150,275));
  rooms.push(new S_RockFloor(5125,3200,175,175));
  rooms.push(new S_RockFloor(5625,3750,200,225));

  rooms.push(new S_RockFloor(6975,3000,325,175));
  rooms.push(new S_RockFloor(5275,2525,200,150));
  rooms.push(new S_RockFloor(6650,3525,200,175));
  rooms.push(new S_RockFloor(4550,2900,250,175));
}


// ===================
//hack C. EXIT
// ===================
var exit;
if(slimepart == 1) {
  exit = new S_ExitFloor(2100,5525,250,50, '010_world_map');
  new S_ExitFloor(2525,3350,50,125, '015_slimes@2');
}  else if(slimepart == 2) {
  new S_ExitFloor(5925,1550,50,100, '015_slimes@3');
  exit = new S_ExitFloor(2300,3300,50,125, '015_slimes@1');
} else if(slimepart == 3) {
  exit = new S_ExitFloor(5925,1550,50,100, '015_slimes@2');
  var shortcut = new S_ExitFloor(3525,5025,50,50, '010_world_map');
  shortcut.interaction = function(){
    if(INVENTORY.count(ITEM.War_hammer)){
      TextBannerSequence.make([
        `You brandish your new found weapon and strike the wall of the cavern. To your surprise, the war hammer plows through it without much resistance.`,
        `You made an opening in the wall. Through it, rays of light pierce into the room. You need a minute for your eyes to adjust for the new brightness, before you realize that you opened a passage to the outside.`,
        `You marvel at the thickness of the rock that you just casually smashed, before climbing your way in the gap`,
        `You take a moment to breathe the fresh breeze to empty your lungs of the stale dry air of the grottos.`,
      ], function(){ CURRENTLEVEL.setup("010_world_map") });
    } else {
      TextBannerSequence.make([
        `The cavern wall appears to be normal.`,
      ]);
    }
  }
}


// ===================
//hack D. UNIQUE ELEMENTS
// ===================



if(slimepart == 1) {
  new S_SavePoint(1875, 3350);
  new S_SavePoint(2200, 5350);
  new S_SavePoint(5750, 3425);

  new S_SlimeDoor(3750, 3875, 'A');
  new S_SlimeTip(2425, 4450, 1);
  new S_SlimeTip(1525, 2175, 2);
  new S_SlimeTip(5200, 4975, 3);
  new S_SlimeTip(4425, 3825, 4);

  new S_SlimeDoor(2375, 3350, 'B');
  new S_SlimeTip(4975, 4700, 5);
  new S_SlimeTip(5925, 2750, 6);
  new S_SlimeTip(5900, 4050, 7);
  new S_SlimeTip(3800, 2600, 8);

  new M_GeniusProdigy(3875, 3925);
}  else if(slimepart == 2) {
  new S_SavePoint(3045, 1895);
  new S_SavePoint(1975, 1675);

  new S_SlimeDoor(2325, 1140, 'C');
  new S_SlimeTip(3550, 1050, 9);
  new S_SlimeTip(5300, 1000, 10);
  new S_SlimeTip(3625, 3675, 11);
  new S_SlimeTip(4175, 1525, 12);

  new S_SlimeDoor(5775, 1565, 'D');
  new S_SlimeTip(1175, 1000, 13);
  new S_SlimeTip(2000, 2925, 14);
  new S_SlimeTip(1875, 1100, 15);
  new S_SlimeTip(1525, 2450, 16);
} else if (slimepart == 3){
  new S_SavePoint(6450, 1925);
  new S_SavePoint(5875, 2750);
  new S_SavePoint(5700, 4050);

  new S_SlimeDoor(6625, 2600, 'E');
  new S_SlimeTip(6775, 1450, 17);
  new S_SlimeTip(6950, 2925, 18);
  new S_SlimeTip(6650, 3375, 19);
  new S_SlimeTip(6650, 2125, 20);

  new S_SlimeDoor(5650, 3775, 'F');
  new S_SlimeTip(5350, 2975, 21);
  new S_SlimeTip(4925, 3000, 22);
  new S_SlimeTip(6300, 2750, 23);
  new S_SlimeTip(5325, 3375, 24);


  new SBattle(3512, 4850, 'caves/lizard');

  var b = new SE_groundItem(3525, 4950, ITEM.War_hammer);
  var take = function(){
    INVENTORY.increase(ITEM.War_hammer);
    b.destroy();
  }

  b.interaction = function(){
    TextBannerSequence.make([
      `Behind the corpse of the defeated monster, you discover the treasure it was hoarding. There's a pile of rusty armors and weapons, probably looted from the dead corpses of adventurers unfortunate enough to wander near the beast's lair. Most of these are in a pretty decrepit state and don't seem like they could be of any use.`,
      `However, a single object catches your eye. In the middle of the decayed weapons, a war hammer shines like if it was new. Its metallic surface project silvery rays on the linings of the cave. The intricate design of the object is a remanent of a long gone craftsmanship. Perhaps not even human.`,
      `You grab the handle and discover that you can lift this behemoth of a weapon, albeit not without a certain effort. But you feel like the weight in your hand is infinitesimal compared to its striking power. It seems that it could crush anything.`
    ], take);
  };

}


// ===================
//hack E. DECOR
// ===================

var filler = new Filler(gen.get());
var bigDecorFiller = new MultiFiller(filler, 80, 80);
var smallDecorFiller = new MultiFiller(filler, 40, 40);

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
  var base = Math.max(2, Math.round(5 * (f.w * f.h) / 200000));
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

events.battle('caves/bloodsucker', 0.2);
events.battle('caves/mole', 1);
events.battle('caves/crawler', 0.5);
events.battle('caves/slime', 1.5 + slimepart);
events.battle('caves/bat', 1.5);


events.groundItem(ITEM.Stone, 1 / slimepart);
events.groundItem(ITEM.Bone, 0.7);
events.groundItem(ITEM.Mushroom, 0.3);
events.groundItem(ITEM.AncientRubbles, 0.5 * slimepart);
events.battleRubble(ITEM.Goo, 0.5 * slimepart);
events.battleRubble(ITEM.Elixir_decay, 0.2);
events.battleRubble(ITEM.Elixir_chaos, 0.1);
events.battleRubble(ITEM.Sword_iron, 0.01);
events.battleRubble(ITEM.Spear, 0.01);
events.battleRubble(ITEM.Axe, 0.01);

events.byConstructor("EB_Skeleton", 0.5);

events.text(`You find traces of blue sludge on the ground. You summarize that a slimy monster must have recently passed here.`, 0.5);
events.text(`You accidentally step into a puddle of yellowish slime, and curse yourself as you shake your still wet feet.`, 0.5);
events.text(`You see what appears to be a tiny slime sucking on a rock crystal. The crystal loses in color as the one of the monster strengthens.`, 0.5);
events.text(`You hide when you hear a pack of slimes sliding down a tunnel. They spread themselves around shiny crystals nearby in an attempt to ingest them. There's a cracking noise, and the rocks disappear into a myriad of dusty fragments inside their translucent bodies.`, 0.5);
events.text(`You hear a loud rumble in the distance. You pray that this is not a cave-in blocking your way out...`, 0.5);
events.text(`In this place, the ground is especially humid. You struggle to make your way through the thick mud.`, 0.5);
events.text(`You ponder at tiny tunnels branching out from your path. They must have been created by moles and other animals that now inhabit this abandonned mine.`, 0.5);
events.text(`The atmosphere around you is thick with mineral dust. Every breath you take is an effort, and every time you speak you feel like your mouth is full of sand.`, 0.5);
events.text(`You find a trail of pink goo that a slime left in its wake. Intrigued, you follow it, but it goes straight into the wall.`, 0.5);
events.text(`You find yourself facing a giant purple slime. You start to get ready for battle, but to your surprise the monster recoils and collapses on the ground. You see its mass diminish, not understanding fully what is happening. By the time you figure out that the ground is soaking up the slime, nothing is left but a vaguely colorful puddle.`, 0.5);


events.set_tries(1, 1 + slimepart);
for(var f of hallways) {
  events.set_zone(f.x,f.y+5,f.w,f.h);
  events.fill_floor_by_retry();
}
events.set_tries(2, 2 + slimepart * 2);
for(var f of rooms) {
  events.set_zone_from_floor(f);
  events.fill_floor_by_retry();
}
// ===================
//hack G. START/INIT
// ===================

if(slimepart == 1){
  CURRENTLEVEL.setup_text_start_function([
    `You enter an opening you saw on the facade of a little rocky hill. To your surprise, it seems to burrow into the ground in a large network of tunnels. The regular shape of those shafts make you think they were probably man-made. You have no idea how deep this goes.`,
  ]);
} else if(slimepart == 2){
  CURRENTLEVEL.setup_text_start_function([
    `You continue your progression further into the abyss.`,
    `$$BestFriend$: "Are you sure you want to go there?"`,
  ]);
} else if(slimepart == 3){
  CURRENTLEVEL.setup_text_start_function([
    `Most of the tunnels are now barely wide enough for one person to fit. The air is heavy and hard to breathe. Complete silence oppresses you.`,
  ]);
}


exit.initialize_with_character();
