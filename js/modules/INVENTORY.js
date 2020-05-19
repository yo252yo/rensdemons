
const INVENTORY = {
  _DISK_KEY: "inventory",
  _inventory: new FluidMap(),

  factory: {
    save: function() {
      DISK.set(INVENTORY._DISK_KEY, {
       "content": INVENTORY._inventory.export()
     });
    },

    import: function(save){
      INVENTORY._inventory = new FluidMap(save["content"]);
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

  has_object: function(name) {
    return INVENTORY._inventory.get([name]);
  },

}
