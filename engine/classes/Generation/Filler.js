
class Filler {
  constructor(gen) {
    this.gen = gen;
  }

  set_zone(x, y, w, h) {
    this.zone_x = x;
    this.zone_y = y;
    this.zone_w = w;
    this.zone_h = h;
  }

  set_tries(min_tries, max_tries) {
    this.min_tries = min_tries;
    this.max_tries = max_tries;
  }

  set_object(w, h, obj_constructor) {
    this.obj_w = w;
    this.obj_h = h;
    // constructor expectx arguments (x,y,gen)
    this.obj_constructor = obj_constructor;
  }

  assess_params(){
    if(! this.zone_x) { CONSOLE.error("Filler missing a zone_x"); }
    if(! this.zone_y) { CONSOLE.error("Filler missing a zone_y"); }
    if(! this.zone_w) { CONSOLE.error("Filler missing a zone_w"); }
    if(! this.zone_h) { CONSOLE.error("Filler missing a zone_h"); }
    if(! this.obj_w) { CONSOLE.error("Filler missing a obj_w"); }
    if(! this.obj_h) { CONSOLE.error("Filler missing a obj_h"); }
    if(! this.obj_constructor) { CONSOLE.error("Filler missing a obj_constructor"); }
    if(! this.min_tries) { CONSOLE.error("Filler missing a min_tries"); }
    if(! this.max_tries) { CONSOLE.error("Filler missing a max_tries"); }
  }

  _canBuild(x, y) {
    for(var i = -0.1; i <= 1.1; i += 0.2){
      for(var j = -0.1; j <= 1.1; j += 0.2){
        if(!CURRENTLEVEL.io.is_walkable(x + this.obj_w * i, y - this.obj_h * j)){
          return false;
        }
      }
    }
    return true;
  }

  fill() {
    this.assess_params();
    var nb_tries = this.min_tries + (this.max_tries - this.min_tries) * this.gen.get();

    for(var i = 0; i < nb_tries; i++) {
      var x = this.zone_x + this.gen.get() * (this.zone_w - this.obj_w);
      var y = this.zone_y - this.gen.get() * (this.zone_h - this.obj_h);

      if (this._canBuild(x, y)) {
        this.obj_constructor(x, y, this.gen.get());
      }
    }
  }
}
