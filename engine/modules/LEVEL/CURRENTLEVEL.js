// runtime (CHARACTER, CONSOLE)
// use(manager.js)


const CURRENTLEVEL = {
  _MAX_CLICK_INTERACTION_DISTANCE: 20,
  _FACE_INTERACTION_DISTANCE: 20,
  _TRIGGER_COOLDOWN: 200,
  SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR : '@',
  GERERATED_LEVEL_PREFIX : '$',
  UNSAVED_LEVEL_SUFFIX : '$',

  level_name: "",
  previous_lvl: "", // used to exit houses
  level_objects: [], // Would benefit from being smartly indexed.
  destroyed_objects: [],
  triggers: [],
  start_function: null,

  factory: {
    export: function(){
      var char_x, char_y, char_a;
      if (CHARACTER.character){
        char_x = CHARACTER.character.x;
        char_y = CHARACTER.character.y;
        char_a = CHARACTER.facing_direction();
      }
      return {
        level_name: CURRENTLEVEL.level_name,
        destroyed_objects: CURRENTLEVEL.destroyed_objects,
        saved_character_position: [char_x, char_y, char_a],
        previous_lvl: CURRENTLEVEL.previous_lvl,
      };
    },

    make_new: function(){
      CURRENTLEVEL.system.clear();
      CURRENTLEVEL.destroyed_objects = [];
    },

    _save_previous_level: function(name) {
      if (!CURRENTLEVEL.level_name){ return; }
      // Levels you shouldnt return to when you leave a place.
      if (CURRENTLEVEL.level_name.startsWith(CURRENTLEVEL.GERERATED_LEVEL_PREFIX)) { return; }
      if (CURRENTLEVEL.level_name == "gameover$" ||
          CURRENTLEVEL.level_name == "titlescreen") { return; }

      CURRENTLEVEL.previous_lvl = CURRENTLEVEL.level_name;
    },

    import: function(save) {
      CONSOLE.log.setup(save.level_name + " (from save)");
      CURRENTLEVEL._setup._setup_from_object(save);
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

      INTERFACE.click_marker(x,y, is_hold);
      CHARACTER.get().try_walk_to(x, y);
    },

    select_interactible_at: function(x, y) {
      return CURRENTLEVEL.io.select_at(x, y, true);
    },

    select_at: function(x, y, interactible) {
      var here = [];

      // could be optimized by ordering objects
      for(var i in CURRENTLEVEL.level_objects) {
        if (!CURRENTLEVEL.level_objects[i]){
          continue;
        }
        if (CURRENTLEVEL.level_objects[i].is_interactible && CURRENTLEVEL.level_objects[i].is_interactible(x,y)) {
          here.push(CURRENTLEVEL.level_objects[i]);
        } else if (!interactible && CURRENTLEVEL.level_objects[i].is_at_sprite(x,y)) {
          here.push(CURRENTLEVEL.level_objects[i]);
        }
      }

      if (here.length == 0) {
        return undefined;
      } else if (here.length == 1) {
        return here[0];
      } else { // if theres several objects we chose the one on top
        var max = here[0].get_depth();
        var argmax = here[0];
        for (var i = 1; i < here.length; i ++) {
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
      for(var object of CURRENTLEVEL.level_objects) {
        if (!object){
          continue;
        }
        if(object.constructor.name == "M_Character"){
          continue;
        }
        if (object == initiator) {
          continue;
        }
        if (! object.is_walkable) {
          continue;
        }
        var t = object.is_walkable(x,y);
        if (t == -1) {
          return false;
        } else if (t == 1) {
          walkable = true;
        }
      }
      return walkable;
    },

    interact_in_front: function(attempt) {
      if (!attempt){
        attempt = 1;
      } else if(attempt >=3 ){
        return;
      }
      var c = CHARACTER.get().gravity_center();
      var x = c[0];
      var y = c[1] + 10; // its more intuitive to take a point closer to legs
      switch (CHARACTER.get().facing_direction()) {
        case "LEFT":
          x -= CURRENTLEVEL._FACE_INTERACTION_DISTANCE / attempt;
          break;
        case "RIGHT":
          x += CURRENTLEVEL._FACE_INTERACTION_DISTANCE / attempt;
          break;
        case "UP":
          y -= CURRENTLEVEL._FACE_INTERACTION_DISTANCE / attempt;
          break;
        default:
          y += CURRENTLEVEL._FACE_INTERACTION_DISTANCE / attempt;
          break;
      }
      var element = CURRENTLEVEL.io.select_interactible_at(x, y);
      if (element) {
        CURRENTLEVEL.io.try_interact(element);
      } else {
        CURRENTLEVEL.io.interact_in_front(attempt+1);
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

  _setup: {
    _setup_from_object: function(save) {
      CURRENTLEVEL.system.clear();
      AUDIO.music.stop();

      if(save.destroyed_objects) {
        CURRENTLEVEL.destroyed_objects = save.destroyed_objects;
      } else {
        CURRENTLEVEL.destroyed_objects = [];
      }
      if(save.previous_lvl) {
        CURRENTLEVEL.previous_lvl = save.previous_lvl;
      }

      CURRENTLEVEL.factory._save_previous_level();
      CURRENTLEVEL._setup._setup_level(save.level_name);

      CONSOLE.log.setup(save.level_name + " (done)");
    },

    _setup_level: function(name) {
      FOG.draw();
      CURRENTLEVEL.level_name = name;
      CURRENTLEVEL._setup._setup_colors();

      if (name.startsWith(CURRENTLEVEL.GERERATED_LEVEL_PREFIX)) { // special levels (generated)
        var actual_name = name.substring(1).split("_")[0];
        if(GENERATEDLEVELS[actual_name]){
          GENERATEDLEVELS[actual_name].load(name);
        } else {
          CONSOLE.error(`Unable to load special level ${name}`);
        }
      } else {
        new Import("levels/" + name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR)[0]);
      }
    },

    _setup_colors: function() {
      FOG.recolor(PALETTE.fog_color());
      document.body.style.backgroundColor = PALETTE.body_color().code();
    },
  },

  is_map(){
    return CURRENTLEVEL.level_name.endsWith("map")
  },

  setup: function(name, keep_position) {
    if(keep_position && CHARACTER.character) {
      CURRENTLEVEL._recover_position = [CHARACTER.character.x, CHARACTER.character.y, CHARACTER.facing_direction()];
    } else if (!keep_position) {
      CURRENTLEVEL._recover_position = undefined;
    }

    IO.clear_io_queue();
    window.scrollTo(0,0);
    // Try to restore previous state.
    LEVELSTATES.register_current();
    var save = LEVELSTATES.get_save(name);
    if (! save) {
      CONSOLE.log.setup(name + " (new)");
      CURRENTLEVEL._setup._setup_from_object({level_name: name});
    } else {
      CONSOLE.log.setup(name + " (from previous state)");
      CURRENTLEVEL._setup._setup_from_object(save);
    }
  },

  objects: {
    index_object: function(object) {
      CURRENTLEVEL.level_objects.push(object);
    },

    remove_object: function(object, stillborn) {
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
      if(!stillborn && !CURRENTLEVEL.destroyed_objects.includes(object.hash())){
        CURRENTLEVEL.destroyed_objects.push(object.hash());
      }
      CURRENTLEVEL.system.redraw();
    },

    cleanup_dead: function(){
      for (var o of CURRENTLEVEL.level_objects){
        if (o && o.hash && o.hash() && CURRENTLEVEL.destroyed_objects.includes(o.hash())){
          o.destroy();
        }
      }
    }
  },

  initialize_with_character: function(x, y, size) {
    CURRENTLEVEL.objects.cleanup_dead();
    var saved_pos = LEVELSTATES.get_position(CURRENTLEVEL.level_name);
    if (saved_pos && saved_pos[0] && saved_pos[1]) {
      CHARACTER.initialize(saved_pos[0], saved_pos[1], size, saved_pos[2]);
      IO.control.character();
    } else if (CURRENTLEVEL._recover_position) {
      CHARACTER.initialize(CURRENTLEVEL._recover_position[0], CURRENTLEVEL._recover_position[1], size, CURRENTLEVEL._recover_position[2]);
      CURRENTLEVEL._recover_position = undefined;
      IO.control.character();
    } else { // everything is here!!!!!! mb we can have special handling for battle
      CHARACTER.initialize(x, y, size);
      if (CURRENTLEVEL.start_function) {
        CURRENTLEVEL.start_function();
      } else {
        IO.control.character();
      }
    }
    FOG.moveToChar();
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
