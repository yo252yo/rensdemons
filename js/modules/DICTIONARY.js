

class DisctionaryInternal {
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
    this.sidekick_name = MARKOV_MODELS.human_names.mutate("Aerith", 10);
  };

  _gen_world_name = function() {
    this.world_name = MARKOV_MODELS.human_names.mutate("Hyrule", 20);
  };
}

const DICTIONARY = {
  _DICTIONARY: new DisctionaryInternal(),

  get: function(key) {
    return this._DICTIONARY[key];
  },

  reset: function() {
    this._DICTIONARY = new DisctionaryInternal();
  },

  load: function() {
  },
}
