// use(Object)
// runtime: Rectangle, StaticSprite

class S_Floor extends LevelObject {
  constructor(x, y, w, h, color){
    if (!color){
      color = 'background';
    }
    var visual = new Rectangle(x,y,w,h, color);
    super(visual, x, y);

    this.visual_element.adjust_depth(-1);
    this.adjust_hitbox(10,0,w- 20,h-10);
    this.make_walkable();
  }

  draw_hitbox(even_floors){
    if(even_floors){
      super.draw_hitbox();
    }
  }

  get_depth() {
    return -1;
  }
}

class S_Tree extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/buildings/tree.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(20,0,20,15);
    this.default_text = this.text_interaction([
      "It's a tree.",
      "Lustrous leaves, bulky branches... yes, definitely a tree.",
      "The foliage of the tree casts a pleasant shadow.",
      "It's a completely normal tree, hiding nothing whatsoever.",
    ]);
  }

  interaction(){
    if (this.hidden_in){
      this.hidden_in.place_at(this.visual_element.x, this.visual_element.y - 20);
      this.hidden_in.try_walk_by(-40, 30);
      this.hidden_in.interaction();
      this.hidden_in = null;
    } else {
      this.default_text();
    }
  }

  hide_in(object){
    this.hidden_in = object;
  }
}

class S_building extends LevelObject {
  constructor(x, y, type){
    var visual = new StaticSprite("assets/objects/buildings/" + type + ".png", 'obj_dark');
    super(visual, x, y);
    this.adjust_hitbox(0,0,120,90);
  }
}

class S_EnterableBuilding extends LevelObject {
  constructor(visual, x, y) {
    new S_building(x, y-1, "building");
    super(visual, x, y);
  }

  character_can_enter(){
    var dx = (CHARACTER.get().x + 15 - this.x) / 165;
    var dy = (CHARACTER.get().y - this.y);
    return (dx > 0.3 && dx < 0.7 && dy > 0);
  }

  interaction(){
    if (this.character_can_enter() && this.enter){
      this.enter();
    } else if (this.describe) {
      this.describe();
    }
  }
}

class S_House extends S_EnterableBuilding {
  constructor(x, y, seed) {
    var visual = new StaticSprite("assets/objects/buildings/house.png", 'obj_light');
    super(visual, x, y);
    this.seed = seed;

    this.describe = this.text_interaction([
      "It's a house, but this is not the entrance.",
    ]);
  }

  enter() {
    GENERATEDLEVELS.house.setup(this.seed);
  }
}

class S_Store extends S_EnterableBuilding {
  constructor(x, y) {
    var visual = new StaticSprite("assets/objects/buildings/store.png", 'obj_light');
    super(visual, x, y);

    this.describe = this.text_interaction([
      "It's a store. You wonder what kind of goods they sell here. You're a bit excipted to find out.",
    ]);
  }

  enter() {
    GENERATEDLEVELS.store.setup();
  }
}

class S_Church extends LevelObject {
  constructor(x, y, seed){
    new S_building(x, y-1, "church");
    var visual = new StaticSprite("assets/objects/buildings/church2.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,170,200);
    this.default_text = this.text_interaction([
      "It's a temple, but this is not the entrance.",
    ]);
  }

  character_can_enter(){
    var dx = (CHARACTER.get().x + 15 - this.x) / 175;
    var dy = (CHARACTER.get().y - this.y);
    return (dx > 0.3 && dx < 0.7 && dy > 0);
  }

  interaction(){
    if (this.character_can_enter()){
      CURRENTLEVEL.setup("004_trial_end");
    } else {
      this.default_text();
    }
  }
}
