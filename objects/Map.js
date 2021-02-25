// use(Object)
// runtime: Rectangle, StaticSprite

class S_Town extends LevelObject {
  constructor(x, y, destination, name, accessibility_function){
    var visual = new StaticSprite("assets/objects/map/town.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(50,-5,120,130);
    this.destination = destination;
    this.accessibility_function = accessibility_function;

    var legend = new TextBoxFitted(x+80, y+40, name);
    legend.adjust_depth(y-200);
    legend.set_opacity(0.6);
  }

  interaction() {
    if(this.accessibility_function && !this.accessibility_function()){
      new TextBanner("As you approach your destination, the Goddess strongly impresses in your mind that you are not prepared for what is to come. In Her infinite wisdom, She knows that this is not where are meant to be for now.");
    } else {
      CURRENTLEVEL.setup(this.destination);
    }
  }
}
