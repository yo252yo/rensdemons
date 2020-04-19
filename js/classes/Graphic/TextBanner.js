// use(TextBox)
// runtime SCREEN, IO


class TextBanner extends TextBox {
    constructor(text) {
        var top = Math.floor(SCREEN.height() * 0.62);
        var left = Math.floor(SCREEN.width() * 0.1);
        var height = Math.floor(SCREEN.height() * 0.31);
        var width = Math.floor(SCREEN.width() * 0.8);

        var padding = 30;

        super(left,top+height, width, height, padding);

        if (text) {
          this.change_text(text);
        }
    }
}


class TextBannerSequence {
  static make(texts, callback){
    if (texts.length == 0) {
      if (callback) return callback();
      else return;
    }
    var banner = new TextBanner(texts[0]);
    banner.onEnd(
      function(){
        TextBannerSequence.make(texts.slice(1), callback);
      }
    )
  }
}

class TextBannerRandom {
  constructor(possibilities) {
    new TextBanner(RANDOM.pick(possibilities));
  }
}


class TextBannerProgressive {
  constructor(lines) {
    this.state = 0;
    this.lines = lines;
  }

  progress() {
    new TextBanner(this.lines[this.state]);
    this.state = Math.min(this.state + 1, this.lines.length - 1);
  }
}
