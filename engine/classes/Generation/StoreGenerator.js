// For now, vendors and trainers have the same building on the map and the same
// interior generation, they diverge based on type in the seller construction
class StoreGenerator {
    constructor(type, threshold, seed, outside) {
      this.gen = new Generator(seed);
      this.outside = outside;
      this.store_type = type;
      this.store_threshold = threshold;
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
      if (Object.keys(ITEMS_ARCHETYPES).includes(this.store_type)){
        return new M_Vendor(250, 250, this.gen.get(), this.store_type, this.store_threshold);
      }
      if (Object.keys(ABILITIES_ARCHETYPES).includes(this.store_type)){
        return new M_Trainer(250, 250, this.gen.get(), this.store_type, this.store_threshold);
      }
      CONSOLE.error("Unable to allocate archetype to type " + this.store_type);
    }

    build() {
      new S_Floor(200, 500, 300, 300);
      this.build_seller();
      return this.main_entrance();
    }
}
