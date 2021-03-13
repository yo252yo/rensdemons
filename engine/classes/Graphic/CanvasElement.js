// use(VisualElement)

class CanvasElement extends VisualElement {
    constructor(color, container) {
        // Canvas properties are measured at drawing time
        super(0,0,0,0, container);
        this.id = RANDOM.int(1000) + "/" + Date.now();
        this.color = color;

        this.html_canvas = document.createElement('canvas');
        this.html_canvas.id = "GE_" + this.id;
        this.html_canvas.style.position = "absolute";
        this.container.appendChild(this.html_canvas);
    }

    tint() {
      HTML.canvas.tint(this.html_canvas, this.color);
    }
}
