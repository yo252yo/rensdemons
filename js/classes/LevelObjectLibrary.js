// use(Object)
// runtime: Rectangle, StaticSprite

class S_Floor extends LevelObject {
  constructor(x, y, w, h) {
    var visual = new Rectangle(x,y,w,h, 'background');
    super(visual, x, y);

    this.visual_element.adjust_depth(-1);
    this.adjust_hitbox(x + 10,y,w- 20,h-10);
    this.make_walkable();
  }
}

class S_Tree extends LevelObject {
  constructor(x, y) {
    var visual = new StaticSprite("assets/tree.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(x+20,y,20,15);
    //visual.set_opacity(0.9);
    //wrong ??
  }

  interaction() {
    new TextBanner("It's a tree, mario");
  }
}

class S_House extends LevelObject {
  constructor(x, y) {
    var visual = new StaticSprite("testing/house.png", 'obj_dark');
    super(visual, x, y);
    this.adjust_hitbox(x,y,175,200);
  }

  interaction() {
    new TextBanner("It's not a tree, mario");
  }
}

class S_SavePoint extends LevelObject {
  constructor(x, y) {
    var visual = new StaticSprite("assets/savepoint.png", 'obj_dark');
    super(visual, x, y);
    this.adjust_hitbox(x+5,y-5,40,10);
  }

  interaction() {
    new TextMenu("You found an Altar of the Goddess. Will you pray that She remembers you?",
                  [
                    {"text": "Worship", "effect": function(){ return SAVE.print.save_menu(); }},
                    {"text": "Postpone", "effect": "##CLOSE"}
                 ]);
  }
}
