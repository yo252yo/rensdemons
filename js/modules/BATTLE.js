
const BATTLE = {
  player_actions: [],
  monster_actions: [],
  current_battle: "",
  previous_position: undefined,
  callback: undefined,

  turn_factory: {
    player: function() {
      var options = [];
      for (var i in BATTLE.player_actions){
        (function(index){
          var f = function() {
            var text = BATTLE.player_actions[index]();
            // If I don't go through timeout, I think the event canceling blocks IO for the banner.
            if (text) {
              setTimeout(function(){
                TextBannerSequence.make(text, BATTLE.actions.play_monster);
              }, 200);
            } else {
              setTimeout( BATTLE.actions.play_monster, 200);
            }
            return true;
          };

          options.push({"text": index, "effect": f});
        })(i);

      }
      new BattleMenu("", options);
    },

    monster: function(text) {
      TextBannerSequence.make([text], BATTLE.turn_factory.player);
    },
  },

  actions: {
    play_monster: function () {
      RANDOM.pick(BATTLE.monster_actions)();
    },

    prepare_doom: function (doom){
      BATTLE.monster_actions = [
        function() {
          TextBannerSequence.make([doom], BATTLE.actions.lose);
        }
      ];
    },

    prepare_win: function (text){
      BATTLE.monster_actions = [
        function() {
          TextBannerSequence.make([text], BATTLE.actions.win);
        }
      ];
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
      BATTLE.player_actions = [];
      BATTLE.monster_actions = [];
      BATTLE.callback = undefined;
      BATTLE.previous_position = undefined;
      BATTLE.current_battle = "";
    },

    setup: {
      start: function(name, callback, previous_position) {
        BATTLE.builder.clear();
        IO.control.cede();

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
        CONSOLE.sys_log("- Loaded battle " + name);
      },
    },

    teardown: {
      start: function(ending) {
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
