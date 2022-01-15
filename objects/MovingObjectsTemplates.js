// use(Object, MovingObject)
// runtime: Rectangle, StaticSprite


class MM_Child extends ConsciousObject {
  constructor(x, y, visual, name, city) {
    super(visual, x, y, 32, 48, name, city, "child");
    this.adjust_hitbox(10, 0, 10, 5);
  }

  interaction() {
    this.face_character();
    CONSOLE.error("No interaction implemented for child.");
  }
}

class M_ChildM extends MM_Child {
  constructor(x, y, name, city) {
    var visual = new MovingSprite("assets/characters/child_m.png", 'obj_dark', 32, 48);
    super(x, y, visual, name, city);
  }
}

class M_ChildF extends MM_Child {
  constructor(x, y, name, city) {
    var visual = new MovingSprite("assets/characters/child_f.png", 'obj_dark', 32, 48);
    super(x, y, visual, name, city);
  }
}

class M_Priest extends ConsciousObject {
  constructor(x, y, city) {
    var visual = new MovingSprite("assets/characters/priest.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48, undefined, city, "priest");
    this.adjust_hitbox(7, 3, 20, 12);
  }

  interaction() {
    this.face_character();
    CONSOLE.error("No interaction implemented for priest.");
  }
}

class M_Boat extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/boat.png", 'obj_light', 128, 128);
    super(visual, x, y, 128, 128);
    this.adjust_hitbox(30, 0, 65, 128);
  }
}


class M_BestFriend extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/BestFriend.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }
}
class M_PreciousChild extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/PreciousChild.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }

  interaction = function() {
    this.face_character();
    BATTLE.api.make('_party/_PreciousChild');
   }
}

class M_UpbeatDojikko extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/UpbeatDojikko.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }

  interaction = function(){
    this.face_character();
    if(PARTY.has_member(PARTYMEMBERS.UpbeatDojikko)){
      new TextBanner(`$$UpbeatDojikko$: "Go ahead, I'm right behind you. Just tidying a few things here."`);
    } else {
      BATTLE.api.make('_party/_UpbeatDojikko');
    }
  }
}

class M_WiseOld extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/WiseOld.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }

  interaction = function() {
    this.face_character();
    if (PARTY.has_member(PARTYMEMBERS.WiseOld)){
      TextBannerSequence.make([
        `$$WiseOld$: "I am yours to command."`,
      ]);
    } else if (INVENTORY.count("_wiseOldTraining") == 1) {
      BATTLE.api.make('_party/_WiseOldBody');
    } else if (INVENTORY.count("_wiseOldTraining") == 2) {
      BATTLE.api.make('_party/_WiseOldMind');
    } else {
      BATTLE.api.make('_party/_WiseOldHeart');
    }
  }
}

class M_StreetSmart extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/StreetSmart.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }
}

class M_TraitorFisher extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/TraitorFisher.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }

  interaction = function() {
    this.face_character();
    if (PARTY.has_member(PARTYMEMBERS.TraitorFisher)){
      TextBannerSequence.make([
        `$$TraitorFisher$: "Let's leave quickly before we get found out!"`,
      ]);
    } else {
      BATTLE.api.make('_party/_TraitorFisher');
    }
  }
}

class M_GeniusProdigy extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/GeniusProdigy.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 5);
  }

  interaction = function() {
    this.face_character();
    if (PARTY.has_member(PARTYMEMBERS.GeniusProdigy)){
      TextBannerSequence.make([
        `$$GeniusProdigy$: "Let's go! I can't wait to see what we'll discover on our way!"`,
      ]);
    } else {
      BATTLE.api.make('_party/_GeniusProdigy');
    }
  }
}
