
const SCREEN = {
  width: function() {
      return 1 / THAUMATURGY.space_compression * Math.min(/*window.outerWidth,*/ window.innerWidth, document.documentElement.clientWidth);
  },

  height: function() {
    return 1 / THAUMATURGY.space_compression * Math.min(/*window.outerHeight,*/ window.innerHeight, document.documentElement.clientHeight);
  },

  real_ratio: function() {
    return screen.height / SCREEN.height();
  },

  scroll_screen_to_character: function() {
    if (DEBUG.DEACTIVATE_SCROLL) {
      return;
    }
    FOG.moveToChar();
    var c = THAUMATURGY.space_compression;
    window.scrollTo(CHARACTER.get().x * c - SCREEN.width()/2  * c, CHARACTER.get().y * c - SCREEN.height()/2 * c);
  },

  is_mobile: function() {
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobi|IEMobile|Opera Mini/i.test(navigator.userAgent) );
  },
};
