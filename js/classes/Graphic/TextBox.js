// use(VisualElement)
// runtime PALETTE

var _TEXTBOX_ZINDEX = 10000;


class TextBox extends VisualElement {
    constructor(x, y, w, h, padding) {
        super(x,y,w,h);

        if (!padding){
          padding = 0;
        }

        this.html = document.createElement('div');

        this.adjust_depth(_TEXTBOX_ZINDEX);

        this.container.style.position = "fixed";

        this.container.style.top = (y-h) + "px";
        this.container.style.left = x + "px";
        this.container.style.height = h + "px";
        this.container.style.width = w + "px";
        this.html.style.height = (h - 2 * padding) + "px";
        this.html.style.width = (w - 2 * padding) + "px";

        this.html.style.background = PALETTE.text_background().code();
        this.html.style.border = "5px outset " + PALETTE.text_border().code();
        this.html.style.color = PALETTE.text_color().code();
        this.html.style.fontSize = "xx-large";

        this.html.style.padding = padding + "px";

        this.container.appendChild(this.html);
    }

    change_text(text){
      this.html.innerHTML = text;
    }

    adjust_depth(z){
      super.adjust_depth(z);
      this.html.style.zIndex = z;
    }
}
