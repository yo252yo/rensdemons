const IO_DODGE = {
  onClick: function(x,y, is_hold) {
    DODGE.io.raw_click(x,y);
  },

  key_target: function(key){
    var target = undefined;
    if (KEYS_UTIL.is_up(key)) {
      return 0.25;
    }
    if (KEYS_UTIL.is_down(key)) {
      return 0.75;
    }
    if (KEYS_UTIL.is_left(key)) {
      return 0.5;
    }
    if (KEYS_UTIL.is_right(key)) {
      return DODGE.defense_angle < 0.5 ? 0 : 1;
    }
    return -1;
  },

  target:function(pressed_keys) {
    var up = 0, down = 0, target = 0, denom = 0;

    for (var key of pressed_keys) {
      if (KEYS_UTIL.is_ok(key)) {
        return;
      }
      if (KEYS_UTIL.is_up(key)) {
        up = true;
      }
      if (KEYS_UTIL.is_down(key)) {
        down = true;
      }
    }

    for (var key of pressed_keys) {
      var t = IO_DODGE.key_target(key);
      if (t >= 0){
        // override the default value of right for double key press
        if (t == 1 && up){
          t = 0;
        } else if (t == 0 && down){
          t = 1;
        }
        target += t;
        denom += 1;
      }
    }
    if (!denom){
      return -1;
    } else {
      return target / denom;
    }
  },

  onContinuousKeyPress: function(pressed_keys) {
    target = IO_DODGE.target(pressed_keys);

    if(target < 0){
      return;
    }

    var diff = target - DODGE.defense_angle;
    if (diff > 0.5) { diff -= 1; }
    if (diff < -0.5) { diff += 1; }

    if(!DODGE.defense_angle || Math.abs(diff) > 0.3){
      DODGE.io.pick_target(target);
    } else {
      DODGE.io.move_target(0.2 * diff);
    }
  },

  onPressKey: function(key) {
    if (KEYS_UTIL.is_ok(key)) {
      DODGE.hasten();
    }
  },
}
