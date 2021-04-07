
var interactions = [];

interactions.push(function() {
  TextBannerSequence.make([
    "Villager: \"What are you doing in my house?\""
  ]);
});
interactions.push(function() {
  TextBannerSequence.make([
    "Villager: \"Get out!\""
  ]);
});
interactions.push(function(sprite_nb, seed) {
  SPECIALBATTLES.villager("hope", "villager" + sprite_nb, seed);
});

class M_NPC extends MovingObject {
  constructor(x, y, sprite) {
    var visual = new MovingSprite("assets/characters/" + sprite + ".png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(7, 3, 20, 12);
  }
}

class M_Villager extends M_NPC {
  constructor(x, y, seed) {
    var gen = new Generator(seed);
    var sprite_nb = gen.int(5);
    super(x, y, "villager" + sprite_nb);
    this.seed = gen.get();
    this.interaction_ = interactions[gen.int(interactions.length)];
    this.sprite_nb = sprite_nb;
  }

  interaction() {
    this.face_character();
    this.interaction_(this.sprite_nb, this.seed);
  }
}

class M_Vendor extends M_Villager {
  constructor(x, y, seed, type, threshold) {
    super(x,y,seed);
    this.type = type;
    this.threshold = threshold;
  }

  interaction() {
    this.face_character();
    SHOP.enter(this.type, this.threshold);
  }
}

class M_Trainer extends M_Villager {
  constructor(x, y, seed, type, threshold) {
    super(x,y,seed);
    this.type = type;
    this.threshold = threshold;
  }

  interaction() {
    this.face_character();
    TRAINER.enter(this.type, this.threshold);
  }
}
