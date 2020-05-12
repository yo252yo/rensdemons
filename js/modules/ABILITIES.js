const ABILITIES = {
  _abilities: {},

  unlock: function(battle, name) {
    if (!ABILITIES._abilities[battle]){
      ABILITIES._abilities[battle] = {};
    }
    ABILITIES._abilities[battle][name] = true;
  },

  check: function(battle, name) {
    if (ABILITIES._abilities[battle]){
      if (ABILITIES._abilities[battle][name]){
        return ABILITIES._abilities[battle][name];
      }
    }
    return false;
  },

  score_battle: function(battle) {
    if (!ABILITIES._abilities[battle]){
      return 0;
    }
    return Object.keys(ABILITIES._abilities[battle]).length;
  },
};
