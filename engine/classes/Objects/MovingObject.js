// runtime MovingSprite, PALETTE, LEVEL
// use(LevelObject)

var _BASE_WALKING_INCREMENT = 5;
var _IS_AT_PRECISION = 5.1;
var _AUTO_WALK_TICK = 30;
var _RUNNING_BONUS = 1.8;

class MovingObject extends LevelObject {

  static try_make_walk_to(moving_object, x, y, callback) {
      return moving_object.try_walk_to(x,y, callback);
  }

  constructor(visual, x, y, w, h) {
    super(visual, x, y);
    this.sprite = visual;

    this.width = w;
    this.height = h;

    this.stop_autowalk();
    this.place_at(x,y);
  }

  place_at(x,y){
    this.x = x;
    this.y = y;
    this.sprite.place_at(x, y);
  }

  _shift(x, y) {
    this.x += x;
    this.y += y;
    this.sprite.shift(x, y);
    // In case we're the character, can be optimized
    SCREEN.scroll_screen_to_character();
  }

  gravity_center() {
    var center_x = this.x + this.width / 2;
    var center_y = this.y - this.height * 0.3;
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

  facing_direction() {
    return this.sprite.facing_direction();
  }

  is_walking() {
     return this.destination_x  != -1 || this.destination_y != -1;
  }

  auto_walk_tick () {
    if (!this || !this.sprite || ! this.is_walking()) {
      this.stop_autowalk();
      return;
    }

    if (this.is_at(this.destination_x, this.destination_y)) {
        if(this.walk_callback){
          this.walk_callback();
        }
        this.stop_autowalk();
        return;
    }

    var dx = this.destination_x - this.x;
    var dy = this.destination_y - this.y;

    var coef = this._movement_increment() / Math.sqrt(dx * dx + dy * dy);
    if (coef < 1) {
      dx = Math.floor(dx * coef);
      dy = Math.floor(dy * coef);
    }

    if (this._try_walk_by_pixels(dx, dy)) {
      return true;
    } else if (this._try_walk_by_pixels(dx, 0)) {
      return true;
    } else if (this._try_walk_by_pixels(0, dy)) {
      return true;
    } else {
      this.stop_autowalk();
      return;
    }
  }

  start_auto_walk() {
    var self = this;
    this.walk_interval = setInterval(function(){
      self.auto_walk_tick();
    }, _AUTO_WALK_TICK);
  }

  stop_autowalk() {
    this.destination_x = -1;
    this.destination_y = -1;
    if(this.walk_interval){
      clearInterval(this.walk_interval);
    }
    delete this.walk_callback;
  }

  change_speed(new_speed) {
    this.sprite.walk_speed = new_speed;
  }

  _try_walk_by_pixels(dx,dy, stop_autowalk) {
    if(stop_autowalk){
      this.stop_autowalk();
    }
    if (CURRENTLEVEL.io.is_walkable(this.x + dx, this.y+dy, this)) {
      // The hash is different every time we move, so instead we'll key the sound
      // effect per class.
      AUDIO.effect.footstep(1300 / this._movement_increment(), this.constructor.name);
      this._shift(dx,dy);
      // we return false if we havent rly moved
      return (dx != 0) || (dy != 0);
    } else {
      this._shift(Math.sign(dx) * 0.001, Math.sign(dy) * 0.001);
    }
    return false;
  }

  _movement_increment() {
    if(!this.sprite || !this.sprite.walk_speed){ return 0; }
    var increment = _BASE_WALKING_INCREMENT * this.sprite.walk_speed;

    if (CHARACTER.character == this){
      increment *= (1 + _RUNNING_BONUS * MARTYRDOM.effect(MARTYRDOMS.Movement));
      if(IO_CHARACTER.is_running()) {
        increment *= _RUNNING_BONUS;
      }
    }

    return Math.floor(increment);
  }

  try_step_up() {    this.try_step(0, -1);  }
  try_step_down() {    this.try_step(0, 1);  }
  try_step_left() {    this.try_step(-1, 0);  }
  try_step_right() {    this.try_step(1, 0);   }

  try_step(unit_x, unit_y) {
    this._try_walk_by_pixels(this._movement_increment() * unit_x, this._movement_increment() * unit_y, true);
  }

  try_walk_to(x, y, callback) {
    var currently_moving = this.is_walking();
    this.destination_x = x - this.width / 2;
    this.destination_y = y + 10;
    this.walk_callback = callback;

    if (!currently_moving) {
      this.start_auto_walk();
    }
  }

  try_walk_by(dx, dy) {
    var currently_moving = this.is_walking();
    this.destination_x = this.x + dx;
    this.destination_y = this.y + dy;

    if (!currently_moving) {
      this.start_auto_walk();
    }
  }

  face_character() {
    var c = CHARACTER.get().gravity_center();
    var t = this.gravity_center();
    this.sprite.shift(c[0] - t[0], c[1] - t[1], true);
  }
}
