
class SpeakerIcon extends TextElement {
    constructor(name) {
      var top = 0;
      if(SCREEN.is_mobile()){
        top = SCREEN.height() * 0.45;
      } else {
        top = SCREEN.height() * 0.6;
      }
      super(SCREEN.width() * 0.05, top, 150, 150);
      this.html.innerHTML = `<div style="width:136px;height:136px;position:absolute;overflow:hidden;" id="portrait_div"></div>`;
      this.make_portrait(name);
    }

    is_supported_speaker(name){
      if(PARTYMEMBERS.isPartyMember(name)){
        return true;
      }
      if(name == "demon_lieutenant" || name == "demon_lord" || name == "Priest" || name == "Goddess"){
        return true;
      }
      return false;
    }

    get_x_offset(image_key) {
      switch(image_key) {
        case PARTYMEMBERS.TorturedSoul:
          return -120;
        case PARTYMEMBERS.DumbMuscles:
          return -100;
        case PARTYMEMBERS.WiseOld:
          return -100;
        default:
          return -80;
      }
    }

    get_y_offset(image_key) {
      switch(image_key) {
        case PARTYMEMBERS.RetiredProtector:
          return -20;
        default:
          return -75;
      }
    }

    make_portrait(name) {
      var image_key;
      name = name.replaceAll("$","");
      // We use this one trick because we need to be able to dynamically change the name during the fight
      if (name == DICTIONARY.get(PARTYMEMBERS.RetiredProtector)){
        name = PARTYMEMBERS.RetiredProtector;
      }
      if (this.is_supported_speaker(name)){ // For now, only party members have icons
          image_key = name;
      }
      if (! image_key) {
        this.destroy();
        return;
      }
      var div = document.getElementById("portrait_div");
      var v = new LayeredImage("assets/portraits_large/" + image_key + "_$.png", 300, 300, div);
      v.shift(this.get_x_offset(image_key), this.get_y_offset(image_key));
      v.adjust_depth(10000);
    }
  }
