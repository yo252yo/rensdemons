// runtime: LEVEL, SCREEN
const KEYS_UTIL = {
  is_up: function(key) {
    return key === 'w' || key === 87 || key === 'arrowup' || key === 38;
  },
  is_down: function(key) {
    return key === 's' || key === 83 || key === 'arrowdown' || key === 40;
  },
  is_left: function(key) {
    return key === 'a' || key === 65 || key === 'arrowleft' || key === 37;
  },
  is_right: function(key) {
    return key === 'd' || key === 68 || key === 'arrowright' || key === 39;
  },
  is_space: function(key) {
    return key === ' ' || key === 32;
  },
  is_alt: function(key) {
    return key === 'alt' || key === 18;
  },
  is_ctrl: function(key) {
    return key === 'control' || key === 17;
  },
  is_shift: function(key) {
    return key === 'shift' || key === 16;
  },
  is_esc: function(key) {
    return key === 'escape' || key === 27;
  },
  is_enter: function(key) {
    return key === 'enter' || key === 13;
  },

  is_ok: function(key) {
    return KEYS_UTIL.is_space(key);
  },
  is_modifier: function(key) {
    return KEYS_UTIL.is_shift(key) || KEYS_UTIL.is_alt(key) || KEYS_UTIL.is_ctrl(key);
  },
}


const IO = {
  _PRESSED_KEYS: {},
  _PREVIOUS_SYSTEMS: [],
  _ACTIVE_SYSTEM: null,
  _MOUSE_DOWN: false,


  // Manage the lock and stack.
  _clear_inputs: function() {
    IO._PRESSED_KEYS= {};
  },

  interface: {
    _can_trigger_level_event: function() {
      return IO._ACTIVE_SYSTEM == IO_CHARACTER;
    },

    _can_open_escape_menu: function() {
      return IO._ACTIVE_SYSTEM == IO_CHARACTER;
    },

    _try_special_key_actions: function(key) {
      if (KEYS_UTIL.is_esc(key) && IO.interface._can_open_escape_menu()){
        INTERFACE.display_escape_menu();
      }
    },

    _check_transition_impact: function() {
      if (IO.interface._can_open_escape_menu()){
        document.getElementById('IFE_escape_menu_button').style.visibility = "visible";
      } else {
        document.getElementById('IFE_escape_menu_button').style.visibility = "hidden";
      }
    },
  },

  // Control structure API
  control: {
    _activate: function(system, skip_push) {
      IO._clear_inputs();
      if(! skip_push){
        IO._PREVIOUS_SYSTEMS.push(IO._ACTIVE_SYSTEM);
      }

      if (system && system.onClick){
        // Make it so we cant click straight away in a new environment to avoid click leak.
        setTimeout(function(){
          IO.click_interceptor.activate();
        }, 100);
      } else {
        IO.click_interceptor.deactivate();
      }
      IO._ACTIVE_SYSTEM = system;
      IO.interface._check_transition_impact();
    },

    cede: function() {
      IO.control._activate(IO._PREVIOUS_SYSTEMS.pop(), true);
    },

    dialog: function(dialog) {
      IO.control._activate(IO_DIALOG);
      IO_DIALOG.set_dialog(dialog);
    },

    menu: function(menu) {
      IO.control._activate(IO_MENU);
      IO_MENU.set_menu(menu);
    },

    character: function() {
      IO.control._activate(IO_CHARACTER);
    },
  },

  click_interceptor: {
    activate: function() {
      var level = document.getElementById("level");
      level.addEventListener('click', IO.handlers.onClick, { passive: false});
      level.addEventListener('touchstart', IO.handlers.onClick, { passive: false});

      level.addEventListener('touchmove', IO.handlers.onClickHold, { passive: false});

      level.addEventListener('mouseup', IO.handlers.onMouseup, { passive: false});
      level.addEventListener('mousedown', IO.handlers.onMousedown, { passive: false});
      level.addEventListener('mousemove', IO.handlers.onMousemove, { passive: false});
    },

    deactivate: function() {
      var level = document.getElementById("level");
      level.removeEventListener('click', IO.handlers.onClick, { passive: false});
      level.removeEventListener('touchstart', IO.handlers.onClick, { passive: false});

      level.removeEventListener('touchmove', IO.handlers.onClickHold, { passive: false});

      level.removeEventListener('mouseup', IO.handlers.onMouseup, { passive: false});
      level.removeEventListener('mousedown', IO.handlers.onMousedown, { passive: false});
      level.removeEventListener('mousemove', IO.handlers.onMousemove, { passive: false});
    },
  },

  // Global events handlers
  handlers: {
    onScroll: function(event) {
        event.preventDefault();
        return true;
    },

    onPressKey: function(key) {
      if (IO.interface._try_special_key_actions(key)){
        return;
      }
      if (!(key in IO._PRESSED_KEYS)) {
          IO._PRESSED_KEYS[key] = true;
      }
      if (IO._ACTIVE_SYSTEM && IO._ACTIVE_SYSTEM.onPressKey && !KEYS_UTIL.is_modifier(key)) {
        IO._ACTIVE_SYSTEM.onPressKey(key);
      } else {
        IO.handlers.onContinuousKeyPress();
      }
    },

    onReleaseKey: function(key) {
      delete IO._PRESSED_KEYS[key];
      IO.handlers.onContinuousKeyPress();
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
      IO.handlers.onClick(event, true);
    },

    onMouseup: function() {
      IO._MOUSE_DOWN = false;
    },

    onMousedown: function() {
      IO._MOUSE_DOWN = true;
    },

    onMousemove: function(event) {
      if (IO._MOUSE_DOWN) {
        IO.handlers.onClickHold(event);
      }
    },
  },

  // Module specific handlers
  menu: {
    pick: function(choice){
      if (IO._ACTIVE_SYSTEM != IO_MENU){        return;    }
      IO_MENU.pick(choice);
    },

    select: function(choice){
      if (IO._ACTIVE_SYSTEM != IO_MENU){        return;     }
      IO_MENU.select(choice);
    },
  },
}

// Events listeners

document.addEventListener('keydown', function (event) {
    var key = event.key || event.keyCode;
    IO.handlers.onPressKey(key.toLowerCase());
    event.preventDefault();
});

document.addEventListener('keyup', function (event) {
    var key = event.key || event.keyCode;
    IO.handlers.onReleaseKey(key.toLowerCase());
    event.preventDefault();
});


window.addEventListener('scroll', IO.handlers.onScroll, { passive: false });
window.addEventListener('resize', IO.handlers.onScroll, { passive: false});
window.addEventListener('touchend', IO.handlers.onScroll, { passive: false});
