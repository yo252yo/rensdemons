// runtime MovingSprite, PALETTE, LEVEL

const CHARACTER = {
  initialize: function(x, y) {
    var width = 32;
    var height = 48;
    var sprite = new MovingSprite("assets/sora.png", PALETTE.color_player.code(), width, height);
    this.character = new MovingObject(sprite, x, y, width, height);
    IO.scroll_screen();
  },

  clear: function () {
    if (this.character) {
      this.character.sprite = undefined;
    }
  },

  get: function() {
      return this.character;
  },

};
