const IO_DIALOG = {
  set_dialog: function(dialog) {
    IO.dialog = dialog;
  },

  onClick: function(x,y, is_hold, event) {

    if (!SCREEN.is_mobile()) {
      if(!is_hold){
        IO.dialog.turn_page();
      }
    } else {
      var y_relat = (y - window.scrollY) / SCREEN.height();
      var x_relat = (x - window.scrollX) / SCREEN.width();

      if (! is_hold && y_relat > 0.5 && y_relat < 0.95 && x_relat > 0.05 && x_relat < 0.8) {
        IO.dialog.turn_page();
      } else {
        return true; // give back the event so that we can scroll etc...
      }
    }
  },

  onPressKey: function(key) {
    if (KEYS_UTIL.is_ok(key)) {
      IO.dialog.turn_page();
    }
  },
}
