
const GLITCH = {
  BERKELEY_DISTANCE: 170,

  update_surroundings_berkeley: function() {
    var max = 1.5 * Math.max(SCREEN.width(), SCREEN.height());

    var c = CURRENTLEVEL.objects.get_all_objects();
    for(var o of c) {
      if (!o || o == CHARACTER.character || !o.distance_to_character || !o.visual_element){
        continue;
      }
      if(Math.random() < 0.1){
        continue; // glitches
      }

      /* // Version 1: super blinky
      var max = FOG.viewport() / 2;
      var min = GLITCH.BERKELEY_DISTANCE;
      var d = (min + max) / 2 + Math.random() * (max - min) / 2;
      if(o.distance_to_character() >  d) {
        o.visual_element.hide();
      } else {
        o.visual_element.show();
      }*/
      var d = o.distance_to_character();
      if (d > max){
        continue;
      } else if(d > FOG.viewport() / 2) {
        o.visual_element.hide();
      } else if (d < GLITCH.BERKELEY_DISTANCE) {
        o.visual_element.show();
      } else {
        /* // Version 2: objects in viewport stuck to hidden
        var r = Math.random();
        if(r < 0.2){
          o.visual_element.show();
        } else if(r > 0.97){
          o.visual_element.hide();
        }*/

        if(Math.random() < 0.98){
          o.visual_element.show();
        } else {
          o.visual_element.hide();
        }
      }
    }


    clearTimeout(GLITCH.berkeley_timeout); // avoid collisions since FOG.draw is called every level.
    var delay = 300 + 300 * (Math.random() - 0.5);
    GLITCH.berkeley_timeout = setTimeout(GLITCH.update_surroundings_berkeley, delay);
  }
}
