
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
