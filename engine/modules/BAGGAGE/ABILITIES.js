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

const ABILITY_ELEMENTS = [ABILITY.Fireball, ABILITY.Ice_bolt, ABILITY.Thunder, ABILITY.Storm];
const ABILITY_SPIRITS = [ABILITY.Charm];
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
    _fits_category: function (item, category){
      if (item[0] == "_" ) {
        return false;
      }
      var name = ABILITY[item];
      switch (category){
        case("Element"):
          return ABILITY_ELEMENTS.includes(name);
          break;
        case("Spirit"):
          return ABILITY_SPIRITS.includes(name);
          break;
        case("Diplomat"):
          return ABILITY_DIPLOMAT.includes(name);
          break;
        default:
          return !(ABILITY_ELEMENTS.includes(name) || ABILITY_SPIRITS.includes(name) || ABILITY_DIPLOMAT.includes(name));
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

        new MenuScreen("<b>" + title + "</b><hr/>" + html );
    },


    list: function() {
      new CenteredTextMenu("ABILITIES",
                    [
                      {"text": "Way of the Element", "effect": function(){ ABILITIES.display.category("Element"); }},
                      {"text": "Way of the Spirit", "effect": function(){ ABILITIES.display.category("Spirit"); }},
                      {"text": "Way of the Diplomat", "effect": function(){ ABILITIES.display.category("Diplomat"); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Others", "effect": function(){ ABILITIES.display.category(""); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Back", "effect": "##BACK"},
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
