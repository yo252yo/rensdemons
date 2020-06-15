
const LEVELSTATES = {
  _states: new FluidMap(),

  factory: {
    export: function(){
      return LEVELSTATES._states.export();
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
    var name = save.level_name;
    CONSOLE.log.level("Saved levelstate for " + save.level_name);
    if (name) {
      LEVELSTATES._states.set([name], save);
     }
  },

  get_save: function(level) {
    return LEVELSTATES._states.get([level]);
  },
};