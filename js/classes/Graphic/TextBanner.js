// use(TextBox)
// runtime SCREEN, IO

var _TEXTBOX_ZINDEX = 10000;


class TextBanner extends TextBox {
    constructor(text) {
        var top = Math.floor(SCREEN.height() * 0.62);
        var left = Math.floor(SCREEN.width() * 0.1);
        var height = Math.floor(SCREEN.height() * 0.31);
        var width = Math.floor(SCREEN.width() * 0.8);

        var padding = 30;

        super(left,top+height, width, height, padding);

        IO.control_dialog(this);

        if (text) {
          this.change_text(text);
        }
    }
}
