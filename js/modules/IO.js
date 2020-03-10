

const IO = {
  _PRESSED_KEYS: {},

  onScroll: function(event){
      event.preventDefault();
      /*if (DRAWING.lock_scroll) {
          DRAWING.scroll();
          return false;
      }*/
  },

  onClick: function(x,y){
//      CHARACTER.move_to(destination_x, destination_Y);
  },

  onPressKey: function(key){
    if (!(key in IO._PRESSED_KEYS)) {
        IO._PRESSED_KEYS[key] = true;
    }
    IO.keyManager();
  },

  onReleaseKey: function(key){
    delete IO._PRESSED_KEYS[key];
    IO.keyManager();
  },

  keyManager: function(){
      if ('escape' in _PRESSED_KEYS || 'esc' in _PRESSED_KEYS || 27 in _PRESSED_KEYS){

      }
      if ('shift' in _PRESSED_KEYS || 16 in _PRESSED_KEYS){
          //CHARACTER.run();
      } else {
          //CHARACTER.walk();
      }

      for (var key in _PRESSED_KEYS) {

          if (key === 'w' || key === 87) {
              //CHARACTER.move_up();
          }
          if (key === 's' || key === 83) {
            //  CHARACTER.move_down();
          }
          if (key === 'a' || key === 65) {
            //  CHARACTER.move_left();
          }
          if (key === 'd' || key === 68) {
            //  CHARACTER.move_right();
          }
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
