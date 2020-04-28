// use(TextBox)
// runtime SCREEN, IO


class TextBanner extends TextBox {
  static getDimensions() {
    if(SCREEN.is_mobile()){
      return {
          top: Math.floor(SCREEN.height() * 0.5),
          left: Math.floor(SCREEN.width() * 0.05),
          height: Math.floor(SCREEN.height() * 0.45),
          width: Math.floor(SCREEN.width() * 0.9),
          padding: 10,
          };
    } else {
      return {
          top: Math.floor(SCREEN.height() * 0.62),
          left: Math.floor(SCREEN.width() * 0.1),
          height: Math.floor(SCREEN.height() * 0.31),
          width: Math.floor(SCREEN.width() * 0.8),
          padding: 30,
          };
    }
  }

  constructor(text) {
      var d = TextBanner.getDimensions();

      super(d.left,d.top+d.height, d.width, d.height, d.padding);

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
