
const ITEM = {
  Stick: "Stick",
  Stone: "Sharp Stone",
  Fang: "Venomous Fang",
  Elixir_fire: "Fireball Elixir",
  Sword_wooden: "Wooden Sword",
  //Bone: "Bone",
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
  },

  display: {
    list: function() {
      var html = "";
      for (var i in INVENTORY._inventory.get("")){
        html += i + " (" + INVENTORY._inventory.get([i]) + ")<br/>";
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
