

class DictionaryGenerator {
  make_new() {
    for(var propt in this){
      if(propt.startsWith("_gen")){
        this[propt]();
      }
    }
  };

  // Generators
  _gen_sidekick_name() {
    DICTIONARY._DICTIONARY['sidekick_name'] = MARKOV_MODELS.human_names.mutate("Aerith", 5);
  };

  _gen_world_name() {
    DICTIONARY._DICTIONARY['world_name'] = MARKOV_MODELS.human_names.mutate("Hyrule", 8);
  };

  _gen_demon_lord() {
    DICTIONARY._DICTIONARY['demon_lord'] = MARKOV_MODELS.human_names.mutate("Bowser", 12);
  };

  _gen_child_friends() {
    DICTIONARY._DICTIONARY['child_friends_m1'] = 'Michael';
    DICTIONARY._DICTIONARY['child_friends_m2'] = 'Nicholas';
    DICTIONARY._DICTIONARY['child_friends_m3'] = 'Andrew';
    DICTIONARY._DICTIONARY['child_friends_f1'] = 'Sarah';
    DICTIONARY._DICTIONARY['child_friends_f2'] = 'Emily';
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
