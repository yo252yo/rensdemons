
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
      var c = LEVELSTATES._states;
      LEVELSTATES._states = new FluidMap(save);
      LEVELSTATES._states.merge(c);
    },
  },

  get_position: function(level) {
    var saved = LEVELSTATES.get_save(level);
    if (saved) {
      return saved.saved_character_position;
    } else {
      return [undefined, undefined, undefined];
    }
  },

  register_current: function(forced) {
    LEVELSTATES.register_from_save(CURRENTLEVEL.factory.export(), forced);
  },

  register_from_save: function(save, forced) {
    CONSOLE.log.level("Saved levelstate for " + save.level_name + "(" + save.saved_character_position + ")");
    if (forced || (save.level_name && !save.level_name.startsWith("$") && !save.level_name.endsWith("$"))) {
      // Do not save generated level states
      LEVELSTATES._states.set([save.level_name], save);
    }
  },

  get_save: function(level) {
    return LEVELSTATES._states.get([level]);
  },
};
