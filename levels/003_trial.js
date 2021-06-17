AUDIO.music.levels.trial();

//hack LAYOUT

new Snippet("levels/decors/maze");

// start
new SBattle(1525, 1075, '_003/_bone_pile');
new SE_small_groundItem(1675, 950, ITEM.Stone);

new SBattle(1375, 950, '_003/_first_friend_death');

new SBattle(1450, 1025, 'trial/rodent');
new SBattle(1575, 900, 'trial/viper');
new SBattle(1750, 1025, 'trial/rodent');
new SBattle(1575, 1175, 'trial/arachnid');

// round of loot
new SE_small_groundItem(1750, 950, ITEM.Stone);
new SE_small_groundItem(1200, 1050, ITEM.Bone);
new SB_rubble(1425, 1150, ITEM.Stick);
new SE_small_groundItem(1500, 1475, ITEM.Stick);
new SB_rubble(1800, 1175, ITEM.Stick);
new SB_rubble(1725, 1250, ITEM.Bone);
new SE_small_groundItem(1750, 1100, ITEM.Stone);
new SE_small_groundItem(2050, 1025, ITEM.Stone);

// main path
new SBattle(1350, 775, 'trial/arachnid');
new SBattle(1950, 350, 'trial/cockroach');
new SBattle(1500, 375, 'trial/rodent');
new SBattle(2300, 875, 'trial/arachnid');
new SBattle(900, 1025, 'trial/viper');
new SBattle(1225, 1475, 'trial/rodent');
new SBattle(1675, 1700, 'trial/viper');
new SBattle(2250, 1625, 'trial/cockroach');

// treasures
new SB_rubble(1275, 1400, ITEM.Elixir_fire);
new SB_rubble(1950, 800, ITEM.Elixir_fire);
new SB_rubble(2250, 425, ITEM.Elixir_fire);
new SB_rubble(900, 1475, ITEM.Elixir_fire);

// extras
new SE_small_groundItem(900, 1250, ITEM.Stone);
new SE_small_groundItem(2175, 275, ITEM.Stone);
new SE_small_groundItem(1075, 1550, ITEM.Stone);

new SB_rubble(1275, 1775, ITEM.Bone);
new SB_rubble(1725, 1550, ITEM.Bone);
new SE_small_groundItem(1575, 775, ITEM.Bone);

new SE_small_groundItem(2175, 900, ITEM.Stick);

new SBattle(1525, 1400, 'trial/cockroach');
new SBattle(1050, 575, 'trial/cockroach');

new SBattle(2250, 1325, 'trial/rodent');

new SE_event(1200, 650, 'A thought occurs to you: Who built this place? Was it designed to be a chamber for the Trial, or did the Church simply used what was there? You feel a chill down your spine as you imagine how many people before you roamed these dark hallways...');
new SE_event(2025, 1550, 'You find scratches on the wall. One child in the past tried to climb this wall. Did they want to dig a tunnel up? Were they trying to escape something crawling on the ground? You shiver thinking about it...', 25);
new SE_event(1125, 350, 'Oh, is that a clue to help you escape? No, it\'s just a weirdly shaped dent in the wall.', 25);
new SE_event(2325, 1775, 'You hear an ominous sound somewhere in the dark corridors. You wait for a few moments, but nothing happens. Was it just your imagination?', 25);
new SE_event(1850, 1400, 'You hear a growling in your stomach. It kindly reminds you that time is ticking, and your hours may be counted...', 50);
new SE_event(1725, 425, 'You find a pile of shredded snake skins. Clearly you found the den of a reptile...');
new SE_event(2200, 575, 'You find a sword on the ground! Oh, wait... no, it\'s just a useless piece of rock.');
new SE_event(2100, 1250, 'You\'re starting to lose hope to ever see the light of day again. Why must the Goddess torture you so? Wouldn\'t a quick end be more merciful?');
new SE_event(1425, 575, 'You find bones that pretty clearly draw the shape of a human child your age. You try your best to not think too much about their previous owner.', 25);
new SE_event(1200, 275, 'You find absolutely nothing, it\'s a dead end. You start to feel pretty gloomy about your chances of survival...', 50);

new B_Skeleton(1275, 1250);
new B_Skeleton(1875, 725);


//hack STATUES
var make_statue = function(x, y, position) {
  var statue = new B_Statue(x, y);
  var is_new = ! ABILITIES.has_ability("_trial_visited_" + position);
  statue.interaction = function() {
    if(ABILITIES.has_ability("_trial_passed")){
      CURRENTLEVEL.setup("004_trial_end");
    } else if (is_new) {
      ABILITIES.unlock("_trial_visited_" + position);
      var next = "first";
      switch(INVENTORY.count("_trial_statues")){
        case 1:
          next = "second"; break;
        case 2:
          next = "third"; break;
        case 3:
          next = "fourth"; break;
      }
      INVENTORY.increase("_trial_statues");
      BATTLETREE.api.unlock("_003/_statue", "Inspect " + next + " statue");
      BATTLE.api.make('_003/_statue');
    } else {
      BATTLE.api.make('_003/_statue');
    }
  };
}

make_statue(2410, 1020, "eastern");
make_statue(1655, 195, "northern");
make_statue(1585, 1850, "southern");
make_statue(830, 1025, "western");

//hack BEGINNING EVENT
var boss_callback = function() {
  SAVE.autosave();
  IO.control.character();
}

var welcome_boss = new Sequence();
welcome_boss.add_TextBannerSequence([
  "The floor on which you land is muddy and slimy. The atmosphere is heavy and damp. The stench of decomposition is overpowering. You barely have time to look around before a huge shape appears with a swooshing sound.",
]);
welcome_boss.add_function(function(ignored_callback) {
  BATTLE.api.make("basilisk", boss_callback);
});

// CURRENTLEVEL.start_function = boss_callback; //CAREFULL
CURRENTLEVEL.start_function =  function(){welcome_boss.call()};
CURRENTLEVEL.initialize_with_character(1650, 975);
