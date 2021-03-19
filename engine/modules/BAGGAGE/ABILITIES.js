const ABILITY = {
  Flee: "Flee",
  CallHelp: "Call help",
  Pray: "Pray",

  // Way of the Elements
    Fireball: "Fireball",
    Ice_bolt: "Ice bolt",
    Thunder: "Thunder",
    Storm: "Storm",
    Asphyxiate: "Asphyxiate",
    Earthquake: "Earthquake",
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

ABILITIES_ARCHETYPES = {
  "Element": [ABILITY.Fireball, ABILITY.Ice_bolt, ABILITY.Thunder, ABILITY.Storm],
  "Spirit": [ABILITY.Charm],
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

  display: function() {
    new CenteredTextMenu("ABILITIES",
                  [
                    ARCHETYPES.ability_list_item("Element"),
                    ARCHETYPES.ability_list_item("Spirit"),
                    ARCHETYPES.ability_list_item("Diplomat"),
                    TEXTMENU_EMPTYROW,
                    ARCHETYPES.ability_list_item(),
                    TEXTMENU_EMPTYROW,
                    {"text": "Back to game", "effect": "##CLOSE"}
                 ]);
  },

  has_ability: function(name) {
    return ABILITIES._abilities.get([name]);
  },

  all_abilities: function() {
    return ABILITIES._abilities.get("");
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
