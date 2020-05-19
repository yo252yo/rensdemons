
const ABILITIES = {
  _abilities: new FluidMap(),

  factory: {
    save: function() {
      DISK.set("abilities", {
       "abilities": ABILITIES._abilities.export()
     });
    },

    import: function(save) {
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
