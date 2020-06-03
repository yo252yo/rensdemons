// runtime (CHARACTER, CONSOLE)
// use(manager.js)

const CURRENTLEVEL = {
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
    for(var i in CURRENTLEVEL.visual_elements){
      var el = CURRENTLEVEL.visual_elements[i];
      if(el.draw){
        el.draw();
      }
    }
    CHARACTER.redraw();
  },

  initialize_with_character: function(x, y) {
    if (CURRENTLEVEL.loaded_character_pos) {
      CHARACTER.initialize(CURRENTLEVEL.loaded_character_pos[0], CURRENTLEVEL.loaded_character_pos[1]);
      CURRENTLEVEL.loaded_character_pos = null;
      IO.control.character();
    } else {
      CHARACTER.initialize(x,y);
      if (CURRENTLEVEL.start_function) {
        CURRENTLEVEL.start_function();
      }
    }
  },

  setup: function(name) {
    CURRENTLEVEL.clear();
    CURRENTLEVEL.loaded_level_name = name;

    new Import("levels/" + name);
    CONSOLE.log.setup("level " + name);
  },

  factory: {
    export: function(){
      return {
        loaded_level_name: CURRENTLEVEL.loaded_level_name,
        saved_character: [CHARACTER.character.x, CHARACTER.character.y],
      }
    },

    import: function(save) {
      CURRENTLEVEL.loaded_character_pos = save.saved_character;
      CURRENTLEVEL.setup(save.loaded_level_name);
    },
  },

  clear: function() {
    for(var key in CURRENTLEVEL.triggers) {
      clearTimeout(CURRENTLEVEL.triggers[key]);
    }
    CURRENTLEVEL.html().innerHTML = "";
    CURRENTLEVEL.objects = [];
    CURRENTLEVEL.visual_elements = [];
    CURRENTLEVEL.triggers = {};
    CHARACTER.clear();
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

  index_object: function(object) {
      CURRENTLEVEL.objects.push(object);
  },

  remove_object: function(object) {
      if (object.visual_element){
        object.visual_element.destroy();
      }
      for (var i in CURRENTLEVEL.objects){
        if (CURRENTLEVEL.objects[i] == object){
            delete CURRENTLEVEL.objects[i];
        }
      }
      delete object;
      CURRENTLEVEL.redraw();
  },

  is_walkable: function(x, y, initiator) {
    var walkable = false;

    // could be optimized by ordering objects
    for(var i in CURRENTLEVEL.objects) {
      if (CURRENTLEVEL.objects[i] == initiator) {
        continue;
      }
      if (! CURRENTLEVEL.objects[i].is_walkable) {
        continue;
      }
      var t = CURRENTLEVEL.objects[i].is_walkable(x,y);
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
    for(var i in CURRENTLEVEL.objects) {
      if (CURRENTLEVEL.objects[i].is_interactible && CURRENTLEVEL.objects[i].is_interactible(x,y)) {
        here.push(CURRENTLEVEL.objects[i]);
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
    var element = CURRENTLEVEL.select_interactible_at(x, y);
    if (element) {
      CURRENTLEVEL.try_interact(element);
    }
  },

  up: function() { CHARACTER.get().try_move_up(); },
  down: function() { CHARACTER.get().try_move_down(); },
  left: function() { CHARACTER.get().try_move_left(); },
  right: function() { CHARACTER.get().try_move_right(); },

  click: function(x, y, is_hold) {
    var element = CURRENTLEVEL.select_interactible_at(x, y);
    if (! element || is_hold) {
      CHARACTER.get().try_walk_to(x, y);
    } else {
      if (! CURRENTLEVEL.try_interact(element)) {
        CHARACTER.get().try_walk_to(x, y);
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
    if(CURRENTLEVEL.loaded_character_pos) {
      return; // We're coming from a save
    }
    f();
  },
};
