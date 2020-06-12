
const BATTLE = {
  _player_actions: [],
  _monster_actions: [],
  current_battle: "",
  origin_level: undefined,
  win_callback: undefined,
  abilities_before: 0,

  turn_factory: {
    player: function() {
      var options = [];
      for (var i in BATTLE._player_actions) {
        if (! BATTLETREE.check_unlocked(BATTLE.current_battle, i)) {
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
          var menu_entry = BATTLETREE.display.stylize(index, BATTLE.current_battle);
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
      BATTLETREE.declare(BATTLE.current_battle, action_object.name);

      // Unlock base actions in our inventory
      if(ABILITIES.has_ability(action_object.name) || INVENTORY.has_object(action_object.name)){
        BATTLETREE.unlock(BATTLE.current_battle, action_object.name);
      }
    },

    _add_helper: function(action_object, result_enum, result_function) {
      action_object.function = function(){
        BATTLETREE.develop(BATTLE.current_battle, action_object.name, result_enum);
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
        BATTLETREE.LOSS,
        BATTLE.monster_actions.prepare_loss
      );
    },

    add_escape_action: function(action_object) {
      return BATTLE.player_actions._add_helper(
        action_object,
        BATTLETREE.LOSS,
        BATTLE.monster_actions.prepare_escape
      );
    },

    add_winning_action: function(action_object) {
      return BATTLE.player_actions._add_helper(
        action_object,
        BATTLETREE.WIN,
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
      BATTLE.current_battle = "";
    },

    setup: {
      start: function(name, callback) {
        BATTLE.builder.clear();
        IO.control.cede();
        BATTLE.abilities_before = BATTLETREE.score.score_battle(name);
        BATTLE.builder.setup.animation();
        AUDIO.music.battle();
        setTimeout ( function() { BATTLE.builder.setup.end(name, callback); }, 1000);
      },

      animation: function () {
          var pos = LEVELSTATES.get_position(BATTLE.origin_level);
          var html_rectangle = HTML.div.make({left:pos[0], top:pos[1], background: 'obj_dark'});
          html_rectangle.classList.add("expanding_div");
          CURRENTLEVEL.system.html().appendChild(html_rectangle);
          // Destroction of LEVEL children is in end();
      },

      end: function(name, callback) {
        CURRENTLEVEL.system.clear();
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
        var exp_won = BATTLETREE.score.score_battle(BATTLE.current_battle) - BATTLE.abilities_before;
        if(exp_won > 0) {
           var text = "All things considered, you still learned a lot through this encounter (" + ("*".repeat(exp_won)) + ").";
           AUDIO.effect.levelup();
           TextBannerSequence.make([text], function() {BATTLE.builder.teardown.start_teardown(ending);});
        } else {
          BATTLE.builder.teardown.start_teardown(ending);
        }
      },

      start_teardown: function(ending) {
        INTERFACE.color_interface();
        CURRENTLEVEL.system.clear();
        BATTLE.builder.teardown.animation();
        setTimeout (function() {BATTLE.builder.teardown.end(ending);}, 1000);
      },

      animation: function () {
          var pos = LEVELSTATES.get_position(BATTLE.origin_level);
          var html_rectangle = HTML.div.make({left:pos[0], top:pos[1], background: 'obj_dark'});
          html_rectangle.classList.add("collapsing_div");
          CURRENTLEVEL.system.html().appendChild(html_rectangle);
          // Destroction of LEVEL children is in end();
      },

      end: function(ending) {
        ending();
      },

      loss: function() {
        CURRENTLEVEL.setup("gameover");
      },

      escape: function() {
        CURRENTLEVEL.setup(BATTLE.origin_level);
      },

      win: function() {
        CURRENTLEVEL.setup(BATTLE.origin_level);

        if (BATTLE.win_callback){
          setTimeout(BATTLE.win_callback, 200);
        }
      },
    },
  },

  api: {
    reload: function(){
      BATTLE.api.make(BATTLE.current_battle, BATTLE.win_callback, BATTLE.origin_level);
    },

    can_reload: function(){
      return (BATTLE.current_battle != "");
    },

    make: function(name, callback, origin_level) {
      if (!origin_level) { origin_level = CURRENTLEVEL.level_name; }
      LEVELSTATES.register_current();
      BATTLE.origin_level = origin_level;
      BATTLE.builder.setup.start(name, callback);
    },
  },
};
