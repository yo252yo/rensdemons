
const INVENTORY = {
  _inventory: new FluidMap(),

  factory: {
    save: function() {
      DISK.set("inventory", {
       "inventory": INVENTORY._inventory.export()
     });
    },

    import: function(save){
      INVENTORY._inventory = new FluidMap(save.inventory);
    },
  },

  display: {
    list: function() {
      var html = "";
      for (var i in INVENTORY._inventory.get("[]")){
        html += i + "<br/>";
      }

      new MenuScreen("<b>Inventory</b><hr/>" + html );
    },
  },

}
