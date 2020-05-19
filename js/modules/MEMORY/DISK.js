
const DISK = {
    _CONTENT: {},

    _record_to_storage: function() {
      localStorage.setItem('rd_state', JSON.stringify(DISK._CONTENT));
    },

    set: function(key, value) {
        if (! DISK._CONTENT){
            DISK._CONTENT = {};
        }
        DISK._CONTENT[key] = value;
        CONSOLE.log.disk(key + "->" + value);
        DISK._record_to_storage();
    },

    get: function(key) {
      if (DISK._CONTENT[key]){
        return DISK._CONTENT[key];
      } else {
        return undefined;
      }
    },

    hard_reset: function() {
        DISK._CONTENT = {};
        DISK._record_to_storage();
    },

    // Be careful, eval is evil
    _initialize: function(module_name) {
      var mod = eval(module_name);
      if (!mod || !mod.factory) return;

      var save = DISK.get(mod._DISK_KEY);
      if(save && mod.factory.import) {
        mod.factory.import(save);
      } else if (mod.factory.make_new) {
        mod.factory.make_new();
      }
    },

    _restore_previous_state: function() {
      DISK._initialize("SAVE");
      DISK._initialize("PALETTE");
      DISK._initialize("DICTIONARY");
      DISK._initialize("ACTIONS");
      DISK._initialize("ABILITIES");
      DISK._initialize("INVENTORY");
    },

    _load_storage: function() {
      DISK._CONTENT = JSON.parse(localStorage.getItem('rd_state'));
      if (! DISK._CONTENT){
          DISK._CONTENT = {};
      }
    },

    initialize_game: function() {
      DISK._load_storage();
      DISK._restore_previous_state();
    },
};
