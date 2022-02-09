
var _MAX_ROOM_W = 500;
var _MAX_ROOM_H = 500;
var _MIN_ROOM_W = 100;
var _MIN_ROOM_H = 100;
var _HOUSE_ELEM_BLOCK = 12.5;

class HG_Room {
    constructor(type, seed, x, y, imposed_dimensions, is_top) {
      this.type = type;
      this.gen = new Generator(seed);
      this.x = x;
      this.y = y;
      this.is_top = is_top;
      this.dimention(imposed_dimensions);
      this.floor = new S_WoodFloor(this.x, this.y, this.w, this.h);

      this.roomFiller = new Filler(this.gen.get());
      this.roomFiller.set_zone(this.x, this.y - 20, this.w,  this.h - 20);
      this.decorate();
      this.populate();
    }

    dimention(imposed_dimensions) {
      if (!imposed_dimensions)  imposed_dimensions = [];
      this.w = imposed_dimensions[0];
      this.h = imposed_dimensions[1];

      if (!this.w)        this.w = _MIN_ROOM_W + (_MAX_ROOM_W - _MIN_ROOM_W) * this.gen.get();
      if (!this.h)        this.h = _MIN_ROOM_H + (_MAX_ROOM_H - _MIN_ROOM_H) * this.gen.get();

      this.w = _HOUSE_ELEM_BLOCK * Math.round(this.w / _HOUSE_ELEM_BLOCK);
      this.h = _HOUSE_ELEM_BLOCK * Math.round(this.h / _HOUSE_ELEM_BLOCK);
    }

    _gen_furniture_function(furnitures){
      var g = this.gen;
      return function(x,y) {
        var furniture = g.pick(furnitures);
        return new furniture(x, y);
      }
    }

    populate() {
      this.roomFiller.set_tries(0, this.gen.int(10) - 7);
      var type = this.type;
      this.roomFiller.set_object(50, 60, function(x,y,seed){ return new M_Villager(type, x, y, seed, true); });
      this.roomFiller.fill_floor_by_retry();
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

    exclusive_furniture(filler) {
      switch(this.type){
        case CITIES.acceptance:
          filler.add_default_constructor("B_Rope", 3);
          break;
        case CITIES.hope:
          filler.add_default_constructor("B_PottedPlant", 2);
          filler.add_default_constructor("B_PottedFlower", 2);
          break;
        case CITIES.indulgence:
          filler.add_default_constructor("B_Bottles", 3);
          break;
        case CITIES.fear:
          filler.add_default_constructor("B_WeaponRack", 3);
          break;
        default:
          break;
      }
    }

    exclusive_wall_furniture(filler) {
      switch(this.type){
        case CITIES.denial:
          filler.add_default_constructor("B_Mask_wall", 4);
          filler.add_default_constructor("B_SpikyMask_wall", 4);
          filler.add_default_constructor("B_CurtainedWindow_wall");
          break;
        case CITIES.hope:
          filler.add_default_constructor("B_Window_wall");
          filler.add_default_constructor("B_FlowerCrown_wall");
          break;
        case CITIES.acceptance:
          filler.add_default_constructor("B_Window_wall");
          break;
        case CITIES.indulgence:
          filler.add_default_constructor("B_Window_wall");
          filler.add_default_constructor("B_BottlesShelf_wall", 3);
          break;
        case CITIES.fear:
          filler.add_default_constructor("B_CurtainedWindow_wall");
          filler.add_default_constructor("B_ShieldDisplay_wall", 2);
          filler.add_default_constructor("B_WeaponDisplay_wall", 2);
          break;
        default:
          break;
      }
    }

    decorate_bedroom(){ //70 px top
      if(this.is_top){
        var topfiller = new MultiFiller(this.roomFiller, 55, 0);
        topfiller.add_default_constructor("B_Chimney_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_Clock_wall");
        topfiller.add_default_constructor("B_Candles_wall");
        this.exclusive_wall_furniture(topfiller);
        topfiller.fill_line();
      }
      var decorFiller = new MultiFiller(this.roomFiller, 50, 50);
      decorFiller.add_default_constructor("B_Papers");
      decorFiller.add_default_constructor("B_Bed", 50, 80);
      decorFiller.add_default_constructor("B_Hay", 70, 50);
      decorFiller.add_default_constructor("B_Chest");
      this.exclusive_furniture(decorFiller);
      decorFiller.set_tries(3, 0.1 * Math.floor(this.w * this.h / 2000)); // WIP
      decorFiller.fill_decor_by_retry();
    }

    decorate_kitchen(){
      if(this.is_top){
        var topfiller = new MultiFiller(this.roomFiller, 55, 0);
        topfiller.add_default_constructor("B_Chimney_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_Clock_wall");
        topfiller.add_default_constructor("B_Candles_wall");
        topfiller.add_default_constructor("B_FancyShelf_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_AlchemyShelf_wall", 1, 55, 20);
        this.exclusive_wall_furniture(topfiller);
        topfiller.fill_line();
      }
      var decorFiller = new MultiFiller(this.roomFiller, 50, 50);
      decorFiller.add_default_constructor("B_Barrel");
      decorFiller.add_default_constructor("B_Bocals");
      decorFiller.add_default_constructor("B_Box");
      decorFiller.add_default_constructor("B_Sack");
      decorFiller.add_default_constructor("B_Housefire");
      decorFiller.add_default_constructor("B_Table");
      decorFiller.add_default_constructor("B_Stool");
      this.exclusive_furniture(decorFiller);
      decorFiller.set_tries(3, Math.floor(this.w * this.h / 2000)); // WIP
      decorFiller.fill_decor_by_retry();

    }

    decorate_random_room(){
      if(this.is_top){
        var topfiller = new MultiFiller(this.roomFiller, 55, 0);
        topfiller.add_default_constructor("B_Chimney_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_Clock_wall");
        topfiller.add_default_constructor("B_Candles_wall");
        topfiller.add_default_constructor("B_FancyShelf_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_AlchemyShelf_wall", 1, 55, 20);
        this.exclusive_wall_furniture(topfiller);
        topfiller.fill_line();
      }
      var decorFiller = new MultiFiller(this.roomFiller, 50, 50);
      decorFiller.add_default_constructor("B_Barrel");
      decorFiller.add_default_constructor("B_Bocals");
      decorFiller.add_default_constructor("B_Box");
      decorFiller.add_default_constructor("B_Papers");
      decorFiller.add_default_constructor("B_Sack");
      decorFiller.add_default_constructor("B_Jar");
      decorFiller.add_default_constructor("B_Stool");
      decorFiller.add_default_constructor("S_SavePoint", 0.1);
      decorFiller.add_default_constructor("B_Bucket");
      decorFiller.add_default_constructor("B_Chest");
      this.exclusive_furniture(decorFiller);
      decorFiller.set_tries(3, 0.5 * Math.floor(this.w * this.h / 2000)); // WIP
      decorFiller.fill_decor_by_retry();
    }

    expand_top() {
       this.room_top = new HG_Room(this.type, this.gen.get(), this.x, this.y - this.h - 25, [this.w, 0], true);
       var connection_x = this.x + Math.min(this.room_top.w, this.w)/2 - 25;
       var c = HTML.snapToGrid(connection_x, this.y - this.h + 25);
       new S_WoodFloor(c[0], c[1], 50, 75);
    }

    expand_right() {
       this.room_right = new HG_Room(this.type, this.gen.get(), this.x + this.w + 25, this.y, [0, this.h]);
       var connection_y = this.y - Math.min(this.room_right.h, this.h)/2 + 25;
       var c = HTML.snapToGrid(this.x + this.w - 25, connection_y);
       new S_WoodFloor(c[0], c[1], 75, 50);
    }

    expand_diag() {
      var x = this.room_right.x;
      var y = this.room_top.y;
      var w = this.room_right.w;
      var h = this.room_top.h;
      var diag = new HG_Room(this.type, this.gen.get(), x, y, [w, h], true);
      var connection_left = HTML.snapToGrid(x-50, y - h/2+25);
      var connection_bot = HTML.snapToGrid(x + w/2-25, y+50);

      new S_WoodFloor(connection_left[0], connection_left[1], 75, 50);
      new S_WoodFloor(connection_bot[0], connection_bot[1], 50, 75);
    }

    expand() {
      this.expand_top();
      this.expand_right();
      this.expand_diag();
    }

    main_entrance(outside) {
      var f = new S_ExitFloor(this.x + 0.5*this.w - 25, this.y + 25, 50, 35, outside);
      return f;
    }
}


class HouseGenerator {
    constructor(type, seed, outside) {
      this.gen = new Generator(seed);
      this.type = type;
      this.x = 1200;
      this.y = 2000;
      this.outside = outside;
    }

    build() {
      var main_hall = new HG_Room(this.type, this.gen.get(), this.x, this.y);
      main_hall.expand();
      return main_hall.main_entrance(this.outside); // entrance
    }
}
