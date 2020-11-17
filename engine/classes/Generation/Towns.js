
function canBuild(x,y) {
  var free = true;
  x -= 5;
  y -= 5;
  free = free && CURRENTLEVEL.io.is_walkable(x,y);
  free = free && CURRENTLEVEL.io.is_walkable(x+180,y-150);
  free = free && CURRENTLEVEL.io.is_walkable(x+180,y);
  free = free && CURRENTLEVEL.io.is_walkable(x,y-150);
  free = free && CURRENTLEVEL.io.is_walkable(x+80,y-70);

  return free;
}

class TownGenerator {
    constructor(seed, w, h) {
      this.gen = new Generator(seed);
      this.w = w;
      this.h = h;
      this.margin = 100;
    }

    make_floor() {
      new S_Floor(this.margin, this.margin + this.h, this.w, this.h);
    }

    make_church(){
      new S_Church(this.margin + this.w / 2 - 50, this.margin + this.h / 2);
    }

    fill_houses() {
      //todo should be controled by a density
      var nb_tries = 3 + 100 * this.gen.get();

      for(var i = 0; i < nb_tries; i++) {
        var x = this.margin + this.gen.get() * (this.w - 200);
        var y = 50 + this.margin + this.gen.get() * (this.h - 200);

        if (canBuild(x,y)) {
          new S_House(x, y, this.gen.get());
        }
      }

    }

    build() {
      this.make_floor();
      this.make_church();
      this.fill_houses();
    }

    church_entrance(){
      return [this.margin + this.w / 2, this.margin + this.h / 2 + 50];
    }
}
