const HIT = {
  result: {
    success: function(index){
      CONSOLE.log.debug("[HIT] success " + index );
      var f = HIT.callback.getf_success(index);
      f();
    },

    loss: function(index){
      CONSOLE.log.debug("[HIT] miss " + index );
      var f = HIT.callback.getf_miss(index);
      f();
    },
  },

  minigame: {
    target: {
      start: function(index, action_object){
        IO.control.hit();
        HIT.minigame.target.end(index);
      },

      end: function(index){
        IO.control.cede();
        var success = Math.random() > 0.5;
        if(success){
          HIT.result.success(index);
        } else {
          HIT.result.loss(index);
        }
      }
    },
  },

  callback: {
    getf_success: function(index) {
      var f = function() {
        // For repeated actions, index can be a substring (i.e. the real action has a lot of trailing spaces).
        var action_object = HIT.battle.getActionObject(index);
        var action = BATTLE.player_actions._make_player_action(action_object);
        BATTLE._last_action = index.trim();
        if (DICTIONARY.has(BATTLE._last_action)){
          BATTLE._last_action = DICTIONARY.get(BATTLE._last_action);
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
      return f;
    },

    getf_miss: function(index) {
      var f = function() {
        BATTLE._last_action = index.trim();
        if (DICTIONARY.has(BATTLE._last_action)){
          BATTLE._last_action = DICTIONARY.get(BATTLE._last_action);
        }
        // If I don't go through timeout, I think the event canceling blocks IO for the banner.
        setTimeout(function(){
          TextBannerSequence.make(["Your attempt failed."], BATTLE.operations.play_monster);
        }, 200);
        return true;
      };
      return f;
    },

    wrap_around: function(index) {
      var action_object = HIT.battle.getActionObject(index);
      var name = action_object.name.trim();
      if(action_object.consume_item){
        return function(){
          //console.log("consume minigame");
          HIT.minigame.target.start(index, action_object);
        }
      } else if (ITEM.isItem(name)){
        return function(){
          //console.log("item minigame");
          HIT.minigame.target.start(index, action_object);
        }
      } else if (ABILITIES_ARCHETYPES[ABILITIES_ARCHETYPES_NAMES.Element].includes(name)){
        return function(){
          //console.log("elem minigame");
          HIT.minigame.target.start(index, action_object);
        }
      } else if (ABILITIES_ARCHETYPES[ABILITIES_ARCHETYPES_NAMES.Spirit].includes(name)){
        return function(){
          //console.log("spirit minigame");
          HIT.minigame.target.start(index, action_object);
        }
      } else if (ABILITIES_ARCHETYPES[ABILITIES_ARCHETYPES_NAMES.Diplomat].includes(name)){
        return function(){
          //console.log("diplo minigame");
          HIT.minigame.target.start(index, action_object);
        }
      }
      return HIT.callback.getf_success(index);
    },
  },

  battle: {
    getActionObject: function(index){
      if (BATTLE._player_actions[index]) {
        return BATTLE._player_actions[index];
      } else {
        // For repeated actions, index can be a substring (i.e. the real action has a lot of trailing spaces).
        var action = undefined;
        for(var i in BATTLE._player_actions){
          if (i.startsWith(index)){
            action = BATTLE._player_actions[i];
          }
        }
        return action;
      }
    },

    getCallback: function(index) {
      var action_object = HIT.battle.getActionObject(index);

      // only execute for standard battles
      if(BATTLE.current_battle.includes("_")){
        return HIT.callback.getf_success(index);
      }
      // only execute for winning and unknown
      if([BATTLETREE.LOSS, BATTLETREE.ESCAPE, BATTLETREE.NOTHING].includes(action_object.outcome)){
        return HIT.callback.getf_success(index);
      }

      // Fast success if we know we'll one shot the guy
      var known_outcome = BATTLETREE.get.outcome(BATTLE.current_battle,  action_object.name);
      if(known_outcome == BATTLETREE.WIN && action_object.outcome == BATTLETREE.WIN){
        return HIT.callback.getf_success(index);
      }

      return HIT.callback.wrap_around(index);
    },
  },
}
