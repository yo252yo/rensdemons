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

 CURRENTLEVEL.start_function = function(){welcome_boss.call()};
 CURRENTLEVEL.initialize_with_character(150, 150);



new S_battle(50, 170, 75, "viper");
new S_battle(200, 200, 25, "arachnid");
