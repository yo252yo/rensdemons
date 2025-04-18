// use(CanvasElement)
// runtime: RESOURCES

class StaticSprite extends CanvasElement {
    constructor(path, color, width, height, container) {
      super(color, container);
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
      this.drawn = true;
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

    specify_sprite_size(w,h) { // For filler objects we need to preload w and h to avoid race conditions with image loading
        this.width = w;
        this.height = h;
        this.draw();
    }
}


class FixedSprite extends StaticSprite {
    constructor(path, color) {
      super(path, color);
      this.container.style.position = "fixed";
    }
}


class BorderedSprite extends StaticSprite {
    constructor(path, color, width, height) {
      super(path, color, width, height);
    }

    draw(){
      super.draw();
      this.html_canvas.style.background = PALETTE.text_background().code();
      this.html_canvas.style.border = "5px outset " + PALETTE.text_border().code();
    }
}
