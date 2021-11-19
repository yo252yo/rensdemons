// use(Object, MovingObject)
// runtime: Rectangle, StaticSprite


class MM_Child extends MovingObject {
  constructor(x, y, visual, name, city) {
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(10, 0, 10, 5);
    if(name){
      this.name = name;
      LEDGER.record_birth(this.name, city, "child");
    }
  }

  interaction() {
    this.face_character();
    CONSOLE.error("No interaction implemented for child.");
  }

  record_death() {
    if(this.name){
      LEDGER.record_death(this.name, "child");
    }
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

class M_Priest extends MovingObject {
  constructor(x, y, city) {
    var visual = new MovingSprite("assets/characters/priest.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(7, 3, 20, 12);

    if(city){
      var gen = new Generator(x + y + STRING_UTILS.hash_str_to_int(city));
      this.name = gen.pick(DATASETS.male_names);
      LEDGER.record_birth(this.name, city, "priest");
    }
  }

  interaction() {
    this.face_character();
    CONSOLE.error("No interaction implemented for priest.");
  }

  record_death() {
    if(this.name){
      LEDGER.record_death(this.name, "priest");
    }
  }
}
