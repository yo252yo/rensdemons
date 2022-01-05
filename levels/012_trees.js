// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.trees();

var treepart = 1;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  treepart= parseInt(s[1]);
}
var gen = new Generator((DICTIONARY.get("world_seed")+ treepart)*57);

// ===================
//hack 1. FLOORS
//hack 2. EXIT
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
    return [1700,1925];
  } else if(how == 'botleft'){
    return [1700,2475];
  } else if(how == 'topright'){
    return [2300,1925];
  } else if(how == 'botright'){
    return [2300,2475];
  } else if (how == 'topmid'){
    return [2000,1925];
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
  topmid('012_trees@2');
  botmid('010_world_map');
} else if(treepart == 2){
  topmid('012_trees@3');
  botmid('012_trees');
} else if(treepart == 3){
  botmid('012_trees@2');
  bridgeright();
  bridgeleft();
  topleft('012_trees@5');
  topright('012_trees@4');
} else if(treepart == 4){
  botmid('012_trees@3');
  ABILITIES.unlock("_treepart4");
} else if(treepart == 5){
  botmid('012_trees@3');
  topmid('012_trees@6');
  bridgeleft('012_trees@7', 'bridgeright');
} else if(treepart == 6){
  botmid('012_trees@5');
  ABILITIES.unlock("_treepart6");
} else if(treepart == 7){
  bridgeright('012_trees@5');
  botleft('012_trees@10', 'topmid');
  topmid('012_trees@9');
  topleft('012_trees@8');
  var next = bridgeleft('012_trees@11', 'bridgeright');

  if (INVENTORY.count(ITEM.Branch) < 3){
    next.interaction = function(){
      TextBannerSequence.make([
        `You approach this path, but as you expected, you cannot pass yet. The path is blocked by fierce looking sentient trees. They move very slowly, but they manage to convey to you that the inside of the forest is a holy sanctuary where only those of their kind may enter.`,
        `However, you do not lose hope. You think there must be a way to disguise yourself as one of them. Perhaps if you could find a few branches...`,
      ]);
    }
  }
} else if(treepart == 8){
  botmid('012_trees@7');
} else if(treepart == 9){
  botmid('012_trees@7');
} else if(treepart == 10){
  topmid('012_trees@7');
} else if(treepart == 11){
  bridgeright('012_trees@7');
  bridgeleft();
  topleft('012_trees@12');
}  else if(treepart == 12){
  botmid('012_trees@11');
  bridgeright();
  bridgeleft();
  topleft('012_trees@14');
  topright('012_trees@13');
} else if(treepart == 13){
  botmid('012_trees@12');
//  ABILITIES.unlock("_treepart4");
} else if(treepart == 14){
}

var decor_zone = [events_zone[0]-150,events_zone[1]-150,events_zone[2]+150,events_zone[3]+150];


// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

if(treepart == 1){
  events_zone = undefined;
  new S_SavePoint(1975, 2200);
} else if(treepart == 7){
  new S_SavePoint(1975, 2200);
} else if(treepart == 8 || treepart == 9 || treepart == 10){
  var placeholder = new S_Placeholder(1975, 2200,50, 50);
}




// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================
var f = new Filler(gen.get());

var filler = new MultiFiller(f, 20, 20);
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
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================

if(treepart == 8 || treepart == 9 || treepart == 10){
  var b = new SE_groundItem(1975, 2200, ITEM.Branch);
  if (INVENTORY.count(ITEM.Branch) == 0){
    b.interaction = function(){
      var after = function(){
        TextBannerSequence.make([
          `However, you think that one branch is not going to be enough for anything. You convince yourself you need to find more.`,
          `You know there must be a certain symmetry in this forest. You decide to go back and explore the other paths in search for more branches.`,
        ]);
      }
      TextBannerSequence.make([
        `You notice that there is a weirdly shaped branch on the ground. Since it's not like the other ones, you think it could be important.`,
      ],  function(){ b.real_interaction(after);});
    };
  }
}

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================
var events = new EventFiller(filler, 5);
events.set_tries(1*multiplier, 8*multiplier);
events.battle('forests/tree',3);
events.battle('forests/trunk',3);
events.battle('forests/nymph',2);
events.battle('forests/flower');
events.battle('forests/mandragora');

/*
events.groundItem(ITEM.Stick, 0.5);
events.groundItem(ITEM.Berry, 0.5);
events.groundItem(ITEM.Flower, 0.5);
events.groundItem(ITEM.Mushroom);
events.battleRubble(ITEM.AncientRubbles, 0.5);
events.byConstructor("B_Plants", 2);
events.byConstructor("B_Skeleton", 1);

events.text('You do not see many creatures around you in these woods, but you do hear scratching and cracklings all around you. The feeling of there being something nearby watching you that you cannot pinpoint is especially nerve-wracking.');
events.text('The heavy vegetation around and above you is creating a very dark and damp place. The roots and bushes constantly hinder your progress, and when they\'re not you still have to contend with a very muddy floor. Your progress is slow and painful.');
events.text('Fruity aromas reach your nostrils, but you have a suspicion that they might be a treacherous lure from some exotic plant to push you into a trap. You brace yourself and continue on.');
events.text('The leaves and branches are so heavy here that you have to actively break them to make a path. Fortunately, it eases out before long, and you can go back to your usual velocity.');
*/

if(events_zone){
  events.set_zone(events_zone[0],events_zone[3],events_zone[2] - events_zone[0],events_zone[3] - events_zone[1]);
  events.fill_floor_by_retry();
}


if(placeholder){
  placeholder.destroy();
}
// ===================
//hack 7. START/INIT
// ===================
var start = function(t){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make(t, IO.control.character);
  };
}


if(treepart == 1){
  start([
    `You arrive at a the entrance of a very dense forest. The trees emanate a threatening aura. An altar of the Goddess stands a few steps before you. You ponder whether or not you should get in.`,
  ]);
} else if(treepart == 2){
  start([
      `You move forward in the woods. The vegetation grows very compact around you, so much so that it blocks almost all daylight. This seems like a place you would easily get lost in.`,
  ]);
} else if(treepart == 3){
  start([
      `When you come to a set of two open paths, you enter the one on your left after much hesitation.`,
  ]);
} else if(treepart == 5){
  var r = [];
  if(ABILITIES.has_ability("_treepart4")){
    r.push(`Despite struggling to find your way and refusing to accept your fate, you're finally on to the right path.`)
  }
  start(r.concat([
      `You now decide to make a turn to the left.`,
  ]));
} else if(treepart == 7){
  var r = [];
  if(ABILITIES.has_ability("_treepart6")){
    r.push(`Of course, you had reservations about your decision, but in the end turning left was the only sensible choice.`)
  }
  start(r.concat([
      `You are now in the depths of the forest. You get the feeling that this place is going to be very confusing. You wish you had a map. You consider drawing one yourself. You think it's very annoying that you have to do that in this day and age. You think there should be a map easy to access somewhere. Everything must have been charted by now...`,
      `Although, considering the complexity of the task, you also realize that this place must contain pretty powerful secrets. You wouldn't have to do so much efforts if the payoff wasn't worth it.`,
      `Comforted by that thought, you decide to follow your gut and pick a path at random.`,
  ]));
} else if(treepart == 11){
  var r = [];
  start(r.concat([
      `You hold the branches you found in front of your face, hoping to make your way deeper in the forest without being stopped by the vegetal guards.`,
      `You breathe a sigh of relief after witnessing that the sentinels have been fooled by your disguise. You're a bit surprised that such a simple idea did the trick. But you reason that since you're still not too deep in the forest, the guards you met were the weakest.`,
      `You continue on your exploration.`
  ]));
} else if(treepart == 12){
  start([
      `When you come to a set of two open paths, you enter again the one on your left.`,
  ]);
}


CURRENTLEVEL.initialize_with_character(2000, 2475);
