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


const IO = {
  _PRESSED_KEYS: {},
  _PREVIOUS_SYSTEMS: [],
  _ACTIVE_SYSTEM: null,
  _MOUSE_DOWN: false,


  // Manage the lock and stack.
  clear_inputs: function() {
    IO._PRESSED_KEYS= {};
  },

  activate: function(system, skip_push) {
    IO.clear_inputs();
    if(! skip_push){
      IO._PREVIOUS_SYSTEMS.push(IO._ACTIVE_SYSTEM);
    }
    IO._ACTIVE_SYSTEM = system;
  },

  cede_control: function() {
    IO.activate(IO._PREVIOUS_SYSTEMS.pop(), true);
  },


  // Grabing control methods.
  control_dialog: function(dialog) {
    IO.activate(IO_DIALOG);
    IO_DIALOG.set_dialog(dialog);
  },

  control_menu: function(menu) {
    IO.activate(IO_MENU);
    IO_MENU.set_menu(menu);
  },

  control_character: function() {
    IO.activate(IO_CHARACTER);
  },


  // Global events handlers
  onScroll: function(event) {
      event.preventDefault();
      return true;
  },

  onPressKey: function(key) {
    if (!(key in IO._PRESSED_KEYS)) {
        IO._PRESSED_KEYS[key] = true;
    }

    if (IO._ACTIVE_SYSTEM && IO._ACTIVE_SYSTEM.onPressKey) {
      IO._ACTIVE_SYSTEM.onPressKey(key);
    } else {
      IO.onContinuousKeyPress();
    }
  },

  onReleaseKey: function(key) {
    delete IO._PRESSED_KEYS[key];
    IO.onContinuousKeyPress();
  },

  onContinuousKeyPress: function() {
    if (IO._ACTIVE_SYSTEM && IO._ACTIVE_SYSTEM.onContinuousKeyPress) {
      IO._ACTIVE_SYSTEM.onContinuousKeyPress(IO._PRESSED_KEYS);
    }
  },

  onClick: function(event, is_hold) {
    if (IO._ACTIVE_SYSTEM == IO_MENU){
      return;
    }

    var x = event.clientX;
    var y = event.clientY;
    if(!x || !y) { // for mobile
      x = event.changedTouches[0].clientX;
      y = event.changedTouches[0].clientY;
    }

    event.preventDefault();
    var destination_x = window.pageXOffset + x;
    var destination_Y = window.pageYOffset + y;

    if (IO._ACTIVE_SYSTEM && IO._ACTIVE_SYSTEM.onClick) {
      IO._ACTIVE_SYSTEM.onClick(destination_x, destination_Y, is_hold);
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

  // Module specific handlers
  menu_pick: function(choice){
    if (IO._ACTIVE_SYSTEM != IO_MENU){        return;    }
    IO_MENU.menu_pick(choice);
  },

  menu_select: function(choice){
    if (IO._ACTIVE_SYSTEM != IO_MENU){        return;     }
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
