// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================

AUDIO.music.levels.castle();
var gen = new Generator(DICTIONARY.get("world_seed")*7);



// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================

var exit = new S_ExitFloor(2500,2500,150,50, "020_town2");

new S_TilingFloor(2500,2475,150,900);
new S_TilingFloor(2625,2300,525,100);
new S_TilingFloor(1975,2300,550,100);
new S_TilingFloor(2625,1800,525,100);
new S_TilingFloor(1975,1800,550,100);


new S_TilingFloor(1975,1675,1175,400);


new S_TilingFloor(1975,1975,175,150);
var rooms = [];
rooms.push(new S_TilingFloor(1975,2175,250,175));
rooms.push(new S_TilingFloor(2250,2175,225,175));
rooms.push(new S_TilingFloor(2175,1975,125,150));
rooms.push(new S_TilingFloor(2325,1975,150,150));
rooms.push(new S_TilingFloor(2675,2175,125,350));
rooms.push(new S_TilingFloor(2825,1975,325,150));
rooms.push(new S_TilingFloor(2825,2175,175,175));
rooms.push(new S_TilingFloor(3025,2175,125,175));

rooms.push(new S_TilingFloor(1975,2475,200,150));
rooms.push(new S_TilingFloor(2200,2475,150,150));
rooms.push(new S_TilingFloor(2375,2475,100,150));
rooms.push(new S_TilingFloor(2675,2475,175,150));
rooms.push(new S_TilingFloor(2875,2475,275,150));


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

new M_DisguisedPrincess(2000, 1925);
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

new S_StainedGlass(2650, 1300, 'man');
new S_StainedGlass(2425, 1300, 'man');
new S_StainedGlass(2750, 1300, 'man');
new S_StainedGlass(2850, 1300, 'man');
new S_StainedGlass(2950, 1300, 'man');
new S_StainedGlass(3050, 1300, 'man');
new S_StainedGlass(2325, 1300, 'man');
new S_StainedGlass(2225, 1300, 'man');
new S_StainedGlass(2125, 1300, 'man');
new S_StainedGlass(2025, 1300, 'man');

new S_GameBoard(2700, 1625);

new M_ScriptedVillager(CITIES.fear, 2558, 1358, 1, [[
    `The King is on his throne. He doesn't pay you any attention. Instead, his gaze is fully captured by the gigantic board game occupying part of the room.`,
    `When you insist you're the Promised Child, he pats you on the head paternalistically and dismisses you.`,
    `King: "Good, good. Now go, you're interrupting the game."`,
    `$$BestFriend$: "I don't think we'll find any help here..."`,
  ]]);

new M_ScriptedVillager(CITIES.fear, 2787, 1371, 1, [`Noble: "This time I'm the king! I hope I'll do a good job, this could make or break my whole life!"`]);
new M_ScriptedVillager(CITIES.fear, 3038, 1534, gen.get(), [`Noble: "I hate being the bad guy! Someone has to do it though. Can't wait until this simulation is over and we start the next one..."`]);
new M_ScriptedVillager(CITIES.fear, 2841, 1574, gen.get(), [`Noble: "I don't know what the king has in mind for me. Some sort of pincer attack, I think..."`]);
new M_ScriptedVillager(CITIES.fear, 2925, 1410, gen.get(), [`Noble: "I'm the vanguard! Awaiting orders from my liege!"`]);
new M_ScriptedVillager(CITIES.fear, 3079, 1329, gen.get(), [`Noble: "It's a bold move, but he's overextending. He's going to lose because he can't maintain his supply chains."`]);
new M_ScriptedVillager(CITIES.fear, 2698, 1536, gen.get(), [`Noble: "I've been kept in the back the whole time. I think I'm some sort of backup army..."`]);
new M_ScriptedVillager(CITIES.fear, 2932, 1501, gen.get(), [`Noble: "I'm the Promised Child, I'm going straight to Hell's Maw! Our victory is guaranteed!"`]);

// ===================
//hack E. DECOR
// ===================

var f = new Filler(gen.get());
var filler = new MultiFiller(f, 50, 50);
filler.set_tries(3, 6);

filler.add_default_constructor("B_Chest");
filler.add_default_constructor("B_Bucket");
filler.add_default_constructor("B_Jar");
filler.add_default_constructor("B_Stool");
filler.add_default_constructor("B_Housefire");
filler.add_default_constructor("B_Statue");
filler.add_default_constructor("B_WeaponRack", 2);


for (var f of rooms) {
  filler.set_zone_from_floor(f);
  filler.fill_floor_by_retry();
}

// ===================
//hack F. EVENTS
// ===================

var make_noble = function (x, y, seed) {
  var noble = new M_ScriptedVillager(CITIES.fear, x, y, seed, []);
  noble.interaction = function() {
    this.face_character();
    new TextBannerRandom([
      `Noble: "I have a lot of money riding on this simulation. I hope they're not going to mess this up."`,
      `Noble: "Sure this one is not bad but it's nothing compared to last season, we had the most promising general."`,
      `Noble: "The Promised Child is a total beginner this time. There's no way humanity will survive."`,
      `Noble: "This king is not a bad one, but he made a lot of mistakes in the beginning. I'm not sure whether he can catch up."`,
      `Noble: "This is ridiculous, if I was the player, the game would be won already!"`,
      `Noble: "There's no way they can win the game with this stupid strategy. No way!"`,
      `Noble: "I'm not sure. There's been misplays, but there's been some brillant decision making from the player."`,
      `Noble: "This player is a dunce. They can't defeat the demons armies if they don't develop their economy better."`,
      `Noble: "This game is a mess. Simply a mess. Let's just start over."`,
      `Noble: "I lost my last game, but I still did better than that! I blame the randomness..."`,
      `Noble: "The Promised Child in this game is widely underqualified."`,
      `Noble: "Mankind is in a decent position, but I still think that the demons are going to win."`,
      `Noble: "Before my last defeat, I was the most powerful general in the kindgom. Curse this game!"`,
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
      `Noble: "I'd much rather spectate! Playing the game is so stressful."`,
      `Noble: "Commentators are just as important as players! Analyzes are how we learn and develop new strategies!"`,
    ]);
 };
 return noble;
}

var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(2000,1675,475,400);
villagerFiller.set_tries(25, 40);
villagerFiller.set_object(30, 40, make_noble);
villagerFiller.fill_floor_by_retry();


// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.setup_text_start_function([
  `When you enter the castle, the place is teeming with activity. Guards run down hallways, well-dressed guests yell at each other. You wonder what could be causing such commotion. Could it be your arrival?`,
  `$$BestFriend$: "Something is going on here... Are we under attack?"`,
  `It becomes clear that everyone is fully invested in some sort of event, that has nothing to do with you.`,
]);


exit.initialize_with_character();
