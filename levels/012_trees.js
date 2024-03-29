// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.levels.trees();

var treepart = 1;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  treepart= parseInt(s[1]);
}
var gen = new Generator((DICTIONARY.get("world_seed")+ treepart)*57);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================

var event_floors = [];
var events_zone = [1950,2100,2050,2250];
var multiplier = 1;

var spawnpoint = function(how){
  if(how == 'bridgeright'){
    return [2400,2175];
  } else if(how == 'bridgeleft'){
    return [1600,2175];
  } else if(how == 'topleft'){
    return [1700,1900];
  } else if(how == 'botleft'){
    return [1700,2475];
  } else if(how == 'topright'){
    return [2300,1900];
  } else if(how == 'botright'){
    return [2300,2475];
  } else if (how == 'topmid'){
    return [2000,1900];
  } else if (how == 'botmid'){
    return [2000, 2475];
  }
  return undefined; //default
}

var botmid = function(to, how){
  multiplier++;
  new S_LushFloor(1950,2475,100,300);
  if(to) {
    var e = new S_ExitFloor(1950,2500,100,50, to, spawnpoint(how));
  }

  events_zone[3] = Math.max(events_zone[3], 2450);
  return e;
}

var botleft = function(to, how){
  multiplier++;
  new S_LushFloor(1650,2475,100,300);
  if(to) {
    var e = new S_ExitFloor(1650,2500,100,50, to, spawnpoint(how));
  }
  events_zone[3] = Math.max(events_zone[3], 2450);
  events_zone[0] = Math.min(events_zone[0], 1650);
  return e;
}

var botright = function(to, how){
  multiplier++;
  new S_LushFloor(2250,2475,100,300);
  if(to) {
    var e = new S_ExitFloor(2250,2500,100,50, to, spawnpoint(how));
  }
  events_zone[3] = Math.max(events_zone[3], 2450);
  events_zone[2] = Math.max(events_zone[2], 2350);
  return e;
}

var topmid = function(to, how){
  multiplier++;
  new S_LushFloor(1950,2200,100,300);
  if(to) {
    var e = new S_ExitFloor(1950,1925,100,50, to, spawnpoint(how));
  }
  events_zone[1] = Math.min(events_zone[1], 1925);
  return e;
}

var topleft = function(to, how){
  multiplier++;
  new S_LushFloor(1650,2200,100,300);
  if(to) {
    var e = new S_ExitFloor(1650,1925,100,50, to, spawnpoint(how));
  }
  events_zone[1] = Math.min(events_zone[1], 1925);
  events_zone[0] = Math.min(events_zone[0], 1650);
  return e;
}

var topright = function(to, how){
  multiplier++;
  new S_LushFloor(2250,2200,100,300);
  if(to) {
    var e = new S_ExitFloor(2250,1925,100,50, to, spawnpoint(how));
  }
  events_zone[1] = Math.min(events_zone[1], 1925);
  events_zone[2] = Math.max(events_zone[2], 2350);
  return e;
}

var bridgeright = function(to, how){
  multiplier++;
  new S_LushFloor(1950,2225,400,100);
  if(to) {
    new S_LushFloor(2300,2225,100,100);
    var e = new S_ExitFloor(2375,2225,50,100, to, spawnpoint(how));
  }
  events_zone[2] = Math.max(events_zone[2], 2350);
  return e;
}

var bridgeleft = function(to, how, condition){
  multiplier++;
  new S_LushFloor(1650,2225,400,100);
  if(to) {
    new S_LushFloor(1600,2225,100,100);
    var e = new S_ExitFloor(1575,2225,50,100, to, spawnpoint(how));
  }
  events_zone[0] = Math.min(events_zone[0], 1650);
  return e;
}


if(treepart == 1){
  topmid('012_trees@2', 'botmid');
  botmid('010_world_map');
} else if(treepart == 2){
  topmid('012_trees@3', 'botmid');
  botmid('012_trees', 'topmid');
} else if(treepart == 3){
  botmid('012_trees@2', 'topmid');
  bridgeright();
  bridgeleft();
  topleft('012_trees@5', 'botmid');
  topright('012_trees@4', 'botmid');
} else if(treepart == 4){
  botmid('012_trees@3', 'topright');
  ABILITIES.unlock("_treepart4");
} else if(treepart == 5){
  botmid('012_trees@3', 'topleft');
  topmid('012_trees@6', 'botmid');
  bridgeleft('012_trees@7', 'bridgeright');
} else if(treepart == 6){
  botmid('012_trees@5', 'topmid');
  ABILITIES.unlock("_treepart6");
} else if(treepart == 7){
  bridgeright('012_trees@5', 'bridgeleft');
  botleft('012_trees@10', 'topmid');
  topmid('012_trees@9', 'botmid');
  topleft('012_trees@8', 'botmid');
  var next = bridgeleft('012_trees@11', 'bridgeright');

  if (INVENTORY.count(ITEM.Branch) < 3){
    next.interaction = function(){
      TextBannerSequence.make([
        `You approach this path, but as you expected, you cannot pass yet. The path is blocked by fierce looking sentient trees. They move very slowly, but they manage to convey to you that the inside of the forest is a holy sanctuary where only those of their kind may enter.`,
        `However, you do not lose hope. You think there must be a way to disguise yourself as one of them. Perhaps if you could find a few BRANCHES...`,
      ]);
    }
  }
} else if(treepart == 8){
  botmid('012_trees@7', 'topleft');
} else if(treepart == 9){
  botmid('012_trees@7', 'topmid');
} else if(treepart == 10){
  topmid('012_trees@7', 'botleft');
} else if(treepart == 11){
  bridgeright('012_trees@7', 'bridgeleft');
  bridgeleft();
  topleft('012_trees@12', 'botmid');
}  else if(treepart == 12){
  botmid('012_trees@11', 'topleft');
  bridgeright();
  bridgeleft();
  topleft('012_trees@14', 'botmid');
  topright('012_trees@13', 'botmid');
} else if(treepart == 13){
  botmid('012_trees@12', 'topright');
} else if(treepart == 14){
  botmid('012_trees@12','topleft');
  bridgeright();
  bridgeleft('012_trees@40', 'bridgeright');
  topright('012_trees@15', 'botmid');
} else if(treepart == 40){
  bridgeleft();
  bridgeright('012_trees@14', 'bridgeleft');
  botmid('012_trees@41', 'topmid');
  botleft('012_trees@41', 'topleft');
} else if(treepart == 41){
  bridgeleft();
  topmid('012_trees@40', 'botmid');
  topleft('012_trees@40', 'botleft');
} else if(treepart == 15){
  botmid('012_trees@14', 'topright');
  topmid('012_trees@16', 'botmid');

  botleft('012_trees@17', 'topmid');
  bridgeleft('012_trees@18', 'bridgeright');
  topleft('012_trees@19', 'botmid');
  topright('012_trees@20', 'botmid');
  bridgeright('012_trees@21', 'bridgeleft');
  botright('012_trees@22', 'topmid');
} else if(treepart == 16){
  botmid('012_trees@15', 'topmid');
  var next = topmid('012_trees@28');

  if (INVENTORY.count(ITEM.Branch) < 3 + 6){
    next.interaction = function(){
      TextBannerSequence.make([
        `You know that a great treasure lies beyond this path, but as you guessed, it is not easy making your way to the innermost sanctum of the forest.`,
        `The sentient trees here are of a much higher status than the ones you've fooled before. They see right past through your ridiculous disguise and forbid you to pass.`,
        `In order to trick them, you're going to need many more BRANCHES to complete your mimicry. Based on the layout of the clearing you've just crossed, you guess that you need to find a total of 6 in addition to the 3 you had from before.`,
        `You have faith that what you need is spread out fairly in the different corners of the forest. You chuckle at the irony of exploring the different branches of the path to gather literal branches.`,
        `Bracing yourself, you go back on your steps towards the clearing.`,
      ]);
    }
  }
} else if(treepart == 17){
  topmid('012_trees@15', 'botleft');
} else if(treepart == 21){
  bridgeleft('012_trees@15', 'bridgeright');
} else if(treepart == 22){
  topmid('012_trees@15', 'botright');
} else if(treepart == 18){
  bridgeright('012_trees@15', 'bridgeleft');
  botmid('012_trees@23', 'topmid');
} else if(treepart == 23){
  topmid('012_trees@18', 'botmid');
} else if(treepart == 20){
  botmid('012_trees@15', 'topright');
  bridgeright('012_trees@24', 'bridgeleft');
} else if(treepart == 24){
  bridgeleft('012_trees@20', 'bridgeright');
} else if(treepart == 19){
  bridgeleft('012_trees@25', 'bridgeright');
  botmid('012_trees@15', 'topleft');
} else if(treepart == 25){
  bridgeright('012_trees@19', 'bridgeleft');
  bridgeleft('012_trees@26', 'bridgeright');
} else if(treepart == 26){
  bridgeright('012_trees@25', 'bridgeleft');
  botmid('012_trees@27', 'topmid');
} else if(treepart == 27){
  topmid('012_trees@26', 'botmid');
} else if(treepart == 28){
  botmid('012_trees@16', 'topmid');
  bridgeleft('012_trees@29', 'bridgeright');
  bridgeright('012_trees@30', 'bridgeleft');

  if (INVENTORY.count("_knots_pressed") >= 2){
    topmid('012_trees@32', 'botmid');
  }
} else if(treepart == 29){
  bridgeright('012_trees@28', 'bridgeleft');
} else if(treepart == 30){
  bridgeleft('012_trees@28', 'bridgeright');
  botmid('012_trees@31', 'topmid');
} else if(treepart == 31){
  topmid('012_trees@30', 'botmid');
} else if(treepart == 32){
  botmid('012_trees@28', 'topmid');
  bridgeleft('012_trees@33', 'bridgeright');
  bridgeright('012_trees@36', 'bridgeleft');
} else if(treepart == 33){
  bridgeright('012_trees@32', 'bridgeleft');
  topmid('012_trees@34', 'botmid');
} else if(treepart == 34){
  bridgeright('012_trees@37', 'bridgeleft');
  botmid('012_trees@33', 'topmid');
} else if(treepart == 35){
  bridgeleft('012_trees@37', 'bridgeright');
  botmid('012_trees@36', 'topmid');
} else if(treepart == 36){
  bridgeleft('012_trees@32', 'bridgeright');
  topmid('012_trees@35', 'botmid');
} else if(treepart == 37){
  topmid('012_trees@38', 'botmid');
  bridgeleft('012_trees@34', 'bridgeright');
  bridgeright('012_trees@35', 'bridgeleft');
} else if(treepart == 38){
  botmid('012_trees@37', 'topmid');
  topmid('012_trees@39', 'botmid');
} else if(treepart == 39){
  botmid('012_trees@38', 'topmid');
  var exit = topmid('012_trees@39');
  exit.interaction = function(){
    if(INVENTORY.count(ITEM.Staff)){
      TextBannerSequence.make([
        `The trees in this area are really thick and block your way. But as you get closer with your new staff in hand, the weapon starts shining.`,
        `With every step you take, the vegetation before you receeds, slowly opening a path before you. Tree, bushes and flowers shift imperceptibly but surely all around you, forming a sort of protective bubble, while you advance in a straight line.`,
        `You continue to create a path through the forest. As you progress, the vegetation clears up around you and becomes less dense. It's clear that you're moving away from the core of this weird place. Before long, you're out of the woods. You can't help but think the trees behind you stand as a guard of honor to wish you safe travels.`,
      ], function(){ CURRENTLEVEL.setup("010_world_map") });
    } else {
      TextBannerSequence.make([
        `The trees form a wall too thick to go through.`,
      ]);
    }
  }
}

var decor_zone = [events_zone[0]-150,events_zone[1]-150,events_zone[2]+150,events_zone[3]+150];


// ===================
//hack D. UNIQUE ELEMENTS
// ===================

if(treepart == 1) {
  events_zone = undefined;
  new S_SavePoint(1975, 2200);
}

if([7, 15, 28, 37].includes(treepart)) {
  new S_SavePoint(1975, 2200);
}

// branches
if([8, 9, 10, 17, 21, 22, 23, 24, 27].includes(treepart)){
  var b = new SE_groundItem(1975, 2200, ITEM.Branch);
  if (INVENTORY.count(ITEM.Branch) == 0){
    b.interaction = function(){
      var after = function(){
        TextBannerSequence.make([
          `However, you think that one BRANCH is not going to be enough for anything. You convince yourself you need to find more.`,
          `You know there must be a certain symmetry in this forest. You decide to go back and explore the other paths in search for more branches.`,
        ]);
      }
      TextBannerSequence.make([
        `You notice that there is a weirdly shaped BRANCH on the ground. Since it's not like the other ones, you think it could be important.`,
      ],  function(){ b.real_interaction(after);});
    };
  }
}

// knots
if([29, 31].includes(treepart)){
  var b = new SE_groundItem(1950, 2225, "_knots_pressed", 1, 100);
  var press = function(){
    INVENTORY.increase("_knots_pressed");
    b.destroy();
    var extra = ` You know that you need to press another KNOT somewhere, in another route. It would be absurd for the other path to be useless.`;
    if(INVENTORY.count("_knots_pressed") >= 2){
      extra = ` You decide to retrace your steps and be on the lookout for changes in the environment.`;
    }
    TextBannerSequence.make([
      `Nothing seems to have changed around you, but you are sure that you had an important effect on your environment, contributing to open the path to the heart of the forest.` + extra,
    ]);
  }
  var prompt = function(){
    new CenteredTextMenu("Will you press the KNOT?",
                  [
                    {"text": "Yes", "effect": press},
                    {"text": "No", "effect": "##CLOSE"},
                 ]
               );
  }

  b.interaction = function(){
    TextBannerSequence.make([
      `Your way is blocked by a massive tree. It is probably several millenia old. You marvel at its size and the intricate patterns of its bark. Your attention is drawn to a knot that stands out slightly.`,
    ], prompt);
  };
}

// ending
if(treepart == 39){
  events_zone = undefined;
  new SBattle(1950, 2275, 'forests/blob', 100);

  var b = new SE_groundItem(1975, 2050,   ITEM.Staff);
  var take = function(){
    INVENTORY.increase(ITEM.Staff);
    b.destroy();
  }

  b.interaction = function(){
    b.make_icon();
    TextBannerSequence.make([
      `A plethora of roots join together in an complex entanglement. At the perfect center, they rise up to form a sort of pedestal which supports the artifact you've been longing for.`,
      `A quick glance could have confused it with one of the many branches you're now wearing, but this would be mistaken. The patterns of the bark seem to follow some sort of arrangement, and these arabesques emit an unnatural soft purple glow.`,
      `When you seize the ENCHANTED STAFF, you are surprised to find that this mystical piece of wood that is almost as big as you weighs practically nothing. You wave it around and feel the air crackle around the artifact. You're sure this holds a tremendous power.`,
      `You keep the Legendary Staff and decide to make your way out of this place.`,
    ], take);
  };
}

// ===================
//hack E. DECOR
// ===================
var filler = new Filler(gen.get(), 15, 20);
filler.set_zone(decor_zone[0],decor_zone[3],decor_zone[2] - decor_zone[0],decor_zone[3] - decor_zone[1]);
filler.set_tries(5*multiplier, 15*multiplier);

filler.add_default_constructor("S_Tree", 2);
filler.add_default_constructor("S_TreeSad", 3);
filler.add_default_constructor("S_TreePalm", 3);
filler.add_default_constructor("S_Vine", 3);
filler.fill_decor_by_retry(true);

filler.clear();
filler.set_tries(2, 5*multiplier);
if(events_zone){
  filler.set_zone(events_zone[0],events_zone[3],events_zone[2] - events_zone[0],events_zone[3] - events_zone[1]);
}
filler.add_default_constructor("S_PlantSmall", 1, 20, 20);
filler.add_default_constructor("S_Plant", 1, 50, 50);
filler.fill_floor_by_retry();


// ===================
//hack F. EVENTS
// ===================
var events = new EventFiller(gen.get(), 10);

events.set_tries(Math.ceil(1.7*multiplier), 8*multiplier);
events.battle('forests/tree',3.2);
events.battle('forests/trunk',3.2);
events.battle('forests/nymph',0.5);
events.battle('forests/flower', 1.3);
events.battle('forests/mandragora', 1.3); // 10

events.groundItem(ITEM.Stick, 0.7);
events.groundItem(ITEM.Berry, 0.7);
events.groundItem(ITEM.Flower, 0.7);
events.battleRubble(ITEM.Elixir_vine, 1);

events.byConstructor("EB_Plants", 0.5);
events.byConstructor("EB_Tent", 0.1);
events.byConstructor("EB_Camp", 0.1);
events.byConstructor("EB_Bush", 0.5);


events.text(`You feel observed. Are the trees all around somehow watching you? That's ridiculous, they're just trees... Yet, you can't fake this uneasy feeling.`, 0.5);
events.text(`You hear rustling in the bushes behind you. Is there someone else here?`, 0.5);
events.text(`You feel determined to explore this forest in depth. You may find very interesting things.`, 0.5);
events.text(`You find a weirdly shaped tiny tree. You're keenly aware that everything in this forest has a purpose, and you wonder what this tree is for. Is it a distraction?`, 0.5);
events.text(`You look around, leaving no bush unchecked, in hope of finding some sort of treasure, to no avail.`, 0.5);
events.text(`You investigate your surroundings, hoping for anything new and noteworthy. But it's just a forest.`, 0.5);
events.text('You look behind a bush, excited at the potential of what you may find there. Sadly, behind the bush is just another bush.', 0.5);
events.text(`You wonder how much longer you'll have to walk in the darkness of this oppressive forest. The result better be worth it!`, 0.5);
events.text('You cannot help but doubting yourself. Maybe you are underprepared for this forest. Maybe you should have trained more. Maybe you should leave and come back later...', 0.5);
events.text('You feel rather disappointed with this place so far. You expected a mighty sanctuary full of riches. But it turns out that sentient trees are very similar to normal trees. And very static.', 0.5);
events.text('You are confident in the fairness of this forest. The tougher the trial, the better the reward. You continue your march empowered by this feeling of determination.', 0.5);
events.text('You look carefully around you, but there seems to be nothing of note. This did not progress your quest at all.', 0.5);
events.text('You examine closely every plant and animal you come across. Everything that seems even remotely intriguing. Who knows where you can find a hidden gem?', 0.5);

events.add_conversations(0.3);


if(events_zone){
  events.set_zone(events_zone[0],events_zone[3],events_zone[2] - events_zone[0],events_zone[3] - events_zone[1]);
  events.fill_floor_by_retry();
}


// Extra event for savagechild ad hoc
if(events_zone && !PARTY.has_member(PARTYMEMBERS.SavageChild) && Math.random() < 0.3){
  events.clear();
  events.set_tries(1, 50);
  events.set_desired(1);
  events.byConstructor("SB_SavageChild");
  events.fill_floor_by_retry();
}


// ===================
//hack G. START/INIT
// ===================



if(treepart == 1){
  CURRENTLEVEL.setup_text_start_function([
    `You arrive at a the entrance of a very dense forest. The trees emanate a threatening aura. An altar of the Goddess stands a few steps before you. You ponder whether or not you should get in.`,
  ]);
} else if(treepart == 2){
  CURRENTLEVEL.setup_text_start_function([
      `You move forward in the woods. The vegetation grows very compact around you, so much so that it blocks almost all daylight. This seems like a place you would easily get lost in.`,
  ]);
} else if(treepart == 3){
  CURRENTLEVEL.setup_text_start_function([
      `When you come to a set of two open paths, you enter the one on your left after much hesitation.`,
  ]);
} else if(treepart == 5){
  var r = [];
  if(ABILITIES.has_ability("_treepart4")){
    r.push(`Despite struggling to find your way and refusing to accept your fate, you're finally on to the right path.`)
  }
  CURRENTLEVEL.setup_text_start_function(r.concat([
      `You now decide to make a turn to the left.`,
  ]));
} else if(treepart == 7){
  var r = [];
  if(ABILITIES.has_ability("_treepart6")){
    r.push(`Of course, you had reservations about your decision, but in the end turning left was the only sensible choice.`)
  }
  CURRENTLEVEL.setup_text_start_function(r.concat([
      `You are now in the depths of the forest. You get the feeling that this place is going to be very confusing. You wish you had a map. You consider drawing one yourself. You think it's very annoying that you have to do that in this day and age. You think there should be a map easy to access somewhere. Everything must have been charted by now...`,
      `Although, considering the complexity of the task, you also realize that this place must contain pretty powerful secrets. You wouldn't have to do so much efforts if the payoff wasn't worth it.`,
      `Comforted by that thought, you decide to follow your gut and pick a path at random.`,
  ]));
} else if(treepart == 11){
  var r = [];
  CURRENTLEVEL.setup_text_start_function(r.concat([
      `You hold the branches you found in front of your face, hoping to make your way deeper in the forest without being stopped by the vegetal guards.`,
      `You breathe a sigh of relief after witnessing that the sentinels have been fooled by your disguise. You're a bit surprised that such a simple idea did the trick. But you reason that since you're still not too deep in the forest, the guards you met were the weakest.`,
      `You continue on your exploration.`
  ]));
} else if(treepart == 12){
  CURRENTLEVEL.setup_text_start_function([
      `When you come to a set of two open paths, you enter again the one on your left.`,
  ]);
} else if(treepart == 12){
  CURRENTLEVEL.setup_text_start_function([
      `But before moving forward, you are dedicated to exploring every corner of this forest.`,
  ]);
} else if(treepart == 14){
  CURRENTLEVEL.setup_text_start_function([
      `The vegetation grows dense around you. Moving forward becomes a real challenge. Every step, you need to force your way through bushes and roots. The sunlight has completely disappeared from the thick canopy above you.`,
  ]);
} else if(treepart == 15){
  CURRENTLEVEL.setup_text_start_function([
      `You arrive at a clearing where the path branches in many directions. You shudder at the thought of all these possible routes to explore. But you breathe a sigh of relief seeing a holy altar that will undoubtely help you find your way in this hellish forest.`,
      `You know that the way out is probably forward, but you also feel the urge to explore the other paths in search of treasures they could hide.`,
  ]);
} else if(treepart == 26){
  var other = `You're thankful that other routes are not this long.`;
  if (INVENTORY.count(ITEM.Branch) < 4){
    other = `You hope that other routes are not this long.`;
  }
  CURRENTLEVEL.setup_text_start_function([
      `You sigh as this complicated path is really annoying. You should be getting close to its end, now.`, other
  ]);
} else if(treepart == 28){
  CURRENTLEVEL.setup_text_start_function([
      `Once again, the path before you splits in two. You suspect that this is not really a choice and that you will have to explore both sides.`,
  ]);
} else if(treepart == 29){
  CURRENTLEVEL.setup_text_start_function([
      `The path seems to come to a dead-end. But you speculate that this route was not created for nothing. You know that every part of this forest a purpose. You believe that this portion warrants close examination.`,
  ]);
} else if(treepart == 31){
  CURRENTLEVEL.setup_text_start_function([
      `This route comes to a sudden end. You take this as a sign that something important is nearby.`,
  ]);
} else if(treepart == 32){
  CURRENTLEVEL.setup_text_start_function([
      `You arrive once more at a fork in your path. By now, it is clear that this apparent choice is not really a choice at all. You advance on one of the paths.`,
  ]);
} else if(treepart == 37){
  CURRENTLEVEL.setup_text_start_function([
      `You suspect that the path you did not take arrives here too. You consider checking this before advancing further.`,
  ]);
} else if(treepart == 38){
  CURRENTLEVEL.setup_text_start_function([
      `You have reached the deepest part of the forest. You praise yourself mentally for holding out this long in this labyrinth. You carefully advance towards the place you suspect to hold a great treasure, shivering with anticipation.`,
  ]);
} else if(treepart == 39){
  CURRENTLEVEL.setup_text_start_function([
      `This is the heart of the woods. The vegetation around you gently glows with a mysterious light. It seems to you that the trees around you are humming, as if communicating with each other. What you came for is surely close, but you know that there will be an ultimate trial before you can reach it. No treasure comes unguarded.`,
  ]);
} else if(treepart == 40){
  CURRENTLEVEL.setup_text_start_function([
      `You decide to take your time and investigate this dead-end for a while before going back to the main path.`,
  ]);
}

// default is to spawn botmid
CURRENTLEVEL.initialize_with_character(2000, 2475);
