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

 CURRENTLEVEL.start_function = boss_callback //;function(){welcome_boss.call()};
 CURRENTLEVEL.initialize_with_character(150, 150);



new S_battle(150, 575, "viper");
new S_battle(2550, 215, "viper");
new S_battle(2450, 300, "viper");
new S_battle(2650, 325, "viper");
new S_battle(700, 1625, "viper");
new S_battle(3250, 3125, "viper");
new S_battle(4590, 3075, "viper");

new S_battle(200, 2075, "arachnid");
new S_battle(1425, 200, "arachnid");
new S_battle(4850, 550, "arachnid");
new S_battle(5525, 3775, "arachnid");
new S_battle(3815, 1425, "arachnid");

new S_battle(4575, 2275, "cockroach");
new S_battle(4545, 2475, "cockroach");
new S_battle(4790, 2515, "cockroach");
new S_battle(4800, 2400, "cockroach");
new S_battle(5190, 2285, "cockroach");
new S_battle(5025, 2405, "cockroach");
new S_battle(4960, 2250, "cockroach");
new S_battle(4975, 2535, "cockroach");
new S_battle(5180, 2540, "cockroach");
new S_battle(5550, 2400, "cockroach");
new S_battle(5750, 1825, "cockroach");
new S_battle(4100, 2400, "cockroach");
new S_battle(2650, 1625, "cockroach");
new S_battle(2200, 2200, "cockroach");
new S_battle(3150, 600, "cockroach");
new S_battle(5675, 1335, "cockroach");
new S_battle(4900, 2250, "cockroach");
new S_battle(4660, 2360, "cockroach");
new S_battle(4520, 2565, "cockroach");
new S_battle(4925, 2555, "cockroach");
new S_battle(5135, 2265, "cockroach");
new S_battle(5155, 2500, "cockroach");
new S_battle(4535, 2240, "cockroach");
new S_battle(4620, 2320, "cockroach");
new S_battle(4510, 2370, "cockroach");
new S_battle(4805, 2255, "cockroach");
new S_battle(4690, 2550, "cockroach");
new S_battle(4935, 2355, "cockroach");
new S_battle(5970, 2430, "cockroach");
new S_battle(3175, 1875, "cockroach");

new S_battle(1285, 2195, "rodent");
 new S_battle(460, 3795, "rodent");
 new S_battle(3825, 3910, "rodent");
 new S_battle(2790, 2875, "rodent");
 new S_battle(4940, 4220, "rodent");
 new S_battle(6890, 2850, "rodent");
 new S_battle(2370, 820, "rodent");
 new S_battle(1580, 1820, "rodent");
 new S_battle(150, 2540, "rodent");
 new S_battle(1860, 2870, "rodent");
 new S_battle(2410, 3645, "rodent");
