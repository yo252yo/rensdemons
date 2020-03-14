// use(VisualElement)
// runtime PALETTE

var _TEXTBOX_ZINDEX = 10000;
var _MIN_PAGE_TIME_MS = 500;
var _LETTER_SIZE = [];



var TEXT_STYLE = function(div){
  div.style.fontSize = "27px";
  div.style.fontFamily = "monospace";
}

// Initialize the module (measure char size)
var test_div = document.createElement('div');
document.body.appendChild(test_div);
test_div.innerHTML="Lorem Ipsum is simply dummy text of the printing a<br />";
test_div.innerHTML+="Lorem Ipsum is simply dummy text of the printing a<br />";
test_div.innerHTML+="Lorem Ipsum is simply dummy text of the printing a<br />";
test_div.innerHTML+="Lorem Ipsum is simply dummy text of the printing a<br />";
test_div.innerHTML+="Lorem Ipsum is simply dummy text of the printing a";
test_div.style.height = "auto";
test_div.style.width = "auto";
test_div.style.position = "absolute";
test_div.style.background = "red";
test_div.style.zIndex = "100000";
test_div.style.whiteSpace = "nowrap";

TEXT_STYLE(test_div);

var char_width = test_div.clientWidth / 50;
var char_height = test_div.clientHeight / 5;

_LETTER_SIZE = [char_width, char_height];

//test_div.style.display="none";


class TextBox extends VisualElement {
    constructor(x, y, w, h, padding) {
        super(x,y,w,h);

        if (!padding){
          padding = 7;
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

        TEXT_STYLE(this.html);
        this.measure_text(w, h, padding);

        this.html.style.padding = padding + "px";

        this.html.style.overflow = "hidden";
        this.html.style.wordBreak = "break-all";

        this.container.appendChild(this.html);

        this.pending_text = "";

        this.last_turned = (new Date()).getTime();
    }

    measure_text(w, h, padding){
      var text_height = h - 2 * padding;
      var text_width = w - 2 * padding;
      var line_width = Math.floor(text_width / _LETTER_SIZE[0]);
      var num_lines = Math.floor(text_height / _LETTER_SIZE[1]);
      this.letter_capacity = line_width * num_lines;
    }

    cut_text(text) {
      if (text.length <= this.letter_capacity){
        return [text, ""];
      }

      var hard_cut = text.substring(0, this.letter_capacity-3); // +1 in case the last is space, -3 for elipsis
      var lastSpace = hard_cut.lastIndexOf(" ");
      var start = text.substring(0, lastSpace);
      var end = text.substring(1 + lastSpace);
      return [start, end];
    }

    change_text(text){
      this.html.innerHTML = this.cut_text(text)[0];
      if (this.cut_text(text)[1] != ""){
        this.html.innerHTML += "...";
        this.pending_text = this.cut_text(text)[1];
      } else {
        this.pending_text = "";
      }
    }

    adjust_depth(z){
      super.adjust_depth(z);
      this.html.style.zIndex = z;
    }

    turn_page (){
      var now =  (new Date()).getTime();
      if (now - this.last_turned < _MIN_PAGE_TIME_MS){
        return;
      }
      this.last_turned = now;
      if (this.pending_text == ""){
        IO.control_character();
        this.destroy();
      } else {
        this.change_text(this.pending_text);
      }
    }
}
