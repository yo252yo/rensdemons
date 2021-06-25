
// Modules part of the save, saved by users, they do not come back on page
// reload.

var _SAVED_MODULES = ["PALETTE", "DICTIONARY", "LEVELSTATES", "CURRENTLEVEL", "BATTLETREE", "ABILITIES", "INVENTORY", "MARTYRDOM", "PARTY"];

class SaveFile {
  constructor() {
    for (var i in _SAVED_MODULES){
      var mod = eval(_SAVED_MODULES[i]); // Be careful, eval is evil
      if (!mod || !mod.factory || !mod.factory.export) {
        CONSOLE.error("Failing to export for a save: " + _SAVED_MODULES[i]);
        continue;
      }
      // Make sure we dont keep a reference to a living object.
      this[_SAVED_MODULES[i]] = JSON.parse(JSON.stringify(mod.factory.export()));
    }
  }
}

const SAVE = {
  slots: [],

  factory: {
    export: function(){
      return SAVE.slots;
    },

    import: function(save){
      // Make sure we dont keep a reference to a living object.
      return SAVE.slots = JSON.parse(JSON.stringify(save));
    },

    make_new: function() {
      // Nothing is needed.
    },
  },

  _load_savefile: function(savefile){
    for (var i in _SAVED_MODULES) {
      var mod = eval(_SAVED_MODULES[i]); // Be careful, eval is evil
      if (!mod || !mod.factory || !mod.factory.import || !(_SAVED_MODULES[i] in savefile)) {
        CONSOLE.error("Failing to import for a save: " + _SAVED_MODULES[i]);
        continue;
      }
      mod.factory.import(savefile[_SAVED_MODULES[i]]);
    }
  },

  save: function(index) {
    LEVELSTATES.register_current();
    var key = (new Date()).toLocaleString();

    if (index == undefined) {
      if(SAVE.slots.length == 0) { SAVE.autosave(); } // only happens in debug where we never autosaved.
      index = SAVE.slots.length;
    }
    if (index == 0){
      key = "AUTOSAVE";
    }
    SAVE.slots[index] = {
      key: key,
      save: new SaveFile(),
    };
    DISK.write("SAVE");
    CONSOLE.log.save("Saved in save slot " + index);
  },

  load: function(index) {
    if (index >= SAVE.slots.length){
      CONSOLE.error("Invalid save slot (" + index + ")");
      return;
    }
    SAVE._load_savefile(SAVE.slots[index].save);
    CONSOLE.log.save("Loaded save slot " + index);
  },

  make_new_game: function() {
    for (var i in _SAVED_MODULES) {
      if(_DISK_MODULES.includes(_SAVED_MODULES[i])){
        continue; // No need to reset that which is on disk.
      }

      var mod = eval(_SAVED_MODULES[i]); // Be careful, eval is evil
      if (!mod || !mod.factory || !mod.factory.make_new) {
        CONSOLE.error("Failing to reset: " + _SAVED_MODULES[i]);
        continue;
      }
      mod.factory.make_new();
    }
  },

  print: {
    save_menu: function() {
      new CenteredTextMenu("Save?", [
        {"text": "Overwrite AUTOSAVE", "effect": function() { SAVE.save(0); }},
        {"text": "New save file", "effect": function() {
          SAVE.save(1);

          var bl = new Blob([JSON.stringify(DISK._CONTENT)], {type: "text/plain"});
          var a_download = document.createElement("a");
          a_download.href = URL.createObjectURL(bl);
          a_download.download = `rens_demons_${(new Date()).toLocaleString()}.json`;
          a_download.hidden = true;
          document.body.appendChild(a_download);
          a_download.click();
        }},
        {"text": "Back", "effect": "##BACK"}
      ]);
      return true;
    },

    can_load: function() {
      return (SAVE.slots.length > 0);
    },

    load_menu: function() {
      var options = [];
      if (SAVE.slots[0]){
        options.push({"text": "Load AUTOSAVE", "effect": function() { SAVE.load(0); }});
      }
      options.push({"text": "Back", "effect": "##BACK"});

      new CenteredTextMenu(`Load past game<br />
        Load file: <input type="file" id="fileInput" onChange="DISK.restore_from_file()" />
        `, options);
    },
  },

  autosave: function(){
    SAVE.save(0);
  },

};
