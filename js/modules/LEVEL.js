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
  }

};
