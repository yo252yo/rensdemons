// No entry = no ability
// An entry = it leads somewhere
// Entry with DOOM
const ACTIONS = {
  _outcomes: new FluidMap(),
  _targets: new FluidMap(),
  _unknowns: new FluidMap(),
  LOSS: "#LOSS",
  WIN: "#WIN",

  factory: {
    save: function() {
      DISK.set("actions", {
       "outcomes": ACTIONS._outcomes.export(),
       "targets": ACTIONS._targets.export(),
       "unknowns": ACTIONS._unknowns.export()
     });
    },

    import: function(save){
      ACTIONS._outcomes = new FluidMap(save.outcomes);
      ACTIONS._targets = new FluidMap(save.targets);
      ACTIONS._unknowns = new FluidMap(save.unknowns);
    },
  },

  unlock: function(battle, name, from) {
    ACTIONS._unknowns.delete([battle, name]);
    var v = ACTIONS._outcomes.get([battle, name]);
    if (!v) {
      ACTIONS._outcomes.set([battle, name], "");
      ACTIONS._targets.set([battle, name], "");
      CONSOLE.log.action("unlocked: [" + name + "] on " + battle);
      ACTIONS.factory.save();
    }

    if(from) {
      ACTIONS.develop(battle, from, name);
    }
  },

  add_unknown: function(battle, name) {
    // check inventory and all
    var v = ACTIONS._outcomes.get([battle, name]);
    if (!v) {
      if (! ACTIONS._unknowns.get([battle, name])) {
        CONSOLE.log.action("unknown action discovered");
        ACTIONS._unknowns.set([battle, name], true);
        ACTIONS.factory.save();
      }
    }
  },

  develop: function(battle, name, destination) {
    if (!destination) {
      destination = "tried";
    }
    ACTIONS.unlock(battle, name);
    var v = ACTIONS._outcomes.get([battle, name]);
    if (v != destination) {
      CONSOLE.log.action("developed: [" + name + "] on " + battle);
      ACTIONS._outcomes.set([battle, name], destination);
      ACTIONS._targets.set([battle, name], destination);
      ACTIONS.factory.save();
    }

    if (destination == ACTIONS.WIN || destination == ACTIONS.LOSS) {
      ACTIONS.internal._propagate_verdict(battle, name, destination);
    }
  },

  check_unlocked: function(battle, name) {
    return (ACTIONS._outcomes.get([battle,name]) != null);
  },

  get_all_battles: function(){
    return Object.keys(ACTIONS._outcomes.get([]));
  },

  internal: {
    _propagate_verdict: function(battle, name, verdict) {
      if (name == ACTIONS.WIN || name == ACTIONS.LOSS) {
        return;
      }
      for (var i in ACTIONS._outcomes.get([battle])) {
        if(ACTIONS._outcomes.get([battle, i]) == name){
          ACTIONS._outcomes.set([battle, i], verdict);
          ACTIONS.factory.save();
          ACTIONS.internal._propagate_verdict(battle, i, verdict);
        }
      }
    },

    _get_starters: function(battle) {
      var ancestors = new FluidMap();

      for (var i in ACTIONS._targets.get([battle])){
        var t = ACTIONS._targets.get([battle,i]);
        ancestors.add([t], i);
      }
      var starters = [];
      for (var i in ACTIONS._targets.get([battle])){
        if(!(i in ancestors.get([]))){
          starters.push([i, ""]);
        }
      }
      var extras = Array(ACTIONS._unknowns.length([battle])).fill(["?????", ""]);
      return starters.concat(extras);
    },
  },

  score: {
    _score_destination: function(destination) {
      switch (destination) {
        case "":
          return 1;
        case ACTIONS.WIN:
        case ACTIONS.LOSS:
          return 3;
        default:
          return 2;
      }
    },

    score_battle: function(battle) {
      var score = 0;
      for (var i in ACTIONS._outcomes.get([battle])) {
        score += ACTIONS.score._score_destination(ACTIONS._outcomes.get([battle,i]));
      }
      return score;
    },

    completion: function(battle) {
      var actions = ACTIONS._outcomes.length([battle]) + ACTIONS._unknowns.length([battle]);
      var result = ACTIONS.score.score_battle(battle) / (3*actions);
      return Math.floor(result * 1000) / 10;
    },

    total_xp: function() {
      var score = 0;
      for (var i in ACTIONS._outcomes.get([])) {
        score += ACTIONS.score.score_battle(i);
      }
      return score;
    },

    // Clearly this needs balance :) but it will do for now.
    level: function() {
      var xp = ACTIONS.score.total_xp();
      if (xp < 100){
        return 1 + Math.floor(xp / 5);
      }
      return Math.floor(Math.log(xp) * 10) - 26;
    },
  },

  display: {
    stylize: function(name, battle){
      switch (ACTIONS._outcomes.get([battle,name])) {
        case ACTIONS.WIN:
          return "<b>" + name + "</b>";
        case ACTIONS.LOSS:
          return "<s>" + name + "</s>";
        case "":
          return name;
        default:
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
      html[0] += "> " + ACTIONS.display.stylize(ability, battle);

      var target = ACTIONS._targets.get([battle, ability]);
      switch (target){
        case "":
          html[0] += " -> <i>?????</i><br/> ";
          break;
        case ACTIONS.WIN:
          html[0] += " -> <b>WIN</b><br/> ";
          break;
        case ACTIONS.LOSS:
          html[0] += " -> <s>DEATH</s><br/> ";
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
      var to_print = ACTIONS.internal._get_starters(battle);

      while(to_print.length > 0) {
        ACTIONS.display._display_tree_element(html, to_print, battle);
      }

      new MenuScreen("<b>" + battle + "</b> - " + ACTIONS.score.completion(battle) + "%<hr/>" + html[0] );
    },
  },

};
