
const GLITCH = {
  BERKELEY_DISTANCE: 170,
  GLITCH_CHARACTERS: "###***||%%__",

  init_level:function(){
    if(STATS.is_post_game()){
      GLITCH.berkeley.update_surroundings();
    }
  },

  react_to_print_text:function(text){
    for(var c of text){
      if(GLITCH.GLITCH_CHARACTERS.includes(c)){
        GLITCH.screen.glitch();
      }
    }
  },

  berkeley: {
    update_surroundings: function() {
      var max = 1.5 * Math.max(SCREEN.width(), SCREEN.height());

      var c = CURRENTLEVEL.objects.get_all_objects();
      for(var o of c) {
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
  },

  screen: {
    glitch: function(){
      AUDIO.effect.glitch();
      var g = document.getElementById("glitch");
      if (g){
        g.style.visibility = "visible";
        g.style.top = Math.floor(Math.random() * (-200) - 10) + "px";
        g.style.left = Math.floor(Math.random() * (-200) - 10) + "px";
      }

      var offset_top = Math.floor(Math.random() * 200 - 100) + "px";
      var offset_left = Math.floor(Math.random() * 200 - 100) + "px";

      var l = document.getElementById("level");
      if (l){
        l.style.opacity = 0.5;
        l.style.top = offset_top;
        l.style.left = offset_left;
      }

      var t = document.getElementById("textBanner");
      if (t){
        t.style.marginTop = offset_top;
        t.style.marginTeft = offset_left;
      }


      setTimeout(GLITCH.screen.unglitch, 300);
    },

    unglitch: function(){
      document.getElementById("glitch").style.visibility = "hidden";

      var l = document.getElementById("level");
      if (l){
        l.style.opacity = 1;
        l.style.top = "0px";
        l.style.left = "0px";
      }
      var t = document.getElementById("textBanner");
      if (t){
        t.style.marginTop = "0px";
        t.style.marginTeft = "0px";
      }
    },
  },

  glitch_text: function(text, strength){
    var ntext = "";
    for (var i = 0; i < text.length; i++) {
        if (Math.random() < strength){
          ntext += RANDOM.pick(GLITCH.GLITCH_CHARACTERS);
        } else {
          ntext += text[i];
        }
    }
    return ntext;
  },
}
