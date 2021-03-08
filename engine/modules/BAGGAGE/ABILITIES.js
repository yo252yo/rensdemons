const ABILITY = {
  Flee: "Flee",
  CallHelp: "Call help",
  Pray: "Pray",

  // Way of the Elements
    Fireball: "Fireball",
    Ice_bolt: "Ice bolt",
    Thunder: "Thunder",
    Storm: "Storm",
    // Asphyxiate: "Asphyxiate",
    // Earthquake: "Earthquake",
    // Incinerate: "Incinerate",
    // Summon: "Summon",

  // Way of the Spirit
    Charm: "Charm",
    // Petrify: "Petrify",
    // Poison: "Poison",
    // Shrink: "Shrink",
    // Blind: "Blind",
    // Lull: "Lull",

 // Way of the Diplomat
    // Persuade: "Persuade",
    // Intimidate: "Intimidate",
    // Mystify: "Mystify",
    // Sneak: "Sneak",
    // Circumvent: "Circumvent",
}

const ABILITY_CLASSES = {
  "Element": ["Fireball", "Ice_bolt", "Thunder", "Storm"],
  "Spirit": ["Charm"],
  "Diplomat": [],
};

const ABILITIES = {
  _abilities: new FluidMap(),

  factory: {
    export: function() {
      return ABILITIES._abilities.export();
    },

    import: function(save) {
      ABILITIES._abilities = new FluidMap(save);
    },

    make_new: function() {
      ABILITIES._abilities = new FluidMap();
      ABILITIES._abilities.set([ABILITY.Flee], true);
      ABILITIES._abilities.set([ABILITY.CallHelp], true);
    },
  },

  display: {
    _get_category_level: function(category){
      if(!category) { return "";}
      var table = ABILITY_CLASSES[category];

      var num = 0;
      for(var i of table){
        if (ABILITIES.has_ability(i)) {
          num ++
        }
      }
      return `(${LANGUAGE.proficiency(num / table.length)})`;
    },

    _fits_category: function (item, category){
      if (item[0] == "_" ) {
        return false;
      }
      if(!category){
        return !(ABILITY_CLASSES["Element"].includes(item) || ABILITY_CLASSES["Spirit"].includes(item) || ABILITY_CLASSES["Diplomat"].includes(item));
      }
      return ABILITY_CLASSES[category].includes(item);
    },

    category: function(category) {
        var html = "";
        for (var i in ABILITIES._abilities.get("")){
          if (ABILITIES.display._fits_category(i, category)) {
            html += ABILITY[i] + "<br/>";
          }
        }
        var title = "Abilities";
        if (category){
          title = "Way of the " + category;
        }

        new FullTextMenu("<b>" + title + "</b><hr/>" + html,
                      [
                       {"text": "Back to abilities", "effect": "##BACK"},
                       TEXTMENU_EMPTYROW,
                       {"text": "Back to game", "effect": "##CLOSE"}
                     ]);
    },

    _list_item: function(name){
        return {
          "text": "Way of the " + name + " " + ABILITIES.display._get_category_level(name),
          "effect": function(){ ABILITIES.display.category(name);
           }};
    },

    list: function() {
      new CenteredTextMenu("ABILITIES",
                    [
                      ABILITIES.display._list_item("Element"),
                      ABILITIES.display._list_item("Spirit"),
                      ABILITIES.display._list_item("Diplomat"),
                      TEXTMENU_EMPTYROW,
                      {"text": "Others", "effect": function(){ ABILITIES.display.category(); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Back to game", "effect": "##CLOSE"}
                   ]);
    },
  },

  has_ability: function(name) {
    return ABILITIES._abilities.get([name]);
  },

  unlock: function(name) {
    AUDIO.effect.unlock();
    CONSOLE.log.abilities("Unlocked " + name);
    ABILITIES._abilities.set([name], true);
    BATTLETREE.api.unlock_ability(name);
  },

}

// Initialize
ABILITIES.factory.make_new();
