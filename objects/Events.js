
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
  constructor(x, y, text, size, color, extra) {
    super(x, y, size, color);
    this.text = text;
    this.extra = extra;
  }

  real_interaction() {
    var self = this;
    var array = this.text;
    if (!Array.isArray(this.text)){
      array = [this.text];
    }
    TextBannerSequence.make(array, function(){
      if(self.extra){
          self.extra();
      }
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

  real_interaction(extra_callback) {
    INVENTORY.increase(this.object, this.quantity);
    var self = this;
    TextBannerSequence.make([
      "You found something on the ground. It's a " + self.object + ".",
    ], function(){
      self.destroy();
      if(extra_callback){
        extra_callback();
      }
    });
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

class SB_SavageChild extends SBattle {
  real_interaction() {
    this.destroy();
    
    if (INVENTORY.count("_donated_meat") < 3) {
      BATTLE.api.make('_party/_SavageChild');
    } else if(INVENTORY.count("_donated_meat") < 6) {
      BATTLE.api.make('_party/_SavageChild2');
    } else {
      BATTLE.api.make('_party/_SavageChild3');
    }
  }
}
