// use(LEVEL)

class VisualElement {
    // visual elements are indexed at their bottom left corner
    constructor(x, y, w, h) {
        var ny = (y-h);

        this.container = document.createElement('div');
        this.container.style.position = "absolute";
        this.container.style.top = ny + "px";
        this.container.style.left = x + "px";
        this.container.style.width = w + "px";
        this.container.style.height = h + "px";
        this.container.style.zIndex = ny;

        LEVEL.html().appendChild(this.container);
    }

    move(x, y){
      this.container.style.top = y + "px";
      this.container.style.left = x + "px";
    }
}
