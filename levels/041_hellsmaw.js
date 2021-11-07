
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

var filler = new Filler(gen.get());
var decor = new MultiFiller(filler, 40, 40);

var events = new EventFiller(filler, 1);
events.set_tries(10, 12);


var summitExit = function(){
  if(ABILITIES.has_ability("_lieutenant_defeated")) {
    CURRENTLEVEL.setup('050_hell_map');
  } else{
    CURRENTLEVEL.setup('041_hellsmaw@8', [2450,1825]);
  }
}


// ===================
//hack 1. FLOORS
//hack 2. EXIT
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

if(hellsmawpart == 1){
  new S_LavaFloor(1875,2500,275,200);

  new S_LavaFloor(1925,2325,75,275);
  new S_LavaFloor(1750,2075,200,50);
  new S_LavaFloor(1750,2075,50,175);
  new S_LavaFloor(1925,2075,425,75);
  new S_LavaFloor(2275,2050,75,225);

  new S_ExitFloor(1950,2525,125,50, '010_world_map');
  new S_ExitFloor(1750,1925,50,50, '041_hellsmaw@2', [2000, 2500]);
  new S_ExitFloor(2275,1850,75,50, '041_hellsmaw@3', [2000, 2500]);

  new S_SavePoint(1900,2450,50,50);

  floors = [
    [1675,2100,775,175],
    [1875,2300,175,400],
  ];
}
else if(hellsmawpart == 2){
  new S_LavaFloor(1950,2475,75,400);
  new S_LavaFloor(1750,2125,250,50);
  new S_LavaFloor(1950,2100,50,275);
  new S_LavaFloor(1950,1875,225,50);
  new S_LavaFloor(1950,2125,450,50);
  new S_LavaFloor(2350,2125,50,150);
  new S_LavaFloor(2200,2225,50,275);
  new S_LavaFloor(2200,2250,175,50);

  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw', [1775,1950]);
  new S_ExitFloor(1725,2125,50,50, '041_hellsmaw@5', [2000, 2500]);
  new S_ExitFloor(2150,1875,50,50, '041_hellsmaw@6', [2000, 2500]);
  new S_ExitFloor(2350,2000,50,50, '041_hellsmaw@4', [2000, 2500]);

  floors = [
    [1700,2175,750,175],
    [1900,2475,175,700],
    [2150,2300,250,400]
  ];
}
else if(hellsmawpart == 3){
  new S_LavaFloor(1950,2475,75,300);
  new S_LavaFloor(1850,2300,125,50);
  new S_LavaFloor(1950,2200,225,50);
  new S_LavaFloor(2125,2200,50,150);
  new S_LavaFloor(1950,2175,50,200);
  new S_LavaFloor(1800,2025,200,50);

  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw', [2300,1850]);
  new S_ExitFloor(1825,2300,50,50, '041_hellsmaw@4', [2525,2475]);
  new S_ExitFloor(2125,2075,50,50, '041_hellsmaw@7', [2000, 2500]);

  floors = [
    [1925,2450,125,525],
    [1750,2050,325,125],
    [1875,2275,350,175],
  ];
} else if(hellsmawpart == 4){
  new S_LavaFloor(1975,2500,625,50);
  new S_LavaFloor(2125,2650,300,325);

  new S_ExitFloor(2550,2500,75,50, '041_hellsmaw@3', [1850,2275]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@2', [2375,2025]);

  floors = [
    [2075,2700,400,425]
  ];
} else if(hellsmawpart == 5){
  new S_LavaFloor(1750,2500,250,50);
  new S_LavaFloor(1650,2575,200,200);
  new S_LavaFloor(1550,2225,200,50);
  new S_LavaFloor(1700,2750,75,575);
  new S_LavaFloor(1700,2750,225,50);

  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@2', [1775,2100]);

  floors = [
    [1475,2375,350,275],
    [1625,2800,350,250],
    [1600,2575,350,225],
  ];
} else if(hellsmawpart == 6){
  new S_LavaFloor(1950,2475,75,700);
  new S_LavaFloor(1600,2125,725,75);
  new S_LavaFloor(1925,2150,125,125);

  new S_ExitFloor(1575,2125,50,75, '041_hellsmaw@10', [2000, 2500]);
  new S_ExitFloor(1950,1800,75,50, '041_hellsmaw@9', [2000, 2500]);
  new S_ExitFloor(2300,2125,50,75, '041_hellsmaw@8', [2000, 2500]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@2', [2175,1850]);

  floors = [
  //  [1750,2275,450,350]
    [1900,2450,175,650],
    [1625,2200,675,225],
  ];
} else if(hellsmawpart == 7){
  new S_LavaFloor(1950,2475,75,700);
  new S_LavaFloor(1675,2175,300,50);
  new S_LavaFloor(1675,2175,50,150);
  new S_LavaFloor(1675,2050,100,50);
  new S_LavaFloor(1725,2050,50,150);
  new S_LavaFloor(1500,1950,275,50);
  new S_LavaFloor(1725,1950,150,50);
  new S_LavaFloor(1825,1950,50,375);

  new S_ExitFloor(1475,1950,50,50, '041_hellsmaw@8', [2600,2300]);
  new S_ExitFloor(1950,1800,75,50, '041_hellsmaw@11', [2000, 2500]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@3', [2150,2050]);

  floors = [
    [1900,2450,175,625],
    [1525,2200,375,325],
    [1775,1875,125,325],
  ];
} else if(hellsmawpart == 8){
  new S_LavaFloor(1950,2475,75,175);
  new S_LavaFloor(1950,2325,650,50);
  new S_LavaFloor(2175,2350,175,175);
  new S_LavaFloor(2225,2200,50,250);
  new S_LavaFloor(2075,1975,200,50);
  new S_LavaFloor(2075,1975,50,175);
  new S_LavaFloor(2075,1850,375,50);

  new S_ExitFloor(2425,1850,50,50, '041_hellsmaw@12', [1800,2150]);
  new S_ExitFloor(2575,2325,50,50, '041_hellsmaw@7', [1500,1925]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@6', [2325,2100]);

  new S_SavePoint(2275,2250);

  floors = [
    [1900,2475,675,225],
    [2025,2150,325,375],
  ];
} else if(hellsmawpart == 9){
  new S_LavaFloor(1950,2475,75,225);

  new S_LavaFloor(1950,2275,325,50);
  new S_LavaFloor(2225,2350,50,125);
  new S_LavaFloor(2225,2350,175,50);
  new S_LavaFloor(2350,2350,50,275);
  new S_LavaFloor(2100,2125,300,75);
  new S_LavaFloor(2100,2100,50,150);
  new S_LavaFloor(2100,1975,150,50);
  new S_LavaFloor(2200,1975,50,150);
  new S_LavaFloor(1975,1875,275,50);
  new S_LavaFloor(1975,1875,50,300);
  new S_LavaFloor(1850,1625,175,50);
  new S_LavaFloor(1850,1625,50,150);
  new S_LavaFloor(2200,1875,325,50);
  new S_LavaFloor(2475,1875,50,400);

  new S_ExitFloor(1850,1500,50,50, '041_hellsmaw@10', [2550,2000]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@6', [1975,1775]);

  floors = [
    [2250,1925,350,475],
    [1825,2000,450,475],
    [1900,2400,550,400],
  ];
} else if(hellsmawpart == 10){
  new S_LavaFloor(1950,2475,75,175);
  new S_LavaFloor(1825,2350,200,50);
  new S_LavaFloor(1800,2475,50,350);
  new S_LavaFloor(1650,2475,200,50);
  new S_LavaFloor(1800,2175,400,50);
  new S_LavaFloor(2150,2175,175,200);
  new S_LavaFloor(2275,2025,275,50);
  new S_LavaFloor(2200,2000,50,175);
  new S_LavaFloor(2100,1875,150,50);

  new S_ExitFloor(2525,2025,50,50, '041_hellsmaw@9', [1875,1475]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@6', [1600,2100]);

  floors = [
    [1575,2475,375,200],
    [1750,2275,600,225],
    [2050,2050,375,275],
  ];
} else if(hellsmawpart == 11){
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@7', [1975,1775]);

  new S_LavaFloor(1950,2475,75,250);
  new S_LavaFloor(1950,2250,225,50);
  new S_LavaFloor(2125,2250,50,275);
  new S_LavaFloor(2125,2025,250,50);
  new S_LavaFloor(2350,2050,200,200);
  new S_LavaFloor(1950,2225,75,175);
  new S_LavaFloor(1725,2100,300,50);

  floors = [
    [1675,2200,375,200],
    [2100,2075,475,250],
    [1925,2325,275,400],
  ];
} else if(hellsmawpart == 12){
  new S_LavaFloor(1950,2475,75,625);
  new S_LavaFloor(1800,2275,350,275);

  var summit = new S_ExitFloor(1775,2175,50,100);
  summit.interaction = summitExit;
  new S_ExitFloor(1950,1875,75,50, '041_hellsmaw@13', [2000, 2500]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@13', [1975, 1900]);

  events.set_tries(0, 0);
  floors = [
    [1900,2025,150,150],
    [1750,2325,175,400],
    [2050,2300,150,350],
    [1900,2450,150,225],
  ];
} else if(hellsmawpart == 13){
  new S_LavaFloor(1950,2475,75,625);
  new S_LavaFloor(1800,2275,350,275);

  var summit = new S_ExitFloor(1775,2175,50,100);
  summit.interaction = summitExit;
  new S_ExitFloor(1950,1875,75,50, '041_hellsmaw@12', [2000, 2500]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@12', [1975, 1900]);


  events.set_tries(0, 0);
  floors = [
    [1900,2025,150,150],
    [1750,2325,175,400],
    [2050,2300,150,350],
    [1900,2450,150,225],
  ];
} else if(hellsmawpart == 14){
  new S_LavaFloor(1950,2475,75,625);
  new S_LavaFloor(1800,2275,350,275);

  var summit = new S_ExitFloor(1775,2175,50,100, '050_hell_map');
  new S_ExitFloor(1950,1875,75,50, '041_hellsmaw@14', [2000, 2500]);
  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw@14', [1975, 1900]);

//`For some reason, you expected some sort of treasure or secret to appear. But nothing is here except lingering sorrow.`,

  events.set_tries(0, 0);
  floors = [
    [1900,2025,150,150],
    [1750,2325,175,400],
    [2050,2300,150,350],
    [1900,2450,150,225],
  ];
} else {
  CONSOLE.error("Requested unimplemented hellsmawpart: " + hellsmawpart);
}


// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

decor.add_default_constructor("S_HellPlantLeaning");
decor.add_default_constructor("S_HellPlantSretching");
decor.add_default_constructor("S_HellPlantSlimy");
decor.add_default_constructor("S_HellPlantLoops");
decor.add_default_constructor("S_Spike");

decor.add_constructor( function(x,y,seed){ return new S_Rocks1(x, y, seed); }, 1.5);
decor.add_constructor( function(x,y,seed){ return new S_Rocks2(x, y, seed); }, 1.5);
decor.add_constructor( function(x,y,seed){ return new S_Rocks3(x, y, seed); }, 1.5);
decor.add_constructor( function(x,y,seed){ return new S_Rocks4(x, y, seed); }, 1.5);
decor.add_constructor( function(x,y,seed){ return new S_RocksHuge(x, y, seed); }, 2.5, 175, 50);
decor.set_tries(10, 30);

for(var i of floors){
  decor.set_zone(i[0], i[1], i[2], i[3]);
  decor.fill_decor_by_retry();
}
// ===================
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================

if (!ABILITIES.has_ability("_lieutenant_defeated") && hellsmawpart == 13){
  new S_Beelzebub(1900, 2200);
}

if (hellsmawpart == 14){
  var s = new SE_event(1950, 2125);
  var end = function(){
    s.destroy();
    INVENTORY.increase(ITEM.Medallion);
  };

  var prompt2 = function(){
    new CenteredTextMenu("Will you take the medallion with you or leave it to rest undisturbed?",
        [
          {"text": "Take it", "effect": end},
          {"text": "Leave it", "effect": function(){ s.destroy(); }},
       ]
     );
   };

  var investigate = function() {
    TextBannerSequence.make(['You spend a long time rummaging through the ashes. Finally, under a thick layer of rubbles, something attracts your gaze. You can\'t help but gasp as you recognize $$BestFriend$\'s medallion.'],
    prompt2);
  }

  var prompt = function(){
    new CenteredTextMenu("Investigate the scene?",
        [
          {"text": "Yes", "effect": investigate},
          {"text": "No", "effect": "##CLOSE"},
       ]
     );
   };

  s.real_interaction = function() {
    TextBannerSequence.make(['Moved by a Goddess-given intuition, you make your way back to the scene of the terrible battle. You believe there must be something, some sort of treasure, that you should be able to find now...'],
    prompt);
  }
}

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


for(var i of floors){
  events.set_zone(i[0], i[1], i[2], i[3]);
  events.fill_floor_by_retry();
}

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
  var after = function(){
    if(STATS.flag("KilledBestFriend")){
      new CenteredTextMenu("Do you want to say a few words to your friend before the fight?",
                    [
                      {"text": "Yes", "effect": function(){ BATTLE.api.make("_party/_BestFriend"); }},
                      {"text": "No", "effect": function(){ IO.control.character(); }},
                   ]
                 );
    } else {
      IO.control.character();
    }
  };

  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `$$BestFriend$: "Wait a minute, this place looks a lot like where we've just been..."`,
      `$$Ren$: "We're at the very core of the demon kingdom. It is the concentration of all their evil power. That must be playing tricks on us..."`,
      `$$BestFriend$: "That must be it... But I feel like something is different in the air... Something has changed, but I can't pinpoint what..."`,
      `The crater you find yourself in is indeed eerily similar to the one you just left. The whirlwinds of black fog and lava surrounding you continue their disorienting dance. Yet, a major difference shakes you to your very core.`,
      `In the middle of the pit stands a beast bigger than any building you've ever seen. His humanoid shape is draped in flames. The crackled skin covering his muscular body marries crimson and black, like charred flesh. Two huge horns adorn a face that displays permanent anger. His red eyes shine through the clouds of smoke.`,
      `$$BestFriend$: "Is that... $$demon_lord$?"`,
      `$$Ren$: "Who else? Let's use our weapon before he notices us!"`,
    ], after);
  };
} else if(hellsmawpart == 14){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `As you come back to the scene of the tragedy, the landscape around you seems eerily familiar, yet something feels off.`,
      `Thanks to the wisdom of the Goddess, you know that demonic magic is at play here, and it will not allow you to go back to your world. The only way is forward.`,
    ], IO.control.character);
  };
}

// ===================
//hack 7. START/INIT
// ===================
if(hellsmawpart == 14){
  CURRENTLEVEL.initialize_with_character(1800, 2150);
} else {
  CURRENTLEVEL.initialize_with_character(2000, 2500);
}
