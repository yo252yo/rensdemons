
const BUILDER = {
  _LOG: [],
  _BRUSH_GRANULARITY: 25,
  _ALT_GRANULARITY: 25,

  _record: function(row, color) {
    if(!color) {color = "#FFFFFF";};
    CONSOLE.debug(row, color);
    eval(row); // DANGER
    if(! BUILDER._LOG.includes(row)){
      BUILDER._LOG.push(row);
    }
  },

  export() {
    var log = BUILDER._LOG.join('\n');
    navigator.clipboard.writeText(log);
    CONSOLE.debug("Saved to clipboard");
  },

  draw_alt_rectangle: function(x, y){
      var w = Math.abs(x - BUILDER._previous_x);
      var h = Math.abs(y - BUILDER._previous_y);
      var x = Math.min(x, BUILDER._previous_x);
      var y = Math.max(y, BUILDER._previous_y);
      var color = Color.random().code();
      var row = "new S_Floor(" + x + "," + y + "," + w + "," + h + ");";
      BUILDER._record(row, color);

      var html_rectangle = HTML.div.make({
        top: (y-h),
        left: x,
        w: w,
        h: h,
        background: color,
      });
      CURRENTLEVEL.system.html().appendChild(html_rectangle);
  },

  draw_alt_hallways: function(x, y){
      var w = Math.abs(x - BUILDER._previous_x) + 50;
      var h = Math.abs(y - BUILDER._previous_y) + 50;
      var x = Math.min(x, BUILDER._previous_x) - 25;
      var y = Math.max(y, BUILDER._previous_y) + 25;
      var color = Color.random().code();
      var row = "new S_Floor(" + x + "," + y + "," + w + "," + h + ");";
      BUILDER._record(row, color);

      var html_rectangle = HTML.div.make({
        top: (y-h),
        left: x,
        w: w,
        h: h,
        background: color,
      });
      CURRENTLEVEL.system.html().appendChild(html_rectangle);
  },

  click: function(x, y) {
    if (BUILDER.SHIFT_BRUSH && KEYS_UTIL.is_pressed.shift()){
      x = Math.round(x/BUILDER._BRUSH_GRANULARITY)*BUILDER._BRUSH_GRANULARITY;
      y = Math.round(y/BUILDER._BRUSH_GRANULARITY)*BUILDER._BRUSH_GRANULARITY;
      var row = BUILDER._BRUSH;
      row = row.replace('$x', x);
      row = row.replace('$y', y);
      BUILDER._record(row);
      return true;
    }
    if (KEYS_UTIL.is_pressed.alt()) {
      x = Math.round(x /BUILDER._ALT_GRANULARITY) * BUILDER._ALT_GRANULARITY;
      y = Math.round(y /BUILDER._ALT_GRANULARITY) * BUILDER._ALT_GRANULARITY;
      if (BUILDER._previous_x) {
        if (BUILDER.ALT_RECTANGLES){
          BUILDER.draw_alt_rectangle(x, y);
        } else if (BUILDER.ALT_HALLWAYS){
          BUILDER.draw_alt_hallways(x, y);
        }
        delete BUILDER._previous_x;
        delete BUILDER._previous_y;
      } else {
        BUILDER._previous_x = x;
        BUILDER._previous_y = y;
      }
      return true;
    }
  },

  activate: {
    alt_rectangles: function() {
      BUILDER.ALT_RECTANGLES = true;
    },

    alt_hallways: function() {
      BUILDER.ALT_HALLWAYS = true;
    },

    shift_brush: function() {
      BUILDER.SHIFT_BRUSH = true;
    },
  },

  brush: {
    set: function(brush){
      BUILDER._BRUSH = brush;
    },

    battle: function(name, size){
      if(size){
        BUILDER._BRUSH = "new SBattle($x, $y, '" + name + "', " + size + ");";
      } else {
        BUILDER._BRUSH = "new SBattle($x, $y, '" + name + "');";
      }
    },

    rubble: function(name, size){
      if(size){
        BUILDER._BRUSH = "new SB_rubble($x, $y, " + name + ", " + size + ");";
      } else {
        BUILDER._BRUSH = "new SB_rubble($x, $y, " + name + ");";
      }
    },

    flooritem: function(name){
      BUILDER._BRUSH = "new SE_small_groundItem($x, $y, " + name + ");";
    },
  },

}


// Default brush:
BUILDER.brush.battle("#component");
