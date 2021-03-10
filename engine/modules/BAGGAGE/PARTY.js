const PARTY = {
  _members: [],

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
      var content = "";
      switch (name) {
        case "You":
          if (ABILITIES.has_ability("_trial_passed")){
            content = "You are the The Promised Child. The Goddess chose you to bring salvation to the world of " + DICTIONARY.get("world_name") + " and its inhabitants.";
          } else {
            content = "You are a child of " + DICTIONARY.get("town_1") + ". There does not seem to be anything special about you.";
          }
          break;
        case "Goddess":
          content = "The Goddess is the guardian deity of " + DICTIONARY.get("world_name") + ". In Her infinite wisdom, She chose you as Her vessel to save the world from destruction. She is always with you, in your heart.";
        default:
      }
      new FullTextMenu("<b>" + PARTY.display._get_name(name) + "</b><hr/>" + content,
                    [
                     {"text": "Back to party", "effect": "##BACK"},
                     TEXTMENU_EMPTYROW,
                     {"text": "Back to game", "effect": "##CLOSE"}
                   ]);
    },

    menu: function() {
      var options = [
        {"text": PARTY.display._get_name("You"), "effect": function(){ PARTY.display.character("You"); }}
      ];
      if (ABILITIES.has_ability("_trial_passed")) {
        options.push({"text": PARTY.display._get_name("Goddess"), "effect": function(){ PARTY.display.character("Goddess"); }});
      }

      options.push(TEXTMENU_EMPTYROW);
      options.push({"text": "Back to game", "effect": "##CLOSE"});
      new CenteredTextMenu("Current party", options);
    },
  },
}
