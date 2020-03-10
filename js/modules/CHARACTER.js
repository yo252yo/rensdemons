// runtime MovingSprite, PALETTE

const CHARACTER = {
  initialize: function(x, y){
    this.x = x;
    this.y = y;

    this.margin_left = -10;
    this.margin_right = 20;
    this.margin_top = 5;
    this.margin_bottom = 0;

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
