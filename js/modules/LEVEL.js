// runtime (CHARACTER)
// use(manager.js)

const LEVEL = {
  elements: [],

  html: function(){
    return document.getElementById("level");
  },

  load: function(name) {
      this.clear();

      new Import("levels/" + name);
      console.log("- Loaded level " + name);
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

  up: function(){ CHARACTER.try_move_up(); },
  down: function(){ CHARACTER.try_move_down(); },
  left: function(){ CHARACTER.try_move_left(); },
  right: function(){ CHARACTER.try_move_right(); },
  click: function(x, y){ CHARACTER.try_move_to(x, y); },
};
