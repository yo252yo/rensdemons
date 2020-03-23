// use(Object, MovingObject)
// runtime: Rectangle, StaticSprite

class M_ChildM extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/child_m.png", PALETTE.color_obj_dark.code(), 32, 48);
    super(visual, x, y, 32, 48);
    this.visual = visual;
//    this.adjust_hitbox(x+20,y,20,15);
    //visual.set_opacity(0.9);
    //wrong ??
  }

  interaction() {
    this.try_walk_by(100,100);
    //new TextBanner("It's a mchild, mario");
//    this.visual.move(10,10);
  }
}


  class M_ChildF extends MovingObject {
    constructor(x, y) {
      var visual = new MovingSprite("assets/child_f.png", PALETTE.color_obj_dark.code(), 32, 48);
      super(visual, x, y, 32, 48);
      this.visual = visual;
  //    this.adjust_hitbox(x+20,y,20,15);
      //visual.set_opacity(0.9);
      //wrong ??
    }

    interaction() {
      //new TextBanner("It's a fchild, mario");
      this.try_walk_by(-50,-50);
    }
}

  class M_Priest extends MovingObject {
    constructor(x, y) {
      var visual = new MovingSprite("assets/priest.png", PALETTE.color_obj_dark.code(), 32, 48);
      super(visual, x, y, 32, 48);
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
