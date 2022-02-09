
var _MAX_ROOM_W = 500;
var _MAX_ROOM_H = 500;
var _MIN_ROOM_W = 100;
var _MIN_ROOM_H = 100;
var _HOUSE_ELEM_BLOCK = 12.5;

class HG_Room {
    constructor(type, seed, x, y, imposed_dimensions, is_top, empty) {
      this.type = type;
      this.gen = new Generator(seed);
      this.x = x;
      this.y = y;
      this.is_top = is_top;
      this.dimention(imposed_dimensions);
      this.floor = new S_WoodFloor(this.x, this.y, this.w, this.h);

      this.decorate();
      if(empty){
        this.populate();
      }
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

      var multiplier = 1;
      switch(this.type){
        case CITIES.hope:
          multiplier = 1;
          break;
        case CITIES.fear:
          multiplier = 2;
          break;
        case CITIES.indulgence:
          multiplier = 5;
          break;
        case CITIES.denial:
          multiplier = 1;
          break;
        case CITIES.acceptance:
          multiplier = 0.7;
          break;
      }
      var peopleFiller = new Filler(this.gen.get(),50, 60);
      peopleFiller.set_zone_from_floor(this.floor);
      peopleFiller.set_tries(0, this.gen.int(12 * multiplier) - 7);
      var type = this.type;
      peopleFiller.add_constructor(function(x,y,seed){ return new M_Villager(type, x, y, seed, true); });
      peopleFiller.fill_floor_by_retry();
    }

    decorate() {
      var thresholds = {};
      switch(this.type){
        case CITIES.hope:
          thresholds = {prayer: 2, kitchen: 2, storage: 2, hangout: 1, bedroom: 1};
          break;
        case CITIES.fear:
          thresholds = {prayer: 3, kitchen: 1, storage: 3, hangout: 1, bedroom: 1};
          break;
        case CITIES.indulgence:
          thresholds = {prayer: 0.5, kitchen: 3, storage: 1, hangout: 2, bedroom: 1};
          break;
        case CITIES.denial:
          thresholds = {prayer: 1, kitchen: 1, storage: 1, hangout: 1, bedroom: 1};
          break;
        case CITIES.acceptance:
          thresholds = {prayer: 2, kitchen: 1, storage: 1, hangout: 0.5, bedroom: 2};
          break;
      }

      switch(RANDOM.pick_in_weighted_array(thresholds, this.gen)){
        case "prayer":
          return this.decorate_prayer_room();
        case "kitchen":
          return this.decorate_kitchen();
        case "storage":
          return this.decorate_storage_room();
        case "hangout":
          return this.decorate_hangout_room();
        case "bedroom":
          return this.decorate_bedroom();

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

    object_density_multiplier(){
      switch(this.type){
        case CITIES.hope:
          return 2;
        case CITIES.fear:
          return 1;
        case CITIES.indulgence:
          return 5;
        case CITIES.denial:
          return 1;
        case CITIES.acceptance:
          return 0.3;
      }
    }

    decorate_bedroom() { //70 px top
      if(this.is_top){
        var topfiller = new Filler(this.gen.get(),60, 0);
        topfiller.set_zone_from_floor(this.floor);
        topfiller.add_default_constructor("B_Chimney_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_Clock_wall");
        topfiller.add_default_constructor("B_Candles_wall");
        this.exclusive_wall_furniture(topfiller);
        topfiller.fill_line();
      }
      var decorFiller = new Filler(this.gen.get(),50, 50);
      decorFiller.set_zone_from_floor(this.floor);
      decorFiller.add_default_constructor("B_Papers");
      decorFiller.add_default_constructor("B_Bed", 50, 80);
      decorFiller.add_default_constructor("B_Hay", 70, 50);
      decorFiller.add_default_constructor("B_Chest");
      this.exclusive_furniture(decorFiller);
      decorFiller.set_tries(3, 0.1 * this.object_density_multiplier() * Math.floor(this.w * this.h / 3500));
      decorFiller.fill_decor_by_retry();
    }

    decorate_kitchen() {
      if(this.is_top){
        var topfiller = new Filler(this.gen.get(),60, 0);
        topfiller.set_zone_from_floor(this.floor);
        topfiller.add_default_constructor("B_Chimney_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_Clock_wall");
        topfiller.add_default_constructor("B_Candles_wall");
        topfiller.add_default_constructor("B_Shelf_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_Cabinet_wall", 1, 30, 20);
        topfiller.add_default_constructor("B_FancyShelf_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_AlchemyShelf_wall", 1, 55, 20);
        this.exclusive_wall_furniture(topfiller);
        topfiller.fill_line();
      }
      var decorFiller = new Filler(this.gen.get(),50, 50);
      decorFiller.set_zone_from_floor(this.floor);
      decorFiller.add_default_constructor("B_Barrel");
      decorFiller.add_default_constructor("B_Bocals");
      decorFiller.add_default_constructor("B_Box");
      decorFiller.add_default_constructor("B_Jar");
      decorFiller.add_default_constructor("B_Sack");
      decorFiller.add_default_constructor("B_Housefire");
      decorFiller.add_default_constructor("B_Bucket");
      decorFiller.add_default_constructor("B_Table");
      decorFiller.add_default_constructor("B_Stool");
      decorFiller.add_default_constructor("B_Chair");
      this.exclusive_furniture(decorFiller);
      decorFiller.set_tries(3, this.object_density_multiplier() * Math.floor(this.w * this.h / 3500));
      decorFiller.fill_decor_by_retry();
    }

    decorate_hangout_room() {
      if(this.is_top){
        var topfiller = new Filler(this.gen.get(),60, 0);
        topfiller.set_zone_from_floor(this.floor);
        topfiller.add_default_constructor("B_Chimney_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_Clock_wall");
        topfiller.add_default_constructor("B_Candles_wall");
        topfiller.add_default_constructor("B_FancyShelf_wall", 1, 55, 20);
        this.exclusive_wall_furniture(topfiller);
        topfiller.fill_line();
      }
      var decorFiller = new Filler(this.gen.get(),50, 50);
      decorFiller.set_zone_from_floor(this.floor);
      decorFiller.add_default_constructor("B_Table");
      decorFiller.add_default_constructor("B_Stool");
      decorFiller.add_default_constructor("B_Chair");
      this.exclusive_furniture(decorFiller);
      decorFiller.set_tries(3, 0.8 * this.object_density_multiplier() * Math.floor(this.w * this.h / 3500));
      decorFiller.fill_decor_by_retry();
    }

    decorate_storage_room() {
      if(this.is_top){
        var topfiller = new Filler(this.gen.get(),60, 0);
        topfiller.set_zone_from_floor(this.floor);
        topfiller.add_default_constructor("B_Candles_wall");
        topfiller.add_default_constructor("B_Shelf_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_FancyShelf_wall", 1, 55, 20);
        topfiller.add_default_constructor("B_Cabinet_wall", 1, 30, 20);
        topfiller.add_default_constructor("B_AlchemyShelf_wall", 1, 55, 20);
        this.exclusive_wall_furniture(topfiller);
        topfiller.fill_line();
      }
      var decorFiller = new Filler(this.gen.get(),50, 50);
      decorFiller.set_zone_from_floor(this.floor);
      decorFiller.add_default_constructor("B_Barrel");
      decorFiller.add_default_constructor("B_Bocals");
      decorFiller.add_default_constructor("B_Box");
      decorFiller.add_default_constructor("B_Papers");
      decorFiller.add_default_constructor("B_Sack");
      decorFiller.add_default_constructor("B_Jar");
      decorFiller.add_default_constructor("B_Stool");
      decorFiller.add_default_constructor("B_Bucket");
      decorFiller.add_default_constructor("B_Chest");
      this.exclusive_furniture(decorFiller);
      decorFiller.set_tries(3, 1.2 * this.object_density_multiplier() * Math.floor(this.w * this.h / 3500));
      decorFiller.fill_decor_by_retry();
    }

    decorate_prayer_room() {
      if(this.is_top){
        var topfiller = new Filler(this.gen.get(),60, 0);
        topfiller.set_zone_from_floor(this.floor);
        topfiller.add_default_constructor("B_Clock_wall");
        topfiller.add_default_constructor("B_Candles_wall");
        this.exclusive_wall_furniture(topfiller);
        topfiller.fill_line();
      }
      var decorFiller = new Filler(this.gen.get(),50, 50);
      decorFiller.set_zone_from_floor(this.floor);
      decorFiller.add_default_constructor("B_Papers");
      decorFiller.add_default_constructor("S_SavePoint", 0.2);
      decorFiller.add_default_constructor("B_Statue");
      decorFiller.add_default_constructor("B_Chest");
      this.exclusive_furniture(decorFiller);
      decorFiller.set_tries(3, 0.5 * this.object_density_multiplier() * Math.floor(this.w * this.h / 3500));
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
