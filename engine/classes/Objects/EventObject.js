// use(Object)
// runtime: Rectangle, StaticSprite

class S_event extends LevelObject {
  static make_icon(icon_type, x, y) {
    var icon = new StaticSprite(`assets/interface/${icon_type}.png`, PALETTE.text_color().code(), 200, 200);

    icon.html_canvas.style.background = PALETTE.text_background().code();
    icon.html_canvas.style.border = "5px outset " + PALETTE.text_border().code();
    icon.adjust_depth(9999);
    icon.place_at(x-90, y+50);
    return icon
  }

  constructor(x, y, size, color, icon_type) {
    var sprite = '';
    if (!size){
      size = 50;
    }
    if(!color){
      color = 'obj_dark';
    }
    if (color == 'obj_light'){
    sprite = '2';
    }
    var visual = new StaticSprite(`assets/interface/event${sprite}.png`, color, size, size);
    super(visual, x, y);


    this.clicked = false;
    //this.visual_element.draw();
    this.adjust_hitbox(0,0,size,size);
    this.icon_type = icon_type || "event_text";
  }

  real_interaction() {}

  interaction(){
    if(this.clicked){
      return;
    }

    if(this.icon_type){
      this.icon = S_event.make_icon(this.icon_type, this.x, this.y);
    }

    this.clicked = true;
    this.real_interaction();

    AUDIO.effect.lootbox();
    return true;
  }

  destroy(){
    if(this.icon){
      this.icon.destroy();
    }
    super.destroy();
  }
}

class SBattle extends S_event {
  constructor(x, y, battle, size, color, is_map) {
    super(x, y, size, color, "event_swords");
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
