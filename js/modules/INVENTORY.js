
const INVENTORY = {
  _DISK_KEY: "inventory",
  _inventory: new FluidMap(),

  factory: {
    initialize: function() {
      INVENTORY.factory.import(DISK.get(INVENTORY._DISK_KEY));
    },

    save: function() {
      DISK.set(INVENTORY._DISK_KEY, {
       "inventory": INVENTORY._inventory.export()
     });
    },

    import: function(save){
      if(!save) return;
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
