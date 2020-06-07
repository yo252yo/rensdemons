// runtime: LEVEL, CHARACTER


class LevelObject {
    constructor(sprite, x, y) {
        this.x = x;
        this.y = y;
        this.visual_element = sprite;
        if (CURRENTLEVEL.objects.should_hide(this.hash())){
          return;
        }

        this.visual_element.place_at(x,y);
        this.walkable = false;
        CURRENTLEVEL.objects.index_object(this);
    }

    hash() {
      return this.constructor.name + "/" + this.x + "/" + this.y;
    }

    get_visual() {
      return this.visual_element;
    }

    make_walkable() {
      this.walkable = true;
    }

    adjust_hitbox(x,y,w,h) {
      this.h_x = x - CHARACTER.get().margin_right;
      this.h_y = y + CHARACTER.get().margin_top;
      this.h_w = w + CHARACTER.get().margin_left + CHARACTER.get().margin_right;
      this.h_h = h + CHARACTER.get().margin_top + CHARACTER.get().margin_bottom;
    }

    draw_hitbox() {
      var html_rectangle = HTML.div.make({
        w:this.h_w,
        h:this.h_h,
        top:(this.visual_element.y + this.h_y - this.h_h),
        left:(this.visual_element.x + this.h_x),
      });
      html_rectangle.innerHTML = this.visual_element.x + "," + this.visual_element.y + "," + this.visual_element.width + "," + this.visual_element.height;
      html_rectangle.style.position = "absolute";
      html_rectangle.style.border = "3px dotted";
      html_rectangle.style.margin = "-3px";

      CURRENTLEVEL.system.html().appendChild(html_rectangle);
    }

    get_depth() {
      return this.visual_element.get_depth();
    }

    is_at_hitbox(x,y) {
      if (x >= this.visual_element.x + this.h_x && x <= this.visual_element.x + this.h_x + this.h_w) {
        if (y >= this.visual_element.y + this.h_y - this.h_h && y <= this.visual_element.y + this.h_y) {
          return true;
        }
      }
      return false;
    }

    is_at_sprite(x,y) {
      return this.visual_element.is_at(x,y);
    }

    is_interactible(x, y) {
      return (this.interaction && this.is_at_sprite(x,y));
    }

    is_walkable(x,y) {
      if (this.is_at_hitbox(x,y)) {
        if (this.walkable) {
          return 1;
        } else if (! this.walkable) {
          return -1;
        }
      }
      return 0;
    }

    distance_to_character() {
      var c = CHARACTER.get().gravity_center();

      var x = c[0];
      if (c[0] < this.visual_element.x) {
        x = this.visual_element.x;
      } else if (c[0] > this.visual_element.x + this.visual_element.width) {
        x = this.visual_element.x + this.visual_element.width;
      }

      var y = c[1];
      if (c[1] < this.visual_element.y - this.visual_element.height) {
        y = this.visual_element.y - this.visual_element.height;
      } else if (c[1] > this.visual_element.y) {
        y = this.visual_element.y;
      }

      var d = Math.sqrt(Math.pow(c[0] - x, 2) + Math.pow(c[1] - y, 2));
      return d;
    }

    destroy() {
      if (this.visual_element){
        this.visual_element.destroy();
      }
      CURRENTLEVEL.objects.remove_object(this);
      delete this;
    }
}
