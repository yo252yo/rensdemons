// use(TextElement)
// runtime PALETTE

var _LETTER_BY_LETTER_DELAY = 20;
var _MIN_PAGE_TIME_MS = 250;


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

class TextBox extends TextElement {
    constructor(x, y, w, h, padding) {
        super(x,y,w,h, padding);

        this.measure_letter_capability(w, h, padding);
        this.text_future_pages = "";
        this.last_turned = (new Date()).getTime();
        
        IO.control_dialog(this);
    }

    measure_letter_capability(w, h, padding) {
      var text_height = h - 2 * padding;
      var text_width = w - 2 * padding;
      var line_width = Math.floor(text_width / _LETTER_SIZE[0]);
      var num_lines = Math.floor(text_height / _LETTER_SIZE[1]);
      this.letter_capacity = line_width * num_lines;
    }

    cut_text_to_page(text) {
      if (text.length <= this.letter_capacity) {
        return [text, ""];
      }

      var hard_cut = text.substring(0, this.letter_capacity-3); // +1 in case the last is space, -3 for elipsis
      var lastSpace = hard_cut.lastIndexOf(" ");
      var start = text.substring(0, lastSpace);
      var end = text.substring(1 + lastSpace);
      return [start, end];
    }

    static print_text(textbox, instant) {
      if (instant) {
        textbox.html.innerHTML += textbox.text_printing;
        textbox.text_printing = "";
        return;
      }

      var char = textbox.text_printing[0];
      var left = textbox.text_printing.substring(1);

      if (textbox.text_printing) {
        textbox.html.innerHTML += char;
        textbox.text_printing = left;
        textbox.text_printing_timeout = setTimeout(TextBox.print_text, _LETTER_BY_LETTER_DELAY, textbox);
      } else {
        clearTimeout(textbox.text_printing_timeout);
        delete textbox.text_printing_timeout;
      }
    }

    process_text(text) {
      var processed = "";
      while (text.indexOf("$$") >= 0){
        var pos = text.indexOf("$$");
        processed += text.substr(0, pos);
        text = text.substr(pos + 2); //"$$"
        var end = text.indexOf("$");
        if (end == -1) end = text.length -1;
        var key = text.substr(0, end);
        text = text.substr(end + 1);

        processed += DICTIONARY.get(key);
      }
      processed += text;
      return processed;
    }

    change_text(text, instant) {
      text = this.process_text(text);
      this.text_printing = this.cut_text_to_page(text)[0];
      if (this.cut_text_to_page(text)[1] != "") {
        this.text_printing += "...";
        this.text_future_pages = this.cut_text_to_page(text)[1];
      } else {
        this.text_future_pages = "";
      }
      this.clear_html();
      TextBox.print_text(this, instant);
    }

    turn_page() {
      if (this.text_printing_timeout) {
        clearTimeout(this.text_printing_timeout);
        delete this.text_printing_timeout;
        TextBox.print_text(this, true);
        return;
      }
      var now =  (new Date()).getTime();
      if (now - this.last_turned < _MIN_PAGE_TIME_MS) {
        return;
      }
      this.last_turned = now;
      if (this.text_future_pages == "") {
        IO.cede_control();
        if (this.on_end_function){
          this.on_end_function();
        }
        this.destroy();
      } else {
        this.change_text(this.text_future_pages);
      }
    }

    onEnd(f){
      this.on_end_function = f;
    }
}
