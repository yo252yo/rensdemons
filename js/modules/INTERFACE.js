const INTERFACE = {
  display_escape_menu: function() {
    new TextMenu("",
                  [
                    {"text": "Back to title", "effect": function(){ LEVEL.setup("titlescreen"); return true; }},
                    {"text": "Back to game", "effect": "##CLOSE"}
                 ]);
  },
}
