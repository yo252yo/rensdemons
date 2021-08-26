// runtime: LEVEL

class VisualElement {
    constructor(x, y, w, h, container) {
        this.container = HTML.div.make();
        if(!container){
          container = CURRENTLEVEL.system.html();
        }
        container.appendChild(this.container);

        this.adjust_dimensions(w, h);
        this.place_at(x, y);
    }

    is_at(x,y) {
      if (x >= this.x && x <= this.x + this.width) {
        if (y >= this.y - this.height && y <= this.y) {
          return true;
        }
      }
      return false;
    }

    adjust_height(h) {
      this.height = h;
      this.container.style.height = h + "px";
      this.refresh_position();
    }

    adjust_dimensions(w,h) {
      this.height = h;
      this.width = w;
      this.container.style.width = w + "px";
      this.container.style.height = h + "px";
      this.refresh_position();
    }

    refresh_position(oldY) {
      // visual elements are indexed at their bottom left corner
      this.container.style.top = (this.y - this.height) + "px";
      this.container.style.left = this.x + "px";
      if (Math.abs(this.container.style.zIndex - oldY) < 10){
        this.container.style.zIndex = parseInt(this.y);
      }
    }

    place_at(x, y) {
      var oldY = this.y;
      this.y = parseInt(y);
      this.x = parseInt(x);
      this.refresh_position(oldY);
    }

    shift(dx, dy) {
      var oldY = this.y;
      if(dy){
        this.y += dy;
      }
      if(dx){
        this.x += dx;
      }
      this.refresh_position(oldY);
    }

    adjust_depth(z) {
      this.container.style.zIndex = parseInt(z);
    }

    get_depth(z) {
      return this.container.style.zIndex;
    }

    set_opacity(o) {
      this.container.style.opacity = o;
    }

    show() {
      this.container.style.visibility = "visible";
    }

    hide() {
      this.container.style.visibility = "hidden";
    }

    destroy() {
      try {
        CURRENTLEVEL.system.html().removeChild(this.container);
      } catch (e) {
        // could happen if LEVEL has been changed too fast
      }
      delete this;
    }

    distance_to_character() {
      var c = CHARACTER.get().gravity_center();

      var x = c[0];
      if (c[0] < this.x) {
        x = this.x;
      } else if (c[0] > this.x + this.width) {
        x = this.x + this.width;
      }

      var y = c[1];
      if (c[1] < this.y - this.height) {
        y = this.y - this.height;
      } else if (c[1] > this.y) {
        y = this.y;
      }

      var d = Math.sqrt(Math.pow(c[0] - x, 2) + Math.pow(c[1] - y, 2));
      return d;
    }
}
