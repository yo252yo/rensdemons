// ===================
//hack INITIALIZATION
// ===================
AUDIO.music.levels.harpies();
var gen = new Generator(DICTIONARY.get("dungeons_seed"));

// ===================
//hack FIXED ELEMENTS (floors)
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
//hack FIXED ELEMENTS (decor)
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


new SB_rubble(950, 650, ITEM.AncientArmamentAmmunition);

// ===================
//hack GENERATED ELEMENTS
// ===================

var filler = new Filler(gen);
filler.set_zone(550,1200,650,675);
filler.set_tries(20, 20);
filler.set_object(120, 60, function(x,y,g){ return new S_Web(x, y); });
filler.fill_by_retry();
//filler.set_tries(10, 10);
filler.set_object(40, 25, function(x,y,g){ return new S_Bocals(x, y); });
filler.fill_by_retry();

// ===================
//hack TEMPORARY ELEMENTS
// ===================


filler.set_tries(10, 20);
filler.set_event([
//  new SB_rubble(x, y, ITEM.Elixir_fire),
//  new SE_small_treasure(x, y, ITEM.Stone),
  function(x,y,g){ return new SB_event(x, y, '...');},
], 10);
filler.fill_by_retry();

// ===================
//hack FINISHING ELEMENTS (exit)
// ===================

new S_Floor(850,1250,50,50, 'obj_dark', '025_harpies');

// ===================
//hack START
// ===================

CURRENTLEVEL.initialize_with_character(850, 1225);
