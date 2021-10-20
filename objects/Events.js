
class SB_rubble extends SBattle {
  real_interaction() {
    SPECIALBATTLES.rubble(this.battle, this.make_default_callback());
  }
}

class SB_treasure extends SBattle {
  real_interaction() {
    SPECIALBATTLES.treasure(this.battle, this.make_default_callback());
  }
}

class SE_event extends S_event {
  constructor(x, y, text, size, color) {
    super(x, y, size, color);
    this.text = text;
  }

  real_interaction() {
    var self = this;
    TextBannerSequence.make([
      this.text,
    ], function(){
      self.destroy();
      INVENTORY.increase(ITEM.XpToken);
    });
  }
}

class SE_groundItem extends S_event {
  constructor(x, y, object, quantity, size, color) {
    if (!quantity){
      quantity = 1;
    }
    super(x, y, size, color);
    this.object = object;
    this.quantity = quantity;
  }

  real_interaction() {
    INVENTORY.increase(this.object, this.quantity);
    var self = this;
    TextBannerSequence.make([
      "You found something on the ground. It's a " + self.object + ".",
    ], function(){self.destroy();});
  }

  debug_name() {
    return super.debug_name() + "/" + this.object;
  }
}

class SE_small_groundItem extends SE_groundItem {
  constructor(x, y, object) {
    super(x, y, object, 1, 25);
  }

}
