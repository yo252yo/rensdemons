
const RESOURCES = {
  _LOADED: {},

  is_loaded: function(item) {
    RESOURCES._LOADED[item.id] = true;
  },


  get_img: function(name) {
      var resource = document.getElementById("R_" + name);
      if (resource) {
          return resource;
      }
      var resource = document.createElement("img");
      resource.id = "R_" + name;
      resource.src = name;
      resource.style = "display:none;";
      resource.onload = function(){RESOURCES.is_loaded(resource);};

      document.body.appendChild(resource);
      return resource;
  },

  onload: function(resource, f) {
    if(! RESOURCES._LOADED[resource.id]){
      resource.addEventListener('load', f);
    } else {
      f(); // In case it's already loaded
    }
  },

  preload: function(){
    RESOURCES.get_img('assets/battles/arachnid.png');
    RESOURCES.get_img('assets/battles/basilisk.png');
    RESOURCES.get_img('assets/battles/bat.png');
    RESOURCES.get_img('assets/battles/child_m.png');
    RESOURCES.get_img('assets/battles/cockroach.png');
    RESOURCES.get_img('assets/battles/rodent.png');
    RESOURCES.get_img('assets/battles/slime.png');
    RESOURCES.get_img('assets/battles/statue.png');
    RESOURCES.get_img('assets/battles/viper.png');
    RESOURCES.get_img('assets/characters/child_f.png');
    RESOURCES.get_img('assets/characters/child_m.png');
    RESOURCES.get_img('assets/characters/priest.png');
    RESOURCES.get_img('assets/characters/sora.png');
    RESOURCES.get_img('assets/interface/circle.png');
    RESOURCES.get_img('assets/interface/cross.png');
    RESOURCES.get_img('assets/interface/dodger.png');
    RESOURCES.get_img('assets/objects/column.png');
    RESOURCES.get_img('assets/objects/event.png');
    RESOURCES.get_img('assets/objects/savepoint.png');
    RESOURCES.get_img('assets/objects/statue.png');
    RESOURCES.get_img('assets/objects/tree.png');
    RESOURCES.get_img('assets/screens/gameover_layer0.png')
    RESOURCES.get_img('assets/screens/gameover_layer1.png')
    RESOURCES.get_img('assets/screens/gameover_layer2.png')
    RESOURCES.get_img('assets/screens/map_base.png');
    RESOURCES.get_img('assets/screens/map_seed.png');
    RESOURCES.get_img('assets/screens/title_layer0.png');
    RESOURCES.get_img('assets/screens/title_layer1.png');
    RESOURCES.get_img('assets/screens/title_layer2.png');
  },

};

RESOURCES.preload();
