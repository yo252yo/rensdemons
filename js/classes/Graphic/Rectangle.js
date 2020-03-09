// use(VisualElement)

class Rectangle extends VisualElement {
    constructor(x, y, w, h, color) {
        super(x,y,w,h);

        var html_rectangle = document.createElement('div');
        html_rectangle.style.backgroundColor = color;
        html_rectangle.style.width = "100%";
        html_rectangle.style.height = "100%";
        html_rectangle.style.zIndex = -1;
        this.container.style.zIndex = -1;

        this.container.appendChild(html_rectangle);
    }
}
