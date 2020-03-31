
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

};
