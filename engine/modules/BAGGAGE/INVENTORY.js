
const ITEM = {
  Stick: "Stick",
  Stone: "Blunt Stone",
  Fang: "Venomous Fang",
  Bone: "Sharp Bone",

  Coin: "_Coin",

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
    Mace: "Mace",
    Spear: "Spear",
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

ITEMS_ARCHETYPES = {
  "Alchemy": [ITEM.Elixir_fire],
  "Weapon": [ITEM.Sword_wooden, ITEM.Sword_iron, ITEM.Sword_great, ITEM.Sword_legend, ITEM.Axe],
  "Tool": [ITEM.Dagger],
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

  display: function() {
    new CenteredTextMenu("INVENTORY<br /><br />Coins: " + (INVENTORY.has_object(ITEM.Coin) || 0),
                  [
                    ARCHETYPES.inventory_list_item(),
                    TEXTMENU_EMPTYROW,
                    ARCHETYPES.inventory_list_item("Weapon"),
                    ARCHETYPES.inventory_list_item("Alchemy"),
                    ARCHETYPES.inventory_list_item("Tool"),
                    TEXTMENU_EMPTYROW,
                    {"text": "Back to game", "effect": "##CLOSE"}
                 ]);
  },

  has_object: function(name) {
    return INVENTORY._inventory.get([name]);
  },

  all_objects: function(){
    return INVENTORY._inventory.get("");
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
