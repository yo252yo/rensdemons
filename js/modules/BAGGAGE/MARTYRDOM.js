
const MARTYRDOMS = {
  Foresight: "enemy attack foresight",
  Reflex: "dodge speed",
  Elusiveness: "dodge precision",

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

  death: function() {
    MARTYRDOM._spare_points ++;
  },

  purchase: function(category) {
    var p = MARTYRDOM._get.price(category);
    if (p <= MARTYRDOM._spare_points){
      MARTYRDOM._progress.increment([category]);
      MARTYRDOM._spare_points -= p;
      MARTYRDOM.display._fill_menu();
    } else {
      alert(`Not enough martyrdom (required ${p}).`);
    }
  },

  effect: function(category) { // scale of 0 to 1
    var ladder = [0, 0.01, 0.02, 0.05, 0.1, 0.25, 0.5, 0.7, 0.8, 0.9];
    var n = MARTYRDOM._get.lvl(category);
    if(n <= 7){
      return ladder[n];
    } else {
      return 1-0.1/(n-8);
    }
  },

  _get: {
    lvl: function(category) {
      var lvl = MARTYRDOM._progress.get([category]);
      if (!lvl){ lvl = 0; }
      return lvl;
    },

    price: function(category) {
      var ladder = [2, 4, 8, 15, 30, 50, 75, 100];
      var n = MARTYRDOM._get.lvl(category);
      if(n <= 7){
        return ladder[n];
      } else {
        return 100*(n-6);
      }
    },
  },

  display: {
    _category: function(category){
      return `${MARTYRDOMS[category]} (${MARTYRDOM._get.lvl(category)})`;
    },

    _fill_menu: function(){
      if(!MARTYRDOM.menu){return;}
      var title = "<b>Martyrdom</b><hr/>";
      title += "Unspent:" + "&psi;".repeat(MARTYRDOM._spare_points) + "<br />";
      title += "Pray for better:";
      var options = [];
      for(var i in MARTYRDOMS){
        (function (index){
          options.push({
            "text": MARTYRDOM.display._category(index),
            "effect": function(){ MARTYRDOM.purchase(index); },
            "keep_open": true
          });
        })(i);
      }
      options.push({"text": "", "effect": function(){}, "keep_open": true});
      options.push({"text": "Don't pray now", "effect": "##CLOSE"});
      MARTYRDOM.menu.change(title, options);
      MARTYRDOM.menu.print_menu();
    },

    menu: function() {
      MARTYRDOM.menu = new CenteredTextMenu();
      MARTYRDOM.display._fill_menu();
    },
  },
}
