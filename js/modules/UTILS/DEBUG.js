
const DEBUG = {

  log_mouse_positions: function() {
    DEBUG.MOUSE_POSITIONS = true;
  },

  activate_character_tp: function() {
    DEBUG.TP_CHARACTER = true;
  },

  activate_builder: function() {
    DEBUG.ACTIVATE_BUILDER = true;
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
    DEBUG.activate_builder();
    BUILDER.activate.alt_hallways();
    BUILDER.activate.shift_brush();

    DEBUG.log_mouse_positions();
    DEBUG.draw_grid();
    //DEBUG.draw_hitboxes();
    DEBUG.activate_character_tp();
    DEBUG.run_faster();
    DEBUG.allow_scroll();
    DEBUG.deactivate_scroll(); // This isnt great.
    DEBUG.display_all_trees();
  },


  signal: {
    mouse_position: function(x, y) {
      if (DEBUG.ACTIVATE_BUILDER) {
        var intercepted = BUILDER.click(x,y);
        if(intercepted){ return; }
      }

      if (DEBUG.MOUSE_POSITIONS) {
        CONSOLE.debug("Position:" + x + " / " + y);
        //console.log(document.elementFromPoint(x - window.pageXOffset, y - window.pageYOffset));
      }
      if (DEBUG.TP_CHARACTER && KEYS_UTIL.is_pressed.ctrl()){
        CHARACTER.initialize(x, y);
      }
    },

    press_key: function(key) {
      if (DEBUG.ACTIVATE_BUILDER && key == "s" && KEYS_UTIL.is_pressed.ctrl()){
        BUILDER.export();
      }
    },
  },

}
