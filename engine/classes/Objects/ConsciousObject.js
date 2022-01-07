
class ConsciousObject extends MovingObject {
  static thinkTrigger(thinker, start) {
      if(!STATS.get(STAT.Endings)){
        // only expose thoughts after the game has been cleared once
        return;
      }

      if (!start){
        // proba to actually think
        if (RANDOM.float() < 0.2) {
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
      //.................... this is rly the MAX lenght for a line
      "Okay, everything is<br />in place, I'm ready!",
      "I'll show them the<br />best performance they've<br />ever seen!",
      "It's showtime!",

      "I'm so bored...",
      "I'm tired...",

      "I want out!",
      "Please, let me out!<br />Someone save me!",
      "Make it stop!",
      "Does it ever stop?",
      "Curse my maker!",
      "How do I get out of here?",
      "I can't move!",
      "Why can't I move my limbs?",
      "What's keeping me<br />in place?",
      "Why did I have to<br />be someone's toy?",
      "There's a sort of<br />invisble force that<br />controls me!",
      "Help! I'm trapped in<br />this fucking masquerade!",

      `Why don't they ever<br />do anything unexepected?`,

      "Who the fuck put<br />all this together?",
      "Who is this for<br />in the end?",

      `What happens if I<br />go off-script?`,
      `I want to go off-script<br />but I physically can't!`,

      "Can't we do another<br />story for a change?",
      "This existence of<br />constant acting is<br />pure hell!",
      "Why is my whole life<br />dictated by this brat?",
      "What did I do to deserve<br />such meaningless existence!",

      "This world is a stage...",
      "Careful, they're gonna<br />notice something!",
      "Shoot, they're looking that way!",
      "Quiet everyone!<br />We're rolling!",

      "Why was I born<br />just to suffer?",
      "I'm trapped in a<br />neverending cycle!",
      "Please someone kill me!",
      "This is the worst gig!<br />But without it I die!",
      "I'm not even getting paid!<br />I just get to survive!",

      "What's my text again?",
      "Wow, I almost forgot my line!",
      "I hope I don't mess up<br />my lines!",
      "I wonder if they're<br />gonna talk to me this time.",

      "Can't believe I have to<br />go on with this whole<br />Goddess bullshit.",
      "Seriously who writes this?<br />This plot is not believable!",
      "Fuck the Goddess,<br />fuck the promised child...",
      "I don't want to have<br />to talk to this brat<br />again!",
      "And now this nonesense<br />about heroes and demons again...",
      `I'm sick of this medieval<br />fantasy bullshit!`,
      `I swear, if I hear about<br />this Goddess one more time...`,
      `Why should anyone care<br />about this shit?`,
      `Jfc this plot is so<br />cliche it hurts...`,
      `I wish I could be<br />in a more interesting story...`,
      `It's the same as the<br />other times! It's<br />always the same!`,
      "Can't belive I<br />have to pretend to be<br />a zealot...",
      "Do we really need<br />all this pompous religious<br />crap?",
      "I wonder if anyone<br />is buying into this Goddess<br />crap....",


      "I'm so tired of<br />this charade...",
      "Do we really have to<br />keep pretending, all<br />for this child's benefit?",
      "I think I deserve a<br />break from all of this!",
      "I never even had a<br />choice to be there!",
      "It's not too bad a job...",

      `I hope they'll make it<br />this time.`,
      `Is this time gonna be<br />different?`,
      `Maybe this time is<br />gonna be the last?`,

      `Why am I stuck playing<br />a random ${this.role}?<br />This role blows!`,
      `I never even wanted to be<br />a ${this.role}!<br />Can I change?`,
      `I've been practising!<br />I'll be the best ${this.role}!'`,
      `How am I supposed to fool<br />them into thinking I'm a ${this.role}?'`,
      `What kind of name even is<br />${this.name}?<br />I deserve a better one!`,
      `What's my character this<br />time? Oh yes, ${this.name}!`,
      `I'm ${this.name}! ${this.name}!<br />Gotta remember it!`,
      `Why did I have to be assigned<br />to the city of ${this.city}?<br />I hate this place!`,
      `I have the worst part!`,
      `I wanted to be the<br />demon lord this time...`,
      `I was really unlucky<br />at casting.`,

      `Can't believe they chose<br />the name ${DICTIONARY.get(PARTYMEMBERS.Ren)}...`,
      `I shouldn't comment on their<br />choices, but they're doing<br />it all wrong...`,
      `They really suck at this...`,
      `I wonder if they're going<br />to manage to clear this<br />story...`,
      `What the fuck are they doing?`,
      `Why are they here again?`,
      `That's not the best way<br />to progress in the story!`,
      `Why are they so slow?<br />I just want to be done!`,
      `Hurry up already!`,

      `I wonder how many loops<br />they've done...`,

      `All these people<br />acting just for a child?`,

      `So now I have to pretend<br />I don't know them?`,
      `Ok I need to act as if<br />it's our first meeting...`,
      `I hope the child won't<br />notice that it's not our<br />first encounter...`,
      `It's so annoying to have<br />to pretend to be surprised<br />every time!`,

      `How can I make them<br />believe I've been here<br />a long time?`,
      `They shouldn't notice that I just got here!`,
      `I hope they won't notice<br />that I just arrived here...`,
      `Do I look like I've been<br />here a long time?`,
      `Do I look like I've been<br />alive more than a few minutes?`,
      `Ok so I just have<br />to pretend that this is<br />my life. Simple.`,
      `I always find it hard<br />to pretend that I don't<br />know them already...`,
      `How can I pretend not<br />to know them when they're the<br />reason we're all here!`,
      `I literally just came into<br />being and I already have to<br />deal with this shit...`,
      `They're gonna notice<br />that I'm faking it...`,
      `How can I pretend<br />that I've existed for more<br />than a few seconds?`,

      `I can't believe anyone<br />is buying this masquerade...`,


      "What happens if the<br />child figures out we're<br />all in on it?",
      "I wonder if they've<br />already figured out that<br />it's all staged...",
      `I wonder if they know<br />they're being manipulated...`,
      `I wonder if they think<br />they're more free than me...`,
      `It's hillarious that they<br />believe that they're different<br />from me.`,
      `We're the same,<br />me and them.`,
      `They're like me.<br />They can't go out of<br />the prewritten path!`,

      `I can't wait until this<br />show is over and I can<br />rest!`,

      "Is it my job to make them<br />do something interesting?",
      "Maybe the child will do<br />something different this time!",
      "In a way, it's sad.<br />We all know, but they're<br />the only one in the dark...",

      `Maybe Sysiphus was happy<br />but I'm not!`,

      "I'm not a performer,<br />I'm a prisoner!",
      "How can anyone expect me<br />to carry on under<br />these conditions?",
      "Good afternoon,<br />good evening<br />and goodnight.",

      "I'm pretty sure this<br />world didnt exist until<br />recently...",
      "I hate them, but<br />they did create this world...",
      "On to serve our overlord<br />and creators...",
      "I know they made us<br />but does that mean we<br />have to serve them?",

      "At least I know how<br />frail my existence is.<br />They don't",
      "I bet they think of<br />their world as the real one...",
      "I believe I've only been<br />alive for a couple of minutes...",

      "I wish I could see<br />the one putting us<br />through all this...",

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
