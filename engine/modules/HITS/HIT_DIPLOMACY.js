const HIT_DIPLOMACY = {
  init: function(){
    // roll stats for battle
    var w = 1 + Math.round(Math.random() * 5); // 1 to 6
    var h = (7 - w); // 1 to 6

    HIT_DIPLOMACY.monster_x = Math.round((6 - w) * Math.random()) * 30;
    HIT_DIPLOMACY.monster_y = Math.round((6 - h) * Math.random()) * 30;
    HIT_DIPLOMACY.monster_w = 30 * w;
    HIT_DIPLOMACY.monster_h = 30 * h;
  },

  origin: function(){
    return [SCREEN.width() / 2 - 90, SCREEN.height() / 2 - 172 + 90];
  },

  start: function(index, action_object) {
    HIT_DIPLOMACY.index = index;

    HIT_DIPLOMACY.sprite = new CenteredImage("assets/interface/graph.png", 'void');
    HIT_DIPLOMACY.sprite.adjust_depth(100000);
    HIT.text_banner.change_text("What approach are you going to use?", true);

    var c = HIT_DIPLOMACY.origin();
    HIT_DIPLOMACY.background = new Rectangle(window.scrollX + c[0] - 2000, window.scrollY + c[1] + 2000, 5000, 5000, "obj_dark");
    HIT_DIPLOMACY.background.html_rectangle.style.opacity = 0.8;
    HIT_DIPLOMACY.background.adjust_depth(1000);

    HIT_DIPLOMACY.keyboard_x = c[0] + 90;
    HIT_DIPLOMACY.keyboard_y = c[1] - 90;

    delete HIT_DIPLOMACY.lock;
    delete HIT_DIPLOMACY.keyboard_sprite;
  },

  cleanup: function(){
    if(HIT_DIPLOMACY.sprite){
      HIT_DIPLOMACY.sprite.destroy();
    }
    if(HIT_DIPLOMACY.background){
      HIT_DIPLOMACY.background.destroy();
    }
    if(HIT_DIPLOMACY.user_rect){
      HIT_DIPLOMACY.user_rect.destroy();
    }
    if(HIT_DIPLOMACY.monster_rect){
      HIT_DIPLOMACY.monster_rect.destroy();
    }
    if(HIT_DIPLOMACY.keyboard_sprite){
      HIT_DIPLOMACY.keyboard_sprite.destroy();
    }
  },

  raw_click: function(x, y) {
    /// Click conversion
    var relative_x = x - window.scrollX;
    var relative_y = y - window.scrollY;

    var c = HIT_DIPLOMACY.origin();
    var coord_x = relative_x - c[0];
    var coord_y = -1 * (relative_y - c[1]);
    // (0,0) is bot left, and then we're increasing

    if (coord_x > 200 || coord_y > 200 || coord_x < -30 || coord_y < -30){
      return;
    }

    HIT_DIPLOMACY.hit(coord_x, coord_y);
  },

  hit: function(coord_x, coord_y){
    if(HIT_DIPLOMACY.lock){
      return;
    }
    HIT_DIPLOMACY.lock = true;

    // Default value
    var raw_square_x = Math.floor(coord_x / 30) * 30;
    var raw_square_y = Math.floor(coord_y / 30) * 30;
    var hit_size = 30;

    // Tweak with ability and martyrdom
    var ease = TRAINER._raw_price(HIT_DIPLOMACY.index.trim()) || 20;
    ease *= (1 + 2 * MARTYRDOM.effect(MARTYRDOMS.Foresight));
    if (ease > 100){
      hit_size += 30;
      raw_square_x -= 30;
      raw_square_y -= 30;
    }
    if (ease > 400){
      hit_size += 30;
    }
    if (ease > 1000){
      hit_size += 30;
    }

    // Final computation
    var square_x = Math.min(180 - hit_size, Math.max(0, raw_square_x));
    var square_y = Math.min(180 - hit_size, Math.max(0, raw_square_y));

    HIT_DIPLOMACY.draw_result(square_x, square_y, hit_size);
    HIT_DIPLOMACY.compute_result(square_x, square_y, hit_size);
  },

  draw_result: function(square_x, square_y, hit_size){
    var c = HIT_DIPLOMACY.origin();

    HIT_DIPLOMACY.user_rect = new Rectangle(window.scrollX + c[0] + square_x, window.scrollY + c[1] - square_y, hit_size, hit_size, "void");
    HIT_DIPLOMACY.user_rect.html_rectangle.style.opacity = 0.6;
    HIT_DIPLOMACY.user_rect.adjust_depth(100090);

    HIT_DIPLOMACY.monster_rect = new Rectangle(window.scrollX + c[0] + HIT_DIPLOMACY.monster_x, window.scrollY + c[1] - HIT_DIPLOMACY.monster_y, HIT_DIPLOMACY.monster_w, HIT_DIPLOMACY.monster_h, "background");
    HIT_DIPLOMACY.monster_rect.html_rectangle.style.opacity = 0.6;
    HIT_DIPLOMACY.monster_rect.adjust_depth(100089);
  },

  rect_intersect: function(x0, y0, w0, h0, x1, y1, w1, h1){
    var int_x0_in_1 = x0 >= x1 && x0 < x1 + w1;
    var int_x0w_in_1 = x0 + w0 > x1 && x0 + w0 <= x1 + w1;
    var int_x_1_included = x0 <= x1 && x1 + w1 <= x0 + w0;

    var int_y0_in_1 = y0 >= y1 && y0 < y1 + h1;
    var int_y0h_in_1 = y0 + h0 > y1 && y0 + h0 <= y1 + h1;
    var int_y_1_included = y0 <= y1 && y1 + h1 <= y0 + h0;

    return (int_x0_in_1 || int_x0w_in_1 || int_x_1_included)
          && (int_y0_in_1 || int_y0h_in_1 || int_y_1_included);
  },

  compute_result: function(square_x, square_y, hit_size){
    var intersect = HIT_DIPLOMACY.rect_intersect(
      square_x, square_y,
      hit_size, hit_size,
      HIT_DIPLOMACY.monster_x, HIT_DIPLOMACY.monster_y,
      HIT_DIPLOMACY.monster_w, HIT_DIPLOMACY.monster_h
    );

    if(intersect){
      AUDIO.effect.choice();
      HIT.text_banner.change_text("You successfully predicted your opponent's personality.", true);
      setTimeout(function(){
                    HIT.result.success(HIT_DIPLOMACY.index);
                }, 1000);
    } else {
      AUDIO.effect.interaction();
      HIT.text_banner.destroy();
      setTimeout(function(){
                    HIT.result.loss(HIT_DIPLOMACY.index);
                }, 1000);
    }
  },


  raw_keyboard_move: function(dx, dy){
    if(HIT_DIPLOMACY.lock){
      return;
    }

    var c = HIT_DIPLOMACY.origin();

    var mult = 9;
    HIT_DIPLOMACY.keyboard_x += dx * mult;
    HIT_DIPLOMACY.keyboard_y += dy * mult;
    if (HIT_DIPLOMACY.keyboard_x < c[0]){
      HIT_DIPLOMACY.keyboard_x = c[0];
    } else if (HIT_DIPLOMACY.keyboard_x > c[0] + 180){
      HIT_DIPLOMACY.keyboard_x = c[0] + 180;
    }
    if (HIT_DIPLOMACY.keyboard_y < c[1 - 180]){
      HIT_DIPLOMACY.keyboard_y = c[1] - 180;
    } else if (HIT_DIPLOMACY.keyboard_y > c[1]){
      HIT_DIPLOMACY.keyboard_y = c[1];
    }

    if (!HIT_DIPLOMACY.keyboard_sprite){ // create the reticle only if needed
      HIT_DIPLOMACY.keyboard_sprite = new FixedSprite("assets/interface/cross.png", 'void');
      HIT_DIPLOMACY.keyboard_sprite.adjust_depth(100199);
      CONSOLE.log.debug("now accepting keyboard input");
    }
    HIT_DIPLOMACY.keyboard_sprite.place_at(HIT_DIPLOMACY.keyboard_x - 12, HIT_DIPLOMACY.keyboard_y + 12, true);
  },

  raw_keyboard: function(key, forced){
    if (!KEYS_UTIL.is_ok(key) && !forced) {
      return;
    }
    HIT_DIPLOMACY.raw_click(HIT_DIPLOMACY.keyboard_x + window.scrollX, HIT_DIPLOMACY.keyboard_y + window.scrollY);
  },
}
