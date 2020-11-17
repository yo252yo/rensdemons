// use(VisualElement)

class Rectangle extends VisualElement {
    constructor(x, y, w, h, color) {
        super(x,y,w,h);

        this.html_rectangle = HTML.div.make({w:"100%", h:"100%", z:-1});

        this.color = color;
        this.container.style.zIndex = -1;
//        this.container.style.padding = "0px 100px 100px 0px";

        this.draw();
        this.container.appendChild(this.html_rectangle);
    }

    adjust_depth(z) {
      super.adjust_depth(z);
      this.html_rectangle.style.zIndex = z;
    }

    draw() {
      this.html_rectangle.style.backgroundColor = PALETTE.color_code_with_default(this.color, this.color);
    }
}
