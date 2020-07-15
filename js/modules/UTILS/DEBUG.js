
const DEBUG = {
  log_mouse_positions: function() {
    DEBUG.MOUSE_POSITIONS = true;
  },

  draw_mouse_rectangles: function() {
    DEBUG.MOUSE_RECTANGLES = true;
  },

  draw_mouse_hallways: function() {
    DEBUG.MOUSE_HALLWAYS = true;
  },

  draw_component: function() {
    DEBUG.COMPONENT = true;
  },

  activate_character_tp: function() {
    DEBUG.TP_CHARACTER = true;
  },

  display_all_trees: function() {
    DEBUG.DISPLAY_ALL_TREES = true;
  },

  deactivate_scroll: function() {
    DEBUG.DEACTIVATE_SCROLL = true;
  },

  run_faster: function() {
    MovingObject._RUNNING_BONUS = 10;
  },

  draw_hitboxes: function() {
    for(var i in CURRENTLEVEL.level_objects) {
      if (CURRENTLEVEL.level_objects[i].draw_hitbox) {
        CURRENTLEVEL.level_objects[i].draw_hitbox();
      }
    }
  },

  draw_grid: function() {
    for(var i=0; i<100;i++) {
      var row = HTML.div.make({
        w:2500,
        h:1,
        top:25*i,
        left:0,
        z:1000,
        border: "1px dotted #FFFFFF33"
      });
      CURRENTLEVEL.system.html().appendChild(row);
       var column = HTML.div.make({
        w:1,
        h:2500,
        top:0,
        left:25*i,
        z:1000,
        border: "1px dotted #FFFFFF33"
      });
      CURRENTLEVEL.system.html().appendChild(column);
    }
  },

  allow_scroll: function() {
    document.body.style.overflow = "scroll";
  },

  all: function() {
    DEBUG.log_mouse_positions();
    DEBUG.draw_mouse_hallways();
    DEBUG.draw_component();
    DEBUG.draw_grid();
    DEBUG.draw_hitboxes();
    DEBUG.activate_character_tp();
    DEBUG.run_faster();
    DEBUG.allow_scroll();
    DEBUG.deactivate_scroll(); // This isnt great.
    DEBUG.display_all_trees();
  },


  signal: {
    _draw_mouse_rectangle: function(x, y){
        var w = Math.abs(x - DEBUG._previous_x);
        var h = Math.abs(y - DEBUG._previous_y);
        var x = Math.min(x, DEBUG._previous_x);
        var y = Math.max(y, DEBUG._previous_y);
        var color = Color.random().code();

        CONSOLE.debug("new S_Floor(" + x + "," + y + "," + w + "," + h + ");", color);

        var html_rectangle = HTML.div.make({
          top: (y-h),
          left: x,
          w: w,
          h: h,
          background: color,
        });
        CURRENTLEVEL.system.html().appendChild(html_rectangle);
    },

    _draw_mouse_hallways: function(x, y){
        var w = Math.abs(x - DEBUG._previous_x) + 50;
        var h = Math.abs(y - DEBUG._previous_y) + 50;
        var x = Math.min(x, DEBUG._previous_x) - 25;
        var y = Math.max(y, DEBUG._previous_y) + 25;
        var color = Color.random().code();

        CONSOLE.debug("new S_Floor(" + x + "," + y + "," + w + "," + h + ");", color);

        var html_rectangle = HTML.div.make({
          top: (y-h),
          left: x,
          w: w,
          h: h,
          background: color,
        });
        CURRENTLEVEL.system.html().appendChild(html_rectangle);
    },

    mouse_position: function(x, y) {
      if (DEBUG.COMPONENT && KEYS_UTIL.is_pressed.shift()){
        x = Math.round(x/5)*5;
        y = Math.round(y/5)*5;
        new SE_battle(x, y, "#COMPONENT");
        CONSOLE.debug('new SE_battle('+x+', '+y+', "#COMPONENT");');
        return;
      }
      if (KEYS_UTIL.is_pressed.alt()){
        x = Math.round(x /25) * 25;
        y = Math.round(y /25) * 25;
        if (DEBUG._previous_x) {
          if (DEBUG.MOUSE_RECTANGLES){
            DEBUG.signal._draw_mouse_rectangle(x, y);
          } else if (DEBUG.MOUSE_HALLWAYS){
            DEBUG.signal._draw_mouse_hallways(x, y);
          }
          delete DEBUG._previous_x;
          delete DEBUG._previous_y;
        } else {
          DEBUG._previous_x = x;
          DEBUG._previous_y = y;
        }
        return;
      }
      if (DEBUG.MOUSE_POSITIONS) {
        CONSOLE.debug("Position:" + x + " / " + y);
      }
      if (DEBUG.TP_CHARACTER && KEYS_UTIL.is_pressed.ctrl()){
        CHARACTER.initialize(x, y);
      }
    },
  }

}
