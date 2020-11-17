
// Modules part of the save, saved by users, they do not come back on page
// reload.

var _SAVED_MODULES = ["PALETTE", "DICTIONARY", "LEVELSTATES", "CURRENTLEVEL", "BATTLETREE", "ABILITIES", "INVENTORY", "MARTYRDOM"];

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
    _menu_from_slots: function(effect, start){
      if (start == undefined){ start = 0; }
      var result = [];
      for(var i = start; i < SAVE.slots.length; i++){
        var slot = SAVE.slots[i];
        (function (f, index) {
          var callback = function() { f(index); };
          result.push({"text": slot.key, "effect": callback});
        })(effect, i);
      }
      result.push({"text": "Back", "effect": "##BACK"});

      return result;
    },

    save_menu: function() {
      new CenteredTextMenu("Save in slot?",
                    [
                      {"text": "New save", "effect": function(){ SAVE.save(); }},
                   ].concat(SAVE.print._menu_from_slots(function(i){ SAVE.save(i);}, 1))
                 );
      return true;
    },

    can_load: function() {
      return (SAVE.slots.length > 0);
    },

    load_menu: function() {
      new CenteredTextMenu("Load from slot?",
                    SAVE.print._menu_from_slots(function(i){ return SAVE.load(i);})
                  );
    },
  },

  autosave: function(){
    SAVE.save(0);
  },

};
