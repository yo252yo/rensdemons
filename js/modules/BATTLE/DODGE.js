


const DODGE = {
  TIME_SHOWING_RESULTS_BEFORE_CLEANUP: 1500,
  sprite: {
    prompt: undefined,
    defense: undefined,
    attacked: undefined,
    background: undefined,
  },
  defense_angle: undefined,
  attack_angle: undefined,
  attack_amplitude: undefined,

  init: function() {
    DODGE.sprite.prompt = new CenteredImage("assets/interface/circle.png", 'player');
    DODGE.sprite.prompt.hide();
    DODGE.defense_angle = undefined;
    DODGE.attack_angle = undefined;
    DODGE.attack_amplitude = undefined;

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
      DODGE.sprite.background.style.opacity = 0.7;
      DODGE.sprite.prompt.adjust_depth(98);
      DODGE.sprite.prompt.show();
      IO.control.dodge();
    },

    hit: function(attack_target, attack_amplitude){
      var r = DODGE.sprite.prompt.width * 0.4; // radius of the circle we shoot on.
      var attack_angle = attack_target * Math.PI * 2;
      var x = r + r * Math.cos(attack_angle);
      var y = r - r * Math.sin(attack_angle);
      var radius = DODGE.sprite.prompt.width*(0.2 + 2 * attack_amplitude * 1.7);
      DODGE.sprite.attacked = new CenteredImage("assets/interface/circle.png", 'obj_light');
      HTML.canvas.draw_gradient_in(DODGE.sprite.attacked.html_canvas, "obj_dark", x, y, radius);
      DODGE.sprite.attacked.show();
      DODGE.sprite.attacked.adjust_depth(99);
    },

    hit_confirm: function(){
      HTML.canvas.tint(DODGE.sprite.attacked.html_canvas, "background");
    },

    defense: function(attack_target) {
      DODGE.sprite.prompt.hide();

      var r = DODGE.sprite.prompt.width * 0.4; // radius of the circle we shoot on.
      var attack_angle = attack_target * Math.PI * 2;
      var x = r + r * Math.cos(attack_angle);
      var y = r - r * Math.sin(attack_angle);
      var radius = DODGE.sprite.prompt.width*0.3;
      if(DODGE.sprite.defense){
        DODGE.sprite.defense.destroy();
      }
      DODGE.sprite.defense = new CenteredImage("assets/interface/circle.png", 'player');
      DODGE.sprite.defense.show();
      HTML.canvas.draw_gradient_in(DODGE.sprite.defense.html_canvas, "void", x, y, radius);
      DODGE.sprite.defense.adjust_depth(100);
    },
  },

  outcome: {
    cleanup: function() {
      DODGE.defense_angle = undefined;
      DODGE.attack_angle = undefined;
      DODGE.attack_amplitude = undefined;
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
      if(!DODGE.attack_target || !DODGE.attack_amplitude) { return true; }

      var diff = Math.abs(DODGE.attack_target - DODGE.defense_angle);
      var diff2 = Math.abs(1 + DODGE.attack_target - DODGE.defense_angle);
      return (Math.min(diff, diff2) > DODGE.attack_amplitude);
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
      DODGE.draw.defense(target);
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
      setTimeout(DODGE.events.react, (500 + Math.random() * 2000));
    },

    react: function(){
      DODGE.sprite.prompt.hide();
      DODGE.attack_angle = Math.random();
      DODGE.draw.hit(DODGE.attack_angle, DODGE.attack_amplitude);

      setTimeout(DODGE.events.hit, (1000 + Math.random() * 500));
    },

    hit: function(){
      IO.control.cede();
      DODGE.draw.hit_confirm();

      var str = "attack at " + DODGE.attack_angle + " with amplitude " + DODGE.attack_amplitude + " defending at " + DODGE.defense_angle;
      if (DODGE.outcome.compute()){
        CONSOLE.log.battle("[DODGE] " + str );
        setTimeout(DODGE.outcome.success, DODGE.TIME_SHOWING_RESULTS_BEFORE_CLEANUP);
      } else {
        CONSOLE.log.battle("[NODODGE] " + str);
        setTimeout(DODGE.outcome.failure, DODGE.TIME_SHOWING_RESULTS_BEFORE_CLEANUP);
      }
    },
  },

  getCallback: function(dodge_difficulty) {
    var callback = function (){
      DODGE.attack_amplitude = 0.4; // From 0 to 0.5
      DODGE.events.prompt();
    }
    return callback;
  }

}
