var make_banner_function = function(text){
  return function() {
    TextBannerSequence.make([text]);
  };
}

var get_rejection_soul = function(type, seed, indoors, gen) {
  var excuses = [];
  var threshold = 0.05;

  if(type == CITIES.acceptance){
    return undefined;
  }
  if(type == CITIES.indulgence){
    excuses.push(make_banner_function(`The villager just blows you a kiss.`));
    excuses.push(make_banner_function(`The villager winks at you, a little bit too salaciously for your taste.`));
    excuses.push(make_banner_function(`Villager: "Hello cutie, having fun?"`));

    if(indoors){
      excuses.push(make_banner_function(`Villager: "Well hello, look what the cat dragged in! Coming to my house, did you have anything in mind?"`));
      excuses.push(make_banner_function(`Villager: "I see you made yourself at home... I have an idea what we could do, if you get my drift..."`));
      threshold = 0.2;
    } else {
      threshold = 0.3;
    }
  }
  if(type == CITIES.denial){
    excuses.push(make_banner_function(`Villager: "What are you doing in my house?"`));
    excuses.push(make_banner_function(`The villager does not seem to see you. They ignore your attempts to communicate.`));
    excuses.push(make_banner_function(`The villager passes you by without noticing you, visibly deep in very happy thoughts.`));
    excuses.push(make_banner_function(`Villager: "Hello! Isn't this just the best possible day in the best possible world?"`));
    threshold = 0.33;
  }
  if(type == CITIES.fear){
    excuses.push(make_banner_function(`The villager pretends to not see you.`));
    excuses.push(make_banner_function(`The villager looks at you with a judgmental expression. It's clear they don't want anything to do with you.`));
    excuses.push(make_banner_function(`The villager gives you a dark look that chills your very soul. Never have you felt so hated by someone you did not know.`));
    excuses.push(make_banner_function(`The villager snears at you and continues their life as if you were not there.`));
    excuses.push(make_banner_function(`Villager: "What makes you think you can talk to me?"`));
    if(indoors){
      excuses.push(make_banner_function(`Villager: "Get out!"`));
      excuses.push(make_banner_function(`Villager: "What are you doing in my house?"`));
      excuses.push(make_banner_function(`Villager: "You have no business being here! This is trespassing!"`));
      threshold = 0.75;
    } else{
      threshold = 0.5;
    }
  }
  if(type == CITIES.hope){
    if(indoors){
      excuses.push(make_banner_function(`Villager: "Get out!"`));
      excuses.push(make_banner_function(`Villager: "What are you doing in my house?"`));
      threshold = 0.4
    } else {
      excuses.push(make_banner_function(`The villager just passes you by and addresses you a warm smile.`));
      excuses.push(make_banner_function(`The villager seems busy doing their own things.`));
      threshold = 0.2;
    }
  }

  if(seed < threshold) {
    return {interaction: RANDOM.pick(excuses, gen)};
  }
  return undefined;
}

var get_meta_soul = function() {
  return {
  interaction: function(sprite_nb, seed) {
    SPECIALBATTLES.villager("villagers", "villager" + sprite_nb, seed);
  }
  };
}


var get_villager_soul = function(type, gen, indoors) {
  var seed = gen.get();
  if (seed < 0.03) {
    return get_meta_soul();
  }

  var rejection_soul = get_rejection_soul(type, seed, indoors, gen);
  if (rejection_soul){
    return rejection_soul;
  }


  // Default villager battle
  // this should be changed to a BattleObject soul!
  //return new B_Statue(-1000, -1000);
  return {interaction: function(sprite_nb, seed) {
    SPECIALBATTLES.villager(type, "villager" + sprite_nb, seed);
  }};
}


class M_NPC extends MovingObject {
  constructor(x, y, sprite) {
    var visual = new MovingSprite("assets/characters/" + sprite + ".png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(7, 3, 20, 12);
  }
}

class M_Villager extends M_NPC {
  constructor(type, x, y, seed, indoors) {
    var gen = new Generator(seed);
    var sprite_nb = gen.int(5);
    super(x, y, "villager" + sprite_nb);
    this.seed = gen.get();
    this.sprite_nb = sprite_nb;
    this.soul = get_villager_soul(type, gen, indoors);
  }

  interaction() {
    this.face_character();
    this.soul.interaction(this.sprite_nb, this.seed);
  }
}

class M_Vendor extends M_Villager {
  constructor(x, y, seed, type, threshold) {
    super("", x,y,seed);
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
    super("", x,y,seed);
    this.type = type;
    this.threshold = threshold;
  }

  interaction() {
    this.face_character();
    TRAINER.enter(this.type, this.threshold);
  }
}
