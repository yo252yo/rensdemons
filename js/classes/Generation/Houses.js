
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

    build_room(x, y, index) {
      var w = this.MIN_ROOM_W + (this.MAX_ROOM_W - this.MIN_ROOM_W) * this.gen.get();
      var h = this.MIN_ROOM_H + (this.MAX_ROOM_H - this.MIN_ROOM_H) * this.gen.get();
      new S_Floor(x, y, w, h);
      return [w, h];
    }

    build() {
      var main_hall = this.build_room(this.x, this.y, 1);
      if (this.gen.get() > 0.5) { // room above?
         var room_top = this.build_room(this.x, this.y - main_hall[1] - 25 , 4);
         var connection_x = this.x + Math.min(room_top[0], main_hall[0])/2 - 25;
         new S_Floor(connection_x, this.y - main_hall[1] + 25, 50, 75);
      }

      return [this.x + main_hall[0] / 2, this.y - 25]; // entrance
    }

}
