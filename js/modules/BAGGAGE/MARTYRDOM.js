
const MARTYRDOM = {
  _progress: new FluidMap(),

  factory: {
    export: function() {
      return MARTYRDOM._progress.export();
    },

    import: function(save) {
      MARTYRDOM._progress = new FluidMap(save);
    },

    make_new: function() {
      MARTYRDOM._progress = new FluidMap();
    },
  },


}
