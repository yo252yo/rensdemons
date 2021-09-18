// runtime MovingSprite, PALETTE, LEVEL



class M_Character extends MovingObject {
  constructor(x, y, size) {
    var width = 32;
    var height = 48;
    var visual = new MovingSprite("assets/characters/ren.png", 'player', width, height);
    if (size) {
      //visual.container.adjust_dimensions(size * width, size * height);
      visual.html_canvas.style.width = (size * width) + "px";
      visual.html_canvas.style.height = (size * height) + "px";
      visual.html_canvas.style.top = (48-(size * height)) + "px";
    }
    super(visual, x, y, width, height);
  }
}

const CHARACTER = {
  margin_left: -10,
  margin_right: 20,
  margin_top: 5,
  margin_bottom: 0,
  last_faced_direction: undefined,

  initialize: function(x, y, size, direction) {
    CHARACTER.character = new M_Character(x, y, size);
    if (direction) {
      CHARACTER.character.visual_element.face(direction);
      CHARACTER.character.visual_element.draw();
    }
    SCREEN.scroll_screen_to_character();
  },

  clear: function () {
    if (CHARACTER.character) {
       // in battles the character object remains but not the sprite (direction)
      if (CHARACTER.character.facing_direction()){
        CHARACTER.last_faced_direction = CHARACTER.character.facing_direction();
      }
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

  facing_direction: function(){
    if (CHARACTER.character.facing_direction()){
      return CHARACTER.character.facing_direction();
    } else {
      return CHARACTER.last_faced_direction;
    }
  },
};
