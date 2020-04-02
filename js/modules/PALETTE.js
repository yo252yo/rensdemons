// use (Color)

const PALETTE = {
  _COLORS: {},

  initialize: function() {
    PALETTE.generate.pick_harmonized_palette();

    document.body.style.backgroundColor = PALETTE.color('void').code();
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

  text_border: function() {
    if (PALETTE.color('obj_dark').is_dark()) {
      return PALETTE.color('void').hoffset(0.3);
    } else{
      return PALETTE.color('void').hoffset(-0.3);
    }
  },

  generate:{
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

  color(key){
  //  console.log(key);
    //  console.log(PALETTE._COLORS[key]);
    return PALETTE._COLORS[key];
  },

  save: {
    export: function() {
      var result = {};
      for (var key in PALETTE._COLORS){
        result[key] = PALETTE._COLORS[key].export();
      }
    console.log(result);
      return result;
    },

    import: function(save) {
      for (var key in save) {
        PALETTE._COLORS[key] = Color.import(save[key]);
      }
      document.body.style.backgroundColor = PALETTE.color('void').code();
    },
  },

};
