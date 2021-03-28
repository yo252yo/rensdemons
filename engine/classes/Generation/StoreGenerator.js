

class StoreGenerator {
    constructor(outside) {
      this.outside = outside;
    }

    main_entrance() {
      var f = new S_Floor(335, 625, 50, 35, 'obj_dark');
      var outside = this.outside;
      f.interaction = function(){
        CURRENTLEVEL.setup(outside);
      }
      return  [350, 605];
    }

    build() {
      new S_Floor(200, 600, 300, 300);
      return this.main_entrance();
    }

}
