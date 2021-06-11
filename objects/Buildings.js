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
  constructor(x, y, w, h, color, destination){
    if (!color){
      color = 'background';
    }
    var visual = new Rectangle(x,y,w,h, color);
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

class S_TownFloor extends S_Floor {
  constructor(x, y, w, h, outside) {
    super(x, y, w, h);

    var exit = 40;

    var left_border = new S_Floor(x-exit, y+exit, exit+10, h+2*exit, 'obj_dark', outside);
    var right_border = new S_Floor(x+w-10, y + exit, exit+10, h+2*exit, 'obj_dark', outside);
    var top_border = new S_Floor(x-exit, y-h+10, w+2*exit, exit+10, 'obj_dark', outside);
    var bot_border = new S_Floor(x-exit, y+exit, w+2*exit, exit+10, 'obj_dark', outside);

  }
}

class S_Tree extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/nature/tree.png", 'obj_light');
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

class S_AlgaeWall extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/algaewall");
    this.adjust_hitbox(20,0,110,25);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Anemone extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/anemone");
    this.adjust_hitbox(0,0,20,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Coral extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/coral");
    this.adjust_hitbox(0,0,50,25);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Seashell extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/seashell");
    this.adjust_hitbox(10,0,20,10);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Seashellpointy extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/seashellpointy");
    this.adjust_hitbox(10,0,20,10);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Waterplants extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/waterplants");
    this.adjust_hitbox(0,0,40,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_PlantSmall extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/plantsmall");
    this.adjust_hitbox(0,0,30,10);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }

  is_walkable(){
    return true;
  }
}

class S_Shroomgiant extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/shroomgiant");
    this.adjust_hitbox(40,0,20,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Shroomsmall extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/shroomsmall");
    this.adjust_hitbox(0,0,30,10);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }

  is_walkable(){
    return true;
  }
}

class S_Shroomtall extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/shroomtall");
    this.adjust_hitbox(20,0,20,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Planks extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/planks");
    this.adjust_hitbox(10,0,20,10);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Pebbles extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/pebbles");
    this.adjust_hitbox(10,0,20,15);
    this.visual_element.adjust_depth(this.visual_element.y-this.visual_element.height);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }

  is_walkable(){
    return true;
  }
}

class S_RocksHuge extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/rockshuge");
    this.adjust_hitbox(10,0,130,50);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Rocks1 extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/rocks1");
    this.adjust_hitbox(20,0,50,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Rocks2 extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/rocks2");
    this.adjust_hitbox(10,0,40,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Rocks3 extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/rocks3");
    this.adjust_hitbox(0,0,40,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Rocks4 extends SimpleObject {
  constructor(x, y){
    super(x, y, "nature/rocks4");
    this.adjust_hitbox(0,0,30,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}
