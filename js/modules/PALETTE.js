// use (Color)

const PALETTE = {
  _COLORS: {},

  text_background: function() {
    var base = PALETTE.color('obj_dark');
    if (PALETTE.color('obj_dark').is_dark()) {
      return base.hoffset(-0.3);
    } else{
      return base.hoffset(0.3);
    }
  },

  text_color: function() {
    var base =  PALETTE.color('obj_light');
    if (PALETTE.color('obj_dark').is_dark()) {
      return base.hoffset(0.5);
    } else{
      return base.hoffset(-0.5);
    }
  },

  text_border: function() {
    if (PALETTE.color('obj_dark').is_dark()) {
      return PALETTE.color('void').hoffset(0.3);
    } else{
      return PALETTE.color('void').hoffset(-0.3);
    }
  },

  generate: {
    pick_harmonized_palette: function() {
      PALETTE._COLORS['background'] = Color.random().hoffset(0.5);
      PALETTE._COLORS['void'] = PALETTE._COLORS['background'].opposite();

      PALETTE._COLORS['obj_light'] = PALETTE._COLORS['background'].hoffset(-0.3);
      PALETTE._COLORS['player'] = PALETTE._COLORS['void'].hoffset(0.3, true); //  PALETTE.color('obj_light').opposite();

      PALETTE._COLORS['obj_dark'] = PALETTE._COLORS['obj_light'].hoffset(-0.2);
    },

    pick_random_palette: function() {
      PALETTE._COLORS['background'] = Color.random();

      PALETTE._COLORS['void'] = Color.random();
      PALETTE._COLORS['player'] = PALETTE._COLORS['void'].hoffset(0.3, true);

      PALETTE._COLORS['obj_light'] = Color.random().hoffset(0.3, true);
      PALETTE._COLORS['obj_dark'] = PALETTE._COLORS['obj_light'].hoffset(0.2, true);
    },
  },

  color: function(key) {
    return PALETTE._COLORS[key];
  },

  _color_interface: function() {
    document.body.style.backgroundColor = PALETTE.color('void').code();
    var escape_button = document.getElementById('IFE_escape_menu_button');
    escape_button.style.background = PALETTE.text_background().code();
    escape_button.style.borderColor = PALETTE.text_border().code();
    escape_button.style.color = PALETTE.text_color().code();
  },

  factory: {
    make_new: function() {
      // TODO: at some point i want to pick random instead
      PALETTE.generate.pick_harmonized_palette();

      DISK.set('palette', PALETTE.factory.export());

      PALETTE._color_interface();
    },

    export: function() {
      var result = {};
      for (var key in PALETTE._COLORS){
        result[key] = PALETTE._COLORS[key].export();
      }
      return result;
    },

    import: function(save) {
      for (var key in save) {
        PALETTE._COLORS[key] = Color.import(save[key]);
      }
      PALETTE._color_interface();
    },
  },

};
