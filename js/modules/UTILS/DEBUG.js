
const DEBUG = {
  log_mouse_positions: function() {
    DEBUG.MOUSE_POSITIONS = true;
  },

  draw_mouse_rectangles: function() {
    DEBUG.MOUSE_RECTANGLES = true;
  },

  activate_character_tp: function() {
    DEBUG.TP_CHARACTER = true;
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

  allow_scroll: function() {
    document.body.style.overflow = "scroll";
  },

  all: function() {
    DEBUG.log_mouse_positions();
    DEBUG.draw_mouse_rectangles();
    DEBUG.draw_hitboxes();
    DEBUG.activate_character_tp();
    DEBUG.run_faster();
    DEBUG.allow_scroll();
    DEBUG.deactivate_scroll(); // This isnt great.
  },


  signal: {
    mouse_position: function(x, y) {
      if (DEBUG.MOUSE_POSITIONS) {
        CONSOLE.debug("Position:" + x + " / " + y);
      }
      if (DEBUG.TP_CHARACTER) {
        if (KEYS_UTIL.is_pressed.ctrl()){
          CHARACTER.initialize(x, y);
        }
      }
      if(DEBUG.MOUSE_RECTANGLES) {
        if (KEYS_UTIL.is_pressed.alt()){
          x = Math.round(x /25) * 25;
          y = Math.round(y /25) * 25;

          if (DEBUG._previous_x) {
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

            delete DEBUG._previous_x;
            delete DEBUG._previous_y;
          } else {
            DEBUG._previous_x = x;
            DEBUG._previous_y = y;
          }
        }
      }
    },
  }

}
