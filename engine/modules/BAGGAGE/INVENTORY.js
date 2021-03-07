
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

const ITEM_ALCHEMY = [ITEM.Elixir_fire];
const ITEM_WEAPON = [ITEM.Sword_wooden, ITEM.Sword_iron, ITEM.Sword_great, ITEM.Sword_legend, ITEM.Axe];
const ITEM_TOOL = [ITEM.Dagger];

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
    _fits_category: function (item, category){
      if (item[0] == "_" ) {
        return false;
      }
      var name = ITEM[item];
      switch (category){
        case("Weapon"):
          return ITEM_WEAPON.includes(name);
          break;
        case("Alchemy"):
          return ITEM_ALCHEMY.includes(name);
          break;
        case("Tool"):
          return ITEM_TOOL.includes(name);
          break;
        default:
          return !(ITEM_WEAPON.includes(name) || ITEM_ALCHEMY.includes(name) || ITEM_TOOL.includes(name));
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

        new MenuScreen("<b>" + title + "</b><hr/>" + html);
    },


    list: function() {
      new CenteredTextMenu("INVENTORY<br /><br />Coins: " + INVENTORY.has_object(ITEM.Coin),
                    [
                      {"text": "Bags", "effect": function(){ INVENTORY.display.category(); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Way of the Weapon", "effect": function(){ INVENTORY.display.category("Weapon"); }},
                      {"text": "Way of the Alchemy", "effect": function(){ INVENTORY.display.category("Alchemy"); }},
                      {"text": "Way of the Tool", "effect": function(){ INVENTORY.display.category("Tool"); }},
                      TEXTMENU_EMPTYROW,
                      {"text": "Back", "effect": "##BACK"},
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
