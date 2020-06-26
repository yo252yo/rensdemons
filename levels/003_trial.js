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



/*
var boss_callback = function() {
  CURRENTLEVEL.objects.remove_object(hp);
}

var hp_menu = function () {
  new CenteredTextMenu("",
                [
                  {"text": "Yes, sir", "effect": function(){ BATTLE.api.make("viper", boss_callback); }},
                  {"text": "Not yet", "effect": "##CLOSE"},
               ]
             );
}
/*
var boss_callback = function() {
  TextBannerSequence.make([
    "Everyone in the room was very excited. Some were yelling, some were dancing, other were just too stunned to realize what had happened.",
    "Priest: \"The day has finally come! The Promised Child is here! Praised be the Goddess.\"",
    "Priests and children alike were weeping tears of joys. For centuries, mankind had awaited this event. And now it was finally here. During their lifetime. In front of them. In their little town! The cheers lasted for a moment. Finally, the head priest turned towards Ren.",
    "Priest: \"Come, child. You have much to learn. Your journey is only beginning.\"",
  ], function(){ CURRENTLEVEL.setup("demoend"); });
}


var make_priest = function (x, y) {
  var priest = new M_Priest(x,y);
 return priest;
}
var hp = make_priest(175, 170);
hp.interaction = function() {
  TextBannerSequence.make([
    "The task that awaits you is a perillous one. You will most likely perish, like many before you. Are you ready? Did you pray for the Godess' power?"
  ], hp_menu);
}

*/

new S_battle(50, 170, 75, "viper");
new S_battle(200, 200, 25, "_viper");
