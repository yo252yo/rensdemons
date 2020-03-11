// use(VisualElement)

class Rectangle extends VisualElement {
    constructor(x, y, w, h, color) {
        super(x,y,w,h);

        this.html_rectangle = document.createElement('div');
        this.html_rectangle.style.backgroundColor = color;
        this.html_rectangle.style.width = "100%";
        this.html_rectangle.style.height = "100%";
        this.html_rectangle.style.zIndex = -1;
        this.container.style.zIndex = -1;
        this.container.style.padding = "0px 100px 100px 0px";

        this.container.appendChild(this.html_rectangle);
    }

    adjust_depth(z){
      super.adjust_depth(z);
      this.html_rectangle.style.zIndex = z;
    }
}
