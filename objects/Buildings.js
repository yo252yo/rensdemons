// use(Object)
// runtime: Rectangle, StaticSprite


const CITIES = {
  hope: "hope",
  fear: "fear",
  mourning: "mourning",
  indulgence: "indulgence",
  denial: "denial",
  acceptance: "acceptance",
}



class S_Floor extends LevelObject {
  constructor(x, y, w, h, color, texture){
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
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/wood.png");
  }
}

class S_SandFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/sand.png");
  }
}

class S_LushFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/lush.png");
  }
}

class S_MapFloor extends S_Floor {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color, "assets/patterns/map.png");
  }
}

class S_MudFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/mud.png");
  }
}

class S_CloudFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/clouds.png");
  }
}

class S_GooFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/goo.png");
  }
}

class S_WebFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/web.png");
  }
}

class S_RockFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/rock.png");
  }
}

class S_LavaFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/lava.png");
  }
}

class S_TilingFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/tiling.png");
  }
}

class S_CastleFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/castle.png");
  }
}


class S_SeaFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, 'obj_dark', "assets/patterns/sea.png");
    this.walkable = false;
  }
}

class S_ExitFloor extends S_Floor {
  constructor(x, y, w, h, outside, force_new_position) {
    super(x, y, w, h, 'obj_dark', "assets/patterns/exit.png", force_new_position);

    if (outside){
      this.interaction = function() {
        CURRENTLEVEL.setup(outside, force_new_position);
      }
    }
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

  initialize_with_character() {
    CURRENTLEVEL.initialize_with_character(this.x+this.w/2, this.y-this.h/2);
  }
}

class S_TownFloor extends S_Floor {
  constructor(x, y, w, h, outside, pattern) {
    if (!pattern){
      pattern = "assets/patterns/town.png";
    }
    super(x, y, w, h, undefined, pattern);

    var exit = 40;

    this.left_border = new S_ExitFloor(x-exit, y-h/2+h/8, exit+10, 2*h/8, outside);
    this.right_border = new S_ExitFloor(x+w-10, y-h/2+h/8, exit+10, 2*h/8, outside);
    this.top_border = new S_ExitFloor(x+w/2-w/8, y-h+10, 2*w/8, exit+10, outside);
    this.bot_border = new S_ExitFloor(x+w/2-w/8, y+exit, 2*w/8, exit+10, outside);
  }
}

class S_building extends LevelObject {
  constructor(x, y, w, h, type){
    var visual = new StaticSprite("assets/objects/buildings/" + type + ".png", 'obj_dark');
    visual.specify_sprite_size(w, h);
    super(visual, x, y);
    this.adjust_hitbox(0,0,120,90);
  }
}

class S_EnterableBuilding extends LevelObject {
  constructor(visual, x, y) {
    var base = new S_building(x, y-1, 120, 157, "building");
    super(visual, x, y);
    this.base = base;
  }

  character_can_enter(){
    var dx = (CHARACTER.get().x + 15 - this.x);
    var dy = (CHARACTER.get().y - this.y);
    return (dx > 40 && dx < 80 && dy > 0);
  }

  interaction(){
    if (this.character_can_enter() && this.enter){
      this.enter();
    } else if (this.describe) {
      this.describe();
    }
  }

  destroy() {
    this.base.destroy();
    super.destroy();
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
    ], seed);
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
    ], seed);
  }

  enter() {
    GENERATEDLEVELS.store.setup(this.type, this.threshold, this.seed);
  }
}

class S_Church extends LevelObject {
  constructor(x, y, inside_lvl){
    var base = new S_building(x, y-1, 0, 0, "church");
    base.make_walkable(true);
    var visual = new StaticSprite("assets/objects/buildings/church2.png", 'obj_light');
    visual.specify_sprite_size(166, 347);
    super(visual, x, y);
    this.adjust_hitbox(0,0,170,200);
    this.inside = inside_lvl;
    this.base = base;

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

  destroy() {
    this.base.destroy();
    super.destroy();
  }
}

class S_Castle extends LevelObject {
  constructor(x, y, inside_lvl){
    var base = new S_building(x, y-1,0,0, "castle");
    base.make_walkable(true);
    var visual = new StaticSprite("assets/objects/buildings/castle2.png", 'obj_light');
    visual.specify_sprite_size(485, 432);
    super(visual, x, y);
    this.adjust_hitbox(10,0,460,300);
    this.base = base;

    this.default_text = this.text_interaction([
      "It's the royal castle.",
    ]);
  }

  interaction(){
    this.default_text();
  }

  destroy() {
    this.base.destroy();
    super.destroy();
  }
}


class S_Placeholder extends LevelObject {
  constructor(x, y, w, h){
    var visual = new Rectangle(x,y,w,h, 'white');
    super(visual, x, y);
    this.adjust_hitbox(x, y, w, h);
    this.walkable = false;
  }

  interaction(){
    this.walkable = false;
    // a non  null function to make sure this is interactible
  }
}
