
const BATTLE = {
  _player_actions: [],
  _monster_actions: [],
  loot: [],
  current_battle: "",
  origin_level: undefined,
  win_callback: undefined,
  abilities_score_before: 0,

  turn_factory: {
    _is_option_available: function (i){
      if (! BATTLETREE.api.is_unlocked(BATTLE.current_battle, i)) {
        return false;
      }

      var trimmed = i.trim();
      if(ITEM.isItem(trimmed) && !(INVENTORY.count(trimmed)>0)){ // check our stock
        return false;
      }
      // Special items requirements
      if(trimmed == ITEM.Arrow){
        if (!(INVENTORY.count(ITEM.Bow)>0)){
          return false;
        }
      }
      return true;
    },

    player: function() {
      var options = [];
      for (var i in BATTLE._player_actions) {
        if (! BATTLE.turn_factory._is_option_available(i)) {
          continue;
        }
        (function(index){
          var f = function() {
            // For repeated actions, index can be a substring (i.e. the real action has a lot of trailing spaces).
            var action = undefined;
            if (BATTLE._player_actions[index]) {
              action = BATTLE._player_actions[index];
            } else {
              for(var i in BATTLE._player_actions){
                if (i.startsWith(index)){
                  action = BATTLE._player_actions[i];
                }
              }
            }
            var text = action();
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
      var options_started = [];
      var options_losing = [];
      for (var i in options){
          var o = options[i];
          if(o.text.startsWith("<b>")){
            options_winning.push(o);
          } else if (o.text.startsWith("<i>")){
            options_started.push(o);
          } else if (o.text.startsWith("<s>")){
            options_losing.push(o);
          } else {
            options_unknown.push(o);
          }
      }
      RANDOM.shuffle(options_winning);
      RANDOM.shuffle(options_unknown);
      new BattleMenu("", options_winning.concat(options_started).concat(options_unknown).concat(options_losing));
    },

    monster: function(text, dodge_difficulty) {
      var array = text;
      if (!Array.isArray(text)){
        array = [text];
      }

      if (!dodge_difficulty){
        TextBannerSequence.make(array, BATTLE.turn_factory.player);
      } else {
        array.push(LANGUAGE.battle.dodge());
        TextBannerSequence.make(array, DODGE.getCallback(dodge_difficulty));
      }
    },
  },

  player_actions: {
    _make_player_action: function(action_object) {
      /*
        action_object.function = function(){
          BATTLETREE.api.develop(BATTLE.current_battle,
                             action_object.name,
                             action_object._result_enum);
          action_object._result_function(action_object._effect);
        }
      */
      var result = function(){
        action_object.function(action_object.name);
        var description = action_object.description;
        if (typeof action_object.description == "string"){
          description = [action_object.description];
        }

        if (action_object.outcome) {
          var outcome_description = description[description.length - 1];
          BATTLETREE.api.develop(BATTLE.current_battle, action_object.name, action_object.outcome);

          switch (action_object.outcome) {
            case BATTLETREE.WIN:
              description = description.slice(0, description.length-1);
              BATTLE.monster_actions.prepare_win(outcome_description, action_object.extra_function);
              break;
            case BATTLETREE.LOSS:
              description = description.slice(0, description.length-1);
              BATTLE.monster_actions.prepare_loss(outcome_description, action_object.extra_function);
              break;
            case BATTLETREE.ESCAPE:
              description = description.slice(0, description.length-1);
              BATTLE.monster_actions.prepare_escape(outcome_description, action_object.extra_function);
              break;
          }
        } else if(action_object.extra_function) {
          action_object.extra_function();
        }


        if (action_object.outcome == BATTLETREE.NOTHING) {
          BATTLE.player_actions.remove(action_object.name);
          // can we say it goes to nothing ?
        }

        if(action_object.consume_item) {
          INVENTORY.decrease(action_object.consume_item);
        }
        if(action_object.give_item) {
          INVENTORY.increase(action_object.give_item);
        }
        return description;
      };
      return result;
    },

    add: function(action_object) {
      BATTLE._player_actions[action_object.name] = BATTLE.player_actions._make_player_action(action_object);

      if (action_object.replacing) {
        BATTLETREE.api.develop(BATTLE.current_battle, action_object.replacing, action_object.name);
        BATTLETREE.api.unlock(BATTLE.current_battle, action_object.name);
        BATTLE.player_actions.remove(action_object.replacing);
      }

      if (action_object.unlock) {
        BATTLETREE.api.unlock(BATTLE.current_battle, action_object.name);
      } else if (ABILITIES.has_ability(action_object.name) || INVENTORY.count(action_object.name) || PARTY.has_member(action_object.name)){
        // Unlock base actions in our inventory
        BATTLETREE.api.unlock(BATTLE.current_battle, action_object.name);
      }

      BATTLETREE.api.declare(BATTLE.current_battle, action_object.name);
    },

    remove: function(name) {
      delete BATTLE._player_actions[name];
    },
  },

  monster_actions: {
    add_textual: function(text, dodge_difficulty) {
      if (dodge_difficulty) {
        DEBUG.battle_log.add([BATTLE.current_battle, "#ATTACKS"], dodge_difficulty);
      }
      BATTLE._monster_actions.push(
       function() { BATTLE.turn_factory.monster(text, dodge_difficulty); }
      );
    },

    empty: function(){
      BATTLE._monster_actions = [];
    },

    make_unique: function (f) {
      BATTLE._monster_actions = [f];
    },

    prepare_loss: function (doom, extra_function){
      BATTLE.monster_actions.make_unique(
        function() {
          if (extra_function){
            extra_function();
          }
          TextBannerSequence.make([doom], BATTLE.operations.lose);
        }
      );
    },

    prepare_escape: function (doom, extra_function){
      BATTLE.monster_actions.make_unique(
        function() {
          if (extra_function){
            extra_function();
          }
          TextBannerSequence.make([doom], BATTLE.operations.escape);
        }
      );
    },

    prepare_win: function (text, extra_function){
      BATTLE.monster_actions.make_unique(
        function() {
          if (extra_function){
            extra_function();
          }
          TextBannerSequence.make([text], BATTLE.operations.win);
        }
      );
    },
  },

  operations: {
    play_monster: function () {
      if (BATTLE._monster_actions.length > 0){
        RANDOM.pick(BATTLE._monster_actions)();
      } else {
        BATTLE.turn_factory.player();
      }
    },

    start: function(text) {
      BATTLE.turn_factory.monster(text);
    },

    lose: function() {
      BATTLE.loot = [];
      BATTLE.builder.teardown.start(BATTLE.builder.teardown.loss);
    },

    escape: function() {
      BATTLE.loot = [];
      BATTLE.builder.teardown.start(BATTLE.builder.teardown.escape);
    },

    win: function(text) {
      BATTLE.builder.teardown.start(BATTLE.builder.teardown.win);
    },

    add_loot: function (item, weight){
      BATTLE.loot[item] = weight;
    },
  },

  builder: {
    clear: function() {
      BATTLE._player_actions = [];
      BATTLE._monster_actions = [];
      BATTLE.win_callback = undefined;
      BATTLE.current_battle = "";
      BATTLE.loot = [];
    },

    setup: {
      start: function(name, callback) {
        BATTLE.builder.clear();
        IO.control.cede();
        BATTLE.abilities_score_before = BATTLETREE.score.score_battle(name);
        BATTLE.builder.setup.animation();
        AUDIO.music.interface.battle();
        setTimeout ( function() { BATTLE.builder.setup.end(name, callback); }, 1000);
      },

      animation: function () {
          var pos = LEVELSTATES.get_position(BATTLE.origin_level);
          var html_rectangle = HTML.div.make({left:pos[0] - window.scrollX, top:pos[1] - window.scrollY, background: PALETTE.background_color()});
          html_rectangle.classList.add("expanding_div");
          html_rectangle.style.position = "fixed";
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
        if (name.startsWith("objects/")){
          BATTLEOBJECTSMANAGER.setup_battle(name.substring(8));
        } else {
          new Import("battles/" + name);
        }
        CONSOLE.log.setup("battle " + name);
        DODGE.init();
      },
    },

    teardown: {
      start: function(ending) {
        var text = [];
        if(Object.keys(BATTLE.loot).length > 0) {
          var loot = RANDOM.pick_in_weighted_array(BATTLE.loot);
          console.log(loot);
          if (loot){
            if(!loot.startsWith("_")) {
              text.push(LANGUAGE.battle.loot(loot));
            }
            INVENTORY.increase(loot);
          }
        }

        var exp_won = BATTLETREE.score.score_battle(BATTLE.current_battle) - BATTLE.abilities_score_before;
        if(exp_won > 0) {
           INVENTORY.increase(ITEM.XpToken, exp_won);
           text.push(LANGUAGE.battle.xp() + " (" + ("*".repeat(Math.min(10,exp_won))) + ").");
           AUDIO.effect.levelup();
        }

        if (text.length> 0){
           TextBannerSequence.make(text, function() {BATTLE.builder.teardown.start_teardown(ending);});
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
          var html_rectangle = HTML.div.make({left:pos[0] - window.scrollX, top:pos[1] - window.scrollY, background: PALETTE.background_color()});
          html_rectangle.classList.add("collapsing_div");
          html_rectangle.style.position = "fixed";
          CURRENTLEVEL.system.html().appendChild(html_rectangle);
          // Destroction of LEVEL children is in end();
      },

      end: function(ending) {
        ending();
      },

      loss: function() {
        CURRENTLEVEL.setup("gameover&");
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
      if (!callback) { callback = function(){}; }

      LEVELSTATES.register_current();
      BATTLE.origin_level = origin_level;
      BATTLE.builder.setup.start(name, callback);
    },
  },

  get_current_battle: function() {
    return BATTLE.current_battle;
  },
};
