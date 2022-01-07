
class ConsciousObject extends MovingObject {
  static thinkTrigger(thinker, start) {
      if(!STATS.get(STAT.Endings)){
        // only expose thoughts after the game has been cleared once
        return;
      }

      if (!start){
        // proba to actually think
        if (RANDOM.float() < 1){ //0.2) { // TODO: WIP
          thinker.think();
        }
      }
      var nextThoughtSeconds = 5 + RANDOM.int(30);
      thinker.thoughtsTimeout = setTimeout(function(){ConsciousObject.thinkTrigger(thinker)}, nextThoughtSeconds * 1000);
  }

  static clearThoughtBubble(thinker) {
    if(thinker && thinker.bubble){
      thinker.bubble.destroy();
    }
  }
  static checkThoughtBubble(thinker) {
    if(thinker && thinker.bubble){
      if (Math.abs(thinker.x - CHARACTER.character.x) < 170 && Math.abs(thinker.y - CHARACTER.character.y) < 170){
        thinker.bubble.destroy();
      } else {
        setTimeout(function(){ConsciousObject.checkThoughtBubble(thinker)}, 500);
      }
    }
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

  makeThoughtBubble(thought){
    if(this.bubble) {
      this.bubble.destroy();
    }

    if (this.x && this.y) {
       this.bubble = new TextBoxFitted(this.x, this.y - 55, thought);
       this.bubble.adjust_depth(9000);
       var thinker = this;

      ConsciousObject.checkThoughtBubble(thinker);
      setTimeout(function(){ConsciousObject.clearThoughtBubble(thinker)}, 6000);
    }
  }

  think() {
    var thought = RANDOM.pick([
      // [Do we really have to ] this is rly the MAX lenght
      "I'm so tired of<br />this charade...",
      "Do we really have to<br />keep pretending, all<br />for this child's benefit?",
      "I think I deserve a<br />break from all of this!",
      "I never even had a<br />choice to be there!",
      "Okay, everything is<br />in place, I'm ready!",
      "What happens if the<br />child figures out we're<br />all in on it?",
      `Why am I stuck playing<br />a random ${this.role}?<br />This role blows!`,
    ]);
    CONSOLE.log.thoughts(this.name, thought.replaceAll("<br />", " "));
    this.makeThoughtBubble(thought);
  }

  record_death() {
    if(this.bubble) {
      this.bubble.destroy();
    }

    clearTimeout(this.thoughtsTimeout);
    LEDGER.record_death(this.name, this.role);
  }
}
