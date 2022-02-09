// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================

AUDIO.music.levels.castle();
var gen = new Generator(DICTIONARY.get("world_seed")*7);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================

var exit = new S_ExitFloor(2500,2600,150,50, "020_town2");

new S_TilingFloor(2500,2575,150,1000);
new S_TilingFloor(2625,2275,600,50);
new S_TilingFloor(1900,2275,625,50);
new S_TilingFloor(2625,1800,600,50);
new S_TilingFloor(1900,1800,625,50);

new S_TilingFloor(1900,2450,50,1175);
new S_TilingFloor(3175,2450,50,1175);
new S_TilingFloor(1900,1425,125,50);
new S_TilingFloor(3100,1425,125,50);

new S_TilingFloor(1975,1725,1175,450);


new S_TilingFloor(1975,1975,175,150);
var rooms = [];
rooms.push(new S_TilingFloor(1975,2200,250,200));
rooms.push(new S_TilingFloor(2250,2200,225,200));
rooms.push(new S_TilingFloor(2175,1975,125,150));
rooms.push(new S_TilingFloor(2325,1975,150,150));
rooms.push(new S_TilingFloor(2675,2200,125,375));
rooms.push(new S_TilingFloor(2825,2200,175,200));
rooms.push(new S_TilingFloor(3025,2200,125,200));

rooms.push(new S_TilingFloor(1975,2450,200,150));
rooms.push(new S_TilingFloor(2200,2450,150,150));
rooms.push(new S_TilingFloor(2675,2450,175,150));
rooms.push(new S_TilingFloor(2875,2450,275,150));


new S_TilingFloor(2375,2450,100,150);
new S_TilingFloor(2825,1975,325,150);



new S_TilingFloor(2050,2375,50,125);
new S_TilingFloor(2250,2375,50,125);
new S_TilingFloor(2400,2375,50,125);
new S_TilingFloor(2000,2250,50,125);
new S_TilingFloor(2325,2250,50,125);
new S_TilingFloor(2000,1875,50,125);
new S_TilingFloor(2200,1875,50,125);
new S_TilingFloor(2350,1875,50,125);
new S_TilingFloor(2600,2025,125,50);
new S_TilingFloor(3000,2375,50,125);
new S_TilingFloor(2600,2425,125,50);
new S_TilingFloor(2900,2250,50,125);
new S_TilingFloor(3075,2250,50,125);
new S_TilingFloor(3000,1875,50,125);


// ===================
//hack D. UNIQUE ELEMENTS
// ===================



new B_Bed(2075, 1900);

new S_RoyalThrone(2550, 1325);

new S_Column(2475, 1625);
new S_Column(2625, 1625);
new S_Column(2475, 1500);
new S_Column(2625, 1500);
new S_Column(2475, 1375);
new S_Column(2625, 1375);
new S_Column(1975, 1625);
new S_Column(1975, 1500);
new S_Column(1975, 1375);
new S_Column(3125, 1375);
new S_Column(3125, 1500);
new S_Column(3125, 1625);

new S_StainedGlass_wall(2650, 1300, 'man');
new S_StainedGlass_wall(2425, 1300, 'man');
new S_StainedGlass_wall(2750, 1300, 'man');
new S_StainedGlass_wall(2850, 1300, 'man');
new S_StainedGlass_wall(2950, 1300, 'man');
new S_StainedGlass_wall(3050, 1300, 'man');
new S_StainedGlass_wall(2325, 1300, 'man');
new S_StainedGlass_wall(2225, 1300, 'man');
new S_StainedGlass_wall(2125, 1300, 'man');
new S_StainedGlass_wall(2025, 1300, 'man');

new S_GameBoard(2700, 1675);

new M_ScriptedVillager(CITIES.fear, 2558, 1383, 1, [[
    `The King is on his throne. He doesn't pay you any attention. Instead, his gaze is fully captured by the gigantic board game occupying part of the room.`,
    `When you insist you're the Promised Child, he pats you on the head paternalistically and dismisses you.`,
    `King: "Don't be absurd! The Promised Child is over there on the board. In a pretty promising playthrough, might I add. Now get out, you're interrupting our simulation."`,
    `$$BestFriend$: "They seem to be taking this game way too seriously..."`,
  ]]);

new M_ScriptedVillager(CITIES.fear, 2787, 1426, 1, [`Noble: "This time I'm the king! I hope I'll do a good job, this could make or break my whole life!"`]);
new M_ScriptedVillager(CITIES.fear, 3023, 1600, gen.get(), [`Noble: "I hate being the bad guy! Someone has to do it though. Can't wait until this simulation is over and we start the next one..."`]);
new M_ScriptedVillager(CITIES.fear, 2841, 1599, gen.get(), [`Noble: "I don't know what the king has in mind for me. Some sort of pincer attack, I think..."`]);
new M_ScriptedVillager(CITIES.fear, 2925, 1437, gen.get(), [`Noble: "I'm the vanguard! Awaiting orders from my liege!"`]);
new M_ScriptedVillager(CITIES.fear, 3079, 1354, gen.get(), [`Noble: "It's a bold move, but he's overextending. He's going to lose because he can't maintain his supply chains."`]);
new M_ScriptedVillager(CITIES.fear, 2710, 1595, gen.get(), [`Noble: "I've been kept in the back the whole time. I think I'm some sort of backup army..."`]);
new M_ScriptedVillager(CITIES.fear, 2928, 1542, gen.get(), [`Noble: "I'm the Promised Child, I'm going straight to Hell's Maw! Our victory is guaranteed!"`]);
new M_ScriptedVillager(CITIES.fear, 2875, 1325, gen.get(), [`Noble: "I rolled the dice and got assigned to playing the Goddess... It sucks, I'm staying on the side the whole time, I don't really understand what She's supposed to be doing to be honest. How do I play her?"`]);


var guardsthrone = function() {
    this.face_character();

    new TextBannerRandom([
      `Guard: "The throne room is up ahead. As the Promised Child, I can't deny you entry, but you should know that the King and his advisors are pretty busy with important matters of the state. You shouldn't bother them for nothing."`
      ]);
 };
 var g1 = new M_PalaceGuard(2500, 1775, gen.get());
 var g2 = new M_PalaceGuard(2615, 1775, gen.get());
 var g3 = new M_PalaceGuard(3170, 1430, gen.get());
 var g4 = new M_PalaceGuard(1920, 1430, gen.get());

g1.interaction = guardsthrone;
g2.interaction = guardsthrone;
g3.interaction = guardsthrone;
g4.interaction = guardsthrone;


var guardsentry = function() {
    this.face_character();

    new TextBannerRandom([
      `Guard: "This is the royal castle. You may enter, you're the Promised Child. But don't make a mess."`
      ]);
 };
var g5 = new M_PalaceGuard(2500, 2550, gen.get());
var g6 = new M_PalaceGuard(2615, 2550, gen.get());
g5.interaction = guardsentry;
g6.interaction = guardsentry;


var guardsbottle = function() {
    this.face_character();

    new TextBannerRandom([
      `Guard: "Piss off, kid. This is the stock of booze, the most precious room in the castle. Nothing in there for you."`
      ]);
 };
var g7 = new M_PalaceGuard(2425, 2300, gen.get());
g7.interaction = guardsbottle;


var guardscooking = function() {
    this.face_character();

    new TextBannerRandom([
      `Guard: "I love cooking duty. I get to wait around and snack on the food I prepare."`
      ]);
 };
var g8 = new M_PalaceGuard(3100, 1900, gen.get());
g8.interaction = guardscooking;





var jarpoison = function(){
  INVENTORY.increase("_poisoned_palace_guards", 2);
  TextBannerSequence.make([
    `This mead has been spiked. Whoever drinks it is guaranteed to go straight to the puking phase of the recreative process.`
  ]);
}
var jarprompt = function(){
  new CenteredTextMenu("Will you put "+ DICTIONARY.get(PARTYMEMBERS.DisguisedPrincess) + "'s herbs in the mead?",
                [
                  {"text": "Yes", "effect": jarpoison},
                  {"text": "No", "effect": "##CLOSE"},
               ]
             );
}

var jarfunction = function() {
  if(INVENTORY.count(ITEM.PoisonousHerbs)){
    if(INVENTORY.count("_poisoned_palace_guards") == 2 || INVENTORY.count("_poisoned_palace_guards") == 3){
      TextBannerSequence.make([
        `This mead has been spiked. Whoever drinks it is guaranteed to go straight to the puking phase of the recreative process.`
      ]);
    } else {
      TextBannerSequence.make([
        `This is the stock of mead the guards use to unwind after a shift.`
      ], jarprompt);
    }
  } else {
    TextBannerSequence.make([
      `A jar full of mead. The well deserved reward for a guard's duty!`
    ]);
  }
 };

var jars = [new B_Barrel(2375, 2400),
new B_Barrel(2375, 2350),
new B_Barrel(2375, 2450),
new B_Barrel(2400, 2450),
new B_Barrel(2425, 2450),
new B_Barrel(2450, 2450),
new B_Barrel(2450, 2400),
new B_Barrel(2450, 2350)];
for(var j of jars ){
  j.interaction = jarfunction;
}



new B_Bucket(2850, 1850);
new B_Table(2925, 1850);
new B_Table(3075, 1850);
new B_Bucket(3125, 1975);



var stewpoison = function(){
  INVENTORY.increase("_poisoned_palace_guards");
  TextBannerSequence.make([
    `The stew has your secret ingredient. It's sure to leave a lasting impression.`
  ]);
}
var stewprompt = function(){
  new CenteredTextMenu("Will you put "+ DICTIONARY.get(PARTYMEMBERS.DisguisedPrincess) + "'s herbs in the stew?",
                [
                  {"text": "Yes", "effect": stewpoison},
                  {"text": "No", "effect": "##CLOSE"},
               ]
             );
}

var stewfunction = function() {
  if(INVENTORY.count(ITEM.PoisonousHerbs)){
    if(INVENTORY.count("_poisoned_palace_guards") == 1 || INVENTORY.count("_poisoned_palace_guards") == 3){
      TextBannerSequence.make([
        `The stew has your secret ingredient. It's sure to leave a lasting impression.`
      ]);
    } else {
      TextBannerSequence.make([
        `This stew appears to be the next meal for the guards.`
      ], stewprompt);
    }
  } else {
    TextBannerSequence.make([
      `A tasty smelling stew is slowly simmering. You're envious of the ones who get to eat it.`
    ]);
  }
 };

var stews = [new B_Housefire(2875, 1925),
new B_Housefire(2950, 1925),
new B_Housefire(3025, 1925)];
new B_Sack(2825, 1975);
new B_Box(2875, 1975);
new B_Sack(2925, 1975);
for(var j of stews ){
  j.interaction = stewfunction;
}

// ===================
//hack E. DECOR
// ===================

var f = new Filler(gen.get());
var filler = new MultiFiller(f, 50, 50);
filler.set_tries(3, 10);

filler.add_default_constructor("B_Chest");
filler.add_default_constructor("B_Bucket");
filler.add_default_constructor("B_Jar");
filler.add_default_constructor("B_Stool");
filler.add_default_constructor("B_Housefire");
filler.add_default_constructor("B_Statue");
filler.add_default_constructor("B_Barrel");
filler.add_default_constructor("B_Box");
filler.add_default_constructor("B_Sack");


filler.add_default_constructor("B_WeaponRack", 2);

//filler.add_default_constructor("M_PalaceGuard",3);

for (var f of rooms) {
  filler.set_zone_from_floor(f);
  filler.fill_floor_by_retry();
}
filler.clear();
filler.set_object_size(20, 20);
filler.add_default_constructor("M_PalaceGuard");
filler.set_tries(15, 20);
for (var f of rooms) {
  filler.set_zone_from_floor(f);
  filler.fill_floor_by_retry();
}

// ===================
//hack F. EVENTS
// ===================

var make_noble = function (x, y, seed) {
  var noble = new M_Noble(x, y, seed);
  noble.interaction = function() {
    this.face_character();
    new TextBannerRandom([
      `Noble: "I have a lot of money riding on this simulation. I hope they're not going to mess this up."`,
      `Noble: "Sure this one is not bad but it's nothing compared to last season, we had the most promising general."`,
      `Noble: "The Promised Child is a total beginner this time. There's no way humanity will survive."`,
      `Noble: "This king is not a bad one, but he made a lot of mistakes in the beginning. I'm not sure whether he can catch up."`,
      `Noble: "This is ridiculous, if I was the player, the game would be won already!"`,
      `Noble: "There's no way they can win the game with this stupid strategy. No way!"`,
      `Noble: "I'm not sure. There's been misplays, but there's been some brilliant decision making from the player."`,
      `Noble: "This player is a dunce. They can't defeat the demons armies if they don't develop their economy better."`,
      `Noble: "This game is a mess. Simply a mess. Let's just start over."`,
      `Noble: "I lost my last game, but I still did better than that! I blame the randomness..."`,
      `Noble: "The Promised Child in this game is widely underqualified."`,
      `Noble: "Mankind is in a decent position, but I still think that the demons are going to win."`,
      `Noble: "Before my last defeat, I was the most powerful general in the kingdom. Curse this game!"`,
      `Noble: "This game is rigged anyway. I've never seen the human armies succeed."`,
      `Noble: "The humans better win. Their armies cost us most of the kingdom's budget!"`,
      `Noble: "I'm a professional game commentator. I've been praised for my great insights and understanding. It's one of the most prestigious positions in the kingdom!"`,
      `Noble: "Did you notice that the tiles are new? I've orchestrated the production! It's one of the biggest construction projects of mankind!"`,
      `Noble: "I heard they're developing new secret weapons for the game. With this, the armies of darkness won't stand a chance!"`,
      `Noble: "Don't go! The beginning of the game is always boring, but if you are patient, the action is going to be so cool and violent!"`,
      `Noble: "Did you see the brand new game pieces? They're so shiny! I heard they cost something like a year worth of taxes..."`,
      `Noble: "If you lose two games in a row, you're exiled. We only want winners here."`,
      `Noble: "I think this game might be too easy..."`,
      `Noble: "The player missed a lot of good opportunities! And it's too late to ever get them back, now..."`,
      `Noble: "We need to replace the current Promised Child, they are so inefficient."`,
      `Noble: "You're the Promised Child? Why aren't you on the board?"`,
      `Noble: "The king? He's over there on the board!"`,
      `Noble: "You're the Promised Child? What are you doing here instead of tending to your vital duty to the kingdom! Quick, go back to the game!"`,
      `Noble: "I'd much rather spectate! Playing the game is so stressful."`,
      `Noble: "This king's political program is interesting, but I don't think it's enough to win."`,
      `Noble: "This king's not too bad... Oh you mean the one outside the game? I don't really know nor care..."`,
      `Noble: "The demon lord is sure to be defeated! Our pieces are just too good, the game is almost over!"`,
      `Noble: "If you want to help the kingdom, why are you not on the board playing?"`,
      `Noble: "I think we'll see checkmate before soon..."`,
      `Noble: "The best generals in the kingdom have showed us incredible victories on the field. We can be proud to have such skilled players!"`,
      `Noble: "Some people say we're useless. But commentators are just as important as players! Analyzes are how we learn and develop new strategies!"`,
    ]);
 };
 return noble;
}

var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(2000,1725,475,450);
villagerFiller.set_tries(25, 40);
villagerFiller.set_object(30, 40, make_noble);
villagerFiller.fill_floor_by_retry();
