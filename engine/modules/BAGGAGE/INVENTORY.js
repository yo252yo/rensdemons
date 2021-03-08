
const ITEM = {
  Stick: "Stick",
  Stone: "Blunt Stone",
  Fang: "Venomous Fang",
  Bone: "Sharp Bone",

  Coin: "Coin",

  // Way of the Alchemy
    Elixir_fire: "Fireball Elixir",
    // Staff_wooden: "Wooden Staff",
    // Staff_legend: "Holy Staff",
    // Wand: "Wand",

  // Way of the Weapon
    Sword_wooden: "Wooden Sword",
    Sword_iron: "Iron Sword",
    Sword_great: "Great Sword",
    Sword_legend: "Holy Sword",
    // War_hammer: "War Hammer",
    // Mace: "Mace",
    // Spear: "Spear",
    Axe: "Axe",
    // Shield: "Shield",


  // Way of the Tools
    Dagger: "Dagger",
    // Bow: "Bow",
    // Arrow: "Arrow",
    // Poison: "Poison darts",
    // Net: "Net",
    // Rope: "Rope",

  isItem: function(s){
    for (var i in ITEM){
      if(ITEM[i] == s){
        return true;
      }
    }
    return false;
  },
}

const INVENTORY_CLASSES = {
  "Alchemy": ["Elixir_fire"],
  "Weapon": ["Sword_wooden", "Sword_iron", "Sword_great", "Sword_legend", "Axe"],
  "Tool": ["Dagger"],
};


const INVENTORY = {
  _inventory: new FluidMap(),

  factory: {
    export: function() {
      return INVENTORY._inventory.export();
    },

    import: function(save) {
      INVENTORY._inventory = new FluidMap(save);
    },

    make_new: function() {
      INVENTORY._inventory = new FluidMap();
    },
  },

  display: {
    _get_category_level: function(category){
      if(!category) { return "";}
      var table = INVENTORY_CLASSES[category];
      var num = 0;
      for(var i of table){
        if (INVENTORY.has_object(i)) {
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
        return !(INVENTORY_CLASSES["Weapon"].includes(item) || INVENTORY_CLASSES["Alchemy"].includes(item) || INVENTORY_CLASSES["Tool"].includes(item));
      }
      return INVENTORY_CLASSES[category].includes(item);
    },

    category: function(category) {
        var html = "";
        for (var i in INVENTORY._inventory.get("")){
          if (INVENTORY.display._fits_category(i, category)) {
            html += ITEM[i] + " (" + INVENTORY._inventory.get([i]) + ")<br/>";
          }
        }
        var title = "Bags";
        if (category){
          title = "Way of the " + category;
        }

        new FullTextMenu("<b>" + title + "</b><hr/>" + html,
                      [
                       {"text": "Back to inventory", "effect": "##BACK"},
                       TEXTMENU_EMPTYROW,
                       {"text": "Back to game", "effect": "##CLOSE"}
                     ]);
    },

    _list_item: function(name){
        return {
          "text": "Way of the " + name + " " + INVENTORY.display._get_category_level(name),
          "effect": function(){ INVENTORY.display.category(name);
           }};
    },

    list: function() {
      new CenteredTextMenu("INVENTORY<br /><br />Coins: " + (INVENTORY.has_object(ITEM.Coin) || 0),
                    [
                      {"text": "Bags", "effect": function(){ INVENTORY.display.category(); }},
                      TEXTMENU_EMPTYROW,
                      INVENTORY.display._list_item("Weapon"),
                      INVENTORY.display._list_item("Alchemy"),
                      INVENTORY.display._list_item("Tool"),
                      TEXTMENU_EMPTYROW,
                      {"text": "Back to game", "effect": "##CLOSE"}
                   ]);
    },
  },

  has_object: function(name) {
    return INVENTORY._inventory.get([name]);
  },

  increase: function(name, quantity) {
    if(!quantity) {quantity = 1;}
    INVENTORY._inventory.increment([name], quantity);
    CONSOLE.log.item(name, quantity);
  },

  increase_function: function(name, quantity) {
    return function() {
      INVENTORY.increase(name, quantity);
    };
  },

  decrease: function(name, quantity) {
    if(!quantity) {quantity = 1;}
    CONSOLE.log.item(name, -1 * quantity);
    INVENTORY._inventory.increment([name], -1 * quantity);
    var g = INVENTORY._inventory.get([name]);
    if (g <= 0){
      INVENTORY._inventory.delete([name]);
    }
  },

}
