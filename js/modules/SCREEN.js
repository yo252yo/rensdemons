
const SCREEN = {
  width: function() {
      return Math.min(window.outerWidth, window.innerWidth, document.documentElement.clientWidth);
  },

  height: function(){
    return Math.min(window.outerHeight, window.innerHeight, document.documentElement.clientHeight);
  },

};
