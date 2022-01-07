// use (Color)

const PALETTE = {
  _COLORS: {},

  fog_color: function(){
    if(CURRENTLEVEL.is_map()){
      return PALETTE.color('obj_light');
    } else {
      return PALETTE.color('player');
    }
  },

  body_color: function(){
    if(CURRENTLEVEL.level_name == "010_world_map"){
      return PALETTE.color('obj_dark');
    } else {
      return PALETTE.color('void');
    }
  },

  background_color: function(){
    if(CURRENTLEVEL.level_name == "010_world_map"){
      return ('obj_light');
    } else {
      return ('obj_dark');
    }
  },

  color_for_battle: function() {
    document.body.style.backgroundColor = PALETTE.color('obj_dark').code();
  },

  battle_menu_background: function() {
    var base = PALETTE.color('player');
  //  return base.hoffset(0.6);
    if (PALETTE.color('void').is_dark()) {
      return base.hoffset(0.5);
    } else{
      return base.hoffset(-0.5); // i dont think this happens in regular mode
    }
  },

  battle_menu_color: function() {
    var base =  PALETTE.color('void');
  //  return base.hoffset(-0.7);
    if (PALETTE.color('void').is_dark()) {
      return base.hoffset(-0.5);
    } else{
      return base.hoffset(0.5); // i dont think this happens in regular mode
    }
  },

  text_background: function() {
    var base = PALETTE.color('obj_dark');
    if (PALETTE.color('obj_dark').is_dark()) {
      return base.hoffset(-0.4);
    } else{
      return base.hoffset(0.4); // i dont think this happens in regular mode
    }
  },

  text_color: function() {
    var base =  PALETTE.color('obj_light');
    if (PALETTE.color('obj_dark').is_dark()) {
      return base.hoffset(0.5);
    } else{
      return base.hoffset(-0.5); // i dont think this happens in regular mode
    }
  },

  text_speaker_color: function() {
    var base =  PALETTE.text_color();
    if (base.is_dark()) {
      return base.hoffset(0.3);
    } else{
      return base.hoffset(-0.3);
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
      CONSOLE.log.debug(i + ": " + PALETTE._COLORS[i].code(), PALETTE._COLORS[i].code());
    }
  },

  generate: {
    pick_harmonized_palette: function() { // based on one color
      PALETTE._COLORS['background'] = Color.random().hoffset(0.5);
      PALETTE._COLORS['void'] = PALETTE._COLORS['background'].opposite();

      PALETTE._COLORS['obj_light'] = PALETTE._COLORS['background'].hoffset(-0.35);
      PALETTE._COLORS['player'] = PALETTE._COLORS['void'].hoffset(0.5, true); //  PALETTE.color('obj_light').opposite();

      PALETTE._COLORS['obj_dark'] = PALETTE._COLORS['obj_light'].hoffset(-0.25);
    },

    pick_random_palette: function() { // based on three color
      PALETTE._COLORS['background'] = Color.random();

      // First contrast
      PALETTE._COLORS['void'] = Color.random();
      PALETTE._COLORS['player'] = PALETTE._COLORS['void'].hoffset(0.3, true);

      // Second contrast
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

  factory: {
    make_new: function() {
      if(STATS.get(STAT.Death) < 10){
        PALETTE.generate.pick_harmonized_palette();
      } else {
        PALETTE.generate.pick_random_palette();
      }
      DISK.write("PALETTE");
      INTERFACE.color_interface();
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
      INTERFACE.color_interface();
    },
  },

};
