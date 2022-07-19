// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.levels.fissure();
var gen = new Generator(DICTIONARY.get("world_seed")*21);

// ===================
//hack B. FLOORS
// ===================
new S_WebFloor(1000,2525,750,950);

new S_WebFloor(1000,2625,200,200);
new S_WebFloor(1550,2625,200,200);

new S_WebFloor(900,1775,150,200);
new S_WebFloor(1700,1775,150,200);

new S_WebFloor(1300,1600,150,100);

// ===================
//hack C. EXIT
// ===================

new S_ExitFloor(1380,2390,20,60, "042_fissure");
var exit = new S_ExitFloor(1360,2470,20,100, "042_fissure");
new S_ExitFloor(1380,2525,20,80, "042_fissure");

var riddle = function(text, answer, destination){
  var ask = function(){
    var callback = function(reply){
      if (!reply) { reply = ""; }
      reply = reply.toLowerCase();
      if(reply == answer){
        CURRENTLEVEL.setup(destination);
      } else {
        TextBannerSequence.make(["Nothing happens."]);
      }
    }
    new PromptTextMenu("What will you say?", "", callback);
  }
  return function() {
    TextBannerSequence.make([
      `A heavy metal door stands before you. Runes and pictograms indicate that it expects you to speak out loud a password. Surprisingly, a part of the text is in a language you can decipher.`,
      text
    ], ask);
  };
}

var left_leg = new S_ExitFloor(1000,2650,200,50);
left_leg.interaction = riddle("What is most important, the only center of everything, the foundation for all experience?", "me", "042_4_fissure_left_leg");
var right_leg = new S_ExitFloor(1550,2650,200,50);
right_leg.interaction = riddle("What is holy among all things, to be cherished and revered?", "myself", "042_3_fissure_right_leg");


var left_arm = new S_ExitFloor(875,1775,50,200);
left_arm.interaction = riddle("What is Man entitled dominion over?", "everything", "042_2_fissure_left_arm");
var right_arm = new S_ExitFloor(1825,1775,50,200);
right_arm.interaction = riddle("What is grander than Man?", "nothing", "042_1_fissure_right_arm");

var head = new S_ExitFloor(1300,1525,150,50);
head.interaction = riddle("What is the Goddess?","dead","042_5_fissure_head");

// ===================
//hack D. UNIQUE ELEMENTS
// ===================

var prophecy = function() {
  TextBannerSequence.make(["You find a column on which some text is inscribed in a variety of different languages. You soon find a fragment you can read.",
                           "We build this shrine to the glory of Man<br />To preserve his Spirit through eternity<br />For NOTHING is grander than Man"]);
}
var t1 = new S_event(1500, 1800);
var t2 = new S_event(1200, 1800);
t1.interaction = prophecy;
t2.interaction = prophecy;

new S_SavePoint(1350, 2075);


// ===================
//hack E. DECOR (permanent filler)
// ===================

var filler = new Filler(gen.get());
var decorFiller = new Filler(gen.get(), 60, 50);
decorFiller.set_zone(925,2600,900,1075);
decorFiller.add_default_constructor("S_CristalSmall", 0.5);
decorFiller.add_default_constructor("S_RockColumn");
decorFiller.add_default_constructor("S_Web");

decorFiller.add_default_constructor("S_CristalBig", 0.1);
decorFiller.add_default_constructor("S_Rocks1", 0.1);
decorFiller.add_default_constructor("S_Rocks2", 0.1);
decorFiller.add_default_constructor("S_Rocks4", 0.1);
decorFiller.add_default_constructor("S_Rocks3", 0.1);
decorFiller.set_tries(20, 40);
decorFiller.fill_decor_by_retry();


decorFiller.add_default_constructor("S_CristalTiny", 0.1);
decorFiller.add_default_constructor("S_Bocals", 2);
decorFiller.add_default_constructor("S_Rubble", 2);
decorFiller.add_default_constructor("S_RubbleLarge", 2);
decorFiller.add_default_constructor("S_Hole", 1, 75, 150);

decorFiller.set_tries(20, 40);
decorFiller.fill_floor_by_retry();



// ===================
//hack F. EVENTS (temporary filler)
// ===================


var events = new EventFiller(gen.get(), 20);
events.set_zone(925,2600,900,1075);

events.battle('caves/bloodsucker', 0.2);
events.battle('caves/bat',2);
events.battle('caves/mole', 0.6);
events.battle('caves/scorpion',2);
events.battle('caves/crawler', 1);


events.groundItem(ITEM.Linnens);
events.groundItem(ITEM.AncientRubbles);
events.battleRubble(ITEM.Arrow, 0.8);
events.battleRubble(ITEM.Poison_darts, 0.8);
events.battleRubble(ITEM.Rope, 0.8);
events.battleRubble(ITEM.Sword_iron, 0.1);
events.battleRubble(ITEM.Net, 0.1);
events.battleRubble(ITEM.Shield, 0.1);


events.text([
  `You find a metal tablet on the ground. It depicts with an uncanny precision huge machines from another time.`,
  `$$BestFriend$: "What do you think these were for?"`,
  `$$Ren$: "No idea, but I'm more impressed by the craftsmanship, this is clearly beyond the abilities of humans today..."`], 0.8);
events.text([
  `$$BestFriend$: "This place is weird... What do you think it used to be? A museum?"`,
  `$$Ren$: "Possibly. Or maybe a temple?"`], 0.8);
events.text(`You notice that the walls are covered with scratches. Looking more closely, it appears that it used to be sculpted into majestic scenes of the ancestor's daily lives, but time eroded the drawings beyond recognition, and most of the paint has since faded.`, 0.8);
events.text(`You pick up on the ground a little golden silhouette. It used to be a man, but several limbs are missing. Time took quite a toll on the icon, but you can still make out a few words written at the bottom: "no gods or kings, only man".`, 0.8);
events.text(`You find scraps of papers that have withstood the passage of time, as if enchanted. On them are portrayed in the most realistic depiction you've ever seen the smiling faces of the ancestors. It's hard to think that you come from the same species, seeing how their lives were so easy, without famines or demons to fight...`, 0.8);
events.text(`You jump by surprise when a huge pile of rock and metal slides in a thunderous noise.`, 0.8);
events.text(`The faint glow of your torch is reflected on metallic surfaces on the walls. It appears to be some sort of broken mechanism, whose purpose has been long forgotten in the abyss of time.`, 0.8);
events.text(`You cannot help but cough. The air around you is heavy and dusty, and you can tell from the stale odor that nobody has been here in ages.`, 0.8);
events.text(`You find a little leaflet which has withstood the test of time. It says "Do your part and denounce anyone opposing Individualism! Only a total ruthless competition of all against all can push us to the greatest heights of the human spirit!".`, 0.8);
events.add_conversations(0.2);

events.byConstructor("EB_Tomb", 0.1);
events.byConstructor("EB_Camp", 0.1);

events.battle('encounters/purse', 0.5);

events.set_tries(30, 50);
events.fill_floor_by_retry();

// ===================
//hack G. START/INIT
// ===================
exit.initialize_with_character(1360,2370);
