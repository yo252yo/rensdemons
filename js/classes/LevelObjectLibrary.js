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
    var visual = new StaticSprite("assets/tree.png", PALETTE.color_obj_light.code());
    super(visual, x, y);
    this.adjust_hitbox(x+20,y,20,15);
    //visual.set_opacity(0.9);
    //wrong ??
  }

  interaction() {
    new TextBanner("It's a tree, mario");
  }
}

class S_House extends Object {
  constructor(x, y) {
    var visual = new StaticSprite("testing/house.png", PALETTE.color_obj_dark.code());
    super(visual, x, y);
    this.adjust_hitbox(x,y,175,200);
  }

  interaction() {
    new TextBanner("It's not a tree, mario");
  }
}

class M_ChildM extends Object {
  constructor(x, y) {
    var visual = new MovingSprite("assets/child_m.png", PALETTE.color_obj_dark.code(), 32, 48);
    super(visual, x, y);
    this.visual = visual;
//    this.adjust_hitbox(x+20,y,20,15);
    //visual.set_opacity(0.9);
    //wrong ??
  }

  interaction() {
    new TextBanner("It's a mchild, mario");
//    this.visual.move(10,10);
  }
}


  class M_ChildF extends Object {
    constructor(x, y) {
      var visual = new MovingSprite("assets/child_f.png", PALETTE.color_obj_dark.code(), 32, 48);
      super(visual, x, y);
      this.visual = visual;
  //    this.adjust_hitbox(x+20,y,20,15);
      //visual.set_opacity(0.9);
      //wrong ??
    }

    interaction() {
      new TextBanner("It's a fchild, mario");
  //    this.visual.move(10,10);
    }
}

  class M_Priest extends Object {
    constructor(x, y) {
      var visual = new MovingSprite("assets/priest.png", PALETTE.color_obj_dark.code(), 32, 48);
      super(visual, x, y);
      this.visual = visual;
  //    this.adjust_hitbox(x+20,y,20,15);
      //visual.set_opacity(0.9);
      //wrong ??
    }

    interaction() {
      new TextBanner("It's a priest, mario");
  //    this.visual.move(10,10);
    }
}
