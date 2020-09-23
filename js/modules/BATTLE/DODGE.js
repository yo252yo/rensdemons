
const DODGE = {
  prompt: undefined,
  defense: undefined,
  attacked: undefined,
  background: undefined,
  defense_angle: undefined,
  TIMEOUT_HIT_RESULT: 1500,

  init: function() {
    DODGE.prompt = new CenteredImage("assets/interface/circle.png", 'player');
    DODGE.prompt.hide();
    DODGE.defense_angle = undefined;

    DODGE.background = HTML.div.make({
        w:"100%",
        h:"100%",
        top:0,
        left:0,
        z:50,
        background: "obj_dark",
        position: "fixed",
        opacity: 0.01,
      });
      CURRENTLEVEL.system.html().appendChild(DODGE.background);
  },

  show_prompt: function() {
    DODGE.background.style.opacity = 0.7;
    DODGE.prompt.adjust_depth(100);
    DODGE.prompt.show();
    IO.control.dodge();
  },

  draw_hit: function(attack_target, attack_amplitude){
    var r = DODGE.prompt.width * 0.4; // radius of the circle we shoot on.
    var attack_angle = attack_target * Math.PI * 2;
    var x = r + r * Math.cos(attack_angle);
    var y = r - r * Math.sin(attack_angle);
    var radius = DODGE.prompt.width*(0.2 + 2 * attack_amplitude * 5.7);
    DODGE.attacked = new CenteredImage("assets/interface/circle.png", 'player');
    DODGE.attacked.show();
    HTML.canvas.draw_gradient_in(DODGE.attacked.html_canvas, "background", x, y, radius);
    DODGE.attacked.adjust_depth(100);
  },

  draw_defense: function(attack_target) {
    DODGE.prompt.hide();

    var r = DODGE.prompt.width * 0.4; // radius of the circle we shoot on.
    var attack_angle = attack_target * Math.PI * 2;
    var x = r + r * Math.cos(attack_angle);
    var y = r - r * Math.sin(attack_angle);
    var radius = DODGE.prompt.width*0.3;
    if(DODGE.defense){
      DODGE.defense.destroy();
    }
    DODGE.defense = new CenteredImage("assets/interface/circle.png", 'player');
    DODGE.defense.show();
    HTML.canvas.draw_gradient_in(DODGE.defense.html_canvas, "void", x, y, radius);
    DODGE.defense.adjust_depth(100);
  },

  dodge_result: function (attack_target, attack_amplitude){
    if(!DODGE.defense_angle) { return false; }

    var diff = Math.abs(attack_target - DODGE.defense_angle);
    var diff2 = Math.abs(1 + attack_target - DODGE.defense_angle);
    return (Math.min(diff, diff2) > attack_amplitude);
  },

  process_hit: function() {
    IO.control.cede();
    DODGE.prompt.hide();
    //todo take difficulty into account
    var attack_target = Math.random();
    var attack_amplitude = 0.25; // From 0 to 0.5

    DODGE.draw_hit(attack_target, attack_amplitude);

    if (DODGE.dodge_result(attack_target, attack_amplitude)){
      CONSOLE.log.battle("[DODGE] attack at " + attack_target + " with amplitude " + attack_amplitude + " defending at " + DODGE.defense_angle);
      setTimeout(DODGE.success, DODGE.TIMEOUT_HIT_RESULT);
    } else {
      CONSOLE.log.battle("[DODGEFAIL] attack at " + attack_target + " with amplitude " + attack_amplitude + " defending at " + DODGE.defense_angle);
      setTimeout(DODGE.failure, DODGE.TIMEOUT_HIT_RESULT);
    }
  },

  follow_hit: function() {
    DODGE.attacked.hide();
    DODGE.defense.hide();
    DODGE.background.style.opacity = 0;
  },

  success: function(){
    DODGE.follow_hit();
    BATTLE.turn_factory.player();
  },

  failure: function(){
    DODGE.follow_hit();
    TextBannerSequence.make([LANGUAGE.battle.dodge_fail()], BATTLE.operations.lose);
  },

  pick_target: function (target){
    DODGE.defense_angle = target;
    DODGE.draw_defense(target);
  },

  raw_click: function (x,y){
    var window_x = x - window.scrollX;
    var window_y = y - window.scrollY;
    var rect = DODGE.prompt.container.getBoundingClientRect();
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
    DODGE.pick_target(angle);
  },

  timeBeforeHit: function() {
    return 500 + Math.random() * 2000;
  },

  getCallback: function(dodge_difficulty) {
    var callback = function (){
      DODGE.show_prompt();
      setTimeout(DODGE.process_hit, DODGE.timeBeforeHit());
    }
    return callback;
  }

}
