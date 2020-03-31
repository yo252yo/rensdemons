// runtime MovingSprite, PALETTE, LEVEL

const CHARACTER = {
  initialize: function(x, y) {
    var width = 32;
    var height = 48;
    var sprite = new MovingSprite("assets/sora.png", PALETTE.color_player.code(), width, height);
    CHARACTER.character = new MovingObject(sprite, x, y, width, height);
    SCREEN.scroll_screen_to_character();
  },

  clear: function () {
    if (CHARACTER.character) {
      CHARACTER.character.sprite = undefined;
    }
  },

  get: function() {
      return CHARACTER.character;
  },

};
