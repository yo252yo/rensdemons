const IO_MENU = {
  set_menu: function(menu) {
    IO._menu = menu;
  },

  onPressKey: function(key) {
    if (KEYS_UTIL.is_up(key)) {
      IO._menu.move_select(-1);
    }
    if (KEYS_UTIL.is_down(key)) {
      IO._menu.move_select(1);
    }
    if (KEYS_UTIL.is_ok(key)) {
      IO._menu.confirm_select();
    }
    if (KEYS_UTIL.is_cancel(key)) {
      IO._menu.try_escape();
    }
  },

  pick: function(choice) {
    IO._menu.pick(choice);
  },

  select: function(choice) {
    IO._menu.select(choice);
  },
}
