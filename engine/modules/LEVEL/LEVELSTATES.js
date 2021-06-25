
const LEVELSTATES = {
  _states: new FluidMap(),

  factory: {
    export: function(){
      // Make sure we have the latest state.
      LEVELSTATES.register_current();
      return LEVELSTATES._states.export();
    },

    make_new: function() {
      LEVELSTATES._states = new FluidMap();
    },

    import: function(save) {
      LEVELSTATES._states = new FluidMap(save);
    },
  },

  get_position: function(level) {
    var saved = LEVELSTATES.get_save(level);
    if (saved) {
      return saved.saved_character_position;
    } else {
      return [undefined, undefined];
    }
  },

  register_current: function() {
    LEVELSTATES.register_from_save(CURRENTLEVEL.factory.export());
  },

  register_from_save: function(save) {
    CONSOLE.log.level("Saved/loaded levelstate for " + save.level_name + "(" + save.saved_character_position + ")");
    if (save.level_name && !save.level_name.startsWith("$") && !save.level_name.endsWith("&")) {
      // Do not save generated level states
      LEVELSTATES._states.set([save.level_name], save);
    }
  },

  get_save: function(level) {
    return LEVELSTATES._states.get([level]);
  },
};
