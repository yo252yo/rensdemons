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
    return [SCREEN.width() / 2 - 1 - 90, SCREEN.height() / 2 - 172 + 90];
  },

  start: function(index, action_object) {
    HIT_DIPLOMACY.index = index;

    HIT_DIPLOMACY.sprite = new CenteredImage("assets/interface/graph.png", 'void');
    HIT_DIPLOMACY.sprite.adjust_depth(100000);
    HIT.text_banner = new TextBanner("What approach are you going to use?", true);

    var c = HIT_DIPLOMACY.origin();
    HIT_DIPLOMACY.background = new Rectangle(window.scrollX + c[0] - 100, window.scrollY + c[1] + 100, 500, 500, "obj_dark");
    HIT_DIPLOMACY.background.html_rectangle.style.opacity = 0.8;
    HIT_DIPLOMACY.background.adjust_depth(1000);

    delete HIT_DIPLOMACY.lock;
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

  compute_result: function(square_x, square_y, hit_size){
    var intersect_x_1 = square_x >= HIT_DIPLOMACY.monster_x && square_x < HIT_DIPLOMACY.monster_x + HIT_DIPLOMACY.monster_w;
    var intersect_x_2 = square_x + hit_size > HIT_DIPLOMACY.monster_x && square_x + hit_size <= HIT_DIPLOMACY.monster_x + HIT_DIPLOMACY.monster_w;
    var intersect_y_1 = square_y >= HIT_DIPLOMACY.monster_y && square_y < HIT_DIPLOMACY.monster_y + HIT_DIPLOMACY.monster_h;
    var intersect_y_2 = square_y + hit_size > HIT_DIPLOMACY.monster_y && square_y + hit_size <= HIT_DIPLOMACY.monster_y + HIT_DIPLOMACY.monster_h;

    if((intersect_x_1 || intersect_x_2) && (intersect_y_1 || intersect_y_2)){
      HIT.text_banner.destroy();
      HIT.text_banner = new TextBanner("You successfully predicted your opponent's personality.", true);
      setTimeout(function(){
                    HIT.result.success(HIT_DIPLOMACY.index);
                }, 1000);
    } else {
      setTimeout(function(){
                    HIT.result.loss(HIT_DIPLOMACY.index);
                }, 1000);
    }
  },
}
