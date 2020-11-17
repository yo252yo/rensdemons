
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
interactions.push(function(sprite_nb) {
  BATTLE.api.make_conversation("villager_0", "villager" + sprite_nb);
});

class M_Villager extends MovingObject {
  constructor(x, y, seed) {
    var gen = new Generator(seed);
    var sprite_nb = gen.int(5);
    var visual = new MovingSprite("assets/characters/villager" + sprite_nb + ".png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.interaction_ = interactions[gen.int(interactions.length)];
    this.sprite_nb = sprite_nb;
    this.adjust_hitbox(7, 3, 20, 12);
  }

  interaction() {
    this.face_character();
    this.interaction_(this.sprite_nb);
  }
}
