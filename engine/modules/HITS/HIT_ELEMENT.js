const HIT_ELEMENT = {
  center: function(){
    return [SCREEN.width() / 2 - 75, SCREEN.height() / 2 - 125];
  },

  start: function(index, action_object) {
    HIT.text_banner.change_text("Act when the elements coincide.", true);
    HIT_ELEMENT.index = index;
    HIT.draw.resize_existing(1, -100, -100);

    var c = HIT_ELEMENT.center();

    var ability = (TRAINER._raw_price(HIT_ELEMENT.index.trim()) || 50) / 7500; // 50 to 7500

    var timer1 = 200 + 1000 * MARTYRDOM.effect(MARTYRDOMS.Movement) + ability * 1000;
    var timer2 = timer1 * (1 + Math.random() * 0.7 * (1.01-ability));

    var r =  Math.random() < 0.5;
    HIT_ELEMENT.elem = [1, 2];
    HIT_ELEMENT.timers = [r?timer1:timer2, r?timer2:timer1];
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
    HIT_ELEMENT.switch0();
    HIT_ELEMENT.switch1();
  },

  switch_sprite: function(sprite){
    var c = HIT_ELEMENT.center();
    var current = HIT_ELEMENT.elem[sprite];

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

  switch1: function(){
    if(HIT_ELEMENT.lock){
      return;
    }
    HIT_ELEMENT.switch_sprite(1);
    setTimeout(HIT_ELEMENT.switch1, HIT_ELEMENT.timers[1]);
  },

  switch0: function(){
    if(HIT_ELEMENT.lock){
      return;
    }
    HIT_ELEMENT.switch_sprite(0);
    setTimeout(HIT_ELEMENT.switch0, HIT_ELEMENT.timers[0]);
  },

  raw_click: function(x, y) {
    if(HIT_ELEMENT.lock){
      return;
    }
    HIT_ELEMENT.lock = true;

    if(HIT_ELEMENT.elem[0] == HIT_ELEMENT.elem[1]) {
      HIT.text_banner.change_text("The elements resonate.", true);
      setTimeout(function(){
                    HIT.result.success(HIT_ELEMENT.index);
                }, 1000);
    } else {
      HIT.text_banner.destroy();
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
