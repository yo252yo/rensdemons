// runtime MovingSprite, PALETTE

const CHARACTER = {
  initialize: function(x, y){
    this.x = x;
    this.y = y;
    CHARACTER.sprite = new MovingSprite("testing/vx_chara01_a.png", PALETTE.color_player.code(), 32, 48);
    CHARACTER.sprite.place_at(x, y);
  },

  clear (){
    CHARACTER.sprite = undefined;
  },

  move(x, y){
    this.x += x;
    this.y += y;
    CHARACTER.sprite.move(x, y);
  },

};
