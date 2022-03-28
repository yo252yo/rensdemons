
var _DEFAULT = {
  challenge_level: 0.5,
  volume_music: 0.3,
  volume_sfx: 0.7,
  battleorder: 'exploit',
};

const SETTINGS = {
  _SETTINGS: {},

  has: function(key){
    return (key in SETTINGS._SETTINGS);
  },

  get: function(key) {
    return SETTINGS._SETTINGS[key] || _DEFAULT[key];
  },

  set: function(key, value) {
    SETTINGS._SETTINGS[key] = value;
    // dont save to disk, its in the save
    //    DISK.write("DICTIONARY");
  },

  factory: {
    make_new: function() {
      SETTINGS._SETTINGS = _DEFAULT;
      DISK.write("SETTINGS");
    },

    export: function() {
      return SETTINGS._SETTINGS;
    },

    import: function(save) {
      SETTINGS._SETTINGS = save;
    },
  },
}
