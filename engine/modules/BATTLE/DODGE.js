const DODGE = {
  TIME_SHOWING_RESULTS_BEFORE_CLEANUP: 1500,
  MIN_TIMEOUT: 50,
  sprite: {
    prompt: undefined,
    defense: undefined,
    attacked: undefined,
    text: undefined,
  },
  defense_angle: undefined,
  attack_angle: undefined,
  saved_dimensions: {},
  _params: {
    attack_amplitude: 0.1, // Between 0 and 1
    warning_time_s: 1,
    react_time_s: 0.5,
    variability: 0.1, // 1 = 100%
  },

  get_params: {
    challenge_modifier: function() {
      return 0.01 + SETTINGS.get("challenge_level")/0.5;
    },

    attack_amplitude: function() {
      var amplitude =  DODGE._params.attack_amplitude / (1+6*MARTYRDOM.effect(MARTYRDOMS.Elusiveness));

      return Math.min (0.99, amplitude * DODGE.get_params.challenge_modifier());
    },

    warning_time_s: function() {
      return DODGE._params.warning_time_s * (1+1*MARTYRDOM.effect(MARTYRDOMS.Reflex))  + 1 * MARTYRDOM.effect(MARTYRDOMS.Reflex);
    },

    react_time_s: function() {
      return DODGE._params.react_time_s * (1+1*MARTYRDOM.effect(MARTYRDOMS.Reflex)) + 1 * MARTYRDOM.effect(MARTYRDOMS.Reflex);
    },

    variability: function() {
      return DODGE._params.variability * (1 - MARTYRDOM.effect(MARTYRDOMS.Foresight));
    },

    actual_react_time_ms: function(){
      var react_time = DODGE.get_params.react_time_s() * 1000;
      var rand_tweak = 2 * (Math.random() - 0.5) * DODGE.get_params.variability() * react_time;
      var challenge_tweak = (1 - DODGE.get_params.challenge_modifier()) * (0.99 * react_time);
      if(challenge_tweak > 0){ challenge_tweak *= 5; }

      return Math.max (DODGE.MIN_TIMEOUT, (react_time + rand_tweak + challenge_tweak) / THAUMATURGY.time_compression);
    },

    actual_warning_time_ms: function(){
      var warning_time = DODGE.get_params.warning_time_s() * 1000;
      var rand_tweak = 2 * (Math.random() - 0.5) * DODGE.get_params.variability() * warning_time;
      var challenge_tweak = (1 - DODGE.get_params.challenge_modifier()) * (0.99 * warning_time);

      return Math.max (DODGE.MIN_TIMEOUT, (warning_time + rand_tweak + challenge_tweak) / THAUMATURGY.time_compression);
    },

    get_attack_angle: function(){
      var g = new Generator(BATTLE.current_battle + "" + DICTIONARY.get("world_seed"));
      var center = g.get();

      var motion = Math.random() - 0.5;

      // favored zone
      if (Math.random() < 0.5 - 0.5 * DODGE.get_params.variability() + 0.3 * MARTYRDOM.effect(MARTYRDOMS.Foresight)){
        motion *= 0.3;
      }
      return (center + motion + 1) % 1;
    },
  },

  center_sprite: function(){
      DODGE.sprite.defense.place_at(SCREEN.width() / 2 - 50 / 2, SCREEN.height() / 2 - 100 - 10);
  },

  init: function() {
    DODGE.defense_angle = undefined;
    DODGE.attack_angle = undefined;
    DODGE.sprite.defense = new FixedSprite("assets/interface/dodger.png", 'void');
    DODGE.center_sprite();
    DODGE.sprite.defense.hide();
  },

  draw: {
    prompt: function() {
      DODGE.draw.resize_existing();
      DODGE.sprite.prompt = new CenteredImage("assets/interface/circle.png", 'player'); // it may have been resized.
      DODGE.sprite.prompt.adjust_depth(10098); // The sprite is a level object and has the zindex of its y.
      DODGE.center_sprite();
      DODGE.sprite.text = new TextBanner("Pick a position to dodge your opponent's assault.", true);
      DODGE.sprite.prompt.show();
      DODGE.sprite.defense.show();
      IO.control.dodge();
    },

    advance_battler: function(){
      var animation_frames = Math.min(30, DODGE.get_params.actual_react_time_ms() / 3);
      var attack_angle = DODGE.attack_angle * Math.PI * 2;
      var d = 0.5 * 0.5 * DODGE.sprite.prompt.width / animation_frames;
      for (var l in DODGE.initial_sprites){
        var object = DODGE.initial_sprites[l];
        object.shift(d * Math.cos(attack_angle), - d * Math.sin(attack_angle));
      }
      DODGE.battler_steps ++;

      if (DODGE.battler_steps < animation_frames){
        DODGE.animation_timeout = setTimeout(DODGE.draw.advance_battler, DODGE.get_params.actual_react_time_ms()/animation_frames);
      }
    },

    move_battler: function(){
      DODGE.battler_steps = 0;
      DODGE.draw.advance_battler();
    },

    rough_hit: function () {
      var mid = DODGE.sprite.prompt.width / 2;
      var r = mid * 0.7; // radius of the circle we shoot on.
      var attack_angle = DODGE.attack_angle * Math.PI * 2;
      var x = mid + r * Math.cos(attack_angle);
      var y = mid - r * Math.sin(attack_angle);
      var gradius = DODGE.sprite.prompt.width*(0.2 + DODGE.get_params.attack_amplitude() * 1.7);
      HTML.canvas.draw_gradient_in(DODGE.sprite.attacked.html_canvas, "background", x, y, gradius);
      DODGE.draw.move_battler();
    },

    precise_hit: function (color) {
      if(DODGE.animation_timeout){
        clearTimeout(DODGE.animation_timeout);
      }
      var mid = DODGE.sprite.prompt.width / 2;

      var from =  Math.PI * 2 * (DODGE.attack_angle - DODGE.get_params.attack_amplitude() / 2);
      var to =  Math.PI * 2 * (DODGE.attack_angle + DODGE.get_params.attack_amplitude() / 2);
      HTML.canvas.draw_circle_in(DODGE.sprite.attacked.html_canvas, "background", mid, from, to);

      var defense_angle = DODGE.defense_angle * Math.PI * 2;
      var x = mid * (1 + Math.cos(defense_angle));
      var y = mid * (1 - Math.sin(defense_angle));
      HTML.canvas.draw_line_in(DODGE.sprite.attacked.html_canvas, "void", mid, mid, x, y);
    },

    hit: function(){
      DODGE.sprite.attacked = new CenteredImage("assets/interface/circle.png", 'obj_light');
      DODGE.draw.rough_hit();
      DODGE.sprite.attacked.show();
      DODGE.sprite.attacked.adjust_depth(10100); // The sprite is a level object and has the zindex of its y.
    },

    hit_confirm: function(){
      DODGE.draw.precise_hit();
    },

    defense: function() {
      var r = DODGE.sprite.prompt.width * 0.4; // radius of the circle we shoot on.
      var defense_angle = DODGE.defense_angle * Math.PI * 2;

      // includes a cosmetic offset for the sprite
      var x = -15 + DODGE.sprite.prompt.x + DODGE.sprite.prompt.width/2;
      x += r * Math.cos(defense_angle);
      var y = 20 + DODGE.sprite.prompt.y - DODGE.sprite.prompt.height/2;
      y += -1 * r * Math.sin(defense_angle);

      DODGE.sprite.defense.place_at(x, y, true);
      DODGE.sprite.defense.adjust_depth(100099); // The sprite is a level object and has the zindex of its y.
      DODGE.sprite.defense.show();
    },

    resize_existing: function() {
      var objects = CURRENTLEVEL.objects.get_all_objects();
      DODGE.initial_sprites = objects.slice();
      for (var l in objects){
        var object = objects[l];
        DODGE.saved_dimensions[object.hash()] = [object.visual_element.width, object.visual_element.height];
        object.place_at(SCREEN.width() / 2 - 50 / 2, SCREEN.height() / 2 - 150);
        object.visual_element.adjust_dimensions(50,50);
      }
    },

    restore_existing: function() {
      for (var l in DODGE.initial_sprites){
        var object = DODGE.initial_sprites[l];
        var d = DODGE.saved_dimensions[object.hash()];
        if (d){
          object.visual_element.adjust_dimensions(d[0],d[1]);

          object.place_at(SCREEN.width() / 2 - d[0] / 2, Math.max(SCREEN.height() / 2, d[1])); // hardcoded middle of the circle
        }
      }
    },
  },

  outcome: {
    cleanup: function() {
      DODGE.draw.restore_existing();
      DODGE.defense_angle = undefined;
      DODGE.attack_angle = undefined;
      if(DODGE.sprite.attacked){
        DODGE.sprite.attacked.hide();
      }
      if(DODGE.sprite.defense){
        DODGE.sprite.defense.hide();
      }
      if (DODGE.sprite.text){
        DODGE.sprite.text.destroy();
      }
      IO.control.cede();
    },

    compute: function (){
      if(DODGE.defense_angle == undefined) { return false; }
      if(!DODGE.attack_angle || !DODGE.get_params.attack_amplitude()) { return true; }

      var diff = Math.abs(DODGE.attack_angle - DODGE.defense_angle);
      var diff2 = Math.abs(1 + DODGE.attack_angle - DODGE.defense_angle);
      return (Math.min(diff, diff2) > (DODGE.get_params.attack_amplitude() / 2));
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
      if (!DODGE.accepting_input){  return; }
      DODGE.defense_angle = target;
      AUDIO.effect.dodge_place();
      DODGE.draw.defense();
    },

    move_target: function (target){
      if (!DODGE.accepting_input){  return; }
      DODGE.defense_angle += target;
      if (DODGE.defense_angle < 0) {
        DODGE.defense_angle += 1;
      }
      DODGE.draw.defense();
    },

    raw_click: function (x,y){
      if (!DODGE.accepting_input){  return; }
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

    instadodge: function(){
      if(BATTLE.current_battle == 'trial/basilisk'){
        return false; // tutorial
      }
      if(DODGE.get_params.attack_amplitude() < 0.005){
        return true;
      }
      if (DODGE.get_params.actual_warning_time_ms() + DODGE.get_params.actual_react_time_ms() > 3500 / THAUMATURGY.time_compression){
        return true;
      }

      return false;
    },

    prompt: function(){

      if (DODGE.events.instadodge()){
        CONSOLE.log.debug("[INSTANT DODGE]");
        DODGE.outcome.success();
        return;
      }

      DODGE.draw.prompt();
      DODGE.accepting_input = true;
      setTimeout(DODGE.events.react, DODGE.get_params.actual_warning_time_ms());
    },

    react: function(){
      DODGE.attack_angle = DODGE.get_params.get_attack_angle();

      DODGE.attack_target = Math.random();
      DODGE.sprite.prompt.hide();
      DODGE.draw.hit();
      AUDIO.effect.dodge_attack();

      setTimeout(DODGE.events.hit, DODGE.get_params.actual_react_time_ms());
    },

    hit: function(){
      DODGE.accepting_input = false;
      DODGE.draw.hit_confirm();
      AUDIO.effect.dodge_attack();

      var str = "attack at " + DODGE.attack_angle + " with amplitude " + DODGE.get_params.attack_amplitude() + " defending at " + DODGE.defense_angle;
      if (DODGE.outcome.compute()){
        CONSOLE.log.debug("[DODGE] " + str );
        setTimeout(DODGE.outcome.success, DODGE.TIME_SHOWING_RESULTS_BEFORE_CLEANUP);
      } else {
        CONSOLE.log.debug("[NODODGE] " + str);
        setTimeout(DODGE.outcome.failure, DODGE.TIME_SHOWING_RESULTS_BEFORE_CLEANUP);
      }
    },
  },

  absorb_param: function(params, name) {
    if(params[name]){
      DODGE._params[name] = params[name];
    }
  },

  absorb_params: function(params) {
    // mb i can absob everything by default through reflection ?
    DODGE.absorb_param(params, "attack_amplitude");
    DODGE.absorb_param(params, "warning_time_s");
    DODGE.absorb_param(params, "react_time_s");
    DODGE.absorb_param(params, "variability");
  },

  getCallback: function(params) {
    var callback = function () {
      DODGE.absorb_params(params);
      DODGE.events.prompt();
    }
    return callback;
  }

}
