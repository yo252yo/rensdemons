
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

    build() {
      this.make_floor();
      this.make_border()
      this.make_church();

      var houseFiller = new Filler(this.gen);
      houseFiller.set_zone(this.margin + 50, this.margin + this.h - 50, this.w - 100,  this.h - 100);
      houseFiller.set_tries(5, 100);
      houseFiller.set_object(120, 160, function(x,y,g){ return new S_House(x, y, g); });
      houseFiller.fill_by_retry();
    }

    church_entrance(){
      return [this.margin + this.w / 2, this.margin + this.h / 2 + 50];
    }
}
