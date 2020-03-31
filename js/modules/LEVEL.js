// runtime (CHARACTER, CONSOLE)
// use(manager.js)

const LEVEL = {
  _MAX_INTERACTION_DISTANCE: 70,
  _FACE_INTERACTION_DISTANCE: 20,

  loaded_level_name: "",
  loaded_character_pos: null,
  elements: [],

  html: function() {
    return document.getElementById("level");
  },

  initialize_character: function(x, y) {
    if (LEVEL.loaded_character_pos){
      CHARACTER.initialize(LEVEL.loaded_character_pos[0], LEVEL.loaded_character_pos[1]);
      LEVEL.loaded_character_pos = null;
    } else {
      CHARACTER.initialize(x,y);
    }
  },

  setup: function(name) {
    LEVEL.loaded_level_name = name;
    this.clear();

    new Import("levels/" + name);
    CONSOLE.sys_log("- Loaded level " + name);
  },

  export: function(){
    return {
      loaded_level_name: LEVEL.loaded_level_name,
      saved_character: [CHARACTER.character.x, CHARACTER.character.y],
    }
  },

  load: function(save) {
    LEVEL.loaded_character_pos = save.saved_character;
    LEVEL.setup(save.loaded_level_name);
  },

  clear: function() {
      this.html().innerHTML = "";
      this.elements = [];
      CHARACTER.clear();
  },

  index_object: function(object) {
      this.elements.push(object);
  },

  is_walkable: function(x, y) {
    var walkable = false;

    // could be optimized by ordering elements
    for(var i in this.elements) {
      var t = this.elements[i].is_walkable(x,y);
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

    // could be optimized by ordering elements
    for(var i in this.elements) {
      if (this.elements[i].is_interactible(x,y)) {
        here.push(this.elements[i]);
      }
    }

    if (here.length == 0) {
      return undefined;
    } else if (here.length == 1) {
      return here[0]
    } else { // if theres several elements we chose the one on top
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
    if(element.distance_to_character() < this._MAX_INTERACTION_DISTANCE) {
      element.interaction();
      CHARACTER.get().stop_autowalk();
      return true;
    }
  },

  interact_in_front: function() {
    var c = CHARACTER.get().gravity_center();
    var x = c[0];
    var y = c[1] + 10; // its more intuitive to take a point closer to legs
    switch(CHARACTER.get().facing_direction()) {
      case "LEFT":
        x -= this._FACE_INTERACTION_DISTANCE;
        break;
      case "RIGHT":
        x += this._FACE_INTERACTION_DISTANCE;
        break;
      case "UP":
        y -= this._FACE_INTERACTION_DISTANCE;
        break;
      default:
        y += this._FACE_INTERACTION_DISTANCE;
        break;
    }
    var element = this.select_interactible_at(x, y);
    if (element) {
      this.try_interact(element);
    }
  },

  up: function() { CHARACTER.get().try_move_up(); },
  down: function() { CHARACTER.get().try_move_down(); },
  left: function() { CHARACTER.get().try_move_left(); },
  right: function() { CHARACTER.get().try_move_right(); },

  click: function(x, y, is_hold) {
    var element = this.select_interactible_at(x, y);
    if (! element || is_hold) {
      CHARACTER.get().try_walk_to(x, y);
    } else {
      if (! this.try_interact(element)) {
        CHARACTER.get().try_walk_to(x, y);
      }
    }
  },
};
