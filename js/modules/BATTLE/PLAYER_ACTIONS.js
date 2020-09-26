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
  // todo move
  make_victory_in_n_hits: function(nb_hits, action_name, description) {
    var previous_function = PLAYER_ACTIONS.function.unlock_replacing_action({
      name: action_name+ " ".repeat(nb_hits-1),
      description: [description, "The enemy is dead."],
      outcome: BATTLETREE.WIN,
    });

    for(var i=nb_hits-2; i>0; i--){
        var unlock_function = PLAYER_ACTIONS.function.unlock_replacing_action({
          name: action_name + " ".repeat(i),
          description: [description],
          function: previous_function,
        });
        previous_function = unlock_function;
    }

    PLAYER_ACTIONS.add({
      name: action_name,
      unlock: true,
      description: [description],
      function: previous_function,
    });
  },

  add: function(action_object){
    action = new ActionObject(action_object);
    BATTLE.player_actions.add(action);
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
    DEBUG.battle_log.set([BATTLE.current_battle, ABILITY.Flee], "-");
    PLAYER_ACTIONS.add({
      name: ABILITY.Flee,
      outcome: BATTLETREE.ESCAPE,
      description: [
        LANGUAGE.actions.get(ABILITY.Flee, "useless", "description"),
        LANGUAGE.actions.get(ABILITY.Flee, "useless", "outcome")
      ],
    });
  },

  useless: function(name) {
    DEBUG.battle_log.set([BATTLE.current_battle, name], "-");
    console.log(BATTLE.current_battle);
    PLAYER_ACTIONS.add({
      name: name,
      outcome: BATTLETREE.NOTHING,
      description: [
        LANGUAGE.actions.get(name, "useless", "description"),
        LANGUAGE.actions.get(name, "useless", "outcome")
      ],
    });
  },

  // todo implement nb_hits
  win: function(name, nb_hits, consume) {
    if (!nb_hits) { nb_hits = 1; }

    DEBUG.battle_log.set([BATTLE.current_battle, name], (1/nb_hits).toFixed(2));
    var action_object = {
      name: name,
      outcome: BATTLETREE.WIN,
      description: [
        LANGUAGE.actions.get(name, "win", "description"),
        LANGUAGE.actions.get(name, "win", "outcome")
      ],
    };
    if(consume) {
      action_object.consume_item = name;
    }
    PLAYER_ACTIONS.add(action_object);
  },
}
