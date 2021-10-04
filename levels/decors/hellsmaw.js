
if (!hellsmawpart){
  CONSOLE.error("HellsMaw decor called without an index!")
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
  new S_ExitFloor(1750,1925,50,50, '041_hellsmaw');
  new S_ExitFloor(2275,1850,75,50, '041_hellsmaw');

  new S_SavePoint(1900,2450,50,50);

  decor.set_zone(1500,2700,1100,1000);

  events.set_zone(1725,2400,625,575);
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
