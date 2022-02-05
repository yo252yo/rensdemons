
class THOUGHTS {
  static thinkTrigger(thinker, start) {
      if(!STATS.is_post_game()){
        // only expose thoughts after the game has been cleared once
        return;
      }

      if (!start){
        // proba to actually think
        if (RANDOM.float() < 0.3) {
          thinker.think();
        }
      }
      var nextThoughtSeconds = 5 + RANDOM.int(30);
      thinker.thoughtsTimeout = setTimeout(function(){THOUGHTS.thinkTrigger(thinker)}, nextThoughtSeconds * 1000);
  }

  static stopThinking(thinker){
    if(thinker){
      thinker.killThoughtBubble();
      clearTimeout(thinker.thoughtsTimeout)
    }
  }

  static clearThoughtBubble(thinker) {
    if(thinker){
      thinker.killThoughtBubble();
    }
  }

  static checkThoughtBubble(thinker) {
    if(thinker && thinker.bubble){
      if(!CHARACTER.character){
        thinker.killThoughtBubble();
      } else if (Math.abs(thinker.x - CHARACTER.character.x) < GLITCH.BERKELEY_DISTANCE && Math.abs(thinker.y - CHARACTER.character.y) < GLITCH.BERKELEY_DISTANCE){
        thinker.killThoughtBubble();
      } else {
        setTimeout(function(){THOUGHTS.checkThoughtBubble(thinker)}, 500);
      }
    }
  }
}


const GLITCH = {
  BERKELEY_DISTANCE: 170,
  GLITCH_CHARACTER: "^",

  init_level:function(){
    if(STATS.is_post_game()){
      GLITCH.berkeley.update_surroundings();
    }
    if(STATS.flag(STAT.Glitches)){
      GLITCH.regular_glitch(true);
      if(!GLITCH.textInterval) {
        GLITCH.textInterval = setInterval(GLITCH.text.continuousProcess, 100);
      }
    }
  },

  regular_glitch: function(is_init){
    clearTimeout(GLITCH.regular_glitch_timeout);

    var delay = 4000 + 2000 * Math.random(); // About every 5 secs
    GLITCH.regular_glitch_timeout = setTimeout(GLITCH.regular_glitch, delay);

    if(!is_init){
      if (Math.random() < 0.08) { // Trigger every 5 seconds, we want a glitch per minute, so every 12 triggers
        GLITCH.screen.glitch();
      }
    }

  },

  berkeley: {
    update_surroundings: function() {
      var max = 1.5 * Math.max(SCREEN.width(), SCREEN.height());

      var c = CURRENTLEVEL.objects.get_all_objects();
      for(var o of c) {
        if(!CHARACTER.character || !CHARACTER.character.sprite){
          break; // fail fast on levels without character or when character isnt loaded
        }

        if (!o || o == CHARACTER.character || !o.distance_to_character || !o.visual_element){
          continue;
        }
        if(Math.random() < 0.1){
          continue; // glitches
        }

        /* // Version 1: super blinky
        var max = FOG.viewport() / 2;
        var min = GLITCH.BERKELEY_DISTANCE;
        var d = (min + max) / 2 + Math.random() * (max - min) / 2;
        if(o.distance_to_character() >  d) {
          o.visual_element.hide();
        } else {
          o.visual_element.show();
        }*/
        var d = o.distance_to_character();
        if (d > max){
          continue;
        } else if(d > FOG.viewport() / 2) {
          o.visual_element.hide();
        } else if (d < GLITCH.BERKELEY_DISTANCE) {
          o.visual_element.show();
        } else {
          /* // Version 2: objects in viewport stuck to hidden
          var r = Math.random();
          if(r < 0.2){
            o.visual_element.show();
          } else if(r > 0.97){
            o.visual_element.hide();
          }*/

          if(Math.random() < 0.98){
            o.visual_element.show();
          } else {
            o.visual_element.hide();
          }
        }
      }


      clearTimeout(GLITCH.berkeley_timeout); // avoid collisions since FOG.draw is called every level.
      var delay = 300 + 300 * (Math.random() - 0.5);
      GLITCH.berkeley_timeout = setTimeout(GLITCH.berkeley.update_surroundings, delay);
    },

    stop: function(){
      if(GLITCH.berkeley_timeout){
        clearTimeout(GLITCH.berkeley_timeout);
      }
    }
  },

  display_conscious_suffering: function() {
    for(var o of CURRENTLEVEL.objects.get_all_objects()){
      if (o && o.suffer && o.distance_to_character() > GLITCH.BERKELEY_DISTANCE) {
        if (Math.random() < 0.3){
          o.suffer();
        }
      }
    }
  },

  screen: {
    _move_html_element(id, top, left, opacity){
      var element = document.getElementById(id);
      if (element){
        element.style.marginTop = top +  "px";
        element.style.marginLeft = left +  "px";
        if(opacity){
          element.style.opacity = opacity;
        }
      }
    },
    activate_overlay: function() {
      if(Math.random() < 0.02){
        var g = document.getElementById("glitchcode");
        g.innerHTML = document.documentElement.innerHTML;
        g.style.visibility = "visible";
        return;
      }

      var g = document.getElementById("glitch");
      if (g){
        if (Math.random() > 0.05){
          g.style.top = Math.floor(Math.random() * (-200) - 10);
          g.style.left = Math.floor(Math.random() * (-200) - 10);
          g.style.backgroundImage= `url("assets/screens/noise.png")`;
          g.style.backgroundRepeat= `repeat`;
        } else {
          g.style.left = (-500 + SCREEN.width() / 2 ) +"px";
          g.style.top = "0px";
          g.style.backgroundImage= `url("assets/screens/warning.png")`;
          g.style.backgroundRepeat= `no-repeat`;
        }
        g.style.visibility = "visible";
      }
    },

    glitch: function(){
      AUDIO.effect.glitch();
      AUDIO.set_music_speed(0.5 + Math.random());

      GLITCH.screen.activate_overlay();

      var offset_top = Math.floor(Math.random() * 200 - 100);
      var offset_left = Math.floor(Math.random() * 200 - 100);

      GLITCH.screen._move_html_element("level", offset_top, offset_left, 0.5);
      GLITCH.screen._move_html_element("textBanner", offset_top, offset_left);
      GLITCH.screen._move_html_element("portrait_icon_container", offset_top, offset_left);
      GLITCH.screen._move_html_element("battle_menu", offset_top, offset_left);
      GLITCH.screen._move_html_element("battle_centered_img", offset_top, offset_left);
      GLITCH.screen._move_html_element("event_icon", offset_top, offset_left);
      GLITCH.text.fuckup_div("battle_menu");

      GLITCH.text.fuckup_banner();
      GLITCH.display_conscious_suffering();

      if(Math.random() < 0.3){ // dble glitch
        var delay = 25 + 175 * Math.random();
        setTimeout(GLITCH.screen.glitch, delay);
        setTimeout(PALETTE.factory.make_new, delay - 15);
      } else {
        setTimeout(GLITCH.screen.unglitch, 150 + 200 * Math.random());
      }
    },

    unglitch: function(){
      PALETTE.factory.make_new();
      document.getElementById("glitch").style.visibility = "hidden";
      document.getElementById("glitchcode").style.visibility = "hidden";

      GLITCH.screen._move_html_element("level", 0, 0, 1);
      GLITCH.screen._move_html_element("textBanner", 0, 0);
      GLITCH.screen._move_html_element("portrait_icon_container", 0, 0);
      GLITCH.screen._move_html_element("battle_menu", 0, 0);
      GLITCH.screen._move_html_element("battle_centered_img", 0, 0);
      GLITCH.screen._move_html_element("event_icon", 0, 0);
      GLITCH.text.restore_banner();
    },
  },

  text: {
    get_char: function(){
      var r = String.fromCharCode(Math.floor(128+Math.random()*128));
      if (Math.random() < 0.1){
        r += String.fromCharCode(Math.floor(128+Math.random()*128));
      }
      return r;
    },

    glitch: function(text, strength){
      var ntext = "";
      for (var i = 0; i < text.length; i++) {
          if (Math.random() < strength){
            ntext += GLITCH.GLITCH_CHARACTER;
          } else {
            ntext += text[i];
          }
      }
      return ntext;
    },

    process:function(text){
      var r = "";
      for(var i in text){
        if(text[i] == GLITCH.GLITCH_CHARACTER){
          GLITCH.screen.glitch();
          r += GLITCH.text.get_char();
        }
        else {
          r += text[i];
        }
      }
      return r;
    },

    continuousProcess: function(){
      var parent = document.getElementById("textBanner");
      if(!parent){
        return;
      }

      for (var node of parent.firstChild.childNodes){
        if (node.nodeType == Node.TEXT_NODE){
          var replacement = "";
          for (var i in node.textContent){
            if(node.textContent.charCodeAt(i) >= 128){
              if(node.textContent.charCodeAt(i-1) >= 128 && Math.random() < 0.3){
                continue;
              }
              replacement += GLITCH.text.get_char();
            } else {
              replacement += node.textContent[i];
            }
          }
          node.textContent = replacement;
        }
      }
    },

    fuckup_div: function(id){
      var parent = document.getElementById(id);
      if(!parent){
        return;
      }

      for (var node of parent.firstChild.childNodes){
        if (node.nodeType == Node.TEXT_NODE || node.nodeName == "DIV"){
          var isBattleMenu = node.nodeName == "DIV";
          var replacement = "";
          for (var c of node.textContent){
            if(Math.random() < (isBattleMenu ? 0.2 : 0.02)){
              replacement += GLITCH.text.get_char();
            } else {
              replacement += c;
            }
          }
          node.textContent = replacement;
        }
      }

    },

    fuckup_banner: function(){
      var banner = document.getElementById("textBanner");
      if (!banner){
        return;
      }

      if (Math.random() < 0.3){// Show console
        if(!GLITCH.saved_html) {
          GLITCH.saved_html = banner.firstChild.innerHTML;
        }
        banner.firstChild.innerHTML = "> " + CONSOLE.logs.slice(-4).join("<br />> ");
      } else {
        GLITCH.text.fuckup_div("textBanner");
      }
    },

    restore_banner: function(){
      var banner = document.getElementById("textBanner");
      if(banner && GLITCH.saved_html){
        banner.firstChild.innerHTML = GLITCH.saved_html;
        GLITCH.saved_html = undefined;
      }
    },
  },

}
