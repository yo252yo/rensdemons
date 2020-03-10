// use(MovingSprite)

const CHARACTER = {
  initialize: function(color, x, y){
    CHARACTER.sprite = new MovingSprite("testing/vx_chara01_a.png", color, 32, 48);
    CHARACTER.sprite.place_at(x, y);
  },

  clear (){
    CHARACTER.sprite = undefined;
  },

};
