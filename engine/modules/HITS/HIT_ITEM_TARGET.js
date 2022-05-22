const HIT_ITEM_TARGET = {

  amplitude: function(){
    return 150 * (1 - MARTYRDOM.effect(MARTYRDOMS.Foresight));
  },

  center: function(){
    return [SCREEN.width() / 2 - 25, SCREEN.height() / 2 - 100];
  },

  start: function(index, action_object) {
    var ease = SHOP._prices.sell(index.trim()) || 20; // Shittiest is 10, comfy is 500
    var timeout = 1200 + ease * 3000 / 300;
    var challenge = 1 + 0.8 * 2 * (0.5 - SETTINGS.get("challenge_level")); // 2 *() is between -1 and 1 with 0 by default
    challenge += MARTYRDOM.effect(MARTYRDOMS.Reflex);

    HIT_ITEM_TARGET.keyboard_help = false;
    HIT_ITEM_TARGET.untouched = index;

    var amplitude = HIT_ITEM_TARGET.amplitude();
    var c = HIT_ITEM_TARGET.center();

    delete HIT_ITEM_TARGET.target_sprite;
    HIT_ITEM_TARGET.tx = c[0];
    HIT_ITEM_TARGET.ty = c[1];

    HIT_ITEM_TARGET.x = c[0] + 2 * (Math.random() - 0.5) * amplitude;
    HIT_ITEM_TARGET.y = c[1] + 2 * (Math.random() - 0.5) * amplitude;
    var w = 50;

    HIT.text_banner = new TextBanner("Click on your target to hit.", true);

    HIT.draw.resize_existing(w, HIT_ITEM_TARGET.x, HIT_ITEM_TARGET.y);

    HIT_ITEM_TARGET.zone = new Rectangle(window.scrollX + c[0] - amplitude, window.scrollY + c[1] + amplitude, 2*amplitude + 50, 2*amplitude + 50, "obj_dark");
    HIT_ITEM_TARGET.zone.border("void");

    setTimeout(function(){
                  HIT_ITEM_TARGET.end(index);
                }, Math.floor(timeout * challenge));

  },

  end: function(index){
    // Keyboard players get a grace period
    if(HIT_ITEM_TARGET.target_sprite){
      HIT_ITEM_TARGET.raw_keyboard(undefined, true);

      if(HIT_ITEM_TARGET.untouched && !HIT_ITEM_TARGET.keyboard_help){
        HIT_ITEM_TARGET.keyboard_help = true;
        setTimeout(function(){
                      HIT_ITEM_TARGET.end(index);
                    }, 2000);
        return;
      }
    }
    if(HIT_ITEM_TARGET.untouched){
      delete HIT_ITEM_TARGET.untouched;
      AUDIO.effect.dodge_attack();
      HIT.result.loss(index);
    }
  },

  raw_keyboard_move: function(dx, dy){
    if(!HIT_ITEM_TARGET.untouched){
      return;
    }

    var amplitude = HIT_ITEM_TARGET.amplitude();
    var c = HIT_ITEM_TARGET.center();

    var mult = 18;
    HIT_ITEM_TARGET.tx += dx * mult;
    HIT_ITEM_TARGET.ty += dy * mult;
    if (HIT_ITEM_TARGET.tx < c[0] - amplitude){
      HIT_ITEM_TARGET.tx = c[0] - amplitude;
    } else if (HIT_ITEM_TARGET.tx > c[0] + amplitude + 25){
      HIT_ITEM_TARGET.tx = c[0] + amplitude + 25;
    }
    if (HIT_ITEM_TARGET.ty < c[1] - amplitude){
      HIT_ITEM_TARGET.ty = c[1] - amplitude;
    } else if (HIT_ITEM_TARGET.ty > c[1] + amplitude){
      HIT_ITEM_TARGET.ty = c[1] + amplitude;
    }

    if (!HIT_ITEM_TARGET.target_sprite){ // create the reticle only if needed
      HIT_ITEM_TARGET.target_sprite = new FixedSprite("assets/interface/cross.png", 'void');
      HIT_ITEM_TARGET.target_sprite.adjust_depth(100099);
      CONSOLE.log.debug("now accepting keyboard input");
    }
    HIT_ITEM_TARGET.target_sprite.place_at(HIT_ITEM_TARGET.tx - 12, HIT_ITEM_TARGET.ty + 12, true);
  },

  raw_click: function(x, y) {
    var dx = x - window.scrollX - HIT_ITEM_TARGET.x;
    var dy =  HIT_ITEM_TARGET.y - (y - window.scrollY);

    if (dx <= 60 && dy <= 60 && dx >= -10 && dy >= -10){
      HIT.result.success(HIT_ITEM_TARGET.untouched);
      delete HIT_ITEM_TARGET.untouched;
      AUDIO.effect.dodge_attack();
    } else {
      CONSOLE.log.debug("[HIT] MISS" + dx + "/ " + dy);
    }
  },

  raw_keyboard: function(key, forced){
    if (!KEYS_UTIL.is_ok(key) && !forced) {
      return;
    }
    HIT_ITEM_TARGET.raw_click(HIT_ITEM_TARGET.tx + window.scrollX, HIT_ITEM_TARGET.ty + window.scrollY);
  },

  cleanup: function(){
    if(HIT_ITEM_TARGET.target_sprite){
      HIT_ITEM_TARGET.target_sprite.destroy();
    }
    if(HIT_ITEM_TARGET.zone){
      HIT_ITEM_TARGET.zone.destroy();
    }
  }
}
