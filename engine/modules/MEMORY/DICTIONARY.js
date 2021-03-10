

class DictionaryGenerator {
  make_new() {
    var r = {};
    // Character names
    r['sidekick'] = MARKOV_MODELS.human_names.mutate("Aerith", 5);
    r['demon_lord'] = MARKOV_MODELS.human_names.mutate("Bowser", 12);
    r['child_friends_m1'] = 'Michael';
    r['child_friends_m2'] = 'Nicholas';
    r['child_friends_m3'] = 'Andrew';
    r['child_friends_f1'] = 'Sarah';
    r['child_friends_f2'] = 'Emily';

    // Geography names
    r['world_name'] = MARKOV_MODELS.human_names.mutate("Hyrule", 8);
    r['town_1'] = MARKOV_MODELS.human_names.mutate("Pallet", 8) + "burg";
    r['town_2'] = MARKOV_MODELS.human_names.mutate("Midgar", 8);

    // Generation seeds
    r['town_1_seed'] = Math.random();
    r['world_map_seed'] = Math.random();
    return r;
  };
}

const DICTIONARY = {
  _DICTIONARY: {},

  fix_broken: function(key){
    var v = (new DictionaryGenerator()).make_new();
    if (v[key]){
      DICTIONARY._DICTIONARY[key] = v[key];
      CONSOLE.error("Successfully mitigated");
  //    DISK.write("DICTIONARY");
      return DICTIONARY._DICTIONARY[key];
    } else {
      CONSOLE.error("Cannot mitigate");
      return "";
    }
  },

  has: function(key){
    return (key in DICTIONARY._DICTIONARY);
  },

  get: function(key) {
    if (DICTIONARY.has(key)){
      return DICTIONARY._DICTIONARY[key];
    } else {
      CONSOLE.error("Wrong dictionary key: " + key);
      return DICTIONARY.fix_broken(key);
    }
  },

  factory: {
    make_new: function() {
      DICTIONARY._DICTIONARY = (new DictionaryGenerator()).make_new();
      DISK.write("DICTIONARY");
    },

    export: function() {
      return DICTIONARY._DICTIONARY;
    },

    import: function(save) {
      DICTIONARY._DICTIONARY = save;
    },
  },
}
