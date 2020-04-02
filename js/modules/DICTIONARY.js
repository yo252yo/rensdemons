

class DictionaryGenerator {
  initialize() {
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
}

const DICTIONARY = {
  _DICTIONARY: {},

  get: function(key) {
    if (key in DICTIONARY._DICTIONARY){
      return DICTIONARY._DICTIONARY[key];
    } else{
      console.error("Wrong dictionary key: " + key);
      return "";
    }
  },

  initialize: function() {
    (new DictionaryGenerator()).initialize();
  },

  save: {
    export: function() {
      return DICTIONARY._DICTIONARY;
    },

    import: function(dictionary) {
      DICTIONARY._DICTIONARY = dictionary;
    },
  },
}
