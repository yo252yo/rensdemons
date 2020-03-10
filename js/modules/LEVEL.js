// runtime (CHARACTER)
// use(manager.js)

const LEVEL = {
  elements: [],

  html: function(){
    return document.getElementById("level");
  },

  load: function(name) {
      LEVEL.clear();

      new Import("levels/" + name);
      console.log("- Loaded level " + name);
  },

  clear: function(){
      LEVEL.html().innerHTML = "";
      LEVEL.elements = [];
      CHARACTER.clear();
  },

  index_object: function(object){
      LEVEL.elements.push(object);
  },

  is_walkable: function(x, y){
    var walkable = false;

    // could be optimized by ordering elements
    for(var i in LEVEL.elements){
      var t = LEVEL.elements[i].is_walkable(x,y);
      if (t == -1) {
        return false;
      } else if (t == 1){
        walkable = true;
      }
    }
    return walkable;
  },

  up: function(){
    // TODO: improve
    if (LEVEL.is_walkable(CHARACTER.x, CHARACTER.y-10)){
      CHARACTER.move(0,-10);
    }
  },
  down: function(){
    // TODO: improve
    if (LEVEL.is_walkable(CHARACTER.x, CHARACTER.y+10)){
      CHARACTER.move(0,10);
    }
  },
  left: function(){
    // TODO: improve
    if (LEVEL.is_walkable(CHARACTER.x-10, CHARACTER.y)){
      CHARACTER.move(-10,0);
    }
  },
  right: function(){
    // TODO: improve
    if (LEVEL.is_walkable(CHARACTER.x+10, CHARACTER.y)){
      CHARACTER.move(10,0);
    }
  },

  click: function(x,y){

    // TODO: improve
    var tx= x-15;
    var ty = y;

    if (LEVEL.is_walkable(tx,ty)){
      CHARACTER.sprite.place_at(tx,ty);
    }
  },
};
