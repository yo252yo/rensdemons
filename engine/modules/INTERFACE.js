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


      battles_options.push(TEXTMENU_EMPTYROW);
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
                      {"text": "Martyrdom", "effect": function(){ MARTYRDOM.display.menu(); }},
                      {"text": "Party", "effect": function(){ PARTY.display.menu(); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Options", "effect": function(){ INTERFACE.display.options_menu(); }},
                      {"text": "Help", "effect": function(){ INTERFACE.display.help_menu(); }},
                      {"text": "Back to title", "effect": function(){ CURRENTLEVEL.setup("titlescreen"); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Back to game", "effect": "##CLOSE"},
                   ]);
    },




    audio_menu: function() {
        new CenteredTextMenu(`
           <h3>Audio</h3>
           <b>Music</b>: <input type="range" min="1" max="100" value="` + (AUDIO.VOLUME.MUSIC * 100) + `" class="slider" id="myRange" onInput="AUDIO.set_volume('MUSIC', this.value);"><br />
           <b>Effects</b>: <input type="range" min="1" max="100" value="` + (AUDIO.VOLUME.SFX * 100) + `" class="slider" id="myRange" onInput="AUDIO.set_volume('SFX', this.value);">
           `, [
               {"text": "Back", "effect": "##BACK"}
            ]);
    },

    options_menu: function() {
      new CenteredTextMenu(`
                   <h3>Audio</h3>
                   <b>Music</b>: <input type="range" min="1" max="100" value="` + (AUDIO.VOLUME.MUSIC * 100) + `" class="slider" id="myRange" onInput="AUDIO.set_volume('MUSIC', this.value);"><br />
                   <b>Effects</b>: <input type="range" min="1" max="100" value="` + (AUDIO.VOLUME.SFX * 100) + `" class="slider" id="myRange" onInput="AUDIO.set_volume('SFX', this.value);">
                   `,
                    [
                      {"text": "Change color scheme", "effect": function(){ PALETTE.factory.make_new(); }, "keep_open": true},
                      TEXTMENU_EMPTYROW,
                      {"text": "Back", "effect": "##BACK"}
                   ]);
    },

    credits_menu: function() {
        new CenteredTextMenu(`
           <h3>Assets credits</h3>
           <b>Characters</b>: <a href="http://untamed.wild-refuge.net/rmxpresources.php?characters" target="_blank">Sithiester</a><br />
           <b>Events</b>: <a href="http://www.junkie-chain.jp/main.html" target="_blank">Junkie-chain</a><br />
           <b>Sound effects</b>: Audio Alchemist and <a href="https://opengameart.org/users/p0ss">p0ss</a><br />
           <b>Tiles</b>: REFMAP and FSM, Szadiart<br />
           <b>Map art</b>: MELLE, prushik
           `, [
               {"text": "Back", "effect": "##BACK"}
            ]);
    },

    help_menu: function() {
        new CenteredTextMenu(`
           <a href="https://gamefaqs.gamespot.com/company/198099-yo252yo" target="_blank">gamefaq</a>
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

  make_compass: function() {
    var compass = new StaticSprite("assets/interface/windrose.png", 'player');
    compass.container.id="fog_adjacent";
    compass.container.style.zIndex = 11000;
  }
}
