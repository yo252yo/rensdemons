// use(CanvasElement)
// runtime: RESOURCES

class StaticSprite extends CanvasElement {
    constructor(path, color, width, height) {
      super(color);
      if(width && height) {
        this.width = width;
        this.height = height;
        this.html_canvas.style.width = this.width + "px";
        this.html_canvas.style.height = this.height + "px";
      }
      this.resource = RESOURCES.get_img(path);
      var thing_to_draw = this;
      RESOURCES.onload(this.resource, function() { thing_to_draw.draw(); });
    }

    draw() {
      this.html_canvas.width = this.resource.width;
      this.html_canvas.height = this.resource.height;

      // Now that it's loaded we can measure, only if the dimensions are not imposed.
      if (!this.width && !this.height){
        this.width = this.resource.width;
        this.height = this.resource.height;
      }

      this.adjust_dimensions(this.width, this.height);
      this.html_canvas.getContext('2d').drawImage(this.resource, 0, 0);
      super.tint();
    }

    adjust_dimensions(w,h) {
        super.adjust_dimensions(w, h);
        if (this.html_canvas){
          this.html_canvas.style.width = w + "px";
          this.html_canvas.style.height = h + "px";
        }
    }

    adjust_depth(z) {
      super.adjust_depth(z);
      this.html_canvas.style.zIndex = z;
    }
}
