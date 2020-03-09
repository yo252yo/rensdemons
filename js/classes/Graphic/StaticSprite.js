// use(VisualElement)

class StaticSprite extends VisualElement {
    constructor(path, color) {
        // TODO could be more meaningful
        super(0,0,0,0);
        this.id = path + Date.now();
        this.path = path;
        this.color = color;
        this.initialize_html_canvas();
    }

    initialize_html_canvas() {
      this.html_canvas = document.createElement('canvas');
      this.html_canvas.id = "GE_" + this.id;
      this.html_canvas.style.position = "absolute";
      this.container.appendChild(this.html_canvas);

      this.resource = RESOURCES.get_img(this.path);
      var thing_to_draw = this;
      RESOURCES.onload(this.resource, function(){ thing_to_draw.draw(); });
    }

    draw() {
      this.html_canvas.width = this.resource.width;
      this.html_canvas.height = this.resource.height;

      this.html_canvas.getContext('2d').drawImage(this.resource, 0, 0);
      this.html_canvas.getContext('2d').globalCompositeOperation = 'source-in';
      this.html_canvas.getContext('2d').fillStyle = this.color;
      this.html_canvas.getContext('2d').fillRect(0, 0, this.html_canvas.width, this.html_canvas.height);
    }
}
