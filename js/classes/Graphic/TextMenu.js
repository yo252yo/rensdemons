// use(TextElement)
// runtime SCREEN, IO



class TextMenu extends TextElement {
    constructor(text) {
        var top = Math.floor(SCREEN.height() * 0.2);
        var left = Math.floor(SCREEN.width() * 0.2);
        var height = 0;//Math.floor(SCREEN.height() * 0.31);
        var width = Math.floor(SCREEN.width() * 0.6);

        var padding = 30;

        super(left,top+height, width, height, padding);

      //  IO.control_dialog(this);

        this.html.innerHTML = text;
    }
}
