// runtime (CHARACTER, CONSOLE)
// use(manager.js)

const CURRENTLEVEL = {
  _MAX_CLICK_INTERACTION_DISTANCE: 70,
  _FACE_INTERACTION_DISTANCE: 20,
  _TRIGGER_COOLDOWN: 2000,

  level_name: "",
  level_objects: [], // Would benefit from being smartly indexed.
  destroyed_objects: [],
  triggers: [],
  start_function: null,

  factory: {
    export: function(){
      var char_x, char_y;
      if (CHARACTER.character){
        char_x = CHARACTER.character.x;
        char_y = CHARACTER.character.y;
      }
      return {
        level_name: CURRENTLEVEL.level_name,
        destroyed_objects: CURRENTLEVEL.destroyed_objects,
        saved_character_position: [char_x, char_y],
      };
    },

    make_new: function(){
      CURRENTLEVEL.system.clear();
      CURRENTLEVEL.destroyed_objects = [];
    },

    _setup_from_object: function(save) {
      CURRENTLEVEL.system.clear();
      FOG.draw();

      CURRENTLEVEL.level_name = save.level_name;

      if(save.destroyed_objects) {
        CURRENTLEVEL.destroyed_objects = save.destroyed_objects;
      }

      new Import("levels/" + save.level_name);
      AUDIO.music.stop();
      CONSOLE.log.setup(save.level_name + " (done)");
    },

    import: function(save) {
      CONSOLE.log.setup(save.level_name + " (from save)");
      CURRENTLEVEL.factory._setup_from_object(save);
    },
  },

  io: {
    click: function(x, y, is_hold) {
      var element = CURRENTLEVEL.io.select_interactible_at(x, y);
      if (element) {
        if (!is_hold && CURRENTLEVEL.io.try_interact(element)) {
          return; // We interact
        } else {
          // We silently advance
          CHARACTER.get().try_walk_to(x, y);
          return;
        }
      }

      INTERFACE.click_marker(x,y);
      CHARACTER.get().try_walk_to(x, y);
    },

    select_interactible_at: function(x, y) {
      var here = [];

      // could be optimized by ordering objects
      for(var i in CURRENTLEVEL.level_objects) {
        if (!CURRENTLEVEL.level_objects[i]){
          continue;
        }
        if (CURRENTLEVEL.level_objects[i].is_interactible && CURRENTLEVEL.level_objects[i].is_interactible(x,y)) {
          here.push(CURRENTLEVEL.level_objects[i]);
        }
      }

      if (here.length == 0) {
        return undefined;
      } else if (here.length == 1) {
        return here[0]
      } else { // if theres several objects we chose the one on top
        var max = here[0].get_depth();
        var argmax = here[0];
        for (var int = 1; i < here.length; i ++) {
          if(here[i].get_depth() > max) {
            max = here[i].get_depth();
            argmax = here[i];
          }
        }
        return argmax;
      }
    },

    try_interact: function(element) {
      if(element.distance_to_character() < CURRENTLEVEL._MAX_CLICK_INTERACTION_DISTANCE) {
        element.interaction();
        CHARACTER.get().stop_autowalk();
        AUDIO.effect.interaction();
        return true;
      }
    },

    is_walkable: function(x, y, initiator) {
      var walkable = false;

      // could be optimized by ordering objects
      for(var i in CURRENTLEVEL.level_objects) {
        if (!CURRENTLEVEL.level_objects[i]){
          continue;
        }
        if (CURRENTLEVEL.level_objects[i] == initiator) {
          continue;
        }
        if (! CURRENTLEVEL.level_objects[i].is_walkable) {
          continue;
        }
        var t = CURRENTLEVEL.level_objects[i].is_walkable(x,y);
        if (t == -1) {
          return false;
        } else if (t == 1) {
          walkable = true;
        }
      }
      return walkable;
    },

    interact_in_front: function() {
      var c = CHARACTER.get().gravity_center();
      var x = c[0];
      var y = c[1] + 10; // its more intuitive to take a point closer to legs
      switch (CHARACTER.get().facing_direction()) {
        case "LEFT":
          x -= CURRENTLEVEL._FACE_INTERACTION_DISTANCE;
          break;
        case "RIGHT":
          x += CURRENTLEVEL._FACE_INTERACTION_DISTANCE;
          break;
        case "UP":
          y -= CURRENTLEVEL._FACE_INTERACTION_DISTANCE;
          break;
        default:
          y += CURRENTLEVEL._FACE_INTERACTION_DISTANCE;
          break;
      }
      var element = CURRENTLEVEL.io.select_interactible_at(x, y);
      if (element) {
        CURRENTLEVEL.io.try_interact(element);
      }
    },
  },

  system: {
    html: function() {
      return document.getElementById("level");
    },

    redraw: function() {
      for(var i in CURRENTLEVEL.level_objects){
        var el = CURRENTLEVEL.level_objects[i];
        if(el && el.get_visual && el.get_visual().draw){
          el.get_visual().draw();
        }
      }
      CHARACTER.redraw();
    },

    clear: function() {
      for(var key in CURRENTLEVEL.triggers) {
        clearTimeout(CURRENTLEVEL.triggers[key]);
      }
      CURRENTLEVEL.system.html().innerHTML = "";
      CURRENTLEVEL.level_objects = [];
      CURRENTLEVEL.triggers = {};
      CURRENTLEVEL.start_function = null;
      CHARACTER.clear();
    },

  },

  setup: function(name) {
    IO.clear_io_queue();
    window.scrollTo(0,0);
    // Try to restore previous state.
    var save = LEVELSTATES.get_save(name);
    if (! save) {
      CONSOLE.log.setup(name + " (new)");
      CURRENTLEVEL.factory._setup_from_object({level_name: name});
    } else {
      CONSOLE.log.setup(name + " (from previous state)");
      CURRENTLEVEL.factory._setup_from_object(save);
    }
  },

  objects: {
    index_object: function(object) {
      CURRENTLEVEL.level_objects.push(object);
    },

    remove_object: function(object) {
      for (var i in CURRENTLEVEL.level_objects){
        var candidate = CURRENTLEVEL.level_objects[i];
        if (candidate && candidate.hash() == object.hash()){
          if (object != candidate){
            // destroy all homonyms
            candidate.destroy();
          }
          CURRENTLEVEL.level_objects[i] = null;
        }
      }
      CURRENTLEVEL.destroyed_objects.push(object.hash());
      CURRENTLEVEL.system.redraw();
    },

    should_hide: function(hash) {
      for (var i in CURRENTLEVEL.destroyed_objects){
        if (CURRENTLEVEL.destroyed_objects[i] == hash){
          return true;
        }
      }
    },
  },

  initialize_with_character: function(x, y) {
    var saved_pos = LEVELSTATES.get_position(CURRENTLEVEL.level_name);
    if (saved_pos && saved_pos[0] && saved_pos[1]) {
      CHARACTER.initialize(saved_pos[0], saved_pos[1]);
      IO.control.character();
    } else {
      CHARACTER.initialize(x,y);
      if (CURRENTLEVEL.start_function) {
        CURRENTLEVEL.start_function();
      } else {
        IO.control.character();
      }
    }
  },

  add_trigger: function(key, f_condition, f_execute) {
    if(CURRENTLEVEL.triggers[key] && f_condition() && IO.interface._can_trigger_level_event()){
      CONSOLE.log.event("Triggered " + key);
      delete CURRENTLEVEL.triggers[key];
      f_execute();
    } else {
      if (! CURRENTLEVEL.triggers[key]){
        CONSOLE.log.event("Registered " + key);
      }
      CURRENTLEVEL.triggers[key] = setTimeout(
        function(){ CURRENTLEVEL.add_trigger(key, f_condition, f_execute); },
        CURRENTLEVEL._TRIGGER_COOLDOWN);
    }
  },

};
