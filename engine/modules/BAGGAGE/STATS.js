
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
      STATS._stats.merge(new FluidMap(save));
    },

    make_new: function() {
      // Nothing is needed.
    },
  },

  record: {
    death: function(v) {
      STATS._stats.increment([STAT.Death], v);
      DISK.write("STATS");
    },

    flag: function(text, value){
      STATS._stats.increment(["FLAG_" + text], value);
      DISK.write("STATS");
    },
  },

  get: function(key){
    return STATS._stats.get([key]);
  },

  flag: function(text){
    return STATS._stats.get(["FLAG_" + text]);
  },

}
