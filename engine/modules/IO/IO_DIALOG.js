const IO_DIALOG = {
  set_dialog: function(dialog) {
    IO.dialog = dialog;
  },

  onClick: function(x,y, is_hold) {
    if (! is_hold) {
      if(!SCREEN.is_mobile()){
        IO.dialog.turn_page();
      } else {
        var y_relat = (y - window.scrollY) / SCREEN.height();
        var x_relat = (x - window.scrollX) / SCREEN.width();
        if (y_relat > 0.5 && y_relat < 0.95 && x_relat > 0.05 && x_relat < 0.95) {
          IO.dialog.turn_page();
        }
      }
    }
  },

  onPressKey: function(key) {
    if (KEYS_UTIL.is_ok(key)) {
      IO.dialog.turn_page();
    }
  },
}
