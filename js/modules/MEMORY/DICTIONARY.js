

class DictionaryGenerator {
  make_new() {
    DICTIONARY._DICTIONARY['sidekick_name'] = MARKOV_MODELS.human_names.mutate("Aerith", 5);
    DICTIONARY._DICTIONARY['world_name'] = MARKOV_MODELS.human_names.mutate("Hyrule", 8);
    DICTIONARY._DICTIONARY['demon_lord'] = MARKOV_MODELS.human_names.mutate("Bowser", 12);
    DICTIONARY._DICTIONARY['child_friends_m1'] = 'Michael';
    DICTIONARY._DICTIONARY['child_friends_m2'] = 'Nicholas';
    DICTIONARY._DICTIONARY['child_friends_m3'] = 'Andrew';
    DICTIONARY._DICTIONARY['child_friends_f1'] = 'Sarah';
    DICTIONARY._DICTIONARY['child_friends_f2'] = 'Emily';
    DICTIONARY._DICTIONARY['town_1_seed'] = Math.random();
  };
}

const DICTIONARY = {
  _DICTIONARY: {},

  get: function(key) {
    if (key in DICTIONARY._DICTIONARY){
      return DICTIONARY._DICTIONARY[key];
    } else{
      CONSOLE.error("Wrong dictionary key: " + key);
      return "";
    }
  },

  factory: {
    make_new: function() {
      (new DictionaryGenerator()).make_new();
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
