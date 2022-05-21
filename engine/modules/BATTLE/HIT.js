const HIT = {
  saved_dimensions: {},

  result: {
    common: function(){
      if(HIT.text_banner){
        HIT.text_banner.destroy();
      }

      IO.control.cede();
      HIT.draw.restore_existing();
    },

    success: function(index){
      CONSOLE.log.debug("[HIT] success " + index );

      HIT.result.common();

      var f = HIT.callback.getf_success(index);
      f();
    },

    loss: function(index){
      CONSOLE.log.debug("[HIT] miss " + index );

      HIT.result.common();

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

  minigame: {
    item_target: {
      start: function(index, action_object) {
        var ease = SHOP._prices.sell(index.trim()) || 20; // Shittiest is 10, comfy is 500
        var timeout = 1000 + ease * 2500 / 500;
        var challenge = 1 + 0.8 * 2 * (0.5 - SETTINGS.get("challenge_level")); // 2 *() is between -1 and 1 with 0 by default

        HIT.minigame.item_target.untouched = index;

        HIT.minigame.item_target.x = SCREEN.width() / 2 - 25     + 2 * (Math.random() - 0.5) * 150;
        HIT.minigame.item_target.y = SCREEN.height() / 2 - 100    + 2 * (Math.random() - 0.5) * 150;
        var w = 50;

        HIT.text_banner = new TextBanner("Click on your target to hit.", true);

        HIT.draw.resize_existing(w, HIT.minigame.item_target.x, HIT.minigame.item_target.y);
        setTimeout(function(){
                      HIT.minigame.item_target.end(index);
                    }, Math.floor(timeout * challenge));

        IO.control.hit();
      },

      end: function(index){
        if(HIT.minigame.item_target.untouched){
          HIT.minigame.item_target.untouched = false;
          HIT.result.loss(index);
        }
      },

      hit: function(x, y) {
        var dx = x - window.scrollX - HIT.minigame.item_target.x;
        var dy =  HIT.minigame.item_target.y - (y - window.scrollY);

        if (dx <= 50 && dy <= 50 && dx >= 0 && dy >= 0){
          HIT.result.success(HIT.minigame.item_target.untouched);
          HIT.minigame.item_target.untouched = false;
        }
      },
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
          HIT.minigame.item_target.start(index, action_object);
        }
      } else if (ITEMS_ARCHETYPES[ITEMS_ARCHETYPES_NAMES.Weapon].includes(name) || ITEMS_ARCHETYPES[ITEMS_ARCHETYPES_NAMES.Tool].includes(name)){
        return function(){
          //console.log("item minigame");
          HIT.minigame.item_target.start(index, action_object);
        }
      } else if (ABILITIES_ARCHETYPES[ABILITIES_ARCHETYPES_NAMES.Element].includes(name)){
        return function(){
          //console.log("elem minigame");
          HIT.minigame.item_target.start(index, action_object);
        }
      } else if (ABILITIES_ARCHETYPES[ABILITIES_ARCHETYPES_NAMES.Spirit].includes(name)){
        return function(){
          //console.log("spirit minigame");
          HIT.minigame.item_target.start(index, action_object);
        }
      } else if (ABILITIES_ARCHETYPES[ABILITIES_ARCHETYPES_NAMES.Diplomat].includes(name)){
        return function(){
          //console.log("diplo minigame");
          HIT.minigame.item_target.start(index, action_object);
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

  raw_click: function(x,y) {
    if(HIT.minigame.item_target.untouched){
      HIT.minigame.item_target.hit(x,y);
    }
  },
}
