// For now, vendors and trainers have the same building on the map and the same
// interior generation, they diverge based on type in the seller construction
class StoreGenerator {
    constructor(type, threshold, seed, outside) {
      this.gen = new Generator(seed);
      this.outside = outside;
      this.store_type = type;
      this.store_threshold = threshold;

      AUDIO.music.levels.house();
    }

    main_entrance() {
      var f = new S_ExitFloor(1275, 1525, 50, 35, this.outside);
      return  [1290, 1505];
    }

    build_seller() {
      if (Object.keys(ITEMS_ARCHETYPES).includes(this.store_type)){
        return new M_Vendor(1250, 1350, this.gen.get(), this.store_type, this.store_threshold);
      }
      if (Object.keys(ABILITIES_ARCHETYPES).includes(this.store_type)){
        return new M_Trainer(1250, 1350, this.gen.get(), this.store_type, this.store_threshold);
      }
      CONSOLE.error("Unable to allocate archetype to type " + this.store_type);
    }

    build() {
      new S_WoodFloor(1200, 1500, 200, 200);
      this.build_seller();
      return this.main_entrance();
    }
}
