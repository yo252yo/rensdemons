
class CenteredImage extends FixedSprite {
    constructor(path, color, scale) {
      super(path, color);
      this.scale = scale || 1;
      this.draw();
    }

    draw() {
      super.draw();
      this.adjust_dimensions(this.width * this.scale, this.height * this.scale);
      if(! this.lvl_obj){
        this.lvl_obj = new LevelObject(this, SCREEN.width() / 2 - this.resource.width / 2, Math.max(SCREEN.height() / 2 - 50, this.resource.height));
      } else{
        this.lvl_obj.place_at( SCREEN.width() / 2 - this.resource.width  * this.scale / 2, Math.max(SCREEN.height() / 2 - 50, this.resource.height));
      }
    }
}

class CenteredMovingImage extends MovingSprite {

    constructor(path, color, width, height, scale) {
      super(path, color, width, height);
      this.scale = scale || 1;
      this.container.style.position = "fixed";
      // this.place_at(SCREEN.width() / 2 - this.resource.width / 2, SCREEN.height() / 2);
      this.draw();
    }

    shift(dx, dy) {
      // using MovingSprite.shift performs weirdly, it does something to the canvas :x
      CanvasElement.prototype.shift.call(this, dx, dy, true);
    }

    draw() {
      super.draw();
      this.html_canvas.style.width = this.width * this.scale;
      this.html_canvas.style.height = this.height * this.scale;

      if(! this.lvl_obj){
        this.lvl_obj = new LevelObject(this, SCREEN.width() / 2 - this.width / 2, Math.max(SCREEN.height() / 2 - 50, this.height));
      } else {
        this.lvl_obj.place_at( SCREEN.width() / 2 - this.width  * this.scale / 2, Math.max(SCREEN.height() / 2 - 50, this.height));
      }
    }

}
