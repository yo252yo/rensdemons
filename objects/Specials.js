

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
        `It looks like an altar, but this one seems a bit different from the ones you've seen so far. On its surface, there is a big plate of glass, surrounded by many little blocks. Each of these blocks has a letter or a symbol carved on it.`,
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
  constructor(x, y, code) {
    super(x, y, 125, undefined, "event_text");
    this.code = code;
  }

  ask()  {
    var self = this;
    var callback = function(guess){
      var answer = S_SlimeTip.get_answer(self.code);
      if (!guess) { guess = ""; }
      guess = guess.toLowerCase();
      if(guess == answer){
        TextBannerSequence.make([
          `In a wooshing sound, the curtain of metal burrows in the ceiling, leaving the way free.`,
        ], function() { self.destroy(); });
      } else {
        TextBannerSequence.make([
          `Nothing happens`,
        ]);
      }
    }
    new PromptTextMenu("What will you say?", "", callback);
  }

  interaction() {
    var self = this;
    var tips = S_SlimeTip.get_full_tips(this.code);
    var letters = S_SlimeTip.get_full_letters(this.code);
    TextBannerSequence.make([
      `The wall is different here. In the middle of the rock, a flat sheet of metal is inscribed with runes and symbols. You summarize that it is expecting you to say some sort of password.`,
      `You remember the carvings you have seen so far.`, `${tips}`, `${letters}`
    ], function() { self.ask(); });
  }
}

class S_SlimeTip extends S_event {
  static has_tip(code){
    var t = INVENTORY.count("_slime_tips");
    return (t & (2**code)) > 0;
  }

  static get_tip_text(code){
    if(!S_SlimeTip.has_tip(code)) {
      return "???????";
    }
    switch (code) {
      case 1:
        return "The first password is that which binds";
      case 2:
        return "Forbids and restrict some actions";
      case 3:
        return "But creates a space for the minds";
      case 4:
        return "To join in common creations";

      case 5:
        return "What actors do on the big stage";
      case 6:
        return "What people do in society";
      case 7:
        return "What children do at early age";
      case 8:
        return "What even gods do presently";

      case 9:
        return "The password is a great display";
      case 10:
        return "That fascinates and lures the eye";
      case 11:
        return "An empty show, an actor's way";
      case 12:
        return "To blur the truth and mystify";

      case 13:
        return "When you look at what suits your views";
      case 14:
        return "When you idealize the past";
      case 15:
        return "When you follow that which feels true";
      case 16:
        return "Rational inquiries bypassed";

      case 17:
        return "This is only what you can see";
      case 18:
        return "Why should it dictate how you care";
      case 19:
        return "But reason past superficy";
      case 20:
        return "Is more than most people can bear";

      case 21:
        return "This is the frame that's placed on you";
      case 22:
        return "The reference that we all share";
      case 23:
        return "The fence enclosing your world view";
      case 24:
        return "As invisible as the air";
    }
  }
  static get_letters(code){
    if(!S_SlimeTip.has_tip(code)) {
      return "????";
    }
    switch (code) {
      case 1:
        return "[l]";
      case 2:
        return "[s]";
      case 3:
        return "[e] [u]";
      case 4:
        return "[r]";

      case 5:
        return "[p]";
      case 6:
        return "[a]";
      case 7:
        return "[l]";
      case 8:
        return "[y]";

      case 9:
        return "[a] [?] [c]"; // c
      case 10:
        return "[e] [t]";
      case 11:
        return "[s] [?]"; // e
      case 12:
        return "[l] [p]";

      case 13:
        return "[i]";
      case 14:
        return "[s]";
      case 15:
        return "[?]"; // a
      case 16:
        return "[b]";

      case 17:
        return "[p] [c] [?]"; // e
      case 18:
        return "[s] [?]"; // a
      case 19:
        return "[n] [e] [?]"; // a
      case 20:
        return "[?] [r] [a]"; // p

      case 21:
        return "[o]";
      case 22:
        return "[l] [?]"; // r
      case 23:
        return "[a] [?]"; // m
      case 24:
        return "[n]";
    }
  }

  static get_answer(code){
    switch (code) {
      case 'A':
        return "rules";
      case 'B':
        return "play";
      case 'C':
        return "spectacle";
      case 'D':
        return "bias";
      case 'E':
        return "appearances";
      case 'F':
        return "normal";
    }
  }

  static get_full_tips(code){
    switch (code) {
      case 'A':
        return `${S_SlimeTip.get_tip_text(1)} <br /> ${S_SlimeTip.get_tip_text(2)} <br /> ${S_SlimeTip.get_tip_text(3)} <br /> ${S_SlimeTip.get_tip_text(4)}`;
      case 'B':
        return `${S_SlimeTip.get_tip_text(5)} <br /> ${S_SlimeTip.get_tip_text(6)} <br /> ${S_SlimeTip.get_tip_text(7)} <br /> ${S_SlimeTip.get_tip_text(8)}`;
      case 'C':
        return `${S_SlimeTip.get_tip_text(9)} <br /> ${S_SlimeTip.get_tip_text(10)} <br /> ${S_SlimeTip.get_tip_text(11)} <br /> ${S_SlimeTip.get_tip_text(12)}`;
      case 'D':
        return `${S_SlimeTip.get_tip_text(13)} <br /> ${S_SlimeTip.get_tip_text(14)} <br /> ${S_SlimeTip.get_tip_text(15)} <br /> ${S_SlimeTip.get_tip_text(16)}`;
      case 'E':
        return `${S_SlimeTip.get_tip_text(17)} <br /> ${S_SlimeTip.get_tip_text(18)} <br /> ${S_SlimeTip.get_tip_text(19)} <br /> ${S_SlimeTip.get_tip_text(20)}`;
      case 'F':
        return `${S_SlimeTip.get_tip_text(21)} <br /> ${S_SlimeTip.get_tip_text(22)} <br /> ${S_SlimeTip.get_tip_text(23)} <br /> ${S_SlimeTip.get_tip_text(24)}`;
    }
  }

  static get_full_letters(code){
    switch (code) {
      case 'A':
        return `${S_SlimeTip.get_letters(1)} ${S_SlimeTip.get_letters(2)} ${S_SlimeTip.get_letters(3)} ${S_SlimeTip.get_letters(4)}`;
      case 'B':
        return `${S_SlimeTip.get_letters(5)} ${S_SlimeTip.get_letters(6)} ${S_SlimeTip.get_letters(7)} ${S_SlimeTip.get_letters(8)}`;
      case 'C':
        return `${S_SlimeTip.get_letters(9)} ${S_SlimeTip.get_letters(10)} ${S_SlimeTip.get_letters(11)} ${S_SlimeTip.get_letters(12)}`;
      case 'D':
        return `${S_SlimeTip.get_letters(13)} ${S_SlimeTip.get_letters(14)} ${S_SlimeTip.get_letters(15)} ${S_SlimeTip.get_letters(16)}`;
      case 'E':
        return `${S_SlimeTip.get_letters(17)} ${S_SlimeTip.get_letters(18)} ${S_SlimeTip.get_letters(19)} ${S_SlimeTip.get_letters(20)}`;
      case 'F':
        return `${S_SlimeTip.get_letters(21)} ${S_SlimeTip.get_letters(22)} ${S_SlimeTip.get_letters(23)} ${S_SlimeTip.get_letters(24)}`;
    }
  }

  constructor(x, y, code) {
    super(x, y, undefined, undefined, "event_text");
    this.code = code;
  }

  interaction() {
    var t = INVENTORY.count("_slime_tips");

    INVENTORY.set("_slime_tips", t | (2**this.code));

    var tip = S_SlimeTip.get_tip_text(this.code);
    var letters = S_SlimeTip.get_letters(this.code);

    TextBannerSequence.make([
      `The notice some writings carved on the rocky wall, possibly from one of your predecessors. `,
      `${tip} <br />  <br /> ${letters}`
    ]);
  }
}
