
const BATTLE = {
  _player_actions: [],
  _monster_actions: [],
  current_battle: "",
  previous_position: undefined,
  win_callback: undefined,
  abilities_before: 0,

  turn_factory: {
    player: function() {
      var options = [];
      for (var i in BATTLE._player_actions) {
        if (! ACTIONS.check_unlocked(BATTLE.current_battle, i)) {
          continue;
        }

        (function(index){
          var f = function() {
            var text = BATTLE._player_actions[index]();
            // If I don't go through timeout, I think the event canceling blocks IO for the banner.
            if (text) {
              setTimeout(function(){
                TextBannerSequence.make(text, BATTLE.operations.play_monster);
              }, 200);
            } else {
              setTimeout( BATTLE.operations.play_monster, 200);
            }
            return true;
          };
          var menu_entry = ACTIONS.display.stylize(index, BATTLE.current_battle);
          options.push({"text": menu_entry, "effect": f});
        })(i);
      }

      // Order the battle menu options.
      var options_winning = [];
      var options_unknown = [];
      var options_others = [];
      for (var i in options){
          var o = options[i];
          if(o.text.startsWith("<b>")){
            options_winning.push(o);
          } else if (o.text.startsWith("<i>") || !(o.text.startsWith("<"))){
            options_unknown.push(o);
          } else {
            options_others.push(o);
          }
      }
      new BattleMenu("", options_winning.concat(options_unknown).concat(options_others));
    },

    monster: function(text) {
      TextBannerSequence.make([text], BATTLE.turn_factory.player);
    },
  },

  player_actions: {
    add: function(action_object) {
      BATTLE._player_actions[action_object.name] = function(){
        action_object.function();
        return action_object.description;
      };
      ACTIONS.declare(BATTLE.current_battle, action_object.name);

      // Unlock base actions in our inventory
      if(ABILITIES.has_ability(action_object.name) || INVENTORY.has_object(action_object.name)){
        ACTIONS.unlock(BATTLE.current_battle, action_object.name);
      }
    },

    _add_helper: function(action_object, result_enum, result_function) {
      action_object.function = function(){
        ACTIONS.develop(BATTLE.current_battle, action_object.name, result_enum);
        result_function(action_object.effect);
        if(action_object.extra_function){
          action_object.extra_function();
        }
      }

      BATTLE.player_actions.add(action_object);
    },

    add_losing_action: function(action_object) {
      return BATTLE.player_actions._add_helper(
        action_object,
        ACTIONS.LOSS,
        BATTLE.monster_actions.prepare_loss
      );
    },

    add_escape_action: function(action_object) {
      return BATTLE.player_actions._add_helper(
        action_object,
        ACTIONS.LOSS,
        BATTLE.monster_actions.prepare_escape
      );
    },

    add_winning_action: function(action_object) {
      return BATTLE.player_actions._add_helper(
        action_object,
        ACTIONS.WIN,
        BATTLE.monster_actions.prepare_win
      );
    },

    remove: function(name) {
      delete BATTLE._player_actions[name];
    },
  },

  monster_actions: {
    add_textual: function(text) {
      BATTLE._monster_actions.push(
       function() { BATTLE.turn_factory.monster(text); }
      );
    },

    make_unique: function (f) {
      BATTLE._monster_actions = [f];
    },

    prepare_loss: function (doom){
      BATTLE.monster_actions.make_unique(
        function() {
          TextBannerSequence.make([doom], BATTLE.operations.lose);
        }
      );
    },

    prepare_escape: function (doom){
      BATTLE.monster_actions.make_unique(
        function() {
          TextBannerSequence.make([doom], BATTLE.operations.escape);
        }
      );
    },

    prepare_win: function (text){
      BATTLE.monster_actions.make_unique(
        function() {
          TextBannerSequence.make([text], BATTLE.operations.win);
        }
      );
    },
  },

  operations: {
    play_monster: function () {
      RANDOM.pick(BATTLE._monster_actions)();
    },

    start: function(text) {
      BATTLE.turn_factory.monster(text);
    },

    lose: function() {
      BATTLE.builder.teardown.start(BATTLE.builder.teardown.loss);
    },

    escape: function() {
      BATTLE.builder.teardown.start(BATTLE.builder.teardown.escape);
    },

    win: function(text) {
      BATTLE.builder.teardown.start(BATTLE.builder.teardown.win);
    },
  },

  builder: {
    clear: function() {
      BATTLE._player_actions = [];
      BATTLE._monster_actions = [];
      BATTLE.win_callback = undefined;
      BATTLE.previous_position = undefined;
      BATTLE.current_battle = "";
    },

    setup: {
      start: function(name, callback, previous_position) {
        BATTLE.builder.clear();
        IO.control.cede();
        BATTLE.abilities_before = ACTIONS.score.score_battle(name);

        if (!previous_position) {
          previous_position = LEVEL.factory.export();
        }

        BATTLE.previous_position = previous_position;
        BATTLE.builder.setup.animation();
        setTimeout ( function() { BATTLE.builder.setup.end(name, callback); }, 1000);
      },

      animation: function () {
          var pos = BATTLE.previous_position.saved_character;
          var html_rectangle = document.createElement('div');
          html_rectangle.style.background =  PALETTE.color('obj_dark').code();
          html_rectangle.style.top = pos[1] + "px";
          html_rectangle.style.left = pos[0] + "px";
          html_rectangle.classList.add("expanding_div");
          LEVEL.html().appendChild(html_rectangle);
          // Destroction of LEVEL children is in end();
      },

      end: function(name, callback) {
        LEVEL.clear();
        PALETTE.color_for_battle();
        BATTLE.current_battle = name;

        if(callback) {
          BATTLE.win_callback = callback;
        }

        new Import("battles/" + name);
        CONSOLE.log.setup("battle " + name);
      },
    },

    teardown: {
      start: function(ending) {
        var exp_won = ACTIONS.score.score_battle(BATTLE.current_battle) - BATTLE.abilities_before;
        if(exp_won > 0) {
           var text = "All things considered, you still learned a lot through this encounter (" + ("*".repeat(exp_won)) + ").";
           TextBannerSequence.make([text], function() {BATTLE.builder.teardown.start_teardown(ending);});
        } else {
          BATTLE.builder.teardown.start_teardown(ending);
        }
      },

      start_teardown: function(ending) {
        PALETTE.color_interface();
        LEVEL.clear();
        BATTLE.builder.teardown.animation();
        setTimeout (function() {BATTLE.builder.teardown.end(ending);}, 1000);
      },

      animation: function () {
          var pos = BATTLE.previous_position.saved_character;
          var html_rectangle = document.createElement('div');
          html_rectangle.style.background =  PALETTE.color('obj_dark').code();
          html_rectangle.style.top = pos[1] + "px";
          html_rectangle.style.left = pos[0] + "px";
          html_rectangle.classList.add("collapsing_div");
          LEVEL.html().appendChild(html_rectangle);
          // Destroction of LEVEL children is in end();
      },

      end: function(ending) {
        ending();
      },

      loss: function() {
        LEVEL.setup("gameover");
      },

      escape: function() {
        LEVEL.factory.import(BATTLE.previous_position);
      },

      win: function() {
        LEVEL.factory.import(BATTLE.previous_position);

        if (BATTLE.win_callback){
          setTimeout(BATTLE.win_callback, 200);
        }
      },
    },
  },

  api: {
    reload: function(){
      BATTLE.api.make(BATTLE.current_battle, BATTLE.win_callback, BATTLE.previous_position);
    },

    can_reload: function(){
      return (BATTLE.current_battle != "");
    },

    make: function(name, callback, previous_position) {
      BATTLE.builder.setup.start(name, callback, previous_position);
    },
  },
};
