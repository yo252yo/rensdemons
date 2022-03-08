
class SB_rubble extends SBattle {
  constructor(x, y, battle, size, color, is_map) {
    super(x, y, battle, size, color, is_map);
    this.icon_type = "event_purse";
  }

  real_interaction() {
    SPECIALBATTLES.rubble(this.battle, this.make_default_callback());
  }

  display_name() {
    return "Rubble event";
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
    var array =  Array.from(this.text);
    if (!Array.isArray(this.text)){
      array = [this.text];
    }
    if(!array[array.length - 1].endsWith(`"`)){
      array[array.length - 1] = array[array.length - 1] + " (1xp)";
    }
    TextBannerSequence.make(array, function(){
      if(self.extra){
          self.extra();
      }
      self.destroy();
      INVENTORY.increase(ITEM.XpToken);
    });
  }

  display_name() {
    return "Text event";
  }
}

class SE_FlavorEvent extends SE_event {
  // we store only in memory
  static USED = [];

  constructor(x, y, possibleTextArrays, seed, size, color, extra) {
    super(x, y, "TBC", size, color, extra);
    this.possibleTextArrays = possibleTextArrays;
    this.gen = new Generator(seed);
  }

  pick_text(){
    var filteredpos = this.possibleTextArrays.filter(i => !SE_FlavorEvent.USED.includes(i[0]));
    if(!filteredpos.length) { // reset
      filteredpos = this.possibleTextArrays;
      // Remove all possibletext from used
      var possibleArtifacts = this.possibleTextArrays.map(i => i[0]);
      SE_FlavorEvent.USED = SE_FlavorEvent.USED.filter(i => !possibleArtifacts.includes(i));
    }

    return this.gen.pick(filteredpos);
  }

  real_interaction() {
    this.text = this.pick_text();
    SE_FlavorEvent.USED.push(this.text[0]);
    super.real_interaction();
  }
}

class SE_FillerFlavor extends SE_FlavorEvent {
  constructor(x, y, seed, filler, size, color) {
    super(x, y, [], seed, size, color);
    this.filler = filler;
  }

  real_interaction() {
    this.possibleTextArrays = this.filler.getPossibleTexts();
    super.real_interaction();
  }
}

class SE_conversation extends SE_FlavorEvent {
  constructor(x, y, seed, after_bestfriend_death, size, color) {
    var possibilities = LANGUAGE_EVENTS.get_shared(after_bestfriend_death);

    super(x, y, possibilities, seed, size, color);
    this.icon_type = "event_conversation";
  }

  display_name() {
    return "Conversation event";
  }
}

class SE_event_loot extends SE_event {

  constructor(x, y, text, size, color, extra) {
    super(x, y, text, size, color, extra);
    this.icon_type = "event_purse";
  }

  display_name() {
    return "Loot";
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
    this.icon_type = "event_purse";
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

  display_name() {
    return "Loot: " + this.object;
  }
}

class SE_small_groundItem extends SE_groundItem {
  constructor(x, y, object) {
    super(x, y, object, 1, 25);
    this.object = object;
  }

  display_name() {
    return "Loot: " + this.object;
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
