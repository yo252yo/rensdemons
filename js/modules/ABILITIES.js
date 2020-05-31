const ABILITY = {
  Flee: "Flee",
  CallHelp: "Call help",
}


const ABILITIES = {
  _DISK_KEY: "abilities",
  _abilities: new FluidMap(),

  factory: {
    save: function() {
      DISK.set(ABILITIES._DISK_KEY, {
       "content": ABILITIES._abilities.export()
     });
    },

    import: function(save) {
      ABILITIES._abilities = new FluidMap(save["content"]);
    },

    make_new: function() {
      ABILITIES._abilities.set([ABILITY.Flee], true);
      ABILITIES._abilities.set([ABILITY.CallHelp], true);
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

  has_ability: function(name) {
    return ABILITIES._abilities.get([name]);
  },

}
