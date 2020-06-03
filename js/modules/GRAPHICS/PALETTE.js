// use (Color)

const PALETTE = {
  _DISK_KEY: "palette",
  _COLORS: {},

  battle_menu_background: function() {
    var base = PALETTE.color('void');
    if (PALETTE.color('void').is_dark()) {
      return base.hoffset(-0.3);
    } else{
      return base.hoffset(0.3);
    }
  },

  battle_menu_color: function() {
    var base =  PALETTE.color('player');
    if (PALETTE.color('void').is_dark()) {
      return base.hoffset(0.5);
    } else{
      return base.hoffset(-0.5);
    }
  },

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

  text_speaker_color: function() {
    var base =  PALETTE.text_color();
    if (base.is_dark()) {
      return base.hoffset(0.4);
    } else{
      return base.hoffset(-0.4);
    }
  },

  text_border: function() {
    if (PALETTE.color('obj_dark').is_dark()) {
      return PALETTE.color('void').hoffset(0.3);
    } else{
      return PALETTE.color('void').hoffset(-0.3);
    }
  },

  print() {
    for (var i in PALETTE._COLORS){
      CONSOLE.debug(i + ": " + PALETTE._COLORS[i].code(), PALETTE._COLORS[i].code());
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

  color_code_with_default: function(key, def) {
      var color_from_name = PALETTE.color(key);
      if (color_from_name) {
        return color_from_name.code()
      } else {
        return def;
      }
  },

  color_interface: function() {
    document.body.style.backgroundColor = PALETTE.color('void').code();
    var escape_button = document.getElementById('IFE_escape_menu_button');
    escape_button.style.background = PALETTE.text_background().code();
    escape_button.style.borderColor = PALETTE.text_border().code();
    escape_button.style.color = PALETTE.text_color().code();

    CURRENTLEVEL.redraw();
  },


  color_for_battle: function() {
    document.body.style.backgroundColor = PALETTE.color('obj_dark').code();
  },

  factory: {
    make_new: function() {
      // TODO: at some point i want to pick random instead
      PALETTE.generate.pick_harmonized_palette();

      DISK.set(PALETTE._DISK_KEY, PALETTE.factory.export());

      PALETTE.color_interface();
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
      PALETTE.color_interface();
    },
  },

};
