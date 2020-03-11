// use (Color)

const PALETTE = {
  initialize: function() {
    this.color_background = Color.random().hoffset(0.45);
    this.color_player = this.color_background.opposite();
    this.color_obj_light = this.color_background.hoffset(-0.25);
    this.color_obj_dark = this.color_obj_light.hoffset(-0.2);

    document.body.style.backgroundColor = this.color_player.code();
  },

};
