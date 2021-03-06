// use(Object)
// runtime: Rectangle, StaticSprite

class S_event extends LevelObject {
  constructor(x, y, size, color) {
    if (!size){
      size = 50;
    }
    if(!color){
      color = 'obj_dark';
    }
    var visual = new StaticSprite("assets/objects/event.png", color, size, size);
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
  constructor(x, y, battle, size, color) {
    super(x, y, size, color);
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
