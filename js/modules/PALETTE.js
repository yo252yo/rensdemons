// use (Color)

const PALETTE = {
  pick_harmonized_palette(){
    this.color_background = Color.random().hoffset(0.45);
    this.color_void = this.color_background.opposite();

    this.color_obj_light = this.color_background.hoffset(-0.25);
    this.color_player =  this.color_obj_light.opposite().hoffset(0.1);;

    this.color_obj_dark = this.color_obj_light.hoffset(-0.2);
  },

  pick_random_palette(){
    this.color_background = Color.random();

    this.color_void = Color.random();
    this.color_player = this.color_void.hoffset(0.3, true);

    this.color_obj_light = Color.random().hoffset(0.3, true);
    this.color_obj_dark = this.color_obj_light.hoffset(0.2, true);
  },

  initialize: function() {
    this.pick_harmonized_palette();

    document.body.style.backgroundColor = this.color_void.code();
  },

};
