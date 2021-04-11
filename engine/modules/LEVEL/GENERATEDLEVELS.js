
// We encode the seed in the level name to rebuild on save, keep state, etc...
const GENERATEDLEVELS = {
  house: {
    setup: function(type, seed) {
      var name = "$house_" + type + "_" +seed;
      CURRENTLEVEL.setup(name);
    },

    load: function(name) {
      var decode = name.split("_");
      var type = decode[1];
      var seed = decode[2];
      var h = new HouseGenerator(type, seed, CURRENTLEVEL.previous_lvl);
      var c = h.build();
      CURRENTLEVEL.initialize_with_character(c[0], c[1]);
    },
  },

  store: {
    setup: function(type, threshold, seed) {
      var name = "$store_" + type + "_" + threshold + "_" + seed;
      CURRENTLEVEL.setup(name);
    },

    load: function(name) {
      var decode = name.split("_");
      var type = decode[1];
      var threshold = decode[2];
      var seed = decode[3];
      var h = new StoreGenerator(type, threshold, seed, CURRENTLEVEL.previous_lvl);
      var c = h.build();
      CURRENTLEVEL.initialize_with_character(c[0], c[1]);
    },
  },
};
