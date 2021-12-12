// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.trees();

var treepart = 1;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  treepart= parseInt(s[1]);
}
var gen = new Generator(DICTIONARY.get("world_seed")*57);

// ===================
//hack 1. FLOORS
// ===================

var event_floors = [];
var decor_zone = [1800,2550,400,725];
if(treepart == 1){
  new S_LushFloor(1950,2450,100,500);
} else if(treepart == 2){
  event_floors.push(new S_LushFloor(1950,2450,100,500));
} else if(treepart == 3){
  event_floors.push(new S_LushFloor(1950,2450,100,250));
  event_floors.push(new S_LushFloor(1800,2275,400,125));
  new S_LushFloor(1800,2175,100,100);
  new S_LushFloor(2100,2175,100,100);

  decor_zone = [1700,2550,600,600];
}

// ===================
//hack 2. EXIT
// ===================

if(treepart == 1) {
  new S_ExitFloor(1900,2500,200,75, '010_world_map');
  new S_ExitFloor(1950,1975,100,50, '012_trees@2');
} else if(treepart == 2){
  new S_ExitFloor(1950,2475,100,50, '012_trees');
  new S_ExitFloor(1950,1975,100,50, '012_trees@3');
} else if(treepart == 3){
  new S_ExitFloor(1950,2475,100,50, '012_trees@2');

  new S_ExitFloor(1800,2100,100,50); // next
  new S_ExitFloor(2100,2100,100,50); // cul de sac
}

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

if(treepart == 1){
  new S_SavePoint(1975, 2250);
}

// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================
var f = new Filler(gen.get());

var filler = new MultiFiller(f);
filler.set_zone(decor_zone[0],decor_zone[1],decor_zone[2],decor_zone[3]);
filler.set_tries(30, 50);

filler.add_default_constructor("S_Tree", 3, 30, 10);
// need new varieties of trees
filler.fill_decor_by_retry(true);

filler.clear();
filler.set_tries(0, 2);
for(var f of event_floors) {
  filler.set_zone_from_floor(f);
  filler.add_default_constructor("S_PlantSmall", 1, 20, 20);
  filler.fill_floor_by_retry();
}

// ===================
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
// ===================


// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================
var events = new EventFiller(filler, 5);
events.set_tries(5, 10);
events.battle('forests/boar');
/*
events.battle('forests/flower');
events.battle('forests/fox');
events.battle('forests/mandragora');
events.battle('forests/squirrel');
events.battle('forests/morel',3);
events.battle('forests/truffle',3);
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
for(var f of event_floors) {
  events.set_zone_from_floor(f);
  events.fill_floor_by_retry();
}


// ===================
//hack 7. START/INIT
// ===================


if(treepart == 1){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `You arrive at a the entrance of a very dense forest. The trees emanate a threatening aura. An altar of the Goddess stands a few steps before you. You ponder whether or not you should get in.`,
    ], IO.control.character);
  };
} else if(treepart == 2){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `You move forward in the woods. The vegetation grows very compact around you, so much so that it blocks almost all daylight. This seems like a place you would easily get lost in.`,
    ], IO.control.character);
  };
} else if(treepart == 3){
  CURRENTLEVEL.start_function = function() {
    TextBannerSequence.make([
      `When you come to a set of two open paths, you entered the one on your left after much hesitation.`,
    ], IO.control.character);
  };
}


CURRENTLEVEL.initialize_with_character(2000, 2450);
