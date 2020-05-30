
class CenteredImage extends StaticSprite {
    constructor(path, color) {
      super(path, color);
      this.container.style.position = "fixed";
    }

    draw() {
      super.draw();
      
      if(! this.lvl_obj){
        this.lvl_obj = new LevelObject(this, SCREEN.width() / 2 - this.resource.width / 2, SCREEN.height() / 2);
      }
    }
}
