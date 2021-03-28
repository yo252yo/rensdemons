
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

class SB_event extends SBattle {
  real_interaction() {
    SPECIALBATTLES.event(this.battle, this.make_default_callback());
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
      "You found something on the ground. It's a " + self.object + ".",
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
