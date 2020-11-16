
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


class M_Villager extends MovingObject {
  constructor(x, y, seed) {
    var gen = new Generator(seed);
    var visual = new MovingSprite("assets/characters/villager" + gen.int(5) + ".png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.interaction_ = interactions[gen.int(interactions.length)];
    this.adjust_hitbox(7, 3, 20, 12);
  }

  interaction() {
    this.face_character();
    this.interaction_();
  }
}
