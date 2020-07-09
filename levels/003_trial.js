AUDIO.music.trial();

new Snippet("decors/trial");

var boss_callback = function() {
  SAVE.autosave();
  IO.control.character();
}

var welcome_boss = new Sequence();
welcome_boss.add_TextBannerSequence([
  "The floor on which Ren lands is muddy and slimy. The atmosphere is heavy and damp. The stench of decomposition is overpowering. Ren barely has time to look around before a huge shape appears with a swooshing sound.",
]);
welcome_boss.add_function(function(ignored_callback) {
  BATTLE.api.make("basilisk", boss_callback);
});

 CURRENTLEVEL.start_function = boss_callback; //CAREFULL
// CURRENTLEVEL.start_function =  function(){welcome_boss.call()};
 CURRENTLEVEL.initialize_with_character(150, 150);

// new SE_battle(70, 225, "T" + ITEM.Stick);
new SE_battle(1610, 105, "T" + ITEM.Elixir_fire);
new SE_battle(2855, 1700, "T" + ITEM.Elixir_fire);
new SE_battle(3015, 1665, "T" + ITEM.Elixir_fire);
new SE_battle(4925, 1690, "T" + ITEM.Elixir_fire);
new SE_battle(2430, 3315, "T" + ITEM.Elixir_fire);
new SE_battle(4875, 330, "T" + ITEM.Elixir_fire);
new SE_battle(4875, 330, "T" + ITEM.Elixir_fire);

new SE_battle(625, 2365,  "T" + ITEM.Sword_wooden);


new SE_small_treasure(210, 205, ITEM.Stick);
new SE_small_treasure(1180, 755, ITEM.Stick);
new SE_small_treasure(1735, 85, ITEM.Stick);
new SE_small_treasure(450, 2185, ITEM.Stick);
new SE_small_treasure(1170, 3085, ITEM.Stick);
new SE_small_treasure(1750, 3895, ITEM.Stick);
new SE_small_treasure(1750, 3895, ITEM.Stick);
new SE_small_treasure(3355, 3860, ITEM.Stick);
new SE_small_treasure(3175, 2905, ITEM.Stick);
new SE_small_treasure(6195, 3035, ITEM.Stick);
new SE_small_treasure(5730, 1455, ITEM.Stick);
new SE_small_treasure(3830, 1265, ITEM.Stick);
new SE_small_treasure(3830, 1265, ITEM.Stick);
new SE_small_treasure(3265, 1680, ITEM.Stick);
new SE_small_treasure(4315, 445, ITEM.Stick);
new SE_small_treasure(2130, 1035, ITEM.Stick);
new SE_small_treasure(2130, 1035, ITEM.Stick);
new SE_small_treasure(2575, 250, ITEM.Stick);

new SE_small_treasure(770, 425, ITEM.Stone);
new SE_small_treasure(660, 690, ITEM.Stone);
new SE_small_treasure(1705, 445, ITEM.Stone);
new SE_small_treasure(3025, 495, ITEM.Stone);
new SE_small_treasure(3350, 630, ITEM.Stone);
new SE_small_treasure(4295, 540, ITEM.Stone);
new SE_small_treasure(5290, 1235, ITEM.Stone);
new SE_small_treasure(5410, 2425, ITEM.Stone);
new SE_small_treasure(5410, 2425, ITEM.Stone);
new SE_small_treasure(5120, 2305, ITEM.Stone);
new SE_small_treasure(4955, 2415, ITEM.Stone);
new SE_small_treasure(4710, 2390, ITEM.Stone);
new SE_small_treasure(5155, 2570, ITEM.Stone);
new SE_small_treasure(4470, 2450, ITEM.Stone);
new SE_small_treasure(6170, 3130, ITEM.Stone);
new SE_small_treasure(5165, 3805, ITEM.Stone);
new SE_small_treasure(3130, 3320, ITEM.Stone);
new SE_small_treasure(3130, 3320, ITEM.Stone);
new SE_small_treasure(2750, 3660, ITEM.Stone);
new SE_small_treasure(3665, 1470, ITEM.Stone);
new SE_small_treasure(3665, 1470, ITEM.Stone);
new SE_small_treasure(2835, 1830, ITEM.Stone);
new SE_small_treasure(1690, 2230, ITEM.Stone);
new SE_small_treasure(1040, 2195, ITEM.Stone);
new SE_small_treasure(685, 2315, ITEM.Stone);


new SE_battle(70, 125, "&You find on the ground the corpse of $$child_friends_m1$. It's obviously in a pretty bad shape, the Basilisk really did a number on him. You avert your eyes from the bloody remains. It's too much to handle.");
new SE_battle(380, 530, "&You find scratches on the wall. One child in the past tried to climb this wall. Did they want to dig a tunnel up? Were they trying to escape something crawling on the ground? You shiver thinking about it...");

new SE_battle(125, 575, "viper");
new SE_battle(2550, 215, "viper");
new SE_battle(2450, 300, "viper");
new SE_battle(2650, 325, "viper");
new SE_battle(700, 1625, "viper");
new SE_battle(3250, 3125, "viper");
new SE_battle(4590, 3075, "viper");

new SE_battle(200, 2075, "arachnid");
new SE_battle(1425, 200, "arachnid");
new SE_battle(4850, 550, "arachnid");
new SE_battle(5525, 3775, "arachnid");
new SE_battle(3815, 1425, "arachnid");

new SE_battle(4575, 2275, "cockroach");
new SE_battle(4545, 2475, "cockroach");
new SE_battle(4790, 2515, "cockroach");
new SE_battle(4800, 2400, "cockroach");
new SE_battle(5190, 2285, "cockroach");
new SE_battle(5025, 2405, "cockroach");
new SE_battle(4960, 2250, "cockroach");
new SE_battle(4975, 2535, "cockroach");
new SE_battle(5180, 2540, "cockroach");
new SE_battle(5550, 2400, "cockroach");
new SE_battle(5750, 1825, "cockroach");
new SE_battle(4100, 2400, "cockroach");
new SE_battle(2650, 1625, "cockroach");
new SE_battle(2200, 2200, "cockroach");
new SE_battle(3150, 600, "cockroach");
new SE_battle(5675, 1335, "cockroach");
new SE_battle(4900, 2250, "cockroach");
new SE_battle(4660, 2360, "cockroach");
new SE_battle(4520, 2565, "cockroach");
new SE_battle(4925, 2555, "cockroach");
new SE_battle(5135, 2265, "cockroach");
new SE_battle(5155, 2500, "cockroach");
new SE_battle(4535, 2240, "cockroach");
new SE_battle(4620, 2320, "cockroach");
new SE_battle(4510, 2370, "cockroach");
new SE_battle(4805, 2255, "cockroach");
new SE_battle(4690, 2550, "cockroach");
new SE_battle(4935, 2355, "cockroach");
new SE_battle(5970, 2430, "cockroach");
new SE_battle(3175, 1875, "cockroach");

new SE_battle(1285, 2195, "rodent");
new SE_battle(460, 3795, "rodent");
new SE_battle(3825, 3910, "rodent");
new SE_battle(2790, 2875, "rodent");
new SE_battle(4940, 4220, "rodent");
new SE_battle(6890, 2850, "rodent");
new SE_battle(2370, 820, "rodent");
new SE_battle(1580, 1820, "rodent");
new SE_battle(150, 2540, "rodent");
new SE_battle(1860, 2870, "rodent");
new SE_battle(2410, 3645, "rodent");

new SE_battle(3685, 1375, "_trial_clue", 150);
new SE_battle(1150, 4500, "_trial_exit", 150);
