
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

const ITEM_ALCHEMY = ["Elixir_fire"];
const ITEM_WEAPON = ["Sword_wooden", "Sword_iron", "Sword_great", "Sword_legend", "Axe"];
const ITEM_TOOL = ["Dagger"];

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
      var table = [];
      switch (category){
        case("Weapon"):
          table = ITEM_WEAPON;
          break;
        case("Alchemy"):
          table = ITEM_ALCHEMY;
          break;
        case("Tool"):
          table = ITEM_TOOL;
          break;
        default:
          return "";
      }
      var num = 0;
      for(var i of table){
        if (INVENTORY.has_object(i)) {
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
        case("Weapon"):
          return ITEM_WEAPON.includes(item);
          break;
        case("Alchemy"):
          return ITEM_ALCHEMY.includes(item);
          break;
        case("Tool"):
          return ITEM_TOOL.includes(item);
          break;
        default:
          return !(ITEM_WEAPON.includes(item) || ITEM_ALCHEMY.includes(item) || ITEM_TOOL.includes(item));
      }
      return true;
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


    list: function() {
      new CenteredTextMenu("INVENTORY<br /><br />Coins: " + (INVENTORY.has_object(ITEM.Coin) || 0),
                    [
                      {"text": "Bags", "effect": function(){ INVENTORY.display.category(); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Way of the Weapon " + INVENTORY.display._get_category_level("Weapon"), "effect": function(){ INVENTORY.display.category("Weapon"); }},
                      {"text": "Way of the Alchemy " + INVENTORY.display._get_category_level("Alchemy"), "effect": function(){ INVENTORY.display.category("Alchemy"); }},
                      {"text": "Way of the Tool " + INVENTORY.display._get_category_level("Tool"), "effect": function(){ INVENTORY.display.category("Tool"); }},
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
