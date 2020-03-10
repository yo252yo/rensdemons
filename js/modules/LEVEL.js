
const LEVEL = {
  html: function(){
    return document.getElementById("level");
  },

  load: function(name) {
      // resets the level
      LEVEL.html().innerHTML = "";

      load_js("levels/" + name);
      console.log("- Loaded level " + name);
  },


};
