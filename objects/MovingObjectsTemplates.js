// use(Object, MovingObject)
// runtime: Rectangle, StaticSprite


class MM_Child extends ConsciousObject {
  constructor(x, y, visual, name, city) {
    super(visual, x, y, 32, 48, name, city, "child");
    this.adjust_hitbox(10, 0, 10, 10);
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

  think() {
    if(Math.random() < 0.5){
      super.think();
      return;
    }
    var thought = RANDOM.pick([
      `These robes are<br />so uncomfortable!`,
      `I'm itchy...`,
      `I'm so sweaty under this...`,
      `Am I supposed to look wise?`,
      `I hate to pull up<br />a spiritual front...`,
      `I just have to fake<br />a shaky voice and the kid<br />will buy it.`,
      `I hope I look<br />spiritual enough...`,
      `Ok how can I look<br />more spiritual?`,
      `Do these robes make<br />me look fat?`,
      `I sound like a crazy person...`,
    ]);
    this.actuallythink(thought);
  }
}

class M_Guard extends ConsciousObject {
  constructor(city, x, y, seed) {
    var visual = new MovingSprite("assets/characters/guard.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48, undefined, city, "guard");
    this.adjust_hitbox(7, 3, 25, 12);
    this.default_text = this.text_interaction([
      `Guard: "We need to maintain order no matter what."`,
      `Guard: "I've got my eye on you."`,
      `Guard: "You better stay in line, kiddo."`,
      `Guard: "No roughhousing in this town."`,
      `Guard: "Keep calm and keep moving."`,
      `Guard: "If you see anything suspicious, report it straight away."`,
      `Guard: "I'll make sure nothing goes wrong in this town."`,
      `Guard: "Nothing to see here, carry on."`,
      `Guard: "I'll protect this town from monsters, but also from any ill intent human."`,
    ], seed);
  }

  interaction() {
    this.face_character();
    this.default_text();
  }

  think() {
    if(Math.random() < 0.5){
      super.think();
      return;
    }
    var thought = RANDOM.pick([
      `At least I get to<br />carry a weapon...`,
      `This armor weighs a ton!`,
      `A single step takes so much<br />effort in this tin can!`,
      `This helmet looks stupid.`,
      `I can't see a thing!`,
      `I need to seem tough.`,
      `Why am I a guard again?`,
      `I hope they think<br />I'm tough enough!`,
      `What am I protecting<br />I know there won't be an<br />attack...`,
      `This is all scripted<br />of course the town is safe.`,
      `At no point in the plot<br />do I do any real fighting.`,
      `Why do we need guards if<br />the monsters are in on it?`
    ]);
    this.actuallythink(thought);
  }
}

class M_PalaceGuard extends M_Guard {
  constructor(x, y, seed) {
    super(CITIES.fear, x, y, seed);

    if(seed > 0.1){
      this.default_text = this.text_interaction([
        `Guard: "I bet they're having fun playing the game while we're here on duty..."`,
        `Guard: "We need to keep the palace safe while the nobles work on solving the big problems of the kingdom."`,
        `Guard: "Most of these rooms are for guards. The royal family does not need that much space."`,
        `Guard: "Sometimes, if a noble does really really bad at the game, they can be demoted to guard..."`,
        `Guard: "There's no shortage of security here. We got the most important people of the kingdom in the building."`,
        `Guard: "Nothing bad is going to happen to this castle on my watch."`,
        `Guard: "Maybe some day, if I do my duty really well, I'll be chosen as a Pawn in the Game!"`,
        `Guard: "I don't understand all these politics and economics talks. I'm just happy doing my simple job."`,
        `Guard: "All the complex rules of politics are way above my head. But they pay me to keep them safe, so it's fine by me."`,
        `Guard: "I almost enrolled in the army, but this is a much more comfortable job. Nothing bad ever happens here."`,
        `Guard: "Nothing ever happens here..."`,
      ], seed);
    }

    if(INVENTORY.count("_poisoned_palace_guards") >= 3 && CURRENTLEVEL.level_name.endsWith("2")) {
      this.destroy();
    }
  }
}

class M_Boat extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/boat.png", 'obj_light', 128, 128);
    super(visual, x, y, 128, 128);
    this.adjust_hitbox(30, 0, 65, 128);
  }
}

class M_Faery extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/spirit.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(7, 3, 25, 12);
  }
}


class M_BestFriend extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/BestFriend.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 10);
  }
}

class M_PreciousChild extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/PreciousChild.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 10);
  }

  interaction = function() {
    this.face_character();
    BATTLE.api.make('_party/_PreciousChild');
   }
}

class M_FemmeFatale extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/FemmeFatale.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 10);
  }

  interaction = function() {
    this.face_character();
    if (PARTY.has_member(PARTYMEMBERS.FemmeFatale)){
      TextBannerSequence.make([
        `$$FemmeFatale$: "After you... I hate to see you go, but I like to watch you leave..."`,
      ]);
    } else if (INVENTORY.count("_FemmeFataleTokens") >= 5){
      BATTLE.api.make('_party/_FemmeFatale');
    } else if (INVENTORY.count("_FemmeFataleTokens") >= 2){
      BATTLE.api.make('_party/_FemmeFatale0');
    } else {
      TextBannerSequence.make([
        `$$FemmeFatale$: "I can give you the time of your life, honey!"`,
      ]);
      INVENTORY.increase("_FemmeFataleTokens");
    }
  }
}

class M_TorturedSoul extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/TorturedSoul.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 10);
  }

  interaction = function(){
    this.face_character();
    if(PARTY.has_member(PARTYMEMBERS.TorturedSoul)){
        new TextBanner(`$$TorturedSoul$: "There is nothing for my forsaken kin in this universe. I might as well follow thee while awaiting demise. Thine doomed quest shall inexorably deliver me the conclusion that I long for."`);
    } else if( INVENTORY.count("_torturedSoulSteps") ){
      BATTLE.api.make('_party/_TorturedSoul2');
    } else {
      BATTLE.api.make('_party/_TorturedSoul');
    }
  }
}

class M_UpbeatDojikko extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/UpbeatDojikko.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 10);
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
    this.adjust_hitbox(5, 0, 20, 10);
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
    this.adjust_hitbox(5, 0, 20, 10);
  }
}

class M_TraitorFisher extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/TraitorFisher.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 10);
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
    this.adjust_hitbox(5, 0, 20, 10);
  }

  interaction = function() {
    this.face_character();
    if (PARTY.has_member(PARTYMEMBERS.GeniusProdigy)){
      TextBannerSequence.make([
        `$$GeniusProdigy$: "Let's go! I can't wait to see what we'll discover on our way!"`,
      ]);
    } else if (INVENTORY.count("_geniusInvestigation") == 1){
      BATTLE.api.make('_party/_GeniusProdigy2');
    } else {
      BATTLE.api.make('_party/_GeniusProdigy');
    }
  }
}

class M_DumbMuscles extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/DumbMuscles.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 10);

    if(PARTY.has_member(PARTYMEMBERS.DumbMuscles) ){
      this.destroy();
    }
  }

  interaction = function() {
    this.face_character();
    if (ABILITIES.has_ability("_followedByDumbMuscles")){
      TextBannerSequence.make([
        `$$DumbMuscles$: "You can count on me, mate. I'll follow you anywhere!"`,
      ]);
    } else {
      BATTLE.api.make('_party/_DumbMuscles');
    }
  }
}

class M_SnobRich extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/SnobRich.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 10);

    if(PARTY.has_member(PARTYMEMBERS.SnobRich) ){
      this.destroy();
    }
  }

  interaction = function() {
    this.face_character();
  /*  if (ABILITIES.has_ability("_followedByDumbMuscles")){
      TextBannerSequence.make([
        `$$DumbMuscles$: "You can count on me, mate. I'll follow you anywhere!"`,
      ]);
    } else {*/
      BATTLE.api.make('_party/_SnobRich');
  //  }
  }
}

class M_RetiredProtector extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/RetiredProtector.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 10);
  }

  interaction = function() {
    this.face_character();

    var self = this;
    var d = function(){
      self.destroy();
    }

    if (PARTY.has_member(PARTYMEMBERS.RetiredProtector)){
      new TextBannerRandom([
        `Ex-soldier: "I'm just waiting for my fate in this town."`,
        `Ex-soldier: "Up for a game of cards? Loser takes all."`,
        `Ex-soldier: "Sure I'm sad we lost the war, but at least now we don't have to fight anymore."`,
        `Ex-soldier: "This is as good a place as any to wait for death."`,
        `Ex-soldier: "I loved battles, but I always knew deep down we did not stand a chance."`,
        `Ex-soldier: "It's a relief to know that death is close, now I don't have to find a hobby to take up after the war."`,
        `Ex-soldier: "There's no need for soldiers when the war is already lost."`,
        `Ex-soldier: "I think this place used to be a casern. Now that our fate is sealed we come here to wait for death together."`,
        `Ex-soldier: "I don't know what this place used to be, but now it's where the men of the village gather to watch time pass."`,
      ]);
    } else {
      BATTLE.api.make('_party/_RetiredProtector', d);
    }
  }
}


class M_DisguisedPrincess extends MovingObject {
  constructor(x, y) {
    var visual = new MovingSprite("assets/characters/party/DisguisedPrincess.png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(5, 0, 20, 10);
  }

  interaction = function() {
    this.face_character();
    var press = function(){
      LEVELSTATES._states.delete(["026_castle2"]);
      CURRENTLEVEL.setup("026_castle2", [2025, 1875]);
    }

    var talk = function(){
      BATTLE.api.make('_party/_DisguisedPrincess', callback);
    }

    var callback = function(){
      SAVE.autosave();
      new CenteredTextMenu("Are you ready to attempt to sneak "+ DICTIONARY.get(PARTYMEMBERS.DisguisedPrincess) + " out of the castle?",
                    [
                      {"text": "Yes", "effect": press},
                      {"text": "No", "effect": "##CLOSE"},
                      {"text": "Talk more", "effect": talk},
                   ]
                 );
    }

    if(! INVENTORY.count(ITEM.PoisonousHerbs)){
      BATTLE.api.make('_party/_DisguisedPrincess', callback);
    } else {
      callback();
    }
  }
}

class M_Boulder extends MovingObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/mountain/boulder.png", 'obj_light', 87, 87);
    visual.walk_speed = 0.6;
    super(visual, x, y, 87,87);
    this.adjust_hitbox(0,0,87,60);
  }
}
