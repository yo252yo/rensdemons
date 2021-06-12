
class S_Tree extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/forest/tree.png", 'obj_light');
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

class S_AlgaeWall extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/algaewall");
    this.adjust_hitbox(20,0,110,25);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Anemone extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/anemone");
    this.adjust_hitbox(0,0,20,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Coral extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/coral");
    this.adjust_hitbox(0,0,50,25);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Seashell extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/seashell");
    this.adjust_hitbox(10,0,20,10);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Seashellpointy extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/seashellpointy");
    this.adjust_hitbox(10,0,20,10);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Waterplants extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/waterplants");
    this.adjust_hitbox(0,0,40,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_PlantSmall extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/plantsmall");
    this.adjust_hitbox(0,0,30,10);
    this.default_text = this.text_interaction([
      "...",
    ]);
    this.walkable = true;
  }
}

class S_Shroomgiant extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/shroomgiant");
    this.adjust_hitbox(40,0,20,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Shroomsmall extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/shroomsmall");
    this.adjust_hitbox(0,0,30,10);
    this.default_text = this.text_interaction([
      "...",
    ]);
    this.walkable = true;
  }
}

class S_Shroomtall extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/shroomtall");
    this.adjust_hitbox(20,0,20,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Planks extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/planks");
    this.adjust_hitbox(10,0,20,10);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Pebbles extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/pebbles");
    this.adjust_hitbox(10,0,20,15);
    this.visual_element.adjust_depth(this.visual_element.y-this.visual_element.height);
    this.default_text = this.text_interaction([
      "...",
    ]);
    this.walkable = true;
  }
}

class S_RocksHuge extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rockshuge");
    this.adjust_hitbox(10,0,130,50);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Rocks1 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks1");
    this.adjust_hitbox(20,0,50,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Rocks2 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks2");
    this.adjust_hitbox(10,0,40,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Rocks3 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks3");
    this.adjust_hitbox(0,0,40,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Rocks4 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks4");
    this.adjust_hitbox(0,0,30,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Web extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/web");
    this.adjust_hitbox(0,0,100,40);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_WebLarge extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/weblarge");
    this.adjust_hitbox(0,0,190,30);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}

class S_Bocals extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/bocals");
    this.adjust_hitbox(0,0,30,20);
    this.default_text = this.text_interaction([
      "...",
    ]);
  }
}
