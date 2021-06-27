
var _MAX_ROOM_W = 500;
var _MAX_ROOM_H = 500;
var _MIN_ROOM_W = 100;
var _MIN_ROOM_H = 100;

class HG_Room {
    constructor(type, gen, x, y, imposed_dimensions) {
      this.type = type;
      this.gen = gen;
      this.x = x;
      this.y = y;
      this.dimention(imposed_dimensions);
      this.draw();

      this.roomFiller = new Filler(this.gen);
      this.roomFiller.set_zone(this.x, this.y - 20, this.w,  this.h - 20);
      this.decorate();
      this.populate();

      AUDIO.music.levels.house();
    }

    dimention(imposed_dimensions) {
      if (!imposed_dimensions)  imposed_dimensions = [];
      this.w = imposed_dimensions[0];
      this.h = imposed_dimensions[1];

      if (!this.w)        this.w = _MIN_ROOM_W + (_MAX_ROOM_W - _MIN_ROOM_W) * this.gen.get();
      if (!this.h)        this.h = _MIN_ROOM_H + (_MAX_ROOM_H - _MIN_ROOM_H) * this.gen.get();
    }

    _gen_furniture_function(furnitures){
      var g = this.gen;
      return function(x,y) {
        var furniture = g.pick(furnitures);
        return new furniture(x, y);
      }
    }

    draw() {
      new S_Floor(this.x, this.y, this.w, this.h);
    }

    populate() {
      this.roomFiller.set_tries(0, this.gen.int(10) - 7);
      var type = this.type;
      this.roomFiller.set_object(50, 60, function(x,y,g){ return new M_Villager(type, x, y, g.get(), true); });
      this.roomFiller.fill_by_retry();
    }

    decorate(){
      var r = this.gen.get();
      if (r < 0.3){
        this.decorate_bedroom();
      } else if (r < 0.6) {
        this.decorate_kitchen();
      } else{
        this.decorate_random_room();
      }
    }

    decorate_bedroom(){ //70 px top
      this.roomFiller.set_object(50, 50, this._gen_furniture_function([B_Bed, B_Hay]));
      this.roomFiller.fill_line(!this.is_top);

      this.roomFiller.set_object(100, 100, this._gen_furniture_function([B_Bed, B_Hay, B_Chest]));
      this.roomFiller.fill_by_slots(0.1);
    }

    decorate_kitchen(){
      this.roomFiller.set_object(60, 15, this._gen_furniture_function([B_Shelf, B_Bucket, B_Cabinet, B_Jar, B_Stool, B_Chair]));
      this.roomFiller.fill_line(!this.is_top);

      this.roomFiller.set_object(100, 100, this._gen_furniture_function([B_Housefire, B_Table, B_Stool]));
      this.roomFiller.fill_by_slots(0.5);
    }

    decorate_random_room(){
      this.roomFiller.set_object(this.w, 15, this._gen_furniture_function([B_Statue]));
      this.roomFiller.fill_line(!this.is_top);

      this.roomFiller.set_object(100, 100, this._gen_furniture_function([B_Jar, B_Stool, S_SavePoint, B_Bucket, B_Chest]));
      this.roomFiller.fill_by_slots(0.2);
    }

    expand_top() {
       this.room_top = new HG_Room(this.type, this.gen, this.x, this.y - this.h - 25, [this.w, 0]);
       this.room_top.is_top = true;
       var connection_x = this.x + Math.min(this.room_top.w, this.w)/2 - 25;
       new S_Floor(connection_x, this.y - this.h + 25, 50, 75);
    }

    expand_right() {
       this.room_right = new HG_Room(this.type, this.gen, this.x + this.w + 25, this.y, [0, this.h]);
       var connection_y = this.y - Math.min(this.room_right.h, this.h)/2 + 25;
       new S_Floor(this.x + this.w - 25, connection_y, 75, 50);
    }

    expand_diag() {
      var x = this.room_right.x;
      var y = this.room_top.y;
      var w = this.room_right.w;
      var h = this.room_top.h;
      var diag = new HG_Room(this.type, this.gen, x, y, [w, h]);
      diag.is_top = true;
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
      var f = new S_Floor(this.x + 0.5*this.w - 25, this.y + 25, 50, 35, 'obj_dark', outside);
      return [this.x + 0.5*this.w - 15, this.y + 5];
    }
}


class HouseGenerator {
    constructor(type, seed, outside) {
      this.gen = new Generator(seed);
      this.type = type;
      this.MAX_ROOM_W = 500;
      this.MAX_ROOM_H = 500;
      this.MIN_ROOM_W = 100;
      this.MIN_ROOM_H = 100;
      this.x = 200;
      this.y = 1000;
      this.outside = outside
    }

    build() {
      var main_hall = new HG_Room(this.type, this.gen, this.x, this.y);
      main_hall.expand();
      return main_hall.main_entrance(this.outside); // entrance
    }

}
