const IO_HIT = {

  onClick: function(x,y, is_hold) {
    HIT.raw_click(x, y);
  },

  onContinuousKeyPress: function(pressed_keys) {
    var dx = 0;
    var dy = 0;
    for (var key of pressed_keys) {
      if (KEYS_UTIL.is_up(key)) {
        dy --;
      }
      if (KEYS_UTIL.is_down(key)) {
        dy ++;
      }
      if (KEYS_UTIL.is_left(key)) {
        dx --;
      }
      if (KEYS_UTIL.is_right(key)) {
        dx ++;
      }
    }
    HIT.raw_keyboard_move(dx, dy);
  },

  onPressKey: function(key) {
    if (KEYS_UTIL.is_ok(key)) {
      HIT.raw_keyboard_ok();
    }
  },
}
