
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
    LEVELSTATES.register_current(true);
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
      SAVE.save(1); // abusive but we need to be sure we're ready
      var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(DISK._CONTENT));


      new CenteredTextMenu("Save?", [
        {"text": "Overwrite AUTOSAVE", "effect": function() { SAVE.save(0); }},
        {"text": `<a href="data:${data}" style="text-decoration:none;" download="rens_demons_${(new Date()).toLocaleString()}.json">Download new save file</a>`,
          "effect": function() {CONSOLE.log.save("Save file downloaded"); }, "keep_open": true},
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
    INTERFACE.autosave_notif();
  },

};
