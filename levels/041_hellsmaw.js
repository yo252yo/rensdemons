// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.hellsmaw();
var gen = new Generator(DICTIONARY.get("world_seed")*17);


// ===================
//hack 1. FLOORS
// ===================
new S_MudFloor(1875,2500,275,200);


new S_MudFloor(1925,2325,75,275);
new S_MudFloor(1750,2075,200,50);
new S_MudFloor(1750,2075,50,175);
new S_MudFloor(1925,2075,425,75);
new S_MudFloor(2275,2050,75,225);


// ===================
//hack 2. EXIT
// ===================
new S_ExitFloor(1950,2525,125,50, '010_world_map');
new S_ExitFloor(1750,1925,50,50, '041_hellsmaw');
new S_ExitFloor(2275,1850,75,50, '041_hellsmaw');

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new S_SavePoint(1900,2450,50,50);

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var filler = new Filler(gen.get());
filler.set_zone(1500,2700,1100,1000);
filler.set_tries(3, 10);
filler.set_object(175, 50, function(x,y,seed){ return new S_RocksHuge(x, y); });
filler.fill_by_retry(true);
filler.set_tries(1, 5);
filler.set_object(50, 20, function(x,y,seed){ return new S_Rocks1(x, y); });
filler.fill_by_retry(true);
filler.set_object(50, 20, function(x,y,seed){ return new S_Rocks2(x, y); });
filler.fill_by_retry(true);
filler.set_object(50, 20, function(x,y,seed){ return new S_Rocks3(x, y); });
filler.fill_by_retry(true);
filler.set_object(50, 20, function(x,y,seed){ return new S_Rocks4(x, y); });
filler.fill_by_retry(true);



// ===================
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

var events = new EventFiller(filler, 5);
events.set_zone(1725,2500,625,675);


events.battle('world/arsonist', 3);
events.battle('world/djinn', 3);
events.battle('world/knight', 3);
events.battle('world/vadhaka', 3);

events.battle('hell/devilfly', 3);
events.battle('hell/sandworm', 3);
events.battle('hell/serpentine', 3);
events.battle('hell/toad', 3);
events.battle('hell/warlock', 3);

events.groundItem(ITEM.Bone);
events.groundItem(ITEM.Stone);
events.battleRubble(ITEM.Arrow);
events.battleRubble(ITEM.Spear, 0.1);
events.battleRubble(ITEM.Shield, 0.1);
events.battleRubble(ITEM.Elixir_decay, 0.1);
events.battleRubble(ITEM.Elixir_chaos, 0.1);
events.byConstructor("B_Skeleton");

events.text(`You cross an especially thick portion of fog. The stench is unbearable. You can't help but cough from the abrasive effect on your throat.`);

events.set_tries(40, 50);
events.fill_by_retry();


// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
    `You arrive at the foot of a mountain chain. The rock is black and rises steeply in contrast to the surrounding meadow, as if some sort of massive otherworldly spike perforated the ground. Every now and then, you can hear an ominous rumbling in the distance. The smell of sulfur overwhelms you and makes it hard to breathe. From the summit, a thick grey fog runs down the slopes and makes it impossible to see what lies ahead of you..."`,
    `$$BestFriend$: "So this is it, this is $$demon_lord$'s hideout?"`,
    `$$Ren$: "I think so... This is the heart of enemy territory! Let's be extra careful, it must be swarming with demons..."`,
    `Next to you, an old worn out altar stands as the last stand of civilization.`,
    `The track you can climb is thin and unreliable. Pretty soon, it forks into different paths shrouded in fog that crawl up the sharp facade. You pray that the Goddess leads you to the right one...`,
  ], IO.control.character);
};

CURRENTLEVEL.initialize_with_character(2000, 2500);
