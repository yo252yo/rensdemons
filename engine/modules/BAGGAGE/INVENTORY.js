
const ITEM = {
  Coin: "_Coin",
  XpToken: "_XpToken",
  // Bags

  // Way of the Alchemy
    Elixir_fire: "Fire Elixir",
    Elixir_ice: "Ice Elixir",
    Elixir_vine: "Vine Elixir",
    Elixir_venom: "Venom Elixir",
    Elixir_decay: "Decay Elixir",
    Elixir_chaos: "Chaos Elixir",

  // Way of the Weapon
    Sword_wooden: "Wooden Sword",
    Dagger: "Dagger",
    Mace: "Mace",
    Shield: "Shield",
    Spear: "Spear",
    Sword_iron: "Iron Sword",
    Axe: "Axe",
    Sword_great: "Great Sword",

  // Way of the Artifact
    Sword_legend: "Holy Sword",
    War_hammer: "Mighty War Hammer",
    Staff: "Legendary Staff",
    Wand: "Enchanted Wand",

  // Way of the Tools
    // Tools
    Arrow: "Arrow",
    Poison_darts: "Poison darts",
    Rope: "Rope",
    Bow: "Bow",
    Net: "Net",

    // Loot. IdeaS: spices, herbs, leather?
    Stone: "Blunt Stone",
    Mushroom: "Mushroom",
    Berry: "Berry",
    Stick: "Stick",
    Fang: "Venomous Fang",
    Bone: "Sharp Bone",
    Flower: "Flower",
    Feather: "Feather",
    Linnens: "Linnens",
    Scale: "Scale",

  isItem: function(s){
    for (var i in ITEM){
      if(ITEM[i] == s){
        return true;
      }
    }
    return false;
  },
}

const ITEMS_ARCHETYPES_NAMES = {
  Alchemy: "Alchemy",
  Weapon: "Weapon",
  Tool: "Tool",
  Artifact: "Artifact",
}

ITEMS_ARCHETYPES = {};
ITEMS_ARCHETYPES[ITEMS_ARCHETYPES_NAMES.Alchemy] = [ITEM.Elixir_fire, ITEM.Elixir_ice, ITEM.Elixir_decay, ITEM.Elixir_chaos, ITEM.Elixir_vine, ITEM.Elixir_venom];
ITEMS_ARCHETYPES[ITEMS_ARCHETYPES_NAMES.Weapon] = [ITEM.Dagger, ITEM.Sword_wooden, ITEM.Sword_iron, ITEM.Sword_great, ITEM.Mace, ITEM.Spear, ITEM.Axe, ITEM.Shield];
ITEMS_ARCHETYPES[ITEMS_ARCHETYPES_NAMES.Tool] = [ITEM.Bow, ITEM.Arrow, ITEM.Stick, ITEM.Stone, ITEM.Fang, ITEM.Bone, ITEM.Poison_darts, ITEM.Net, ITEM.Rope];
ITEMS_ARCHETYPES[ITEMS_ARCHETYPES_NAMES.Artifact] = [ITEM.Sword_legend, ITEM.War_hammer, ITEM.Staff, ITEM.Wand];

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
    return INVENTORY.count(ITEM.Coin) || 0;
  },

  display: function() {
    new CenteredTextMenu("INVENTORY<br /><br />Coins: " + (INVENTORY.cash() || 0),
                  [
                    ARCHETYPES.inventory_list_item(),
                    TEXTMENU_EMPTYROW,
                    ARCHETYPES.inventory_list_item(ITEMS_ARCHETYPES_NAMES.Tool),
                    ARCHETYPES.inventory_list_item(ITEMS_ARCHETYPES_NAMES.Weapon),
                    ARCHETYPES.inventory_list_item(ITEMS_ARCHETYPES_NAMES.Alchemy),
                    ARCHETYPES.inventory_list_item(ITEMS_ARCHETYPES_NAMES.Artifact),
                    TEXTMENU_EMPTYROW,
                    {"text": "Back to game", "effect": "##CLOSE"}
                 ]);
  },

  count: function(name) {
    return INVENTORY._inventory.get([name]) || 0;
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
