
const STATS = {
  _DISK_KEY: "stats",
  _stats: new FluidMap(),

  factory: {
    save: function() {
      DISK.set(STATS._DISK_KEY, {
       "content": STATS._stats.export()
     });
    },

    import: function(save){
      STATS._stats = new FluidMap(save["content"]);
    },
  },

  record: {
    death: function() {
      STATS._stats.increment(["death"]);
      STATS.factory.save();
    },
  },

}
