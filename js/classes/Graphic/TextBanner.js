// use(TextBox)
// runtime SCREEN

var _TEXTBOX_ZINDEX = 10000;


class TextBanner extends TextBox {
    constructor() {
        var top = Math.floor(SCREEN.height() * 0.65);
        var left = Math.floor(SCREEN.width() * 0.1);
        var height = Math.floor(SCREEN.height() * 0.3);
        var width = Math.floor(SCREEN.width() * 0.8);

        super(left,top+height, width, height, 30);

        this.html.style.overflow = "scroll";
    }
}
