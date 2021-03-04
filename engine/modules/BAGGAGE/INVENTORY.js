
const ITEM = {
  Stick: "Stick",
  Stone: "Blunt Stone",
  Fang: "Venomous Fang",
  Bone: "Sharp Bone",

  Elixir_fire: "Fireball Elixir",

  Coin: "Coin",

  // Industrial
  Sword_wooden: "Wooden Sword",
  Sword_iron: "Iron Sword",
  Sword_great: "Great Sword",
  Sword_legend: "Holy Sword",

  // Staff_wooden: "Wooden Staff",
  // Staff_legend: "Holy Staff",
  //
  Dagger: "Dagger",
  // Axe: "Axe",
  // War_hammer: "War Hammer",
  // Mace: "Mace",
  // Spear: "Spear",
  // Wand: "Wand",
  //
  // Bow: "Bow",
  // Arrow: "Arrow",
  //
  // Net: "Net",
  // Shield: "Shield",
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
    list: function() {
      var html = "";
      for (var i in INVENTORY._inventory.get("")){
        if (i[0] != "_") {
          html += i + " (" + INVENTORY._inventory.get([i]) + ")<br/>";
        }
      }

      new MenuScreen("<b>Inventory</b><hr/>" + html );
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
