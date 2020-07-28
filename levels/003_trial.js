new Snippet("decors/maze");

var make_statue = function(x, y, direction) {
  var statue = new S_Statue(x, y);
  statue.interaction = function() {
    if(ABILITIES.has_ability("_passed_trial")){
      CURRENTLEVEL.setup("004_trial_end");
    } else {
      BATTLETREE.api.unlock("_003_statue", "Inspect " + direction + " statue");
      BATTLE.api.make('_003_statue');
    }
  };
}

make_statue(2410, 1020, "eastern");
make_statue(1655, 195, "northern");
make_statue(1585, 1850, "southern");
make_statue(830, 1025, "western");


new SE_battle(1525, 975, '_003_first_friend_death');
new SE_battle(1525, 1075, '_003_bone_pile');

new SE_battle(1675, 1100, '&You find scratches on the wall. One child in the past tried to climb this wall. Did they want to dig a tunnel up? Were they trying to escape something crawling on the ground? You shiver thinking about it...', 25);
new SE_battle(1275, 1400, '&You find bones that pretty clearly draw the shape of a human child your age. You try your best to not think too much about their previous owner.', 25);
new SE_battle(1200, 800, '&There\'s some sort of goo on the floor, but you cannot make out what it is. Best not to linger...', 50);
new SE_battle(1600, 650, '&You find a pile of shedded snake skins. Clearly you found the den of a reptile...');
new SE_battle(1575, 775, 'viper');
new SE_battle(2175, 275, '&You find absolutely nothing, it\'s a dead end. You start to feel pretty gloomy about your chances of survival...', 50);
new SE_battle(1875, 725, '&You hear a growling in your stomach. It kindly reminds you that time is ticking, and your hours may be counted...', 50);
new SE_battle(2125, 1450, '&Oh, is that a clue for the riddle? No, it\'s just a weirdly shaped dent in the wall.', 25);
new SE_battle(1500, 1600, '&A thought occurs to you: Who built this place? Was it designed to be a chamber for the Trial, or did the Church simply used what was there? You feel a chill down your spine as you imagine how many people before you roamed these dark hallways...');
new SE_battle(1075, 1150, '&You\'re starting to lose hope to ever see the light of day again. Why must the Goddess torture you so? Wouldn\'t a quick end be more mercyful?');
new SE_battle(2175, 575, '&You arrive at a crossroad where many paths converge, but you cannot shake the ominous feeling that it won\'t lead you to an exit.');
new SE_battle(1000, 350, '&You hear an ominous sound somewhere in the dark corridors. You wait for a few moments, but nothing happens. Was it just your imagination?', 25);
new SE_battle(1725, 1100, '&You find a sword on the ground! Oh, wait... no, it\'s just a useless piece of rock.');


new SE_battle(1725, 425, 'R' + ITEM.Elixir_fire);
new SE_battle(1050, 575, 'R' + ITEM.Elixir_fire);
new SE_battle(2250, 425, 'R' + ITEM.Elixir_fire);
new SE_battle(2175, 800, 'R' + ITEM.Elixir_fire);
new SE_battle(900, 1475, 'R' + ITEM.Elixir_fire);
new SE_battle(1500, 1775, 'R' + ITEM.Elixir_fire);
new SE_battle(2250, 1775, 'R' + ITEM.Elixir_fire);

new SE_battle(1500, 1475, 'R' + ITEM.Bone);
new SE_battle(1175, 1700, 'R' + ITEM.Bone);
new SE_battle(2100, 500, 'R' + ITEM.Bone);
new SE_small_treasure(1450, 925, ITEM.Bone);
new SE_small_treasure(2275, 1325, ITEM.Bone);
new SE_small_treasure(1700, 1525, ITEM.Bone);
new SE_small_treasure(1000, 1100, ITEM.Bone);
new SE_small_treasure(1225, 250, ITEM.Bone);

new SE_battle(1875, 1400, 'R' + ITEM.Stick);
new SE_battle(2175, 1175, 'R' + ITEM.Stick);
new SE_battle(1200, 650, 'R' + ITEM.Stick);
new SE_battle(2025, 650, 'R' + ITEM.Stick);
new SE_battle(1500, 1175, 'R' + ITEM.Stick);
new SE_small_treasure(1750, 925, ITEM.Stick);
new SE_small_treasure(1800, 800, ITEM.Stick);
new SE_small_treasure(925, 1225, ITEM.Stick);
new SE_small_treasure(1425, 550, ITEM.Stick);

new SE_small_treasure(1150, 325, ITEM.Stone);
new SE_small_treasure(1800, 625, ITEM.Stone);
new SE_small_treasure(2350, 550, ITEM.Stone);
new SE_small_treasure(2325, 800, ITEM.Stone);
new SE_small_treasure(1425, 800, ITEM.Stone);
new SE_small_treasure(1975, 800, ITEM.Stone);
new SE_small_treasure(1800, 1150, ITEM.Stone);
new SE_small_treasure(1525, 1400, ITEM.Stone);
new SE_small_treasure(2325, 1450, ITEM.Stone);
new SE_small_treasure(2050, 1175, ITEM.Stone);
new SE_small_treasure(1300, 1200, ITEM.Stone);
new SE_small_treasure(1075, 1300, ITEM.Stone);
new SE_small_treasure(1050, 900, ITEM.Stone);
new SE_small_treasure(1350, 400, ITEM.Stone);
new SE_small_treasure(1675, 500, ITEM.Stone);
new SE_small_treasure(2075, 875, ITEM.Stone);
new SE_small_treasure(1700, 1475, ITEM.Stone);
new SE_small_treasure(2100, 1675, ITEM.Stone);
new SE_small_treasure(2200, 1275, ITEM.Stone);


new SE_battle(1600, 1700, 'viper');
new SE_battle(2250, 1025, 'viper');
new SE_battle(2250, 1600, 'viper');
new SE_battle(1275, 1775, 'viper');
new SE_battle(1425, 350, 'viper');
new SE_battle(1575, 1125, 'viper');
new SE_battle(1775, 1025, 'viper');
new SE_battle(2025, 1575, 'viper');
new SE_battle(2175, 650, 'viper');

new SE_battle(2325, 900, 'rodent');
new SE_battle(875, 1025, 'rodent');
new SE_battle(1575, 875, 'rodent');
new SE_battle(2025, 1025, 'rodent');
new SE_battle(1050, 1550, 'rodent');
new SE_battle(1125, 800, 'rodent');
new SE_battle(1900, 650, 'rodent');

new SE_battle(1500, 275, 'arachnid');
new SE_battle(1375, 1025, 'arachnid');
new SE_battle(1800, 1775, 'arachnid');
new SE_battle(1050, 1100, 'arachnid');
new SE_battle(1325, 800, 'arachnid');
new SE_battle(1425, 1375, 'arachnid');
new SE_battle(2000, 1350, 'arachnid');

new SE_battle(1725, 1250, 'cockroach');
new SE_battle(1375, 1550, 'cockroach');
new SE_battle(1000, 500, 'cockroach');
new SE_battle(2325, 675, 'cockroach');
new SE_battle(2125, 1325, 'cockroach');
new SE_battle(2050, 1725, 'cockroach');
new SE_battle(1900, 1100, 'cockroach');
new SE_battle(1875, 875, 'cockroach');
new SE_battle(1950, 350, 'cockroach');
new SE_battle(1400, 1150, 'cockroach');
new SE_battle(1050, 325, 'cockroach');


CURRENTLEVEL.initialize_with_character(1650, 975);
