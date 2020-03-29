
const SCREEN = {
  width: function() {
      return Math.min(window.outerWidth, window.innerWidth, document.documentElement.clientWidth);
  },

  height: function() {
    return Math.min(window.outerHeight, window.innerHeight, document.documentElement.clientHeight);
  },

  scroll_screen_to_character: function() {
    window.scrollTo(CHARACTER.get().x - SCREEN.width()/2, CHARACTER.get().y - SCREEN.height()/2);
  },
};
