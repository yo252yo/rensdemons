// use(VisualElement)

class CanvasElement extends VisualElement {
    constructor(color) {
        // Canvas properties are measured at drawing time
        super(0,0,0,0);
        this.id = Math.floor(Math.random() * 1000) + "/" + Date.now();
        this.color = color;

        this.html_canvas = document.createElement('canvas');
        this.html_canvas.id = "GE_" + this.id;
        this.html_canvas.style.position = "absolute";
        this.container.appendChild(this.html_canvas);
    }

    tint() {
      this.html_canvas.getContext('2d').globalCompositeOperation = 'source-in';
      this.html_canvas.getContext('2d').fillStyle = this.color;
      this.html_canvas.getContext('2d').fillRect(0, 0, this.html_canvas.width, this.html_canvas.height);
    }
}
