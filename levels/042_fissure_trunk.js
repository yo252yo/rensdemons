
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.fissure();
var gen = new Generator(DICTIONARY.get("world_seed")*21);

// ===================
//hack 1. FLOORS
// ===================
new S_Floor(1100,2425,550,850);

new S_Floor(1100,2525,200,200);
new S_Floor(1450,2525,200,200);

new S_Floor(1000,1775,150,200);
new S_Floor(1600,1775,150,200);

new S_Floor(1300,1600,150,100);

// ===================
//hack 2. EXIT
// ===================

new S_ExitFloor(1380,2290,20,60, "042_fissure");
new S_ExitFloor(1360,2370,20,100, "042_fissure");
new S_ExitFloor(1380,2425,20,80, "042_fissure");

new S_ExitFloor(1100,2550,200,50); // left leg
new S_ExitFloor(1450,2550,200,50); // right leg

new S_ExitFloor(975,1775,50,200); // left arm
new S_ExitFloor(1725,1775,50,200); // right arm

new S_ExitFloor(1300,1525,150,50); // head

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================


// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var decorFiller = new Filler(gen.get());

decorFiller.set_zone(825,2675,1125,1275);
decorFiller.set_tries(5, 15);
decorFiller.set_object(175, 50, function(x,y,seed){ return new S_RocksHuge(x, y); });
decorFiller.fill_by_retry(true);
decorFiller.set_tries(5, 10);
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks1(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks2(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks3(x, y); });
decorFiller.fill_by_retry();
decorFiller.set_object(50, 20, function(x,y,seed){ return new S_Rocks4(x, y); });
decorFiller.fill_by_retry();

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================


var events = new EventFiller(decorFiller);
events.set_zone(1050,2475,650,925);

events.battle('caves/bloodsucker', 0.1);
events.battle('caves/bat');
events.battle('caves/mole', 0.8);
events.battle('caves/scorpion');
events.battle('caves/crawler');
/*
events.battleRubble(ITEM.AncientRubbles, 0.5);
events.battleRubble(ITEM.Scale, 0.3);
events.groundItem(ITEM.Seashell);
events.groundItem(ITEM.Stone, 0.1);

events.text(`The water is very cold. It was hard to bear at first, but you're finally getting used to it. You hope $$BestFriend$ handles it well, but you don't want to say anything to keep the topic off everyone's mind.`);
events.text(`There is a lot of fishing swimming all around you. Most of them are even above you, like weird birds, since you're at the very bottom of the lake. But you cannot look at any too closely, since they seem to run away from you every time you approach.`);
events.text(`You find a huge rock that stands out suspiciously. It triggers your curiosity, so you try to push it to see if it covers anything, but despite all your efforts it won't budge. It's most likely a false trail...`);
events.text(`You can be underwater thanks to the potion, but it doesn't prevent your clothes from being damp. You make progress really slowly. The water resistance is significantly stronger than air, which slows every of your motion. But it's ok, you'll just take your time.`);

events.byConstructor("B_Seashell", 2);
events.byConstructor("B_Skeleton", 1);
*/
events.set_tries(30, 50);
events.fill_by_retry();


// ===================
//hack 7. START/INIT
// ===================
CURRENTLEVEL.initialize_with_character(1360,2370);

// boss = rhino
