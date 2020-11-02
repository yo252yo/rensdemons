// runtime: LEVEL, CHARACTER

class BattleObject extends LevelObject {
    constructor(x, y, name) {
      var visual = new StaticSprite("assets/objects/" + name + ".png", 'obj_light');
      super(visual, x, y);
      this.name = name;
      var g = new Generator(x+y);
      this.seeds = [g.get(), g.get()];
      this.interactions = {};
      this.special_effect = {};
    }

    add_interaction(command, description, effect) { // this will be adapted to give things, like items or something
      this.interactions[command] = description;
      if(effect) {
        this.special_effect[command] = effect;
      }
    }

    get_special_effect(command){
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
    }

    battle_name() {
      return "objects/" + this.name;
    }
}
