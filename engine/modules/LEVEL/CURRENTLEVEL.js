// runtime (CHARACTER, CONSOLE)
// use(manager.js)


const CURRENTLEVEL = {
  _MAX_CLICK_INTERACTION_DISTANCE: 20,
  _FACE_INTERACTION_DISTANCE: 20,
  _TRIGGER_COOLDOWN: 200,
  _INDEX_SQUARE_SIZE: 250,
  SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR : '@',
  GERERATED_LEVEL_PREFIX : '$',
  UNSAVED_LEVEL_SUFFIX : '$',

  level_name: "",
  previous_lvl: "", // used to exit houses
  level_objects: [], // Would benefit from being smartly indexed.
  destroyed_objects: [],
  triggers: [],
  start_function: null,
  is_initialized: false,

  factory: {
    export: function(){
      var char_x, char_y, char_a;
      if (CHARACTER.character){
        char_x = CHARACTER.character.x;
        char_y = CHARACTER.character.y;
        char_a = CHARACTER.facing_direction();
      }
      var saved_destroyed_objects = CURRENTLEVEL.destroyed_objects;
      if(CURRENTLEVEL.level_name.endsWith(CURRENTLEVEL.UNSAVED_LEVEL_SUFFIX)){
        saved_destroyed_objects = [];
      }
      return {
        level_name: CURRENTLEVEL.level_name,
        destroyed_objects: saved_destroyed_objects,
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

    make_save: function(level_name, previous_position){
      var s = {level_name: level_name};
      if(previous_position){
        s.saved_character_position = previous_position;
      }
      return s;
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

    is_prioritary_object: function(o){
      return o.hash().startsWith("S_ExitFloor") || o.hash().startsWith("S_SavePoint");
    },

    is_secondary_object: function(o){
      return o.hash().startsWith("SE_") || o.hash().startsWith("SB_") || o.hash().startsWith("SBattle");
    },

    select_at: function(x, y, interactible) {
      var here = [];

      // could be optimized by ordering objects
      var objects = CURRENTLEVEL.objects.get_all_objects(x, y);
      for(var i in objects) {
        if (!objects[i]){
          continue;
        }
        if (objects[i].is_interactible && objects[i].is_interactible(x,y)) {
          here.push(objects[i]);
        } else if (!interactible && objects[i].is_at_sprite(x,y)) {
          here.push(objects[i]);
        }
      }

      if (here.length == 0) {
        return undefined;
      } else if (here.length == 1) {
        return here[0];
      } else { // if theres several objects we chose the one on top
        var max = here[0].get_depth();
        var argmax = here[0];
        for (var i = 0; i < here.length; i ++) {
          if(CURRENTLEVEL.io.is_prioritary_object(here[i])){
            return here[i];
          }
        }
        for (var i = 0; i < here.length; i ++) {
          if(CURRENTLEVEL.io.is_secondary_object(here[i])){
            return here[i];
          }

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
        var made_sound = element.interaction();
        if(!made_sound){
          AUDIO.effect.interaction();
        }
        // another sound effect for lootbox ???
        CHARACTER.get().stop_autowalk();
        return true;
      }
    },

    is_walkable: function(x, y, initiator) {
      var walkable = false;

      // could be optimized by ordering objects
      for(var object of CURRENTLEVEL.objects.get_all_objects(x, y)) {
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
      var objects = CURRENTLEVEL.objects.get_all_objects();
      for(var i in objects){
        var el = objects[i];
        if(el && el.get_visual && el.get_visual().draw){
          el.get_visual().draw();
        }
      }
      CHARACTER.redraw();
    },

    clear: function() {
      for(var obj of CURRENTLEVEL.objects.get_all_objects()){
        if(obj && obj.record_death){
          obj.record_death();
        }
      }
      LEDGER.commit_to_stats();

      for(var key in CURRENTLEVEL.triggers) {
        clearTimeout(CURRENTLEVEL.triggers[key]);
      }
      CURRENTLEVEL.system.html().innerHTML = "";
      CURRENTLEVEL.level_objects = [];
      CURRENTLEVEL.triggers = {};
      CURRENTLEVEL.start_function = null;
      CHARACTER.clear();
      CURRENTLEVEL.is_initialized = false;
    },

  },

  _setup: {
    _setup_from_object: function(save) {
      CURRENTLEVEL.system.clear();
      //AUDIO.music.stop();

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
      if (keep_position == true){ // save character position through a game over screen etc...
        CURRENTLEVEL._recover_position = [CHARACTER.character.x, CHARACTER.character.y, CHARACTER.facing_direction()];
      } else {
        CURRENTLEVEL._recover_position = keep_position;
      }
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
      CURRENTLEVEL._setup._setup_from_object(CURRENTLEVEL.factory.make_save(name));
    } else {
      CONSOLE.log.setup(name + " (from previous state)");
      CURRENTLEVEL._setup._setup_from_object(save);
    }
  },

  objects: {
    _square_index: function(x,y){
      return [CURRENTLEVEL._INDEX_SQUARE_SIZE*Math.floor(x/CURRENTLEVEL._INDEX_SQUARE_SIZE), CURRENTLEVEL._INDEX_SQUARE_SIZE*Math.floor(y/CURRENTLEVEL._INDEX_SQUARE_SIZE)];
    },

    index_object: function(object) {
      var x = object.x || object.h_x || object.visual_element.x;
      var y = object.y || object.h_y || object.visual_element.y;
      var w = object.w || object.h_w || object.visual_element.width;
      var h = object.h || object.h_h || object.visual_element.height;
      if(!x || !y || !w || !h){
        CONSOLE.error("Indexing empty object : " + object);
      }

      var start = CURRENTLEVEL.objects._square_index(x,y-h);
      var end = CURRENTLEVEL.objects._square_index(x+w,y);

      for(var i = start[0]; i <= end[0]; i += CURRENTLEVEL._INDEX_SQUARE_SIZE){
        for(var j = start[1]; j <= end[1]; j += CURRENTLEVEL._INDEX_SQUARE_SIZE){
          if(!CURRENTLEVEL.level_objects[i]){
            CURRENTLEVEL.level_objects[i] = {};
          }
          if(!CURRENTLEVEL.level_objects[i][j]){
            CURRENTLEVEL.level_objects[i][j] = [];
          }
          CURRENTLEVEL.level_objects[i][j].push(object);
        }
      }
    },

    get_all_objects: function(x, y){
      if(x && y){
        var start = CURRENTLEVEL.objects._square_index(x,y);
        if (CURRENTLEVEL.level_objects[start[0]] && CURRENTLEVEL.level_objects[start[0]][start[1]]){
          return CURRENTLEVEL.level_objects[start[0]][start[1]];
        } else {
          return [];
        }
      }
      var result = [];
      for(var i in CURRENTLEVEL.level_objects){
        for(var j in CURRENTLEVEL.level_objects[i]){
          for(var o of CURRENTLEVEL.level_objects[i][j]){
            if(!result.includes(o)){
              result.push(o);
            }
          }
        }
      }
      return result;
    },

    destroy_object: function(object) {
      var hash = object.hash();
      for(var i in CURRENTLEVEL.level_objects){
        for(var j in CURRENTLEVEL.level_objects[i]){
          for(var k in CURRENTLEVEL.level_objects[i][j]){
            var candidate = CURRENTLEVEL.level_objects[i][j][k];
            if (candidate && candidate.hash() == hash){ // destroy all homonyms in all squares
              candidate.finish_destroy();
              CURRENTLEVEL.level_objects[i][j][k] = null;
            }
          }
        }
      }
    },

    program_destruction: function(object) {
      if(!CURRENTLEVEL.destroyed_objects.includes(object.hash())){
        CURRENTLEVEL.destroyed_objects.push(object.hash());
      }
      CURRENTLEVEL.system.redraw();
      if(CURRENTLEVEL.is_initialized){
        CURRENTLEVEL.objects.destroy_object(object);
      }
    },

    cleanup_dead: function(){
      for (var o of CURRENTLEVEL.objects.get_all_objects()){
        if (o && o.hash && o.hash() && CURRENTLEVEL.destroyed_objects.includes(o.hash())){
          CURRENTLEVEL.objects.destroy_object(o);
        }
      }
      CURRENTLEVEL.is_initialized = true;
    }
  },

  initialize_with_character: function(x, y, size) {
    CURRENTLEVEL.objects.cleanup_dead();
    var saved_pos = LEVELSTATES.get_position(CURRENTLEVEL.level_name);

    if (CURRENTLEVEL._recover_position) {// usually, after a battle in unsaved level
      CHARACTER.initialize(CURRENTLEVEL._recover_position[0], CURRENTLEVEL._recover_position[1], size, CURRENTLEVEL._recover_position[2]);
      CURRENTLEVEL._recover_position = undefined;
    } else if(saved_pos){
      CHARACTER.initialize(saved_pos[0], saved_pos[1], size, saved_pos[2]);
    } else { // everything is here!!!!!! mb we can have special handling for battle
      CHARACTER.initialize(x, y, size);
    }

    if (CURRENTLEVEL.start_function && !saved_pos) {
      CURRENTLEVEL.start_function();
    } else {
      IO.control.character();
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
