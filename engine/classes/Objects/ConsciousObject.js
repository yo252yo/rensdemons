
class ConsciousObject extends MovingObject {
  constructor(visual, x, y, w, h, name, city, role, seed) {
    super(visual, x, y, w, h);
    var gen = new Generator(seed || Math.random());

    this.city = city || LEDGER.get_random_city();
    this.role = role || "person";
    this.name = name;
    if(!this.name){
      if (gen.get() < 0.5){
        this.name = gen.pick(DATASETS.male_names);
      } else{
        this.name = gen.pick(DATASETS.female_names);
      }
    }

    LEDGER.record_birth(this.name, this.city, this.role);
  }

  record_death() {
    LEDGER.record_death(this.name, this.role);
  }
}
