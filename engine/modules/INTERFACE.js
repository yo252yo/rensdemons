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

      new CenteredTextMenu(`<b>${DICTIONARY.get(PARTYMEMBERS.Ren)}</b> - level ` + BATTLETREE.score.level() + ` (` + INVENTORY.count(ITEM.XpToken) + ` xp gathered)`,
        battles_options);
    },

    escape_menu: function() {
      AUDIO.effect.page();
      new CenteredTextMenu("",
                    [
                      {"text": "Experience", "effect": function(){ INTERFACE.display.experience_menu(); }},
                      {"text": "Abilities", "effect": function(){ ABILITIES.display(); }},
                      {"text": "Inventory", "effect": function(){ INVENTORY.display(); }},
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
        new CenteredTextMenu(CREDITS.credits, [
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

    data_menu: function() {
      var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(DISK._CONTENT));
      new CenteredTextMenu(`
           All game data (save files, settings, etc...) is saved in your <b>web browser</b>.<br /><br />
           If you want to share it between different devices, different browsers, or to save before you reset your browser, you can use this menu to <b>download all data to your hard drive</b>.<br /><br />
           Download your data by clicking <a href="data:${data}" download="rens_demons.json">[HERE]</a><br />
           Upload downloaded data: <input type="file" id="fileInput" onChange="DISK.restore_from_file()" />
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
    document.body.style.backgroundColor = PALETTE.body_color().code();
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
