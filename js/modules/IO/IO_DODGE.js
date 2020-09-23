const IO_DODGE = {

  onClick: function(x,y, is_hold) {
    DODGE.raw_click(x,y);
  },

  onPressKey: function(key) {
    if (KEYS_UTIL.is_up(key)) {
      DODGE.pick_target(0.25);
    }
    if (KEYS_UTIL.is_down(key)) {
      DODGE.pick_target(0.75);
    }
    if (KEYS_UTIL.is_left(key)) {
      DODGE.pick_target(0.5);
    }
    if (KEYS_UTIL.is_right(key)) {
      DODGE.pick_target(0);
    }

  },
}
