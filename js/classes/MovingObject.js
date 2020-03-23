// runtime MovingSprite, PALETTE, LEVEL
// use(Object)

var _WALKING_INCREMENT = 5;
var _AUTOWALK_INCREMENT = 7;
var _IS_AT_PRECISION = 5.1;
var _AUTO_WALK_TICK = 40;

class MovingObject extends Object {
  constructor(visual, x, y, w, h) {
    super(visual, x, y);
    this.sprite = visual;

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.stop_autowalk();

    this.margin_left = -10;
    this.margin_right = 20;
    this.margin_top = 5;
    this.margin_bottom = 0;

    this.sprite.place_at(x, y);
  }

  stop_autowalk() {
      this.destination_x = -1;
      this.destination_y = -1;
  }

  gravity_center(){
    var center_x = this.x + this.width / 2;
    var center_y = this.y - this.height / 2;
    return [center_x, center_y];
  }

  _is_at_x(x) {
      return (Math.abs(this.x - x) < _IS_AT_PRECISION);
  }

  _is_at_y(y) {
      return (Math.abs(this.y - y) < _IS_AT_PRECISION);
  }

  is_at(x, y) {
      return (this._is_at_x(x) && this._is_at_y(y));
  }

  move(x, y){
    this.x += x;
    this.y += y;
    this.sprite.move(x, y);
    IO.scroll_screen();
  }

  facing_direction(){
    return this.sprite.facing_direction();
  }

  is_walking(){
     return this.destination_x  != -1 || this.destination_y != -1;
  }

  _try_move_by(dx,dy){
    if (LEVEL.is_walkable(this.x + dx, this.y+dy)){
      this.move(dx,dy);
      return true;
    }
    return false;
  }

  _try_move_up(){
    this.stop_autowalk();
    this._try_move_by(0, -1 * _WALKING_INCREMENT);
  }

  _try_move_down(){
    this.stop_autowalk();
    this._try_move_by(0, _WALKING_INCREMENT);
  }

  _try_move_left(){
    this.stop_autowalk();
    this._try_move_by(-1 * _WALKING_INCREMENT, 0);
  }

  _try_move_right(){
    this.stop_autowalk();
    this._try_move_by(_WALKING_INCREMENT, 0);
  }

  try_walk_to(x, y){
    var currently_moving = this.is_walking();
    this.destination_x = x - this.width / 2;
    this.destination_y = y + 10;

    if (!currently_moving){
      MovingObject.auto_walk(this);
    }
  }

  try_walk_by(dx, dy){
    var currently_moving = this.is_walking();
    this.destination_x = this.x + dx;
    this.destination_y = this.y + dy;

    if (!currently_moving){
      MovingObject.auto_walk(this);
    }
  }

  static auto_walk(moving_object) {
    if (! moving_object.is_walking()){
      return;
    }
    if (moving_object.is_at(moving_object.destination_x, moving_object.destination_y)){
        moving_object.stop_autowalk();
        return;
    }

    var dx = moving_object.destination_x - moving_object.x;
    var dy = moving_object.destination_y - moving_object.y;

    var coef = _AUTOWALK_INCREMENT / Math.sqrt(dx * dx + dy * dy);
    if (coef < 1){
      dx = Math.floor(dx * coef);
      dy = Math.floor(dy * coef);
    }

    if (moving_object._try_move_by(dx, dy)) {
      setTimeout(function(){ MovingObject.auto_walk(moving_object); }, _AUTO_WALK_TICK);
    } else {
      moving_object.stop_autowalk();
      return;
    }
  }
}
