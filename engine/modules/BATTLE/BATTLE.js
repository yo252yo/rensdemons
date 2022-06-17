
const BATTLE = {
  _player_actions: [],
  _monster_actions: [],
  loot: [],
  current_battle: "",
  origin_level: undefined,
  win_callback: undefined,
  _last_action: undefined,
  abilities_score_before: {},

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
      if(ABILITY.isLearnableAbility(trimmed) && !(ABILITIES.has_ability(trimmed))){
        return false;
      }
      if(PARTYMEMBERS.isPartyMember(trimmed) && !(PARTY.has_member(trimmed))){
        return false;
      }

      return true;
    },

    _order_player_actions: function(options){
      var options_pursue = [];
      var options_winning = [];
      var options_unknown = [];
      var options_started = [];
      var options_losing = [];
      var options_flight = [];

      for (var i in options){
          var o = options[i];
          if(ABILITIES.is_special_flight_option(o.text)){
            options_flight.push(o);
          } else if(o.text.startsWith(BATTLE._last_action) || o.text.startsWith("<b>" + BATTLE._last_action)){
            o.text = ">>" + o.text;
            options_pursue.push(o);
          } else if(o.text.startsWith("<b>")){
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

      // Only keep 3 losing unknown actions for standard battles
      if(!BATTLE.current_battle.includes("_")){
        var useless_options_unknown = 0;
        var winning_options_unknown = 0;
        for (var i = options_unknown.length - 1; i >=0; i--){
          var b = BATTLE._player_actions[options_unknown[i].text];
          if(!b){ // text has been modified by dictionary
            b = BATTLE._player_actions[options_unknown[i].index];
          }
          if (b && b.outcome && b.outcome == BATTLETREE.LOSS || b.outcome == BATTLETREE.NOTHING){
            useless_options_unknown ++;
//            if (useless_options_unknown > 3){
  //            options_unknown.splice(i, 1);
    //        }
          } else {
            // outcome null is most often win in several hits
            winning_options_unknown ++;
          }
        }
      }

      // remove meta blurb if you can win
      if(winning_options_unknown + options_pursue.length + options_winning.length > 0 || !PARTY.has_member(PARTYMEMBERS.BestFriend)){
        options_flight = options_flight.filter(function(e){
            return e.index != ABILITY.Foresight;
        });
      }

      var result = options_pursue;

      if (SETTINGS.get('battleorder') == "explore"){
        result = result.concat(options_started).concat(options_unknown).concat(options_winning);
      } else {
        result = result.concat(options_winning).concat(options_started).concat(options_unknown);
      }
      if (options.length <= 7 && !BATTLE.current_battle.startsWith(BATTLEOBJECTSMANAGER.prefix)) {
        result = result.concat(options_losing);
      }
      return result.concat(options_flight);
    },

    player: function() {
      var options = [];
      for (var i in BATTLE._player_actions) {
        if (! BATTLE.turn_factory._is_option_available(i)) {
          continue;
        }
        (function(index){
          var f = HIT.battle.getCallback(index);
          var menu_entry = BATTLETREE.display.stylize(index, BATTLE.current_battle);
          options.push({"index": index, "text": menu_entry, "effect": f});
        })(i);
      }

      new BattleMenu("", BATTLE.turn_factory._order_player_actions(options));
    },

    monster: function(text, dodge_difficulty, extra_function) {
      if (extra_function){
        extra_function();
      }

      var array = text;
      if (!Array.isArray(text)){
        array = [text];
      }

      if (!dodge_difficulty){
        TextBannerSequence.make(array, BATTLE.turn_factory.player);
      } else {
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
            case BATTLETREE.NOTHING:
              if(action_object.extra_function) {
                action_object.extra_function();
              }
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
      BATTLE._player_actions[action_object.name] = action_object;//BATTLE.player_actions._make_player_action(action_object);


      if(THAUMATURGY.battleforesight){
        if(action_object.outcome){
          BATTLETREE.api.develop(BATTLE.current_battle, action_object.name, action_object.outcome, true);
        } else {
          BATTLETREE.api.develop(BATTLE.current_battle, action_object.name, BATTLETREE.NOT_TRIED, true);
        }
      }

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

    empty: function(escape){
      BATTLE._player_actions = [];
      if(escape){
        PLAYER_ACTIONS.escape();
      }
    },

    remove: function(name) {
      delete BATTLE._player_actions[name];
    },
  },

  monster_actions: {
    add_textual: function(text, dodge_difficulty, extra_function) {
      if (dodge_difficulty) {
        DEBUG.battle_log.add([BATTLE.current_battle, "#ATTACKS"], dodge_difficulty);
      }
      BATTLE._monster_actions.push(
       function() { BATTLE.turn_factory.monster(text, dodge_difficulty, extra_function); }
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

  win: function(){
    BATTLE.monster_actions.prepare_win("OVERRIDING WIN");
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
      BATTLE._last_action = undefined;
    },

    setup: {
      start: function(name, callback) {
        LEDGER.commit_to_stats();
        BATTLE.builder.clear();
        IO.control.cede();
        BATTLE.abilities_score_before = BATTLETREE.score.score_battle(name);
        if(!INVENTORY.getEncounterCount(name)){
          BATTLE.abilities_score_before.xp = 0;
        }
        INVENTORY.countEncounter(name);
        BATTLE.builder.setup.animation();
        AUDIO.music.interface.battle();
        setTimeout ( function() { BATTLE.builder.setup.end(name, callback); }, 1000);
      },

      animation: function () {
          var pos = LEVELSTATES.get_position(BATTLE.origin_level) || CURRENTLEVEL._recover_position || (CHARACTER.character?[CHARACTER.character.x, CHARACTER.character.y] : [undefined, undefined]);
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
        if (name.startsWith(BATTLEOBJECTSMANAGER.prefix)){
          BATTLEOBJECTSMANAGER.setup_battle(name.substring(BATTLEOBJECTSMANAGER.prefix.length));
        } else {
          new Import("battles/" + name);
        }
        CONSOLE.log.setup("battle " + name);
        DODGE.init();
        HIT.init();

        PLAYER_ACTIONS.add_thaumaturgy_actions();
        STATS.record.battle();
      },
    },

    teardown: {
      start: function(ending) {
        var text = [];
        if(Object.keys(BATTLE.loot).length > 0) {
          var loot = RANDOM.pick_in_weighted_array(BATTLE.loot);
          if(!loot && INVENTORY.count("_looted_items") < 5) {
            // bonus at the beginning ^^
            loot = RANDOM.pick_in_weighted_array(BATTLE.loot);
          }
          if (loot){
            if(!loot.startsWith("_")) {
              text.push(LANGUAGE.battle.loot(loot));
            }
            INVENTORY.increase(loot);
            INVENTORY.increase("_looted_items");
          }
        }

        var after = BATTLETREE.score.score_battle(BATTLE.current_battle);
        var exp_won = after.xp - BATTLE.abilities_score_before.xp;
        if(exp_won > 0) {
           INVENTORY.increase(ITEM.XpToken, exp_won);
           text.push(LANGUAGE.battle.xp(BATTLE.abilities_score_before, after));
           AUDIO.effect.levelup();

          // This refreshes the STAT entry
           var xp = BATTLETREE.score.total_xp();
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
          var pos = LEVELSTATES.get_position(BATTLE.origin_level) || CURRENTLEVEL._recover_position || (CHARACTER.character?[CHARACTER.character.x, CHARACTER.character.y] : [undefined, undefined])
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
        CURRENTLEVEL.setup("gameover$", true);
      },

      escape: function() {
        CURRENTLEVEL.setup(BATTLE.origin_level, true);
        BATTLE.builder.clear();
      },

      win: function() {
        CURRENTLEVEL.setup(BATTLE.origin_level, true);

        if (BATTLE.win_callback){
          setTimeout(BATTLE.win_callback, 90);
        }
        BATTLE.builder.clear();
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
      GLITCH.berkeley.stop();
    },
  },

  get_current_battle: function() {
    return BATTLE.current_battle;
  },
};
