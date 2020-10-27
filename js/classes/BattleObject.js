// runtime: LEVEL, CHARACTER

class BattleObject extends LevelObject {
    constructor(x, y, name) {
      var visual = new StaticSprite("assets/objects/" + name + ".png", 'obj_light');
      super(visual, x, y);
      this.name = name;
      this.seed = (new Generator(x+y)).get();
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
}

//todo move to interior
class B_Table extends BattleObject {
  constructor(x, y){
    super(x, y, "table");
    this.adjust_hitbox(0,0,31,34);

    this.set_description("This is a textbook example of a wooden table. Four sturdy wooden legs, holding planks nailed together. A table.");
    this.add_interaction("Judge", "This table has clearly seen better days. You can see on it the marks of its usage. You can't help but think of the many meals, generation after generation, that this simple piece of furniture supported.");
    this.add_interaction("Hide", "You do not want to. You know how ridiculous it would be. But you also know you cannot resist the Goddess. So you crawl under the table, and stay hidden there for a while. You're not actually hidden, everyone can see you. This is so embarassing. You finally get out, and swear to never acknowledge this happened.");
    this.add_interaction("Touch", "The Goddess makes you touch all the planks this table comprises. 13. This must mean something. Or must it?");
  }
}
