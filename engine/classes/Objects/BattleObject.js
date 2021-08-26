// runtime: LEVEL, CHARACTER

class BattleObject extends LevelObject {
    constructor(x, y, name, max_actions, color, size, is_event) {
      if (is_event){
        size = size ? size: 50;
        color = (color && color != "undefined") ? color: 'obj_dark';
        var visual = new StaticSprite("assets/objects/event.png", color, size, size);
      } else {
        color = color ? color: 'obj_light';
        var visual = new StaticSprite("assets/objects/" + name + ".png", color);
      }
      super(visual, x, y);
      this.name = name;
      var g = new Generator(x+y);
      this.seeds = [g.get(), g.get()];
      this.interactions = {};
      this.special_effect = {};
      this.max_actions = 2;
      this.is_event = is_event;
      if (max_actions) {
        this.max_actions = max_actions;
      }
      if(is_event){
        this.adjust_hitbox(0, 0, size, size);
      }
      this.add_interaction("Ignore", "You move away without looking back.");
    }

    add_interaction(command, description, effect) { // this will be adapted to give things, like items or something
      this.interactions[command] = description;
      if(effect) {
        this.special_effect[command] = effect;
      }
    }

    get_special_effect(command) {
      if(command in this.special_effect){
        return this.special_effect[command];
      } else {
        return function(){};
      }
    }

    set_description(description) {
      this.description = description;
    }

    interaction() {
      BATTLEOBJECTSMANAGER.interact(this);
      if (this.is_event){
        this.destroy();
      }
    }

    battle_name() {
      return "objects/" + this.name;
    }
}
