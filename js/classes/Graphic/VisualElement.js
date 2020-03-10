// runtime: LEVEL

class VisualElement {
    constructor(x, y, w, h) {
        this.container = document.createElement('div');
        this.container.style.position = "absolute";
        LEVEL.html().appendChild(this.container);

        this.adjust_dimensions(w, h);
        this.place_at(x, y);
    }

    adjust_dimensions(w,h){
      this.height = h;
      this.container.style.width = w + "px";
      this.container.style.height = h + "px";
      this.refresh_position();
    }

    refresh_position() {
      // visual elements are indexed at their bottom left corner
      this.container.style.top = (this.y - this.height) + "px";
      this.container.style.left = this.x + "px";
      this.container.style.zIndex = this.y;
    }

    place_at(x, y){
      this.y = y;
      this.x = x;
      this.refresh_position();
    }

    move(dx, dy){
      this.y += dy;
      this.x += dx;
      this.refresh_position();
    }

    adjust_depth(z){
      this.container.style.zIndex = z;
    }
}
