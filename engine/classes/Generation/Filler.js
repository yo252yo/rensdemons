// This expects obj_constructor to be (x,y,gen) => object


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

  _assess_params(params) {
    for (var i of params){
      if(! this[i]) {
        CONSOLE.error("Filler missing a " + i);
        CONSOLE.stack_trace();
      }
    }
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

  fill_by_retry() {
    this._assess_params(["zone_x", "zone_y", "zone_w", "zone_h", "obj_w", "obj_h", "obj_constructor", "min_tries", "max_tries"]);
    var nb_tries = this.min_tries + (this.max_tries - this.min_tries) * this.gen.get();

    for(var i = 0; i < nb_tries; i++) {
      var x = this.zone_x + this.gen.get() * (this.zone_w - this.obj_w);
      var y = this.zone_y - this.gen.get() * (this.zone_h - this.obj_h);

      if (this._canBuild(x, y)) {
        this.obj_constructor(x, y, this.gen.get());
      }
    }
  }

  fill_by_slots(density) {
    this._assess_params(["zone_x", "zone_y", "zone_w", "zone_h", "obj_w", "obj_h", "obj_constructor"]);
    if (!density){
      density = 1;
    }
    var access_offset = 50;
    var w = this.zone_w;
    var h = this.zone_h - this.obj_h;
    var nb_slots = [Math.floor(w / this.obj_w), Math.floor(h / this.obj_h)];
    var slot_actual_size = [w / nb_slots[0], h / nb_slots[1]];

    for(var i = 0; i < nb_slots[0]; i++) {
      for(var j = 0; j < nb_slots[1]; j++) {
          if (this.gen.get() > density){
            continue;
          }

          var f = this.obj_constructor(this.zone_x + i * slot_actual_size[0], this.zone_y - j * slot_actual_size[1]);

          var x = (i * slot_actual_size[0]) + this.gen.get() * (slot_actual_size[0] - f.h_w);
          var y = (j * slot_actual_size[1]) + this.gen.get() * (slot_actual_size[1] - f.h_h);
          f.place_at(this.zone_x + x, this.zone_y - y - access_offset);
      }
    }
  }
}
