
const SCREEN = {
  width: function() {
      return Math.min(/*window.outerWidth,*/ window.innerWidth, document.documentElement.clientWidth);
  },

  height: function() {
    return Math.min(/*window.outerHeight,*/ window.innerHeight, document.documentElement.clientHeight);
  },

  real_ratio: function() {
    return screen.height / SCREEN.height();
  },

  scroll_screen_to_character: function() {
    if (DEBUG.DEACTIVATE_SCROLL) {
      return;
    }
    FOG.moveToChar();
    window.scrollTo(CHARACTER.get().x - SCREEN.width()/2, CHARACTER.get().y - SCREEN.height()/2);
  },

  is_mobile: function() {
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobi|IEMobile|Opera Mini/i.test(navigator.userAgent) );
  },
};
