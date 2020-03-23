// runtime (CHARACTER, CONSOLE)
// use(manager.js)

const LEVEL = {
  _MAX_INTERACTION_DISTANCE: 70,
  _FACE_INTERACTION_DISTANCE: 20,

  elements: [],

  html: function(){
    return document.getElementById("level");
  },

  load: function(name) {
      this.clear();

      new Import("levels/" + name);
      CONSOLE.sys_log("- Loaded level " + name);
  },

  clear: function(){
      this.html().innerHTML = "";
      this.elements = [];
      CHARACTER.clear();
  },

  index_object: function(object){
      this.elements.push(object);
  },

  is_walkable: function(x, y){
    var walkable = false;

    // could be optimized by ordering elements
    for(var i in this.elements){
      var t = this.elements[i].is_walkable(x,y);
      if (t == -1) {
        return false;
      } else if (t == 1){
        walkable = true;
      }
    }
    return walkable;
  },

  select_interactible_at: function(x, y){
    var here = [];

    // could be optimized by ordering elements
    for(var i in this.elements){
      if (this.elements[i].is_interactible(x,y)){
        here.push(this.elements[i]);
      }
    }

    if (here.length == 0) {
      return undefined;
    } else if (here.length == 1){
      return here[0]
    } else { // if theres several elements we chose the one on top
      var max = here[0].get_depth();
      var argmax = here[0];
      for (var int = 1; i < here.length; i ++){
        if(here[i].get_depth() > max){
          max = here[i].get_depth();
          argmax = here[i];
        }
      }
      return argmax;
    }
  },

  try_interact: function(element){
    if(element.distance_to_character() < this._MAX_INTERACTION_DISTANCE){
      element.interaction();
      CHARACTER.get().stop_autowalk();
      return true;
    }
  },

  interact_in_front: function(){
    var c = CHARACTER.get().gravity_center();
    var x = c[0];
    var y = c[1];
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

  up: function(){ CHARACTER.get().try_move_up(); },
  down: function(){ CHARACTER.get().try_move_down(); },
  left: function(){ CHARACTER.get().try_move_left(); },
  right: function(){ CHARACTER.get().try_move_right(); },

  click: function(x, y, is_hold){
    var element = this.select_interactible_at(x, y);
    if (! element || is_hold){
      CHARACTER.get().try_walk_to(x, y);
    } else {
      if (! this.try_interact(element)){
        CHARACTER.get().try_walk_to(x, y);
      }
    }
  },
};
