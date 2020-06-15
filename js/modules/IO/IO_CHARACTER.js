const IO_CHARACTER = {
  onClick: function(x,y, is_hold) {
    CURRENTLEVEL.io.click(x, y, is_hold);
  },

  onContinuousKeyPress: function(pressed_keys) {
    var c = CHARACTER.get();
    if(!c){       return;    }
    var x = 0;
    var y = 0;

    for (var i in pressed_keys) {
        var key = pressed_keys[i];
        if (KEYS_UTIL.is_up(key)) {
          y -= 1;
        }
        if (KEYS_UTIL.is_down(key)) {
          y += 1;
        }
        if (KEYS_UTIL.is_left(key)) {
          x -= 1;
        }
        if (KEYS_UTIL.is_right(key)) {
          x += 1;
        }
    }
    if(x != 0 || y != 0) {
      c.try_move(x, y);
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
