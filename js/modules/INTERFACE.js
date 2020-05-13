const INTERFACE = {
  display_status_menu: function() {
    new MenuScreen(`
      <h2>Ren</h2>
      Level: ` + ABILITIES.level() + ` (` + ABILITIES.total_xp() + ` xp)`
    );
  },

  display_escape_menu: function() {
    new CenteredTextMenu("",
                  [
                    {"text": "Status", "effect": function(){ INTERFACE.display_status_menu(); }},
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
