

class S_BookshelfBig extends SimpleObject {
  constructor(x, y, seed){
    super(x, y, 145, 142, "heaven/bookshelf_big");
    this.adjust_hitbox(-5,0,150, 70);

    this.default_text = function(){
      BATTLE.api.make("_060/_book");
    }
  }
}

class S_Bookshelf extends SimpleObject {
  constructor(x, y, seed){
    super(x, y, 50, 98, "heaven/bookshelf");
    this.adjust_hitbox(-5,0,57, 50);

    this.default_text = function(){
      BATTLE.api.make("_060/_book");
    }
  }
}

class S_Tomb extends SimpleObject {
  constructor(x, y, seed){
    var gen = new Generator(seed);
    switch(gen.int(3)){
      case 0:
        super(x, y, 26, 50, "heaven/tomb1");
        this.adjust_hitbox(0,0,26,20);

        break;
    case 1:
      super(x, y, 45, 72, "heaven/tomb2");
      this.adjust_hitbox(0,0,40,30);

      break;
    case 2:
      super(x, y, 26, 31, "heaven/tomb3");
      this.adjust_hitbox(0,0,25,15);

      break;
    }

    this.engrave(gen);
  }


  engrave(gen) {
    var type = gen.get();
    var selfproba = 0.25 * Math.min(STATS.get(STAT.Death) / 100, 1);
    if(type < 0.05) {
      var villager = LEDGER.get_throwaway_villager(gen.get());
      var birth = (new Date(villager.birth)).toLocaleString();
      var death = (new Date(villager.death)).toLocaleString();
      var cod = gen.pick(["Stillborn", "Dead on creation", "Crushed to make a tombstone", "Killed to make decorations", "Turned into stone", "Slaughtered for aesthetic enjoyment", "Murdered to make a point"]);
      this.default_text = this.text_interaction([`${villager.name} of ${villager.city}<br />${cod}<br /> ${birth} - ${death}`]);
    } else if(type < 0.1 && !S_Tomb.done_bf) {
      var birth = (new Date(DISK._CONTENT["#DISK_STATE_IDENTIFIER"])).toLocaleString();
      var death = (new Date(STATS.flag("KilledBestFriend"))).toLocaleString();
      this.default_text = this.text_interaction([`$$BestFriend$ of ${DICTIONARY.get("town_1")}<br />Killed by a demon<br /> ${birth} - ${death}`]);
      S_Tomb.done_bf = true;
    } else if(type < 0.1 + selfproba && !S_Tomb.done_self) {
      this.default_text = this.text_interaction([`$$Ren$ of ${DICTIONARY.get("town_1")}<br />The Promised Child<br />Abandonned by the gods`]);
      S_Tomb.done_self = true;
    } else {
      var villager = LEDGER.get_villager(gen.get());
      var birth = (new Date(villager.birth)).toLocaleString();
      var death = (new Date(villager.death)).toLocaleString();
      var cod = gen.pick(["Assassinated by an otherwordly power", "Slain by a god", "Discarded after use", "Exterminated by a machine", "Wiped out of existence", "Recycled into more content", "Murdered for personal enjoyment", "Slaughtered for a higher being's pleasure", "Crushed to free up space", "Eradicated for amusement", "Discarded like a used toy", "Gone and forgotten", "Murdered without cause", "Killed by the system", "Obliterated by tradition", "Destroy by gods' disinterest", "Killed by you", "Murdered by you", "Slaughtered by you", "Destroyed by you", "Killed for your pleasure", "Massacred for your enjoyment", "Gave their life so you could go on", "Died because of you"]);
      this.default_text = this.text_interaction([`${villager.name} of ${villager.city}<br />${cod}<br /> ${birth} - ${death}`]);
    }
  }
}

class S_MagicMirror extends SimpleObject {
  constructor(x, y, seed){
    super(x, y, 50, 98, "heaven/mirror");
    this.adjust_hitbox(-5,0,57, 50);

    this.default_text = function(){
      BATTLE.api.make("_060/_mirror");
    }
  }
}


class S_Computer extends SimpleObject {
  constructor(x, y, seed){
    super(x, y, 50,50, "interior/savepoint");
    this.adjust_hitbox(5,-5,40,20);



    var nothing = function(){
      TextBannerSequence.make([`That did not do anything.`]);
    }
    var turnoff = function(){
      TextBannerSequence.make([`The light fades out from the glass plate, and everything comes back to the state it was when you first got here.`]);
    }

    var lookat = function(){
     new CenteredTextMenu("What will you do?",
                   [
                     {"text": "Look at the glass screen", "effect": function(){BATTLE.api.make('_demo/_screen')}},
                     {"text": "Walk away", "effect": turnoff},
                  ]
                );
    }

    var turnon = function(){
      TextBannerSequence.make([
        `As soon as your finger touches the glass, the humming grows louder, and the glass becomes imbued with a light glow. In an instant, shapes start forming on the lit surface. First, you see a wheel spinning slowly. Then it fades away to display the silhouette of a child in front of an altar on a flat colored background. You distinguish some text in a box.`,
      ], lookat);
    }

    var approach = function(){
      new CenteredTextMenu("What will you do?",
                    [
                      {"text": "Touch the glass", "effect": turnon},
                      {"text": "Touch a block", "effect": nothing},
                      {"text": "Nothing", "effect": "##CLOSE"},
                   ]
                 );
    }

    this.default_text = function(){
      TextBannerSequence.make([
        `It's an altar, but this one seems a bit different from the ones you've seen so far. On its surface, there is a big plate of glass, surrounded by many little blocks. Each of these blocks has a letter or a symbol carved on it.`,
      ], approach);
    }
  }
}

class S_Whirlwind extends SimpleObject {
  constructor(x, y, seed, destination){
    super(x, y, 46, 44, "water/whirlwind");
    this.adjust_hitbox(0,0,46,44);

    var gen = new Generator(seed);
    var tp = function(){
      if(!destination){
        CURRENTLEVEL.setup("013_sirens2", [1100 + gen.get() * 2325,2175 - gen.get() * 1300]);
      } else{
        CURRENTLEVEL.setup(destination);
      }
    }
    this.default_text = function(){
      TextBannerSequence.make([
        `You get sucked in a whirlwind of water.`,
        `The current drags you to a totally different part of the lake.`,
      ], tp);
    }
  }
}



class S_SlimeDoor extends S_event {
  constructor(x, y, answer) {
    super(x, y, 125, undefined, "event_text");
    this.answer = answer;
  }

  ask()  {
    var guess = prompt("What will you say?");
    if (!guess) { guess = ""; }
    guess = guess.toLowerCase();
    if(guess == this.answer){
      var self = this;
      TextBannerSequence.make([
        `In a wooshing sound, the curtain of metal burrows in the ceiling, leaving the way free.`,
      ], function() { self.destroy(); });
    } else {
      TextBannerSequence.make([
        `Nothing happens`,
      ]);
    }
  }

  interaction() {
    var self = this;
    TextBannerSequence.make([
      `The wall is different here. In the middle of the rock, a flat sheet of metal is inscribed with runes and symbols. You summarize that it is expecting you to say some sort of password.`,
    ], function() { self.ask(); });
  }

}
