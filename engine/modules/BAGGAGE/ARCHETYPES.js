
const ARCHETYPES_DETAIL = {
  // Abilities
  "Element": ["Fireball", "Ice_bolt", "Thunder", "Storm"],
  "Spirit": ["Charm"],
  "Diplomat": [],

  // Inventory
  "Alchemy": ["Elixir_fire"],
  "Weapon": ["Sword_wooden", "Sword_iron", "Sword_great", "Sword_legend", "Axe"],
  "Tool": ["Dagger"],
};

const ARCHETYPES = {
  TYPE_ABILITY: "ABILITY",
  TYPE_INVENTORY: "INVENTORY",

  _proficiency_text: function(number) {
    if (number > 0.9){ return "veteran"; }
    if (number > 0.7){ return "proficient"; }
    if (number > 0.5){ return "adept"; }
    if (number > 0.3){ return "initiate"; }
    if (number > 0){ return "novice"; }
    return "inept";
  },

  _get_category_level: function(category){
    if(!category) { return "";}
    var table = ARCHETYPES_DETAIL[category];
    var num = 0;
    // suboptimal in computation but nice in code.
    for(var i of table){
      if (INVENTORY.has_object(i) || ABILITIES.has_ability(i)) {
        num ++
      }
    }
    return `(${ARCHETYPES._proficiency_text(num / table.length)})`;
  },

  _fits_category: function (item, category){
    if (item[0] == "_" ) { // this is a secret item, never shown.
      return false;
    }
    if(!category){
      for(var i in ARCHETYPES_DETAIL){
        if(ARCHETYPES_DETAIL[i].includes(item)){
          return false;
        }
        return true;
      }
    }
    return ARCHETYPES_DETAIL[category].includes(item);
  },

  _category: function(type, category) {
    var html = "";
    var title = "";

    if (type == ARCHETYPES.TYPE_INVENTORY) {
      title = "Bags";

      for (var i in INVENTORY._inventory.get("")){
        if (ARCHETYPES._fits_category(i, category)) {
          html += ITEM[i] + " (" + INVENTORY._inventory.get([i]) + ")<br/>";
        }
      }
    } else if(type == ARCHETYPES.TYPE_ABILITY) {
      title = "Abilities";

      for (var i in ABILITIES._abilities.get("")){ // returns the names not the codes
        if (ARCHETYPES._fits_category(i, category)) {
          html += ABILITY[i] + "<br/>";
        }
      }
    }

    if (category) {
      title = "Way of the " + category;
    }

    new FullTextMenu("<b>" + title + "</b><hr/>" + html,
                  [
                   {"text": "Previous", "effect": "##BACK"},
                   TEXTMENU_EMPTYROW,
                   {"text": "Back to game", "effect": "##CLOSE"}
                 ]);
  },


  _list_item: function(type, name, override_title){
    var title = "Way of the " + name + " " + ARCHETYPES._get_category_level(name);
    if (!name) {
      if (type == ARCHETYPES.TYPE_ABILITY) { title = "Other"; }
      if (type == ARCHETYPES.TYPE_INVENTORY) { title = "Bags"; }
    }
    return {
      "text": title,
      "effect": function(){ ARCHETYPES._category(type, name);
       }};
  },

  ability_list_item: function(name) {
    return ARCHETYPES._list_item(ARCHETYPES.TYPE_ABILITY, name);
  },

  inventory_list_item: function(name) {
    return ARCHETYPES._list_item(ARCHETYPES.TYPE_INVENTORY, name);
  },

}
