

class DisctionaryInternal {
  constructor(copy) {
    if (copy){
    }
    else{
      this.initialize();
    }
  }

  initialize() {
    this.sidekick_name = MARKOV_MODELS.human_names.mutate("Aerith", 10);
    this.world_name = MARKOV_MODELS.human_names.mutate("Hyrule", 20);
  }
}

const DICTIONARY = {
  _DICTIONARY: new DisctionaryInternal(),

  get: function(key) {
    return _DICTIONARY[key];
  },

  reset: function() {
    this._DICTIONARY = new DisctionaryInternal();
  },

  load: function() {
  },
}
