const IO_CHARACTER = {
  onClick: function(x,y, is_hold) {
    CURRENTLEVEL.io.click(x, y, is_hold);
  },

  onContinuousKeyPress: function(pressed_keys) {
    // TODO: better handle diagonals ^^
    for (var i in pressed_keys) {
        var key = pressed_keys[i];
        if (KEYS_UTIL.is_up(key)) {
          CURRENTLEVEL.io.up();
        }
        if (KEYS_UTIL.is_down(key)) {
          CURRENTLEVEL.io.down();
        }
        if (KEYS_UTIL.is_left(key)) {
          CURRENTLEVEL.io.left();
        }
        if (KEYS_UTIL.is_right(key)) {
          CURRENTLEVEL.io.right();
        }
    }
  },

  onPressKey: function(key) {
    if (KEYS_UTIL.is_ok(key)) {
      CURRENTLEVEL.io.interact_in_front();
    }
  },

  is_running: function() {
    return KEYS_UTIL.is_pressed.shift();
  },
}
