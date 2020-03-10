// use (Color)

const PALETTE = {
  initialize: function() {
    PALETTE.color_background = Color.random().hoffset(0.45);
    PALETTE.color_player = PALETTE.color_background.opposite();
    PALETTE.color_obj_light = PALETTE.color_background.hoffset(-0.25);
    PALETTE.color_obj_dark = PALETTE.color_obj_light.hoffset(-0.2);

    document.body.style.backgroundColor = PALETTE.color_player.code();
  },

};
