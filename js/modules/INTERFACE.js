const INTERFACE = {
  CROSS_CURSOR_DISPLAY_TIME: 200,

  display: {
    experience_menu: function() {
      var battles = BATTLETREE.get.all_battles();
      var battles_options = [];
      for(var i in battles) {
        (function(index){
          battles_options.push({
            "text": battles[index] + " (" + BATTLETREE.score.completion(battles[index]) + "%)",
            "effect": function(){ BATTLETREE.display.display_tree(battles[index]); }
          });
        }(i));
      };


      battles_options.push({"text": "", "effect": function(){}, "keep_open": true});
      battles_options.push({"text": "Back", "effect": "##BACK"});

      new CenteredTextMenu(`<b>Ren</b> - level ` + BATTLETREE.score.level() + ` (` + BATTLETREE.score.total_xp() + ` xp)`,
        battles_options);
    },

    escape_menu: function() {
      AUDIO.effect.page();
      new CenteredTextMenu("",
                    [
                      {"text": "Experience", "effect": function(){ INTERFACE.display.experience_menu(); }},
                      {"text": "Abilities", "effect": function(){ ABILITIES.display.list(); }},
                      {"text": "Inventory", "effect": function(){ INVENTORY.display.list(); }},
                      {"text": "", "effect": function(){}, "keep_open": true},
                      {"text": "Back to game", "effect": "##CLOSE"},
                      {"text": "", "effect": function(){}, "keep_open": true},
                      {"text": "Options", "effect": function(){ INTERFACE.display.options_menu(); }},
                      {"text": "Back to title", "effect": function(){ CURRENTLEVEL.setup("titlescreen"); }},
                   ]);
    },

    options_menu: function() {
      new CenteredTextMenu("",
                    [
                      {"text": "Change color scheme", "effect": function(){ PALETTE.factory.make_new(); }, "keep_open": true},
                      {"text": "Back", "effect": "##BACK"}
                   ]);
    },

    credits_menu: function() {
        new CenteredTextMenu(`
           <h3>Assets credits</h3>
           <b>Characters</b>: <a href="http://untamed.wild-refuge.net/rmxpresources.php?characters" target="_blank">Sithiester</a><br />
           <b>Events</b>: <a href="http://www.junkie-chain.jp/main.html" target="_blank">Junkie-chain</a><br />
           <b>Sound effects</b>: Audio Alchemist and <a href="https://opengameart.org/users/p0ss">p0ss</a><br />
           <b>Tiles</b>: REFMAP and FSM, Szadiart
           `, [
               {"text": "Back", "effect": "##BACK"}
            ]);
    },
  },

  _click_marker_end: function () {
    var element = document.getElementById("IME_click_confirmation_cross");
    element.style.visibility = "hidden";
  },

  // should this be in IO ?
  click_marker: function(x,y) {
    var element = document.getElementById("IME_click_confirmation_cross");
    element.style.left = x-12;
    element.style.top = y-12;
    element.style.visibility = "visible";
    AUDIO.effect.clickmove();

    if(INTERFACE._previous_timeout){
      clearTimeout(INTERFACE._previous_timeout);
    }
    INTERFACE._previous_timeout = setTimeout(INTERFACE._click_marker_end, INTERFACE.CROSS_CURSOR_DISPLAY_TIME);
  },


  draw: {
    escape_button: function() {
      var escape_button = document.getElementById('IFE_escape_menu_button');
      escape_button.style.background = PALETTE.text_background().code();
      escape_button.style.borderColor = PALETTE.text_border().code();
      escape_button.style.color = PALETTE.text_color().code();
    },

    click_marker: function() {
      var canvas =  document.getElementById("IME_click_confirmation_cross");
      HTML.canvas.draw(canvas, "assets/interface/cross.png", "player");
    },
  },

  color_interface: function() {
    document.body.style.backgroundColor = PALETTE.color('void').code();
    INTERFACE.draw.escape_button();
    INTERFACE.draw.click_marker();
    CURRENTLEVEL.system.redraw();
  },
}
