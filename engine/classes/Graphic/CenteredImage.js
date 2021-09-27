
class CenteredImage extends FixedSprite {
    draw() {
      super.draw();

      if(! this.lvl_obj){
        this.lvl_obj = new LevelObject(this, SCREEN.width() / 2 - this.resource.width / 2, Math.max(SCREEN.height() / 2, this.resource.height));
      }
    }
}
