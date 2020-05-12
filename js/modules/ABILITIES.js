const ABILITIES = {
  _abilities: {},

  save: function() {
    DISK.set("abilities", ABILITIES._abilities);
  },

  import: function(save){
    ABILITIES._abilities = save;
  },

  unlock: function(battle, name) {
    console.log(name + " unlocked");
    if (!ABILITIES._abilities[battle]) {
      ABILITIES._abilities[battle] = {};
    }
    if (!ABILITIES._abilities[battle][name]){
      ABILITIES._abilities[battle][name] = "discovered";
      ABILITIES.save();
    }
  },

  record: function(battle, name) {
    console.log(name + " tried");
    if (!ABILITIES._abilities[battle]) {
      ABILITIES._abilities[battle] = {};
    }
    if (!ABILITIES._abilities[battle][name] || ABILITIES._abilities[battle][name] != "tried"){
      ABILITIES._abilities[battle][name] = "tried";
      ABILITIES.save();
    }
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
    if (!ABILITIES._abilities[battle]) {
      return 0;
    }
    var score = 0;
    for (var i in ABILITIES._abilities[battle]){
      switch(ABILITIES._abilities[battle][i]){
        case "discovered":
          score += 1;
          break;
        case "tried":
          score += 2;
          break;
      }

    }
    console.log(score);
    return score;
  },
};
