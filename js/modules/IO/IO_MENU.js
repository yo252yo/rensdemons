const IO_MENU = {
  set_menu: function(menu) {
    IO.menu = menu;
  },

  onPressKey: function(key) {
    if (KEYS_UTIL.is_up(key)) {
      IO.menu.move_select(1);
    }
    if (KEYS_UTIL.is_down(key)) {
      IO.menu.move_select(-1);
    }
    if (KEYS_UTIL.is_ok(key)) {
      IO.menu.confirm_select();
    }
  },

  menu_pick: function(choice) {
    IO.menu.pick(choice);
  },

  menu_select: function(choice) {
    IO.menu.select(choice);
  },
}
