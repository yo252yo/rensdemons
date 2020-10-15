
const MARTYRDOMS = {
  Reflex: "dodge speed",
  Foresight: "enemy attack foresight",
  Elusiveness: "dodge spatial precision",
  
  Movement: "movement speed",
  Vision: "sight range",
}

const MARTYRDOM = {
  _progress: new FluidMap(),
  _spare_points: 0,

  factory: {
    export: function() {
      return {
        progress: MARTYRDOM._progress.export(),
        points: MARTYRDOM._spare_points,
      };
    },

    import: function(save) {
      MARTYRDOM._progress = new FluidMap(save.progress);
      MARTYRDOM._spare_points = save.points;
    },

    make_new: function() {
      MARTYRDOM._progress = new FluidMap();
    },
  },

  increase: function(){
    MARTYRDOM._spare_points ++;
  },

  display: function() {
    new MenuScreen("<b>Martyrdom</b><hr/>Unspent:" + "&psi;".repeat(MARTYRDOM._spare_points) );
  },
}
