// use (Color)

const PALETTE = {
  pick_harmonized_palette() {
    this.color_background = Color.random().hoffset(0.5);
    this.color_void = this.color_background.opposite();

    this.color_obj_light = this.color_background.hoffset(-0.3);
    this.color_player = this.color_void.hoffset(0.3, true); //  this.color_obj_light.opposite();

    this.color_obj_dark = this.color_obj_light.hoffset(-0.2);
  },

  pick_random_palette() {
    this.color_background = Color.random();

    this.color_void = Color.random();
    this.color_player = this.color_void.hoffset(0.3, true);

    this.color_obj_light = Color.random().hoffset(0.3, true);
    this.color_obj_dark = this.color_obj_light.hoffset(0.2, true);
  },

  text_background() {
    var base = this.color_obj_dark;
    if (PALETTE.color_obj_dark.is_dark()) {
      return base.hoffset(-0.3);
    } else{
      return base.hoffset(0.3);
    }
  },

  text_color() {
    var base =  this.color_obj_light;
    if (PALETTE.color_obj_dark.is_dark()) {
      return base.hoffset(0.5);
    } else{
      return base.hoffset(-0.5);
    }
  },

  text_border() {
  if (PALETTE.color_obj_dark.is_dark()) {
    return this.color_void.hoffset(0.3);
  } else{
    return this.color_void.hoffset(-0.3);
  }
  },

  initialize: function() {
    this.pick_harmonized_palette();

    document.body.style.backgroundColor = this.color_void.code();
  },

  save: {
    export: function() {
      return {
        "color_background": this.color_background,
        "color_void": this.color_void,

        "color_obj_light": this.color_obj_light,
        "color_player": this.color_player,

        "color_obj_dark": this.color_obj_dark,
      };
    },

    load: function(save) {
      this.color_background = save.color_background;
      this.color_void = save.color_void;

      this.color_obj_light = save.color_obj_light;
      this.color_player = save.color_player;

      this.color_obj_dark = save.color_obj_dark;
    },
  },

};
