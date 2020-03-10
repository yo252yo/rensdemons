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
      this.h_x = x - CHARACTER.margin_right;
      this.h_y = y + CHARACTER.margin_top;
      this.h_w = w + CHARACTER.margin_left + CHARACTER.margin_right;
      this.h_h = h + CHARACTER.margin_top + CHARACTER.margin_bottom;
    }

    draw_hitbox(){

      var html_rectangle = document.createElement('div');
      html_rectangle.style.top = (this.h_y - this.h_h) + "px";
      html_rectangle.style.left = this.h_x + "px";
      html_rectangle.style.width = this.h_w + "px";
      html_rectangle.style.height = this.h_h + "px";
      html_rectangle.style.position = "absolute";
      html_rectangle.style.border = "3px dotted";
      html_rectangle.style.margin = "-3px";

      document.body.appendChild(html_rectangle);
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
