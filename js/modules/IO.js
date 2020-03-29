// runtime: LEVEL, SCREEN

const KEYS_UTIL = {
  is_up: function(key) {
    return key === 'w' || key === 87;
  },
  is_down: function(key) {
    return key === 's' || key === 83;
  },
  is_left: function(key) {
    return key === 'a' || key === 65;
  },
  is_right: function(key) {
    return key === 'd' || key === 68;
  },
  is_ok: function(key) {
    return key === ' ' || key === 32;
  },
}

const IO_CHARACTER = {

  click: function(x,y, is_hold) {
    LEVEL.click(x, y, is_hold);
  },

  manageKeys: function(pressed_keys) {
      if ('escape' in pressed_keys || 'esc' in pressed_keys || 27 in pressed_keys) {

      }
      if ('shift' in pressed_keys || 16 in pressed_keys) {
          //CHARACTER.run();
      } else {
          //CHARACTER.walk();
      }

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
}

const IO_DIALOG = {
  set_dialog: function(dialog) {
    this.dialog = dialog;
  },

  click: function(x,y, is_hold) {
    if (! is_hold) {
      this.dialog.turn_page();
    }
  },

  pressKey: function(key) {
    this.dialog.turn_page();
  },
}

const IO_MENU = {
  set_menu: function(menu) {
    this.menu = menu;
  },

  pressKey: function(key) {
    if (KEYS_UTIL.is_up(key)) {
      this.menu.move_select(1);
    }
    if (KEYS_UTIL.is_down(key)) {
      this.menu.move_select(-1);
    }
    if (KEYS_UTIL.is_ok(key)) {
      this.menu.confirm_select();
    }
  },

  menu_pick: function(choice) {
    this.menu.pick(choice);
  },

  menu_select: function(choice) {
    this.menu.select(choice);
  },
}


const IO = {
  _PRESSED_KEYS: {},
  _PREVIOUS_SYSTEM: IO_CHARACTER,
  _ACTIVE_SYSTEM: IO_CHARACTER,
  _MOUSE_DOWN: false,

  scroll_screen: function() {
    window.scrollTo(CHARACTER.get().x - SCREEN.width()/2, CHARACTER.get().y - SCREEN.height()/2);
  },

  activate: function(system) {
    this._PREVIOUS_SYSTEM = this._ACTIVE_SYSTEM;
    this._ACTIVE_SYSTEM = system;
  },

  control_dialog: function(dialog) {
    this.activate(IO_DIALOG);
    IO_DIALOG.set_dialog(dialog);
  },

  control_menu: function(menu) {
    this.last_activation = (new Date()).getTime();
    this.activate(IO_MENU);
    IO_MENU.set_menu(menu);
  },

  control_character: function() {
    this.activate(IO_CHARACTER);
  },

  cede_control: function() {
    this.activate(this._PREVIOUS_SYSTEM);
  },


  onScroll: function(event) {
      event.preventDefault();
      return true;
  },

  onPressKey: function(key) {
    if (!(key in IO._PRESSED_KEYS)) {
        IO._PRESSED_KEYS[key] = true;
    }

    if (IO._ACTIVE_SYSTEM.pressKey) {
      IO._ACTIVE_SYSTEM.pressKey(key);
    } else {
      IO.continuousKeyManager();
    }
  },

  onReleaseKey: function(key) {
    delete IO._PRESSED_KEYS[key];
    IO.continuousKeyManager();
  },

  continuousKeyManager: function() {
    if (this._ACTIVE_SYSTEM.manageKeys) {
      this._ACTIVE_SYSTEM.manageKeys(this._PRESSED_KEYS);
    }
  },

  onClick: function(event, is_hold) {
    var x = event.clientX;
    var y = event.clientY;
    if(!x || !y) { // for mobile
      x = event.changedTouches[0].clientX;
      y = event.changedTouches[0].clientY;
    }

    event.preventDefault();
    var destination_x = window.pageXOffset + x;
    var destination_Y = window.pageYOffset + y;

    if (IO._ACTIVE_SYSTEM.click) {
      IO._ACTIVE_SYSTEM.click(destination_x, destination_Y, is_hold);
    }
  },

  onClickHold: function(event, is_hold) {
    IO.onClick(event, true);
  },

  onMouseup: function() {
    IO._MOUSE_DOWN = false;
  },

  onMousedown: function() {
    IO._MOUSE_DOWN = true;
  },

  onMousemove: function(event) {
    if (IO._MOUSE_DOWN) {
      IO.onClickHold(event);
    }
  },

  menu_pick: function(choice){
    if (this._ACTIVE_SYSTEM != IO_MENU){
      return;
    }
    IO_MENU.menu_pick(choice);
  },

  menu_select: function(choice){
    if (this._ACTIVE_SYSTEM != IO_MENU){
      return;
    }
    IO_MENU.menu_select(choice);
  },
}

// Events listeners

document.addEventListener('keydown', function (event) {
    var key = event.key || event.keyCode;
    IO.onPressKey(key.toLowerCase());
    event.preventDefault();
});

document.addEventListener('keyup', function (event) {
    var key = event.key || event.keyCode;
    IO.onReleaseKey(key.toLowerCase());
    event.preventDefault();
});


window.addEventListener('scroll', IO.onScroll, { passive: false });
window.addEventListener('resize', IO.onScroll, { passive: false});

window.addEventListener('click', IO.onClick, { passive: false});
window.addEventListener('touchstart', IO.onClick, { passive: false});

window.addEventListener('touchmove', IO.onClickHold, { passive: false});

window.addEventListener('mouseup', IO.onMouseup, { passive: false});
window.addEventListener('mousedown', IO.onMousedown, { passive: false});
window.addEventListener('mousemove', IO.onMousemove, { passive: false});
