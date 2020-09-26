const DODGE = {
  TIME_SHOWING_RESULTS_BEFORE_CLEANUP: 1500,
  MIN_TIMEOUT: 50,
  sprite: {
    prompt: undefined,
    defense: undefined,
    attacked: undefined,
    background: undefined,
  },
  defense_angle: undefined,
  attack_angle: undefined,
  params: {
    attack_amplitude: 0.1, // Between 0 and 1
    warning_time_s: 1,
    react_time_s: 0.5,
    time_variation: 0.1, // 1 = 100%
  },

  init: function() {
    DODGE.sprite.prompt = new CenteredImage("assets/interface/circle.png", 'player');
    DODGE.sprite.prompt.hide();
    DODGE.defense_angle = undefined;
    DODGE.attack_angle = undefined;

    DODGE.sprite.background = HTML.div.make({
        w:"100%",
        h:"100%",
        top:0,
        left:0,
        z:50,
        background: "obj_dark",
        position: "fixed",
        opacity: 0.01,
      });
    CURRENTLEVEL.system.html().appendChild(DODGE.sprite.background);
  },

  draw: {
    prompt: function() {
      DODGE.sprite.background.style.opacity = 0.8;
      DODGE.sprite.prompt.adjust_depth(10098); // The sprite is a level object and has the zindex of its y.
      DODGE.sprite.prompt.show();
      IO.control.dodge();
    },

    raw_hit: function (color, multiplier) {
      if (! multiplier) { multiplier = 1; }
      var mid = DODGE.sprite.prompt.width / 2;
      var r = mid * 0.7; // radius of the circle we shoot on.
      var attack_angle = DODGE.attack_angle * Math.PI * 2;
      var x = mid + r * Math.cos(attack_angle);
      var y = mid - r * Math.sin(attack_angle);
      var gradius = multiplier * DODGE.sprite.prompt.width*(0.2 + DODGE.params.attack_amplitude * 1.7);
      HTML.canvas.draw_gradient_in(DODGE.sprite.attacked.html_canvas, color, x, y, gradius);
    },

    hit: function(){
      DODGE.sprite.attacked = new CenteredImage("assets/interface/circle.png", 'obj_light');
      DODGE.draw.raw_hit("background", 1.5);
      DODGE.sprite.attacked.show();
      DODGE.sprite.attacked.adjust_depth(10100); // The sprite is a level object and has the zindex of its y.
    },

    hit_confirm: function(){
      DODGE.draw.raw_hit(PALETTE.text_color().code(), 0.7);
    },

    defense: function() {
      DODGE.sprite.prompt.hide();

      var r = DODGE.sprite.prompt.width * 0.4; // radius of the circle we shoot on.
      var attack_angle = DODGE.defense_angle * Math.PI * 2;
      var x = r + r * Math.cos(attack_angle);
      var y = r - r * Math.sin(attack_angle);
      var radius = DODGE.sprite.prompt.width*0.3;
      if(DODGE.sprite.defense){
        DODGE.sprite.defense.destroy();
      }
      DODGE.sprite.defense = new CenteredImage("assets/interface/circle.png", 'player');
      DODGE.sprite.defense.show();
      HTML.canvas.draw_gradient_in(DODGE.sprite.defense.html_canvas, "void", x, y, radius);
      DODGE.sprite.defense.adjust_depth(100099); // The sprite is a level object and has the zindex of its y.
    },
  },

  outcome: {
    cleanup: function() {
      DODGE.defense_angle = undefined;
      DODGE.attack_angle = undefined;
      if(DODGE.sprite.attacked){
        DODGE.sprite.attacked.hide();
      }
      if(DODGE.sprite.defense){
        DODGE.sprite.defense.hide();
      }
      DODGE.sprite.background.style.opacity = 0;
    },

    compute: function (){
      if(!DODGE.defense_angle) { return false; }
      if(!DODGE.attack_angle || !DODGE.params.attack_amplitude) { return true; }

      var diff = Math.abs(DODGE.attack_angle - DODGE.defense_angle);
      var diff2 = Math.abs(1 + DODGE.attack_angle - DODGE.defense_angle);
      return (Math.min(diff, diff2) > (DODGE.params.attack_amplitude / 2));
    },

    success: function(){
      DODGE.outcome.cleanup();
      BATTLE.turn_factory.player();
    },

    failure: function(){
      DODGE.outcome.cleanup();
      TextBannerSequence.make([LANGUAGE.battle.dodge_fail()], BATTLE.operations.lose);
    },
  },

  io:{
    pick_target: function (target){
      DODGE.defense_angle = target;
      DODGE.draw.defense();
    },

    raw_click: function (x,y){
      var window_x = x - window.scrollX;
      var window_y = y - window.scrollY;
      var rect = DODGE.sprite.prompt.container.getBoundingClientRect();
      var mid_x = rect.x + rect.width / 2;
      var mid_y = rect.y + rect.height / 2;
      var diff_x = window_x - mid_x;
      var diff_y = -1 * (window_y - mid_y);
      var t = diff_y / diff_x;
      var angle = Math.atan(t);
      if (diff_x < 0){
        angle = Math.sign(diff_y) * Math.PI + angle;
      }
      angle /= Math.PI;
      if (angle < 0) {
        angle = 1 + 1 + angle;
      }
      angle /= 2;
      DODGE.io.pick_target(angle);
    },
  },

  events:{
    prompt: function(){
      DODGE.draw.prompt();
      var warning_time = DODGE.params.warning_time_s * 1000;
      var rand_teak = 2 * (Math.random() - 0.5) * DODGE.params.time_variation * warning_time;
      warning_time = Math.max (DODGE.MIN_TIMEOUT, warning_time + rand_teak);
      setTimeout(DODGE.events.react, warning_time);
    },

    react: function(){
      DODGE.sprite.prompt.hide();
      DODGE.attack_angle = Math.random();
      DODGE.attack_target = Math.random();
      DODGE.draw.hit();

      var react_time = DODGE.params.react_time_s * 1000;
      var rand_teak = 2 * (Math.random() - 0.5) * DODGE.params.time_variation * react_time;
      react_time = Math.max (DODGE.MIN_TIMEOUT, react_time + rand_teak);
      setTimeout(DODGE.events.hit, react_time);
    },

    hit: function(){
      IO.control.cede();
      DODGE.draw.hit_confirm();

      var str = "attack at " + DODGE.attack_angle + " with amplitude " + DODGE.params.attack_amplitude + " defending at " + DODGE.defense_angle;
      if (DODGE.outcome.compute()){
        CONSOLE.log.battle("[DODGE] " + str );
        setTimeout(DODGE.outcome.success, DODGE.TIME_SHOWING_RESULTS_BEFORE_CLEANUP);
      } else {
        CONSOLE.log.battle("[NODODGE] " + str);
        setTimeout(DODGE.outcome.failure, DODGE.TIME_SHOWING_RESULTS_BEFORE_CLEANUP);
      }
    },
  },

  absorb_param: function(params, name) {
    if(name[params]){
      DODGE.params.name = params.name;
    }
  },

  absorb_params: function(params) {
    DODGE.absorb_param(params, "attack_amplitude");
    DODGE.absorb_param(params, "warning_time_s");
    DODGE.absorb_param(params, "attack_time_s");
    DODGE.absorb_param(params, "time_variation");
    DODGE.absorb_param(params, "amplitude_variation");
  },

  getCallback: function(params) {
    var callback = function () {
      DODGE.absorb_params(params);
      DODGE.events.prompt();
    }
    return callback;
  }

}
