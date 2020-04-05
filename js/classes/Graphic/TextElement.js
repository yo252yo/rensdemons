// use(VisualElement)
// runtime PALETTE

var _TEXT_ZINDEX = 10000;
var _LETTER_SIZE = [];



var TEXT_STYLE = function(div) {
  div.style.fontSize = "27px";
  div.style.fontFamily = "monospace";
}


class TextElement extends VisualElement {
    constructor(x, y, w, h, padding) {
        super(x,y,w,h);

        if (!padding) {
          padding = 7;
        }

        this.html = document.createElement('div');

        this.adjust_depth(_TEXT_ZINDEX);

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
        
        TEXT_STYLE(this.html);

        this.html.style.padding = padding + "px";

        this.html.style.overflow = "hidden";
        this.html.style.wordBreak = "break-all";

        this.container.appendChild(this.html);
    }

    clear_html() {
      this.html.innerHTML = "";
    }

    adjust_depth(z) {
      super.adjust_depth(z);
      this.html.style.zIndex = z;
    }
}
