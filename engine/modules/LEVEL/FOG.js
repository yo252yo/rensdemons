
const FOG = {
  MIN_VIEWPORT: 350,
  MAX_VIEWPORT: 1000,
  MASK_WIDTH: 2*SCREEN.width(),
  MASK_HEIGHT: 2*SCREEN.height(),

  draw: function() {
    var opacity = 0.98;

    if(STATS.is_post_game()){
      opacity = 0.65;
    }

    var base_obj = {
        w:FOG.MASK_WIDTH,
        h:FOG.MASK_HEIGHT,
        z:10000,
        background: "player",
        position: "absolute",
        opacity: opacity,
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
    FOG._stopped = false;
  },

  _stop: function(name){
    var d = document.getElementById(name);
    if(d){
      d.remove()
    }
  },

  stop: function(){
      CONSOLE.log.debug("Stopping fog");
      FOG._stop("fog_top");
      FOG._stop("fog_bot");
      FOG._stop("fog_left");
      FOG._stop("fog_right");
      FOG._stopped = true;
  },

  recolor: function(c){
    if(!c || !document.getElementById("fog_top") || !document.getElementById("fog_bot") || !document.getElementById("fog_left") || !document.getElementById("fog_right")){
      return;
    }
    var color = c.code();
    document.getElementById("fog_top").style.background = color;
    document.getElementById("fog_bot").style.background = color;
    document.getElementById("fog_left").style.background = color;
    document.getElementById("fog_right").style.background = color;
  },

  viewport: function(){
    return FOG.MIN_VIEWPORT + (FOG.MAX_VIEWPORT - FOG.MIN_VIEWPORT) * MARTYRDOM.effect(MARTYRDOMS.Vision);
  },

  move: function(x, y){
    document.getElementById("fog_top").style.top = y - FOG.viewport()/2 - FOG.MASK_HEIGHT;
    document.getElementById("fog_top").style.left = x - FOG.MASK_WIDTH/2;

    document.getElementById("fog_bot").style.top = y + FOG.viewport()/2;
    document.getElementById("fog_bot").style.left = x - FOG.MASK_WIDTH/2;

    document.getElementById("fog_left").style.top = y - FOG.MASK_HEIGHT/2;
    document.getElementById("fog_left").style.left = x - FOG.viewport()/2 - FOG.MASK_WIDTH;

    document.getElementById("fog_right").style.top = y - FOG.MASK_HEIGHT/2;
    document.getElementById("fog_right").style.left = x + FOG.viewport()/2;

    var adj = document.getElementById("fog_adjacent");
    if (adj){
      adj.style.top = y + FOG.viewport()/2 - adj.clientHeight/2;
      adj.style.left = x - FOG.viewport()/2 - adj.clientWidth/2;
    }
  },

  moveToChar: function(){
    if (! FOG._stopped) {
      FOG.move(CHARACTER.get().x, CHARACTER.get().y);
    }
  },
}
