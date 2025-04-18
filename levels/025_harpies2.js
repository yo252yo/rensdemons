// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.levels.harpies();
var gen = new Generator(DICTIONARY.get("world_seed")*14);

// ===================
//hack B. FLOORS
// ===================

// room
new S_Floor(750,1225,250,675);

new S_Floor(1025,1225,150,150);
new S_Floor(575,1225,150,150);

new S_Floor(1025,1050,150,150);
new S_Floor(575,1050,150,150);

new S_Floor(1025,875,150,150);
new S_Floor(575,875,150,150);

new S_Floor(1025,700,150,150);
new S_Floor(575,700,150,150);

// hallways
new S_Floor(975,1175,75,50);
new S_Floor(975,1000,75,50);
new S_Floor(975,825,75,50);
new S_Floor(975,650,75,50);
new S_Floor(700,650,75,50);
new S_Floor(700,825,75,50);
new S_Floor(700,1000,75,50);
new S_Floor(700,1175,75,50);

// ===================
//hack C. EXIT
// ===================

var exit = new S_ExitFloor(850,1250,50,50, '025_harpies');

// ===================
//hack D. UNIQUE ELEMENTS
// ===================

var bed = function (x, y) {
  var b = new B_Bed(x+50,y-95);
  b.interaction = function() {
    TextBannerSequence.make([
      "There's a bed, but... it's made of metal? That doesn't seem very comfortable, but it did stand the test of time.",
    ]);
   };
}

bed(1025,1225,150,150);
bed(575,1225,150,150);

bed(1025,1050,150,150);
bed(575,1050,150,150);

bed(1025,875,150,150);
bed(575,875,150,150);

bed(1025,700,150,150);
bed(575,700,150,150);

new S_WebLarge(775, 575);


new SE_event(950, 650, [
  "You found something on the ground. Some metallic balls are spread on the floor. You almost trip on them.",
  "Looking closer, you conclude that they are " +  ITEM.AncientArmamentAmmunition.toUpperCase() + ".",
  "The little orbs are perfectly spherical. You have never seen an object so smooth and regular. If you did not know better, you would never have believed this were made by humans. There's definitely some powerful magic at play here...",
].concat(INVENTORY.ancient_armament_remaining_dialog(ITEM.AncientArmamentAmmunition)), 50, undefined, function(){
  INVENTORY.increase(ITEM.AncientArmamentAmmunition);
});



// ===================
//hack E. DECOR (permanent filler)
// ===================

var filler = new Filler(gen.get());
filler.set_zone(550,1200,650,675);
filler.set_tries(20, 20);
filler.add_default_constructor("S_Web", 1, 120, 60);
filler.fill_floor_by_retry();
filler.clear();
//filler.set_tries(10, 10);
filler.add_default_constructor("S_Bocals", 1, 40, 25);
filler.fill_floor_by_retry();

// ===================
//hack F. EVENTS (temporary filler)
// ===================

var events = new EventFiller(gen.get(), 10);
events.set_zone_from_filler(filler);

events.battleRubble(ITEM.Dagger, 0.05);
events.battleRubble(ITEM.ShelterKey, 0.1);
events.battleRubble(ITEM.Linnens, 0.2);
events.groundItem(ITEM.AncientRubbles, 2);
events.groundItem(ITEM.Stone, 0.1);
events.text("You find a heap of metallic debris on the floor. You cannot tell what they used to be, but it has long since been broken into many pieces. One thing is for sure, it was carefully crafted, with a precision and a skill that has vanished from this world.");
events.text("You cannot help but notice the total absence of human corpse or signs of life in this shelter. It looks like the poor souls for whom it was destined never made it on time...");
events.text("The dim light that follows you from the door is barely enough to light up the place. The air is dusty and suffocating. Clearly this room has not been visited in a while.");
events.text("Crafting a cave this size is quite an accomplishment. You wonder what else your ancestors were able to do with their mastery over nature. And how much of it can be regained if you succeed in your quest...");
events.add_conversations(0.4);

events.set_tries(10, 20);
events.fill_floor_by_retry();


// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.setup_text_start_function([
  `The door opens with a loud air pressure sound. It clearly hasn't been moved in ages. Clouds of dusts from inside are shaken for the first time in centuries. You keep coughing and you have to wait a few minutes for the atmosphere to settle down before you can make out anything.`,
  `The inside is a huge cavern. The walls are covered by metal, keeping the place fresh and preventing it from crumbling. The only light source is from the door you opened. There's dust and cobwebs everywhere, but the cool air is a welcome refreshment after your climb.`,
  `$$BestFriend$: "Whatever we are looking for, it must be here somewhere!"`,
]);

exit.initialize_with_character(850, 1225);
