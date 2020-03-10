// use(CHARACTER)

const LEVEL = {
  html: function(){
    return document.getElementById("level");
  },

  load: function(name) {
      LEVEL.clear();

      load_js("levels/" + name);
      console.log("- Loaded level " + name);
  },

  clear: function(){
      LEVEL.html().innerHTML = "";
      CHARACTER.clear();
  },

  up: function(){
    CHARACTER.sprite.move(0,-10);
  },
  down: function(){
    CHARACTER.sprite.move(0,10);
  },
  left: function(){
    CHARACTER.sprite.move(-10,0);
  },
  right: function(){
    CHARACTER.sprite.move(10,0);
  },
  click: function(x,y){
    CHARACTER.sprite.place_at(x-15,y+20);
  },
};
