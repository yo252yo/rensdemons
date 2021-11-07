
// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.fissure();
var gen = new Generator(DICTIONARY.get("world_seed")*22);

// ===================
//hack 1. FLOORS
// ===================
new S_WebFloor(1300,1775,225,200);

new S_WebFloor(1250,2600,175,1025);
new S_WebFloor(1200,2650,275,300);

new S_WebFloor(1075,2400,200,50);
new S_WebFloor(1400,2400,200,50);
new S_WebFloor(1200,2825,50,275);
new S_WebFloor(1425,2825,50,275);
new S_WebFloor(1315,2900,50,350);

// ===================
//hack 2. EXIT
// ===================
new S_ExitFloor(1500,1775,50,200, "042_fissure_trunk");

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

var prophecy = function() {
  TextBannerSequence.make(["You find a column on which some text is inscribed in a variety of different languages. You soon find a fragment you can read.",
                           "Holy among all things, Precious above all else<br />MYSELF must be center of all my attentions<br />To be cherished, revered and heralded supreme"]);
}
var t = new S_event(1325, 2850);
t.interaction = prophecy;


// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

new S_WebLarge(1250,1600);


var filler = new Filler(gen.get());
filler.set_zone(1150,2675,375,1100);
var decorFiller = new MultiFiller(filler, 60, 50);
decorFiller.add_default_constructor("S_CristalSmall");
decorFiller.add_default_constructor("S_RockColumn");
decorFiller.add_default_constructor("S_Web");

decorFiller.add_default_constructor("S_CristalBig", 0.1);
decorFiller.add_default_constructor("S_Rocks1", 0.1);
decorFiller.add_default_constructor("S_Rocks2", 0.1);
decorFiller.add_default_constructor("S_Rocks4", 0.1);
decorFiller.add_default_constructor("S_Rocks3", 0.1);
decorFiller.set_tries(10, 20);
decorFiller.fill_decor_by_retry();

decorFiller.add_default_constructor("S_CristalTiny", 0.1);
decorFiller.add_default_constructor("S_Bocals", 2);
decorFiller.add_default_constructor("S_Rubble", 2);
decorFiller.add_default_constructor("S_RubbleLarge", 2);
decorFiller.add_default_constructor("S_Hole", 1, 75, 150);

decorFiller.set_tries(40, 50);
decorFiller.fill_floor_by_retry();

// ===================
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================


var events = new EventFiller(decorFiller, 5);
events.battle('caves/bloodsucker', 0.1);
events.battle('caves/bat');
events.battle('caves/mole', 0.8);
events.battle('caves/scorpion');
events.battle('caves/crawler');



events.groundItem(ITEM.Linnens);
events.groundItem(ITEM.AncientRubbles);
events.battleRubble(ITEM.Arrow);
events.battleRubble(ITEM.Poison_darts);
events.battleRubble(ITEM.Rope);
events.battleRubble(ITEM.Sword_iron, 0.1);
events.battleRubble(ITEM.Net, 0.1);
events.battleRubble(ITEM.Shield, 0.1);


events.text([
  `You find a metal tablet on the ground. It depicts with an uncanny precision huge machines from another time.`,
  `$$BestFriend$: "What do you think these were for?"`,
  `$$Ren$: "No idea, but I'm more impressed by the craftsmanship, this is clearly beyond the abilities of humans today..."`]);
events.text([
  `$$BestFriend$: "This place is weird... What do you think it used to be? A museum?"`,
  `$$Ren$: "Possibly. Or maybe a temple?"`]);
events.text(`You notice that the walls are covered with scratches. Looking more closely, it appears that it used to be sculpted into majestic scenes of the ancestor's daily lives, but time erroded the drawings beyond recognition, and most of the paint has since faded.`);
events.text(`You pick up on the ground a little golden silhouette. It used to be a man, but several limbs are missing. Time took quite a toll on the icon, but you can still make out a few words written at the bottom: "no gods or kinds, only man".`);
events.text(`You find scraps of papers that have withstood the passage of time, as if enchanted. On them are portrayed in the most realistic depiction you've ever seen the smiling faces of the ancestors. It's hard to think that you come from the same species, yet their lives were so easy, without famines or demons to fight...`);
events.text(`You jump by surprise when a huge pile of rock and metal slides in a thunderous noise.`);
events.text(`The faint glow of your torch is reflected on metallic surfaces on the walls. It appears to be some sort of broken mechanism, whose purpose has been long forgotten in the abyss of time.`);
events.text(`You cannot help but cough. The air around you is heavy and dusty, and you can tell from the stale odor that nobody has been here in ages.`);
events.text(`You find a little leaflet which has withstood the test of time. It says "Do your part and denounce anyone opposing Individualism! Only a total ruthless competition of all against all can push us to the greatest heights of the human spirit!".`);


events.set_tries(25, 40);
events.fill_floor_by_retry();


// ===================
//hack 7. START/INIT
// ===================
CURRENTLEVEL.initialize_with_character(1450,1700);

// boss = rhino
