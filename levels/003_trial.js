new Snippet("decors/maze");

var make_statue = function(x, y, direction) {
  var statue = new S_Statue(x, y);
  statue.interaction = function() {
    BATTLETREE.api.unlock("_003_statue", "Inspect " + direction + " statue");
    BATTLE.api.make('_003_statue');
  };
}

make_statue(2410, 1020, "eastern");
make_statue(1655, 195, "northern");
make_statue(1585, 1850, "southern");
make_statue(830, 1025, "western");


new SE_battle(1525, 975, '_003_first_friend_death');
new SE_battle(1525, 1075, '_003_bone_pile');
new SE_battle(1675, 1100, '&You find scratches on the wall. One child in the past tried to climb this wall. Did they want to dig a tunnel up? Were they trying to escape something crawling on the ground? You shiver thinking about it...', 25);


CURRENTLEVEL.initialize_with_character(1650, 975);
