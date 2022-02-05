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
test_div.id = "test_txt_div";
test_div.style.width = "auto";
test_div.style.position = "absolute";
test_div.style.background = "red";
test_div.style.zIndex = "200000";
test_div.style.whiteSpace = "nowrap";

TEXT_STYLE(test_div);

var char_width = test_div.clientWidth / 50;
var char_height = test_div.clientHeight / 5;

_LETTER_SIZE = [char_width, char_height];

//test_div.style.display="none";

class TextBox extends TextElement {
    constructor(x, y, w, h, padding, anchored) {
        super(x,y,w,h, padding, anchored);

        this.measure_letter_capability(w, h, padding);
        this.text_future_pages = "";
        this.last_turned = (new Date()).getTime();
        this.speaker = null;
    }

    measure_letter_capability(w, h, padding) {
      var text_height = h - 2 * padding;
      var text_width = w - 2 * padding;
      this.line_width = Math.floor(text_width / _LETTER_SIZE[0]);
      this.num_lines = Math.floor(text_height / _LETTER_SIZE[1]);
      this.letter_capacity = this.line_width * this.num_lines;
    }

    cut_lines(left){
      var result = [];

      while (left.length > this.line_width){
        var br = left.indexOf("<br");
        if (br > 0 && br <= this.line_width) {
          result.push(left.substring(0, br));
          left = left.substring(br);
          left = left.substring(left.indexOf(">")+1);
          continue;
        }


        var hard_cut = left.substring(0, this.line_width);
        // Makes extra space for ...
        if ((result.length + 1 ) % this.num_lines == 0){
          hard_cut = hard_cut.substring(0, hard_cut.length - 3);
        }
        var lastSpace = hard_cut.lastIndexOf(" ");
        if (lastSpace < 0){
          lastSpace = hard_cut.length;
        }
        result.push(left.substring(0, lastSpace));
        left = left.substring(1 + lastSpace);
      }

      result.push(left);
      return result;
    }

    cut_to_pages(text) {
      var lines = this.cut_lines(text);
      var pages = [];
      var page = "";

      for (var l = 0; l <lines.length; l++){
        page += lines[l];
        if ((l+1) % this.num_lines == 0 && l != lines.length - 1) {
          pages.push(page + "...");
          page = "";
        } else {
          page +=  "<br />";
        }
      }
      if(page){
        pages.push(page);
      }
      return pages;
    }

    static print_text(textbox, instant) {
      var text_printing = textbox.pages[0];

      if (instant) {
        textbox.html.innerHTML += GLITCH.text.process(text_printing);
        return;
      }

      if(! text_printing) {
        clearTimeout(textbox.text_printing_timeout);
        delete textbox.text_printing_timeout;
        return;
      }

      if (text_printing.startsWith("<sp")) {
        var cutoff = text_printing.indexOf("an>") + 2;
        textbox.html.innerHTML += text_printing.substr(0, cutoff+1);
        textbox.pages[0] = text_printing.substr(cutoff + 1, text_printing.length - cutoff);
      } else if(text_printing.startsWith("<br")){
        var cutoff = text_printing.indexOf(">");
        textbox.html.innerHTML += text_printing.substr(0, cutoff+1);
        textbox.pages[0] = text_printing.substr(cutoff + 1, text_printing.length - cutoff);
      } else {
        var c = text_printing[0];
        textbox.html.innerHTML += c;
        GLITCH.text.process(text_printing[0]);
        textbox.pages[0] = text_printing.substring(1);
      }


      textbox.text_printing_timeout = setTimeout(TextBox.print_text, _LETTER_BY_LETTER_DELAY, textbox);
    }

    fill_words_from_dictionary(text) {
      var processed = "";
      while (text.indexOf("$$") >= 0){
        var pos = text.indexOf("$$");
        processed += text.substr(0, pos);
        text = text.substr(pos + 2); //"$$"
        var end = text.indexOf("$");
        if (end == -1) end = text.length -1;
        var key = text.substr(0, end);
        text = text.substr(end + 1);

        if(key == "&ENEMY"){
          var b = BATTLE.current_battle.split("/");
          processed += STRING_UTILS.camel_case(b[b.length-1]);
        } else {
          processed += DICTIONARY.get(key);
        }
      }
      processed += text;
      return processed;
    }

    process_speaker_icon(text) { // this is before dictionary resolution
      var space = text.indexOf(" ");
      var period = text.indexOf(":");
      var linebreak = text.indexOf("<");
      if (space == period + 1 || linebreak == period + 1)  {
        var speaker = text.substr(0, period);
        if (this.speaker) {
          this.speaker.destroy();
        }
        this.speaker = new SpeakerIcon(speaker);
      }
    }

    process_for_dialog() {
      var text = this.pages[0];
      var space = text.indexOf(" ");
      var period = text.indexOf(":");
      var linebreak = text.indexOf("<");
      if (space == period + 1 || linebreak == period + 1)  {
        var speaker = text.substr(0, period);
        this.html.style.color = PALETTE.text_speaker_color().code();
        this.pages[0] = "<span style=\"color:" + PALETTE.text_color().code() + ";\">" + speaker + ":</span>" +  text.substr(period + 1, text.length - period);
      }
    }

    change_text(text, instant, skip_processing) {
      if (skip_processing){
        this.pages = [text];
      } else {
        this.process_speaker_icon(text);
        text = this.fill_words_from_dictionary(text);
        this.pages = this.cut_to_pages(text);
        this.process_for_dialog();
      }

      this.clear_html();
      TextBox.print_text(this, instant);
    }

    turn_page() {
      // Accelerate display
      if (this.text_printing_timeout) {
        clearTimeout(this.text_printing_timeout);
        delete this.text_printing_timeout;
        TextBox.print_text(this, true);
        return;
      }

      AUDIO.effect.page();

      // Prevent double click
      var now =  (new Date()).getTime();
      if (now - this.last_turned < _MIN_PAGE_TIME_MS) {
        return;
      }

      // Actually turns pages
      if (this.speaker) {
        this.speaker.destroy();
      }
      this.last_turned = now;
      this.pages = this.pages.slice(1);
      this.html.innerHTML = "";

      if (this.pages.length == 0) {
        IO.control.cede();
        if (this.on_end_function){
          var f = this.on_end_function;
          this.on_end_function = undefined;
          f();
        }
        this.destroy();
      } else {
         TextBox.print_text(this);
      }
    }

    onEnd(f){
      this.on_end_function = f;
    }
}


class TextBoxFitted extends TextBox {
  constructor(x, y, text) {
      var t = text.split("<br />");
      var max_l = t[0].length;
      for(var line of t){
        if (line.length > max_l){ max_l = line.length;}
      }
      // Try to center on x!
      super(x - _LETTER_SIZE[0] * max_l / 2, y,
            20 + _LETTER_SIZE[0] * max_l, 20 + _LETTER_SIZE[1] * t.length,
            5, true);
      this.change_text(text, true, false);
      this.html.style.textAlign = "center";
  }
}


class InteractingTextBox extends TextBox {
    constructor(x, y, w, h, padding, anchored) {
        super(x,y,w,h, padding, anchored);
        IO.control.dialog(this);
    }
  }
