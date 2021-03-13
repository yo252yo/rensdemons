
class LayeredImage extends VisualElement {
  constructor(path, w, h, container) {
    super(0,0,0,0, container);
    this.path = path;

    this.layer1 = new StaticSprite(path.replace("$", "a"), 'background', undefined, undefined, container); //background
    this.layer2 = new StaticSprite(path.replace("$", "b"), 'obj_light', undefined, undefined, container); //void
    this.layer3 = new StaticSprite(path.replace("$", "c"), 'obj_dark', undefined, undefined, container); //obj_light

    this.layer1.draw();
    this.layer1.place_at(0, h);
    this.layer2.draw();
    this.layer2.place_at(0, h);
    this.layer3.draw();
    this.layer3.place_at(0, h);
  }
}
