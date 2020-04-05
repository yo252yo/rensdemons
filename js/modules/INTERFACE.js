const INTERFACE = {
  display_escape_menu: function() {
    new TextMenu("",
                  [
                    {"text": "Back to title", "effect": function(){ LEVEL.setup("titlescreen"); return true; }},
                    {"text": "Options", "effect": function(){ INTERFACE.display_options_menu(); return true; }},
                    {"text": "Back to game", "effect": "##CLOSE"}
                 ]);
  },

  display_options_menu: function() {
    new TextMenu("",
                  [
                    {"text": "Change colors", "effect": function(){ PALETTE.factory.make_new(); return true; }},
                    {"text": "Close", "effect": "##CLOSE"}
                 ]);
  },
}
