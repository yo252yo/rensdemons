// use(VisualElement)
// runtime PALETTE

var _TEXT_ZINDEX = 20000;
var _LETTER_SIZE = [];



var TEXT_STYLE = function(div) {
  if(SCREEN.is_mobile()){
    div.style.fontSize = "33px";
  } else {
    div.style.fontSize = "27px";
  }
  div.style.fontFamily = "monospace";
}


class TextElement extends VisualElement {
    constructor(x, y, w, h, padding, anchored) {
        super(x,y,w,h);

        if (!padding) {
          padding = 7;
        }

        this.html = document.createElement('div');

        this.adjust_depth(_TEXT_ZINDEX);

        if (anchored){
          this.container.style.position = "absolute";
        } else {
          this.container.style.position = "fixed";
        }

        this.container.style.top = (y-h) + "px";
        this.container.style.left = x + "px";
        this.container.style.height = h + "px";
        this.container.style.width = w + "px";
        this.html.style.height = (h - 2 * padding) + "px";
        this.html.style.width = (w - 2 * padding) + "px";
        this.draw();

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

    draw() {
      this.html.style.background = PALETTE.text_background().code();
      this.html.style.border = "5px outset " + PALETTE.text_border().code();
      this.html.style.color = PALETTE.text_color().code();
    }

    // this was pretty hard, I wouldn't be surprised if it's wrong.
    scroll_if_overflow() {
      var height_before = this.html.style.height;
      this.html.style.height = ""; // we need clientHeight to be meaningful.
      var self = this;
      var f = function(){
        var realY = self.y - self.height;
        var max_height = SCREEN.height() - realY;
        var new_height_scaled = Math.floor(0.9 * max_height / SCREEN.real_ratio());
        if (self.html.clientHeight > max_height) {
          self.html.style.height = new_height_scaled + "px";
          self.html.style.overflow = "scroll";
        } else {
          self.html.style.height = height_before;
        }
      }
      setTimeout(f, 100);
    }
}
