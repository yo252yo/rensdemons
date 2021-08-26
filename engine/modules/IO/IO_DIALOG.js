const IO_DIALOG = {
  set_dialog: function(dialog) {
    IO.dialog = dialog;
  },

  onClick: function(x,y, is_hold) {
    if (! is_hold) {
      IO.dialog.turn_page();
    }
  },

  onPressKey: function(key) {
    if (KEYS_UTIL.is_ok(key)) {
      IO.dialog.turn_page();
    }    
  },
}
