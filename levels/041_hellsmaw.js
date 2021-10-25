
// ===================
//hack 0. INITIALIZATION
// ===================

var hellsmawpart = 1;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  hellsmawpart= s[1];
}

var gen = new Generator(DICTIONARY.get("world_seed")*17 + hellsmawpart);

AUDIO.music.levels.hellsmaw();

var decor = new Filler(gen.get());
var events = new EventFiller(decor, 1);

// ===================
//hack 1. FLOORS
//hack 2. EXIT
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
var summitExit = '041_hellsmaw@8';// changes later

if(hellsmawpart == 1){
  new S_MudFloor(1875,2500,275,200);

  new S_MudFloor(1925,2325,75,275);
  new S_MudFloor(1750,2075,200,50);
  new S_MudFloor(1750,2075,50,175);
  new S_MudFloor(1925,2075,425,75);
  new S_MudFloor(2275,2050,75,225);

  new S_ExitFloor(1950,2525,125,50, '010_world_map');
  new S_ExitFloor(1750,1925,50,50, '041_hellsmaw@2', [2000, 2500]);
  new S_ExitFloor(2275,1850,75,50, '041_hellsmaw@3', [2000, 2500]);

  new S_SavePoint(1900,2450,50,50);

  decor.set_zone(1500,2700,1100,1000);
  events.set_zone(1725,2400,625,575);
}
else if(hellsmawpart == 2){
  new S_MudFloor(1950,2475,75,400);
  new S_MudFloor(1750,2125,250,50);
  new S_MudFloor(1950,2100,50,275);
  new S_MudFloor(1950,1875,225,50);
  new S_MudFloor(1950,2125,450,50);
  new S_MudFloor(2350,2125,50,150);
  new S_MudFloor(2200,2225,50,275);
  new S_MudFloor(2200,2250,175,50);

  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw', [1775,1950]);
  new S_ExitFloor(1725,2125,50,50, '041_hellsmaw@5', [2000, 2500]);
  new S_ExitFloor(2150,1875,50,50, '041_hellsmaw@6', [2000, 2500]);
  new S_ExitFloor(2350,2000,50,50, '041_hellsmaw@4', [2000, 2500]);

  decor.set_zone(1500,2700,1100,1000);
  events.set_zone(1750,2472,650,675);
}
else if(hellsmawpart == 3){
  new S_MudFloor(1950,2475,75,300);
  new S_MudFloor(1850,2300,125,50);
  new S_MudFloor(1950,2200,225,50);
  new S_MudFloor(2125,2200,50,150);
  new S_MudFloor(1950,2175,50,200);
  new S_MudFloor(1800,2025,200,50);

  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw', [2300,1850]);
  new S_ExitFloor(1825,2300,50,50, '041_hellsmaw@4', [2525,2475]);
  new S_ExitFloor(2125,2075,50,50, '041_hellsmaw@7', [2000, 2500]);

  decor.set_zone(1625,2700,725,875);
  events.set_zone(1775,2450,425,500);
} else if(hellsmawpart == 4){
  new S_MudFloor(1975,2500,625,50);
  new S_MudFloor(2125,2650,300,325);

  new S_ExitFloor(2550,2500,75,50, '041_hellsmaw@3', [1850,2275]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@2', [2375,2025]);

  decor.set_zone(1775,2775,1000,575);
  events.set_zone(2000,2675,575,375);
} else if(hellsmawpart == 5){
  new S_MudFloor(1750,2500,250,50);
  new S_MudFloor(1650,2575,200,200);
  new S_MudFloor(1550,2225,200,50);
  new S_MudFloor(1700,2750,75,575);
  new S_MudFloor(1700,2750,225,50);

  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@2', [1775,2100]);

  decor.set_zone(1450,2850,700,775);
  events.set_zone(1525,2775,425,625);
} else if(hellsmawpart == 6){
  new S_MudFloor(1950,2475,75,700);
  new S_MudFloor(1600,2125,725,75);
  new S_MudFloor(1925,2150,125,125);

  new S_ExitFloor(1575,2125,50,75, '041_hellsmaw@10', [2000, 2500]);
  new S_ExitFloor(1950,1800,75,50, '041_hellsmaw@9', [2000, 2500]);
  new S_ExitFloor(2300,2125,50,75, '041_hellsmaw@8', [2000, 2500]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@2', [2175,1850]);

  decor.set_zone(1425,2625,1125,1025);
  events.set_zone(1650,2425,600,575);
} else if(hellsmawpart == 7){
  new S_MudFloor(1950,2475,75,700);
  new S_MudFloor(1675,2175,300,50);
  new S_MudFloor(1675,2175,50,150);
  new S_MudFloor(1675,2050,100,50);
  new S_MudFloor(1725,2050,50,150);
  new S_MudFloor(1500,1950,275,50);
  new S_MudFloor(1725,1950,150,50);
  new S_MudFloor(1825,1950,50,375);

  new S_ExitFloor(1475,1950,50,50, '041_hellsmaw@8', [2600,2300]);
  new S_ExitFloor(1950,1800,75,50, '041_hellsmaw@11', [2000, 2500]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@3', [2150,2050]);

  decor.set_zone(1350,2650,900,1200);
  events.set_zone(1575,2425,475,875);
} else if(hellsmawpart == 8){
  new S_MudFloor(1950,2475,75,175);
  new S_MudFloor(1950,2325,650,50);
  new S_MudFloor(2175,2350,175,175);
  new S_MudFloor(2225,2200,50,250);
  new S_MudFloor(2075,1975,200,50);
  new S_MudFloor(2075,1975,50,175);
  new S_MudFloor(2075,1850,375,50);

  new S_ExitFloor(2425,1850,50,50, '041_hellsmaw@12', [1800,2150]);
  new S_ExitFloor(2575,2325,50,50, '041_hellsmaw@7', [1500,1925]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@6', [2325,2100]);

  new S_SavePoint(2275,2250);

  decor.set_zone(1800,2625,950,950);
  events.set_zone(1925,2425,625,575);
} else if(hellsmawpart == 9){
  new S_MudFloor(1950,2475,75,225);

  new S_MudFloor(1950,2275,325,50);
  new S_MudFloor(2225,2350,50,125);
  new S_MudFloor(2225,2350,175,50);
  new S_MudFloor(2350,2350,50,275);
  new S_MudFloor(2100,2125,300,75);
  new S_MudFloor(2100,2100,50,150);
  new S_MudFloor(2100,1975,150,50);
  new S_MudFloor(2200,1975,50,150);
  new S_MudFloor(1975,1875,275,50);
  new S_MudFloor(1975,1875,50,300);
  new S_MudFloor(1850,1625,175,50);
  new S_MudFloor(1850,1625,50,150);
  new S_MudFloor(2200,1875,325,50);
  new S_MudFloor(2475,1875,50,400);

  new S_ExitFloor(1850,1500,50,50, '041_hellsmaw@10', [2550,2000]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@6', [1975,1775]);

  decor.set_zone(1775,2650,875,1325);
  events.set_zone(1850,2425,700,975);
} else if(hellsmawpart == 10){
  new S_MudFloor(1950,2475,75,175);
  new S_MudFloor(1825,2350,200,50);
  new S_MudFloor(1800,2475,50,350);
  new S_MudFloor(1650,2475,200,50);
  new S_MudFloor(1800,2175,400,50);
  new S_MudFloor(2150,2175,175,200);
  new S_MudFloor(2275,2025,275,50);
  new S_MudFloor(2200,2000,50,175);
  new S_MudFloor(2100,1875,150,50);

  new S_ExitFloor(2525,2025,50,50, '041_hellsmaw@9', [1875,1475]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@6', [1600,2100]);

  decor.set_zone(1525,2550,1150,875);
  events.set_zone(1625,2500,925,700);
} else if(hellsmawpart == 11){
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@7', [1975,1775]);

  new S_MudFloor(1950,2475,75,250);
  new S_MudFloor(1950,2250,225,50);
  new S_MudFloor(2125,2250,50,275);
  new S_MudFloor(2125,2025,250,50);
  new S_MudFloor(2350,2050,200,200);
  new S_MudFloor(1950,2225,75,175);
  new S_MudFloor(1725,2100,300,50);

  decor.set_zone(1625,2550,1000,825);
  events.set_zone(1700,2500,875,700);
} else if(hellsmawpart == 12){
  new S_MudFloor(1950,2475,75,625);
  new S_MudFloor(1800,2275,350,275);

  new S_ExitFloor(1775,2175,50,100, summitExit, [2450,1825]);
  new S_ExitFloor(1950,1875,75,50, '041_hellsmaw@13', [2000, 2500]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@13', [1975, 1900]);

  decor.set_zone(1600,2650,700,1000);
  events.set_zone(01,01,300,300);
} else if(hellsmawpart == 13){
  new S_MudFloor(1950,2475,75,625);
  new S_MudFloor(1800,2275,350,275);

  new S_ExitFloor(1775,2175,50,100, summitExit, [2450,1825]);
  new S_ExitFloor(1950,1875,75,50, '041_hellsmaw@12', [2000, 2500]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@12', [1975, 1900]);

  new S_Beelzebub(1900, 2200);

  decor.set_zone(1600,2650,700,1000);
  events.set_zone(01,01,300,300);
} else {
  CONSOLE.error("Requested unimplemented hellsmawpart: " + hellsmawpart);
}


// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

decor.set_tries(2, 10);
decor.set_object(175, 50, function(x,y,seed){ return new S_RocksHuge(x, y); });
decor.fill_decor_by_retry();
decor.set_tries(1, 5);
decor.set_object(50, 20, function(x,y,seed){ return new S_Rocks1(x, y); });
decor.fill_decor_by_retry();
decor.set_object(50, 20, function(x,y,seed){ return new S_Rocks2(x, y); });
decor.fill_decor_by_retry();
decor.set_object(50, 20, function(x,y,seed){ return new S_Rocks3(x, y); });
decor.fill_decor_by_retry();
decor.set_object(50, 20, function(x,y,seed){ return new S_Rocks4(x, y); });
decor.fill_decor_by_retry();


// ===================
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

events.battle('world/arsonist', 2);
events.battle('world/djinn', 2);
events.battle('world/knight', 2);
events.battle('world/vadhaka', 2);

events.battle('hell/devilfly', 2);
events.battle('hell/sandworm', 2);
events.battle('hell/serpentine', 2);
events.battle('hell/toad', 2);
events.battle('hell/warlock', 2);

events.groundItem(ITEM.Bone, 1.2);
events.groundItem(ITEM.Stone, 1.2);
events.groundItem(ITEM.Goo);
events.battleRubble(ITEM.Arrow);
events.battleRubble(ITEM.Rope);
events.battleRubble(ITEM.Spear, 0.1);
events.battleRubble(ITEM.Shield, 0.1);
events.battleRubble(ITEM.Elixir_decay, 0.1);
events.battleRubble(ITEM.Elixir_chaos, 0.1);
events.battleRubble(ITEM.Elixir_venom, 0.2);
events.battleRubble(ITEM.Elixir_vine, 0.2);
events.byConstructor("B_Skeleton");

events.text(`You cross an especially thick portion of fog. The stench is unbearable. You can't help but cough from the abrasive effect on your throat.`);
events.text(`Violent shrieks echo in the valley. You and $$BestFriend$ exchange a worried glance, wondering what kind of inhuman creature can make such ungodly noises.`);
events.text(`You've been climbing for hours. Each step is a bit more painful than the previous one. You're starting to worry that you'll never make it out of this hazy maze...`);
events.text(`You find gigantic footsteps in the ground. Whatever monster left this trail, it would no doubt easily crush your skull. You hope that the Goddess will not abandon you...`);
events.text(`Your ascension is tiresome, your surroundings are scary. You try to take comfort in the fact that the final fight approaches, and your quest is almost over. But an intuition sent by the Goddess gives you the unpleasant hunch that things might not be so simple...`);
events.text(`You're starting to wonder if this rocky desolate inferno really has an exit. Fortunately, the Goddess fills your heart with certainty that however dire the trial may seem, there is necessarily a way forward.`);

events.set_tries(20, 60);
events.fill_by_retry();


if(hellsmawpart == 1){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `You arrive at the foot of a mountain chain. The rock is black and rises steeply in contrast to the surrounding meadow, as if some sort of massive otherworldly spike perforated the ground. Every now and then, you can hear an ominous rumbling in the distance. The smell of sulfur overwhelms you and makes it hard to breathe. From the summit, a thick grey fog runs down the slopes and makes it impossible to see what lies ahead of you..."`,
      `$$BestFriend$: "So this is it, this is $$demon_lord$'s hideout?"`,
      `$$Ren$: "I think so... This is the heart of enemy territory! Let's be extra careful, it must be swarming with demons..."`,
      `Next to you, an old worn out altar stands as the last stand of civilization.`,
      `The track you can climb is thin and unreliable. Pretty soon, it forks into different paths shrouded in fog that crawl up the sharp facade. You pray that the Goddess leads you to the right one...`,
    ], IO.control.character);
  };
} else if(hellsmawpart == 4){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `You arrive on an island in the middle of a little lake of lava. The boiling liquid warms up the atmosphere to a point that makes it hard to breathe.`,
      `$$BestFriend$: "Let's not linger, ok?"`,
    ], IO.control.character);
  };
} else if(hellsmawpart == 5){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `The path in front of you has been blocked by rocks piled up in a landslide.`,
      `$$Ren$: "Looks like we can't go this way..."`,
    ], IO.control.character);
  };
} else if(hellsmawpart == 6){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
    `$$BestFriend$: "How long have we been here? This place is a hellish maze..."`,
    `$$Ren$: "I don't know anymore... Everything looks the same... It feels like we're not making progress..."`,
    `$$BestFriend$: "The evil magic of this place is getting to us... We cannot give up and let them win!"`,
    ], IO.control.character);
  };
} else if(hellsmawpart == 7){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `$$BestFriend$: "Let's take a little break, please."`,
      `You agree. You share a small meal and drink plenty of water to gather forces for the climb to come. But this is not a very restful stop: you can't help but staying on your guard, not relaxing your mind for even a second...`,
    ], IO.control.character);
  };
} else if(hellsmawpart == 8){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `$$BestFriend$: "I can't take it anymore! How much longer is this going to be?"`,
      `$$Ren$: "Look, an altar! Surely it's the Goddess' way to tell us we're very close to our goal! We better pray!"`,
    ], IO.control.character);
  };
} else if(hellsmawpart == 10){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `You keep making your way on the thin track among cascades of abrasive fog. You can tell that next to you, the floor gives in into a huge cliff. You cannot even see the bottom.`,
      `$$Ren$: "Let's be very careful, we won't surive this fall..."`,
    ], IO.control.character);
  };
} else if(hellsmawpart == 12){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `You arrive at what appears to be the summit. In front of you, the ground caves in, forming a crater where the fog is so thick that you cannot see the ground. All around, columns of lava suddenly raise up and explode, projecting flurries of molten droplets in every direction.`,
      `$$BestFriend$: "I guess this is it..."`,
    ], IO.control.character);
  };
} else if(hellsmawpart == 13){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `$$BestFriend$: "Wait a minute, this place looks a lot like where we've just been..."`,
      `$$Ren$: "We're at the very core of the demon kingdom. It is the concentration of all their evil power. That must be playing tricks on us..."`,
      `$$BestFriend$: "That must be it... But I feel like something is different in the air... Something has changed, but I can't pinpoint what..."`,
      `The crater you find yourself in is indeed eerily similar to the one you just left. The whirlwinds of black fog and lava surrounding you continue their disorienting dance. Yet, a major difference shakes you to your very core.`,
      `In the middle of the pit stands a beast bigger than any building you've ever seen. His humanoid shape is draped in flames. The crackled skin covering his muscular body marries crimson and black, like charred flesh. Two huge horns adorn a face that displays permanent anger. His red eyes shine through the clouds of smoke.`,
      `$$BestFriend$: "Is that... $$demon_lord$?"`,
      `$$Ren$: "Who else? Let's use our weapon before he notices us!"`,
    ], IO.control.character);
  };
}

// ===================
//hack 7. START/INIT
// ===================
CURRENTLEVEL.initialize_with_character(2000, 2500);
