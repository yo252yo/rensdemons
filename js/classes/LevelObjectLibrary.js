// use(Object)
// runtime: Rectangle, StaticSprite

class S_Floor extends Object {
  constructor(x, y, w, h) {
    var visual = new Rectangle(x,y,w,h, PALETTE.color_background.code());
    super(visual, x, y);

    this.visual_element.adjust_depth(-1);
    this.adjust_hitbox(x + 10,y,w- 20,h-10);
    this.make_walkable();
  }
}

class S_Tree extends Object {
  constructor(x, y) {
    var visual = new StaticSprite("testing/tree.png", PALETTE.color_obj_light.code());
    super(visual, x, y);
    this.adjust_hitbox(x+20,y,20,15);
    //wrong ??
  }
}

class S_House extends Object {
  constructor(x, y) {
    var visual = new StaticSprite("testing/house.png", PALETTE.color_obj_dark.code());
    super(visual, x, y);
    this.adjust_hitbox(x,y,175,200);
  }
}
