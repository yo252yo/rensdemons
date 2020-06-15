// runtime MovingSprite, PALETTE, LEVEL



class M_Character extends MovingObject {
  constructor(x, y) {
    var width = 32;
    var height = 48;
    var visual = new MovingSprite("assets/characters/sora.png", 'player', width, height);
    super(visual, x, y, width, height);
  }
}

const CHARACTER = {
  initialize: function(x, y) {
    CHARACTER.character = new M_Character(x, y);
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

  redraw: function() {
    if (CHARACTER.character && CHARACTER.character.visual_element){
      CHARACTER.character.visual_element.draw();
    }
  },
};
