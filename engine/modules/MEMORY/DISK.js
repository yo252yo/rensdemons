
// Modules saved on disk, they come back when you refresh as is, they're shared
// between saves, and are stored explicitely by DISK.write.
// It's the stuff we need on the title screen (and intro).
var _DISK_MODULES = ["PALETTE", "DICTIONARY", "STATS", "SAVE", "SETTINGS"];

const DISK = {
    _CONTENT: {},

    _get_empty: function(){
      return {
        "#DISK_STATE_IDENTIFIER": (new Date()).getTime(),
      };
    },

    _record_to_storage: function() {
      try{
        localStorage.setItem('rd_state', JSON.stringify(DISK._CONTENT));
      } catch (e) {
        CONSOLE.error("It appears that the space allocated on disk for the game has reached a limit. No progress can be saved anymore.", false, true);
      }

    },

    _set: function(key, value) {
        if (! DISK._CONTENT){
            DISK._CONTENT = DISK._get_empty();
        }
        DISK._CONTENT[key] = value;
        CONSOLE.log.disk(key + "->" + value);
        DISK._record_to_storage();
    },

    _get: function(key) {
      if (DISK._CONTENT[key]){
        // Make sure we dont manipulate the object in DISK
        return JSON.parse(JSON.stringify(DISK._CONTENT[key]));
      } else {
        return undefined;
      }
    },

    initialize: {
      _initialize_module: function(module_name) {
        var mod = eval(module_name);  // Be careful, eval is evil
        if (!mod || !mod.factory) {
          CONSOLE.error("Failing to initialize for a disk state: " + module_name);
          return;
        }

        var disk_state = DISK._get(module_name);
        if (disk_state) {
          if(mod.factory.import) {
            mod.factory.import(disk_state);
          } else {
            CONSOLE.error("Failing to import state for a disk state: " + module_name);
            return;
          }
        } else if (mod.factory.make_new) {
          mod.factory.make_new();
        } else {
          CONSOLE.error("Failing to make new for a disk state: " + module_name);
          return;
        }
      },

      _restore_previous_state: function() {
        for(var i in _DISK_MODULES){
          DISK.initialize._initialize_module(_DISK_MODULES[i]);
        }
      },

      _load_storage: function() {
        DISK._CONTENT = JSON.parse(localStorage.getItem('rd_state'));
        if (! DISK._CONTENT){
            DISK._CONTENT = DISK._get_empty();
        }
      },
    },

    write: function(module_name) {
      var mod = eval(module_name);  // Be careful, eval is evil
      if (!mod || !mod.factory || !mod.factory.export){
        CONSOLE.error("Failing to export for a disk state: " + module_name);
        return;
      }
      DISK._set(module_name, mod.factory.export());
    },

    initialize_game: function() {
      DISK.initialize._load_storage();
      DISK.initialize._restore_previous_state();
    },

    hard_reset: function() {
        DISK._CONTENT = DISK._get_empty();
        DISK._record_to_storage();
    },

    restore_from_file: function() {
      var form = document.getElementById('fileInput');
      if (!form) {
        CONSOLE.error("Tried to restore DISK but missing html element.");
        return;
      }

      if (!form.files.length) {
        alert("This file is empty.");
        return;
      }

      var reader = new FileReader();
      reader.addEventListener('load', function() {
        try {
          var parsed = JSON.parse(reader.result);
          var key;
          for (var i in parsed) {
            if(i == "#DISK_STATE_IDENTIFIER") {
              key = parsed[i];
            } else if(!_DISK_MODULES.includes(i)){
              CONSOLE.error("This file has the wrong format or may be corrupted.", false, true);
              return;
            }
          }

          if(parsed["#DISK_STATE_IDENTIFIER"] != DISK._CONTENT["#DISK_STATE_IDENTIFIER"]){
            CONSOLE.log.save("Loading save from a different device, restoring everything on disk.");
            DISK._CONTENT = parsed;
            DISK._CONTENT["#DISK_STATE_IDENTIFIER"] = (new Date()).getTime();
          } else {
            CONSOLE.log.save("Loading save the same device, only loading the save file.");
            DISK._CONTENT["SAVE"] = parsed["SAVE"];
          }

          DISK._record_to_storage();
          DISK.initialize_game();
          SAVE.load(1);
        } catch {
          CONSOLE.error("This file has the wrong format or may be corrupted.", false, true);
        }
      });

      reader.readAsText(form.files[0]);
    },
};
