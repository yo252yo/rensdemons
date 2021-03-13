// Maps to dictionary keys
const PARTYMEMBERS = {
  Ren: "Ren",
  BestFriend: "BestFriend", // kind loving healer flower girl pure:Aerith

  // TorturedSoul: "TorturedSoul", // dark emo antihero maverik trop dark, poet/bard/jester/minstrel/painter: sasuke/seifer/Riku/squall/batman
  // StreetSmart: "StreetSmart", // the rogue with the heart of gold / pirate / treasure hunter   /The Smart/street wise Guy                       hansolo  Quistis/aladdin Beast master (falcon/horse)
  // WiseOld: "WiseOld", //  wise old fool /  gandalf /   Scholar
  // RetiredProtector: "RetiredProtector", //  Retired or rebel military / commander / hardboiled warrior / vailiant protector snake/geralt/ jhon wick,  tactitian
  // DumbMuscles: "DumbMuscles",//  The Big Guy strong and dumb      wakka/barrett/nendou/joey yugui  brute force
  // SnobRich: "SnobRich", //the snob/uptight rich merchant                                                  Draco/Sanzenin/ouran/gatsby banker
  // SavageChild: "SavageChild", //brawnish/savage girl/enfant loup                                             ametoyuki/toradora/mowgli/mononoke
  // FemmeFatale: "FemmeFatale", // prostitute/ femme fatale                                                     lust/matahary
  // DisguisedPrincess: "DisguisedPrincess", //magical princess / noble / hidden prince  girl disguised as boi                                      sheik  herboriste/traps/poison
  // UpbeatDojikko: "UpbeatDojikko", //  perky and upbeat airhead / mascot? /                                            riku/yuffie/dojiko/asahina/phoebe   necroman/occultist/paranormal/tarot
  // PreciousChild: "PreciousChild", //shota / supporting innocent youth / precious kid                                hope/genis/ed
  // GeniusProdigy: "GeniusProdigy", //child prodigy                                                                hayate/killua/lelouch/near/ender
  // TraitorFisher: "TraitorFisher", //  traitor                                                                         atlas/fontaine/juda  fisherman/cook
};

const PARTY = {
  _members: [],

  description: function(name) {
    switch (name) {
      case "Ren":
        if (ABILITIES.has_ability("_trial_passed")){
          return "You are the The Promised Child. The Goddess chose you to bring salvation to the world of " + DICTIONARY.get("world_name") + " and its inhabitants.";
        } else {
          return "You are a child of " + DICTIONARY.get("town_1") + ". There does not seem to be anything special about you.";
        }
      case "Goddess":
        return "The Goddess is the guardian deity of " + DICTIONARY.get("world_name") + ". In Her infinite wisdom, She chose you as Her vessel to save the world from destruction. She is always with you, in your heart.";
      case PARTYMEMBERS.BestFriend:
        return "Your childhood friend.";
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
                      <div style='float: left;width:300px;height:300px;position:relative;'>
                        <div style='float: left;width:300px;height:300px;position:absolute;' id='character_portait_slot'>
                        </div>
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
