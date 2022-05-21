// use(VisualElement)

class Rectangle extends VisualElement {
    constructor(x, y, w, h, color, texture, unresized) {
        super(x,y,w,h);

        this.html_rectangle = HTML.div.make({w:w, h:h, z:-1});

        this.color = color;
        this.container.style.zIndex = -1;
//        this.container.style.padding = "0px 100px 100px 0px";

        if(texture){
          this.html_rectangle.style.backgroundImage= `url(${texture})`;
          if(!unresized){
            this.html_rectangle.style.backgroundSize= `50px 50px`;
          }
        }
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

    border(color){
      this.html_rectangle.style.border = "3px solid " + PALETTE.color_code_with_default(color, color);
    }
}
