
var _MAX_ROOM_W = 500;
var _MAX_ROOM_H = 500;
var _MIN_ROOM_W = 100;
var _MIN_ROOM_H = 100;

class HG_Room {
    constructor(gen, x, y, imposed_dimensions) {
      this.gen = gen;
      this.x = x;
      this.y = y;
      this.dimention(imposed_dimensions);
      this.draw();
    }

    dimention(imposed_dimensions) {
      if (!imposed_dimensions)  imposed_dimensions = [];
      this.w = imposed_dimensions[0];
      this.h = imposed_dimensions[1];

      if (!this.w)        this.w = _MIN_ROOM_W + (_MAX_ROOM_W - _MIN_ROOM_W) * this.gen.get();
      if (!this.h)        this.h = _MIN_ROOM_H + (_MAX_ROOM_H - _MIN_ROOM_H) * this.gen.get();
    }

    draw() {
      new S_Floor(this.x, this.y, this.w, this.h);
    }

    expand_top() {
       this.room_top = new HG_Room(this.gen, this.x, this.y - this.h - 25, [this.w, 0]);
       var connection_x = this.x + Math.min(this.room_top.w, this.w)/2 - 25;
       new S_Floor(connection_x, this.y - this.h + 25, 50, 75);
    }

    expand_right() {
       this.room_right = new HG_Room(this.gen, this.x + this.w + 25, this.y, [0, this.h]);
       var connection_y = this.y - Math.min(this.room_right.h, this.h)/2 + 25;
       new S_Floor(this.x + this.w - 25, connection_y, 75, 50);
    }

    expand_diag() {
      var x = this.room_right.x;
      var y = this.room_top.y;
      var w = this.room_right.w;
      var h = this.room_top.h;
      var diag = new HG_Room(this.gen, x, y, [w, h]);
      var connection_left = [x, y - h/2];
      var connection_bot = [x + w/2, y];

      new S_Floor(connection_left[0]-50, connection_left[1]+25, 75, 50);
      new S_Floor(connection_bot[0]-25, connection_bot[1]+50, 50, 75);
    }

    expand() {
      this.expand_top();
      this.expand_right();
      this.expand_diag();
    }

    main_entrance(outside) {
      var f = new S_Floor(this.x + 0.5*this.w - 25, this.y + 25, 50, 50);
      f.interaction = function(){
        CURRENTLEVEL.setup(outside);
      }
      return [this.x + 0.5*this.w - 15, this.y - 25];
    }
}


class HouseGenerator {
    constructor(seed, outside) {
      this.gen = new Generator(seed);
      this.MAX_ROOM_W = 500;
      this.MAX_ROOM_H = 500;
      this.MIN_ROOM_W = 100;
      this.MIN_ROOM_H = 100;
      this.x = 200;
      this.y = 1000;
      this.outside = outside
    }

    build() {
      var main_hall = new HG_Room(this.gen, this.x, this.y);
      main_hall.expand();
      return main_hall.main_entrance(this.outside); // entrance
    }

}
