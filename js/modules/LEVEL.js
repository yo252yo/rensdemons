
const LEVEL = {
  html(){
    return document.getElementById("level");
  },

  load(name) {
      // resets the level
      LEVEL.html().innerHTML = "";

      load_js("levels/" + name);
      console.log("- Loaded level " + name);
  },


};
