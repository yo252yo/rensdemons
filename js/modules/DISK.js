
const DISK = {
    _CONTENT: {},

    set(key, value) {
        if (! DISK._CONTENT){
            DISK._CONTENT = {};
        }
        DISK._CONTENT[key] = value;
        CONSOLE.sys_log("Disk state updated: " + key + "->" + value);
        DISK.save();
    },

    save() {
      localStorage.setItem('rd_state', JSON.stringify(DISK._CONTENT));
    },

    HARD_RESET() {
        DISK._CONTENT = {};
        DISK.save();
    },

    initialize() {
      DISK._CONTENT = JSON.parse(localStorage.getItem('rd_state'));
      if (! DISK._CONTENT){
          DISK._CONTENT = {};
      }
      if(DISK._CONTENT['saves']){
        SAVE.import(DISK._CONTENT['saves']);
      }
    },
};
