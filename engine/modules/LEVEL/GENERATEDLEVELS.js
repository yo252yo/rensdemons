
// We encode the seed in the level name to rebuild on save, keep state, etc...
const GENERATEDLEVELS = {
  house: {
    setup: function(seed) {
      var name = "$house_" + seed;
      CURRENTLEVEL.setup(name);
    },

    load: function(name) {
      var decode = name.split("_");
      var seed = decode[1];
      var h = new HouseGenerator(seed, CURRENTLEVEL.previous_lvl);
      var c = h.build();
      CURRENTLEVEL.initialize_with_character(c[0], c[1]);
    },
  },

  store: {
    setup: function(type, seed) {
      var name = "$store_" + type + "_" + seed;
      CURRENTLEVEL.setup(name);
    },

    load: function(name) {
      var decode = name.split("_");
      var type = decode[1];
      var seed = decode[2];
      var h = new StoreGenerator(type, seed, CURRENTLEVEL.previous_lvl);
      var c = h.build();
      CURRENTLEVEL.initialize_with_character(c[0], c[1]);
    },
  },
};
