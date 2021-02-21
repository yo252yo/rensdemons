// use(Object)
// runtime: Rectangle, StaticSprite

class S_Town extends LevelObject {
  constructor(x, y, destination, name){
    var visual = new StaticSprite("assets/objects/map/town.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(30,-5,140,130);
    this.destination = destination;
    this.name = name;
  }

  interaction() {
    CURRENTLEVEL.setup(this.destination);
  }
}
