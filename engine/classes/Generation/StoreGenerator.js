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
        return new M_Vendor(1350, 1350, this.gen.get(), this.store_type, this.store_threshold);
      }
      if (Object.keys(ABILITIES_ARCHETYPES).includes(this.store_type)){
        return new M_Trainer(1250, 1375, this.gen.get(), this.store_type, this.store_threshold);
      }
      CONSOLE.error("Unable to allocate archetype to type " + this.store_type);
    }

    decorate() {
      if (Object.keys(ITEMS_ARCHETYPES).includes(this.store_type)){
        this.decorate_shop();
      }
      if (Object.keys(ABILITIES_ARCHETYPES).includes(this.store_type)){
        this.decorate_trainer();
      }
    }

    decorate_trainer() {
      new B_Statue(1325, 1350);
      new B_Table(1250, 1410);
      var i1 = new B_Papers(1350, 1450);
      var i2 = new B_Papers(1225, 1475);

      var text = "Parchments covered with scribbles about the way of the " + this.store_type + ".";

      i1.interaction = function() {  new TextBanner(text);   };
      i2.interaction = function() {  new TextBanner(text);   };

      new B_CurtainedWindow_wall(1225, 1300);
    }

    decorate_shop() {
      if(this.store_type == ITEMS_ARCHETYPES_NAMES.Alchemy){
        new B_AlchemyShelf_wall(1225, 1320);
        new B_AlchemyShelf_wall(1275, 1320);

        new B_Bocals(1225, 1425);
        new B_Bocals(1350, 1475);

        new B_Table(1350, 1380);
      } else {
        new B_ShieldDisplay_wall(1225, 1300);
        new B_WeaponDisplay_wall(1275, 1300);

        new B_WeaponRack(1235, 1375);
        new B_WeaponRack(1235, 1450);
      }
    }

    build() {
      new S_WoodFloor(1200, 1500, 200, 200);
      this.build_seller();
      this.decorate();

      return this.main_entrance();
    }
}
