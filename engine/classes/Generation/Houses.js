
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
      this.decorate();
      this.populate();
      AUDIO.music.house();
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

    populate(){
      var nb_people = Math.max(0, this.gen.int(10) - 7);
      for(var i = 0; i < nb_people; i++) {
        var x = this.x + this.gen.get() * (this.w-50);
        var y = 20 + this.y - this.gen.get() * (this.h-40);
        if (CURRENTLEVEL.io.is_walkable(x+10,y)){
          new M_Villager(x, y, this.gen.get());
        }
      }
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

    fill_top_wall(furniture, slot_width, y_offset){
      var capacity = this.w / slot_width;

      var nb_furniture = 1;
      nb_furniture += this.gen.int(Math.max(0, capacity-1));

      for (var i = 0; i < nb_furniture; i++){
        var r = this.gen.get();
        // provisory position for hash of object
        var f = furniture(this.x + i * this.w/nb_furniture, this.y - this.h + y_offset);
        var x_offset = i * this.w/nb_furniture + r * (this.w/nb_furniture - f.h_w);

        f.place_at(this.x + x_offset, this.y - this.h + y_offset);
        if (!this.is_top && (x_offset + f.h_w > this.w / 2 - 20 && x_offset < this.w / 2 + 20)) { // leave the middle open for a hallway :/
          f.destroy();
        } else if (x_offset > this.w - f.h_w) {
          f.destroy();
        }
      }
    }

    fill_room(furniture, density){
      var slot_size = [100, 100];
      var h = this.h - 100;
      var nb_slots = [Math.floor(this.w / slot_size[0]), Math.floor(h / slot_size[1])];
      var slot_actual_size = [this.w / nb_slots[0], h / nb_slots[1]];
      for(var i = 0; i < nb_slots[0]; i++) {
        for(var j = 0; j < nb_slots[1]; j++) {
            if (this.gen.get() > density){
              continue;
            }
            var f = furniture(this.x + i * slot_actual_size[0], this.y - j * slot_actual_size[1]);
            var x = (i * slot_actual_size[0]) + this.gen.get() * (slot_actual_size[0] - f.h_w);
            var y = (j * slot_actual_size[1]) + this.gen.get() * (slot_actual_size[1] - f.h_h);
            f.place_at(this.x + x, this.y - 50 - y);
        }
      }
    }

    decorate_bedroom(){ //70 px top
      var top_wall_function = this._gen_furniture_function([B_Bed, B_Hay]);
      this.fill_top_wall(top_wall_function, 50, 50);
      var fill_function = this._gen_furniture_function([B_Bed, B_Hay, B_Chest]);
      this.fill_room(fill_function, 0.1);
    }

    decorate_kitchen(){
      var top_wall_function = this._gen_furniture_function([B_Shelf, B_Bucket, B_Cabinet, B_Jar, B_Stool, B_Chair]);
      this.fill_top_wall(top_wall_function, 60, 15);
      var fill_function = this._gen_furniture_function([B_Housefire, B_Table, B_Stool]);
      this.fill_room(fill_function, 0.5);
    }

    decorate_random_room(){
      var top_wall_function = this._gen_furniture_function([B_Statue]);
      this.fill_top_wall(top_wall_function, this.w, 15);
      var fill_function = this._gen_furniture_function([B_Jar, B_Stool, S_SavePoint, B_Bucket, B_Chest]);
      this.fill_room(fill_function, 0.2);
    }

    expand_top() {
       this.room_top = new HG_Room(this.gen, this.x, this.y - this.h - 25, [this.w, 0]);
       this.room_top.is_top = true;
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
      var f = new S_Floor(this.x + 0.5*this.w - 25, this.y + 25, 50, 35, 'obj_dark');
      f.interaction = function(){
        CURRENTLEVEL.setup(outside);
      }
      return [this.x + 0.5*this.w - 15, this.y + 5];
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
