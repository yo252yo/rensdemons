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

  index_object:function(object){
      LEVEL.elements.push(object);
  },

  up: function(){
    // TODO: improve
    CHARACTER.sprite.move(0,-10);
  },
  down: function(){
    // TODO: improve
    CHARACTER.sprite.move(0,10);
  },
  left: function(){
    // TODO: improve
    CHARACTER.sprite.move(-10,0);
  },
  right: function(){
    // TODO: improve
    CHARACTER.sprite.move(10,0);
  },
  click: function(x,y){
    // TODO: improve
    CHARACTER.sprite.place_at(x-15,y+20);
  },
};
