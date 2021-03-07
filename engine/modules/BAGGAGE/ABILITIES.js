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

const ABILITY_ELEMENTS = ["Fireball", "Ice_bolt", "Thunder", "Storm"];
const ABILITY_SPIRITS = ["Charm"];
const ABILITY_DIPLOMAT = [];

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
      var table = [];
      switch (category){
        case("Element"):
          table = ABILITY_ELEMENTS;
          break;
        case("Spirit"):
          table = ABILITY_SPIRITS;
          break;
        case("Diplomat"):
          table = ABILITY_DIPLOMAT;
          break;
        default:
          return "";
      }
      var num = 0;
      for(var i of table){
        if (ABILITIES.has_ability(i)) {
          num ++
        }
      }
      var mastery = num / table.length;
      if (mastery > 0.9){ return "(veteran)"; }
      if (mastery > 0.7){ return "(proficient)"; }
      if (mastery > 0.5){ return "(adept)"; }
      if (mastery > 0.3){ return "(initiate)"; }
      if (mastery > 0){ return "(novice)"; }
      return "(inept)";
    },

    _fits_category: function (item, category){
      if (item[0] == "_" ) {
        return false;
      }
      switch (category){
        case("Element"):
          return ABILITY_ELEMENTS.includes(item);
          break;
        case("Spirit"):
          return ABILITY_SPIRITS.includes(item);
          break;
        case("Diplomat"):
          return ABILITY_DIPLOMAT.includes(item);
          break;
        default:
          return !(ABILITY_ELEMENTS.includes(item) || ABILITY_SPIRITS.includes(item) || ABILITY_DIPLOMAT.includes(item));
      }
      return true;
    },

    category: function(category) {
        var html = "";
        for (var i in ABILITIES._abilities.get("")){
          if (ABILITIES.display._fits_category(i, category)) {
            html += ABILITY[i] + "<br/>";
          }
        }
        var title = "";
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


    list: function() {
      new CenteredTextMenu("ABILITIES",
                    [
                      {"text": "Way of the Element " + ABILITIES.display._get_category_level("Element"), "effect": function(){ ABILITIES.display.category("Element"); }},
                      {"text": "Way of the Spirit " + ABILITIES.display._get_category_level("Spirit"), "effect": function(){ ABILITIES.display.category("Spirit"); }},
                      {"text": "Way of the Diplomat " + ABILITIES.display._get_category_level("Diplomat"), "effect": function(){ ABILITIES.display.category("Diplomat"); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Others", "effect": function(){ ABILITIES.display.category(""); }},
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
