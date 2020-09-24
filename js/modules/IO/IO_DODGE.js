const IO_DODGE = {

  onClick: function(x,y, is_hold) {
    DODGE.io.raw_click(x,y);
  },

  onPressKey: function(key) {
    if (KEYS_UTIL.is_up(key)) {
      DODGE.io.pick_target(0.25);
    }
    if (KEYS_UTIL.is_down(key)) {
      DODGE.io.pick_target(0.75);
    }
    if (KEYS_UTIL.is_left(key)) {
      DODGE.io.pick_target(0.5);
    }
    if (KEYS_UTIL.is_right(key)) {
      DODGE.io.pick_target(0);
    }

  },
}
