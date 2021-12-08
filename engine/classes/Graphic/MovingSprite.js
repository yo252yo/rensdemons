// use(CanvasElement)
// runtime: RESOURCES

var _ANIMATION_SPEED = 100;

class MovingSprite extends CanvasElement {
    constructor(path, color, width, height) {
      super(color);
      this.width = width;
      this.height = height;
      super.adjust_dimensions(this.width, this.height);

      this.sprite_index_x = 0;
      this.sprite_index_y = 0;

      this.walk_speed = 1;

      this.resource = RESOURCES.get_img(path);
      var thing_to_draw = this;
      RESOURCES.onload(this.resource, function() { thing_to_draw.draw(); });
    }

    set_walk_speed(walk_speed){
      this.walk_speed = walk_speed;
    }

    draw() {
      this.html_canvas.getContext('2d').clearRect(0, 0, this.width, this.height);
      // this fails the first time if i put it in the constructor O.o
      this.html_canvas.width = this.width;
      this.html_canvas.height = this.height;

      var source_index = [this.sprite_index_x * this.width, this.sprite_index_y * this.height];
      this.html_canvas.getContext('2d').drawImage(this.resource, source_index[0], source_index[1], this.width, this.height, 0, 0, this.width, this.height);
      super.tint();
    }

    animation_cycle() {
      var anime = this;
      if (anime.animate_lock > 0) {
          return;
      }
      anime.animate_lock = 1;
      anime.sprite_index_x = 1;
      anime.draw();
      var timeout = Math.floor(_ANIMATION_SPEED / this.walk_speed);
      setTimeout(function() {
          anime.sprite_index_x = 2; anime.draw();
              setTimeout(function() {
                  anime.sprite_index_x = 0; anime.draw(); anime.animate_lock = 0;
                  }, timeout);
          }, timeout);
    }

    shift(dx, dy, prevent_motion) {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
            this.face("RIGHT");
        }
        if (dx < 0) {
            this.face("LEFT");
        }
      } else {
        if (dy > 0) {
            this.face("DOWN");
        }
        if (dy < 0) {
            this.face("UP");
        }
      }
      this.animation_cycle();
      if (!prevent_motion){
        super.shift(dx, dy);
      }
    }

    face(direction) {
      switch(direction) {
        case "LEFT":
          this.sprite_index_y = 1;
          break;
        case "RIGHT":
          this.sprite_index_y = 2;
          break;
        case "UP":
          this.sprite_index_y = 3;
          break;
        case "DOWN": // "DOWN"
          this.sprite_index_y = 0;
          break;
        default: // "DOWN"
          break;
      }
    }

    facing_direction() {
      switch(this.sprite_index_y) {
        case 1:
          return "LEFT";
          break;
        case 2:
          return "RIGHT";
          break;
        case 3:
          return "UP";
          break;
        default:
          return "DOWN";
          break;
      }
    }

    adjust_depth(z) {
      super.adjust_depth(z);
      this.html_canvas.style.zIndex = z;
    }
}
