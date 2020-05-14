const INTERFACE = {
  display_experience_menu: function() {
    var battles = ABILITIES.get_all_battles();
    var battles_options = [];
    for(var i in battles) {
      (function(index){
        battles_options.push({
          "text": battles[index] + " (" + ABILITIES.completion(battles[index]) + "%)",
          "effect": function(){ ABILITIES.display_tree(battles[index]); }
        });
      }(i));
    };


    battles_options.push({"text": "", "effect": function(){}, "keep_open": true});
    battles_options.push({"text": "Back", "effect": "##BACK"});

    new CenteredTextMenu(`<b>Ren</b> - level ` + ABILITIES.level() + ` (` + ABILITIES.total_xp() + ` xp)`,
      battles_options);
  },

  display_escape_menu: function() {
    new CenteredTextMenu("",
                  [
                    {"text": "Experience", "effect": function(){ INTERFACE.display_experience_menu(); }},
                    {"text": "", "effect": function(){}, "keep_open": true},
                    {"text": "Options", "effect": function(){ INTERFACE.display_options_menu(); }},
                    {"text": "Back to game", "effect": "##CLOSE"},
                    {"text": "Back to title", "effect": function(){ LEVEL.setup("titlescreen"); }},
                 ]);
  },

  display_options_menu: function() {
    new CenteredTextMenu("",
                  [
                    {"text": "Change color scheme", "effect": function(){ PALETTE.factory.make_new(); }, "keep_open": true},
                    {"text": "Back", "effect": "##BACK"}
                 ]);
  },
}
