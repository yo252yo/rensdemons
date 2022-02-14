// use(Object)
// runtime: Rectangle, StaticSprite

class S_event extends LevelObject {
  static make_icon(icon_type, x, y) {
    var icon = new BorderedSprite(`assets/interface/${icon_type}.png`, PALETTE.text_color().code(), 200, 200);

    icon.adjust_depth(9999);
    icon.place_at(x-90, y+50);
    icon.html_canvas.id = "event_icon";
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

  make_icon(forced_type) {
    if(this.icon_type){
      this.icon = S_event.make_icon(forced_type || this.icon_type, this.x, this.y);
    }
  }

  interaction(){
    if(this.clicked){
      return;
    }
    this.make_icon();

    this.clicked = true;
    this.real_interaction();

    AUDIO.effect.lootbox();
    return true;
  }

  end_speech(make_redoable) {
    if(this.icon){
      this.icon.destroy();
    }
    if(make_redoable){
      this.clicked = false;
    }
  }

  destroy(){
    this.end_speech();
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

  display_name() {
    return "Battle: " + this.battle;
  }
}
