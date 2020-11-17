
const STAT = {
  Death: "death",
}

const STATS = {
  _stats: new FluidMap(),

  factory: {
    export: function() {
      return STATS._stats.export();
    },

    import: function(save) {
      STATS._stats = new FluidMap(save);
    },

    make_new: function() {
      // Nothing is needed.
    },
  },

  record: {
    death: function() {
      STATS._stats.increment([STAT.Death]);
      DISK.write("STATS");
    },
  },

  get: function(key){
    return STATS._stats.get([key]);
  }

}