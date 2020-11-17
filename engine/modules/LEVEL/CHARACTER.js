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
  margin_left: -10,
  margin_right: 20,
  margin_top: 5,
  margin_bottom: 0,

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
