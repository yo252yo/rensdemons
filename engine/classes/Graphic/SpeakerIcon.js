
class SpeakerIcon extends TextElement {
    constructor(name) {
      var top = 0;
      if(SCREEN.is_mobile()){
        top = SCREEN.height() * 0.45;
      } else {
        top = SCREEN.height() * 0.6;
      }
      super(SCREEN.width() * 0.05, top, 150, 150);
      this.html.innerHTML = `<div style="width:140px;height:140px;position:absolute;overflow:hidden;" id="portrait_div"></div>`;
      this.make_portrait(name);
    }

    make_portrait(name) {
      var image_key;
      // Name comes from the text, it is therefore a full name, not a key
      // For now, only party members have icons
      for(var i in PARTYMEMBERS){
        if(DICTIONARY.get(i) == name){
          image_key = i;
        }
      }
      if (! image_key) {
        this.destroy();
        return;
      }
      var div = document.getElementById("portrait_div");
      var v = new LayeredImage("assets/portraits_large/" + image_key + "_$.png", 300, 300, div);
      v.shift(-80, -75);
      v.adjust_depth(10000);
    }
  }
