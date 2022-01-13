// use(Object, MovingObject)
// runtime: Rectangle, StaticSprite


class MM_Child extends ConsciousObject {
  constructor(x, y, visual, name, city) {
    super(visual, x, y, 32, 48, name, city, "child");
    this.adjust_hitbox(10, 0, 10, 5);
  }

  interaction() {
    this.face_character();
    CONSOLE.error("No interaction implemented for child.");
  }
}

class M_ChildM extends MM_Child {
  constructor(x, y, name, city) {
    super(x, y, new MovingSprite("assets/characters/child_m.png", 'obj_dark', 32, 48), name, city);
  }
}

class M_ChildF extends MM_Child {
  constructor(x, y, name, city) {
    super(x, y, new MovingSprite("assets/characters/child_f.png", 'obj_dark', 32, 48), name, city);
  }
}

class M_Priest extends ConsciousObject {
  constructor(x, y, city) {
    var visual = new MovingSprite("assets/characters/priest.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48, undefined, city, "priest");
    this.adjust_hitbox(7, 3, 20, 12);
  }

  interaction() {
    this.face_character();
    CONSOLE.error("No interaction implemented for priest.");
  }
}

class M_Boat extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/boat.png", 'obj_light', 128, 128);
    super(visual, x, y, 128, 128);
    this.adjust_hitbox(30, 0, 65, 128);
  }
}


class M_BestFriend extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/BestFriend.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }
}
class M_PreciousChild extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/PreciousChild.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }
}

class M_UpbeatDojikko extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/UpbeatDojikko.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }
}

class M_WiseOld extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/WiseOld.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }
}

class M_StreetSmart extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/StreetSmart.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }
}

class M_TraitorFisher extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/TraitorFisher.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }
}

class M_GeniusProdigy extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/GeniusProdigy.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }
}
