// runtime: LEVEL, SCREEN

const IO_CHARACTER = {
  click: function(x,y, is_hold){
    LEVEL.click(x, y, is_hold);
  },

  manageKeys: function(pressed_keys){
      if ('escape' in pressed_keys || 'esc' in pressed_keys || 27 in pressed_keys){

      }
      if ('shift' in pressed_keys || 16 in pressed_keys){
          //CHARACTER.run();
      } else {
          //CHARACTER.walk();
      }

      for (var key in pressed_keys) {
          if (key === 'w' || key === 87) {
            LEVEL.up();
          }
          if (key === 's' || key === 83) {
            LEVEL.down();
          }
          if (key === 'a' || key === 65) {
            LEVEL.left();
          }
          if (key === 'd' || key === 68) {
            LEVEL.right();
          }
          if (key === ' ' || key === 32) {
            LEVEL.interact_in_front();
          }
      }
  },
}

const IO_DIALOG = {
  set_dialog: function(dialog){
    this.dialog = dialog;
  },

  click: function(x,y, is_hold){
    if (! is_hold){
      this.dialog.turn_page();
    }
  },

  pressKey: function(key){
    this.dialog.turn_page();
  },
}


const IO = {
  _PRESSED_KEYS: {},
  _ACTIVE_SYSTEM: IO_CHARACTER,
  _MOUSE_DOWN: false,

  scroll_screen: function(){
    window.scrollTo(CHARACTER.x - SCREEN.width()/2, CHARACTER.y - SCREEN.height()/2);
  },

  control_dialog: function(dialog){
    this._ACTIVE_SYSTEM = IO_DIALOG;
    IO_DIALOG.set_dialog(dialog);
  },

  control_character: function(){
    this._ACTIVE_SYSTEM = IO_CHARACTER;
  },

  onScroll: function(event){
      event.preventDefault();
      return true;
  },

  onPressKey: function(key){
    if (!(key in IO._PRESSED_KEYS)) {
        IO._PRESSED_KEYS[key] = true;
    }
    IO.continuousKeyManager();

    if (IO._ACTIVE_SYSTEM.pressKey){
      IO._ACTIVE_SYSTEM.pressKey(key);
    }
  },

  onReleaseKey: function(key){
    delete IO._PRESSED_KEYS[key];
    IO.continuousKeyManager();
  },

  continuousKeyManager: function(){
    if (this._ACTIVE_SYSTEM.manageKeys){
      this._ACTIVE_SYSTEM.manageKeys(this._PRESSED_KEYS);
    }
  },

  onClick: function(event, is_hold){
    var x = event.clientX;
    var y = event.clientY;
    if(!x || !y){ // for mobile
      x = event.changedTouches[0].clientX;
      y = event.changedTouches[0].clientY;
    }

    event.preventDefault();
    var destination_x = window.pageXOffset + x;
    var destination_Y = window.pageYOffset + y;

    if (IO._ACTIVE_SYSTEM.click){
      IO._ACTIVE_SYSTEM.click(destination_x, destination_Y, is_hold);
    }
  },

  onClickHold: function(event, is_hold){
    IO.onClick(event, true);
  },

  onMouseup: function(){
    IO._MOUSE_DOWN = false;
  },

  onMousedown: function(){
    IO._MOUSE_DOWN = true;
  },

  onMousemove: function(event){
    if (IO._MOUSE_DOWN){
      IO.onClickHold(event);
    }
  },
}

// Events listeners

document.addEventListener('keydown', function (event) {
    var key = event.key || event.keyCode;
    IO.onPressKey(key.toLowerCase());
});

document.addEventListener('keyup', function (event) {
    var key = event.key || event.keyCode;
    IO.onReleaseKey(key.toLowerCase());
});


window.addEventListener('scroll', IO.onScroll, { passive: false });
window.addEventListener('resize', IO.onScroll, { passive: false});

window.addEventListener('click', IO.onClick, { passive: false});
window.addEventListener('touchstart', IO.onClick, { passive: false});

window.addEventListener('touchmove', IO.onClickHold, { passive: false});

window.addEventListener('mouseup', IO.onMouseup, { passive: false});
window.addEventListener('mousedown', IO.onMousedown, { passive: false});
window.addEventListener('mousemove', IO.onMousemove, { passive: false});
