// runtime: LEVEL


class Object {
    constructor(sprite, x, y) {
        this.visual_element = sprite;
        this.visual_element.place_at(x,y);
        this.walkable = false;
        LEVEL.index_object(this);
    }

    make_walkable() {
      this.walkable = true;
    }

    adjust_hitbox(x,y,w,h){
      this.h_x = x;
      this.h_y = y;
      this.h_w = w;
      this.h_h = h;
    }

    is_walkable(x,y) {
      if (x >= this.h_x && x <= this.h_x + this.h_w){
        if (y >= this.h_y - this.h_h && y <= this.h_y){
          if (this.walkable){
            return 1;
          } else if (! this.walkable) {
            return -1;
          }
        }
      }
      return 0;
    }
}
