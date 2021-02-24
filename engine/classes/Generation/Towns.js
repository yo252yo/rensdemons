
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
      this.margin = 150;
    }

    make_border() {
      var leaving = function(){
        CURRENTLEVEL.setup("005_world_map");
      }

      // left
      var border = new S_Floor(this.margin-40, this.margin + this.h + 40, 50, this.h + 80, 'obj_dark');
      border.interaction = leaving;
      // right
      var border = new S_Floor(this.margin + this.w - 10, this.margin + this.h + 40, 50, this.h + 80, 'obj_dark');
      border.interaction = leaving;
      // top
      var border = new S_Floor(this.margin-40, this.margin + 10, this.w + 80, 50, 'obj_dark');
      border.interaction = leaving;
      // bot
      var border = new S_Floor(this.margin-40, this.margin + this.h + 40, this.w + 80, 50, 'obj_dark');
      border.interaction = leaving;
    }

    make_floor() {
      new S_Floor(this.margin, this.margin + this.h, this.w, this.h);
    }

    make_church(){
      new S_Church(this.margin + this.w / 2 - 50, this.margin + this.h / 2);
    }

    fill_houses() {
      var house_w = 120;
      var house_h = 150;

      //todo should be controled by a density
      var nb_tries = 3 + 100 * this.gen.get();

      for(var i = 0; i < nb_tries; i++) {
        var x = this.margin + this.gen.get() * (this.w - house_w);
        var y = 50 + this.margin + this.gen.get() * (this.h - (house_h-50));

        if (canBuild(x,y)) {
          new S_House(x, y, this.gen.get());
        }
      }

    }

    build() {
      this.make_floor();
      this.make_border()
      this.make_church();
      this.fill_houses();
    }

    church_entrance(){
      return [this.margin + this.w / 2, this.margin + this.h / 2 + 50];
    }
}
