
// Modules saved on disk, they come back when you refresh as is, they're shared
// between saves, and are stored explicitely by DISK.write.
// It's the stuff we need on the title screen (and intro).
var _DISK_MODULES = ["PALETTE", "DICTIONARY", "STATS", "SAVE"];

const DISK = {
    _CONTENT: {},

    _record_to_storage: function() {
      try{
        localStorage.setItem('rd_state', JSON.stringify(DISK._CONTENT));
      } catch (e) {
        CONSOLE.error("It appears that the space allocated on disk for the game has reached a limit. No progress can be saved anymore.", false, true);
      }

    },

    _set: function(key, value) {
        if (! DISK._CONTENT){
            DISK._CONTENT = {};
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
            DISK._CONTENT = {};
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
        DISK._CONTENT = {};
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
          for (var i in parsed){
            if(!_DISK_MODULES.includes(i)){
              alert("This file has the wrong format or may be corrupted.");
              return;
            }
          }
          var parsedSaves = parsed["SAVE"] ? parsed["SAVE"].length : 0;
          var diskSaves = DISK._CONTENT["SAVE"] ? DISK._CONTENT["SAVE"].length : 0;
          var warning =
`
You are about to erase everything in the game and replace it with a file containing the adventures of ${parsed["DICTIONARY"]["Ren"]} and ${parsed["DICTIONARY"]["BestFriend"]} fighting against ${parsed["DICTIONARY"]["demon_lord"]} in ${parsed["DICTIONARY"]["world_name"]} (${parsedSaves} save files).\n\n
THIS WILL REPLACE THE CURRENT STATE OF THE GAME WHICH ARE the adventures of ${DISK._CONTENT["DICTIONARY"]["Ren"]} and ${DISK._CONTENT["DICTIONARY"]["BestFriend"]} fighting against ${DISK._CONTENT["DICTIONARY"]["demon_lord"]} in ${DISK._CONTENT["DICTIONARY"]["world_name"]} (${diskSaves} save files).
`;
          if (confirm(warning)) {
            CONSOLE.log.save("Loading new disk state: " + warning);
            DISK._CONTENT = parsed;
            DISK._record_to_storage();
            DISK.initialize_game();
            CURRENTLEVEL.setup("titlescreen");
          }
        } catch {
          alert("This file has the wrong format or may be corrupted.");
        }
      });

      reader.readAsText(form.files[0]);
    },
};
