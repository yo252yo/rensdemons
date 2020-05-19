

class DictionaryGenerator {
  make_new() {
    for(var propt in this){
      if(propt.startsWith("_gen")){
        this[propt]();
      }
    }
  }

  // Generators
  _gen_sidekick_name = function() {
    DICTIONARY._DICTIONARY['sidekick_name'] = MARKOV_MODELS.human_names.mutate("Aerith", 5);
  };

  _gen_world_name = function() {
    DICTIONARY._DICTIONARY['world_name'] = MARKOV_MODELS.human_names.mutate("Hyrule", 8);
  };

  _gen_demon_lord = function() {
    DICTIONARY._DICTIONARY['demon_lord'] = MARKOV_MODELS.human_names.mutate("Bowser", 12);
  };

  _gen_child_friends = function() {
    DICTIONARY._DICTIONARY['child_friends_m1'] = 'Michael';
    DICTIONARY._DICTIONARY['child_friends_m2'] = 'Nicholas';
    DICTIONARY._DICTIONARY['child_friends_m3'] = 'Andrew';
    DICTIONARY._DICTIONARY['child_friends_f1'] = 'Sarah';
    DICTIONARY._DICTIONARY['child_friends_f2'] = 'Emily';
  };
}

const DICTIONARY = {
  _DISK_KEY: "dictionary",
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
      DISK.set(DICTIONARY._DISK_KEY, DICTIONARY.factory.export());
    },

    export: function() {
      return DICTIONARY._DICTIONARY;
    },

    import: function(dictionary) {
      DICTIONARY._DICTIONARY = dictionary;
    },
  },
}
