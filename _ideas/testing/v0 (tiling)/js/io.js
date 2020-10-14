_PRESSED_KEYS = {};


function keyManager(){    
    if ('escape' in _PRESSED_KEYS || 'esc' in _PRESSED_KEYS || 27 in _PRESSED_KEYS){
        
    }
    if ('shift' in _PRESSED_KEYS || 16 in _PRESSED_KEYS){
        CHARACTER.run();
    } else {
        CHARACTER.walk();
    }
    
    for (var key in _PRESSED_KEYS) {
        
        if (key === 'w' || key === 87) {
            CHARACTER.move_up();
        }
        if (key === 's' || key === 83) {
            CHARACTER.move_down();
        }
        if (key === 'a' || key === 65) {
            CHARACTER.move_left();
        }
        if (key === 'd' || key === 68) {
            CHARACTER.move_right();
        }
    }
};

document.addEventListener('keydown', function (event) {
    var key = event.key || event.keyCode;
    key = key.toLowerCase();
    if (!(key in _PRESSED_KEYS)) {
        _PRESSED_KEYS[key] = true;
    }
    keyManager();
});

document.addEventListener('keyup', function (event) {
    var key = event.key || event.keyCode;
    key = key.toLowerCase();
    delete _PRESSED_KEYS[key];
    keyManager();
});



function onScroll(event){
    event.preventDefault();
    if (DRAWING.lock_scroll) {
        DRAWING.scroll();
        return false;
    }
}

window.addEventListener('scroll', onScroll, { passive: false });
window.addEventListener('touchmove', onScroll, { passive: false});
window.addEventListener('resize', onScroll, { passive: false});


window.addEventListener('click', function (event) {
    event.preventDefault();
    var destination_x = window.pageXOffset + event.clientX;
    var destination_Y = window.pageYOffset + event.clientY;    
    
    CHARACTER.move_to(destination_x, destination_Y);    
}, { passive: false});

window.addEventListener('touchstart',function (event) {
    event.preventDefault();
    var destination_x = window.pageXOffset + event.touches[0].clientX;
    var destination_Y = window.pageYOffset + event.touches[0].clientY;
        
    CHARACTER.move_to(destination_x, destination_Y);    
}, { passive: false});