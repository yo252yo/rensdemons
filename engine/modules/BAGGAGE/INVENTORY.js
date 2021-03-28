
const ITEM = {
  Coin: "_Coin",
  XpToken: "_XpToken",
  // Bags

  // Way of the Alchemy
    Elixir_fire: "Fire Elixir",
    //Elixir_ice: "Ice Elixir",
    //Elixir_decay: "Decay Elixir", // acid
    //Elixir_chaos: "Chaos Elixir", // gravity
    //Elixir_vine: "Vine Elixir", // ensnare
    //Elixir_venom: "Venom Elixir", // gas

  // Way of the Weapon
    Dagger: "Dagger",
    Sword_wooden: "Wooden Sword",
    Sword_iron: "Iron Sword",
    Sword_great: "Great Sword",
    Mace: "Mace",
    Spear: "Spear",
    Axe: "Axe",
    Shield: "Shield",

  // Way of the Artifact
    Sword_legend: "Holy Sword",
    War_hammer: "Mighty War Hammer",
    // Staff: "Legendary Staff", // teleport
    // Wand: "Enchanted Wand",

  // Way of the Tools
    // Tools
    Bow: "Bow",
    Arrow: "Arrow",
    // Poison_darts: "Poison darts",
    // Net: "Net",
    // Rope: "Rope",
    // Loot
    Stick: "Stick",
    Stone: "Blunt Stone",
    Fang: "Venomous Fang",
    Bone: "Sharp Bone",

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
  "Alchemy":  [ITEM.Elixir_fire],
  "Weapon":   [ITEM.Dagger, ITEM.Sword_wooden, ITEM.Sword_iron, ITEM.Sword_great, ITEM.Mace, ITEM.Spear, ITEM.Axe, ITEM.Shield],
  "Tool":     [ITEM.Bow, ITEM.Arrow, ITEM.Stick, ITEM.Stone, ITEM.Fang, ITEM.Bone],
  "Artifact": [ITEM.Sword_legend, ITEM.War_hammer],
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

  cash: function(){
    return INVENTORY.has_object(ITEM.Coin) || 0;
  },

  display: function() {
    new CenteredTextMenu("INVENTORY<br /><br />Coins: " + (INVENTORY.cash() || 0),
                  [
                    ARCHETYPES.inventory_list_item(),
                    TEXTMENU_EMPTYROW,
                    ARCHETYPES.inventory_list_item("Tool"),
                    ARCHETYPES.inventory_list_item("Weapon"),
                    ARCHETYPES.inventory_list_item("Alchemy"),
                    ARCHETYPES.inventory_list_item("Artifact"),
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
