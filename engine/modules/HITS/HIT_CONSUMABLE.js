const HIT_CONSUMABLE = {
  start: function(index, action_object) {
    HIT_CONSUMABLE.consume = action_object.consume_item;
    HIT_CONSUMABLE.sprite = new CenteredImage("assets/interface/consumable_aim.png", 'player');
    HIT_CONSUMABLE.sprite.adjust_depth(100000);
    HIT.text_banner.change_text("Chose where to aim. With a bit of luck, you could reuse your " + HIT_CONSUMABLE.consume + "!", true);
    delete HIT_CONSUMABLE.result;
    HIT_CONSUMABLE.index = index;
  },

  center: function(){
    return [SCREEN.width() / 2, SCREEN.height() / 2 - 175];
  },

  raw_click: function(x, y) {
    var c = HIT_CONSUMABLE.center();
    var dx = x - window.scrollX - c[0];
    var dy = c[1] - (y - window.scrollY);
    if(Math.abs(dx) < 30){
      if(dy > 60){
        HIT_CONSUMABLE.hit(1);
      } else if(dy < -60){
        HIT_CONSUMABLE.hit(3);
      }
    }
    if(Math.abs(dy) < 30){
      if(dx > 60){
        HIT_CONSUMABLE.hit(2);
      } else if(dx < -60){
        HIT_CONSUMABLE.hit(4);
      }
    }
  },

  cleanup: function(){
    if(HIT_CONSUMABLE.sprite){
      HIT_CONSUMABLE.sprite.destroy();
    }
    if(HIT_CONSUMABLE.result_sprite){
      HIT_CONSUMABLE.result_sprite.destroy();
    }
    if(HIT_CONSUMABLE.voted_sprite){
      HIT_CONSUMABLE.voted_sprite.destroy();
    }
  },

  raw_keyboard: function(key){
    if (KEYS_UTIL.is_up(key)) {
      HIT_CONSUMABLE.hit(1);
    }
    if (KEYS_UTIL.is_down(key)) {
      HIT_CONSUMABLE.hit(3);
    }
    if (KEYS_UTIL.is_left(key)) {
      HIT_CONSUMABLE.hit(4);
    }
    if (KEYS_UTIL.is_right(key)) {
      HIT_CONSUMABLE.hit(2);
    }
  },

  picture_coordinates: function(direction){
    var c = HIT_CONSUMABLE.center();
    switch(direction){
      case 1:
        return [c[0] - 25, c[1] - 120];
      case 2:
        return [c[0] + 120, c[1] + 25];
      case 3:
        return [c[0] - 25, c[1] + 120];
      case 4:
        return [c[0] - 120, c[1] + 25];
    }
    return c; // should never happen
  },


  hit: function(direction){
    if(HIT_CONSUMABLE.result){
      return;
    }
    HIT_CONSUMABLE.sprite.destroy();
    HIT_CONSUMABLE.result = 1 + Math.floor(Math.random() *4);


    HIT.text_banner.destroy();
    var target_color = 'void';
    if(direction == HIT_CONSUMABLE.result){
      HIT_CONSUMABLE.win();
      target_color = 'player';
    } else {
      HIT_CONSUMABLE.lose();
    }

    var result_P = HIT_CONSUMABLE.picture_coordinates(HIT_CONSUMABLE.result);
    HIT_CONSUMABLE.result_sprite = new FixedSprite("assets/interface/event_purse.png", 'void');
    HIT_CONSUMABLE.result_sprite.adjust_dimensions(50, 50);
    HIT_CONSUMABLE.result_sprite.adjust_depth(100099);
    HIT_CONSUMABLE.result_sprite.place_at(result_P[0], result_P[1]);


    var voted_p = HIT_CONSUMABLE.picture_coordinates(direction);
    HIT_CONSUMABLE.voted_sprite = new FixedSprite("assets/interface/consumable_target.png", target_color);
    HIT_CONSUMABLE.voted_sprite.adjust_dimensions(50, 50);
    HIT_CONSUMABLE.voted_sprite.adjust_depth(100090);
    HIT_CONSUMABLE.voted_sprite.place_at(voted_p[0], voted_p[1]);

  },

  win: function(){
    AUDIO.effect.interaction();
    HIT.text_banner.change_text("You find that you can still use your " + HIT_CONSUMABLE.consume + ".", true);
    INVENTORY.increase(HIT_CONSUMABLE.consume);
    setTimeout(function(){
      HIT.result.success(HIT_CONSUMABLE.index);
    }, 1200);
  },

  lose: function(){
    AUDIO.effect.choice();
    HIT.text_banner.change_text("Your " + HIT_CONSUMABLE.consume + " is beyond reuse.", true);
    setTimeout(function(){
      HIT.result.success(HIT_CONSUMABLE.index);
    }, 1200);
  },
}
