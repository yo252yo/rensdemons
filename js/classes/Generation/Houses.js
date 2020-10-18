
class HouseGenerator {
    constructor(seed) {
      console.log(seed);
      this.seed = RANDOM.hash_seed(seed);
      this.MAX_ROOM_W = 500;
      this.MAX_ROOM_H = 500;
      this.MIN_ROOM_W = 100;
      this.MIN_ROOM_H = 100;
      this.x = 200;
      this.y = 1000;
    }

    get_from_seed(order) { // im pretty sure this is a pseudorandom generator
      return RANDOM.get_factor_from_seed(this.seed, order);
    }

    build_room(x, y, index) {
      console.log(`Room: ${this.get_from_seed(index)} ${this.get_from_seed(index+1)}`);
      var w = this.MIN_ROOM_W + (this.MAX_ROOM_W - this.MIN_ROOM_W) * this.get_from_seed(index);
      var h = this.MIN_ROOM_H + (this.MAX_ROOM_H - this.MIN_ROOM_H) * this.get_from_seed(index+1);
      new S_Floor(x, y, w, h);
      return [w, h];
    }

    build() {
      var main_hall = this.build_room(this.x, this.y, 1);
      if (this.get_from_seed(3) > 0.5) { // room above?
         var room_top = this.build_room(this.x, this.y - main_hall[1] - 25 , 4);
         var connection_x = this.x + Math.min(room_top[0], main_hall[0])/2 - 25;
         new S_Floor(connection_x, this.y - main_hall[1] + 25, 50, 75);
      }

      return [this.x + main_hall[0] / 2, this.y - 25]; // entrance
    }

}
