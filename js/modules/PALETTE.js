// use (Color)

const PALETTE = {

  initialize: function() {
    PALETTE.generate.pick_harmonized_palette();

    document.body.style.backgroundColor = PALETTE.color_void.code();
  },

  text_background: function() {
    var base = PALETTE.color_obj_dark;
    if (PALETTE.color_obj_dark.is_dark()) {
      return base.hoffset(-0.3);
    } else{
      return base.hoffset(0.3);
    }
  },

  text_color: function() {
    var base =  PALETTE.color_obj_light;
    if (PALETTE.color_obj_dark.is_dark()) {
      return base.hoffset(0.5);
    } else{
      return base.hoffset(-0.5);
    }
  },

  text_border: function() {
    if (PALETTE.color_obj_dark.is_dark()) {
      return PALETTE.color_void.hoffset(0.3);
    } else{
      return PALETTE.color_void.hoffset(-0.3);
    }
  },

  generate:{
    pick_harmonized_palette: function() {
      PALETTE.color_background = Color.random().hoffset(0.5);
      PALETTE.color_void = PALETTE.color_background.opposite();

      PALETTE.color_obj_light = PALETTE.color_background.hoffset(-0.3);
      PALETTE.color_player = PALETTE.color_void.hoffset(0.3, true); //  PALETTE.color_obj_light.opposite();

      PALETTE.color_obj_dark = PALETTE.color_obj_light.hoffset(-0.2);
    },

    pick_random_palette: function() {
      PALETTE.color_background = Color.random();

      PALETTE.color_void = Color.random();
      PALETTE.color_player = PALETTE.color_void.hoffset(0.3, true);

      PALETTE.color_obj_light = Color.random().hoffset(0.3, true);
      PALETTE.color_obj_dark = PALETTE.color_obj_light.hoffset(0.2, true);
    },
  },

  save: {
    export: function() {
      return {
        "color_background": PALETTE.color_background,
        "color_void": PALETTE.color_void,

        "color_obj_light": PALETTE.color_obj_light,
        "color_player": PALETTE.color_player,

        "color_obj_dark": PALETTE.color_obj_dark,
      };
    },

    load: function(save) {
      PALETTE.color_background = save.color_background;
      PALETTE.color_void = save.color_void;

      PALETTE.color_obj_light = save.color_obj_light;
      PALETTE.color_player = save.color_player;

      PALETTE.color_obj_dark = save.color_obj_dark;
    },
  },

};
