// No entry = no ability
// An entry = it leads somewhere
// Entry with DOOM
const ABILITIES = {
  _abilities: {},

  save: function() {
    DISK.set("abilities", ABILITIES._abilities);
  },

  import: function(save){
    ABILITIES._abilities = save;
  },

  unlock: function(battle, name) {
    if (!ABILITIES._abilities[battle]) {
      ABILITIES._abilities[battle] = {};
    }
    if (!ABILITIES._abilities[battle][name]){
      ABILITIES._abilities[battle][name] = "";
      CONSOLE.DEBUG("α ability unlocked: [" + name + "] on " + battle);
    }
  },

  try: function(battle, name, destination) {
    if (!destination){
      destination = "tried";
    }
    ABILITIES.unlock(battle, name);
    if (ABILITIES._abilities[battle][name] != destination) {
      CONSOLE.DEBUG("α ability attempted: [" + name + "] on " + battle);
      ABILITIES._abilities[battle][name] = destination;
    }
  },

  check_unlocked: function(battle, name) {
    if (ABILITIES._abilities[battle]) {
      if (name in ABILITIES._abilities[battle]) {
        return true;
      }
    }
    return false;
  },

  score_destination: function(destination) {
    switch (destination) {
      case "":
        return 1;
      default:
        return 2;
    }
  },

  score_battle: function(battle) {
    if (!ABILITIES._abilities[battle]) {
      return 0;
    }
    var score = 0;
    for (var i in ABILITIES._abilities[battle]) {
      score += ABILITIES.score_destination(ABILITIES._abilities[battle][i]);
    }
    return score;
  },
};
