// Maps to dictionary keys
const PARTYMEMBERS = {
  Ren: "Ren",
  BestFriend: "BestFriend",
  PreciousChild: "PreciousChild",
  UpbeatDojikko: "UpbeatDojikko",
  StreetSmart: "StreetSmart",
  WiseOld: "WiseOld",

  // TraitorFisher: "TraitorFisher", //  traitor   fisherman/cook
  // lake?

  // RetiredProtector: "RetiredProtector", //  Retired or rebel military / commander / hardboiled warrior / vailiant protector   tactitian
  // town_2 fear




   // SnobRich: "SnobRich", //the snob/uptight rich merchant   banker
   // town4 debauch

   // FemmeFatale: "FemmeFatale", // prostitute/ femme fatale
   // town4 debauch

  // TorturedSoul: "TorturedSoul", // dark emo antihero maverik trop dark, poet/bard/jester/minstrel/painter:
  // town5 acceptance

   // DisguisedPrincess: "DisguisedPrincess", //magical princess / noble / hidden prince  girl disguised as boi       herboriste/traps/poison
   // town5 acceptance



    // SavageChild: "SavageChild", //brawnish/savage girl/enfant loup
    // forest dungeon?

    // DumbMuscles: "DumbMuscles",//  The Big Guy strong and dumb      brute force
    // mountain cave?

   // GeniusProdigy: "GeniusProdigy", //child prodigy
   // ruins, doing an expedition?


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
        return `${DICTIONARY.get(PARTYMEMBERS.BestFriend)} grew up with you in the town of ${DICTIONARY.get("town_1")}. Since you were of similar age, and your families lived near each other, you spent most of your childhood together. As time passed, you watched ${DICTIONARY.get(PARTYMEMBERS.BestFriend)} grow into the most caring and thoughtful person, whose smile always spread joy to the people around.<br /><br />
                Soon, you were never seen without one another, and the term "best friend" is almost not enough to capture the complicity that tie you two together. It was pretty obvious that ${DICTIONARY.get(PARTYMEMBERS.BestFriend)} would support you until the end, and certainly not let you leave on your quest alone.`;
      case PARTYMEMBERS.PreciousChild:
        return `${DICTIONARY.get(PARTYMEMBERS.PreciousChild)} is the younger brother of ${DICTIONARY.get(PARTYMEMBERS.BestFriend)}. You've spent a lot of time playing with him in ${DICTIONARY.get("town_1")}. You think of him as your little brother too. And since he's also a Second-Born, ${DICTIONARY.get(PARTYMEMBERS.PreciousChild)} really looks up to you. His admiration for you is no secret.<br /><br />
                ${DICTIONARY.get(PARTYMEMBERS.PreciousChild)} always puts on a brave face, and is not afraid of standing his own ground, but nobody ever takes him seriously. He may think he's fierce, but people just find him adorable. His rebellious pout only manages to melt hearts. As a result, nobody can say no to him.`;
      case PARTYMEMBERS.UpbeatDojikko:
        return `${DICTIONARY.get(PARTYMEMBERS.UpbeatDojikko)} is a fortune teller living in ${DICTIONARY.get("town_1")}. She has a way with the spirits, who let her peek into the fabric of time to reveal the things to come. In fact, she would probably know all the secrets of the universe by now, if only she wasn't such an airhead.<br /><br />
                ${DICTIONARY.get(PARTYMEMBERS.UpbeatDojikko)} was very young when she lost her father to the monsters of ${DICTIONARY.get("demon_lord")}'s army, but not so young that she could remain oblivious to how this loss destroyed her mother's soul. She swore to always spread joy and happiness around her, to bring back the light in her mother's life. It's not often that she pauses to wonder if anything darker is hiding behind her warm smile, her upbeat demeanor and her legendary clumsiness.`;
      case PARTYMEMBERS.StreetSmart:
        return `${DICTIONARY.get(PARTYMEMBERS.StreetSmart)} is a beastmaster you encountered in a forest near ${DICTIONARY.get("town_1")}. Behind his innocent face hides a sly and calculating brain. Any means is good for him to reach his goals. Fortunately, his big heart means that he aims for nothing besides the happiness of those he cares about.<br /><br />
                The war simply did not allow him the luxury to abide by the law. Very young, he had to resort to thievery to save his family from starvation. Growing up, he discovered in himself a talent that granted him a more stable life: he was very gifted with animals. Since then, he's become a pillar of the underworld of the kingdom, from poaching to trafficking or even beast fights. Yet, he has not completely given up hope for a better world, or to find ${DICTIONARY.get('han_dog')}, his lost companion...`;
      case PARTYMEMBERS.WiseOld:
        return `All Churches in the kingdom have been waiting for the Promised Child, but the Church of ${DICTIONARY.get("town_2")} is home of the Tutor, a priest with the priviledge to dedicate their whole life to learning and studying in order to support the Promised Child in due time. This is ${DICTIONARY.get(PARTYMEMBERS.WiseOld)}'s position. Usually, the Tutor passes the torch to their apprentice at a younger age, but ${DICTIONARY.get(PARTYMEMBERS.WiseOld)} was determined to remain in function in spite of his age. Maybe he figured out in some way that he would encounter the Promised Child.<br /><br />
                Years of solitude in libraries have turned him into quite a peculiar character, and people tend to get uncomfortable faced with his eccentricity. But nobody would question his dedication to his duties: if he gave his approval and joined the Promised Child, it must mean that the Child is ready for the challenges ahead.`;
      default:
        return "";
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

  changeNickname: function(name) {
    var trueName = PARTY.display._get_name(name);
    var newName = prompt("Chose a nickname for " + trueName, trueName);

    if (newName) {
      DICTIONARY.set(name, newName);
    }
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
      var nickname = PARTY.display._get_name(name);
      var original = PARTY.display._get_name("ORIGINAL_" + name);

      var nameString = nickname;
      if (original != nickname){
       nameString += "(" + original + ")";
     }

      new FullTextMenu(`<b>${nameString}</b><hr/>
                      <div style='float: left;width:300px;height:300px;position:relative;' id='character_portait_slot'>
                      </div>` + PARTY.description(name),
                    [
                     {"text": "Change nickname", "effect": function(){ PARTY.changeNickname(name); }},
                     TEXTMENU_EMPTYROW,
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
