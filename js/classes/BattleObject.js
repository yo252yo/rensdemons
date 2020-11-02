// runtime: LEVEL, CHARACTER

class BattleObject extends LevelObject {
    constructor(x, y, name) {
      var visual = new StaticSprite("assets/objects/" + name + ".png", 'obj_light');
      super(visual, x, y);
      this.name = name;
      var g = new Generator(x+y);
      this.seeds = [g.get(), g.get()];
      this.interactions = {};
    }

    add_interaction(command, description) { // this will be adapted to give things, like items or something
      this.interactions[command] = description;
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
