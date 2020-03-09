// use(LEVEL)

class StaticSprite {
    static get_resource(name) {
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
    }

    constructor(path, color) {
        this.id = path + Date.now();
        this.path = path;
        this.color = color;
        this.initialize_html_canvas();
    }

    initialize_html_canvas() {
      this.html_canvas = document.createElement('canvas');
      this.html_canvas.id = "GE_" + this.id;
      this.html_canvas.style.position = "absolute";
      LEVEL.html().appendChild(this.html_canvas);

      this.resource = StaticSprite.get_resource(this.path);
      var thing_to_draw = this;
      this.resource.addEventListener('load', function(){ thing_to_draw.draw(); });
      this.draw(); // In case it's already loaded
    }

    draw() {
      this.html_canvas.width = this.resource.width;
      this.html_canvas.height = this.resource.height;

      this.html_canvas.getContext('2d').drawImage(this.resource, 0, 0);
      this.html_canvas.getContext('2d').globalCompositeOperation = 'source-in';
      this.html_canvas.getContext('2d').fillStyle = this.color;
      this.html_canvas.getContext('2d').fillRect(0, 0, this.html_canvas.width, this.html_canvas.height);
    }

    move(x, y){
      this.html_canvas.style.top = y + "px";
      this.html_canvas.style.left = x + "px";
    }
}
