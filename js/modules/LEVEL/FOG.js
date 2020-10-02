
const FOG = {
  VIEWPORT_H: 500,
  VIEWPORT_W: 500,

  draw: function() {
    var base_obj = {
        w:2*SCREEN.width(),
        h:2*SCREEN.height(),
        z:10000,
        background: "player",
        position: "absolute",
        opacity: 0.98,
      };
    var border_top = HTML.js.clone(base_obj);
    var border_bot = HTML.js.clone(base_obj);
    var border_left = HTML.js.clone(base_obj);
    var border_right = HTML.js.clone(base_obj);

    Object.assign(border_top, {id: "fog_top"});
    Object.assign(border_bot, {id: "fog_bot"});
    Object.assign(border_left, {id: "fog_left"});
    Object.assign(border_right, {id: "fog_right"});

    CURRENTLEVEL.system.html().appendChild(HTML.div.make(border_top));
    CURRENTLEVEL.system.html().appendChild(HTML.div.make(border_bot));
    CURRENTLEVEL.system.html().appendChild(HTML.div.make(border_left));
    CURRENTLEVEL.system.html().appendChild(HTML.div.make(border_right));
    FOG.move(0,0);
  },

  stop: function(){
      document.getElementById("fog_top").remove();
      document.getElementById("fog_bot").remove();
      document.getElementById("fog_left").remove();
      document.getElementById("fog_right").remove();
  },

  move: function(x, y){
    var h = SCREEN.height();
    var w = SCREEN.width();

    var top_border = Math.ceil((h - FOG.VIEWPORT_H) / 2);
    var side_border = Math.ceil((w - FOG.VIEWPORT_W) / 2);

    document.getElementById("fog_top").style.top = y + (top_border-2*h);
    document.getElementById("fog_top").style.left = x + 0;
    document.getElementById("fog_bot").style.top = y + (h-top_border);
    document.getElementById("fog_bot").style.left = x + 0;
    document.getElementById("fog_left").style.top = y + 0;
    document.getElementById("fog_left").style.left = x + (side_border-2*w);
    document.getElementById("fog_right").style.top = y + 0;
    document.getElementById("fog_right").style.left = x + (w-side_border);
  },

}
