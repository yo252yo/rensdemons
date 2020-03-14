// runtime MovingSprite, PALETTE, LEVEL

const CHARACTER = {
  _WALKING_INCREMENT: 5,
  _AUTOWALK_INCREMENT: 7,
  _IS_AT_PRECISION: 5.1,
  _AUTO_WALK_TICK: 40,

  initialize: function(x, y){
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 48;

    this.clear_destination();

    this.margin_left = -10;
    this.margin_right = 20;
    this.margin_top = 5;
    this.margin_bottom = 0;

    this.sprite = new MovingSprite("testing/vx_chara01_a.png", PALETTE.color_player.code(), this.width, this.height);
    this.sprite.place_at(x, y);
    
    IO.scroll_screen();
  },

  clear: function (){
    this.sprite = undefined;
  },

  clear_destination: function() {
      this.destination_x = -1;
      this.destination_y = -1;
  },

  is_at_x: function(x) {
      return (Math.abs(this.x - x) < this._IS_AT_PRECISION);
  },


  is_at_y: function(y) {
      return (Math.abs(this.y - y) < this._IS_AT_PRECISION);
  },


  is_at: function(x, y) {
      return (this.is_at_x(x) && this.is_at_y(y));
  },

  move: function(x, y){
    this.x += x;
    this.y += y;
    this.sprite.move(x, y);
    IO.scroll_screen();
  },

  is_moving: function(){
     return this.destination_x  != -1 || this.destination_y != -1;
  },

  try_move_by: function(dx,dy){
    if (LEVEL.is_walkable(this.x + dx, this.y+dy)){
      this.move(dx,dy);
      return true;
    }
    return false;
  },

  try_move_up: function(){
    this.clear_destination();
    this.try_move_by(0, -1 * this._WALKING_INCREMENT);
  },
  try_move_down: function(){
    this.clear_destination();
    this.try_move_by(0, this._WALKING_INCREMENT);
  },
  try_move_left: function(){
    this.clear_destination();
    this.try_move_by(-1 * this._WALKING_INCREMENT, 0);
  },
  try_move_right: function(){
    this.clear_destination();
    this.try_move_by(this._WALKING_INCREMENT, 0);
  },

  try_move_to: function(x, y){
    var currently_moving = this.is_moving();
    this.destination_x = x - this.width / 2;
    this.destination_y = y + 10;

    if (!currently_moving){
      this.auto_walk();
    }
  },

  auto_walk: function() {
    if (! this.is_moving()){
      return;
    }
    if (this.is_at(this.destination_x, this.destination_y)){
        this.clear_destination();
        return;
    }

    var dx = this.destination_x - this.x;
    var dy = this.destination_y - this.y;

    var coef = this._AUTOWALK_INCREMENT / Math.sqrt(dx * dx + dy * dy);
    if (coef < 1){
      dx = Math.floor(dx * coef);
      dy = Math.floor(dy * coef);
    }

    if (this.try_move_by(dx, dy)) {
      setTimeout(function(){ CHARACTER.auto_walk(); }, CHARACTER._AUTO_WALK_TICK);
    } else {
      this.clear_destination();
      return;
    }
  },
};
