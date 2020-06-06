// runtime (CHARACTER, CONSOLE)
// use(manager.js)

const CURRENTLEVEL = {
  _MAX_INTERACTION_DISTANCE: 70,
  _FACE_INTERACTION_DISTANCE: 20,
  _TRIGGER_COOLDOWN: 2000,

  level_name: "",
  level_objects: [],
  visual_elements: [],
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
        saved_character_position: [char_x, char_y],
      }
    },

    import: function(save) {
      CURRENTLEVEL.system._setup_from_save(save);
    },
  },

  io: {
    up: function() { CHARACTER.get().try_move_up(); },
    down: function() { CHARACTER.get().try_move_down(); },
    left: function() { CHARACTER.get().try_move_left(); },
    right: function() { CHARACTER.get().try_move_right(); },

    click: function(x, y, is_hold) {
      var element = CURRENTLEVEL.io.select_interactible_at(x, y);
      if (! element || is_hold) {
        CHARACTER.get().try_walk_to(x, y);
      } else {
        if (! CURRENTLEVEL.io.try_interact(element)) {
          CHARACTER.get().try_walk_to(x, y);
        }
      }
    },

    select_interactible_at: function(x, y) {
      var here = [];

      // could be optimized by ordering objects
      for(var i in CURRENTLEVEL.level_objects) {
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
      if(element.distance_to_character() < CURRENTLEVEL._MAX_INTERACTION_DISTANCE) {
        element.interaction();
        CHARACTER.get().stop_autowalk();
        return true;
      }
    },

    is_walkable: function(x, y, initiator) {
      var walkable = false;

      // could be optimized by ordering objects
      for(var i in CURRENTLEVEL.level_objects) {
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
      for(var i in CURRENTLEVEL.visual_elements){
        var el = CURRENTLEVEL.visual_elements[i];
        if(el.draw){
          el.draw();
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
      CURRENTLEVEL.visual_elements = [];
      CURRENTLEVEL.triggers = {};
      CHARACTER.clear();
    },

    _setup_from_save: function(save) {
      LEVELSTATES.register_current();
      CURRENTLEVEL.system.clear();
      CURRENTLEVEL.level_name = save.level_name;

      new Import("levels/" + save.level_name);
      CONSOLE.log.setup("level " + save.level_name);
    },
  },

  setup: function(name) {
    // Try to restore previous state.
    var save = LEVELSTATES.get_save(name);
    if (! save){
      save = {level_name: name};
    }
    CURRENTLEVEL.system._setup_from_save(save);
  },

  objects: {
    index_object: function(object) {
      CURRENTLEVEL.level_objects.push(object);
    },

    remove_object: function(object) {
      if (object.visual_element){
        object.visual_element.destroy();
      }
      for (var i in CURRENTLEVEL.level_objects){
        if (CURRENTLEVEL.level_objects[i] == object){
            delete CURRENTLEVEL.level_objects[i];
        }
      }
      delete object;
      CURRENTLEVEL.system.redraw();
    },

    index_visual_element: function(object) {
        CURRENTLEVEL.visual_elements.push(object);
    },

    remove_visual_element: function(object) {
      const index = CURRENTLEVEL.visual_elements.indexOf(object);
      if (index > -1) {
        CURRENTLEVEL.visual_elements.splice(index, 1);
      }
      delete object;
    },

    should_hide: function(hash) {
      return false;
    },
  },



  initialize_with_character: function(x, y) {
    var saved_pos = LEVELSTATES.get_position(CURRENTLEVEL.level_name);
    if (saved_pos[0] && saved_pos[1]) {
      CHARACTER.initialize(saved_pos[0], saved_pos[1]);
      IO.control.character();
    } else {
      CHARACTER.initialize(x,y);
      if (CURRENTLEVEL.start_function) {
        CURRENTLEVEL.start_function();
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

  at_start: function(f) {
    CONSOLE.stack_trace();
    var saved_pos = LEVELSTATES.get_position(CURRENTLEVEL.level_name);
    if (saved_pos[0] && saved_pos[1]) {
      return; // We're coming from a save
      // Mb this should be more generic? remember what eevnt happened in our save
    }
    f();
  },
};
