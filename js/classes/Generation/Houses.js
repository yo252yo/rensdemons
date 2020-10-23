class HG_Room {
    constructor(gen, x, y) {
      this.gen = gen;
      this.MAX_ROOM_W = 500;
      this.MAX_ROOM_H = 500;
      this.MIN_ROOM_W = 100;
      this.MIN_ROOM_H = 100;
      this.x = x;
      this.y = y;
      this.rng_size();
      this.draw();
    }

    rng_size(x, y) {
      this.w = this.MIN_ROOM_W + (this.MAX_ROOM_W - this.MIN_ROOM_W) * this.gen.get();
      this.h = this.MIN_ROOM_H + (this.MAX_ROOM_H - this.MIN_ROOM_H) * this.gen.get();
    }

    draw() {
      new S_Floor(this.x, this.y, this.w, this.h);
    }

    expand_top() {
       var room_top = new HG_Room(this.gen, this.x, this.y - this.h - 25);
       var connection_x = this.x + Math.min(room_top.w, this.w)/2 - 25;
       new S_Floor(connection_x, this.y - this.h + 25, 50, 75);
    }

    expand_right() {
       var room_right = new HG_Room(this.gen, this.x + this.w + 25, this.y);
       var connection_y = this.y - Math.min(room_right.h, this.h)/2 + 25;
       new S_Floor(this.x + this.w - 25, connection_y, 75, 50);
    }

    expand(){
      if (this.gen.get() > 0.4) { // room above?
         this.expand_top();
      }

      if (this.gen.get() > 0.4) { // room right
         this.expand_right();
      }
    }

    main_entrance() {
      return [this.x + this.w / 2, this.y - 25];
    }
}


class HouseGenerator {
    constructor(seed) {
      this.gen = new Generator(seed);
      this.MAX_ROOM_W = 500;
      this.MAX_ROOM_H = 500;
      this.MIN_ROOM_W = 100;
      this.MIN_ROOM_H = 100;
      this.x = 200;
      this.y = 1000;
    }

    build() {
      var main_hall = new HG_Room(this.gen, this.x, this.y);
      main_hall.expand();
      return main_hall.main_entrance(); // entrance
    }

}
