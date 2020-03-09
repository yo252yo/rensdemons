
const RESOURCES = {
  get_img(name) {
      var resource = document.getElementById("R_" + name);
      if (resource) {
          return resource;
      }
      var resource = document.createElement("img");
      resource.id = "R_" + name;
      resource.src = name;
      resource.style = "display:none;";

      document.body.appendChild(resource);
      return resource;
  },

  onload(resource, f){
    resource.addEventListener('load', f);
    f(); // In case it's already loaded
  },

};
