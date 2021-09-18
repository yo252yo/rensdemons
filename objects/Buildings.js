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
  constructor(x, y, w, h, color, destination, texture){
    if (!color){
      color = 'background';
    }
    var visual = new Rectangle(x,y,w,h, color, texture);
    super(visual, x, y);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.visual_element.adjust_depth(-1);
    this.adjust_hitbox(10,0,w- 20,h-10);
    this.make_walkable();
    if (destination){
      this.interaction = function() {
        CURRENTLEVEL.setup(destination);
      }
    }
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


class S_WoodFloor extends S_Floor {
  constructor(x, y, w, h, outside) {
    super(x, y, w, h, undefined, undefined, "assets/patterns/wood.png");
  }
}

class S_SandFloor extends S_Floor {
  constructor(x, y, w, h, outside) {
    super(x, y, w, h, undefined, undefined, "assets/patterns/sand.png");
  }
}

class S_LushFloor extends S_Floor {
  constructor(x, y, w, h, outside) {
    super(x, y, w, h, undefined, undefined, "assets/patterns/lush.png");
  }
}

class S_MudFloor extends S_Floor {
  constructor(x, y, w, h, outside) {
    super(x, y, w, h, undefined, undefined, "assets/patterns/mud.png");
  }
}

class S_TilingFloor extends S_Floor {
  constructor(x, y, w, h, outside) {
    super(x, y, w, h, undefined, undefined, "assets/patterns/tiling.png");
  }
}

class S_ExitFloor extends S_Floor {
  constructor(x, y, w, h, outside) {
    super(x, y, w, h, 'obj_dark', outside, "assets/patterns/exit.png");
  }

  is_interactible(x,y) {
    var margin = 15;
    if (x >= this.x - margin && x <= this.x + this.w + margin) {
      if (y >= this.y - this.h - margin && y <= this.y + margin) {
        return true;
      }
    }
    return false;
  }
}

class S_TownFloor extends S_Floor {
  constructor(x, y, w, h, outside) {
    super(x, y, w, h, undefined, undefined, "assets/patterns/town.png");

    var exit = 40;

    var left_border = new S_ExitFloor(x-exit, y-h/2+h/8, exit+10, 2*h/8, outside);
    var right_border = new S_ExitFloor(x+w-10, y-h/2+h/8, exit+10, 2*h/8, outside);
    var top_border = new S_ExitFloor(x+w/2-w/8, y-h+10, 2*w/8, exit+10, outside);
    var bot_border = new S_ExitFloor(x+w/2-w/8, y+exit, 2*w/8, exit+10, outside);
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
    var base = new S_building(x, y-1, "church");
    base.make_walkable();
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

class S_Castle extends LevelObject {
  constructor(x, y, inside_lvl){
    var base = new S_building(x, y-1, "castle");
    base.make_walkable();
    var visual = new StaticSprite("assets/objects/buildings/castle2.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(10,0,460,300);

    this.default_text = this.text_interaction([
      "It's the royal castle.",
    ]);
  }
  interaction(){
    this.default_text();
  }
}
