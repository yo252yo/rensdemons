const ABILITY = {
  Flee: "Flee",
  CallHelp: "Call help",
}


const ABILITIES = {
  _abilities: new FluidMap(),

  factory: {
    export: function() {
      return ABILITIES._abilities.export();
    },

    import: function(save) {
      ABILITIES._abilities = new FluidMap(save);
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

  console.log("AAA");
  ABILITIES._abilities.set([ABILITY.Flee], true);
  ABILITIES._abilities.set([ABILITY.CallHelp], true);
