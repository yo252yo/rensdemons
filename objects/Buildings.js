// use(Object)
// runtime: Rectangle, StaticSprite


const CITIES = {
  hope: "hope",
  fear: "fear",
  indulgence: "indulgence",
  denial: "denial",
  acceptance: "acceptance",
}



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

class S_TownFloor extends S_Floor {
  constructor(x, y, w, h, outside) {
    super(x, y, w, h);

    var leaving = function() {
      CURRENTLEVEL.setup(outside);
    }
    var exit = 40;

    var left_border = new S_Floor(x-exit, y+exit, exit+10, h+2*exit, 'obj_dark');
    left_border.interaction = leaving;

    var right_border = new S_Floor(x+w-10, y + exit, exit+10, h+2*exit, 'obj_dark');
    right_border.interaction = leaving;

    var top_border = new S_Floor(x-exit, y-h+10, w+2*exit, exit+10, 'obj_dark');
    top_border.interaction = leaving;

    var bot_border = new S_Floor(x-exit, y+exit, w+2*exit, exit+10, 'obj_dark');
    bot_border.interaction = leaving;
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
  constructor(type, x, y, seed) {
    var visual = new StaticSprite("assets/objects/buildings/house.png", 'obj_light');
    super(visual, x, y);
    this.seed = seed;
    this.type = type;

    this.describe = this.text_interaction([
      "It's a house, but this is not the entrance.",
    ]);
  }

  enter() {
    GENERATEDLEVELS.house.setup(this.type, this.seed);
  }
}

class S_Store extends S_EnterableBuilding {
  constructor(type, threshold, x, y, seed) {
    var visual = new StaticSprite("assets/objects/buildings/store.png", 'obj_light');
    super(visual, x, y);
    this.type = type;
    this.seed = seed;
    this.threshold = threshold;

    this.describe = this.text_interaction([
      `This place specializes in the way of the ${this.type}. You wonder what you could learn or purchase inside...`,
    ]);
  }

  enter() {
    GENERATEDLEVELS.store.setup(this.type, this.threshold, this.seed);
  }
}

class S_Church extends LevelObject {
  constructor(x, y, inside_lvl){
    new S_building(x, y-1, "church");
    var visual = new StaticSprite("assets/objects/buildings/church2.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(0,0,170,200);
    this.inside = inside_lvl;

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
    if (this.inside && this.character_can_enter()){
      CURRENTLEVEL.setup(this.inside);
    } else {
      this.default_text();
    }
  }
}
