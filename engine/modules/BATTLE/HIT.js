const HIT = {
  saved_dimensions: {},
  consecutive_losses: 0,

  result: {
    common: function(){
      if(HIT.text_banner){
        HIT.text_banner.destroy();
      }
      if(HIT.current_module.cleanup){
        HIT.current_module.cleanup();
      }

      IO.control.cede();
      HIT.draw.restore_existing();
    },

    success: function(index){
      CONSOLE.log.debug("[HIT] success " + index );

      HIT.result.common();
      HIT.consecutive_losses = 0;

      var f = HIT.callback.getf_success(index);
      f();
    },

    loss: function(index){
      CONSOLE.log.debug("[HIT] miss " + index );

      HIT.result.common();
      HIT.consecutive_losses ++;

      var f = HIT.callback.getf_miss(index);
      f();
    },
  },

  draw: {
    resize_existing: function(size, x, y) {
      var objects = CURRENTLEVEL.objects.get_all_objects();
      HIT.initial_sprites = objects.slice();
      for (var l in objects){
        var object = objects[l];
        HIT.saved_dimensions[object.hash()] = [object.visual_element.width, object.visual_element.height];
        object.place_at(x, y);
        object.visual_element.adjust_dimensions(size, size);
      }
    },

    restore_existing: function() {
      for (var l in HIT.initial_sprites){
        var object = HIT.initial_sprites[l];
        var d = HIT.saved_dimensions[object.hash()];
        if (d){
          object.visual_element.adjust_dimensions(d[0],d[1]);

          object.place_at(SCREEN.width() / 2 - d[0] / 2, Math.max(SCREEN.height() / 2, d[1])); // hardcoded middle of the circle
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
          HIT.start(HIT_CONSUMABLE, index, action_object);
        }
      } else if (ITEMS_ARCHETYPES[ITEMS_ARCHETYPES_NAMES.Weapon].includes(name) || ITEMS_ARCHETYPES[ITEMS_ARCHETYPES_NAMES.Tool].includes(name)){
        return function(){
          HIT.start(HIT_ITEM_TARGET, index, action_object);
        }
      } else if (ABILITIES_ARCHETYPES[ABILITIES_ARCHETYPES_NAMES.Element].includes(name)){
        return function(){
          HIT.start(HIT_ELEMENT, index, action_object);
        }
      } else if (ABILITIES_ARCHETYPES[ABILITIES_ARCHETYPES_NAMES.Spirit].includes(name)){
        return function(){
          HIT.start(HIT_SPIRIT, index, action_object);
        }
      } else if (ABILITIES_ARCHETYPES[ABILITIES_ARCHETYPES_NAMES.Diplomat].includes(name)){
        return function(){
          HIT.start(HIT_DIPLOMACY, index, action_object);
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

      if(HIT.consecutive_losses >= 2){
        HIT.consecutive_losses = 0;
        return HIT.callback.getf_success(index);
      }

      return HIT.callback.wrap_around(index);
    },
  },


  start: function(module, index, action_object){
    HIT.current_module = module;
    module.start(index, action_object);

    IO.control.hit();
  },

  raw_click: function(x,y) {
    if(HIT.current_module.raw_click){
      HIT.current_module.raw_click(x,y);
    }
  },

  raw_keyboard_move: function(dx, dy){
    if(HIT.current_module.raw_keyboard_move){
      HIT.current_module.raw_keyboard_move(dx,dy);
    }
  },

  raw_keyboard_ok: function(dx, dy){
    if(HIT.current_module.raw_keyboard_ok){
      HIT.current_module.raw_keyboard_ok();
    }
  },
}
