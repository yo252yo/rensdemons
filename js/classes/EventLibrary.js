// use(Object)
// runtime: Rectangle, StaticSprite

class S_event extends LevelObject {
  constructor(x, y, size) {
    if (!size){
      size = 50;
    }
    var visual = new StaticSprite("assets/objects/event.png", 'obj_dark', size, size);
    super(visual, x, y);

    this.clicked = false;
    //this.visual_element.draw();
    this.adjust_hitbox(0,0,size,size);
  }

  real_interaction() {}

  interaction(){
    if(this.clicked){
      return;
    }
    this.clicked = true;
    this.real_interaction();
  }
}

class SBattle extends S_event {
  constructor(x, y, battle, size) {
    super(x, y, size);
    this.battle = battle;
  }

  make_default_callback(){
    var self = this;
    return function(){
      self.destroy();
    };
  }

  real_interaction() {
    BATTLE.api.make(this.battle, this.make_default_callback());
  }

  debug_name() {
    return super.debug_name() + "/" + this.battle;
  }
}

class SB_rubble extends SBattle {
  real_interaction() {
    BATTLE.api.make_rubble(this.battle, this.make_default_callback());
  }
}

class SB_treasure extends SBattle {
  real_interaction() {
    BATTLE.api.make_treasure(this.battle, this.make_default_callback());
  }
}

class SB_event extends SBattle {
  real_interaction() {
    BATTLE.api.make_event(this.battle, this.make_default_callback());
  }
}

class SE_treasure extends S_event {
  constructor(x, y, object, quantity, size) {
    super(x, y, size);
    this.object = object;
    this.quantity = quantity;
  }

  real_interaction() {
    INVENTORY.increase(this.object, this.quantity);
    var self = this;
    TextBannerSequence.make([
      "Ren found something on the ground. It's a " + self.object + ".",
    ], function(){self.destroy();})
  }

  debug_name() {
    return super.debug_name() + "/" + this.object;
  }
}

class SE_small_treasure extends SE_treasure {
  constructor(x, y, object) {
    super(x, y, object, 1, 25);
  }

}
