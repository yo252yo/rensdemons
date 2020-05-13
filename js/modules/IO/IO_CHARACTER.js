const IO_CHARACTER = {
  onClick: function(x,y, is_hold) {
    LEVEL.click(x, y, is_hold);
  },

  onContinuousKeyPress: function(pressed_keys) {
      for (var key in pressed_keys) {
          if (KEYS_UTIL.is_up(key)) {
            LEVEL.up();
          }
          if (KEYS_UTIL.is_down(key)) {
            LEVEL.down();
          }
          if (KEYS_UTIL.is_left(key)) {
            LEVEL.left();
          }
          if (KEYS_UTIL.is_right(key)) {
            LEVEL.right();
          }
          if (KEYS_UTIL.is_ok(key)) {
            LEVEL.interact_in_front();
          }
      }
  },

  is_running: function() {
    return KEYS_UTIL.is_pressed.shift();
  },
}
