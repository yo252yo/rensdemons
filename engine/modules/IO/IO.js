// runtime: LEVEL, SCREEN
const KEYS_UTIL = {
  is_up: function(key) {
    return key === 'z' || key === 87 || key === 'w' || key === 90 || key === 'arrowup' || key === 38;
  },
  is_down: function(key) {
    return key === 's' || key === 83 || key === 'arrowdown' || key === 40;
  },
  is_left: function(key) {
    return key === 'q' || key === 65 || key === 'a' || key === 81 || key === 'arrowleft' || key === 37;
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
  is_backspace: function(key) {
    return key === 'backspace' || key === 8;
  },
  is_enter: function(key) {
    return key === 'enter' || key === 13;
  },
  is_e: function(key) {
    return key === 'e' || key === 69;
  },
  is_z: function(key) {
    return key === 'z' || key === 90;
  },
  is_x: function(key) {
    return key === 'x' || key === 88;
  },

  is_ok: function(key) {
    return KEYS_UTIL.is_space(key) || KEYS_UTIL.is_enter(key) || KEYS_UTIL.is_e(key) || KEYS_UTIL.is_x(key) ;
  },
  is_cancel: function(key) {
    return KEYS_UTIL.is_esc(key) || KEYS_UTIL.is_backspace(key) ;
  },
  is_modifier: function(key) {
    return KEYS_UTIL.is_shift(key) || KEYS_UTIL.is_alt(key) || KEYS_UTIL.is_ctrl(key);
  },
  is_system_key: function(key){
    return key.length > 1 && (key.startsWith("media") || key.startsWith("audio"));
  },

  is_pressed: {
    _generic: function (key_function) {
      for (var i in IO._PRESSED_KEYS){
        if (key_function(IO._PRESSED_KEYS[i])) {
          return true;
        }
      }
      return false;

    },

    shift: function() {
      return KEYS_UTIL.is_pressed._generic(KEYS_UTIL.is_shift);
    },
    alt: function() {
      return KEYS_UTIL.is_pressed._generic(KEYS_UTIL.is_alt);
    },
    ctrl: function() {
      return KEYS_UTIL.is_pressed._generic(KEYS_UTIL.is_ctrl);
    },
  }


}


const IO = {
  _PRESSED_KEYS: [],
  _PREVIOUS_SYSTEMS: [],
  _ACTIVE_SYSTEM: null,
  _CONTINUOUS_KEY_PRESS_TIC: 30,


  // Manage the lock and stack.
  _clear_inputs: function() {
    IO._PRESSED_KEYS= [];
  },

  clear_io_queue: function() {
    IO._PREVIOUS_SYSTEMS = [];
    IO._ACTIVE_SYSTEM = null;
    CONSOLE.log.io("Clearing IO queue");
  },

  interface: {
    _can_trigger_level_event: function() {
      return IO._ACTIVE_SYSTEM == IO_CHARACTER;
    },

    _can_open_escape_menu: function() {
      return IO._ACTIVE_SYSTEM == IO_CHARACTER;
    },

    _try_special_key_actions: function(key) {
      if (KEYS_UTIL.is_cancel(key) && IO.interface._can_open_escape_menu()){
        INTERFACE.display.escape_menu();
        return true;
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
    _finish_activate: function() {
      IO._clear_inputs();

      if (IO._PENDING_SYSTEM && IO._PENDING_SYSTEM.onClick){
        IO.click_interceptor.activate();
      } else {
        IO.click_interceptor.deactivate();
      }
      IO._ACTIVE_SYSTEM = IO._PENDING_SYSTEM;
      IO._PENDING_SYSTEM = undefined;
      IO.interface._check_transition_impact();
    },

    _activate: function(system, skip_push) {
      if(! skip_push){
        if(IO._PENDING_SYSTEM){
          IO._PREVIOUS_SYSTEMS.push(IO._PENDING_SYSTEM);
        } else {
          IO._PREVIOUS_SYSTEMS.push(IO._ACTIVE_SYSTEM);
        }
      }

      IO._ACTIVE_SYSTEM = undefined;
      IO._PENDING_SYSTEM = system;

      // Make it so we cant click straight away in a new environment to avoid click leak. One timeout at a time only
      if(IO._PENDING_TIMEOUT){
        clearTimeout(IO._PENDING_TIMEOUT);
      }
      IO._PENDING_TIMEOUT = setTimeout(function(){
        IO.control._finish_activate();
      }, 200);
    },

    cede: function() {
      if (IO._PREVIOUS_SYSTEMS.length){
        IO.control._activate(IO._PREVIOUS_SYSTEMS.pop(), true);
      } else {
        IO.control.character(); // this will be our default
      }
    },

    dialog: function(dialog) {
      CONSOLE.log.io("Activating dialog");
      IO.control._activate(IO_DIALOG);
      IO_DIALOG.set_dialog(dialog);
    },

    menu: function(menu) {
      CONSOLE.log.io("Activating menu");
      IO.control._activate(IO_MENU);
      IO_MENU.set_menu(menu);
    },

    character: function() {
      CONSOLE.log.io("Activating character");
      IO.control._activate(IO_CHARACTER);
    },

    dodge: function() {
      CONSOLE.log.io("Activating dodge");
      IO.control._activate(IO_DODGE);
    },

    hit: function() {
      CONSOLE.log.io("Activating hit");
      IO.control._activate(IO_HIT);
    },

    empty: function() {
      CONSOLE.log.io("Activating empty");
      IO.control._activate({});
    },
  },

  click_interceptor: {
    activate: function() {
      var level = document;//.getElementById("level");
      level.addEventListener('click', IO.handlers.onClick, { passive: false});
      level.addEventListener('touchstart', IO.handlers.onClick, { passive: false});

      level.addEventListener('touchmove', IO.handlers.onClickHold, { passive: false});

      level.addEventListener('mousemove', IO.handlers.onMousemove, { passive: false});
    },

    deactivate: function() {
      var level = document;//.getElementById("level");
      level.removeEventListener('click', IO.handlers.onClick, { passive: false});
      level.removeEventListener('touchstart', IO.handlers.onClick, { passive: false});

      level.removeEventListener('touchmove', IO.handlers.onClickHold, { passive: false});

      level.removeEventListener('mousemove', IO.handlers.onMousemove, { passive: false});
    },
  },

  key_interceptor: {
    activate: function() {
      document.addEventListener('keydown', IO.handlers.onKeyDown);
      document.addEventListener('keyup', IO.handlers.onKeyUp);
    },

    deactivate: function() {
      document.removeEventListener('keydown', IO.handlers.onKeyDown);
      document.removeEventListener('keyup', IO.handlers.onKeyUp);
    },
  },


  // Global events handlers
  handlers: {
    onKeyDown: function (event) {
        return IO.raw_handlers.onKeyDown(event);
    },

    onKeyUp: function (event) {
        return IO.raw_handlers.onKeyUp(event);
    },

    onScroll: function(event) {
        return IO.raw_handlers.onScroll(event);
    },

    onWheel: function(event) {
        return IO.raw_handlers.onWheel(event);
    },

    onPressKey: function(key) {
        return IO.raw_handlers.onPressKey(key);
    },

    onReleaseKey: function(key) {
        return IO.raw_handlers.onReleaseKey(key);
    },

    onContinuousKeyPress: function() {
        return IO.raw_handlers.onContinuousKeyPress();
    },

    onClick: function(event, is_hold) {
        return IO.raw_handlers.onClick(event, is_hold);
    },

    onClickHold: function(event, is_hold) {
        return IO.raw_handlers.onClickHold(event, is_hold);
    },

    onMousemove: function(event) {
        return IO.raw_handlers.onMousemove(event);
    },
  },
  
  raw_handlers: {
    onKeyDown: function (event) {
        var key = event.key || event.keyCode;
        IO.handlers.onPressKey(key.toLowerCase());
        event.preventDefault();
    },

    onKeyUp: function (event) {
        var key = event.key || event.keyCode;
        IO.handlers.onReleaseKey(key.toLowerCase());
        event.preventDefault();
    },

    onScroll: function(event) {
        event.preventDefault();
        return true;
    },

    onWheel: function(event) {
      if (event.ctrlKey){ // forbids only zoom
        event.preventDefault();
        return true;
      }
    },

    onPressKey: function(key) {
      DEBUG.signal.press_key(key);

      if (KEYS_UTIL.is_system_key(key)){
        return;
      }
      if (IO.interface._try_special_key_actions(key)){
        return;
      }
      if (!(IO._PRESSED_KEYS.includes(key))) {
          IO._PRESSED_KEYS.push(key);
      }
      if (IO._ACTIVE_SYSTEM && IO._ACTIVE_SYSTEM.onPressKey && !KEYS_UTIL.is_modifier(key)) {
        IO._ACTIVE_SYSTEM.onPressKey(key);
      }
    },

    onReleaseKey: function(key) {
      for(var i in IO._PRESSED_KEYS) {
        if (IO._PRESSED_KEYS[i] == key) {
          var k = IO._PRESSED_KEYS[i];
          IO._PRESSED_KEYS.splice(i, 1);
          delete k;
        }
      }
    },

    onContinuousKeyPress: function() {
      setTimeout(IO.handlers.onContinuousKeyPress, IO._CONTINUOUS_KEY_PRESS_TIC);
      if (IO._PRESSED_KEYS.length > 0 &&
          IO._ACTIVE_SYSTEM &&
          IO._ACTIVE_SYSTEM.onContinuousKeyPress) {
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


      if(IO.interface._can_open_escape_menu()){
        if(SCREEN.is_mobile() && x < 80 && y < 80){
          INTERFACE.display.escape_menu();
          return;
        }
        if(!SCREEN.is_mobile() && x < 65 && y < 65){
          INTERFACE.display.escape_menu();
          return;
        }
      }

      var destination_X = window.pageXOffset + x;
      var destination_Y = window.pageYOffset + y;

      DEBUG.signal.mouse_position(destination_X, destination_Y);
      THAUMATURGY.react_to_click(destination_X, destination_Y);

      if (IO._ACTIVE_SYSTEM && IO._ACTIVE_SYSTEM.onClick) {
        if (!IO._ACTIVE_SYSTEM.onClick(destination_X, destination_Y, is_hold, event)){
          event.preventDefault();
        }
      }
    },

    onClickHold: function(event, is_hold) {
      IO.handlers.onClick(event, true);
    },

    onMousemove: function(event) {
      if (event.buttons > 0) {
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

IO.key_interceptor.activate();

window.addEventListener('scroll', IO.handlers.onScroll, { passive: false });
window.addEventListener('resize', IO.handlers.onScroll, { passive: false});
window.addEventListener('wheel', IO.handlers.onWheel, { passive: false});

// Turn on the continuous key press handler
IO.handlers.onContinuousKeyPress();
