// No entry = no ability
// An entry = it leads somewhere
// Entry with DOOM
const BATTLETREE = {
  _outcomes: new FluidMap(),
  _targets: new FluidMap(),
  _unknowns: new FluidMap(),
  LOSS: "#LOSS",
  WIN: "#WIN",
  UNKNOWN: "#UNKNOWN",

  factory: {
    export: function() {
      return {
       "outcomes": BATTLETREE._outcomes.export(),
       "targets": BATTLETREE._targets.export(),
       "unknowns": BATTLETREE._unknowns.export()
     };
    },

    import: function(save){
      BATTLETREE._outcomes = new FluidMap(save.outcomes);
      BATTLETREE._targets = new FluidMap(save.targets);
      BATTLETREE._unknowns = new FluidMap(save.unknowns);
    },
  },

  unlock: function(battle, name, from) {
    BATTLETREE._unknowns.delete([battle, name]);
    var v = BATTLETREE._targets.get([battle, name]);
    if (v == null) {
      BATTLETREE._outcomes.set([battle, name], BATTLETREE.UNKNOWN);
      BATTLETREE._targets.set([battle, name], BATTLETREE.UNKNOWN);
      CONSOLE.log.battletree("unlocked: [" + name + "] on " + battle);
      DISK.write("BATTLETREE");
    }

    if(from) {
      BATTLETREE.develop(battle, from, name);
    }
  },

  declare: function(battle, name) {
    // check inventory and all
    var v = BATTLETREE._outcomes.get([battle, name]);
    if (v == null) {
      if (! BATTLETREE._unknowns.get([battle, name])) {
        CONSOLE.log.battletree("unknown action discovered ([" + name + "])");
        BATTLETREE._unknowns.set([battle, name], true);
        DISK.write("BATTLETREE");
      }
    }
  },

  develop: function(battle, name, destination) {
    if (!destination) {
      destination = "tried";
    }
    BATTLETREE.unlock(battle, name);
    var v = BATTLETREE._targets.get([battle, name]);
    if (v != destination) {
      CONSOLE.log.battletree("developed: [" + name + "] -> [" + destination + "] on " + battle);
      BATTLETREE._outcomes.set([battle, name], destination);
      BATTLETREE._targets.set([battle, name], destination);
      DISK.write("BATTLETREE");
    }

    if (destination == BATTLETREE.WIN || destination == BATTLETREE.LOSS) {
      BATTLETREE.internal._propagate_verdict(battle, name, destination);
    }
  },

  check_unlocked: function(battle, name) {
    return (BATTLETREE._outcomes.get([battle,name]) != null);
  },

  get_all_battles: function(){
    return Object.keys(BATTLETREE._outcomes.get([]));
  },

  internal: {
    _propagate_verdict: function(battle, name, verdict) {
      if (name == BATTLETREE.WIN || name == BATTLETREE.LOSS) {
        return;
      }
      for (var i in BATTLETREE._outcomes.get([battle])) {
        if(BATTLETREE._outcomes.get([battle, i]) == name){
          BATTLETREE._outcomes.set([battle, i], verdict);
          DISK.write("BATTLETREE");
          BATTLETREE.internal._propagate_verdict(battle, i, verdict);
        }
      }
    },

    _get_starters: function(battle) {
      var ancestors = new FluidMap();

      for (var i in BATTLETREE._targets.get([battle])){
        var t = BATTLETREE._targets.get([battle,i]);
        ancestors.add([t], i);
      }
      var starters = [];
      for (var i in BATTLETREE._targets.get([battle])){
        if(!(i in ancestors.get([]))){
          starters.push([i, ""]);
        }
      }
      var extras = Array(BATTLETREE._unknowns.length([battle])).fill(["?????", ""]);
      return starters.concat(extras);
    },
  },

  score: {
    _score_destination: function(destination) {
      switch (destination) {
        case "":
          return 1;
        case BATTLETREE.WIN:
        case BATTLETREE.LOSS:
          return 3;
        default:
          return 2;
      }
    },

    score_battle: function(battle) {
      var score = 0;
      for (var i in BATTLETREE._outcomes.get([battle])) {
        score += BATTLETREE.score._score_destination(BATTLETREE._outcomes.get([battle,i]));
      }
      return score;
    },

    completion: function(battle) {
      var actions = BATTLETREE._outcomes.length([battle]) + BATTLETREE._unknowns.length([battle]);
      var result = BATTLETREE.score.score_battle(battle) / (3*actions);
      return Math.floor(result * 1000) / 10;
    },

    total_xp: function() {
      var score = 0;
      for (var i in BATTLETREE._outcomes.get([])) {
        score += BATTLETREE.score.score_battle(i);
      }
      return score;
    },

    // Clearly this needs balance :) but it will do for now.
    level: function() {
      var xp = BATTLETREE.score.total_xp();
      if (xp < 100){
        return 1 + Math.floor(xp / 5);
      }
      return Math.floor(Math.log(xp) * 10) - 26;
    },
  },

  display: {
    stylize: function(name, battle){
      switch (BATTLETREE._outcomes.get([battle,name])) {
        case BATTLETREE.WIN:
          return "<b>" + name + "</b>";
        case BATTLETREE.LOSS:
          return "<s>" + name + "</s>";
        case BATTLETREE.UNKNOWN:
          return name;
        default: // Leads somewhere else.
          return "<i>" + name + "</i>";
      }
    },

    _display_tree_element: function(html, to_print, battle) {
      var pair = to_print.pop();
      var ability = pair[0];
      var prefix = pair[1];
      if (prefix){
        html[0] += prefix + "|- ";
      }
      html[0] += "> " + BATTLETREE.display.stylize(ability, battle);

      var target = BATTLETREE._targets.get([battle, ability]);
      switch (target){
        case BATTLETREE.UNKNOWN:
          html[0] += " -> ?????<br/> ";
          break;
        case BATTLETREE.WIN:
          html[0] += " -> <b>WIN</b><br/> ";
          break;
        case BATTLETREE.LOSS:
          html[0] += " -> <s>LOSS</s><br/> ";
          break;
        default:
          html[0] += "<br/> "
          if (target){
            to_print.push([target, prefix + "&nbsp;&nbsp;"]);
          }
          break;
      }
    },

    display_tree: function(battle) {
      var html = [""]; // to pass by reference.
      var to_print = BATTLETREE.internal._get_starters(battle);

      while(to_print.length > 0) {
        BATTLETREE.display._display_tree_element(html, to_print, battle);
      }

      new MenuScreen("<b>" + battle + "</b> - " + BATTLETREE.score.completion(battle) + "%<hr/>" + html[0] );
    },
  },

};
