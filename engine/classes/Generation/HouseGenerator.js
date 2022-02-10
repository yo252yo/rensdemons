
var _HOUSE_ELEM_BLOCK = 12.5;

class HG_Room {
    constructor(type, seed, x, y, imposed_dimensions, is_top, empty) {
      this.type = type;
      this.gen = new Generator(seed);
      this.x = x;
      this.y = y;
      this.is_top = is_top;
      var d = this.dimention(imposed_dimensions);
      this.w = d[0];
      this.h = d[1];
      this.floor = new S_WoodFloor(this.x, this.y, this.w, this.h);

      if(!empty){
        this.populate();
      }
      this.decorate();
    }

    room_extrema_dimensions(){
      switch(this.type){
        case CITIES.hope:
          return [200,250,400,500];
        case CITIES.fear:
          return [80,80,250,250];
        case CITIES.indulgence:
          return [400,200,700,500];
        case CITIES.denial:
          return [200,200,300,300];
        case CITIES.acceptance:
          return [300,100,700,250];
      }
    }


    dimention(imposed_dimensions) {
      var dimensions = imposed_dimensions;
      if (!dimensions)  dimensions = [undefined, undefined];

      var extrema = this.room_extrema_dimensions();

      if (!dimensions[0])        dimensions[0] = extrema[0] + (extrema[2] - extrema[0]) * this.gen.get();
      if (!dimensions[1])        dimensions[1] = extrema[1] + (extrema[3] - extrema[1]) * this.gen.get();

      return [_HOUSE_ELEM_BLOCK * Math.round(dimensions[0] / _HOUSE_ELEM_BLOCK),
              _HOUSE_ELEM_BLOCK * Math.round(dimensions[1] / _HOUSE_ELEM_BLOCK)];
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
          filler.add_default_constructor("B_Window_wall", 3);
          filler.add_default_constructor("B_FlowerCrown_wall", 2);
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
        var topfiller = new Filler(this.gen.get(),70, 0);
        topfiller.set_zone_from_floor(this.floor);
        topfiller.add_default_constructor("B_Chimney_wall", 1, 70, 20);
        topfiller.add_default_constructor("B_Clock_wall");
        topfiller.add_default_constructor("B_Candles_wall");
        this.exclusive_wall_furniture(topfiller);
        topfiller.fill_line();
      }
      var decorFiller = new Filler(this.gen.get(),50, 50);
      decorFiller.set_zone_from_floor(this.floor);
      decorFiller.add_default_constructor("B_Papers");
      decorFiller.add_default_constructor("B_Bed", 50, 80);
      decorFiller.add_default_constructor("B_Hay", 80, 50);
      decorFiller.add_default_constructor("B_Chest");
      this.exclusive_furniture(decorFiller);
      decorFiller.set_tries(3, 0.1 * this.object_density_multiplier() * Math.floor(this.w * this.h / 3500));
      decorFiller.fill_decor_by_retry();
    }

    decorate_kitchen() {
      if(this.is_top){
        var topfiller = new Filler(this.gen.get(),70, 0);
        topfiller.set_zone_from_floor(this.floor);
        topfiller.add_default_constructor("B_Chimney_wall", 1, 70, 20);
        topfiller.add_default_constructor("B_Clock_wall");
        topfiller.add_default_constructor("B_Candles_wall");
        topfiller.add_default_constructor("B_Shelf_wall", 1, 70, 20);
        topfiller.add_default_constructor("B_Cabinet_wall", 1, 70, 20);
        topfiller.add_default_constructor("B_FancyShelf_wall", 1, 70, 20);
        topfiller.add_default_constructor("B_AlchemyShelf_wall", 1, 70, 20);
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
        var topfiller = new Filler(this.gen.get(),70, 0);
        topfiller.set_zone_from_floor(this.floor);
        topfiller.add_default_constructor("B_Chimney_wall", 1, 70, 20);
        topfiller.add_default_constructor("B_Clock_wall");
        topfiller.add_default_constructor("B_Candles_wall");
        topfiller.add_default_constructor("B_FancyShelf_wall", 1, 70, 20);
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
        var topfiller = new Filler(this.gen.get(),70, 0);
        topfiller.set_zone_from_floor(this.floor);
        topfiller.add_default_constructor("B_Candles_wall");
        topfiller.add_default_constructor("B_Shelf_wall", 1, 70, 20);
        topfiller.add_default_constructor("B_FancyShelf_wall", 1, 70, 20);
        topfiller.add_default_constructor("B_Cabinet_wall", 1, 70, 20);
        topfiller.add_default_constructor("B_AlchemyShelf_wall", 1, 70, 20);
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
        var topfiller = new Filler(this.gen.get(),70, 0);
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

    expand_top(is_top) {
       this.room_top = new HG_Room(this.type, this.gen.get(), this.x, this.y - this.h - 25, [this.w, 0], is_top);
       var connection_x = this.x + Math.min(this.room_top.w, this.w)/2 - 25;
       var c = HTML.snapToGrid(connection_x, this.y - this.h + 25);
       new S_WoodFloor(c[0], c[1], 50, 75);
    }

    expand_right(is_top) {
       this.room_right = new HG_Room(this.type, this.gen.get(), this.x + this.w + 25, this.y, [0, this.h], is_top);
       var connection_y = this.y - Math.min(this.room_right.h, this.h)/2 + 25;
       var c = HTML.snapToGrid(this.x + this.w - 25, connection_y);
       new S_WoodFloor(c[0], c[1], 75, 50);
    }

    expand_diag(is_top) {
      var x = this.room_right.x;
      var y = this.room_top.y;
      var w = this.room_right.w;
      var h = this.room_top.h;
      var diag = new HG_Room(this.type, this.gen.get(), x, y, [w, h], is_top);
      var connection_left = HTML.snapToGrid(x-50, y - h/2+25);
      var connection_bot = HTML.snapToGrid(x + w/2-25, y+50);

      new S_WoodFloor(connection_left[0], connection_left[1], 75, 50);
      new S_WoodFloor(connection_bot[0], connection_bot[1], 50, 75);
    }

    expand_left(is_top) {
      var room_dimensions = this.dimention();

       this.room_left = new HG_Room(this.type, this.gen.get(), this.x - room_dimensions[0] - 25, this.y, [room_dimensions[0], this.h], is_top);
       var connection_y = this.y - Math.min(this.room_left.h, this.h)/2 + 25;
       var c = HTML.snapToGrid(this.x - 50, connection_y);
       new S_WoodFloor(c[0], c[1], 75, 50);
    }

    expand_antidiag(is_top) {
      var x = this.room_left.x;
      var y = this.room_top.y;
      var w = this.room_left.w;
      var h = this.room_top.h;
      var diag = new HG_Room(this.type, this.gen.get(), x, y, [w, h], is_top);
      var connection_right = HTML.snapToGrid(x+w-25, y - h/2+25);
      var connection_bot = HTML.snapToGrid(x + w/2-25, y+50);

      new S_WoodFloor(connection_right[0], connection_right[1], 75, 50);
      new S_WoodFloor(connection_bot[0], connection_bot[1], 50, 75);
    }

    expand() {
      switch(this.type){
        case CITIES.hope:
          this.expand_right(true);
          this.expand_left(true);
          break;
        case CITIES.fear:
          this.expand_top(true);
          this.expand_right();
          this.expand_diag(true);
          this.expand_left();
          this.expand_antidiag(true);
          break;
        case CITIES.indulgence:
          break;
        case CITIES.denial:
          this.expand_top(true);
          this.expand_right();
          this.expand_diag(true);
          break;
        case CITIES.acceptance:
          this.expand_top(true);
          break;
      }
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
      this.x = 2000;
      this.y = 2000;
      this.outside = outside;
    }

    build() {
      var is_top = false;
      if(this.type == CITIES.indulgence || this.type == CITIES.hope){
        is_top = true;
      }
      var main_hall = new HG_Room(this.type, this.gen.get(), this.x, this.y, undefined, is_top);
      main_hall.expand();
      return main_hall.main_entrance(this.outside); // entrance
    }
}
