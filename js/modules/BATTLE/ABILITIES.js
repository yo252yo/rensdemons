// No entry = no ability
// An entry = it leads somewhere
// Entry with DOOM
const ABILITIES = {
  _abilities: {},
  LOSS: "#LOSS",
  WIN: "#WIN",

  save: function() {
    DISK.set("abilities", ABILITIES._abilities);
  },

  import: function(save){
    ABILITIES._abilities = save;
  },

  unlock: function(battle, name, from) {
    if (!ABILITIES._abilities[battle]) {
      ABILITIES._abilities[battle] = {};
    }

    if (!( name in ABILITIES._abilities[battle])) {
      ABILITIES._abilities[battle][name] = "";
      CONSOLE.debug("# ability unlocked: [" + name + "] on " + battle);
      ABILITIES.save();
    }

    if(from) {
      ABILITIES.develop(battle, from, name);
    }
  },

  propagate_verdict: function(battle, name, verdict) {
    if (name == ABILITIES.WIN || name == ABILITIES.LOSS) {
      return;
    }
    for (var i in ABILITIES._abilities[battle]) {
      if(ABILITIES._abilities[battle][i] == name){
        ABILITIES._abilities[battle][i] = verdict;
        ABILITIES.save();
        ABILITIES.propagate_verdict(battle, i, verdict);
      }
    }
  },

  develop: function(battle, name, destination) {
    if (!destination){
      destination = "tried";
    }
    ABILITIES.unlock(battle, name);
    if (ABILITIES._abilities[battle][name] != destination) {
      CONSOLE.debug("# ability developed: [" + name + "] on " + battle);
      ABILITIES._abilities[battle][name] = destination;
      ABILITIES.save();
    }

    if (destination == ABILITIES.WIN || destination == ABILITIES.LOSS) {
      ABILITIES.propagate_verdict(battle, name, destination);
    }
  },

  stylize: function(name, battle){
    if (!ABILITIES._abilities[battle] || !ABILITIES._abilities[battle][name]) {
      return name;
    }
    switch (ABILITIES._abilities[battle][name]) {
      case ABILITIES.WIN:
        return "<b>" + name + "</b>";
      case ABILITIES.LOSS:
        return "<s>" + name + "</s>";
      case "":
        return name;
      default:
        return "<i>" + name + "</i>";
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

  _score_destination: function(destination) {
    switch (destination) {
      case "":
        return 1;
      case ABILITIES.WIN:
      case ABILITIES.LOSS:
        return 3;
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
      score += ABILITIES._score_destination(ABILITIES._abilities[battle][i]);
    }
    return score;
  },
};
