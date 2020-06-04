
const LEVELSTATES = {
  _states: new FluidMap(),

  factory: {
    export: function(){
      console.log(LEVELSTATES._states.export());
      return {
        level_states: LEVELSTATES._states.export(),
      }
    },

    import: function(save) {
      LEVELSTATES._states = new FluidMap(save.level_states);
        console.log(LEVELSTATES._states);
    },
  },

  register_position: function(level, x, y) {
    LEVELSTATES._states.set([level, "char_x"], x);
    LEVELSTATES._states.set([level, "char_y"], y);
  },

  get_position: function(level) {
    return [
      LEVELSTATES._states.get([level, "char_x"]),
      LEVELSTATES._states.get([level, "char_y"])
    ];
  },
};
