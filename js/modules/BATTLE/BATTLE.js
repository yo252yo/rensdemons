
const BATTLE = {
  _player_actions: [],
  _monster_actions: [],
  current_battle: "",
  previous_position: undefined,
  callback: undefined,
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
      new BattleMenu("", options);
    },

    monster: function(text) {
      TextBannerSequence.make([text], BATTLE.turn_factory.player);
    },
  },

  player_actions: {
    add: function(name, f) {
      BATTLE._player_actions[name] = f;
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

    win: function(text) {
      BATTLE.builder.teardown.start(BATTLE.builder.teardown.win);
    },
  },

  builder: {
    clear: function() {
      BATTLE._player_actions = [];
      BATTLE._monster_actions = [];
      BATTLE.callback = undefined;
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
          BATTLE.callback = callback;
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

      win: function() {
        LEVEL.factory.import(BATTLE.previous_position);

        if (BATTLE.callback){
          setTimeout(BATTLE.callback, 200);
        }
      },
    },
  },

  api: {
    reload: function(){
      BATTLE.api.make(BATTLE.current_battle, BATTLE.callback, BATTLE.previous_position);
    },

    can_reload: function(){
      return (BATTLE.current_battle != "");
    },

    make: function(name, callback, previous_position) {
      BATTLE.builder.setup.start(name, callback, previous_position);
    },
  },
};
