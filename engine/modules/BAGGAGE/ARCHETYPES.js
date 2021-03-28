
const ARCHETYPES = {
  TYPE_ABILITY: "ABILITY",
  TYPE_INVENTORY: "INVENTORY",

  // They have to be computed at runtime because they depend on two different modules that I am not chaining
  _archetypes: function(){
    return Object.assign({}, ABILITIES_ARCHETYPES, ITEMS_ARCHETYPES);
  },

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
    var table = ARCHETYPES._archetypes()[category];
    var num = 0;
    // suboptimal in computation but nice in code.
    for(var i in table){
      if (INVENTORY.has_object(table[i]) || ABILITIES.has_ability(table[i])) {
        num ++;
      }
    }
    return `(${ARCHETYPES._proficiency_text(num / table.length)})`;
  },

  _fits_category: function (item, category){
    var archetypes = ARCHETYPES._archetypes();
    if (item[0] == "_" ) { // this is a secret item, never shown.
      return false;
    }
    if(!category){
      for(var i in archetypes){
        if(archetypes[i].includes(item)){
          return false;
        }
      }
      return true;
    }
    return archetypes[category].includes(item);
  },

  _category: function(type, category) {
    var html = "";
    var title = "";

    if (type == ARCHETYPES.TYPE_INVENTORY) {
      title = "Bags";

      for (var item_name in INVENTORY.all_objects()){
        if (ARCHETYPES._fits_category(item_name, category)) {
          html += item_name + " (" + INVENTORY.has_object(item_name) + ")<br/>";
        }
      }
    } else if(type == ARCHETYPES.TYPE_ABILITY) {
      title = "Abilities";

      for (var item_name in ABILITIES.all_abilities()){
        if (ARCHETYPES._fits_category(item_name, category)) {
          html += item_name + "<br/>";
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

  get_items: function(archetype_name){
    if (ABILITIES_ARCHETYPES[archetype_name]){
      return ABILITIES_ARCHETYPES[archetype_name];
    }
    if (ITEMS_ARCHETYPES[archetype_name]){
      return ITEMS_ARCHETYPES[archetype_name];
    }
    CONSOLE.error("Requested wrong archetype name: " + archetype_name);
    return [];
  }

}
