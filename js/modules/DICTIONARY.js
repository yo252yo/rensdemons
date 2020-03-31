

class DictionaryInternal {
  constructor(copy) {
    if (copy){
    }
    else{
      this.initialize();
    }
  }

  initialize() {
    for(var propt in this){
      if(propt.startsWith("_gen")){
        this[propt]();
      }
    }
  }

  // Generators
  _gen_sidekick_name = function() {
    this.sidekick_name = MARKOV_MODELS.human_names.mutate("Aerith", 5);
  };

    _gen_world_name = function() {
      this.world_name = MARKOV_MODELS.human_names.mutate("Hyrule", 8);
    };

    _gen_demon_lord = function() {
      this.demon_lord = MARKOV_MODELS.human_names.mutate("Bowser", 12);
    };
}

const DICTIONARY = {
  _DICTIONARY: new DictionaryInternal(),

  get: function(key) {
    if (key in this._DICTIONARY){
      return this._DICTIONARY[key];
    } else{
      console.error("Wrong dictionary key: " + key);
      return "";
    }
  },

  reset: function() {
    this._DICTIONARY = new DictionaryInternal();
  },

  export: function() {
    return this._DICTIONARY;
  },

  load: function(dictionary) {
    this._DICTIONARY = dictionary;
  },
}
