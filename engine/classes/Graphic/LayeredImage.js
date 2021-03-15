
class LayeredImage extends VisualElement {
  constructor(path, w, h, container) {
    super(0,0,0,0, container);
    this.path = path;

    var div = HTML.div.make({w: w, h:h, position: "absolute", float: "left", top:0, left:0});
    this.container.appendChild(div);

    this.layer1 = new StaticSprite(path.replace("$", "a"), 'background', undefined, undefined, div); //background
    this.layer2 = new StaticSprite(path.replace("$", "b"), 'obj_light', undefined, undefined, div); //void
    this.layer3 = new StaticSprite(path.replace("$", "c"), 'obj_dark', undefined, undefined,  div); //obj_light

    this.layer1.draw();
    this.layer1.place_at(0, h);
    this.layer2.draw();
    this.layer2.place_at(0, h);
    this.layer3.draw();
    this.layer3.place_at(0, h);
  }
}
