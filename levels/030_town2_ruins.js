// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.town.fear();
var gen = new Generator(DICTIONARY.get("world_seed")*3);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================
var town = new S_TownFloor(1050, 2550, 1500, 1500, "010_world_map");

// ===================
//hack D. UNIQUE ELEMENTS
// ===================

var g = new S_GameBoard(1125, 1425);
g.default_text = g.text_interaction([
  "All that remains of the castle is the King's game board. Its in surprisingly good condition contrasts with the shreds of the real buildings slowly rotting all around in the desertic reality.",
]);

var obj = [];
obj.push(new S_Church(1700, 1750, "020_church2"));
obj.push(new S_Castle(1075, 1425));
obj.push(new S_Store(CITIES.fear, ITEMS_ARCHETYPES_NAMES.Weapon, 500, 2200, 1300, gen.get()));
obj.push(new S_Store(CITIES.fear, ITEMS_ARCHETYPES_NAMES.Tool, 200, 2225, 2225, gen.get()));
obj.push(new S_Store(CITIES.fear, ITEMS_ARCHETYPES_NAMES.Alchemy, 100, 1425, 1850, gen.get()));

var wiseOldFool = new M_WiseOld(1050, 1075);

var make_priest = function (x, y) {
  var priest = new M_Priest(x,y, CITIES.fear);
  priest.interaction = function() {
    this.face_character();

    new TextBannerRandom([
      "Priest: \"This might be the end of our kingdom... The castle... The temple... The archives... All gone!\"",
      "Priest: \"The royal princess has gone missing in the attack. Fortunately, her body has not been found. The Goddess must be protecting her...\"",
      "Priest: \"Help us, you're our only hope!\"",
      "Priest: \"May the Goddess help us rebuild! And shield us while we do so!\"",
      "Priest: \"This is the end of $$town_2$... There's no recovering from this.\"",
      "Priest: \"The Archpriest wants to talk to you.\"",
      "Priest: \"All the nobles perished or fled. We're all that's left, trying to salvage what we can here.\"",
    ]);
 };
 return priest;
}

make_priest(1250, 1125);
make_priest(1175, 1250);
make_priest(1400, 1175);
make_priest(1175, 1350);
make_priest(1275, 1200);



var armament = function() {
  var short = [
    `Archpriest: "To start your attack on $$demon_lord$, you must travel to the south east. That is where the Maw of Hell is open, at the edge of the world. It is the core of $$demon_lord$'s forces, it's where all his armies are coming from. Be careful, no human has ever seen this place and returned to tell the tale. We don't know what you'll encounter there. But we have faith that the Goddess will lead your path to victory!"`,
    `Archpriest: "On the way, you should probably stop at $$town_3$ to rest and resupply. It is the human settlement the closest to the Maw of Hell, where the best warriors of mankind do their best to keep the forces of evil at bay. I'm sure you can learn a lot from their expertise."`,
    `$$Ren$: "Thank you! I'll be on my way."`,
    `$$BestFriend$: "Don't worry, you're going to do great!"`,
    `Things would be much simpler if either of you could truly believe it.`,
  ];
  if (!ABILITIES.has_ability("_town3_prompted")){
    ABILITIES.unlock("_town3_prompted");
    TextBannerSequence.make([
      `Archpriest: "Promised Child! Am I glad to see you! The situation has taken a turn for the worst!"`,
      `$$BestFriend$: "What happened?"`,
      `Archpriest: "A few hours after you left the town, the armies of $$demon_lord$ launched a wide scale coordinated attack. Their numbers were unlike anything we had seen before. We were completely unprepared and overwhelmed. They tore through our defenses and destroyed the whole city, including the castle. Most people are dead. May the Goddess take care of their souls. Some have been captured by the demons and taken who knows where. I dare not imagine what tortures they must be going through."`,
      `Archpriest: "We really need a ray of hope! Please, tell me that the Goddess helped you find something! Tell me you can help!"`,
      `$$Ren$: "We found this..."`,
      `You show the head of the temple the artifacts you found. He examines briefly the armature and ammunition, then spends much longer studying the advisory manual in silence. You don't disturb his concentration and patiently wait. After what seems like an eternity, the priest turns back to you.`,
      `Archpriest: "This is most interesting. I can only decipher some fragments of this book, but if what I understand is correct, this is a weapon of incredible power. Our ancestors were truly fearsome! It's a wonder how $$demon_lord$ was able to overtake them..."`,
      `You shudder. If people so strong were wiped out, how could you even hold a stand against the armies of demons. Your eyes crosses the gaze of $$BestFriend$ and you can see the same uncertainty. But you decide that it would be better to not show it to the adults.`,
      `$$Ren$: "I see... How does it work?"`,
      `Archpriest: "It's actually quite simple. That's what truly impresses me. They managed to harness such power in such an accessible form. Anyway, as I was saying, it's dead simple. You put this little marble in this tube, that's how you load the ammunition. Then you point the towards your target, and press here."`,
      `He demonstrates an example while talking.`,
      `$$Ren$: "And then?"`,
      `Archpriest: "That's it. Your target will be gone."`,
      `$$Ren$: "Really? That is indeed simple. How does it work?"`,
      `Archpriest: "That much I don't know. The details are in this book, but it's well beyond our current understanding. We'll have to trust that it does. What really worries me is that with so few ammunition, we can't afford to try it out before the actual battle."`,
      `You swallow in anguish.`,
      `$$Ren$: "So it's a gamble?"`,
      `Archpriest: "You could see it that way. But with the Goddess on our side, this is a gamble we cannot lose."`,
      `You would have loved a bit more certainty. You can tell by a quick look that $$BestFriend$ feels the same way. But certainty is a luxury you cannot afford. You've seen first hand what the armies of $$demon_lord$ can do. The handful of towns left in the human empire won't survive for long...`,
      `$$Ren$: "I see. Let's do it then!"`,
      `$$BestFriend$: "$$Ren$..."`,
      `$$Ren$: "Don't worry, it will be fine!"`,
      `You exchange a smile that makes it clear that neither of you really believes it. Nonetheless, you feel pressed onwards by the Goddess. There is no other way.`,
      `Archpriest: "You are brave, as can be expected from the Promised Child! We are all grateful to you!"`,
    ].concat(short));
  } else {
    TextBannerSequence.make(short);
  }
}




var hp = new M_Priest(1400, 1375, CITIES.fear);
hp.interaction = function() {
  this.face_character();
  armament();
}


// ===================
//hack E. DECOR (permanent filler)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 2525, 1475, 1450);
houseFiller.set_tries(15, 100);
houseFiller.add_constructor(function(x,y,seed){ obj.push(new S_House(CITIES.fear, x, y, seed)); }, 1, 120, 160);
houseFiller.fill_floor_by_retry();


for(var o of obj) {
  var x = o.x;
  var y = o.y;
  if (o.h_w) {
    x += o.h_w / 2;
    y += o.h_h / 2;
  }
  o.destroy();
  new S_RubbleLarge(x, y);
}

//hack reset generator (i.e. new content)

var gen = new Generator(gen.get());

var rubbleFiller = new Filler(gen.get());
rubbleFiller.set_zone(1075, 2525, 1475, 1450);
rubbleFiller.set_tries(200, 400);
rubbleFiller.add_default_constructor("S_Rubble", 1, 30, 30);
rubbleFiller.fill_floor_by_retry();
rubbleFiller.clear();
rubbleFiller.set_tries(30, 60);
rubbleFiller.add_constructor(function(x,y,seed){ return new M_Villager(CITIES.mourning, x, y, seed); }, 1, 50, 60);
rubbleFiller.fill_floor_by_retry();


// ===================
//hack G. START/INIT
// ===================


CURRENTLEVEL.start_function = function() {
  STATS.record.flag("town2_ruin_seen");
  TextBannerSequence.make([
    `When you approach $$town_2$, it is beyond recognition. Most buildings have been burnt to the ground. Mounts of blackened stone and wood are all that remain from the capital. Smoke still rises from some of the rubble.`,
    `The royal castle did not get a better fate. Only a slightly bigger pile of debris is there to attest that this was once the center of a human kingdom.`,
    `Under shock, $$BestFriend$ could barely hold back tears.`,
    `$$BestFriend$: "What... what happened here?"`,
  ], IO.control.character);
};

town.get_exit().initialize_with_character(1750, 2550);
