
const DISK = {
    _CONTENT: {},

    _record_to_storage() {
      localStorage.setItem('rd_state', JSON.stringify(DISK._CONTENT));
    },

    set(key, value) {
        if (! DISK._CONTENT){
            DISK._CONTENT = {};
        }
        DISK._CONTENT[key] = value;
        CONSOLE.log.disk(key + "->" + value);
        DISK._record_to_storage();
    },

    get(key) {
      if (DISK._CONTENT[key]){
        return DISK._CONTENT[key];
      } else {
        return undefined;
      }
    },

    hard_reset() {
        DISK._CONTENT = {};
        DISK._record_to_storage();
    },

    _restore_previous_state() {
      SAVE.factory.initialize();
      PALETTE.factory.initialize();
      DICTIONARY.factory.initialize();
      ACTIONS.factory.initialize();
      ABILITIES.factory.initialize();
      INVENTORY.factory.initialize();
    },

    _load_storage() {
      DISK._CONTENT = JSON.parse(localStorage.getItem('rd_state'));
      if (! DISK._CONTENT){
          DISK._CONTENT = {};
      }
    },

    initialize_game() {
      DISK._load_storage();
      DISK._restore_previous_state();
    },
};
