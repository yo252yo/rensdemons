// Maps to dictionary keys
const PARTYMEMBERS = {
  Ren: "Ren",
  BestFriend: "BestFriend",
   // TorturedSoul: "TorturedSoul", // dark emo antihero maverik trop dark, poet/bard/jester/minstrel/painter:
   // StreetSmart: "StreetSmart", // the rogue with the heart of gold / pirate / treasure hunter   /The Smart/street wise Guy     Beast master (falcon/horse)
   // WiseOld: "WiseOld", //  wise old fool /  Scholar
   // RetiredProtector: "RetiredProtector", //  Retired or rebel military / commander / hardboiled warrior / vailiant protector   tactitian
   // DumbMuscles: "DumbMuscles",//  The Big Guy strong and dumb      brute force
   // SnobRich: "SnobRich", //the snob/uptight rich merchant   banker
   // SavageChild: "SavageChild", //brawnish/savage girl/enfant loup
   // FemmeFatale: "FemmeFatale", // prostitute/ femme fatale
   // DisguisedPrincess: "DisguisedPrincess", //magical princess / noble / hidden prince  girl disguised as boi       herboriste/traps/poison
   // UpbeatDojikko: "UpbeatDojikko", //  perky and upbeat airhead / mascot? /   necroman/occultist/paranormal/tarot
   // PreciousChild: "PreciousChild", //shota / supporting innocent youth / precious kid
   // GeniusProdigy: "GeniusProdigy", //child prodigy
   // TraitorFisher: "TraitorFisher", //  traitor   fisherman/cook
};

const PARTY = {
  _members: [],

  description: function(name) {
    switch (name) {
      case "Ren":
        if (ABILITIES.has_ability("_trial_passed")){
          return `You are a child of ${DICTIONARY.get("town_1")}. After succeeding in the Trial of the Second-Borns, you have learned that you are the The Promised Child. The Goddess chose you to bring salvation to the world of ${DICTIONARY.get("world_name")} and its inhabitants. You set out on a journey to strengthen yourself, in order to defeat the evil ${DICTIONARY.get("demon_lord")}.`;
        } else {
          return `You are a child of ${DICTIONARY.get("town_1")}. There does not seem to be anything special about you.`;
        }
      case "Goddess":
        return `The Goddess is the guardian deity of ${DICTIONARY.get("world_name")}. In Her infinite wisdom, She chose you as Her vessel to save the world from destruction. She is always with you, in your heart.`;
      case PARTYMEMBERS.BestFriend:
        return `${DICTIONARY.get(PARTYMEMBERS.BestFriend)} grew up with you in the town of ${DICTIONARY.get("town_1")}. Since you were of similar age, and your families lived near each other, you spent most of your childhood together. As time passed, you watched ${DICTIONARY.get(PARTYMEMBERS.BestFriend)} grow into the most caring and thoughtful person, whose smile always spread joy to the people around.<br /><br />Soon, you were never seen without one another, and the term "best friend" is almost not enough to capture the complicity that tie you two together. It was pretty obvious that ${DICTIONARY.get(PARTYMEMBERS.BestFriend)} would support you until the end, and certainly not let you leave on your quest alone.`;
      default:
        return "Default";
    }
  },

  factory: {
    export: function() {
      return {
        members: PARTY._members,
      };
    },

    import: function(save) {
      PARTY._members = save.members;
    },

    make_new: function() {
      PARTY._members = [];
    },
  },

  has_member: function(name) {
    return PARTY._members.includes(name);
  },

  add: function(name) {
    PARTY._members.push(name);
    CONSOLE.log.party(name + " joined");
  },

  remove: function(name) {
    PARTY._members = PARTY._members.filter(function(item) {
        return item != name;
    })
    CONSOLE.log.party(name + " left");
  },

  display: {
    _get_name: function(name) {
      if(DICTIONARY.has(name)){
        return DICTIONARY.get(name);
      } else {
        return name;
      }
    },

    character: function(name) {
      new FullTextMenu(`<b>` + PARTY.display._get_name(name) + `</b><hr/>
                      <div style='float: left;width:300px;height:300px;position:relative;' id='character_portait_slot'>
                      </div>` + PARTY.description(name),
                    [
                     {"text": "Back to party", "effect": "##BACK"},
                     TEXTMENU_EMPTYROW,
                     {"text": "Back to game", "effect": "##CLOSE"}
                   ]);

       var d = document.getElementById('character_portait_slot');
       new LayeredImage("assets/portraits_large/" + name + "_$.png", 300, 300, d);
    },

    menu: function() {
      var options = [
        {"text": PARTY.display._get_name("Ren"), "effect": function(){ PARTY.display.character("Ren"); }}
      ];
      if (ABILITIES.has_ability("_trial_passed")) {
        options.push({"text": PARTY.display._get_name("Goddess"), "effect": function(){ PARTY.display.character("Goddess"); }});
      }
      for(var member of PARTY._members){
        var f = function(m) {
          options.push(
            {"text": PARTY.display._get_name(m),
            "effect": function(){ PARTY.display.character(m); }});
        }
        f(member);
      }

      options.push(TEXTMENU_EMPTYROW);
      options.push({"text": "Back to game", "effect": "##CLOSE"});
      new CenteredTextMenu("Current party", options);
    },
  },
}
