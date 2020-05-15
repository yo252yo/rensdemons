// No entry = no ability
// An entry = it leads somewhere
// Entry with DOOM
const ABILITIES = {
  _outcomes: new FluidMap(),
  _targets: new FluidMap(),
  LOSS: "#LOSS",
  WIN: "#WIN",

  save: function() {
    DISK.set("abilities",
     {"outcomes": ABILITIES._outcomes.export(),
     "targets": ABILITIES._targets.export()}
   );
  },

  import: function(save){
    ABILITIES._outcomes = new FluidMap(save.outcomes);
    ABILITIES._targets = new FluidMap(save.targets);
  },

  unlock: function(battle, name, from) {
    var v = ABILITIES._outcomes.get([battle, name]);
    if (!v) {
      ABILITIES._outcomes.set([battle, name], "");
      ABILITIES._targets.set([battle, name], "");
      CONSOLE.log.ability("unlocked: [" + name + "] on " + battle);
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
    for (var i in ABILITIES._outcomes.get([battle])) {
      if(ABILITIES._outcomes.get([battle, i]) == name){
        ABILITIES._outcomes.set([battle, i], verdict);
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
    var v = ABILITIES._outcomes.get([battle, name]);
    if (v != destination) {
      CONSOLE.log.ability("developed: [" + name + "] on " + battle);
      ABILITIES._outcomes.set([battle, name], destination);
      ABILITIES._targets.set([battle, name], destination);
      ABILITIES.save();
    }

    if (destination == ABILITIES.WIN || destination == ABILITIES.LOSS) {
      ABILITIES.propagate_verdict(battle, name, destination);
    }
  },

  stylize: function(name, battle){
    switch (ABILITIES._outcomes.get([battle,name])) {
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
    return (ABILITIES._outcomes.get([battle,name]) != null);
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
    var score = 0;
    for (var i in ABILITIES._outcomes.get([battle])) {
      score += ABILITIES._score_destination(ABILITIES._outcomes.get([battle,i]));
    }
    return score;
  },

  completion: function(battle) {
    var total = Object.keys(ABILITIES._outcomes.get([battle])).length * 3;
    var result = ABILITIES.score_battle(battle) / total;
    return Math.floor(result * 1000) / 10;
  },

  total_xp: function() {
    var score = 0;
    for (var i in ABILITIES._outcomes.get([])) {
      score += ABILITIES.score_battle(i);
    }
    return score;
  },

  // Clearly this needs balance :) but it will do for now.
  level: function() {
    var xp = ABILITIES.total_xp();
    if (xp < 100){
      return 1 + Math.floor(xp / 5);
    }
    return Math.floor(Math.log(xp) * 10) - 26;
  },

  get_all_battles: function(){
    return Object.keys(ABILITIES._outcomes.get([]));
  },

  display_tree: function(battle) {
    var html = "";
    var ancestors = new FluidMap();

    for (var i in ABILITIES._targets.get([battle])){
      var t = ABILITIES._targets.get([battle,i]);
      ancestors.add([t], i);
    }
    var starters = [];
    for (var i in ABILITIES._targets.get([battle])){
      if(!(i in ancestors.get([]))){
        starters.push([i, ""]);
      }
    }

    while(starters.length > 0) {
      var pair = starters.pop();
      var ability = pair[0];
      var prefix = pair[1];
      if (prefix){
        html += prefix + "|- ";
      }
      html += ABILITIES.stylize(ability, battle);

      var target = ABILITIES._targets.get([battle, ability]);
        switch (target){
          case "":
            html += " -> <i>?????</i><br/> ";
            break;
          case ABILITIES.WIN:
            html += " -> <b>WIN</b><br/> ";
            break;
          case ABILITIES.LOSS:
            html += " -> <s>DEATH</s><br/> ";
            break;
          default:
            html += "<br/> "
            starters.push([target, prefix + "&nbsp;&nbsp;"]);
            break;
        }
    }

    new MenuScreen("<b>" + battle + "</b> - " + ABILITIES.completion(battle) + "%<hr/>" + html );
  },

};
