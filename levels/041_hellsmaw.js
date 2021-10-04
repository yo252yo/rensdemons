
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
if(hellsmawpart == 1){
  new S_MudFloor(1875,2500,275,200);

  new S_MudFloor(1925,2325,75,275);
  new S_MudFloor(1750,2075,200,50);
  new S_MudFloor(1750,2075,50,175);
  new S_MudFloor(1925,2075,425,75);
  new S_MudFloor(2275,2050,75,225);

  new S_ExitFloor(1950,2525,125,50, '010_world_map');
  new S_ExitFloor(1750,1925,50,50, '041_hellsmaw@2', [1950, 1950]);
  new S_ExitFloor(2275,1850,75,50, '041_hellsmaw@3');

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

  new S_ExitFloor(1950,2500,75,50, '041_hellsmaw');
  new S_ExitFloor(1725,2125,50,50, '041_hellsmaw@4');
  new S_ExitFloor(2150,1875,50,50, '041_hellsmaw@5');
  new S_ExitFloor(2350,2000,50,50, '041_hellsmaw@3');


  decor.set_zone(1500,2700,1100,1000);
  events.set_zone(1750,2472,650,675);
}


// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

decor.set_tries(3, 10);
decor.set_object(175, 50, function(x,y,seed){ return new S_RocksHuge(x, y); });
decor.fill_by_retry(true);
decor.set_tries(1, 5);
decor.set_object(50, 20, function(x,y,seed){ return new S_Rocks1(x, y); });
decor.fill_by_retry(true);
decor.set_object(50, 20, function(x,y,seed){ return new S_Rocks2(x, y); });
decor.fill_by_retry(true);
decor.set_object(50, 20, function(x,y,seed){ return new S_Rocks3(x, y); });
decor.fill_by_retry(true);
decor.set_object(50, 20, function(x,y,seed){ return new S_Rocks4(x, y); });
decor.fill_by_retry(true);


// ===================
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

events.battle('world/arsonist', 2.5);
events.battle('world/djinn', 2.5);
events.battle('world/knight', 2.5);
events.battle('world/vadhaka', 2.5);

events.battle('hell/devilfly', 2.5);
events.battle('hell/sandworm', 2.5);
events.battle('hell/serpentine', 2.5);
events.battle('hell/toad', 2.5);
events.battle('hell/warlock', 2.5);

events.groundItem(ITEM.Bone);
events.groundItem(ITEM.Stone);
events.battleRubble(ITEM.Arrow);
events.battleRubble(ITEM.Spear, 0.1);
events.battleRubble(ITEM.Shield, 0.1);
events.battleRubble(ITEM.Elixir_decay, 0.1);
events.battleRubble(ITEM.Elixir_chaos, 0.1);
events.byConstructor("B_Skeleton");

events.text(`You cross an especially thick portion of fog. The stench is unbearable. You can't help but cough from the abrasive effect on your throat.`);
events.text(`Violent shrieks echo in the valley. You and $$BestFriend$ exchange a worried glance, wondering what kind of inhuman creature can make such ungodly noises.`);
events.text(`You've been climbing for hours. Each step is a bit more painful than the previous one. You're starting to worry that you'll never make it out of this hazy maze...`);
events.text(`You find gigantic footsteps in the ground. Whatever monster left this trail, it would no doubt easily crush your skull. You hope that the Goddess will not abandon you...`);
events.text(`Your ascension is tiresome, your surroundings are scary. You try to take comfort in the fact that the final fight approaches, and your quest is almost over. But an intuition sent by the Goddess gives you the unpleasant hunch that things might not be so simple...`);
events.text(`You're starting to wonder if this rocky desolate inferno really has an exit. Fortunately, the Goddess fills your heart with certainty that however dire the trial may seem, there is necessarily a way forward.`);

events.set_tries(40, 60);
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
}

// ===================
//hack 7. START/INIT
// ===================
CURRENTLEVEL.initialize_with_character(2000, 2500);
