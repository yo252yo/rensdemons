
const STAT = {
  Death: "death",
}

const ENDINGS = {
  War: "END OF WAR",
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

    unlock: function(text, value){
      STATS._stats.increment(["UNLOCK_" + text], value);
      DISK.write("STATS");
    },

    ending: function(text, value){
      STATS._stats.increment(["END_" + text], value);
      DISK.write("STATS");
    },
  },

  get: function(key){
    return STATS._stats.get([key]);
  },

  flag: function(text){
    return STATS._stats.get(["FLAG_" + text]);
  },

  unlocked: function(text){
    return STATS._stats.get(["UNLOCK_" + text]);
  },

  ending: function(text){
    return STATS._stats.get(["END_" + text]);
  },
}
