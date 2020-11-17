class ActionObject {
  constructor(copy) {
    if(!copy) {copy = {}; }
    // Used in BATTLE
    this.name = copy.name;
    this.description = copy.description;
    this.outcome = copy.outcome;

    if(copy.function){
      this.function = copy.function;
    } else { // default null effect
      this.function = function(){};
    }
    this.unlock = copy.unlock;
    this.replacing = copy.replacing;

    this.consume_item = copy.consume_item;
    this.give_item = copy.give_item;

    this.extra_function = copy.extra_function;
  }
}

const PLAYER_ACTIONS = {
  add: function(action_object){
    action = new ActionObject(action_object);
    BATTLE.player_actions.add(action);
    var log = DEBUG.battle_log.get([BATTLE.current_battle, action_object.name]);
    if(log && log != "?") return;

    if(action_object.outcome == BATTLETREE.ESCAPE || action_object.outcome == BATTLETREE.NOTHING) {
      log = "-";
    } else if (action_object.outcome == BATTLETREE.WIN) {
      log = "1.00";
    } else {
      log = "?";
    }

    if (action_object.consume_item){
      log += "*";
    }
    DEBUG.battle_log.set([BATTLE.current_battle, action_object.name], log);

  },

  function: {
    unlocking_action: function(argument){
      var result = function() {
        PLAYER_ACTIONS.add(argument);
      };
      return result;
    },

    unlock_replacing_action: function(argument){
      var result = function(result_argument) {
        argument.replacing = result_argument;
        PLAYER_ACTIONS.add(argument);
      };
      return result;
    },
  },

  escape: function(name) {
    PLAYER_ACTIONS.add({
      name: name,
      unlock: true,
      // add diversity
      description: LANGUAGE.battle.escape(),
      outcome: BATTLETREE.ESCAPE,
    });
  },

  can_flee: function() {
    PLAYER_ACTIONS.add({
      name: ABILITY.Flee,
      outcome: BATTLETREE.ESCAPE,
      description: [
        LANGUAGE.actions.usage(ABILITY.Flee),
        LANGUAGE.actions.fail(ABILITY.Flee)
      ],
    });
  },

  useless: function(name) {
    PLAYER_ACTIONS.add({
      name: name,
      outcome: BATTLETREE.NOTHING,
      description: [
        LANGUAGE.actions.usage(name),
        LANGUAGE.actions.fail(name)
      ],
    });
  },

  _win_in_several_hits: function(name, nb_hits, consume_item) {
    var previous_function = PLAYER_ACTIONS.function.unlock_replacing_action({
      name: name + " ".repeat(nb_hits-1),
      description: [
        LANGUAGE.actions.usage(name),
        LANGUAGE.actions.win(name)
      ],
      outcome: BATTLETREE.WIN,
      consume_item: consume_item,
    });

    for(var i=nb_hits-2; i>0; i--){
        var unlock_function = PLAYER_ACTIONS.function.unlock_replacing_action({
          name: name + " ".repeat(i),
          description: [LANGUAGE.actions.usage(name)],
          function: previous_function,
        });
        previous_function = unlock_function;
    }

    PLAYER_ACTIONS.add({
      name: name,
// This is where unlock would go if needed:      unlock: true,
      description: [LANGUAGE.actions.usage(name)],
      function: previous_function,
    });
  },

  _win_in_one_hit: function(name, consume_item) {
    var action_object = {
      name: name,
      outcome: BATTLETREE.WIN,
      description: [
        LANGUAGE.actions.usage(name),
        LANGUAGE.actions.win(name)
      ],
      consume_item: consume_item,
    };
    PLAYER_ACTIONS.add(action_object);
  },

  win: function(name, nb_hits, consume) {
    if (!nb_hits) { nb_hits = 1; }
    var log = (1/nb_hits).toFixed(2);
    var consume_item = undefined;
    if (consume){
      log += "*";
      consume_item = name;
    }
    DEBUG.battle_log.set([BATTLE.current_battle, name], log);

    if(nb_hits <= 1){
      PLAYER_ACTIONS._win_in_one_hit(name, consume_item);
    } else {
      PLAYER_ACTIONS._win_in_several_hits(name, nb_hits, consume_item);
    }
  },
}
