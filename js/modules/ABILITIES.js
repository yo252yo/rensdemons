
const ABILITIES = {
  _DISK_KEY: "abilities",
  _abilities: new FluidMap(),

  factory: {
    initialize: function() {
      var save = DISK.get(ABILITIES._DISK_KEY);
      if(save){
        ABILITIES.factory.import(save);
      } else {
        ABILITIES.factory.make_new();
      }
    },

    save: function() {
      DISK.set(ABILITIES._DISK_KEY, {
       "abilities": ABILITIES._abilities.export()
     });
    },

    import: function(save) {
      if(!save) return;
      ABILITIES._abilities = new FluidMap(save.abilities);
    },

    make_new: function() {
      ABILITIES._abilities.set(["Back away"], true);
      ABILITIES._abilities.set(["Call help"], true);
    },
  },

  display: {
    list: function() {
      var html = "";
      for (var i in ABILITIES._abilities.get("")){
        html += i + "<br/>";
      }

      new MenuScreen("<b>Abilities</b><hr/>" + html );
    },
  },

}
