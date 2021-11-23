const INTERFACE = {
  CROSS_CURSOR_DISPLAY_TIME: 200,

  text:{
    _martyrdom_notif: function() {
      if (MARTYRDOM.display.notif()) {
        return "<span style='color:red;font-weight:bold;'>*</span>";
      } else{
        return "";
      }
    },

    martyrdom: function() {
      return "Martyrdom" + INTERFACE.text._martyrdom_notif();
    },
  },

  game_title_string: function(){
    var number = STRING_UTILS.romanize(Math.max(1, 1+STATS.get(STAT.Endings)));
    return `Ren's Demons ${number}`;
  },

  game_title: function(){
    if(SCREEN.is_mobile()){
      var d = {
        top: -5,
        left:-5,
        height: 130,
        width: Math.floor(SCREEN.width())+10,
      };
    } else {
      var d = {
        top: 75,
        left: Math.floor(SCREEN.width() * 0.5)-250,
        height: 80,
        width: 500,
      };
    }

    var te = new TextElement(d.left,d.top+d.height, d.width, d.height);
    te.write(`<h2 style="text-align:center; margin:10px;text-shadow:#ffffff 0px 0px 8px; font-weight: bold;">${INTERFACE.game_title_string()}</h2>`);

    if(SCREEN.is_mobile()){
      te.container.style.opacity = 0.7;
    }
    return te;
  },

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
                      {"text": INTERFACE.text.martyrdom(), "effect": function(){ MARTYRDOM.display.menu(); }},
                      {"text": "Party", "effect": function(){ PARTY.display.menu(); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Options", "effect": function(){ INTERFACE.display.options_menu(); }},
                      {"text": "Help", "effect": function(){ INTERFACE.display.help_menu(); }},
                      {"text": "Back to title", "effect": function(){ CURRENTLEVEL.setup("titlescreen"); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Back to game", "effect": "##CLOSE"},
                   ]);
    },



    options_menu: function() {
      new CenteredTextMenu(`
                   <h3>Audio</h3>
                   <b>Music</b>: <input type="range" min="1" max="100" value="` + (SETTINGS.get('volume_music') * 100) + `" class="slider" id="myRange1" onInput="AUDIO.set_volume('volume_music', this.value/100);"><br />
                   <b>Effects</b>: <input type="range" min="1" max="100" value="` + (SETTINGS.get('volume_sfx') * 100) + `" class="slider" id="myRange2" onInput="AUDIO.set_volume('volume_sfx', this.value/100);">
                   <h3>Battles</h3>
                   <b>Challenge</b>: <input type="range" min="1" max="100" value="` + (SETTINGS.get('challenge_level') * 100) + `" class="slider" id="myRange3" onInput="SETTINGS.set('challenge_level', this.value/100);"><br />
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

    print_achieve:{
      party: function(){
        var r = "<div style='float:left;clear:both;position:relative;display:block;margin-bottom:20px;'>";
        for(var i in PARTYMEMBERS){
          if (i == PARTYMEMBERS.Ren){
          r += "<div id='character_portait_slot_" + i + "' onClick='AUDIO.music.interface.titlescreen();' style='border: thick double #aaaaaa;float:left;position:relative;display:block;width:125px;height:125px;'></div>";
          } else if(STATS.unlocked(i)){
            r += "<div id='character_portait_slot_" + i + "' onClick='AUDIO.music.characters." + i +"();' style='border: thick double #aaaaaa;float:left;position:relative;display:block;width:125px;height:125px;'></div>";
          } else if(PARTYMEMBERS.isPartyMember(i)){
            r += "<div style='float:left;position:relative;display:block;width:125px;height:125px;border: thick double #aaaaaa;opacity:0.3;'></div>";
          }
        }
        r+="</div>";
        return r;
      },

      artifacts: function(){
        var r = "<div style='float:left;clear:both;position:relative;display:block;margin-bottom:20px;'>";
        for(var i of ITEMS_ARCHETYPES[ITEMS_ARCHETYPES_NAMES.Artifact]){
          if(STATS.unlocked(i)){
            r += "<div id='character_portait_slot_" + i + "' style='border: thick double #aaaaaa;float:left;position:relative;display:block;width:50px;height:50px;'></div>";
          } else if(ITEM.isItem(i)){
            r += "<div style='float:left;position:relative;display:block;width:50px;height:50px;border: thick double #aaaaaa;opacity:0.3;'></div>";
          }
        }
        r+="</div>";
        return r;
      },

      endings: function(){
        var r = "";
        for(var i in ENDINGS){
          if(STATS.ending(ENDINGS[i])){
            r += `<span id='${ENDINGS[i]}'>&lt;${ENDINGS[i]}&gt;</span> `;
          } else {
            r += `<span style='opacity:0.2' id='${ENDINGS[i]}'>&lt;${ENDINGS[i]}&gt;</span> `;
          }
        }
        return r;
      },
    },

    achievements: function() {
          new CenteredTextMenu(`
        <h4 style="clear:both;display:block;">Threads of fate exploration</h4>
        ${STATS.get(STAT.MaxExplorationScore)} (level ${BATTLETREE.score.level(STATS.get(STAT.MaxExplorationScore))}/100)
        <h4 style="clear:both;display:block;">Party members</h4>
        ${INTERFACE.display.print_achieve.party()}
        <h4 style="clear:both;display:block;">Legendary weapons</h4>
        ${INTERFACE.display.print_achieve.artifacts()}
        <h4 style="clear:both;display:block;">Endings</h4>
        ${INTERFACE.display.print_achieve.endings()}
           `, [
               {"text": "Back", "effect": "##BACK"}
            ]);

        for(var i in PARTYMEMBERS){
          if(document.getElementById('character_portait_slot_' + i)){
            var d = document.getElementById('character_portait_slot_' + i);
            new LayeredImage("assets/portraits_large/" + i + "_$.png", 125, 125, d);
          }
        }
        for(var i of ITEMS_ARCHETYPES[ITEMS_ARCHETYPES_NAMES.Artifact]){
          if(document.getElementById('character_portait_slot_' + i)){
            var d = document.getElementById('character_portait_slot_' + i);
            new LayeredImage("assets/portraits_large/" + i + "_$.png", 50, 50, d);
          }
        }
    },
  },

  _click_marker_end: function () {
    var element = document.getElementById("IME_click_confirmation_cross");
    element.style.visibility = "hidden";
  },

  // should this be in IO ?
  click_marker: function(x,y, is_hold) {
    var element = document.getElementById("IME_click_confirmation_cross");
    element.style.left = x-12;
    element.style.top = y-12;
    element.style.visibility = "visible";
    AUDIO.effect.clickmove(is_hold);

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

      var m = "&nbsp;" + INTERFACE.text._martyrdom_notif();
      if (m == "&nbsp;"){
        m = "...";
      }
      escape_button.innerHTML = m;
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
  },

  is_trial: function(){
    return !(window.location.href.includes("ren") && !window.location.href.includes("trial"));
  },

  start_game: function(){
    if (INTERFACE.is_trial()){
      CURRENTLEVEL.setup("demo/town");
    } else {
      CURRENTLEVEL.setup("000_introduction$");
    }
  },

  autosave_notif: function(){
    var t = new TextElement(50,100,250,50);
    t.html.style.textAlign = "center";
    t.write("AUTOSAVING...");

    setTimeout(function(){t.destroy();}, 1000);
  },
}
