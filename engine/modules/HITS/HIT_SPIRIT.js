const HIT_SPIRIT = {
  origin: function(){
    return [SCREEN.width() / 2 - 150, SCREEN.height() / 2 - 50];
  },

  start: function(index, action_object) {
    HIT_SPIRIT.index = index;

    var c = HIT_SPIRIT.origin();
    HIT_SPIRIT.result_x = c[0] + Math.floor(Math.random() * 300);
    HIT_SPIRIT.result_y = c[1] - Math.floor(Math.random() * 250);

    HIT_SPIRIT.sprite = new CenteredImage("assets/interface/spirit.png", 'void');
    HIT_SPIRIT.sprite.adjust_depth(100000);
    HIT_SPIRIT.sprite.place_at(HIT_SPIRIT.result_x - 35, HIT_SPIRIT.result_y + 35);
    HIT_SPIRIT.sprite.hide();

    HIT.text_banner.change_text("Find the elusive spark of spirits.", true);

    HIT_SPIRIT.background = new Rectangle(window.scrollX + c[0] - 100, window.scrollY + c[1] + 100, 500, 500, "obj_dark");
    HIT_SPIRIT.background.html_rectangle.style.opacity = 0.8;
    HIT_SPIRIT.background.adjust_depth(1000);

    HIT_SPIRIT.keyboard_x = c[0] + 90;
    HIT_SPIRIT.keyboard_y = c[1] - 90;

    setTimeout(HIT_SPIRIT.show, 400);

    delete HIT_SPIRIT.lock;
    delete HIT_SPIRIT.keyboard_sprite;
  },

  hide: function(){
    if(HIT_SPIRIT.sprite && !HIT_SPIRIT.lock){
      HIT_SPIRIT.sprite.hide();
    }
  },

  show: function(){
    HIT_SPIRIT.sprite.show();

    var timeout = 40 + 1250 * (TRAINER._raw_price(HIT_SPIRIT.index.trim()) || 75) / 7500; // 75 to 7500
    timeout *= (1 + MARTYRDOM.effect(MARTYRDOMS.Vision));
    timeout *= 1 + 1.8 * (0.5 - SETTINGS.get("challenge_level"));
    timeout /= THAUMATURGY.time_compression;

    setTimeout(HIT_SPIRIT.hide, Math.floor(timeout)); // 50 is min, 500 is medium
  },

  raw_click: function(x, y) {
    if(HIT_SPIRIT.lock){
      return;
    }
    HIT_SPIRIT.lock = true;

    HIT_SPIRIT.sprite.show();

    if (!HIT_SPIRIT.keyboard_sprite){ // create the reticle only if needed
      HIT_SPIRIT.keyboard_sprite = new FixedSprite("assets/interface/cross.png", 'player');
      HIT_SPIRIT.keyboard_sprite.adjust_depth(100199);
    }

    var relative_x = x - window.scrollX;
    var relative_y = y - window.scrollY;
    HIT_SPIRIT.keyboard_sprite.place_at(relative_x - 12, relative_y + 12, true);

    var dist = Math.sqrt(Math.pow(relative_x - HIT_SPIRIT.result_x,2) + Math.pow(relative_y - HIT_SPIRIT.result_y,2));
    CONSOLE.log.debug("[HIT] Distance: " + dist);

    if(dist < 30) {
      AUDIO.effect.choice();
      HIT.text_banner.change_text("You channeled spiritual energies.", true);
      setTimeout(function(){
                    HIT.result.success(HIT_SPIRIT.index);
                }, 1000);
    } else {
      AUDIO.effect.interaction();
      HIT.text_banner.destroy();
      setTimeout(function(){
                    HIT.result.loss(HIT_SPIRIT.index);
                }, 1000);
    }
  },

  cleanup: function(){
    if(HIT_SPIRIT.keyboard_sprite){
      HIT_SPIRIT.keyboard_sprite.destroy();
    }
    if(HIT_SPIRIT.sprite){
      HIT_SPIRIT.sprite.destroy();
    }
    if(HIT_SPIRIT.background){
      HIT_SPIRIT.background.destroy();
    }
  },

  raw_keyboard_move: function(dx, dy){
    if(HIT_SPIRIT.lock){
      return;
    }

    var mult = 9;
    HIT_SPIRIT.keyboard_x += dx * mult;
    HIT_SPIRIT.keyboard_y += dy * mult;

    if (!HIT_SPIRIT.keyboard_sprite){ // create the reticle only if needed
      HIT_SPIRIT.keyboard_sprite = new FixedSprite("assets/interface/cross.png", 'player');
      HIT_SPIRIT.keyboard_sprite.adjust_depth(100199);
      CONSOLE.log.debug("now accepting keyboard input");
    }
    HIT_SPIRIT.keyboard_sprite.place_at(HIT_SPIRIT.keyboard_x - 12, HIT_SPIRIT.keyboard_y + 12, true);
  },

  raw_keyboard: function(key, forced){
    if (!KEYS_UTIL.is_ok(key) && !forced) {
      return;
    }
    HIT_SPIRIT.raw_click(HIT_SPIRIT.keyboard_x + window.scrollX, HIT_SPIRIT.keyboard_y + window.scrollY);
  },
}
