
class ConsciousObject extends MovingObject {
  static thinkTrigger(thinker, start) {
      if (!start){
        // proba to actually think
        if (RANDOM.float() < 1){ //0.2) { // TODO: WIP
          thinker.think();
        } else {
          console.log(".");
        }
      }
      var nextThoughtSeconds = 5;// + RANDOM.int(30); // TODO: WIP
      thinker.thoughtsTimeout = setTimeout(function(){ConsciousObject.thinkTrigger(thinker)}, nextThoughtSeconds * 1000);
  }

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

    ConsciousObject.thinkTrigger(this, true);

    LEDGER.record_birth(this.name, this.city, this.role);
  }

  think() {
    var thought =  RANDOM.pick([
      "I'm so tired of this charade...",
      "Do we really have to keep pretending, all for this child's benefit?",
      "I think I well deserve a break from all of this!",
      "I never even had a choice to be there!",
      "Okay, everything is in place, I'm ready!",
      "What happens if the child figures out we're all in on it?",
      `Why am I stuck playing a random ${this.role}? This role blows!`,
    ]);
    CONSOLE.log.thoughts(this.name, thought);
  }

  record_death() {
    clearTimeout(this.thoughtsTimeout);
    LEDGER.record_death(this.name, this.role);
  }
}
