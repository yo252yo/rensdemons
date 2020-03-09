// use(LEVEL)

class Rectangle {
    constructor(x, y, w, h, color) {

        var html_element = document.createElement('div');
        html_element.style.position = "absolute";
        html_element.style.top = y + "px";
        html_element.style.left = x + "px";
        html_element.style.width = w + "px";
        html_element.style.height = h + "px";
        html_element.style.backgroundColor = color;

        LEVEL.html().appendChild(html_element);
    }
}
