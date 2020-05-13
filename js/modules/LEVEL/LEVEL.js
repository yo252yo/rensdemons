// runtime (CHARACTER, CONSOLE)
// use(manager.js)

const LEVEL = {
  _MAX_INTERACTION_DISTANCE: 70,
  _FACE_INTERACTION_DISTANCE: 20,
  _TRIGGER_COOLDOWN: 2000,

  loaded_level_name: "",
  loaded_character_pos: null,
  objects: [],
  visual_elements: [],
  triggers: [],
  start_function: null,

  html: function() {
    return document.getElementById("level");
  },

  redraw: function() {
    for(var i in LEVEL.visual_elements){
      var el = LEVEL.visual_elements[i];
      if(el.draw){
        el.draw();
      }
    }
    CHARACTER.redraw();
  },

  initialize_with_character: function(x, y) {
    if (LEVEL.loaded_character_pos) {
      CHARACTER.initialize(LEVEL.loaded_character_pos[0], LEVEL.loaded_character_pos[1]);
      LEVEL.loaded_character_pos = null;
      IO.control.character();
    } else {
      CHARACTER.initialize(x,y);
      if (LEVEL.start_function) {
        LEVEL.start_function();
      }
    }
  },

  setup: function(name) {
    LEVEL.clear();
    LEVEL.loaded_level_name = name;

    new Import("levels/" + name);
    CONSOLE.log.setup("level " + name);
  },

  factory: {
    export: function(){
      return {
        loaded_level_name: LEVEL.loaded_level_name,
        saved_character: [CHARACTER.character.x, CHARACTER.character.y],
      }
    },

    import: function(save) {
      LEVEL.loaded_character_pos = save.saved_character;
      LEVEL.setup(save.loaded_level_name);
    },
  },

  clear: function() {
    for(var key in LEVEL.triggers) {
      clearTimeout(LEVEL.triggers[key]);
    }
    LEVEL.html().innerHTML = "";
    LEVEL.objects = [];
    LEVEL.visual_elements = [];
    LEVEL.triggers = {};
    CHARACTER.clear();
  },

  index_visual_element: function(object) {
      LEVEL.visual_elements.push(object);
  },

  remove_visual_element: function(object) {
    const index = LEVEL.visual_elements.indexOf(object);
    if (index > -1) {
      LEVEL.visual_elements.splice(index, 1);
    }
  },

  index_object: function(object) {
      LEVEL.objects.push(object);
  },

  is_walkable: function(x, y, initiator) {
    var walkable = false;

    // could be optimized by ordering objects
    for(var i in LEVEL.objects) {
      if (LEVEL.objects[i] == initiator) {
        continue;
      }
      if (! LEVEL.objects[i].is_walkable) {
        continue;
      }
      var t = LEVEL.objects[i].is_walkable(x,y);
      if (t == -1) {
        return false;
      } else if (t == 1) {
        walkable = true;
      }
    }
    return walkable;
  },

  select_interactible_at: function(x, y) {
    var here = [];

    // could be optimized by ordering objects
    for(var i in LEVEL.objects) {
      if (LEVEL.objects[i].is_interactible && LEVEL.objects[i].is_interactible(x,y)) {
        here.push(LEVEL.objects[i]);
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
    if(element.distance_to_character() < LEVEL._MAX_INTERACTION_DISTANCE) {
      element.interaction();
      CHARACTER.get().stop_autowalk();
      return true;
    }
  },

  interact_in_front: function() {
    var c = CHARACTER.get().gravity_center();
    var x = c[0];
    var y = c[1] + 10; // its more intuitive to take a point closer to legs
    switch (CHARACTER.get().facing_direction()) {
      case "LEFT":
        x -= LEVEL._FACE_INTERACTION_DISTANCE;
        break;
      case "RIGHT":
        x += LEVEL._FACE_INTERACTION_DISTANCE;
        break;
      case "UP":
        y -= LEVEL._FACE_INTERACTION_DISTANCE;
        break;
      default:
        y += LEVEL._FACE_INTERACTION_DISTANCE;
        break;
    }
    var element = LEVEL.select_interactible_at(x, y);
    if (element) {
      LEVEL.try_interact(element);
    }
  },

  up: function() { CHARACTER.get().try_move_up(); },
  down: function() { CHARACTER.get().try_move_down(); },
  left: function() { CHARACTER.get().try_move_left(); },
  right: function() { CHARACTER.get().try_move_right(); },

  click: function(x, y, is_hold) {
    var element = LEVEL.select_interactible_at(x, y);
    if (! element || is_hold) {
      CHARACTER.get().try_walk_to(x, y);
    } else {
      if (! LEVEL.try_interact(element)) {
        CHARACTER.get().try_walk_to(x, y);
      }
    }
  },

  add_trigger: function(key, f_condition, f_execute) {
    if(LEVEL.triggers[key] && f_condition() && IO.interface._can_trigger_level_event()){
      CONSOLE.log.event("Triggered " + key);
      delete LEVEL.triggers[key];
      f_execute();
    } else {
      if (! LEVEL.triggers[key]){
        CONSOLE.log.event("Registered " + key);
      }
      LEVEL.triggers[key] = setTimeout(
        function(){ LEVEL.add_trigger(key, f_condition, f_execute); },
        LEVEL._TRIGGER_COOLDOWN);
    }
  },

  at_start: function(f) {
    if(LEVEL.loaded_character_pos) {
      return; // We're coming from a save
    }
    f();
  },
};
