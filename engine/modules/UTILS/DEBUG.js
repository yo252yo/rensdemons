
const DEBUG = {
  battle_log: new FluidMap(),

  log_mouse_positions: function() {
    DEBUG.MOUSE_POSITIONS = true;
  },

  activate_builder: function() {
    DEBUG.ACTIVATE_BUILDER = true;
  },

  display_all_trees: function() {
    DEBUG.DISPLAY_ALL_TREES = true;
  },

  display_filler_zones: function() {
    DEBUG.DISPLAY_FILLER_ZONES = true;
  },

  deactivate_scroll: function() {
    DEBUG.DEACTIVATE_SCROLL = true;
    window.removeEventListener('scroll', IO.handlers.onScroll);
    window.removeEventListener('resize', IO.handlers.onScroll);
    window.removeEventListener('wheel', IO.handlers.onWheel);
  },

  draw_hitboxes: function(even_floors) {
    var objects = CURRENTLEVEL.objects.get_all_objects();
    for(var i in objects) {
      if (objects[i] && objects[i].draw_hitbox) {
        objects[i].draw_hitbox(even_floors);
      }
    }
  },

  draw_grid: function() {
    for(var i=0; i<100;i++) {
      var row = HTML.div.make({
        w:2500,
        h:1,
        top:1000+25*i,
        left:1000+0,
        z:1000,
        border: "1px dotted #FFFFFF33"
      });
      CURRENTLEVEL.system.html().appendChild(row);
       var column = HTML.div.make({
        w:1,
        h:2500,
        top:1000+0,
        left:1000+25*i,
        z:1000,
        border: "1px dotted #FFFFFF33"
      });
      CURRENTLEVEL.system.html().appendChild(column);
    }
  },

  reroll_seeds: function(){
    DICTIONARY.factory.make_new();
    STATS.record.death(11); // to get non harmonized palette.
    PALETTE.factory.make_new();
  },

  all: function() {
    DEBUG.activate_builder();
    BUILDER.activate.alt_hallways();
    BUILDER.activate.shift_brush();

    //DEBUG.log_mouse_positions();
  //  DEBUG.draw_grid();

    THAUMATURGY.teleport = true;
    THAUMATURGY.run_faster();
    THAUMATURGY.remove_camera_lock();;
    THAUMATURGY.get_all_abilities();
    THAUMATURGY.get_all_items();
    THAUMATURGY.get_all_party_members();

    DEBUG.reroll_seeds();
    //  DEBUG.deactivate_scroll(); // This isnt great.
      //DEBUG.display_all_trees()
  //  DEBUG.display_filler_zones();


    setInterval(THAUMATURGY.remove_fog, 1000);
    // DEBUG.stop_berkeley_mode();
    //setTimeout(DEBUG.draw_hitboxes, 1000);

    ABILITIES.unlock("_town2_visited");
  },

  stop_berkeley_mode: function(){
    GLITCH.berkeley.update_surroundings = function(){};
  },

  signal: {
    mouse_position: function(x, y) {
      if (DEBUG.ACTIVATE_BUILDER) {
        var intercepted = BUILDER.click(x,y);
        if(intercepted){ return; }
      }

      if (DEBUG.MOUSE_POSITIONS) {
        CONSOLE.log.debug("Position:" + x + " / " + y);
        //console.log(document.elementFromPoint(x - window.pageXOffset, y - window.pageYOffset));
      }

      if (THAUMATURGY.teleport && IO.interface._can_open_escape_menu()){
        CHARACTER.character.destroy();
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
