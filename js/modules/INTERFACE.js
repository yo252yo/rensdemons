const INTERFACE = {
  display_experience_menu: function() {
    var battles = ACTIONS.get_all_battles();
    var battles_options = [];
    for(var i in battles) {
      (function(index){
        battles_options.push({
          "text": battles[index] + " (" + ACTIONS.score.completion(battles[index]) + "%)",
          "effect": function(){ ACTIONS.display.display_tree(battles[index]); }
        });
      }(i));
    };


    battles_options.push({"text": "", "effect": function(){}, "keep_open": true});
    battles_options.push({"text": "Back", "effect": "##BACK"});

    new CenteredTextMenu(`<b>Ren</b> - level ` + ACTIONS.score.level() + ` (` + ACTIONS.score.total_xp() + ` xp)`,
      battles_options);
  },

  display_escape_menu: function() {
    new CenteredTextMenu("",
                  [
                    {"text": "Experience", "effect": function(){ INTERFACE.display_experience_menu(); }},
                    {"text": "Abilities", "effect": function(){ ABILITIES.display.list(); }},
                    {"text": "Inventory", "effect": function(){ INVENTORY.display.list(); }},
                    {"text": "", "effect": function(){}, "keep_open": true},
                    {"text": "Options", "effect": function(){ INTERFACE.display_options_menu(); }},
                    {"text": "Back to game", "effect": "##CLOSE"},
                    {"text": "Back to title", "effect": function(){ CURRENTLEVEL.setup("titlescreen"); }},
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
