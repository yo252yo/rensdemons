// use(Object, MovingObject)
// runtime: Rectangle, StaticSprite


class MM_Child extends MovingObject {
  constructor(x, y, visual) {
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(10, 0, 10, 5);
  }

  interaction() {
    console.log("TBD");
  }
}

class M_ChildM extends MM_Child {
  constructor(x, y) {
    super(x, y, new MovingSprite("assets/child_m.png", 'obj_dark', 32, 48));
  }
}

class M_ChildF extends MM_Child {
  constructor(x, y) {
    super(x, y, new MovingSprite("assets/child_f.png", 'obj_dark', 32, 48));
  }
}

class M_Priest extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/priest.png", 'obj_dark', 32, 48);
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
