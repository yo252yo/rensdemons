// runtime: LEVEL, SCREEN

const IO_CHARACTER = {
  onClick: function(x,y){
    LEVEL.click(x, y);
  },

  continuousKeyManager: function(pressed_keys){
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

  onClick: function(x,y){
    this.dialog.turn_page();
  },

  onPressKey: function(key){
    this.dialog.turn_page();
  },
}


const IO = {
  _PRESSED_KEYS: {},
  _ACTIVE_SYSTEM: IO_CHARACTER,


  scroll_screen: function(){
    window.scrollTo(CHARACTER.x - SCREEN.width()/2, CHARACTER.y - SCREEN.height()/2);
  },

  control_dialog(dialog){
    this._ACTIVE_SYSTEM = IO_DIALOG;
    IO_DIALOG.set_dialog(dialog);
  },

  control_character(){
    this._ACTIVE_SYSTEM = IO_CHARACTER;
  },

  onScroll: function(event){
      event.preventDefault();
      return true;
  },

  onPressKey: function(key){
    if (!(key in this._PRESSED_KEYS)) {
        this._PRESSED_KEYS[key] = true;
    }
    this.continuousKeyManager();

    if (this._ACTIVE_SYSTEM.onPressKey){
      this._ACTIVE_SYSTEM.onPressKey(key);
    }
  },

  onReleaseKey: function(key){
    delete this._PRESSED_KEYS[key];
    this.continuousKeyManager();
  },

  onClick: function(x,y){
    if (this._ACTIVE_SYSTEM.onClick){
      this._ACTIVE_SYSTEM.onClick(x,y);
    }
  },

  continuousKeyManager: function(){
    if (this._ACTIVE_SYSTEM.continuousKeyManager){
      this._ACTIVE_SYSTEM.continuousKeyManager(this._PRESSED_KEYS);
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
window.addEventListener('touchmove', IO.onScroll, { passive: false});
window.addEventListener('resize', IO.onScroll, { passive: false});

window.addEventListener('click', function (event) {
    event.preventDefault();
    var destination_x = window.pageXOffset + event.clientX;
    var destination_Y = window.pageYOffset + event.clientY;

    IO.onClick(destination_x, destination_Y);
}, { passive: false});

window.addEventListener('touchstart',function (event) {
    event.preventDefault();
    var destination_x = window.pageXOffset + event.touches[0].clientX;
    var destination_Y = window.pageYOffset + event.touches[0].clientY;

    IO.onClick(destination_x, destination_Y);
}, { passive: false});
