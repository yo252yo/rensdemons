
// Modules part of the save, saved by users, they do not come back on page
// reload.

var _SAVED_MODULES = ["PALETTE", "DICTIONARY", "LEVELSTATES", "CURRENTLEVEL", "BATTLETREE", "ABILITIES", "INVENTORY", "MARTYRDOM", "PARTY", "SETTINGS"];

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
    CONSOLE.log.save("Saved: slot " + index);
  },

  load: function(index) {
    if (index >= SAVE.slots.length){
      CONSOLE.error("Invalid save slot (" + index + ")");
      return;
    }
    SAVE._load_savefile(SAVE.slots[index].save);
    CONSOLE.log.save("Loaded: slot " + index);
  },

  make_new_game: function() {
    var continu = ABILITIES.has_ability("_just_finished_game");
    for (var i in _SAVED_MODULES) {
      if(_DISK_MODULES.includes(_SAVED_MODULES[i])){
        continue; // No need to reset that which is on disk.
      }

      var mod = eval(_SAVED_MODULES[i]); // Be careful, eval is evil
      if (!mod || !mod.factory || !mod.factory.make_new) {
        CONSOLE.error("Failing to reset: " + _SAVED_MODULES[i]);
        continue;
      }
      mod.factory.make_new(continu);
    }
  },

  print: {
    save_menu: function() {
      SAVE.save(1); // abusive but we need to be sure we're ready
      var dothesave = function (){
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(DISK._CONTENT));

        var a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = `rens_demons_${(new Date()).toLocaleString()}.json`;
        a.innerHTML = 'download';

        var e =  document.createEvent('MouseEvents');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);

        console.log.debug("Save file downloaded");
      }

      new CenteredTextMenu("Save?", [
        {"text": "Overwrite AUTOSAVE", "effect": function() { SAVE.save(0); }},
        {"text": `Download new save file`, "effect": dothesave, "keep_open": true},
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
    if(!CHARACTER.character){
        CONSOLE.error("Autosave attempt when character is not available", true);
        return;
    }
    SAVE.save(0);
    INTERFACE.autosave_notif();
  },

};
