const INTERFACE = {
  display_escape_menu: function() {
    new CenteredTextMenu("",
                  [
                    {"text": "Options", "effect": function(){ INTERFACE.display_options_menu(); return true; }},
                    {"text": "Back to game", "effect": "##CLOSE"},
                    {"text": "Back to title", "effect": function(){ LEVEL.setup("titlescreen"); return true; }},
                 ]);
  },

  display_options_menu: function() {
    new CenteredTextMenu("",
                  [
                    {"text": "Change color scheme", "effect": function(){ PALETTE.factory.make_new(); return false; }},
                    {"text": "Back", "effect": "##BACK"}
                 ]);
  },
}
