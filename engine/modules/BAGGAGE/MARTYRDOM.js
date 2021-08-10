
const MARTYRDOMS = {
  Movement: "walking speed",
  Vision: "sight range",

  Foresight: "preparation time",
  Reflex: "dodge speed",
  Elusiveness: "dodge precision",
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

  death: function(inc) {
    if(!inc) {inc = 1;}
    MARTYRDOM._spare_points += inc;
  },

  purchase: function(category_index) {
    var p = MARTYRDOM._get.price(category_index);
    if (p <= MARTYRDOM._spare_points){
      MARTYRDOM._progress.increment([MARTYRDOMS[category_index]]);
      MARTYRDOM._spare_points -= p;
      MARTYRDOM.display._fill_menu();
      // in case we buy fog
      FOG.moveToChar();
    } else {
      alert(`Not enough martyrdom (required ${p}).`);
    }
  },

  effect: function(category) { // scale of 0 to 1
    var ladder = [0, 0.05, 0.1, 0.2, 0.4, 0.6, 0.7, 0.8, 0.85, 0.9];
    var n = MARTYRDOM._get.lvl(category);
    if(n <= 9){
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

    price: function(category_index) {
      var ladder = [2, 4, 8, 15, 30, 50, 75, 100];
      var n = MARTYRDOM._get.lvl(MARTYRDOMS[category_index]);
      if(n <= 7){
        return ladder[n];
      } else {
        return 100*(n-6);
      }
    },
  },

  display: {
    _category: function(category_index){
      var category = MARTYRDOMS[category_index];
      return `${category} (${MARTYRDOM._get.lvl(category)})`;
    },

    _fill_menu: function(){
      if(!MARTYRDOM.menu){return;}
      var title = "<b>Martyrdom</b><hr/>";
      if (MARTYRDOM._spare_points > 0){
        title += "Unspent: " + MARTYRDOM._spare_points + "<br />";
      } else {
        title += "No spare martyrdom<br />";
      }
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
