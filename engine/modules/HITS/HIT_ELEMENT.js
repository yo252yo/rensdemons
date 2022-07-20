const HIT_ELEMENT = {
  GRACE_PERIOD: 1,

  center: function(){
    return [SCREEN.width() / 2 - 75, SCREEN.height() / 2 - 125];
  },

  start: function(index, action_object) {
    HIT.text_banner.change_text("Act when the elements coincide.", true);
    HIT_ELEMENT.index = index;
    HIT.draw.resize_existing(1, -100, -100);

    var c = HIT_ELEMENT.center();

    var ability = Math.sqrt((TRAINER._raw_price(HIT_ELEMENT.index.trim()) || 50) / 7500); // 50 to 7500
    var modifier = (ability * 2 * (1-SETTINGS.get("challenge_level")));
    modifier /= THAUMATURGY.time_compression;

    HIT_ELEMENT.baseclock = 100;

    HIT_ELEMENT.period = [];
    HIT_ELEMENT.tick = [];

    var r =  Math.random() < 0.5;
    HIT_ELEMENT.elem = [1, (ability > 0.2)? 1 : 2];

    HIT_ELEMENT.period[0] = Math.ceil(2 + Math.random() * 80 * modifier);
    HIT_ELEMENT.period[1] = Math.ceil(2 + Math.random() * 80 * modifier);
    // syncrhonization
    HIT_ELEMENT.period[1] = Math.round(HIT_ELEMENT.period[0] + (1-ability) * (HIT_ELEMENT.period[1] - HIT_ELEMENT.period[0]));

    HIT_ELEMENT.tick[0] = Math.floor(Math.random() * HIT_ELEMENT.period[0]);
    HIT_ELEMENT.tick[1] = Math.round(HIT_ELEMENT.tick[0] + (1-ability) * (HIT_ELEMENT.period[1]/3)) % HIT_ELEMENT.period[1];

    HIT_ELEMENT.elem_sprites = [[], []];
    HIT_ELEMENT.elem_sprites[0][1] = new FixedSprite("assets/interface/elements_1.png", 'void');
    HIT_ELEMENT.elem_sprites[0][2] = new FixedSprite("assets/interface/elements_2.png", 'void');
    HIT_ELEMENT.elem_sprites[1][1] = new FixedSprite("assets/interface/elements_1.png", 'void');
    HIT_ELEMENT.elem_sprites[1][2] = new FixedSprite("assets/interface/elements_2.png", 'void');

    for(var i in HIT_ELEMENT.elem_sprites){
      for(var j in HIT_ELEMENT.elem_sprites[i]){
        HIT_ELEMENT.elem_sprites[i][j].adjust_depth(100199);
      }
    }

    delete HIT_ELEMENT.lock;
    HIT_ELEMENT.switch0(true);
    HIT_ELEMENT.switch1(true);
  },

  switch_sprite: function(sprite, is_start){
    var c = HIT_ELEMENT.center();
    var current = HIT_ELEMENT.elem[sprite];

    HIT_ELEMENT.tick[sprite] ++;
    if (!is_start){
      if (HIT_ELEMENT.tick[sprite] < HIT_ELEMENT.period[sprite]){
        return;
      }

      HIT_ELEMENT.tick[sprite] = 0;
    }


    if(current == 1){
      HIT_ELEMENT.elem[sprite] = 2;
      HIT_ELEMENT.elem_sprites[sprite][1].place_at(-200,-200);
      HIT_ELEMENT.elem_sprites[sprite][2].place_at(c[0] - 100 + sprite * 200, c[1]);
    } else {
      HIT_ELEMENT.elem[sprite] = 1;
      HIT_ELEMENT.elem_sprites[sprite][1].place_at(c[0] - 100 + sprite * 200, c[1]);
      HIT_ELEMENT.elem_sprites[sprite][2].place_at(-200,-200);
    }
  },

  switch1: function(is_start){
    if(HIT_ELEMENT.lock){
      if(HIT_ELEMENT.elem[0] != HIT_ELEMENT.elem[1]){
        if(HIT_ELEMENT.tick[1] <= HIT_ELEMENT.GRACE_PERIOD){
          HIT_ELEMENT.switch_sprite(0, true);
        } else if (HIT_ELEMENT.period[1] - HIT_ELEMENT.tick[1] <= HIT_ELEMENT.GRACE_PERIOD){
          HIT_ELEMENT.switch_sprite(1, true);
        }
      }
      return;
    }
    HIT_ELEMENT.switch_sprite(1, is_start);
    setTimeout(HIT_ELEMENT.switch1, HIT_ELEMENT.baseclock);
  },

  switch0: function(is_start){
    if(HIT_ELEMENT.lock){
      if(HIT_ELEMENT.elem[0] != HIT_ELEMENT.elem[1]){
        if(HIT_ELEMENT.tick[0] <= HIT_ELEMENT.GRACE_PERIOD){
          HIT_ELEMENT.switch_sprite(1, true);
        } else if (HIT_ELEMENT.period[0] - HIT_ELEMENT.tick[0] <= HIT_ELEMENT.GRACE_PERIOD){
          HIT_ELEMENT.switch_sprite(0, true);
        }
      }
      return;
    }
    HIT_ELEMENT.switch_sprite(0, is_start);
    setTimeout(HIT_ELEMENT.switch0, HIT_ELEMENT.baseclock);
  },

  raw_click: function(x, y) {
    if(HIT_ELEMENT.lock){
      return;
    }
    HIT_ELEMENT.lock = true;
    setTimeout(HIT_ELEMENT.end_click, HIT_ELEMENT.baseclock * 2);
  },

  end_click: function(){
    if(HIT_ELEMENT.elem[0] == HIT_ELEMENT.elem[1]) {
      AUDIO.effect.choice();
      HIT.text_banner.change_text("The elements resonate.", true);
      setTimeout(function(){
                    HIT.result.success(HIT_ELEMENT.index);
                }, 1000);
    } else {
      HIT.text_banner.destroy();
      AUDIO.effect.interaction();
      setTimeout(function(){
                    HIT.result.loss(HIT_ELEMENT.index);
                }, 1000);
    }
  },

  raw_keyboard: function(key, forced){
    if (!KEYS_UTIL.is_ok(key) && !forced) {
      return;
    }
    HIT_ELEMENT.raw_click(1, 1);
  },

  cleanup: function(){
    for(var i in HIT_ELEMENT.elem_sprites){
      for(var j in HIT_ELEMENT.elem_sprites[i]){
        HIT_ELEMENT.elem_sprites[i][j].destroy();
      }
    }
  }
}
