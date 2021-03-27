
// We encode the seed in the level name to rebuild on save, keep state, etc...
const GENERATEDLEVELS = {
  house: {
    setup: function(seed) {
      var name = "$house_" + seed;
      CURRENTLEVEL.setup(name);
    },

    load: function(name) {
      var seed = name.split("_")[1];
      var h = new HouseGenerator(seed, CURRENTLEVEL.previous_lvl);
      var c = h.build();
      CURRENTLEVEL.initialize_with_character(c[0], c[1]);
    },
  },
};
