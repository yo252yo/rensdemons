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
  _internal: {
    trigger_music: function(name){
      if(PARTYMEMBERS.isPartyMember(name)){
        AUDIO.music.characters[name]();
      }
    },

    repeated_name: function(name, repetitions){
      return name + " ".repeat(repetitions);
    },

    _shorten_if_explored(name, description){
      if(PARTYMEMBERS.isPartyMember(name)){
        return description; // summons always have full text
      }
      if (BATTLETREE.score.is_explored(BATTLE.current_battle, name)){
        return []; // abridging what we already know
      }
      return description;
    },

    win_in_several_hits: function(name, nb_hits, consume_item) {
      var usage_descript = PLAYER_ACTIONS._internal._shorten_if_explored(name, LANGUAGE.actions.usage(name));
      var previous_function = PLAYER_ACTIONS.function.unlock_replacing_action({
        name: PLAYER_ACTIONS._internal.repeated_name(name, nb_hits-1),
        description: usage_descript.concat(LANGUAGE.actions.win(name)),
        outcome: BATTLETREE.WIN,
        consume_item: consume_item,
        function:function(){
          PLAYER_ACTIONS._internal.trigger_music(name);
        }
      });

      var feedback = LANGUAGE.battle.last_hit_feedback();
      for(var i=nb_hits-2; i>0; i--){
        var description = PLAYER_ACTIONS._internal._shorten_if_explored(name,
           LANGUAGE.actions.usage(name).concat(feedback));

        var unlock_function = PLAYER_ACTIONS.function.unlock_replacing_action({
          name: PLAYER_ACTIONS._internal.repeated_name(name, i),
          description: description,
          consume_item: consume_item,
          function: previous_function,
        });
        previous_function = unlock_function;
        feedback = LANGUAGE.battle.several_hit_feedback(); // feedback for everything but the first
      }

      var description = PLAYER_ACTIONS._internal._shorten_if_explored(name,
        LANGUAGE.actions.usage(name).concat(LANGUAGE.battle.several_hit_feedback())
      );
      PLAYER_ACTIONS.add({
        name: name,
    // This is where unlock would go if needed:      unlock: true,
        description: description,
        consume_item: consume_item,
        function: previous_function
      });
    },

    win_in_one_hit: function(name, consume_item, extra_function) {
      var usage_descript = PLAYER_ACTIONS._internal._shorten_if_explored(name, LANGUAGE.actions.usage(name));
      var action_object = {
        name: name,
        outcome: BATTLETREE.WIN,
        description: usage_descript.concat(LANGUAGE.actions.win(name)),
        function:function(){
          PLAYER_ACTIONS._internal.trigger_music(name);
        }
      };
      if(consume_item){
        action_object.consume_item = consume_item;
      }
      if(extra_function){
        action_object.extra_function = extra_function;
      }
      PLAYER_ACTIONS.add(action_object);
    },
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

  escape: function(name) {
    if(!name) {
      name = ABILITY.Escape;
    }
    PLAYER_ACTIONS.add({
      name: name,
      unlock: true,
      // add diversity
      description: LANGUAGE.battle.escape(),
      outcome: BATTLETREE.ESCAPE,
    });
  },

  allow_flight: function(unnamed) {
    if(!unnamed){
      description = LANGUAGE.actions.usage(ABILITY.Escape).concat(
                    LANGUAGE.actions.fail(ABILITY.Escape));
    } else {
      description = RANDOM.pick([
        "You turn away, not doing anything for now.",
        "All things considered, you'd rather not take any chance here.",
        "You make your way back to your path.",
      ]);
    }

    PLAYER_ACTIONS.add({
      name: ABILITY.Escape,
      outcome: BATTLETREE.ESCAPE,
      description: description,
    });
    BATTLETREE.api.develop(BATTLE.current_battle, ABILITY.Escape, BATTLETREE.ESCAPE);
  },

  useless: function(name) {
    PLAYER_ACTIONS.add({
      name: name,
      outcome: BATTLETREE.NOTHING,
      description: LANGUAGE.actions.usage(name).concat(
                   LANGUAGE.actions.fail(name)),
    });
  },

  lose: function(name, description) {
    if (!description){
      description = LANGUAGE.actions.usage(name).concat(LANGUAGE.actions.fail(name));
    }
    PLAYER_ACTIONS.add({
      name: name,
      outcome: BATTLETREE.LOSS,
      description: description,
    });
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
      PLAYER_ACTIONS._internal.win_in_one_hit(name, consume_item);
    } else {
      PLAYER_ACTIONS._internal.win_in_several_hits(name, nb_hits, consume_item);
    }
  },

  mutually_exclusive: function (original_name, descriptions, unlock, outcome) {
    if(!outcome){
      outcome = BATTLETREE.NOTHING;
    }
    var exclusive_chosen = gen.int(descriptions.length);
    for(var i in descriptions){
      var name = PLAYER_ACTIONS._internal.repeated_name(original_name, i);
      var action = {
        name: name,
        outcome: outcome,
        description: descriptions[i],
      };
      if (i == exclusive_chosen) {
        action.unlock = unlock;
        PLAYER_ACTIONS.add(action);
      } else {
        BATTLETREE.api.declare(BATTLE.current_battle, name);
      }
    }
  },

  kill_with_anything_over: function(threshold){
    var prices = TRAINER.get_raw_prices();
    for (var i in prices){
      if(prices[i] >= TRAINER.xp_to_gold_multiplier * threshold) {
        PLAYER_ACTIONS.win(i, 1);
      } else {
        PLAYER_ACTIONS.useless(i);
      }
    }

    var prices = SHOP.get_raw_prices();
    for (var i in prices){
      if(ITEMS_NOT_BATTLE.includes(i)) {
        continue;
      } else if(
        !ARCHETYPES.get_items(ITEMS_ARCHETYPES_NAMES.Alchemy).includes(i) ||
        !ARCHETYPES.get_items(ITEMS_ARCHETYPES_NAMES.Weapon).includes(i) ||
        !ARCHETYPES.get_items(ITEMS_ARCHETYPES_NAMES.Tool).includes(i)
      ) {
        continue;
      } else if(prices[i] >= threshold){
        PLAYER_ACTIONS.win(i, 1);
      } else{
        PLAYER_ACTIONS.useless(i);
      }
    }

    for(var i in PARTYMEMBERS){
      if (typeof PARTYMEMBERS[i] == "function"){
        continue;
      }
      PLAYER_ACTIONS.useless(i);
    }

    var artifacts = ARCHETYPES.get_items(ITEMS_ARCHETYPES_NAMES.Artifact);
    for(var i of artifacts){
      PLAYER_ACTIONS._internal.win_in_one_hit(i, undefined, function(){ AUDIO.music.interface.artifact(); });
    }

    if(threshold < 9999999999999){
      PLAYER_ACTIONS.add({ // Removed by default if there is a winning outcome, see BATTLe.js
        name: ABILITY.Foresight,
        unlock: true,
        description: LANGUAGE.battle.foresight(),
        outcome: BATTLETREE.ESCAPE,
      });
    }

    // New game plus only
    PLAYER_ACTIONS.add_spoiler();
  },

  add_spoiler: function(){
    if(BATTLE.current_battle && STATS.is_post_game() && BESTIARY.is_empathized(BATTLE.current_battle)){
      PLAYER_ACTIONS.add({
        name: ABILITY.Spoiler,
        description: LANGUAGE.battle.spoiler(),
        unlock: true,
        outcome: BATTLETREE.WIN,
        function:function(){
          PLAYER_ACTIONS._internal.trigger_music(PARTYMEMBERS.Ren);
        }
      });
      BATTLETREE.api.develop(BATTLE.current_battle, ABILITY.Spoiler, BATTLETREE.WIN);
    }
  },

  kill_with_any_party_member: function(hits){
    for(var i in PARTYMEMBERS){
      if (typeof PARTYMEMBERS[i] == "function"){
        continue;
      }
      if(i != PARTYMEMBERS.Ren){
        PLAYER_ACTIONS.win(i, hits);
      }
    }
  },

  add_thaumaturgy_actions: function(){
    if(!THAUMATURGY.is_visible()){
      return;
    }

    PLAYER_ACTIONS.add({
      name: "LOSS",
      outcome: BATTLETREE.LOSS,
      unlock: true,
      description: ["You summon a miracle to force the outcome of this battle to be a loss."],
    });

    PLAYER_ACTIONS.add({
      name: "WIN",
      outcome: BATTLETREE.WIN,
      unlock: true,
      description: ["You summon a miracle to force the outcome of this battle to be a win."],
    });

    BATTLETREE.api.develop(BATTLE.current_battle, "WIN", BATTLETREE.WIN);
  }
}
