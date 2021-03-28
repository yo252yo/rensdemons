class StoreGenerator {
    constructor(type, seed, outside) {
      this.gen = new Generator(seed);
      this.outside = outside;
      this.store_type = type;
    }

    main_entrance() {
      var f = new S_Floor(335, 525, 50, 35, 'obj_dark');
      var outside = this.outside;
      f.interaction = function(){
        CURRENTLEVEL.setup(outside);
      }
      return  [350, 505];
    }

    build_seller() {
      return new M_Vendor(250, 250, this.gen.get(), this.store_type);
    }

    build() {
      new S_Floor(200, 500, 300, 300);
      this.build_seller();
      return this.main_entrance();
    }
}
